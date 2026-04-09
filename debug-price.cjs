const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

const excelFile = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Catálogo Truper 2025 ML (1).xlsx';
const workbook = xlsx.readFile(excelFile);

let allProductsMap = new Map();
workbook.SheetNames.forEach(sheetName => {
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    xlData.forEach(row => {
        const codeKey = Object.keys(row).find(k => k.toLowerCase() === 'código' || k.toLowerCase() === 'codigo');
        if (codeKey && row[codeKey] !== undefined) {
            allProductsMap.set(String(row[codeKey]).trim(), row);
        }
    });
});

const r40051 = allProductsMap.get('40051');
const priceKey = Object.keys(r40051).find(k => k.toLowerCase().includes('precio público') || k.toLowerCase().includes('precio p'));
console.log('40051 keys:', Object.keys(r40051));
console.log('40051 priceKey:', priceKey);
console.log('40051 price string:', r40051[priceKey]);
console.log('40051 price parse:', Number(String(r40051[priceKey]).replace(/[^0-9.]/g, '')));
