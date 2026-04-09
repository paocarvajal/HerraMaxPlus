const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const inputDir = 'C:\\Users\\paola\\Proyectos Antigravity\\Ferreteria\\Logos_Herramax';

async function processLogos() {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();

    // Set viewport exactly to the view box of our SVG
    await page.setViewport({ width: 800, height: 300, deviceScaleFactor: 4 }); // 4x for high-res PNG

    const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.svg'));
    for (const file of files) {
        const svgPath = path.join(inputDir, file);
        const name = file.replace('.svg', '');

        let svgContent = fs.readFileSync(svgPath, 'utf8');
        const html = `<!DOCTYPE html><html><head><style>body { margin: 0; padding: 0; overflow: hidden; background: transparent; }</style></head><body>${svgContent}</body></html>`;

        await page.setContent(html, { waitUntil: 'load' });

        const pngPath = path.join(inputDir, `${name}.png`);
        const pdfPath = path.join(inputDir, `${name}.pdf`);

        // Export transparent High-Res PNG
        await page.screenshot({ path: pngPath, omitBackground: true, fullPage: true });

        // Export PDF
        // Since PDF page sizes in puppeteer take CSS sizes, we'll set the size to match standard ratios or just let it autosize.
        await page.pdf({ path: pdfPath, width: '800px', height: '300px', printBackground: true, pageRanges: '1' });

        console.log(`Rendered PNG and PDF for: ${name}`);
    }

    await browser.close();
}

processLogos().catch(console.error);
