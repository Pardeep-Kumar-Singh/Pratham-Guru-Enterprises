import React, { useMemo, useRef } from "react";
// import html2pdf from "html2pdf.js"; // No longer needed

const numberToWords = (num) => {
  const a = [
    "", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ",
    "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "
  ];
  const b = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];

  if ((num = num.toString()).length > 9) return "Overflow";
  const n = ("000000000" + num)
    .substr(-9)
    .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return "";
  let str = "";
  str +=
    n[1] != 0
      ? (a[Number(n[1])] || b[n[1][0]] + " " + a[n[1][1]]) + "Crore "
      : "";
  str +=
    n[2] != 0
      ? (a[Number(n[2])] || b[n[2][0]] + " " + a[n[2][1]]) + "Lakh "
      : "";
  str +=
    n[3] != 0
      ? (a[Number(n[3])] || b[n[3][0]] + " " + a[n[3][1]]) + "Thousand "
      : "";
  str +=
    n[4] != 0
      ? (a[Number(n[4])] || b[n[4][0]] + " " + a[n[4][1]]) + "Hundred "
      : "";
  str +=
    n[5] != 0
      ? (str != "" ? "and " : "") +
      (a[Number(n[5])] || b[n[5][0]] + " " + a[n[5][1]])
      : "";
  return str.trim();
};

