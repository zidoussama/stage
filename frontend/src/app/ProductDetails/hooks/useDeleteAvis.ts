// frontend/src/app/ProductDetails/hooks/deleteComment.ts
'use client';

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface UseDeleteAvisResult {
  loading: boolean;
  error: string | null;
  success: boolean;
  deleteAvis: (avisId: string) => Promise<void>;
}

export const useDeleteAvis = (): UseDeleteAvisResult => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteAvis = async (avisId: string) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);

      const token = Cookies.get("token");
      if (!token) throw new Error("No token found. Please login.");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/avis/${avisId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  return { loading, error, success, deleteAvis };
};
