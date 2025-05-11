import os
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.ticker import MaxNLocator

def plot_population_trends(results, outdir):
    print(f'[INFO] Generating population trend plots in {outdir}')
    os.makedirs(outdir, exist_ok=True)
    plt.style.use('seaborn-v0_8-whitegrid')
    if 'total_rabbits_by_year' in results and 'total_wolves_by_year' in results:
        plt.figure(figsize=(10, 6))
        years = range(results['start_year'], results['start_year'] + len(results['total_rabbits_by_year']))
        plt.plot(years, results['total_rabbits_by_year'], 'b-', label='Rabbits', linewidth=2.5)
        plt.plot(years, results['total_wolves_by_year'], 'r-', label='Wolves', linewidth=2.5)
        marker_interval = max(1, len(list(years)) // 10)
        plt.plot(list(years)[::marker_interval], 
                 list(results['total_rabbits_by_year'])[::marker_interval], 
                 'bo', markersize=6)
        plt.plot(list(years)[::marker_interval], 
                 list(results['total_wolves_by_year'])[::marker_interval], 
                 'ro', markersize=6)
        plt.title('Population Dynamics Over Time', fontsize=18, fontweight='bold')
        plt.xlabel('Year', fontsize=14)
        plt.ylabel('Population', fontsize=14)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.legend(fontsize=12, frameon=True, facecolor='white', edgecolor='gray')
        max_rabbit_idx = np.argmax(results['total_rabbits_by_year'])
        max_wolf_idx = np.argmax(results['total_wolves_by_year'])
        min_rabbit_idx = np.argmin(results['total_rabbits_by_year'][1:]) + 1
        min_wolf_idx = np.argmin(results['total_wolves_by_year'][1:]) + 1
        if len(list(years)) > 5:
            plt.annotate(f'Max: {results["total_rabbits_by_year"][max_rabbit_idx]}',
                        xy=(list(years)[max_rabbit_idx], results['total_rabbits_by_year'][max_rabbit_idx]),
                        xytext=(10, 20), textcoords='offset points',
                        arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='blue'),
                        fontsize=10, color='blue')
            plt.annotate(f'Max: {results["total_wolves_by_year"][max_wolf_idx]}',
                        xy=(list(years)[max_wolf_idx], results['total_wolves_by_year'][max_wolf_idx]),
                        xytext=(10, -30), textcoords='offset points',
                        arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=.2', color='red'),
                        fontsize=10, color='red')
            if min_rabbit_idx > 1 and min_rabbit_idx < len(list(years)) - 1:
                plt.annotate(f'Min: {results["total_rabbits_by_year"][min_rabbit_idx]}',
                            xy=(list(years)[min_rabbit_idx], results['total_rabbits_by_year'][min_rabbit_idx]),
                            xytext=(-40, -30), textcoords='offset points',
                            arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=-.2', color='blue'),
                            fontsize=10, color='blue')
            if min_wolf_idx > 1 and min_wolf_idx < len(list(years)) - 1:
                plt.annotate(f'Min: {results["total_wolves_by_year"][min_wolf_idx]}',
                            xy=(list(years)[min_wolf_idx], results['total_wolves_by_year'][min_wolf_idx]),
                            xytext=(-40, 20), textcoords='offset points',
                            arrowprops=dict(arrowstyle='->', connectionstyle='arc3,rad=-.2', color='red'),
                            fontsize=10, color='red')
        max_pop = max(max(results['total_rabbits_by_year']), max(results['total_wolves_by_year']))
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
        plt.close()
        print(f'[INFO] Saved plot: {fname}')
        plt.figure(figsize=(8, 8))
        points = np.array([results['total_rabbits_by_year'], results['total_wolves_by_year']]).T
        colors = np.linspace(0, 1, len(points))
        for i in range(len(points) - 1):
            plt.plot(points[i:i+2, 0], points[i:i+2, 1], 'o-', 
                    color=plt.cm.viridis(colors[i]), 
                    linewidth=2.5, 
                    markersize=8 if i % marker_interval == 0 else 0)
        arrow_indices = np.linspace(0, len(points) - 2, min(20, len(points) - 1)).astype(int)
        for i in arrow_indices:
            plt.annotate('', 
                        xy=(points[i+1, 0], points[i+1, 1]),
                        xytext=(points[i, 0], points[i, 1]),
                        arrowprops=dict(arrowstyle='->', color='black', lw=1.5))
        if len(list(years)) <= 20:
            label_interval = 1
        else:
            label_interval = len(list(years)) // 10
        for i in range(0, len(list(years)), label_interval):
            if i < len(points):
                plt.annotate(str(list(years)[i]), 
                            xy=(points[i, 0], points[i, 1]),
                            xytext=(5, 5), textcoords="offset points", 
                            fontsize=9, fontweight='bold',
                            bbox=dict(boxstyle="round,pad=0.3", fc="white", ec="gray", alpha=0.8))
        sm = plt.cm.ScalarMappable(cmap=plt.cm.viridis, norm=plt.Normalize(vmin=results['start_year'], vmax=results['end_year']))
        sm.set_array([])
        cbar = plt.colorbar(sm, ax=plt.gca())
        cbar.set_label('Year', fontsize=12)
        plt.title('Phase Space: Predator vs Prey Population', fontsize=18, fontweight='bold')
        plt.xlabel('Rabbit Population', fontsize=14)
        plt.ylabel('Wolf Population', fontsize=14)
        plt.grid(True, linestyle='--', alpha=0.3)
        plt.gca().set_facecolor('#f8f9fa')
        for spine in plt.gca().spines.values():
            spine.set_visible(True)
            spine.set_color('gray')
            spine.set_linewidth(0.5)
        phase_fname = os.path.join(outdir, "phase_space.png")
        plt.savefig(phase_fname, dpi=300, bbox_inches='tight')
        plt.close()
        print(f'[INFO] Saved phase space plot: {phase_fname}')
        plt.figure(figsize=(10, 6))
        ratios = []
        for r, w in zip(results['total_rabbits_by_year'], results['total_wolves_by_year']):
            if r > 0:
                ratios.append(w / r)
            else:
                ratios.append(0)
        plt.plot(years, ratios, 'g-', linewidth=2.5)
        plt.plot(list(years)[::marker_interval], list(ratios)[::marker_interval], 'go', markersize=6)
        plt.title('Predator-Prey Ratio Over Time', fontsize=18, fontweight='bold')
        plt.xlabel('Year', fontsize=14)
        plt.ylabel('Wolves/Rabbits Ratio', fontsize=14)
        plt.grid(True, linestyle='--', alpha=0.7)
        plt.gca().xaxis.set_major_locator(MaxNLocator(integer=True))
        plt.grid(True, linestyle='--', alpha=0.3)
        plt.gca().set_facecolor('#f8f9fa')
        for spine in plt.gca().spines.values():
            spine.set_visible(True)
            spine.set_color('gray')
            spine.set_linewidth(0.5)
        ratio_fname = os.path.join(outdir, "population_ratio.png")
        plt.savefig(ratio_fname, dpi=300, bbox_inches='tight')
        plt.close()
        print(f'[INFO] Saved ratio plot: {ratio_fname}')
        if 'yearly_results' in results and len(results['yearly_results']) > 0:
            final_year_data = results['yearly_results'][-1]
            rows = results['rows']
            cols = results['cols']
            rabbit_grid = np.zeros((rows, cols))
            wolf_grid = np.zeros((rows, cols))
            for cell_data in final_year_data:
                r, c = cell_data['grid']
                rabbit_grid[r, c] = cell_data['rabbits']
                wolf_grid[r, c] = cell_data['wolves']
            fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 6))
            rabbit_map = ax1.imshow(rabbit_grid, cmap='Blues', interpolation='nearest')
            ax1.set_title('Final Rabbit Population Distribution', fontsize=14, fontweight='bold')
            ax1.set_xlabel('Column', fontsize=12)
            ax1.set_ylabel('Row', fontsize=12)
            fig.colorbar(rabbit_map, ax=ax1, label='Rabbit Population')
            for r in range(rows):
                for c in range(cols):
                    if rabbit_grid[r, c] > 0:
                        ax1.text(c, r, f"{int(rabbit_grid[r, c])}", 
                                ha="center", va="center", 
                                color="black" if rabbit_grid[r, c] < np.max(rabbit_grid) * 0.7 else "white",
                                fontsize=8)
            wolf_map = ax2.imshow(wolf_grid, cmap='Reds', interpolation='nearest')
            ax2.set_title('Final Wolf Population Distribution', fontsize=14, fontweight='bold')
            ax2.set_xlabel('Column', fontsize=12)
            ax2.set_ylabel('Row', fontsize=12)
            fig.colorbar(wolf_map, ax=ax2, label='Wolf Population')
            for r in range(rows):
                for c in range(cols):
                    if wolf_grid[r, c] > 0:
                        ax2.text(c, r, f"{int(wolf_grid[r, c])}", 
                                ha="center", va="center", 
                                color="black" if wolf_grid[r, c] < np.max(wolf_grid) * 0.7 else "white",
                                fontsize=8)
            plt.tight_layout()
            grid_fname = os.path.join(outdir, "grid_visualization.png")
            plt.savefig(grid_fname, dpi=300, bbox_inches='tight')
            plt.close()
            print(f'[INFO] Saved grid visualization: {grid_fname}')
        return fname, phase_fname, ratio_fname, os.path.join(outdir, "grid_visualization.png") if 'yearly_results' in results else None, None
    return None, None, None, None, None 