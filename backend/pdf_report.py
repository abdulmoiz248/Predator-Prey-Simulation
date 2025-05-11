import os
import threading
import datetime
from fpdf import FPDF
from .plotting import plot_population_trends

def generate_pdf_report(results, summary, params, execution_time=None, cores_used=None, performance_data=None):
    static_dir = os.path.join(os.path.dirname(__file__), 'static')
    os.makedirs(static_dir, exist_ok=True)
    img_dir = os.path.join(static_dir, 'plots')
    plot_thread = threading.Thread(target=plot_population_trends, args=(results, img_dir))
    plot_thread.start()
    plot_thread.join()
    total_plot = os.path.join(img_dir, "total_population.png")
    phase_plot = os.path.join(img_dir, "phase_space.png")
    ratio_plot = os.path.join(img_dir, "population_ratio.png")
    grid_plot = os.path.join(img_dir, "grid_visualization.png")
    pdf_path = os.path.join(static_dir, 'report.pdf')
    print(f'[INFO] Creating PDF report at {pdf_path}')
    class PDF(FPDF):
        def header(self):
            try:
                logo_path = os.path.join(os.path.dirname(__file__), 'static', 'comsats_logo.png')
                if os.path.exists(logo_path):
                    self.image(logo_path, 10, 8, 30)
            except Exception as e:
                print(f"[WARNING] Could not add logo: {str(e)}")
            self.set_font('Arial', 'B', 15)
            self.set_text_color(0, 51, 102)
            self.cell(30)
            self.cell(0, 10, 'Predator-Prey Simulation using Lotka-Volterra Model in Parallel', 0, 1, 'C')
            self.set_font('Arial', 'I', 10)
            self.set_text_color(100, 100, 100)
            self.cell(30)
            self.cell(0, 5, f'Report generated on {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 0, 1, 'C')
            self.ln(5)
            self.set_draw_color(0, 51, 102)
            self.set_line_width(0.5)
            self.line(10, self.get_y(), 200, self.get_y())
            self.ln(5)
        def footer(self):
            self.set_y(-15)
            self.set_draw_color(0, 51, 102)
            self.set_line_width(0.3)
            self.line(10, self.get_y(), 200, self.get_y())
            self.ln(1)
            self.set_font('Arial', 'I', 8)
            self.set_text_color(100, 100, 100)
            self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'C')
    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_draw_color(0, 51, 102)
    pdf.set_line_width(0.5)
    pdf.rect(10, 10, 190, 277)
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Simulation Report', 0, 1, 'C')
    pdf.ln(5)
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    pdf.multi_cell(0, 6, 'This report presents the results of a predator-prey simulation using the Lotka-Volterra model. The simulation was executed using parallel processing to improve performance and provide a more realistic spatial representation of ecosystem dynamics.', 0, 'J')
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Simulation Parameters:', 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    col_width = 95
    row_height = 8
    pdf.set_font('Arial', 'B', 11)
    pdf.set_fill_color(0, 51, 102)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(col_width, row_height, 'Parameter', 1, 0, 'C', 1)
    pdf.cell(col_width, row_height, 'Value', 1, 1, 'C', 1)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', '', 11)
    fill = False
    pdf.set_fill_color(240, 240, 250)
    pdf.cell(col_width, row_height, 'Time Period', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{params['start_year']} - {params['end_year']} ({params['end_year'] - params['start_year']} years)", 1, 1, 'L', fill)
    fill = not fill
    pdf.set_fill_color(230, 230, 240)
    pdf.cell(col_width, row_height, 'Grid Size', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{results['rows']}x{results['cols']} ({results['rows'] * results['cols']} cells)", 1, 1, 'L', fill)
    fill = not fill
    pdf.set_fill_color(240, 240, 250)
    pdf.cell(col_width, row_height, 'Initial Rabbits', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{params['rabbits']}", 1, 1, 'L', fill)
    fill = not fill
    pdf.set_fill_color(230, 230, 240)
    pdf.cell(col_width, row_height, 'Initial Wolves', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{params['wolves']}", 1, 1, 'L', fill)
    fill = not fill
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Model Parameters:', 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', 'B', 11)
    pdf.set_fill_color(0, 51, 102)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(col_width, row_height, 'Parameter', 1, 0, 'C', 1)
    pdf.cell(col_width, row_height, 'Value', 1, 1, 'C', 1)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', '', 11)
    fill = False
    pdf.set_fill_color(240, 240, 250)
    pdf.cell(col_width, row_height, 'Alpha (rabbit growth rate)', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{params['alpha']}", 1, 1, 'L', fill)
    fill = not fill
    pdf.set_fill_color(230, 230, 240)
    pdf.cell(col_width, row_height, 'Beta (predation rate)', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{params['beta']}", 1, 1, 'L', fill)
    fill = not fill
    pdf.set_fill_color(240, 240, 250)
    pdf.cell(col_width, row_height, 'Gamma (wolf death rate)', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{params['gamma']}", 1, 1, 'L', fill)
    fill = not fill
    pdf.set_fill_color(230, 230, 240)
    pdf.cell(col_width, row_height, 'Delta (wolf reproduction rate)', 1, 0, 'L', fill)
    pdf.cell(col_width, row_height, f"{params['delta']}", 1, 1, 'L', fill)
    if execution_time or cores_used:
        pdf.ln(5)
        pdf.set_font('Arial', 'B', 14)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, 'Performance Metrics:', 0, 1)
        pdf.set_font('Arial', '', 11)
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Arial', 'B', 11)
        pdf.set_fill_color(0, 51, 102)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(col_width, row_height, 'Metric', 1, 0, 'C', 1)
        pdf.cell(col_width, row_height, 'Value', 1, 1, 'C', 1)
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Arial', '', 11)
        fill = False
        if execution_time:
            pdf.set_fill_color(240, 240, 250)
            pdf.cell(col_width, row_height, 'Total Execution Time', 1, 0, 'L', fill)
            pdf.cell(col_width, row_height, f"{execution_time:.2f} seconds", 1, 1, 'L', fill)
            fill = not fill
        if cores_used:
            pdf.set_fill_color(230, 230, 240) if fill else pdf.set_fill_color(240, 240, 250)
            pdf.cell(col_width, row_height, 'CPU Cores Used', 1, 0, 'L', fill)
            pdf.cell(col_width, row_height, f"{cores_used}", 1, 1, 'L', fill)
            fill = not fill
            pdf.set_fill_color(240, 240, 250) if fill else pdf.set_fill_color(230, 230, 240)
            pdf.cell(col_width, row_height, 'Average Time Per Year', 1, 0, 'L', fill)
            avg_time = execution_time / (params['end_year'] - params['start_year']) if execution_time else "N/A"
            pdf.cell(col_width, row_height, f"{avg_time:.4f} seconds" if isinstance(avg_time, float) else avg_time, 1, 1, 'L', fill)
            fill = not fill
            pdf.set_fill_color(230, 230, 240) if fill else pdf.set_fill_color(240, 240, 250)
            pdf.cell(col_width, row_height, 'Parallel Efficiency', 1, 0, 'L', fill)
            pdf.cell(col_width, row_height, f"Using {cores_used} cores for {results['rows'] * results['cols']} grid cells", 1, 1, 'L', fill)
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Population Results:', 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', 'B', 11)
    pdf.set_fill_color(0, 51, 102)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(50, row_height, 'Metric', 1, 0, 'C', 1)
    pdf.cell(70, row_height, 'Rabbits', 1, 0, 'C', 1)
    pdf.cell(70, row_height, 'Wolves', 1, 1, 'C', 1)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', '', 11)
    fill = False
    pdf.set_fill_color(240, 240, 250)
    pdf.cell(50, row_height, 'Initial Population', 1, 0, 'L', fill)
    pdf.cell(70, row_height, f"{results['total_rabbits_by_year'][0]}", 1, 0, 'C', fill)
    pdf.cell(70, row_height, f"{results['total_wolves_by_year'][0]}", 1, 1, 'C', fill)
    fill = not fill
    pdf.set_fill_color(230, 230, 240)
    pdf.cell(50, row_height, 'Final Population', 1, 0, 'L', fill)
    pdf.cell(70, row_height, f"{results['total_rabbits_by_year'][-1]}", 1, 0, 'C', fill)
    pdf.cell(70, row_height, f"{results['total_wolves_by_year'][-1]}", 1, 1, 'C', fill)
    fill = not fill
    pdf.set_fill_color(240, 240, 250)
    pdf.cell(50, row_height, 'Maximum', 1, 0, 'L', fill)
    pdf.cell(70, row_height, f"{max(results['total_rabbits_by_year'])}", 1, 0, 'C', fill)
    pdf.cell(70, row_height, f"{max(results['total_wolves_by_year'])}", 1, 1, 'C', fill)
    fill = not fill
    pdf.set_fill_color(230, 230, 240)
    pdf.cell(50, row_height, 'Minimum', 1, 0, 'L', fill)
    pdf.cell(70, row_height, f"{min(results['total_rabbits_by_year'])}", 1, 0, 'C', fill)
    pdf.cell(70, row_height, f"{min(results['total_wolves_by_year'])}", 1, 1, 'C', fill)
    fill = not fill
    pdf.set_fill_color(240, 240, 250)
    pdf.cell(50, row_height, 'Average', 1, 0, 'L', fill)
    pdf.cell(70, row_height, f"{sum(results['total_rabbits_by_year']) / len(results['total_rabbits_by_year']):.2f}", 1, 0, 'C', fill)
    pdf.cell(70, row_height, f"{sum(results['total_wolves_by_year']) / len(results['total_wolves_by_year']):.2f}", 1, 1, 'C', fill)
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 12)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Population by Year:', 0, 1)
    pdf.set_font('Arial', '', 10)
    pdf.set_text_color(0, 0, 0)
    pdf.set_fill_color(0, 51, 102)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font('Arial', 'B', 10)
    pdf.cell(30, 8, 'Year', 1, 0, 'C', 1)
    pdf.cell(40, 8, 'Rabbits', 1, 0, 'C', 1)
    pdf.cell(40, 8, 'Wolves', 1, 0, 'C', 1)
    pdf.cell(40, 8, 'Wolves/Rabbits', 1, 1, 'C', 1)
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', '', 10)
    years_count = len(results['total_rabbits_by_year'])
    max_rows_per_page = 25
    total_pages_needed = (years_count + max_rows_per_page - 1) // max_rows_per_page
    if years_count > max_rows_per_page:
        pdf.set_font('Arial', 'I', 9)
        pdf.cell(0, 6, f"Note: Data spans {total_pages_needed} pages. Years are shown at regular intervals.", 0, 1, 'L')
        pdf.set_font('Arial', '', 10)
        step = max(1, years_count // max_rows_per_page)
    else:
        step = 1
    fill = False
    for i in range(0, years_count, step):
        year = results['start_year'] + i
        rabbits = int(results['total_rabbits_by_year'][i])
        wolves = int(results['total_wolves_by_year'][i])
        ratio = wolves / rabbits if rabbits > 0 else 0
        if i > 0 and i % max_rows_per_page == 0:
            pdf.add_page()
            pdf.set_fill_color(0, 51, 102)
            pdf.set_text_color(255, 255, 255)
            pdf.set_font('Arial', 'B', 10)
            pdf.cell(30, 8, 'Year', 1, 0, 'C', 1)
            pdf.cell(40, 8, 'Rabbits', 1, 0, 'C', 1)
            pdf.cell(40, 8, 'Wolves', 1, 0, 'C', 1)
            pdf.cell(40, 8, 'Wolves/Rabbits', 1, 1, 'C', 1)
            pdf.set_text_color(0, 0, 0)
            pdf.set_font('Arial', '', 10)
            fill = False
        pdf.set_fill_color(240, 240, 250) if fill else pdf.set_fill_color(230, 230, 240)
        pdf.cell(30, 8, str(year), 1, 0, 'C', fill)
        pdf.cell(40, 8, str(rabbits), 1, 0, 'C', fill)
        pdf.cell(40, 8, str(wolves), 1, 0, 'C', fill)
        pdf.cell(40, 8, f"{ratio:.4f}", 1, 1, 'C', fill)
        fill = not fill
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'AI Analysis Summary:', 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    pdf.set_draw_color(0, 51, 102)
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    pdf.ln(5)
    pdf.set_fill_color(255, 255, 255)
    pdf.multi_cell(0, 6, summary, 1, 'J')
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    pdf.ln(5)
    if os.path.exists(total_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Population Dynamics Over Time", 0, 1, 'C')
        plot_x = 20
        plot_y = pdf.get_y()
        plot_w = 170
        plot_h = 120
        pdf.image(total_plot, x=plot_x, y=plot_y, w=plot_w)
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 1: Population trends of rabbits and wolves over time", 0, 1, 'C')
        pdf.set_font('Arial', '', 10)
        pdf.multi_cell(0, 6, "This graph shows the population dynamics of rabbits (prey) and wolves (predators) over time. The cyclical pattern is characteristic of predator-prey systems, where an increase in prey population leads to an increase in predator population, which then causes a decrease in prey population, followed by a decrease in predator population, and the cycle continues.", 0, 'J')
        print(f'[INFO] Added population plot to PDF: {total_plot}')
    if os.path.exists(phase_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Phase Space: Predator vs Prey Population", 0, 1, 'C')
        plot_x = 20
        plot_y = pdf.get_y()
        plot_w = 170
        plot_h = 170
        pdf.image(phase_plot, x=plot_x, y=plot_y, w=plot_w)
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 2: Phase space diagram showing the relationship between predator and prey populations", 0, 1, 'C')
        pdf.set_font('Arial', '', 10)
        pdf.multi_cell(0, 6, "The phase space plot shows the relationship between rabbit and wolf populations. Each point represents the population state at a specific time, and the arrows indicate the direction of change. The counterclockwise cycles are characteristic of predator-prey systems, showing how the populations influence each other over time.", 0, 'J')
        print(f'[INFO] Added phase space plot to PDF: {phase_plot}')
    if os.path.exists(ratio_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Predator-Prey Ratio Over Time", 0, 1, 'C')
        plot_x = 20
        plot_y = pdf.get_y()
        plot_w = 170
        plot_h = 120
        pdf.image(ratio_plot, x=plot_x, y=plot_y, w=plot_w)
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 3: Ratio of wolves to rabbits over time", 0, 1, 'C')
        pdf.set_font('Arial', '', 10)
        pdf.multi_cell(0, 6, "This graph shows the ratio of wolves to rabbits over time. The ratio fluctuates as the populations change, providing insight into the relative abundance of predators compared to prey. Higher ratios indicate more wolves per rabbit, which typically precedes a decline in the rabbit population.", 0, 'J')
        print(f'[INFO] Added ratio plot to PDF: {ratio_plot}')
    if os.path.exists(grid_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 14)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Final Grid Population Distribution", 0, 1, 'C')
        plot_x = 15
        plot_y = pdf.get_y()
        plot_w = 180
        plot_h = 120
        pdf.image(grid_plot, x=plot_x, y=plot_y, w=plot_w)
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 4: Final distribution of rabbit and wolf populations across the grid", 0, 1, 'C')
        pdf.set_font('Arial', '', 10)
        pdf.multi_cell(0, 6, f"This visualization shows the final distribution of rabbit and wolf populations across the {results['rows']}×{results['cols']} grid. Each cell represents a distinct area in the ecosystem, with its own population dynamics. The parallel processing approach allowed each grid cell to be calculated independently, providing a more realistic spatial representation of the ecosystem.", 0, 'J')
        print(f'[INFO] Added grid visualization to PDF: {grid_plot}')
    pdf.add_page()
    pdf.set_font('Arial', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, "Conclusion", 0, 1)
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    pdf.set_draw_color(0, 51, 102)
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    pdf.ln(5)
    conclusion_text = (
        "This simulation demonstrates the classic predator-prey dynamics using the Lotka-Volterra model, implemented with parallel processing for improved performance and spatial representation. "
        f"Starting with {results['total_rabbits_by_year'][0]} rabbits and {results['total_wolves_by_year'][0]} wolves, the simulation tracked population changes over {results['years']} years across a {results['rows']}×{results['cols']} grid.\n\n"
        "Key findings:\n\n"
        f"1. The rabbit population exhibited cyclical behavior, reaching a maximum of {max(results['total_rabbits_by_year'])} and a minimum of {min(results['total_rabbits_by_year'])}.\n\n"
        f"2. The wolf population followed a similar pattern with a phase shift, reaching a maximum of {max(results['total_wolves_by_year'])} and a minimum of {min(results['total_wolves_by_year'])}.\n\n"
        "3. The phase space plot revealed the characteristic counterclockwise cycles of predator-prey systems, demonstrating the lag between population changes.\n\n"
        f"4. The parallel processing approach utilizing {cores_used} CPU cores allowed for efficient computation, completing the simulation in {execution_time:.2f} seconds.\n\n"
        "The results align with theoretical expectations for predator-prey systems, showing the oscillatory behavior and phase relationships between populations. The parallel implementation not only improved performance but also provided a more realistic spatial representation of ecosystem dynamics."
    )
    pdf.set_fill_color(255, 255, 255)
    pdf.multi_cell(0, 6, conclusion_text, 1, 'J')
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    try:
        pdf.output(pdf_path)
        print(f'[INFO] PDF report generated: {pdf_path}')
        return pdf_path
    except Exception as e:
        print(f'[ERROR] Failed to generate PDF: {str(e)}')
        return None 