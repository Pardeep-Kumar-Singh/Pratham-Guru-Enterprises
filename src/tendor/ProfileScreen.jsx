import React from 'react'
import { User } from 'lucide-react';

const ProfileScreen = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Profile Information</h2>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-6 mb-6 pb-6 border-b">
          <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="text-indigo-600" size={48} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">Rajesh Kumar</h3>
            <p className="text-gray-600">Tendor ID: TND-2024-001</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">Rajesh Kumar</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">+91 98765 43210</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email ID</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">rajesh.kumar@email.com</div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Business Type</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">Tendor</div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
              Shop No. 45, Wool Market, Panipat, Haryana - 132103
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Bank Details (Optional)</label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600 text-sm italic">
              Available in Phase-2
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
    export default ProfileScreen;