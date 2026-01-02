import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [role, setRole] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    /* Simple role-based auth check */
    if (role === "admin" && username === "admin" && password === "1234") {
        localStorage.setItem('isAuthenticated', 'true');
      navigate("/admin");
    } 
    else if (role === "tendor" && username === "tendor" && password === "1234") {
        localStorage.setItem('isAuthenticated', 'true');
      navigate("/tendor");
    } 
    else if (role === "coordinator" && username === "coordinator" && password === "1234") {
        localStorage.setItem('isAuthenticated', 'true');
      navigate("/coordinator");
    } 
    else {
      alert("Invalid credentials or role selection");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-end bg-cover bg-center p-4"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg mr-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Welcome Back
        </h2>

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

          {/* Role */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Select Role
            </label>
            <select
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">-- Select Role --</option>
              <option value="admin">Admin</option>
              <option value="coordinator">Coordinator</option>
              <option value="tendor">Tendor</option>
            </select>
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
