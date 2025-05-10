import os
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from fpdf import FPDF
import numpy as np

def plot_population_trends(results, outdir):
    print(f'[INFO] Generating population trend plots in {outdir}')
    os.makedirs(outdir, exist_ok=True)
    
    # Generate the total population plot
    if 'total_rabbits_by_year' in results and 'total_wolves_by_year' in results:
        plt.figure(figsize=(10, 6))
        years = range(results['start_year'], results['start_year'] + len(results['total_rabbits_by_year']))
        
        # Plot with markers for better visibility
        plt.plot(years, results['total_rabbits_by_year'], 'bo-', label='Rabbits', linewidth=2, markersize=6)
        plt.plot(years, results['total_wolves_by_year'], 'ro-', label='Wolves', linewidth=2, markersize=6)
        
        plt.title('Population Dynamics Over Time', fontsize=16)
        plt.xlabel('Year', fontsize=12)
        plt.ylabel('Population', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.legend(fontsize=12)
        
        # Add data labels for smaller datasets only
        if len(years) <= 10:
            for i, (year, rabbits, wolves) in enumerate(zip(years, results['total_rabbits_by_year'], results['total_wolves_by_year'])):
                plt.annotate(f'{rabbits}', (year, rabbits), textcoords="offset points", 
                             xytext=(0,10), ha='center', fontsize=9)
                plt.annotate(f'{wolves}', (year, wolves), textcoords="offset points", 
                             xytext=(0,-15), ha='center', fontsize=9)
        
        # Adjust y-axis to ensure all data is visible with some padding
        max_pop = max(max(results['total_rabbits_by_year']), max(results['total_wolves_by_year']))
        plt.ylim(0, max_pop * 1.2)  # 20% padding
        
        fname = os.path.join(outdir, "total_population.png")
        plt.savefig(fname, dpi=150, bbox_inches='tight')
        plt.close()
        print(f'[INFO] Saved plot: {fname}')
        
        # Create a phase space plot (rabbits vs wolves)
        plt.figure(figsize=(8, 8))
        plt.plot(results['total_rabbits_by_year'], results['total_wolves_by_year'], 'g-o', linewidth=2)
        
        # Add arrows to show direction
        for i in range(len(results['total_rabbits_by_year'])-1):
            plt.annotate('', 
                         xy=(results['total_rabbits_by_year'][i+1], results['total_wolves_by_year'][i+1]),
                         xytext=(results['total_rabbits_by_year'][i], results['total_wolves_by_year'][i]),
                         arrowprops=dict(arrowstyle='->', color='black', lw=1.5))
        
        # Add year labels for smaller datasets only
        if len(years) <= 10:
            for i, year in enumerate(range(results['start_year'], results['start_year'] + len(results['total_rabbits_by_year']))):
                plt.annotate(str(year), 
                             (results['total_rabbits_by_year'][i], results['total_wolves_by_year'][i]),
                             textcoords="offset points", xytext=(5,5), fontsize=9)
        
        plt.title('Phase Space: Predator vs Prey Population', fontsize=16)
        plt.xlabel('Rabbit Population', fontsize=12)
        plt.ylabel('Wolf Population', fontsize=12)
        plt.grid(True, linestyle='--', alpha=0.7)
        
        phase_fname = os.path.join(outdir, "phase_space.png")
        plt.savefig(phase_fname, dpi=150, bbox_inches='tight')
        plt.close()
        print(f'[INFO] Saved phase space plot: {phase_fname}')
        
        return fname, phase_fname
    
    return None, None

def generate_pdf_report(results, summary, params):
    static_dir = os.path.join(os.path.dirname(__file__), 'static')
    os.makedirs(static_dir, exist_ok=True)
    img_dir = os.path.join(static_dir, 'plots')
    
    # Generate plots
    total_plot, phase_plot = plot_population_trends(results, img_dir)
    
    pdf_path = os.path.join(static_dir, 'report.pdf')
    print(f'[INFO] Creating PDF report at {pdf_path}')
    
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Predator-Prey Simulation Report', ln=1, align='C')
    
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 10, f"Years: {params['start_year']} - {params['end_year']}", ln=1)
    pdf.cell(0, 10, f"Initial Rabbits: {params['rabbits']}, Wolves: {params['wolves']}", ln=1)
    pdf.cell(0, 10, f"Grid Size: {results['rows']}x{results['cols']}", ln=1)
    
    # Add model parameters - using ASCII instead of Greek letters
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'Model Parameters:', ln=1)
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 8, f"alpha (rabbit growth rate): {params['alpha']}", ln=1)
    pdf.cell(0, 8, f"beta (predation rate): {params['beta']}", ln=1)
    pdf.cell(0, 8, f"gamma (wolf death rate): {params['gamma']}", ln=1)
    pdf.cell(0, 8, f"delta (wolf reproduction rate): {params['delta']}", ln=1)
    pdf.ln(5)
    
    # Add AI summary
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, 'AI Summary:', ln=1)
    pdf.set_font('Arial', '', 12)
    pdf.multi_cell(0, 8, summary)
    pdf.ln(5)
    
    # Add a table of total populations by year
    if 'total_rabbits_by_year' in results and 'total_wolves_by_year' in results:
        pdf.set_font('Arial', 'B', 12)
        pdf.cell(0, 10, 'Population by Year:', ln=1)
        pdf.set_font('Arial', '', 10)
        
        # Table header
        pdf.cell(30, 8, 'Year', 1, 0, 'C')
        pdf.cell(40, 8, 'Rabbits', 1, 0, 'C')
        pdf.cell(40, 8, 'Wolves', 1, 1, 'C')
        
        # Table data - limit to 20 rows max to avoid huge tables
        max_rows = min(len(results['total_rabbits_by_year']), 20)
        step = max(1, len(results['total_rabbits_by_year']) // 20)
        
        for i in range(0, len(results['total_rabbits_by_year']), step):
            if i < max_rows * step:
                year = results['start_year'] + i
                rabbits = results['total_rabbits_by_year'][i]
                wolves = results['total_wolves_by_year'][i]
                pdf.cell(30, 8, str(year), 1, 0, 'C')
                pdf.cell(40, 8, str(rabbits), 1, 0, 'C')
                pdf.cell(40, 8, str(wolves), 1, 1, 'C')
    
    # Add total population plot
    if total_plot and os.path.exists(total_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(0, 10, "Population Dynamics Over Time", ln=1, align='C')
        pdf.image(total_plot, x=10, w=190)
        print(f'[INFO] Added population plot to PDF: {total_plot}')
    
    # Add phase space plot
    if phase_plot and os.path.exists(phase_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(0, 10, "Phase Space: Predator vs Prey Population", ln=1, align='C')
        pdf.image(phase_plot, x=20, w=170)
        print(f'[INFO] Added phase space plot to PDF: {phase_plot}')
    
    try:
        pdf.output(pdf_path)
        print(f'[INFO] PDF report generated: {pdf_path}')
        return pdf_path
    except Exception as e:
        print(f'[ERROR] Failed to generate PDF: {str(e)}')
        # Create a simplified PDF without the problematic characters
        return generate_simplified_pdf(results, summary, params, img_dir)

def generate_simplified_pdf(results, summary, params, img_dir):
    """Fallback function to generate a simplified PDF without Unicode characters"""
    pdf_path = os.path.join(os.path.dirname(img_dir), 'report.pdf')
    
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, 'Predator-Prey Simulation Report', ln=1, align='C')
    
    pdf.set_font('Arial', '', 12)
    pdf.cell(0, 10, f"Years: {params['start_year']} - {params['end_year']}", ln=1)
    pdf.cell(0, 10, f"Initial Rabbits: {params['rabbits']}, Wolves: {params['wolves']}", ln=1)
    
    # Add plots if they exist
    total_plot = os.path.join(img_dir, "total_population.png")
    phase_plot = os.path.join(img_dir, "phase_space.png")
    
    if os.path.exists(total_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(0, 10, "Population Dynamics Over Time", ln=1, align='C')
        pdf.image(total_plot, x=10, w=190)
    
    if os.path.exists(phase_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.cell(0, 10, "Phase Space Plot", ln=1, align='C')
        pdf.image(phase_plot, x=20, w=170)
    
    pdf.output(pdf_path)
    print(f'[INFO] Simplified PDF report generated: {pdf_path}')
    return pdf_path