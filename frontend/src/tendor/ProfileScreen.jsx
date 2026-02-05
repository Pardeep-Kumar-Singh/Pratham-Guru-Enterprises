import React, { useState } from "react";
import { User } from "lucide-react";

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "Rajesh Kumar",
    tendorId: "TND-2024-001",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    businessType: "Tendor",
    address: "Shop No. 45, Wool Market, Panipat, Haryana - 132103",
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          Profile Information
        </h2>

        <button
          onClick={() => setIsEditing(true)}
          className="self-start sm:self-auto bg-indigo-100 hover:bg-indigo-200 text-indigo-700 px-4 py-2 rounded-lg text-sm font-semibold transition"
        >
          Edit Profile
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-6 pb-6 border-b">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-indigo-100 rounded-full flex items-center justify-center">
            <User className="text-indigo-600" size={40} />
          </div>

          <div className="text-center sm:text-left">
            <h3 className="text-xl font-bold text-gray-800">
              {profile.name}
            </h3>
            <p className="text-gray-600">
              Tendor ID: {profile.tendorId}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <input
                value={profile.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-gray-800"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                {profile.name}
              </div>
            )}
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contact Number
            </label>
            {isEditing ? (
              <input
                value={profile.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-gray-800"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                {profile.phone}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email ID
            </label>
            {isEditing ? (
              <input
                value={profile.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full px-4 py-3 border rounded-lg text-gray-800"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                {profile.email}
              </div>
            )}
          </div>

          {/* Business Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Business Type
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
              {profile.businessType}
            </div>
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            {isEditing ? (
              <textarea
                value={profile.address}
                onChange={(e) => handleChange("address", e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border rounded-lg text-gray-800"
              />
            ) : (
              <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-800">
                {profile.address}
              </div>
            )}
          </div>

          {/* Bank */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bank Details (Optional)
            </label>
            <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-600 text-sm italic">
              Available in Phase-2
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t flex flex-col sm:flex-row gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold transition"
              >
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-lg font-semibold transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Change Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
