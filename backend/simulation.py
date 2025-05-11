import os
import numpy as np
import multiprocessing
import time
import psutil
from .utils import determine_grid_size

def lotka_volterra_step(rabbits, wolves, alpha, beta, gamma, delta, dt=0.1):
    steps = 10
    current_rabbits = rabbits
    current_wolves = wolves
    for _ in range(steps):
        rabbit_change = (alpha * current_rabbits - beta * current_rabbits * current_wolves) * dt
        wolf_change = (delta * current_rabbits * current_wolves - gamma * current_wolves) * dt
        current_rabbits += rabbit_change
        current_wolves += wolf_change
        current_rabbits = max(0, current_rabbits)
        current_wolves = max(0, current_wolves)
    return current_rabbits, current_wolves

def process_grid_cell(args):
    r, c, rabbits, wolves, alpha, beta, gamma, delta = args
    if rabbits > 0 or wolves > 0:
        next_rabbits, next_wolves = lotka_volterra_step(
            rabbits, wolves, alpha, beta, gamma, delta
        )
        return r, c, next_rabbits, next_wolves
    return r, c, 0, 0

def generate_ai_summary(results):
    # Mock implementation
    return (
        f"This predator-prey simulation demonstrates the classic Lotka-Volterra model dynamics. "
        f"Starting with {results['total_rabbits_by_year'][0]} rabbits and {results['total_wolves_by_year'][0]} wolves, "
        "the populations exhibit cyclical behavior with phase shifts between predator and prey populations. "
        "... (summary truncated for brevity) ..."
    )

def run_simulation(start_year, end_year, rabbits, wolves, alpha, beta, gamma, delta, socketio=None):
    start_time = time.time()
    if alpha <= 0 or beta <= 0 or gamma <= 0 or delta <= 0:
        raise ValueError("All rate parameters (alpha, beta, gamma, delta) must be positive")
    total_population = rabbits + wolves
    rows, cols = determine_grid_size(total_population)
    grid = np.zeros((rows, cols, 2), dtype=float)
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
    performance_data = []
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
    if socketio:
        socketio.emit('year_update', {
            "year": start_year, 
            "rabbits": total_rabbits, 
            "wolves": total_wolves
        })
    num_cores = multiprocessing.cpu_count()
    pool = multiprocessing.Pool(processes=num_cores)
    for year_idx in range(1, years):
        year = start_year + year_idx
        next_grid = np.zeros_like(grid)
        year_start_time = time.time()
        args_list = []
        for r in range(rows):
            for c in range(cols):
                args_list.append((r, c, grid[r, c, 0], grid[r, c, 1], alpha, beta, gamma, delta))
        results = pool.map(process_grid_cell, args_list)
        for r, c, next_rabbits, next_wolves in results:
            next_grid[r, c, 0] = next_rabbits
            next_grid[r, c, 1] = next_wolves
        grid = next_grid
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
        total_rabbits = int(total_rabbits)
        total_wolves = int(total_wolves)
        year_time = (time.time() - year_start_time) * 1000
        memory_usage = psutil.Process(os.getpid()).memory_info().rss / 1024 / 1024
        performance_data.append({
            "year": year,
            "timePerYear": year_time,
            "memoryUsage": memory_usage
        })
        if socketio:
            socketio.emit('year_update', {
                "year": year, 
                "rabbits": total_rabbits, 
                "wolves": total_wolves
            })
            socketio.emit('performance_update', {
                "year": year,
                "timePerYear": year_time,
                "memoryUsage": memory_usage,
                "cores": num_cores
            })
        yearly_results.append(year_data)
        total_rabbits_by_year.append(total_rabbits)
        total_wolves_by_year.append(total_wolves)
    pool.close()
    pool.join()
    execution_time = time.time() - start_time
    return {
        "rows": rows, 
        "cols": cols, 
        "years": years, 
        "start_year": start_year, 
        "end_year": end_year, 
        "yearly_results": yearly_results, 
        "total_rabbits_by_year": total_rabbits_by_year, 
        "total_wolves_by_year": total_wolves_by_year,
        "execution_time": execution_time,
        "cores_used": num_cores,
        "performance_data": performance_data
    } 