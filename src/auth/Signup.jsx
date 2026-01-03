import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="
        min-h-screen flex items-center
        justify-center md:justify-end
        bg-cover bg-center
        px-4 sm:px-6
      "
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div
        className="
          w-full max-w-md
          bg-white/80 backdrop-blur-md
          p-6 sm:p-8
          rounded-xl shadow-lg
          md:mr-10
        "
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-5 text-center text-gray-800">
          Create Account
        </h2>

        <form className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter full name"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter email"
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Create password"
                className="w-full px-3 py-2 border rounded-lg pr-10 focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </span>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Role
            </label>
            <select
              required
              className="w-full px-3 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Choose Role --</option>
              <option value="tendor">Tendor</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Sign Up
          </button>

          <p className="text-center text-gray-600 text-sm mt-2">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 hover:underline font-medium">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
