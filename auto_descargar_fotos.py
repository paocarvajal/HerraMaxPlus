import os
import csv
import requests
from duckduckgo_search import DDGS
from pathlib import Path
import time
import urllib.parse

CSV_FILE = r'c:\Users\paola\Proyectos Antigravity\Ferreteria\Ferreteria_Data\Odoo_Electrica_45_Import.csv'
IMAGES_DIR = r'c:\Users\paola\Proyectos Antigravity\Ferreteria\Ferreteria_Data\Images\Electrica_45'

def download_image(url, save_path):
    try:
        response = requests.get(url, timeout=10, headers={'User-Agent': 'Mozilla/5.0'})
        if response.status_code == 200:
            with open(save_path, 'wb') as f:
                f.write(response.content)
            return True
    except Exception as e:
        return False
    return False

def main():
    if not os.path.exists(IMAGES_DIR):
        os.makedirs(IMAGES_DIR)

    with open(CSV_FILE, mode='r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        items = list(reader)

    ddgs = DDGS()
    print(f"Descargando imagenes para {len(items)} productos de Electrica 45...")

    contador = 0
    for item in items:
        ref = item['Internal Reference']
        name = item['Name']
        
        # Create a specific folder for each product to respect the upload structure
        folder_path = os.path.join(IMAGES_DIR, ref)
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)
            
        save_path = os.path.join(folder_path, f"{ref}.jpg")
        
        # Skip if already downloaded
        if os.path.exists(save_path):
            continue

        query = f"Herramienta {name}"
        
        try:
            results = ddgs.images(query, max_results=1)
            results_list = list(results)
            if results_list:
                img_url = results_list[0]['image']
                success = download_image(img_url, save_path)
                if success:
                    print(f"[OK] Descargado: {name} -> {save_path}")
                    contador += 1
                else:
                    print(f"[FALLO DESCARGA] {name}")
            else:
                print(f"[NO RESULTADOS] {name}")
        except Exception as e:
            print(f"[ERROR BÚSQUEDA] {name}: {e}")
            
        time.sleep(1) # Prevent rate limiting

    print(f"Completado. {contador} imagenes descargadas.")

if __name__ == '__main__':
    main()
