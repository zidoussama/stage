// frontend/src/app/ProductDetails/hooks/createcomment.ts
'use client';

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

// JWT payload type
interface JwtPayload {
  id?: string;
  userId?: string;
  _id?: string;
  exp?: number;
  iat?: number;
}

// Avis object type
interface Avis {
  _id?: string;
  productId: string;
  text: string;
}

interface UseAvisResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  createAvis: (input: Omit<Avis, "_id">) => Promise<void>;
}

export const useAvis = (): UseAvisResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createAvis = async ({ productId, text }: Omit<Avis, "_id">) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      // Get token
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found. Please login.");

      // Decode token
      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.id || decoded.userId || decoded._id;
      if (!userId) throw new Error("Invalid token: userId not found.");

      // POST request
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/avis`,
        { productId, text }, // backend will get userId from token
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, createAvis };
};
