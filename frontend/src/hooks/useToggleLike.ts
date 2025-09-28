// frontend/src/hooks/useLike.ts
'use client';

import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id?: string;
  _id?: string;
  userId?: string;
}

export const useLike = () => {
  const toggleLike = async (productId: string) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found");

      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id || decoded._id || decoded.userId;
      if (!userId) throw new Error("Invalid token: userId missing");

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes`,
        { userId, productId }, // Matches backend destructuring
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return res.data; // Returns the like object
    } catch (err: any) {
      console.error("Like error:", err.response?.data || err.message);
      throw err;
    }
  };

  // Fetch user's liked products (for initial status checks)
  const getUserLikes = async (): Promise<any[]> => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found");

      const decoded: JwtPayload = jwtDecode(token);
      const userId = decoded.id || decoded._id || decoded.userId;
      if (!userId) throw new Error("Invalid token: userId missing");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data; // Array of liked products (only is_liked: true)
    } catch (err: any) {
      console.error("Fetch likes error:", err.response?.data || err.message);
      throw err;
    }
  };

  // New: Fetch count of likes for a product
  const getProductLikesCount = async (productId: string): Promise<number> => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No token found");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/likes/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data.length; // Array length gives the count of likes (only is_liked: true)
    } catch (err: any) {
      console.error("Fetch product likes count error:", err.response?.data || err.message);
      throw err;
    }
  };

  return { toggleLike, getUserLikes, getProductLikesCount };
};