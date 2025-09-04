import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

type UserInfo = {
  firstname?: string;
  lastname?: string;
  email?: string;
  phonenumber?: string;
};

export function useUpdateUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateUser = async (userData: UserInfo) => {
    setLoading(true);
    setError(null);

    const token = Cookies.get('token');

    if (!token) {
      setError('No authorization token found.');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile/`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLoading(false);
      return response.data; // you can return updated user info or whatever your backend returns
    } catch (err: any) {
      setLoading(false);
      setError(err.response?.data?.message || err.message || 'Failed to update user.');
      return null;
    }
  };

  return { updateUser, loading, error };
}
