"use client";

import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-pink-500 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-md">
          LOGO
        </div>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
        Welcome Back
      </h2>

      {/* Email */}
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-600">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div className="mb-2">
        <label className="block mb-1 text-sm text-gray-600">Password</label>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
        />
      </div>

      {/* Show password + Forgot */}
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center text-sm text-gray-500">
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
            className="mr-2 accent-pink-500"
          />
          Show password
        </label>
        <Link
          href="/forgot-password"
          className="text-sm text-pink-600 hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}
      <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition duration-200">
        Login
      </button>

      {/* Redirect to Signup */}
      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-pink-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
