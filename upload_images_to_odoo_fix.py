import os
import xmlrpc.client
import base64
import sys

# Odoo Connection Settings
URL = 'https://paocarvajal-herramax-odoo-main-30628806.dev.odoo.com'
DB = 'paocarvajal-herramax-odoo-main-30628806'
USER = 'admin'
API_KEY = '27e3714a4ed4b3a7b6470e96ebdcd5dcf9d91236'

# Path to the parent folder containing Fiero and Foset folders
IMAGES_ROOT = r'c:\Users\paola\Proyectos Antigravity\Ferreteria\Ferreteria_Data\Images\Klintek'

def main():
    print("Iniciando conexion con Odoo para CORREGIR imagenes...")
    try:
        common = xmlrpc.client.ServerProxy(f'{URL}/xmlrpc/2/common')
        uid = common.authenticate(DB, USER, API_KEY, {})
        if not uid:
            print("Fallo critico: No se pudo autenticar.")
            return
        
        models = xmlrpc.client.ServerProxy(f'{URL}/xmlrpc/2/object')
        print(f"Conexion establecida. Iniciando escaneo de imagenes en {IMAGES_ROOT}")
        
    except Exception as e:
        print(f"Error de conexion: {e}")
        return

    # Count tracks
    images_found = 0
    products_updated = 0
    
    # Recorrer carpetas
    for root, dirs, files in os.walk(IMAGES_ROOT):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                images_found += 1
                
                folder_name = os.path.basename(root)
                if folder_name.isdigit() or len(folder_name) >= 4:
                    product_code = folder_name
                    image_path = os.path.join(root, file)
                    
                    try:
                        # [CORRECCION CLAVE] Buscar en product.template directamente!
                        product_ids = models.execute_kw(DB, uid, API_KEY, 'product.template', 'search', [[('default_code', '=', product_code)]])
                        
                        if product_ids:
                            with open(image_path, "rb") as image_file:
                                encoded_image = base64.b64encode(image_file.read()).decode('utf-8')
                            
                            models.execute_kw(DB, uid, API_KEY, 'product.template', 'write', [product_ids, {'image_1920': encoded_image}])
                            print(f"[CORREGIDO] Imagen asignada a plantilla correcta: {product_code} (IDs Odoo: {product_ids})")
                            products_updated += 1
                            break 
                    except Exception as e:
                        print(f"[ERROR] Fallo al subir {product_code}: {e}")
    
    print("\n--- RESUMEN DE CORRECCION ---")
    print(f"Archivos procesados: {images_found}")
    print(f"Productos corregidos con exito: {products_updated}")

if __name__ == '__main__':
    main()
