import pandas as pd

def read_excel(file_path):
    print(f"--- Reading {file_path} ---")
    try:
        df = pd.read_excel(file_path, nrows=5)
        print("Columns:")
        print(df.columns.tolist())
        print("\nHead data:")
        print(df.head(2).to_dict('records'))
    except Exception as e:
        print(f"Error reading file: {e}")

try:
    read_excel(r'..\Ferreteria_Data\Plantilla_Odoo.xlsx')
    read_excel(r'..\Ferreteria_Data\Prices_and_Catalogs\Lista de Productos y precios Truper 2026.xlsx')
except Exception as e:
    print(f"General error: {e}")
