import React, { useEffect, useState } from "react";
import { Trash2, Plus, Save } from "lucide-react";
import api from "../api/axios";

// Reusable Table Component (Simplified for Wool - No Amount/Rate displayed)
const WoolEntryTable = ({ entries, setEntries, products, categories, title }) => {
    const handleEntryChange = (tempId, field, value) => {
        const updatedEntries = entries.map(entry => {
            if (entry.tempId === tempId) {
                const updatedEntry = { ...entry, [field]: value };

                // Auto-fill logic when item is selected
                if (field === "itemName") {
                    const product = products.find(p => p.name === value);
                    if (product) {
                        updatedEntry.category = product.category;
                        updatedEntry.uom = product.uom;
                    }
                }

                return updatedEntry;
            }
            return entry;
        });
        setEntries(updatedEntries);
    };

    const removeRow = (tempId) => {
        if (entries.length === 1) {
            // If clearing the last row, reset it instead of removing
            const createNewEntry = () => ({
                tempId: Math.random().toString(36).substr(2, 9),
                category: "",
                itemName: "",
                uom: "pcs",
                qty: 0,
                weight: 0
            });
            setEntries([createNewEntry()]);
        } else {
            setEntries(entries.filter(e => e.tempId !== tempId));
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 overflow-hidden mb-6 transition-colors">
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 flex justify-between items-center transition-colors">
                <h3 className="font-semibold text-gray-700 dark:text-gray-200">{title}</h3>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-amber-600 text-white">
                        <tr>
                            <th className="px-4 py-3 text-sm font-semibold text-center w-1/4">Category</th>
                            <th className="px-4 py-3 text-sm font-semibold text-center w-1/4">Item</th>
                            <th className="px-4 py-3 text-sm font-semibold text-center w-24">UOM</th>
                            <th className="px-4 py-3 text-sm font-semibold text-center w-1/4">Weight (kg)</th>
                            <th className="px-4 py-3 text-sm font-semibold text-center w-1/4">Less Wt (Poly -)</th>
                            <th className="px-4 py-3 text-sm font-semibold text-center w-16"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                        {entries.map((entry) => (
                            <tr key={entry.tempId} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                                <td className="px-4 py-2">
                                    <select
                                        value={entry.category}
                                        onChange={(e) => handleEntryChange(entry.tempId, 'category', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm outline-none focus:border-amber-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    >
                                        <option value="" className="dark:bg-gray-700">Select</option>
                                        {categories.map(cat => <option key={cat} value={cat} className="dark:bg-gray-700">{cat}</option>)}
                                    </select>
                                </td>
                                <td className="px-4 py-2">
                                    <select
                                        value={entry.itemName}
                                        onChange={(e) => handleEntryChange(entry.tempId, 'itemName', e.target.value)}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm outline-none focus:border-amber-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                                    >
                                        <option value="" className="dark:bg-gray-700">Select</option>
                                        {products
                                            .filter(p => !entry.category || p.category === entry.category)
                                            .map(p => <option key={p.id} value={p.name} className="dark:bg-gray-700">{p.name}</option>)
                                        }
                                    </select>
                                </td>
                                <td className="px-4 py-2 text-center text-sm font-medium dark:text-gray-300">{entry.uom || 'PCS'}</td>
                                <td className="px-4 py-2">
                                    <input
                                        type="number"
                                        value={entry.weight}
                                        onChange={(e) => handleEntryChange(entry.tempId, 'weight', Number(e.target.value))}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-right outline-none focus:border-amber-500 bg-white dark:bg-gray-700 dark:text-white"
                                    />
                                </td>
                                <td className="px-4 py-2">
                                    <input
                                        type="number"
                                        value={entry.qty}
                                        onChange={(e) => handleEntryChange(entry.tempId, 'qty', Number(e.target.value))}
                                        className="w-full border border-gray-300 dark:border-gray-600 rounded px-3 py-2 text-sm text-right outline-none focus:border-amber-500 bg-white dark:bg-gray-700 dark:text-white"
                                    />
                                </td>
                                <td className="px-4 py-2 text-center">
                                    <button
                                        onClick={() => removeRow(entry.tempId)}
                                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40 p-1.5 rounded transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const WoolView = () => {
    const [products, setProducts] = useState([]);
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    // Wool State
    const [woolEntries, setWoolEntries] = useState([]);
    const [totalWeight, setTotalWeight] = useState(0);

    const [loading, setLoading] = useState(false);

    // Helpers
    const createNewEntry = () => ({
        tempId: Math.random().toString(36).substr(2, 9),
        category: "",
        itemName: "",
        uom: "pcs",
        qty: 0,
        weight: 0
    });

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get("/inventory/products");
                setProducts(response.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Fetch Wool Data
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await api.get(`/inventory/wool/${date}`);
                if (res.data && res.data.entries.length > 0) {
                    setWoolEntries(res.data.entries.map(e => ({ ...e, tempId: Math.random().toString(36).substr(2, 9) })));
                    setTotalWeight(res.data.totalWeight || 0);
                } else {
                    setWoolEntries([createNewEntry()]);
                    setTotalWeight(0);
                }

            } catch (error) {
                console.error("Error fetching wool data:", error);
                setWoolEntries([createNewEntry()]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [date]);


    const addRow = () => {
        setWoolEntries([...woolEntries, createNewEntry()]);
    };

    // derived totals
    const totalQty = woolEntries.reduce((acc, curr) => acc + (Number(curr.qty) || 0), 0);
    const calculatedTotalWeight = woolEntries.reduce((acc, curr) => acc + (Number(curr.weight) || 0), 0);

    // Use calculated total weight if user hasn't overridden it? Or separate "Total Weight" field from table sum?
    // User explicitly asked for "Received Wool Weight Daily Wise" text box in layout similar to Production.
    // I will keep the manual input for flexibility but maybe show sum as hint.

    const handleSaveWool = async () => {
        const validEntries = woolEntries.filter(e => e.itemName && e.qty > 0);
        if (validEntries.length === 0) {
            if (!confirm("No valid wool entries. Clear wool data for this day?")) return;
        }

        setLoading(true);
        try {
            await api.post("/inventory/wool", {
                date,
                totalQty,
                totalWeight: Number(totalWeight),
                entries: validEntries
            });
            alert("Wool entry saved!");
        } catch (error) {
            console.error("Error saving wool:", error);
            alert("Error saving wool.");
        } finally {
            setLoading(false);
        }
    };

    const categories = [...new Set(products.map(p => p.category))];

    return (
        <div className="space-y-8 max-w-7xl mx-auto p-4 pb-20">

            {/* Date Picker Header */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 p-4 sticky top-0 z-10 flex justify-between items-center transition-colors">
                <h1 className="text-2xl font-bold text-amber-800 dark:text-amber-500">Wool Inventory Management</h1>
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Date:</span>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-amber-500 text-gray-900 dark:text-gray-100"
                    />
                </div>
            </div>

            {/* --- WOOL SECTION --- */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-amber-100 dark:border-amber-900/30 p-6 relative transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-xl font-bold text-amber-900 dark:text-amber-500 flex items-center gap-2">
                            Wool Received from Tendor
                            <span className="text-xs bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 px-2 py-1 rounded-full">Inward</span>
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                                type="number"
                                value={totalWeight}
                                onChange={(e) => setTotalWeight(e.target.value)}
                                placeholder="Total Weight"
                                className="border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2 w-40 text-sm focus:ring-2 focus:ring-amber-500 bg-white dark:bg-gray-700 dark:text-white"
                            />
                            <span className="absolute right-3 top-2 text-xs text-gray-400">kg</span>
                        </div>
                        <button
                            onClick={addRow}
                            className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                            <Plus size={16} /> Add Row
                        </button>
                        <button
                            onClick={handleSaveWool}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                            <Save size={16} /> Save Wool Entry
                        </button>
                    </div>
                </div>

                <WoolEntryTable
                    entries={woolEntries}
                    setEntries={setWoolEntries}
                    products={products}
                    categories={categories}
                    title="Wool Items"
                />

            </section>

            {/* --- SUMMARY FOOTER --- */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 p-4 shadow-lg z-50 transition-colors">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div>
                        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase">Net Daily Wool Summary</h3>
                    </div>
                    <div className="flex gap-8">
                        <div className="text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Total Gross Weight</p>
                            <p className="text-xl font-bold text-gray-800 dark:text-gray-200">{calculatedTotalWeight.toFixed(2)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">kg</span></p>
                        </div>
                        <div className="text-center">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Total Less Wt</p>
                            <p className="text-xl font-bold text-red-600 dark:text-red-400">-{totalQty.toFixed(2)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">kg</span></p>
                        </div>
                        <div className="text-center border-l border-gray-200 dark:border-gray-700 pl-8">
                            <p className="text-xs text-gray-400 dark:text-gray-500">Net Weight</p>
                            <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{(calculatedTotalWeight - totalQty).toFixed(2)} <span className="text-sm font-normal text-gray-500 dark:text-gray-400">kg</span></p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default WoolView;