const InvoiceTemplate = ({ invoice, inventoryEntries = [] }) => {
  const invoiceRef = useRef(null);

  /* ===============================
     DERIVE INVOICE DATA FROM INVENTORY
     (NO UI / DESIGN CHANGE)
  =============================== */
  const derivedInvoice = useMemo(() => {
    const items = inventoryEntries.map((e) => {
      const qty = Number(e.quantity || 0);
      const rate = Number(e.baseRate || 0);
      const amount = qty * rate;

      return {
        description: `${e.category} - ${e.item}`,
        quantity: qty,
        unit: (e.category.toLowerCase() === 'wool') ? "Kg" : (e.category.toLowerCase() === 'bootie' ? "Pairs" : "Nos"),
        rate,
        amount,
      };
    });

    const subTotal = items.reduce((sum, i) => sum + i.amount, 0);
    const tds = subTotal * 0.01;
    const total = subTotal - tds;

    const amountInWords = total ? `Rupees ${numberToWords(Math.round(total))} Only` : "";

    return {
      ...invoice,
      items,
      subTotal,
      tds,
      total,
      amountInWords
    };
  }, [inventoryEntries, invoice]);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    const element = invoiceRef.current;

    // Clone the element to get the full HTML content
    const clone = element.cloneNode(true);

    // Ensure all styles are computed and inline if necessary, 
    // but simplified approach: get outerHTML and wrap in basic structure
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Invoice</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
           @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
           body { font-family: 'Inter', sans-serif; }
           
           /* Replicate critical print styles */
           .invoice-pdf {
             width: 100%;
             max-width: 210mm;
             margin: 0 auto;
             background: white;
           }
           table { width: 100%; border-collapse: collapse; }
           th, td { border: 1px solid #9ca3af; } /* gray-400 */
        </style>
      </head>
      <body>
        ${clone.outerHTML}
      </body>
      </html>
    `;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/invoices/pdf`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Assuming auth token is stored
        },
        body: JSON.stringify({ htmlContent })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ details: response.statusText }));
        throw new Error(errorData.details || 'Failed to generate PDF');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice_${derivedInvoice.invoiceNo}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert(`Failed to download PDF: ${error.message}`);
    }
  };

  return (
    <div className="space-y-4">
      {/* ===== ACTION BUTTONS ===== */}
      <div className="flex justify-end gap-3 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Print Invoice
        </button>

        <button
          onClick={handleDownloadPDF}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold"
        >
          Download PDF
        </button>
      </div>

      {/* ===== INVOICE CONTENT ===== */}
      <div
        ref={invoiceRef}
        className="invoice-pdf relative bg-white p-[40px] w-[794px] mx-auto text-sm text-black"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        <h1 className="text-center font-bold text-xl mb-2">INVOICE</h1>

        {/* ===== HEADER SECTION ===== */}
        <div className="grid grid-cols-2 gap-2 border border-gray-400">
          <div className="p-3 border-r border-gray-400">
            <p className="font-bold">Pratham Guru Enterprises</p>
            <p>573, Rajeev Nagar</p>
            <p>Sonipat - 131001</p>
            <p>Haryana</p>
            <p className="mt-1">
              <span className="font-semibold">E-mail:</span> prathamguruindia@gmail.com <br />
              <span className="font-semibold">Phone:</span> +91 7027311213
            </p>

            <div className="mt-2">
              <p className="font-semibold">Buyer</p>
              <p className="font-bold">{derivedInvoice.buyerName}</p>
              <p>{derivedInvoice.buyerCity}</p>
            </div>
          </div>

          <div className="p-3">
            <div className="grid grid-cols-2 border border-gray-400 text-xs">
              {[
                ["Invoice No.", derivedInvoice.invoiceNo],
                ["Dated", derivedInvoice.date],
                ["Delivery Note", "NA"],
                ["Supplier’s Ref.", "NA"],
                ["Buyer’s Order No.", "NA"],
                ["Dispatch Document No.", "NA"],
                ["Despatched through", "NA"],
                ["Terms of Delivery", "NA"],
              ].map(([label, value], i) => (
                <React.Fragment key={i}>
                  <div className="border border-gray-400 p-1 font-semibold">
                    {label}
                  </div>
                  <div className="border border-gray-400 p-1">
                    {value}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* ===== ITEMS TABLE ===== */}
        <div className="invoice-table">
          <table className="w-full border border-gray-400 mt-2 text-[12px]">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="border border-gray-400 px-1 py-0.5 align-middle font-medium">Sl No.</th>
                <th className="border border-gray-400 px-1 py-0.5 text-left align-middle font-medium">
                  Description of Goods
                </th>
                <th className="border border-gray-400 px-1 py-0.5 align-middle font-medium">Quantity</th>
                <th className="border border-gray-400 px-1 py-0.5 align-middle font-medium">Rate</th>
                <th className="border border-gray-400 px-1 py-0.5 align-middle font-medium">Per</th>
                <th className="border border-gray-400 px-1 py-0.5 align-middle font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {derivedInvoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-400 text-center px-1 py-0.5 align-middle font-medium">
                    {idx + 1}
                  </td>
                  <td className="border border-gray-400 px-1 py-0.5 align-middle font-medium">
                    {item.description}
                  </td>
                  <td className="border border-gray-400 text-center px-1 py-0.5 align-middle font-medium">
                    {Number(item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 3 })} {item.unit}
                  </td>
                  <td className="border border-gray-400 text-right px-1 py-0.5 align-middle font-medium">
                    {item.rate.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-400 text-center px-1 py-0.5 align-middle font-medium">
                    {item.unit}
                  </td>
                  <td className="border border-gray-400 text-right px-1 py-0.5 align-middle font-medium">
                    {item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ===== TOTALS ===== */}
        <div className="flex justify-end mt-2">
          <div className="w-1/2 text-xs">
            <div className="flex justify-between border-t border-gray-400 pt-1">
              <span className="font-semibold">Sub Total</span>
              <span>{derivedInvoice.subTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Less: TDS @1%</span>
              <span>-{derivedInvoice.tds.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-gray-400 pt-1">
              <span>Total</span>
              <span>{derivedInvoice.total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>

        <p className="mt-2 text-xs">
          <span className="font-semibold">Amount Chargeable (in words):</span>
          <br />
          {derivedInvoice.amountInWords}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-2 text-xs">
          <div>
            <p className="font-semibold">Remarks:</p>
            <p>{derivedInvoice.remarks}</p>

            <p className="mt-2 font-semibold">Declaration</p>
            <p>
              We declare that this invoice shows the actual price of the goods
              described and that all particulars are true and correct.
            </p>
          </div>

          <div className="text-right">
            <p className="font-semibold">for Pratham Guru Enterprises</p>
            <div className="mt-8">
              <p className="font-semibold">Authorised Signatory</p>
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] mt-8 w-full">
          This is a Software Generated Invoice under PG Enterprise
        </p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
