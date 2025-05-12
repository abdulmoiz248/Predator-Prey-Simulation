import os
import numpy as np
import matplotlib
# Set non-interactive backend to avoid thread issues
matplotlib.use('Agg')
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator
from matplotlib.colors import LinearSegmentedColormap

def plot_population_trends(results, outdir):
    """Generate a line plot showing rabbit and wolf populations over time."""
    print(f'[INFO] Generating population trend plot in {outdir}')
    os.makedirs(outdir, exist_ok=True)
    
    rabbits = list(results['total_rabbits_by_year'])
    wolves = list(results['total_wolves_by_year'])
    years = list(range(results['start_year'], results['start_year'] + len(rabbits)))

    # Create a new figure for this plot
    plt.figure(figsize=(10, 6))
    plt.plot(years, rabbits, 'b-', label='Rabbits', linewidth=2.5)
    plt.plot(years, wolves, 'r-', label='Wolves', linewidth=2.5)

    marker_interval = max(1, len(years) // 10)
    plt.plot(years[::marker_interval], rabbits[::marker_interval], 'bo', markersize=6)
    plt.plot(years[::marker_interval], wolves[::marker_interval], 'ro', markersize=6)

    plt.title('Population Dynamics Over Time', fontsize=18, fontweight='bold')
    plt.xlabel('Year', fontsize=14)
    plt.ylabel('Population', fontsize=14)
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.legend(fontsize=12, frameon=True, facecolor='white', edgecolor='gray')

    # Add annotations for maximum points
    max_rabbit_idx = np.argmax(rabbits)
    max_wolf_idx = np.argmax(wolves)
    
    plt.annotate(f'Max: {rabbits[max_rabbit_idx]}',
                 xy=(years[max_rabbit_idx], rabbits[max_rabbit_idx]),
                 xytext=(10, 20), textcoords='offset points',
                 arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='blue'),
                 fontsize=10, color='blue')
    
    plt.annotate(f'Max: {wolves[max_wolf_idx]}',
                 xy=(years[max_wolf_idx], wolves[max_wolf_idx]),
                 xytext=(10, -30), textcoords='offset points',
                 arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='red'),
                 fontsize=10, color='red')

    max_pop = max(max(rabbits), max(wolves))
    plt.ylim(0, max_pop * 1.2)
    plt.gca().xaxis.set_major_locator(MaxNLocator(integer=True))
    plt.grid(True, linestyle='--', alpha=0.3)
    plt.gca().set_facecolor('#f8f9fa')

    for spine in plt.gca().spines.values():
        spine.set_visible(True)
        spine.set_color('gray')
        spine.set_linewidth(0.5)

    fname = os.path.join(outdir, "total_population.png")
    plt.savefig(fname, dpi=300, bbox_inches='tight')
    plt.close()  # Important: close the figure to free memory
    print(f'[INFO] Saved plot: {fname}')
    return fname

def plot_rabbit_wolf_ratio_pie(results, outdir):
    """Generate pie charts showing the ratio of rabbits to wolves."""
    print(f'[INFO] Generating rabbit-wolf ratio pie charts in {outdir}')
    os.makedirs(outdir, exist_ok=True)

    rabbits = list(results['total_rabbits_by_year'])
    wolves = list(results['total_wolves_by_year'])

    start_rabbits = max(1, rabbits[0])
    start_wolves = max(1, wolves[0])
    end_rabbits = max(1, rabbits[-1])
    end_wolves = max(1, wolves[-1])
    avg_rabbits = max(1, int(np.mean(rabbits)))
    avg_wolves = max(1, int(np.mean(wolves)))

    chart_data = [
        (start_rabbits, start_wolves, 'Start of Simulation', 'rabbit_wolf_ratio_start.png'),
        (end_rabbits, end_wolves, 'End of Simulation', 'rabbit_wolf_ratio_end.png'),
        (avg_rabbits, avg_wolves, 'Average Over Simulation', 'rabbit_wolf_ratio_avg.png'),
    ]

    pie_paths = []
    for rabbits, wolves, title, fname in chart_data:
        # Create a separate figure for each pie chart
        plt.figure(figsize=(7, 7))
        
        sizes = [rabbits, wolves]
        labels = ['Rabbits', 'Wolves']
        colors = ['#4F8EF7', '#E94F37']

        # Create the pie chart
        wedges, texts, autotexts = plt.pie(
            sizes,
            labels=labels,
            autopct=lambda pct: f'{pct:.1f}%\n({int(pct/100*sum(sizes))})',
            startangle=90,
            colors=colors,
            wedgeprops=dict(width=0.4, edgecolor='w'),
            textprops={'fontsize': 12}
        )

        plt.title(f'{title}\nRabbit-Wolf Ratio', fontsize=14, fontweight='bold')
        
        # Add the center circle to create a donut chart
        centre_circle = plt.Circle((0, 0), 0.70, fc='white')
        fig = plt.gcf()
        fig.gca().add_artist(centre_circle)

        plt.tight_layout()
        outpath = os.path.join(outdir, fname)
        plt.savefig(outpath, dpi=200, bbox_inches='tight')
        plt.close()  # Important: close the figure
        print(f'[INFO] Saved pie chart: {outpath}')
        pie_paths.append(outpath)

    return tuple(pie_paths)

