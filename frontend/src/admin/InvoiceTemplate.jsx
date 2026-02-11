import React, { useMemo, useRef } from "react";
import html2pdf from "html2pdf.js";

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
        unit: (e.category === 'Wool' || e.category === 'wool') ? "Kg" : "Nos",
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

  const handleDownloadPDF = () => {
    const element = invoiceRef.current;

    html2pdf()
      .from(element)
      .set({
        margin: [0.4, 0.4, 0.4, 0.4],
        filename: `Invoice_${derivedInvoice.invoiceNo}.pdf`,
        image: { type: "jpeg", quality: 0.95 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          logging: false,
        },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
          compress: true,
        },
        pagebreak: {
          mode: ["css", "legacy"],
          avoid: ["tr", "td", ".invoice-table"],
        },
      })
      .save();
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
        className="invoice-pdf bg-white p-6 max-w-5xl mx-auto text-sm text-black"
      >
        <h1 className="text-center font-bold text-xl mb-4">INVOICE</h1>

        {/* ===== HEADER SECTION ===== */}
        <div className="grid grid-cols-2 gap-4 border border-gray-400">
          <div className="p-3 border-r border-gray-400">
            <p className="font-bold">Pratham Guru Enterprises</p>
            <p>573, Rajeev Nagar</p>
            <p>Sonipat - 131001</p>
            <p>Haryana</p>
            <p className="mt-1">
              <span className="font-semibold">E-mail:</span> prathamguruindia@gmail.com <br />
              <span className="font-semibold">Phone:</span> +91 7027311213
            </p>

            <div className="mt-4">
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
          <table className="w-full border border-gray-400 mt-4 text-xs">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="border border-gray-400 p-1">Sl No.</th>
                <th className="border border-gray-400 p-1 text-left">
                  Description of Goods
                </th>
                <th className="border border-gray-400 p-1">Quantity</th>
                <th className="border border-gray-400 p-1">Rate</th>
                <th className="border border-gray-400 p-1">Per</th>
                <th className="border border-gray-400 p-1">Amount</th>
              </tr>
            </thead>
            <tbody>
              {derivedInvoice.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-400 text-center p-1">
                    {idx + 1}
                  </td>
                  <td className="border border-gray-400 p-1">
                    {item.description}
                  </td>
                  <td className="border border-gray-400 text-center p-1">
                    {Number(item.quantity).toLocaleString('en-IN', { maximumFractionDigits: 3 })} {item.unit}
                  </td>
                  <td className="border border-gray-400 text-right p-1">
                    {item.rate.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </td>
                  <td className="border border-gray-400 text-center p-1">
                    {item.unit}
                  </td>
                  <td className="border border-gray-400 text-right p-1">
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

        <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
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
            <div className="mt-10">
              <p className="font-semibold">Authorised Signatory</p>
            </div>
          </div>
        </div>

        <p className="text-center text-xs mt-4">
          This is a Software Generated Invoice under PG Enterprise
        </p>
      </div>
    </div>
  );
};

export default InvoiceTemplate;
