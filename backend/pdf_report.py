import os
import datetime
from fpdf import FPDF
from .plotting import (
    plot_population_trends, 
    plot_rabbit_wolf_ratio_pie, 
    plot_grid_visualization, 
    plot_phase_space, 
    plot_population_ratio
)

def generate_pdf_report(results, summary, params, execution_time=None, cores_used=None, performance_data=None):
    """Generate a comprehensive PDF report for the predator-prey simulation."""
    static_dir = os.path.join(os.path.dirname(__file__), 'static')
    os.makedirs(static_dir, exist_ok=True)
    img_dir = os.path.join(static_dir, 'plots')
    os.makedirs(img_dir, exist_ok=True)
    
    # --- Generate all plots sequentially (no threading) ---
    print("[INFO] Generating plots sequentially...")
    
    # Generate population trend plot
    total_plot = plot_population_trends(results, img_dir)
    
    # Generate pie charts
    pie_start, pie_end, pie_avg = plot_rabbit_wolf_ratio_pie(results, img_dir)
    
    # Generate grid visualization
    grid_plot = plot_grid_visualization(results, img_dir)
    
    # Generate phase space plot
    phase_plot = plot_phase_space(results, img_dir)
    
    # Generate population ratio plot
    ratio_plot = plot_population_ratio(results, img_dir)
    
    # Create PDF path
    pdf_path = os.path.join(static_dir, 'report.pdf')
    print(f'[INFO] Creating PDF report at {pdf_path}')
    
    # Define custom PDF class with header and footer
    class PDF(FPDF):
        def header(self):
            # No header on first page, only on subsequent pages
            if self.page_no() == 1:
                return
            
            # Try to add logo if available
            try:
                logo_path = os.path.join(os.path.dirname(__file__), 'static', 'comsats_logo.png')
                if os.path.exists(logo_path):
                    self.image(logo_path, 10, 8, 30)
            except Exception as e:
                print(f"[WARNING] Could not add logo: {str(e)}")
            
            # Add header text
            self.set_font('Arial', 'B', 15)
            self.set_text_color(0, 51, 102)
            self.cell(30)
            self.cell(0, 10, 'Predator-Prey Simulation using Lotka-Volterra Model', 0, 1, 'C')
            
            # Add date
            self.set_font('Arial', 'I', 10)
            self.set_text_color(100, 100, 100)
            self.cell(30)
            self.cell(0, 5, f'Report generated on {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 0, 1, 'C')
            
            # Add separator line
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
    
    # Create PDF object
    pdf = PDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    # Add cover page
    pdf.add_page()
    
    # Add logo if available
    logo_path = os.path.join(os.path.dirname(__file__), 'static', 'comsats_logo.png')
    if os.path.exists(logo_path):
        logo_width = 100
        x_logo = (pdf.w - logo_width) / 2
        y_logo = 30
        try:
            pdf.image(logo_path, x=x_logo, y=y_logo, w=logo_width)
        except Exception as e:
            print(f"[WARNING] Could not add big logo: {str(e)}")
        y_after_logo = y_logo + 60
    else:
        y_after_logo = 60
    
    # Add title
    pdf.set_y(y_after_logo + 30)
    pdf.set_font('Arial', 'B', 24)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 18, 'Predator-Prey Simulation', 0, 1, 'C')
    pdf.set_font('Arial', 'B', 18)
    pdf.cell(0, 12, 'using Lotka-Volterra Model', 0, 1, 'C')
    pdf.ln(10)
    
    # Add date
    pdf.set_font('Arial', 'I', 12)
    pdf.set_text_color(100, 100, 100)
    pdf.cell(0, 10, f'Report generated on {datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 0, 1, 'C')
    
    # Add simulation period
    pdf.set_font('Arial', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.ln(10)
    pdf.cell(0, 10, f'Simulation Period: {params["start_year"]} - {params["end_year"]}', 0, 1, 'C')
    
    # Add border
    pdf.set_draw_color(0, 51, 102)
    pdf.set_line_width(0.5)
    pdf.rect(10, 10, 190, 277)
    
    # Add introduction page
    pdf.add_page()
    pdf.set_draw_color(0, 51, 102)
    pdf.set_line_width(0.5)
    pdf.rect(10, 10, 190, 277)
    
    # Add section title
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Introduction', 0, 1, 'C')
    pdf.ln(5)
    
    # Add introduction text
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    intro_text = (
        "This report presents the results of a predator-prey simulation using the Lotka-Volterra model. "
        "The simulation models the interaction between two species: rabbits (prey) and wolves (predators). "
        "The Lotka-Volterra model is a pair of first-order, non-linear differential equations that describe "
        "the dynamics of biological systems in which two species interact, one as a predator and the other as prey.\n\n"
        
        "The simulation was executed using parallel processing to improve performance and provide a more "
        "realistic spatial representation of ecosystem dynamics. Each cell in the simulation grid represents "
        "a distinct area in the ecosystem with its own population dynamics.\n\n"
        
        "The following pages present the simulation parameters, results, and visualizations that help understand "
        "the complex dynamics between predator and prey populations over time."
    )
    pdf.multi_cell(0, 6, intro_text, 0, 'J')
    
    # Add parameters page
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Simulation Parameters', 0, 1, 'C')
    pdf.ln(5)
    
    # Add simulation parameters table
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    col_width = 95
    row_height = 8
    
    # Table header
    pdf.set_font('Arial', 'B', 11)
    pdf.set_fill_color(0, 51, 102)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(col_width, row_height, 'Parameter', 1, 0, 'C', 1)
    pdf.cell(col_width, row_height, 'Value', 1, 1, 'C', 1)
    
    # Table content
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', '', 11)
    fill = False
    pdf.set_fill_color(240, 240, 250)
    
    # Simulation parameters
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
    
    # Add model parameters table
    pdf.ln(10)
    pdf.set_font('Arial', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Model Parameters:', 0, 1)
    
    # Table header
    pdf.set_font('Arial', 'B', 11)
    pdf.set_fill_color(0, 51, 102)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(col_width, row_height, 'Parameter', 1, 0, 'C', 1)
    pdf.cell(col_width, row_height, 'Value', 1, 1, 'C', 1)
    
    # Table content
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', '', 11)
    fill = False
    
    # Model parameters
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
    
    # Add performance metrics if available
    if execution_time or cores_used:
        pdf.ln(10)
        pdf.set_font('Arial', 'B', 14)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, 'Performance Metrics:', 0, 1)
        
        # Table header
        pdf.set_font('Arial', 'B', 11)
        pdf.set_fill_color(0, 51, 102)
        pdf.set_text_color(255, 255, 255)
        pdf.cell(col_width, row_height, 'Metric', 1, 0, 'C', 1)
        pdf.cell(col_width, row_height, 'Value', 1, 1, 'C', 1)
        
        # Table content
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
    
    # Add population results page
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Population Results', 0, 1, 'C')
    pdf.ln(5)
    
    # Add population results table
    pdf.set_font('Arial', 'B', 11)
    pdf.set_fill_color(0, 51, 102)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(50, row_height, 'Metric', 1, 0, 'C', 1)
    pdf.cell(70, row_height, 'Rabbits', 1, 0, 'C', 1)
    pdf.cell(70, row_height, 'Wolves', 1, 1, 'C', 1)
    
    # Table content
    pdf.set_text_color(0, 0, 0)
    pdf.set_font('Arial', '', 11)
    fill = False
    
    # Population metrics
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
    
    # Add population by year table
    pdf.ln(10)
    pdf.set_font('Arial', 'B', 14)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'Population by Year:', 0, 1)
    
    # Table header function
    def add_population_table_header():
        pdf.set_fill_color(0, 51, 102)
        pdf.set_text_color(255, 255, 255)
        pdf.set_font('Arial', 'B', 10)
        pdf.cell(30, 8, 'Year', 1, 0, 'C', 1)
        pdf.cell(40, 8, 'Rabbits', 1, 0, 'C', 1)
        pdf.cell(40, 8, 'Wolves', 1, 0, 'C', 1)
        pdf.cell(40, 8, 'Rabbit:Wolf Ratio', 1, 1, 'C', 1)
        pdf.set_text_color(0, 0, 0)
        pdf.set_font('Arial', '', 10)
    
    # Add table data
    years_count = len(results['total_rabbits_by_year'])
    fill = False
    add_population_table_header()
    
    for i in range(years_count):
        year = results['start_year'] + i
        rabbits = int(results['total_rabbits_by_year'][i])
        wolves = int(results['total_wolves_by_year'][i])
        ratio = rabbits / wolves if wolves > 0 else float('inf')
        
        # Check if we need a new page
        if pdf.get_y() + 8 + 15 > pdf.h:
            pdf.add_page()
            add_population_table_header()
            fill = False
        
        # Add row
        pdf.set_fill_color(240, 240, 250) if fill else pdf.set_fill_color(230, 230, 240)
        pdf.cell(30, 8, str(year), 1, 0, 'C', fill)
        pdf.cell(40, 8, str(rabbits), 1, 0, 'C', fill)
        pdf.cell(40, 8, str(wolves), 1, 0, 'C', fill)
        pdf.cell(40, 8, f"{ratio:.2f}" if ratio != float('inf') else "∞", 1, 1, 'C', fill)
        fill = not fill
    
    # Add visualization pages
    # 1. Population Dynamics (Bar Chart)
    if os.path.exists(total_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 16)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Population Dynamics Over Time", 0, 1, 'C')
        
        # Add plot
        plot_x = 15
        plot_y = pdf.get_y() + 5
        plot_w = 180
        plot_h = 120
        pdf.image(total_plot, x=plot_x, y=plot_y, w=plot_w)
        
        # Add border
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        
        # Add caption
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 1: Population dynamics of rabbits and wolves over time", 0, 1, 'C')
        
        # Add description
        pdf.set_font('Arial', '', 11)
        pdf.multi_cell(0, 6, (
            "This bar chart shows the population changes of rabbits (blue) and wolves (red) over the simulation period. "
            "The rabbit population shows a steady increase over time, while the wolf population gradually decreases. "
            "This pattern is consistent with a predator-prey system where the predator population is not effectively "
            "controlling the prey population, possibly due to insufficient predation rate or high prey reproduction rate."
        ), 0, 'J')
        
        print(f'[INFO] Added population plot to PDF: {total_plot}')
    
    # 2. Phase Space Plot
    if os.path.exists(phase_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 16)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Phase Space: Predator vs Prey Population", 0, 1, 'C')
        
        # Add plot
        plot_x = 15
        plot_y = pdf.get_y() + 5
        plot_w = 180
        plot_h = 160
        pdf.image(phase_plot, x=plot_x, y=plot_y, w=plot_w)
        
        # Add border
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        
        # Add caption
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 2: Phase space diagram showing the relationship between predator and prey populations", 0, 1, 'C')
        
        # Add description
        pdf.set_font('Arial', '', 11)
        pdf.multi_cell(0, 6, (
            "The phase space plot shows the relationship between rabbit and wolf populations. Each point represents "
            "the population state at a specific year, and the arrows indicate the direction of change. In a typical "
            "predator-prey system, we would expect to see counterclockwise cycles. The trajectory in this simulation "
            "shows a different pattern, indicating that the system is not in a stable oscillatory state but rather "
            "moving toward a new equilibrium or possibly toward extinction of one species."
        ), 0, 'J')
        
        print(f'[INFO] Added phase space plot to PDF: {phase_plot}')
    
    # 3. Population Ratio Plot
    if os.path.exists(ratio_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 16)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Predator-Prey Ratio Over Time", 0, 1, 'C')
        
        # Add plot
        plot_x = 15
        plot_y = pdf.get_y() + 5
        plot_w = 180
        plot_h = 120
        pdf.image(ratio_plot, x=plot_x, y=plot_y, w=plot_w)
        
        # Add border
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        
        # Add caption
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 3: Ratio of rabbits to wolves over time", 0, 1, 'C')
        
        # Add description
        pdf.set_font('Arial', '', 11)
        pdf.multi_cell(0, 6, (
            "This graph shows the ratio of rabbits to wolves over time. The ratio increases steadily, indicating that "
            "rabbits are becoming increasingly dominant in the ecosystem. The blue shaded region represents a 'Rabbit Advantage' "
            "where rabbits outnumber wolves, while the red region represents a 'Wolf Advantage' where wolves outnumber rabbits. "
            "A ratio of 1 (the dashed line) would indicate equal populations. The increasing ratio suggests that the current "
            "parameter values may lead to an unsustainable ecosystem where predators cannot effectively control the prey population."
        ), 0, 'J')
        
        print(f'[INFO] Added ratio plot to PDF: {ratio_plot}')
    
    # 4. Grid Visualization
    if os.path.exists(grid_plot):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 16)
        pdf.set_text_color(0, 51, 102)
        pdf.cell(0, 10, "Final Grid Population Distribution", 0, 1, 'C')
        
        # Add plot
        plot_x = 15
        plot_y = pdf.get_y() + 5
        plot_w = 180
        plot_h = 160
        pdf.image(grid_plot, x=plot_x, y=plot_y, w=plot_w)
        
        # Add border
        pdf.set_draw_color(0, 51, 102)
        pdf.rect(plot_x-1, plot_y-1, plot_w+2, plot_h+2)
        
        # Add caption
        pdf.set_y(plot_y + plot_h + 5)
        pdf.set_font('Arial', 'I', 10)
        pdf.cell(0, 10, "Figure 4: Final distribution of rabbit and wolf populations across the grid", 0, 1, 'C')
        
        # Add description
        pdf.set_font('Arial', '', 11)
        pdf.multi_cell(0, 6, (
            f"This visualization shows the final distribution of rabbit and wolf populations across the {results['rows']}×{results['cols']} grid. "
            "Each cell represents a distinct area in the ecosystem, with blue cells containing rabbits, red cells containing wolves, and white cells being empty. "
            "The spatial distribution provides insights into how the two species interact in different areas of the ecosystem. "
            "The parallel processing approach allowed each grid cell to be calculated independently, providing a more realistic spatial representation of the ecosystem."
        ), 0, 'J')
        
        print(f'[INFO] Added grid visualization to PDF: {grid_plot}')
    
    # 5. Pie Charts
    for pie_path, pie_title, pie_desc, fig_num in [
        (pie_start, 'Rabbit-Wolf Ratio at Start of Simulation', 
         "This donut chart shows the initial proportion of rabbits and wolves in the ecosystem. At the start of the simulation, "
         f"rabbits made up {results['total_rabbits_by_year'][0] / (results['total_rabbits_by_year'][0] + results['total_wolves_by_year'][0]) * 100:.1f}% "
         f"of the population, while wolves made up {results['total_wolves_by_year'][0] / (results['total_rabbits_by_year'][0] + results['total_wolves_by_year'][0]) * 100:.1f}%. "
         "This initial ratio is a critical factor in determining the subsequent dynamics of the system.", 5),
        
        (pie_end, 'Rabbit-Wolf Ratio at End of Simulation',
         "This donut chart shows the final proportion of rabbits and wolves in the ecosystem. By the end of the simulation, "
         f"rabbits made up {results['total_rabbits_by_year'][-1] / (results['total_rabbits_by_year'][-1] + results['total_wolves_by_year'][-1]) * 100:.1f}% "
         f"of the population, while wolves made up {results['total_wolves_by_year'][-1] / (results['total_rabbits_by_year'][-1] + results['total_wolves_by_year'][-1]) * 100:.1f}%. "
         "Comparing this to the initial ratio provides insight into how the ecosystem balance has shifted over time.", 6),
        
        (pie_avg, 'Average Rabbit-Wolf Ratio Over Simulation',
         "This donut chart shows the average proportion of rabbits and wolves throughout the entire simulation period. "
         f"On average, rabbits made up {sum(results['total_rabbits_by_year']) / (sum(results['total_rabbits_by_year']) + sum(results['total_wolves_by_year'])) * 100:.1f}% "
         f"of the population, while wolves made up {sum(results['total_wolves_by_year']) / (sum(results['total_rabbits_by_year']) + sum(results['total_wolves_by_year'])) * 100:.1f}%. "
         "This average ratio helps understand the overall ecosystem balance during the simulation.", 7)
    ]:
        if pie_path and os.path.exists(pie_path):
            pdf.add_page()
            pdf.set_font('Arial', 'B', 16)
            pdf.set_text_color(0, 51, 102)
            pdf.cell(0, 10, pie_title, 0, 1, 'C')
            
            # Add plot
            plot_x = 35
            plot_y = pdf.get_y() + 5
            plot_w = 140
            plot_h = 140
            pdf.image(pie_path, x=plot_x, y=plot_y, w=plot_w)
            
            # Add caption
            pdf.set_y(plot_y + plot_h + 5)
            pdf.set_font('Arial', 'I', 10)
            pdf.cell(0, 10, f"Figure {fig_num}: {pie_title}", 0, 1, 'C')
            
            # Add description
            pdf.set_font('Arial', '', 11)
            pdf.multi_cell(0, 6, pie_desc, 0, 'J')
    
    # Add AI analysis summary
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, 'AI Analysis Summary', 0, 1, 'C')
    pdf.ln(5)
    
    # Add summary
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    pdf.set_draw_color(0, 51, 102)
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    pdf.ln(5)
    pdf.set_fill_color(255, 255, 255)
    
    # Check if summary is available
    if summary and summary.strip():
        pdf.multi_cell(0, 6, summary, 1, 'J')
    else:
        pdf.multi_cell(0, 6, "AI summary could not be generated due to missing API key.", 1, 'J')
    
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    
    # Add conclusion
    pdf.add_page()
    pdf.set_font('Arial', 'B', 16)
    pdf.set_text_color(0, 51, 102)
    pdf.cell(0, 10, "Conclusion", 0, 1, 'C')
    pdf.ln(5)
    
    # Add conclusion text
    pdf.set_font('Arial', '', 11)
    pdf.set_text_color(0, 0, 0)
    pdf.set_draw_color(0, 51, 102)
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    pdf.ln(5)
    
    conclusion_text = (
        "This simulation demonstrates the classic predator-prey dynamics using the Lotka-Volterra model, implemented with parallel processing for improved performance and spatial representation. "
        f"Starting with {results['total_rabbits_by_year'][0]} rabbits and {results['total_wolves_by_year'][0]} wolves, the simulation tracked population changes over {params['end_year'] - params['start_year']} years across a {results['rows']}×{results['cols']} grid.\n\n"
        "Key findings:\n\n"
        f"1. The rabbit population exhibited growth behavior, reaching a maximum of {max(results['total_rabbits_by_year'])} and a minimum of {min(results['total_rabbits_by_year'])}.\n\n"
        f"2. The wolf population showed a decline, reaching a maximum of {max(results['total_wolves_by_year'])} and a minimum of {min(results['total_wolves_by_year'])}.\n\n"
        "3. The phase space plot revealed the trajectory of the system, showing how the populations changed in relation to each other.\n\n"
        f"4. The parallel processing approach utilizing {cores_used if cores_used else 'multiple'} CPU cores allowed for efficient computation" + 
        (f", completing the simulation in {execution_time:.2f} seconds." if execution_time else ".")+"\n\n"
        "The results provide valuable insights into predator-prey dynamics and demonstrate how different parameter values can lead to different ecosystem outcomes. The spatial representation provided by the grid-based approach offers a more realistic model of how populations interact in a heterogeneous environment."
    )
    
    pdf.set_fill_color(255, 255, 255)
    pdf.multi_cell(0, 6, conclusion_text, 1, 'J')
    pdf.set_fill_color(240, 240, 250)
    pdf.rect(15, pdf.get_y(), 180, 5, 'F')
    
    # Save the PDF
    try:
        pdf.output(pdf_path)
        print(f'[INFO] PDF report generated: {pdf_path}')
        return pdf_path
    except Exception as e:
        print(f'[ERROR] Failed to generate PDF: {str(e)}')
        return None