def plot_grid_visualization(results, outdir):
    """Generate a grid visualization of the ecosystem."""
    print(f'[INFO] Generating grid visualization in {outdir}')
    os.makedirs(outdir, exist_ok=True)
    
    # Create a sample grid if not provided in results
    if 'grid_data' not in results:
        grid_size = 20
        # Create a grid with: 0=empty, 1=rabbit, 2=wolf
        grid = np.zeros((grid_size, grid_size), dtype=int)
        
        # Place rabbits (more common)
        rabbit_count = results['total_rabbits_by_year'][-1]
        rabbit_positions = np.random.choice(grid_size*grid_size, min(rabbit_count, grid_size*grid_size//2), replace=False)
        for pos in rabbit_positions:
            grid[pos // grid_size, pos % grid_size] = 1
            
        # Place wolves (less common)
        wolf_count = results['total_wolves_by_year'][-1]
        remaining_positions = [i for i in range(grid_size*grid_size) if i not in rabbit_positions]
        wolf_positions = np.random.choice(remaining_positions, min(wolf_count, len(remaining_positions)), replace=False)
        for pos in wolf_positions:
            grid[pos // grid_size, pos % grid_size] = 2
    else:
        grid = results['grid_data']
    
    # Create a custom colormap: 0=empty (white), 1=rabbit (blue), 2=wolf (red)
    colors = ['#FFFFFF', '#4F8EF7', '#E94F37']
    cmap = LinearSegmentedColormap.from_list('custom_cmap', colors, N=3)
    
    plt.figure(figsize=(10, 10))
    plt.imshow(grid, cmap=cmap, interpolation='nearest')
    
    # Add a color bar
    cbar = plt.colorbar(ticks=[0, 1, 2])
    cbar.set_ticklabels(['Empty', 'Rabbit', 'Wolf'])
    
    plt.title('Ecosystem Grid Visualization', fontsize=16, fontweight='bold')
    plt.grid(False)
    
    # Remove axis ticks for cleaner visualization
    plt.xticks([])
    plt.yticks([])
    
    fname = os.path.join(outdir, "grid_visualization.png")
    plt.savefig(fname, dpi=300, bbox_inches='tight')
    plt.close()
    print(f'[INFO] Saved grid visualization: {fname}')
    return fname

def plot_phase_space(results, outdir):
    """Generate a phase space plot showing the relationship between rabbit and wolf populations."""
    print(f'[INFO] Generating phase space plot in {outdir}')
    os.makedirs(outdir, exist_ok=True)
    
    rabbits = results['total_rabbits_by_year']
    wolves = results['total_wolves_by_year']
    years = list(range(results['start_year'], results['start_year'] + len(rabbits)))
    
    plt.figure(figsize=(10, 8))
    
    # Plot the phase space trajectory
    plt.plot(rabbits, wolves, 'k-', linewidth=1.5, alpha=0.7)
    
    # Add arrows to show direction
    for i in range(len(rabbits)-1):
        if i % 2 == 0:  # Add arrows every other segment to avoid clutter
            plt.arrow(rabbits[i], wolves[i], 
                     (rabbits[i+1] - rabbits[i])*0.8, 
                     (wolves[i+1] - wolves[i])*0.8,
                     head_width=max(rabbits)*0.02, 
                     head_length=max(rabbits)*0.03, 
                     fc='k', ec='k', alpha=0.7)
    
    # Plot points with year labels
    for i, (r, w, y) in enumerate(zip(rabbits, wolves, years)):
        plt.scatter(r, w, s=100, c='#4F8EF7' if i == 0 else '#E94F37' if i == len(rabbits)-1 else 'gray', 
                   zorder=5, edgecolor='black')
        plt.annotate(str(y), (r, w), xytext=(5, 5), textcoords='offset points', fontsize=9)
    
    plt.title('Predator-Prey Phase Space', fontsize=16, fontweight='bold')
    plt.xlabel('Rabbit Population', fontsize=14)
    plt.ylabel('Wolf Population', fontsize=14)
    plt.grid(True, linestyle='--', alpha=0.7)
    
    # Add a legend for start and end points
    plt.scatter([], [], s=100, c='#4F8EF7', edgecolor='black', label=f'Start ({years[0]})')
    plt.scatter([], [], s=100, c='#E94F37', edgecolor='black', label=f'End ({years[-1]})')
    plt.legend()
    
    # Set axis limits with some padding
    plt.xlim(min(rabbits)*0.9, max(rabbits)*1.1)
    plt.ylim(min(wolves)*0.9, max(wolves)*1.1)
    
    fname = os.path.join(outdir, "phase_space.png")
    plt.savefig(fname, dpi=300, bbox_inches='tight')
    plt.close()
    print(f'[INFO] Saved phase space plot: {fname}')
    return fname

def plot_population_ratio(results, outdir):
    """Generate a plot showing the ratio of rabbits to wolves over time."""
    print(f'[INFO] Generating population ratio plot in {outdir}')
    os.makedirs(outdir, exist_ok=True)
    
    rabbits = results['total_rabbits_by_year']
    wolves = results['total_wolves_by_year']
    years = list(range(results['start_year'], results['start_year'] + len(rabbits)))
    
    # Calculate ratios (rabbits:wolves)
    ratios = []
    for r, w in zip(rabbits, wolves):
        if w > 0:
            ratios.append(r/w)
        else:
            ratios.append(100)  # Cap at 100 if wolves are extinct
    
    plt.figure(figsize=(10, 6))
    
    # Plot the ratio line
    plt.plot(years, ratios, 'g-', linewidth=2.5, label='Rabbit:Wolf Ratio')
    plt.scatter(years, ratios, c='green', s=80, zorder=5)
    
    # Add a horizontal line at ratio = 1 (equal populations)
    plt.axhline(y=1, color='gray', linestyle='--', alpha=0.7, label='Equal Population')
    
    plt.title('Rabbit to Wolf Population Ratio Over Time', fontsize=16, fontweight='bold')
    plt.xlabel('Year', fontsize=14)
    plt.ylabel('Rabbit:Wolf Ratio', fontsize=14)
    plt.grid(True, linestyle='--', alpha=0.7)
    plt.legend(fontsize=12)
    
    # Use log scale for y-axis if ratios vary widely
    if max(ratios) / (min(ratios) if min(ratios) > 0 else 0.1) > 10:
        plt.yscale('log')
        plt.ylabel('Rabbit:Wolf Ratio (log scale)', fontsize=14)
    
    # Add annotations for key points
    max_ratio_idx = np.argmax(ratios)
    min_ratio_idx = np.argmin(ratios)
    
    plt.annotate(f'Max: {ratios[max_ratio_idx]:.1f}',
                 xy=(years[max_ratio_idx], ratios[max_ratio_idx]),
                 xytext=(10, 20), textcoords='offset points',
                 arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='green'),
                 fontsize=10, color='green')
    
    plt.annotate(f'Min: {ratios[min_ratio_idx]:.1f}',
                 xy=(years[min_ratio_idx], ratios[min_ratio_idx]),
                 xytext=(10, -30), textcoords='offset points',
                 arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='green'),
                 fontsize=10, color='green')
    
    plt.gca().xaxis.set_major_locator(MaxNLocator(integer=True))
    
    fname = os.path.join(outdir, "population_ratio.png")
    plt.savefig(fname, dpi=300, bbox_inches='tight')
    plt.close()
    print(f'[INFO] Saved population ratio plot: {fname}')
    return fname

# Example usage
if __name__ == "__main__":
    # Sample data for demonstration
    results = {
        'start_year': 2023,
        'total_rabbits_by_year': [100, 110, 120, 130, 145, 160, 175, 190, 210, 230, 252],
        'total_wolves_by_year': [20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10],
    }
    
    outdir = "output_graphs"
    
    # Generate all plots
    plot_population_trends(results, outdir)
    plot_rabbit_wolf_ratio_pie(results, outdir)
    plot_grid_visualization(results, outdir)
    plot_phase_space(results, outdir)
    plot_population_ratio(results, outdir)
    
    print(f"All plots have been saved to the '{outdir}' directory.")