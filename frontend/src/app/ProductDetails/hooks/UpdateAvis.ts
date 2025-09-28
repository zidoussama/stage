// frontend/src/app/ProductDetails/hooks/updateComment.ts
'use client';

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface UseUpdateAvisResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  updateAvis: (avisId: string, text: string) => Promise<void>;
}

export const useUpdateAvis = (): UseUpdateAvisResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateAvis = async (avisId: string, text: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const token = Cookies.get("token");
      if (!token) throw new Error("No token found. Please login.");

      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/avis/${avisId}`,
        { text },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess(true);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, updateAvis };
};
