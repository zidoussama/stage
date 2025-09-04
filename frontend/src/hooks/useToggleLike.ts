import { useState } from 'react';
import Cookies from 'js-cookie';
import {jwtDecode} from 'jwt-decode';

type JwtPayload = {
  user_id: string; // or userId depending on your token's structure
};

type Like = {
  _id: string;
  user: string;
  product: string;
  is_liked: boolean;
};

type ToggleLikeResponse = {
  message: string;
  like: Like;
};

type UseToggleLikeReturn = {
  toggleLike: (productId: string) => Promise<Like | null>;
  loading: boolean;
  error: string | null;
};

export function useToggleLike(): UseToggleLikeReturn {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleLike = async (productId: string) => {
    setLoading(true);
    setError(null);

    try {
      const token = Cookies.get('token');
      if (!token) throw new Error('User is not authenticated');

      const decoded = jwtDecode<JwtPayload>(token);
      const userId = decoded.user_id;
      if (!userId) throw new Error('Invalid token: no user id');

      const res = await fetch('/api/likes/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // pass the token if your backend uses it for auth
        },
        body: JSON.stringify({ userId, productId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Failed to toggle like');
      }

      const data: ToggleLikeResponse = await res.json();
      setLoading(false);
      return data.like;
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
      setLoading(false);
      return null;
    }
  };

  return { toggleLike, loading, error };
}
