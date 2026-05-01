import os
import pdfplumber
import pandas as pd
import glob

def process_e45():
    pdf_files = glob.glob(r"..\Ferreteria_Data\Electrica_45\*.pdf")
    output_path = r"..\Ferreteria_Data\Odoo_Electrica_45_Import.csv"
    
    items = []
    
    print(f"Encontrados {len(pdf_files)} PDFs de Eléctrica 45.")
    for pdf_path in pdf_files:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if not text: continue
                
                # Ejemplo de linea: "4269 CENTRO-CARGA ARGOS 2 UNI EMPOTRAR 1 64.09 64.09 May"
                for line in text.split('\n'):
                    parts = line.split()
                    if len(parts) >= 6:
                        obs = parts[-1]
                        if obs in ['May', 'Pza', 'PZA', 'MAY']: # General indicator of data line end
                            codigo = parts[0]
                            # Verificar que codigo sea un numero o clave alfanumerica simple
                            if codigo.isdigit() or codigo.isalnum():
                                try:
                                    unit_price = float(parts[-3].replace(',', ''))
                                    desc = " ".join(parts[1:-4])
                                    
                                    items.append({
                                        'Internal Reference': f"E45-{codigo}",
                                        'Name': desc.strip(),
                                        'Cost': unit_price, # Estos PDFs traen el precio base antes de IVA
                                    })
                                except:
                                    pass

    if not items:
        print("No se extrajeron artículos.")
        return

    # Eliminar duplicados si los cotizó varias veces
    df = pd.DataFrame(items)
    df = df.drop_duplicates(subset=['Internal Reference'], keep='last')
    
    # === APLICAR REGLA DE NEGOCIO ===
    # Ya que los PDFs de Eléctrica 45 NO tienen "Precio Público", 
    # asuminos el Costo Real limpio y le agregamos un 30% como markup base para E-commerce
    # (Margen conservador para retail si no tenemos el precio sugerido, Odoo lo puede ajustar después).
    df['Sales Price'] = (df['Cost'] * 1.30).round(2)
    
    # Todo cae en la categoría del proveedor por defecto
    df['Product Category'] = 'Eléctrica 45'
    
    df.to_csv(output_path, index=False)
    print(f"Listos {len(df)} productos de Eléctrica 45 guardados en: {output_path}")

if __name__ == '__main__':
    process_e45()
