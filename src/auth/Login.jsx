import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../api/axios";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const username = e.target.username.value;
    const password = e.target.password.value;
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await api.post("/token", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const { access_token } = response.data;
      localStorage.setItem("token", access_token);

      // Decode token to get role
      // Simple base64 decoding for payload
      const payload = JSON.parse(atob(access_token.split('.')[1]));
      localStorage.setItem("userRole", payload.role);
      localStorage.setItem("isAuthenticated", "true");

      if (payload.role === "admin") navigate("/admin");
      else if (payload.role === "tendor") navigate("/tendor");
      else if (payload.role === "coordinator") navigate("/coordinator");
      else navigate("/");

    } catch (err) {
      console.error(err);
      setError("Invalid username or password");
    }
  };

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
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              required
              placeholder="Enter your username"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
                name="password"
                required
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
              />
              <span
                className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </span>
            </div>

            <p className="text-right mt-1">
              <button
                type="button"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
