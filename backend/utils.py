import os
import requests
import matplotlib.pyplot as plt
import numpy as np

def download_logo():
    logo_path = os.path.join(os.path.dirname(__file__), 'static', 'comsats_logo.png')
    if not os.path.exists(logo_path):
        try:
            logo_url = "https://www.comsats.edu.pk/Images/COMSATS_logo.png"
            response = requests.get(logo_url)
            if response.status_code == 200:
                with open(logo_path, 'wb') as f:
                    f.write(response.content)
                print(f"[INFO] Downloaded COMSATS logo to {logo_path}")
            else:
                print(f"[WARNING] Failed to download logo: HTTP {response.status_code}")
                create_fallback_logo(logo_path)
        except Exception as e:
            print(f"[WARNING] Failed to download logo: {str(e)}")
            create_fallback_logo(logo_path)
    return logo_path

def create_fallback_logo(logo_path):
    try:
        plt.figure(figsize=(4, 2))
        plt.text(0.5, 0.5, 'COMSATS', fontsize=24, ha='center', va='center', fontweight='bold')
        plt.axis('off')
        plt.savefig(logo_path, dpi=100, bbox_inches='tight')
        plt.close()
        print(f"[INFO] Created fallback logo at {logo_path}")
    except Exception as e:
        print(f"[ERROR] Failed to create fallback logo: {str(e)}")

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