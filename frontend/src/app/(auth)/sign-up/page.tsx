"use client";

import { useState } from "react";
import Link from "next/link";
import useLogin from "@/app/(auth)/sign-up/hooks/useRegister";
import Image from "next/image";
import logo from "@/assets/logo/logopar.png";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    formData,
    setFormData,
    handleRegister,
    loading,
    error,
  } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      
      <div className="flex justify-center mb-6">
        <Image src={logo} alt="Logo" width={300} height={100} />
      </div>

      
      <h2 className="text-2xl font-bold text-center mb-6 text-pink-600">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit}>
        
          <div className="flex-1">
            <label className="block mb-1 text-sm text-gray-600">First Name</label>
            <input
              type="text"
              placeholder="First name"
              value={formData.firstname}
              onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm text-gray-600">Last Name</label>
            <input
              type="text"
              placeholder="Last name"
              value={formData.lastname}
              onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm text-gray-600">Phone number</label>
            <input
              type="text"
              placeholder="phone number"
              value={formData.phonenumber}
              onChange={(e) => setFormData({ ...formData, phonenumber: e.target.value })}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
              required
            />
          </div>
        
        <div className="mb-4">
          <label className="block mb-1 text-sm text-gray-600">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            required
          />
        </div>

        
        <div className="mb-2">
          <label className="block mb-1 text-sm text-gray-600">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 text-black border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none"
            required
          />
        </div>

        
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
          </Link>
        </div>

        
        {error && (
          <div className="mb-4 text-sm text-red-500 font-medium">
            {error}
          </div>
        )}

        
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition duration-200 disabled:opacity-60"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      
      <p className="text-sm text-center text-gray-600 mt-4">
        Don’t have an account?{" "}
        <Link href="/signup" className="text-pink-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
