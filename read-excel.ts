import * as xlsx from 'xlsx';

const workbook = xlsx.readFile('C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Catálogo Truper 2025 ML (1).xlsx');
const sheet_name_list = workbook.SheetNames;
const xlData = xlsx.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

const results = xlData.filter((row: any) => {
    // try to find code 40051 or ALRE
    return JSON.stringify(row).includes('40051') || JSON.stringify(row).includes('ALRE');
});

console.log(JSON.stringify(results, null, 2));
