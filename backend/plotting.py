import os
import numpy as np
import matplotlib
matplotlib.use('Agg')  
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

def plot_population_trends(results, outdir):
    print(f'[INFO] Generating population trend plots in {outdir}')
    os.makedirs(outdir, exist_ok=True)
    plt.style.use('seaborn-v0_8-whitegrid')

    if 'total_rabbits_by_year' in results and 'total_wolves_by_year' in results:
        plt.figure(figsize=(10, 6))
        years = list(range(results['start_year'], results['start_year'] + len(results['total_rabbits_by_year'])))
        
        # Plotting the populations
        plt.plot(years, results['total_rabbits_by_year'], 'b-', label='Rabbits', linewidth=2.5)
        plt.plot(years, results['total_wolves_by_year'], 'r-', label='Wolves', linewidth=2.5)

        # Adding markers at intervals
        marker_interval = max(1, len(years) // 10)
        plt.plot(years[::marker_interval], list(results['total_rabbits_by_year'])[::marker_interval], 'bo', markersize=6)
        plt.plot(years[::marker_interval], list(results['total_wolves_by_year'])[::marker_interval], 'ro', markersize=6)
        
        # Title and labels
        plt.title('Population Dynamics Over Time', fontsize=18, fontweight='bold')
        plt.xlabel('Year', fontsize=14)
        plt.ylabel('Population', fontsize=14)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.legend(fontsize=12, frameon=True, facecolor='white', edgecolor='gray')

        # Adding annotations for max/min population values
        max_rabbit_idx = np.argmax(results['total_rabbits_by_year'])
        max_wolf_idx = np.argmax(results['total_wolves_by_year'])
        min_rabbit_idx = np.argmin(results['total_rabbits_by_year'][1:]) + 1
        min_wolf_idx = np.argmin(results['total_wolves_by_year'][1:]) + 1

        if len(years) > 5:
            plt.annotate(f'Max: {results["total_rabbits_by_year"][max_rabbit_idx]}',
                         xy=(years[max_rabbit_idx], results['total_rabbits_by_year'][max_rabbit_idx]),
                         xytext=(10, 20), textcoords='offset points',
                         arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='blue'),
                         fontsize=10, color='blue')
            plt.annotate(f'Max: {results["total_wolves_by_year"][max_wolf_idx]}',
                         xy=(years[max_wolf_idx], results['total_wolves_by_year'][max_wolf_idx]),
                         xytext=(10, -30), textcoords='offset points',
                         arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='red'),
                         fontsize=10, color='red')
            if 1 < min_rabbit_idx < len(years) - 1:
                plt.annotate(f'Min: {results["total_rabbits_by_year"][min_rabbit_idx]}',
                             xy=(years[min_rabbit_idx], results['total_rabbits_by_year'][min_rabbit_idx]),
                             xytext=(-40, -30), textcoords='offset points',
                             arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=-.2', color='blue'),
                             fontsize=10, color='blue')
            if 1 < min_wolf_idx < len(years) - 1:
                plt.annotate(f'Min: {results["total_wolves_by_year"][min_wolf_idx]}',
                             xy=(years[min_wolf_idx], results['total_wolves_by_year'][min_wolf_idx]),
                             xytext=(-40, 20), textcoords='offset points',
                             arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=-.2', color='red'),
                             fontsize=10, color='red')

        max_pop = max(max(results['total_rabbits_by_year']), max(results['total_wolves_by_year']))
        plt.ylim(0, max_pop * 1.2)
        plt.gca().xaxis.set_major_locator(MaxNLocator(integer=True))
        plt.grid(True, linestyle='--', alpha=0.3)
        plt.gca().set_facecolor('#f8f9fa')

        # Adjusting spines and saving the plot
        for spine in plt.gca().spines.values():
            spine.set_visible(True)
            spine.set_color('gray')
            spine.set_linewidth(0.5)
        
        fname = os.path.join(outdir, "total_population.png")
        plt.savefig(fname, dpi=300, bbox_inches='tight')
        plt.close()
        print(f'[INFO] Saved plot: {fname}')
        return fname

    return None

def plot_rabbit_wolf_ratio_pie(results, outdir):
    os.makedirs(outdir, exist_ok=True)
    
    # Data for start, end, and average
    start_rabbits = results['total_rabbits_by_year'][0]
    start_wolves = results['total_wolves_by_year'][0]
    end_rabbits = results['total_rabbits_by_year'][-1]
    end_wolves = results['total_wolves_by_year'][-1]
    avg_rabbits = np.mean(results['total_rabbits_by_year'])
    avg_wolves = np.mean(results['total_wolves_by_year'])

    chart_data = [
        (start_rabbits, start_wolves, 'Start of Simulation', 'rabbit_wolf_ratio_start.png'),
        (end_rabbits, end_wolves, 'End of Simulation', 'rabbit_wolf_ratio_end.png'),
        (avg_rabbits, avg_wolves, 'Average Over Simulation', 'rabbit_wolf_ratio_avg.png'),
    ]
    
    for rabbits, wolves, title, fname in chart_data:
        fig, ax = plt.subplots(figsize=(5, 5))
        sizes = [rabbits, wolves]
        labels = ['Rabbits', 'Wolves']
        colors = ['#4F8EF7', '#E94F37']

        wedges, texts, autotexts = ax.pie(
            sizes,
            labels=labels,
            autopct=lambda pct: f'{pct:.1f}%\n({int(pct/100*sum(sizes))})',
            startangle=90,
            colors=colors,
            wedgeprops=dict(width=0.4, edgecolor='w'),
            textprops={'fontsize': 12}
        )
        
        ax.set_title(f'{title}\nRabbit-Wolf Ratio', fontsize=14, fontweight='bold')

        # Adding a center circle to make it a donut chart
        centre_circle = plt.Circle((0, 0), 0.70, fc='white')
        fig.gca().add_artist(centre_circle)

        plt.tight_layout()
        outpath = os.path.join(outdir, fname)
        plt.savefig(outpath, dpi=200, bbox_inches='tight')
        plt.close()
        print(f'[INFO] Saved pie chart: {outpath}')

    return (
        os.path.join(outdir, 'rabbit_wolf_ratio_start.png'),
        os.path.join(outdir, 'rabbit_wolf_ratio_end.png'),
        os.path.join(outdir, 'rabbit_wolf_ratio_avg.png'),
    )
