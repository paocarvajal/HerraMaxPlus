import pandas as pd

def generate_odoo_update():
    input_file = r'..\Ferreteria_Data\Prices_and_Catalogs\Lista de Productos y precios Truper 2026.xlsx'
    output_file = r'..\Ferreteria_Data\Odoo_Fix_Prices_Update.csv'
    
    print("Leyendo catálogo de Truper...")
    df = pd.read_excel(input_file)
    
    # Cleaning any empty rows or NaNs in 'código'
    df = df.dropna(subset=['código'])
    
    # Mapping columns to exactly what Odoo natively expects for updates
    # We will use Odoo's technical names or verbatim UI names.
    odoo_mapping = pd.DataFrame()
    
    # 1. Identificador único para que Odoo sepa qué actualizar (sin duplicar)
    odoo_mapping['Internal Reference'] = df['código'].astype(str)
    odoo_mapping['Name'] = df['descripción'].astype(str)
    
    # 2. Corrección del precio de venta (Asumiendo que 'Precio de venta sin iva' es tu precio base)
    # y el costo
    odoo_mapping['Sales Price'] = df['Precio de venta sin iva'].round(2)
    odoo_mapping['Cost'] = df['Costo'].round(2)
    
    # 3. Extras útiles que Odoo entiende automáticamente
    if 'Código Barras' in df.columns:
        odoo_mapping['Barcode'] = df['Código Barras'].astype(str).str.replace('\.0', '', regex=True)
        
    if 'Peso[Kg]' in df.columns:
        odoo_mapping['Weight'] = df['Peso[Kg]'].fillna(0).round(3)
        
    if 'Volumen[m3]' in df.columns:
        odoo_mapping['Volume'] = df['Volumen[m3]'].fillna(0).round(5)

    if 'Marca' in df.columns:
        odoo_mapping['Product Category'] = df['Categoría'] # Opcionalmente actualizar familia
    
    odoo_mapping.to_csv(output_file, index=False)
    print(f"¡Archivo generado exitosamente en {output_file}!")
    print(f"Total de productos preparados para la actualización: {len(odoo_mapping)}")

if __name__ == '__main__':
    generate_odoo_update()
