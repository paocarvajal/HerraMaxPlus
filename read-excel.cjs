const xlsx = require('xlsx');

const workbook = xlsx.readFile('C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Catálogo Truper 2025 ML (1).xlsx');

let allResults = [];

workbook.SheetNames.forEach(sheetName => {
    const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    const results = xlData.filter(row => {
        const str = JSON.stringify(row).toLowerCase();
        return str.includes('alre') || str.includes('40051') || str.includes('recocido');
    });
    if (results.length > 0) {
        allResults.push({ sheet: sheetName, data: results });
    }
});

console.log(JSON.stringify(allResults, null, 2));
