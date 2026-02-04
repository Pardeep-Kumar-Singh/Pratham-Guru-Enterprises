import React, { useState, lazy } from "react";
const InvoiceTemplate = lazy(() => import("./InvoiceTemplate"));

const BillingView = () => {
  const [showInvoice, setShowInvoice] = useState(false);

  /* Temporary invoice data (will come from inventory later) */
  const invoiceData = {
    invoiceNo: "8",
    date: "30-Nov-2025",
    buyerName: "Zillivet A/c",
    buyerCity: "Sonepat",
    items: [
      {
        description: "Bootie Normal",
        quantity: 120,
        unit: "PCS",
        rate: 20,
        amount: 2400,
      },
      {
        description: "Cap Fancy",
        quantity: 80,
        unit: "PCS",
        rate: 30,
        amount: 2400,
      },
    ],
    subTotal: 4800,
    tds: 48,
    total: 4752,
    amountInWords:
      "Rupees Four Thousand Seven Hundred Fifty Two Only",
    remarks: "As per monthly dispatch",
  };

  /* ================= INVOICE VIEW ================= */
  if (showInvoice) {
    return (
      <div className="space-y-4">
        <React.Suspense fallback={<div>Loading invoice...</div>}>
          <InvoiceTemplate invoice={invoiceData} />
        </React.Suspense>
      </div>
    );
  }

  /* ================= BILLING DASHBOARD (UNCHANGED) ================= */
  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">
          Dispatch Status
        </h3>
        <div className="space-y-2">
          {[
            { name: "Rajesh Kumar", items: 24, amount: 12500, status: "Paid" },
            { name: "Amit Shah", items: 18, amount: 9200, status: "Pending" },
            { name: "Priya Singh", items: 32, amount: 16800, status: "Paid" },
          ].map((dispatch, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold text-sm text-gray-800">
                    {dispatch.name}
                  </div>
                  <div className="text-xs text-gray-500">
                    {dispatch.items} units
                  </div>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full ${dispatch.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                    }`}
                >
                  {dispatch.status}
                </span>
              </div>
              <div className="text-sm font-bold text-gray-800">
                ₹{dispatch.amount.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-bold text-base text-gray-800 mb-3">
            Monthly Invoice
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Invoices</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Total Amount</span>
              <span className="font-bold text-blue-600">₹2,45,000</span>
            </div>
          </div>
          <button
            onClick={() => setShowInvoice(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-semibold transition"
          >
            Generate Invoice
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="font-bold text-base text-gray-800 mb-3">
            Payment Summary
          </h3>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Paid</span>
              <span className="font-bold text-green-600">₹2,00,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Pending</span>
              <span className="font-bold text-orange-600">₹45,000</span>
            </div>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2.5 rounded-lg text-sm font-semibold transition">
            Export Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default BillingView;
