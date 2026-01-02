import React from 'react'

const ReportsView = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { title: 'Monthly Production', desc: 'Complete breakdown', color: 'from-pink-500 to-rose-500' },
          { title: 'Product-wise Report', desc: 'Category analysis', color: 'from-purple-500 to-indigo-500' },
          { title: 'Tendor Revenue', desc: 'Revenue by tendor', color: 'from-blue-500 to-cyan-500' },
          { title: 'Worker Productivity', desc: 'Performance metrics', color: 'from-orange-500 to-amber-500' }
        ].map((report, idx) => (
          <div key={idx} className={`bg-linear-to-br ${report.color} rounded-xl shadow-md p-5 text-black cursor-pointer hover:shadow-lg transition`}>
            <h3 className="font-bold text-base mb-1">{report.title}</h3>
            <p className="text-xs opacity-80 mb-4">{report.desc}</p>
            <button className="bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold transition">
              View Report
            </button>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-4">Performance Overview</h3>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-blue-600">3,450</div>
            <div className="text-xs text-gray-600 mt-1">Units/Month</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-green-600">₹2.45L</div>
            <div className="text-xs text-gray-600 mt-1">Revenue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl lg:text-3xl font-bold text-purple-600">86%</div>
            <div className="text-xs text-gray-600 mt-1">Efficiency</div>
          </div>
        </div>
      </div>
    </div>
  );
export default ReportsView;