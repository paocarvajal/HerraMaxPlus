const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const sourceImagesDir = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\imputs pic\\Fiero';
const excelFile = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Catálogo Truper 2025 ML (1).xlsx';

const workbook = xlsx.readFile(excelFile);

let allProductsMap = new Map();
let codeHeader = null;

workbook.SheetNames.forEach(sheetName => {
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    if (xlData.length > 0 && !codeHeader) {
        codeHeader = Object.keys(xlData[0]).find(k => k.toLowerCase().includes('cód') || k.toLowerCase().includes('cod'));
    }
    xlData.forEach(row => {
        const codeKey = Object.keys(row).find(k => k.toLowerCase() === 'código' || k.toLowerCase() === 'codigo');
        if (codeKey && row[codeKey] !== undefined) {
            allProductsMap.set(String(row[codeKey]).trim(), row);
        }
    });
});
console.log(`Loaded ${allProductsMap.size} products from Excel.`);

const skuFolders = fs.readdirSync(sourceImagesDir).filter(f => fs.statSync(path.join(sourceImagesDir, f)).isDirectory());
console.log(`Found ${skuFolders.length} SKU folders.`);

let matched = 0;
for (const sku of skuFolders) {
    if (allProductsMap.has(sku)) matched++;
    else if (sku === '40051') console.log('40051 not in map natively');
}
console.log(`Matched ${matched} / ${skuFolders.length}`);
