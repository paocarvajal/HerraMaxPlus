import pandas as pd
import pdfplumber
import os

def process_f41():
    pdf_path = r"..\Ferreteria_Data\Ferreteria_41\lista precios 02 03 2026.pdf"
    analisis_path = r"..\Ferreteria_Data\Prices_and_Catalogs\Analisis_Ferreteria_41.xlsx"
    output_path = r"..\Ferreteria_Data\Odoo_Ferreteria_41_Import.csv"
    
    print("Extrayendo PDF de Ferretería 41 para obtener precios públicos...")
    items = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for i, page in enumerate(pdf.pages):
            text = page.extract_text()
            if not text: continue
            
            for line in text.split('\n'):
                parts = line.split()
                if len(parts) >= 4:
                    publico_str = parts[-2].replace(',', '')
                    mayoreo_str = parts[-1].replace(',', '')
                    
                    if publico_str.replace('.', '', 1).isdigit() and mayoreo_str.replace('.', '', 1).isdigit():
                        clave = parts[0]
                        desc = " ".join(parts[1:-2])
                        publico = float(publico_str)
                        mayoreo = float(mayoreo_str)
                        
                        if clave != "CLAVE" and not "MAYOREO" in clave:
                            items.append({
                                'Codigo': clave,
                                'PDF_Publico_IVA': publico,
                                'PDF_Mayoreo_IVA': mayoreo,
                            })

    df_pdf = pd.DataFrame(items)
    
    print("Mezclando con las categorías ya mapeadas de Truper...")
    df_analisis = pd.read_excel(analisis_path)
    
    df_merged = pd.merge(df_analisis, df_pdf, on='Codigo', how='left')
    
    # === REGLAS DE NEGOCIO ODOO HERRAMAX ===
    # 1. Quitar IVA del Costo (Mayoreo)
    df_merged['Cost'] = (df_merged['PDF_Mayoreo_IVA'] / 1.16).round(2)
    
    # 2. Quitar IVA del Público y sumarle tu 20% deseado
    base_public = df_merged['PDF_Publico_IVA'] / 1.16
    df_merged['Sales Price'] = (base_public * 1.20).round(2)
    
    # === CREAR CSV ODOO ===
    odoo_df = pd.DataFrame()
    # Para diferenciarlos de Truper y no chocar si hay claves iguales, 
    # podemos añadirles un prefijo, pero la usuaria quiere tenerlos en sistema.
    odoo_df['Internal Reference'] = 'F41-' + df_merged['Codigo'].astype(str)
    odoo_df['Name'] = df_merged['Descripción']
    odoo_df['Cost'] = df_merged['Cost']
    odoo_df['Sales Price'] = df_merged['Sales Price']
    odoo_df['Product Category'] = df_merged['Categoría (Familia)']
    
    # Reemplazar valores vacios por una categoria generica 
    odoo_df['Product Category'] = odoo_df['Product Category'].fillna('Ferretería 41')
    
    odoo_df.to_csv(output_path, index=False)
    print(f"Listos {len(odoo_df)} productos para Odoo en: {output_path}")

if __name__ == '__main__':
    process_f41()
