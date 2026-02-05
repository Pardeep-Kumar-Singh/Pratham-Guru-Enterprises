import React, { useState, useEffect } from 'react';
import { IndianRupee, History, Package, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/axios';

const RateConfiguration = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/inventory/products');
      setProducts(response.data);
      if (response.data.length > 0) {
        handleProductSelect(response.data[0]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleProductSelect = async (product) => {
    setSelectedProduct(product);
    setLoading(true);
    try {
      const response = await api.get(`/products/${product.id}/rate-history`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8 animate-in fade-in duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center gap-3">
          <button
            onClick={() => navigate('/admin?tab=users')}
            className="p-2 hover:bg-gray-200 rounded-lg transition-colors mr-2 text-gray-600"
            title="Back to Dashboard"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shadow-lg text-white">
            <IndianRupee size={24} />
          </div>
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">Rate Configuration</h1>
            <p className="text-sm text-gray-600 font-medium">Track product price changes and history</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <h3 className="font-bold text-gray-700 px-2 flex items-center gap-2">
              <Package size={18} className="text-green-600" />
              Products List
            </h3>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y">
              {products.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProductSelect(p)}
                  className={`w-full text-left px-6 py-4 transition-all hover:bg-green-50 flex items-center justify-between group ${selectedProduct?.id === p.id ? 'bg-green-50 border-r-4 border-green-600' : ''
                    }`}
                >
                  <div>
                    <div className={`font-bold ${selectedProduct?.id === p.id ? 'text-green-700' : 'text-gray-800'}`}>
                      {p.name}
                    </div>
                    <div className="text-xs text-gray-500 font-bold uppercase tracking-wider">Current: ₹{p.baseRate}</div>
                  </div>
                  <History className={`opacity-0 group-hover:opacity-100 transition-all ${selectedProduct?.id === p.id ? 'opacity-100 text-green-600' : 'text-gray-300'}`} size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            {!selectedProduct ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
                <History size={48} className="mx-auto mb-4 opacity-20" />
                <p className="font-medium italic">Select a product to view its rate modification history</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">{selectedProduct.name}</h2>
                    <p className="text-sm text-gray-500 font-medium uppercase tracking-widest">{selectedProduct.category}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 font-bold uppercase mb-1">Standard Rate</div>
                    <div className="text-3xl font-black text-green-600">₹{selectedProduct.baseRate}</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-100"></div>
                  <div className="space-y-6 relative">
                    {loading ? (
                      <div className="text-center py-12"><Loader2 className="animate-spin mx-auto text-green-500" size={32} /></div>
                    ) : history.length === 0 ? (
                      <div className="bg-white p-8 rounded-2xl border border-dashed border-gray-200 text-center text-gray-400 ml-12">
                        No previous rate changes found.
                      </div>
                    ) : (
                      history.map((item, idx) => (
                        <div key={item.id} className="relative pl-12">
                          <div className="absolute left-[30px] top-1 w-4 h-4 rounded-full bg-white border-4 border-green-500 z-10"></div>
                          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
                            <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                              <span className="text-sm font-bold text-gray-400">
                                {new Date(item.createdAt).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}
                              </span>
                              <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold">RATE CHANGE</span>
                            </div>
                            <div className="flex items-center gap-4 text-gray-800">
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-400 font-bold uppercase">From</span>
                                <span className="text-lg font-bold text-gray-400 line-through">₹{item.oldRate}</span>
                              </div>
                              <ArrowRight className="text-gray-300" size={20} />
                              <div className="flex flex-col items-center">
                                <span className="text-xs text-gray-400 font-bold uppercase">To</span>
                                <span className="text-2xl font-black text-indigo-600">₹{item.newRate}</span>
                              </div>
                            </div>
                            {item.remark && (
                              <div className="mt-3 pt-3 border-t border-gray-50 text-sm text-gray-500 font-medium">
                                <span className="text-gray-400 font-bold mr-2 italic">Note:</span> {item.remark}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateConfiguration;