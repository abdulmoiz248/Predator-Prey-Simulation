import numpy as np
import threading
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from pdf_generator import generate_pdf_report
import json
import time

def determine_grid_size(total_population):
    if total_population <= 50:
        print(f'[INFO] Grid size determined: 2x2 for population {total_population}')
        return 2, 2
    elif total_population <= 200:
        print(f'[INFO] Grid size determined: 5x5 for population {total_population}')
        return 5, 5
    elif total_population <= 1000:
        print(f'[INFO] Grid size determined: 10x10 for population {total_population}')
        return 10, 10
    else:
        print(f'[INFO] Grid size determined: 20x20 for population {total_population}')
        return 20, 20

def lotka_volterra_step(rabbits, wolves, alpha, beta, gamma, delta, dt=0.1):
    """
    Implement the Lotka-Volterra equations with a smaller time step for better accuracy.
    
    dR/dt = alpha*R - beta*R*W
    dW/dt = delta*R*W - gamma*W
    
    Using a smaller dt value (0.1) for more accurate integration.
    """
    # Use multiple smaller steps for better numerical stability
    steps = 10  # 10 steps of dt=0.1 equals 1 time unit (year)
    current_rabbits = rabbits
    current_wolves = wolves
    
    for _ in range(steps):
        # Calculate rates of change
        rabbit_change = (alpha * current_rabbits - beta * current_rabbits * current_wolves) * dt
        wolf_change = (delta * current_rabbits * current_wolves - gamma * current_wolves) * dt
        
        # Update populations
        current_rabbits += rabbit_change
        current_wolves += wolf_change
        
        # Ensure populations don't go negative
        current_rabbits = max(0, current_rabbits)
        current_wolves = max(0, current_wolves)
    
    return current_rabbits, current_wolves

