const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelFile = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Pintumex\\Inventario 010526.xlsx';
const outputJsonFile = path.join(__dirname, 'src', 'data', 'pintumex_catalog.json');

console.log('Reading Pintumex Excel file...');
const workbook = xlsx.readFile(excelFile);
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const items = xlsx.utils.sheet_to_json(sheet);

console.log(`Loaded ${items.length} products from Pintumex Excel.`);

let catalog = [];
let categoriesSet = new Map();
let groupedProducts = new Map();

const imageMapping = [
    { keywords: ['SUPERVIN', '19 L'], image: 'catalog/pintumex/pintumex-supervin-19l-frente.webp' },
    { keywords: ['SUPERVIN', '4 L'], image: 'catalog/pintumex/pintumex-supervin-4l-frente.webp' },
    { keywords: ['SUPERVIN', '1 L'], image: 'catalog/pintumex/pintumex-supervin-1l-frente.webp' },
    { keywords: ['SUPERVIN'], image: 'catalog/pintumex/pintumex-supervin-19l-frente.webp' },
    { keywords: ['OMAR'], image: 'catalog/pintumex/pintumex-omar-19l-frente.webp' },
    { keywords: ['ACAPULCO'], image: 'catalog/pintumex/pintumex-acapulco-19l-frente.webp' },
    { keywords: ['KOLORTEX'], image: 'catalog/pintumex/pintumex-kolortex-19l-frente.webp' },
    { keywords: ['VINET'], image: 'catalog/pintumex/pintumex-vinet-19l-frente.webp' },
    { keywords: ['ESMALUX'], image: 'catalog/pintumex/pintumex-esmalux-sr-19l-frente.webp' },
];

for (const item of items) {
    const sku = String(item['Código']).trim();
    const fullName = String(item['Producto']).trim();
    const stock = parseFloat(item['Existencia'] || 0);
    const dept = item['Departamento'] || 'Pinturas';

    if (stock <= 0) continue;

    // Find best image
    let image = 'catalog/pintumex/pintumex-supervin-19l-frente.webp'; // Default
    for (const map of imageMapping) {
        if (map.keywords.every(k => fullName.toUpperCase().includes(k))) {
            image = map.image;
            break;
        }
    }

    const categoryId = dept.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');
    
    if (!categoriesSet.has(categoryId)) {
        categoriesSet.set(categoryId, { id: categoryId, name: dept, count: 0, icon: "🎨" });
    }
    categoriesSet.get(categoryId).count++;

    // Grouping: simplify name for master product
    let cleanName = fullName.split(' - ').pop().replace(/BOTE.*|19 L.*|4 L.*|1 L.*/gi, '').trim();
    const groupKey = `pintumex-${categoryId}-${cleanName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;

    if (!groupedProducts.has(groupKey)) {
        groupedProducts.set(groupKey, {
            id: sku,
            name: cleanName,
            price: 0,
            category: categoryId,
            brand: 'Pintumex',
            image: image,
            rating: 4.8,
            inStock: true,
            description: fullName,
            variants: [],
            variantLabel: 'Presentación',
            _baseSku: sku
        });
    }

    const group = groupedProducts.get(groupKey);
    group.variants.push({
        id: sku,
        name: fullName.includes(' - ') ? fullName.split(' - ').pop() : fullName,
        price: 0,
        image: image,
        description: fullName
    });
}

const finalProducts = Array.from(groupedProducts.values());

const finalData = {
    categories: Array.from(categoriesSet.values()),
    products: finalProducts
};

fs.writeFileSync(outputJsonFile, JSON.stringify(finalData, null, 2));
console.log(`Generated Pintumex catalog with ${finalProducts.length} grouped products and ${categoriesSet.size} categories.`);
