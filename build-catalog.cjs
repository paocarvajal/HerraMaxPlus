const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const sourceImagesBaseDir = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Ferreteria_Data\\Images';
const excelFile = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Ferreteria_Data\\Prices_and_Catalogs\\Catálogo_Truper_2025_Mar_2026 Actualizado.xlsx';
const publicCatalogDir = path.join(__dirname, 'public', 'catalog');
const outputJsonFile = path.join(__dirname, 'src', 'data', 'fiero_catalog.json');


// Ensure public catalog dir exists
if (!fs.existsSync(publicCatalogDir)) {
    fs.mkdirSync(publicCatalogDir, { recursive: true });
}

console.log('Reading Excel file...');
const workbook = xlsx.readFile(excelFile);

let allProductsMap = new Map();

workbook.SheetNames.forEach(sheetName => {
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    xlData.forEach(row => {
        // Find code key ignoring case
        const codeKey = Object.keys(row).find(k => k.toLowerCase() === 'código' || k.toLowerCase() === 'codigo');
        if (codeKey && row[codeKey] !== undefined) {
            allProductsMap.set(String(row[codeKey]).trim(), row);
        }
    });
});
console.log(`Loaded ${allProductsMap.size} products from Excel.`);

console.log('Scanning image folders in all brands...');
const brandFolders = fs.readdirSync(sourceImagesBaseDir).filter(f => fs.statSync(path.join(sourceImagesBaseDir, f)).isDirectory());

let catalog = [];
let categoriesSet = new Map();
let groupedProducts = new Map();
let processedCount = 0;

for (const brandFolder of brandFolders) {
    const brandPath = path.join(sourceImagesBaseDir, brandFolder);
    console.log(`Processing brand: ${brandFolder}...`);
    
    const skuFolders = fs.readdirSync(brandPath).filter(f => {
        try {
            return fs.statSync(path.join(brandPath, f)).isDirectory();
        } catch (e) {
            return false;
        }
    });

    for (const sku of skuFolders) {
        const skuPath = path.join(brandPath, sku);
        const images = fs.readdirSync(skuPath).filter(f => f.toLowerCase().endsWith('.jpg') || f.toLowerCase().endsWith('.png'));
        if (images.length === 0) continue;


    const row = allProductsMap.get(sku);
    if (!row) continue;

    processedCount++;

    // Pick the best image
    let mainImage = images.find(i => i.toLowerCase().includes(sku.toLowerCase()) && !i.toLowerCase().includes('fc')) || images[0];

    // copy image
    const sourceImagePath = path.join(skuPath, mainImage);
    const destImageName = `${sku}.jpg`;
    const destImagePath = path.join(publicCatalogDir, destImageName);

    try {
        fs.copyFileSync(sourceImagePath, destImagePath);
    } catch (e) {
        console.error(`Error copying image for SKU ${sku}: ${e.message}`);
        continue;
    }


    const priceKey = Object.keys(row).find(k => k.toLowerCase().includes('precio público') || k.toLowerCase().includes('precio p'));
    const price = priceKey ? Number(row[priceKey]) : 0;

    const originalPrice = price ? Math.round(price * 1.15) : undefined;

    const familiaKey = Object.keys(row).find(k => k.toLowerCase() === 'descripción familia');
    const descFamilia = (familiaKey ? row[familiaKey] : 'Ferretería General') || 'Ferretería General';

    const categoryId = descFamilia.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

    if (!categoriesSet.has(categoryId)) {
        // Icon mapping based on keywords
        let icon = "🔧";
        if (categoryId.includes('construccion') || categoryId.includes('alambre') || categoryId.includes('malla')) icon = "🧱";
        else if (categoryId.includes('electric')) icon = "💡";
        else if (categoryId.includes('pintura')) icon = "🎨";
        else if (categoryId.includes('carpinteria') || categoryId.includes('madera')) icon = "🪚";
        else if (categoryId.includes('plomeria') || categoryId.includes('tuberia') || categoryId.includes('pvc')) icon = "🚰";
        else if (categoryId.includes('fijacion') || categoryId.includes('tornill') || categoryId.includes('taquete') || categoryId.includes('clavo')) icon = "🔩";

        categoriesSet.set(categoryId, { id: categoryId, name: descFamilia, count: 0, icon: icon });
    }

    categoriesSet.get(categoryId).count++;

    const descKey = Object.keys(row).find(k => k.toLowerCase() === 'descripción' || k.toLowerCase() === 'descripcion');
    const fullDesc = descKey ? String(row[descKey]) : `Producto Fiero ${sku}`;

    // Grouping key: we will use "Descripción Familia" + first two words of the name
    const pieces = fullDesc.split(',');
    const baseName = pieces[0].trim();
    // Use first 2 words of basename + categoryid
    const descWords = baseName.split(' ').slice(0, 3).join(' ');
    const groupKey = `${categoryId}-${descWords.toLowerCase()}`;

    const marcaKey = Object.keys(row).find(k => k.toLowerCase() === 'marca');

    if (!groupedProducts.has(groupKey)) {
        groupedProducts.set(groupKey, {
            id: sku,
            name: baseName, // Use the full base name for the master 
            price: price,
            originalPrice: originalPrice,
            category: categoryId,
            brand: marcaKey ? row[marcaKey] : brandFolder,

            image: `catalog/${destImageName}`, // Relative to base URL!
            rating: parseFloat((4.0 + (Math.random() * 1.0)).toFixed(1)),
            inStock: true,
            description: fullDesc,
            variants: [],
            variantLabel: 'Presentación',
            _baseSku: sku
        });
    }

    const group = groupedProducts.get(groupKey);
    // Determine variant name neatly
    // Sometimes the presentation is after the comma, e.g. "..., en rollo de 20 kg, FIERO"
    let variantName = pieces.length > 1 ? pieces[1].trim() : baseName;
    variantName = variantName.replace(/FIERO/gi, '').trim() || baseName;

    // Add as variant
    group.variants.push({
        id: sku,
        name: variantName,
        price: price,
        originalPrice: originalPrice,
        image: `catalog/${destImageName}`,
        description: fullDesc
    });
    }
}


for (const [key, product] of groupedProducts.entries()) {
    if (product.variants.length === 1) {
        delete product.variants;
        delete product.variantLabel;
    } else {
        // Sort variants by price
        product.variants.sort((a, b) => a.price - b.price);
        product.price = product.variants[0].price;
        product.originalPrice = product.variants[0].originalPrice;

        // Let's refine the master product name. 
        // e.g. "Kilo de alambre recocido calibre 15 en rollo de 1 kg"
        // Try to remove specific sizes.
        product.name = product.variants[0].name.split(/[0-9]/)[0].replace(/de$/, '').trim() + " " + product.brand;

        if (product.name.length < 5) product.name = product.variants[0].name; // fallback
    }

    // Only output valid priced items and above 0
    if (product.price > 0 && product.price < 1000000) {
        catalog.push(product);
    }
}

const finalData = {
    categories: Array.from(categoriesSet.values()),
    products: catalog
};

fs.writeFileSync(outputJsonFile, JSON.stringify(finalData, null, 2));
console.log(`Processed ${processedCount} valid folders. Generated catalog with ${catalog.length} grouped products and ${categoriesSet.size} categories.`);