def run_simulation(start_year, end_year, rabbits, wolves, alpha, beta, gamma, delta, socketio=None):
    print(f'[INFO] Running simulation for years {start_year}-{end_year}')
    print(f'[INFO] Parameters: alpha={alpha}, beta={beta}, gamma={gamma}, delta={delta}')
    
    # Validate parameters
    if alpha <= 0 or beta <= 0 or gamma <= 0 or delta <= 0:
        raise ValueError("All rate parameters (alpha, beta, gamma, delta) must be positive")
    
    # Check if parameters are reasonable for the model
    if beta * wolves >= alpha:
        print(f'[WARNING] With these parameters (alpha={alpha}, beta={beta}, initial wolves={wolves}), ' 
              f'the rabbit population may collapse immediately. Consider adjusting parameters.')
    
    if delta * rabbits <= gamma:
        print(f'[WARNING] With these parameters (gamma={gamma}, delta={delta}, initial rabbits={rabbits}), ' 
              f'the wolf population may decline immediately. Consider adjusting parameters.')
    
    total_population = rabbits + wolves
    rows, cols = determine_grid_size(total_population)
    grid = np.zeros((rows, cols, 2), dtype=float)
    
    # Distribute populations evenly
    grid[...,0] += rabbits // (rows*cols)
    grid[...,1] += wolves // (rows*cols)
    rabbits_left = rabbits % (rows*cols)
    wolves_left = wolves % (rows*cols)
    
    for i in range(rabbits_left):
        grid[i//cols, i%cols, 0] += 1
    for i in range(wolves_left):
        grid[i//cols, i%cols, 1] += 1

    years = end_year - start_year + 1
    yearly_results = []
    total_rabbits_by_year = []
    total_wolves_by_year = []
    
    params = {
        'start_year': start_year,
        'end_year': end_year,
        'rabbits': rabbits,
        'wolves': wolves,
        'alpha': alpha,
        'beta': beta,
        'gamma': gamma,
        'delta': delta
    }
    
    # Use a lock to prevent multiple threads from generating PDFs simultaneously
    pdf_lock = threading.Lock()
    # Track when the last PDF was generated to avoid too frequent updates
    last_pdf_time = 0
    
    def pdf_update_thread(results, params, summary, upto_year_idx):
        nonlocal last_pdf_time
        current_time = time.time()
        
        # Only generate PDF if enough time has passed (at least 5 seconds)
        if current_time - last_pdf_time < 5:
            return
            
        # Acquire lock to prevent multiple threads from generating PDFs simultaneously
        if not pdf_lock.acquire(blocking=False):
            return  # Skip if another thread is already generating a PDF
            
        try:
            last_pdf_time = current_time
            partial_results = results.copy()
            partial_results['yearly_results'] = results['yearly_results'][:upto_year_idx+1]
            partial_results['years'] = upto_year_idx+1
            partial_results['total_rabbits_by_year'] = results['total_rabbits_by_year'][:upto_year_idx+1]
            partial_results['total_wolves_by_year'] = results['total_wolves_by_year'][:upto_year_idx+1]
            
            from ai_summary import generate_ai_summary
            summary_text = summary if isinstance(summary, str) else generate_ai_summary(partial_results)
            
            # Generate PDF
            pdf_path = generate_pdf_report(partial_results, summary_text, params)
            if socketio:
                socketio.emit('pdf_updated', {
                    "pdfUrl": f"http://localhost:5000/static/report.pdf", 
                    "upto_year": partial_results['start_year'] + upto_year_idx
                })
        except Exception as e:
            print(f'[ERROR] PDF generation failed: {str(e)}')
        finally:
            pdf_lock.release()

    try:
        from ai_summary import generate_ai_summary
        summary = generate_ai_summary({
            "rows": rows, 
            "cols": cols, 
            "years": years+1, 
            "start_year": start_year, 
            "end_year": end_year, 
            "yearly_results": yearly_results
        })
    except Exception as e:
        print(f'[INFO] Generating AI summary (mock)')
        summary = "AI summary could not be generated. Please check the simulation results manually."

    # Add initial state to results
    total_rabbits = int(np.sum(grid[..., 0]))
    total_wolves = int(np.sum(grid[..., 1]))
    
    year_data = []
    for r in range(rows):
        for c in range(cols):
            update = {
                "year": start_year,
                "grid": [r, c],
                "rabbits": int(grid[r, c, 0]),
                "wolves": int(grid[r, c, 1])
            }
            year_data.append(update)
    
    yearly_results.append(year_data)
    total_rabbits_by_year.append(total_rabbits)
    total_wolves_by_year.append(total_wolves)
    
    # Emit initial state
    if socketio:
        socketio.emit('year_update', {
            "year": start_year, 
            "rabbits": total_rabbits, 
            "wolves": total_wolves
        })

    # Run simulation for each year
    for year_idx in range(1, years+1):
        year = start_year + year_idx
        next_grid = np.zeros_like(grid)
        
        # Update each grid cell
        for r in range(rows):
            for c in range(cols):
                rabbits_now = grid[r, c, 0]
                wolves_now = grid[r, c, 1]
                
                if rabbits_now > 0 or wolves_now > 0:
                    next_rabbits, next_wolves = lotka_volterra_step(
                        rabbits_now, wolves_now, alpha, beta, gamma, delta
                    )
                    next_grid[r, c, 0] = next_rabbits
                    next_grid[r, c, 1] = next_wolves
        
        grid = next_grid
        
        # Collect results for this year
        year_data = []
        total_rabbits = 0
        total_wolves = 0
        
        for r in range(rows):
            for c in range(cols):
                rabbits_now = grid[r, c, 0]
                wolves_now = grid[r, c, 1]
                total_rabbits += rabbits_now
                total_wolves += wolves_now
                
                update = {
                    "year": year,
                    "grid": [r, c],
                    "rabbits": int(rabbits_now),
                    "wolves": int(wolves_now)
                }
                year_data.append(update)
        
        # Round to integers for display
        total_rabbits = int(total_rabbits)
        total_wolves = int(total_wolves)
        
        # Emit a single update per year with total populations
        if socketio:
            socketio.emit('year_update', {
                "year": year, 
                "rabbits": total_rabbits, 
                "wolves": total_wolves
            })
        
        yearly_results.append(year_data)
        total_rabbits_by_year.append(total_rabbits)
        total_wolves_by_year.append(total_wolves)
        
        print(f'Year {year}: Rabbits={total_rabbits} Wolves={total_wolves}')
        
        results_so_far = {
            "rows": rows,
            "cols": cols,
            "years": year_idx+1,
            "start_year": start_year,
            "end_year": end_year,
            "yearly_results": yearly_results.copy(),
            "total_rabbits_by_year": total_rabbits_by_year.copy(),
            "total_wolves_by_year": total_wolves_by_year.copy()
        }
        
        # Only update PDF at specific intervals to avoid too many updates
        # For longer simulations, update less frequently
        update_interval = max(5, years // 10)
        if year_idx == years or year_idx % update_interval == 0:
            threading.Thread(
                target=pdf_update_thread, 
                args=(results_so_far, params, summary, year_idx), 
                daemon=True
            ).start()
    
    print(f'[INFO] Simulation complete for all grids')
    
    return {
        "rows": rows, 
        "cols": cols, 
        "years": years+1, 
        "start_year": start_year, 
        "end_year": end_year, 
        "yearly_results": yearly_results, 
        "total_rabbits_by_year": total_rabbits_by_year, 
        "total_wolves_by_year": total_wolves_by_year
    }