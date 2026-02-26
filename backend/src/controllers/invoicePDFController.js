const puppeteer = require('puppeteer');

exports.generatePDF = async (req, res) => {
    const { htmlContent } = req.body;

    if (!htmlContent) {
        return res.status(400).send("HTML content is required");
    }

    try {
        const browser = await puppeteer.launch({
            headless: 'new',
            executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage']
        });
        const page = await browser.newPage();

        await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

        // Add Tailwind via CDN to ensure styles are applied if local styles are missing in the isolated context
        await page.addStyleTag({ url: 'https://cdn.tailwindcss.com' });

        const pdfBuffer = await page.pdf({
            format: 'A4',
            printBackground: true,
            margin: {
                top: '0px',
                right: '0px',
                bottom: '0px',
                left: '0px'
            }
        });

        await browser.close();

        res.set({
            'Content-Type': 'application/pdf',
            'Content-Length': pdfBuffer.length,
        });

        res.send(pdfBuffer);

    } catch (error) {
        console.error("PDF Generation Error Details:", error);
        if (error.message.includes('launch')) {
            console.error("Puppeteer Launch Failed. Possible missing dependencies or Chrome.");
        }
        res.status(500).json({
            error: "Error generating PDF",
            details: error.message
        });
    }
};
