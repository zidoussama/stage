'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useUpdateUser } from '@/hooks/useUserupdate';

type UserInfo = {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
};

const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-7-7l7 7m0 0v3a2 2 0 01-2 2h-3"
    />
  </svg>
);

export default function PersonalInfoForm() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [formData, setFormData] = useState<UserInfo | null>(null);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const countryCode = '+216';

  const { updateUser, loading, error } = useUpdateUser();

  const fetchUserData = async () => {
    const token = Cookies.get('token');

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/profile/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch user data');

      const data = await res.json();
      const info: UserInfo = {
        firstname: data.firstname || '',
        lastname: data.lastname || '',
        email: data.email || '',
        phonenumber: data.phonenumber || '',
      };
      setUser(info);
      setFormData(info);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setNotification({ type: 'error', message: 'Failed to load user information.' });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData!, [e.target.name]: e.target.value });
  };

  const handleEditClick = (field: string) => {
    setEditingField(field);
  };

  const displayPhone = formData?.phonenumber?.replace(countryCode, '') ?? '';

  const handleUpdateClick = async () => {
    if (!formData) return;

    try {
      const updatedUser = await updateUser(formData);

      if (updatedUser) {
        setNotification({ type: 'success', message: 'User updated successfully!' });
        setUser(updatedUser);
        setFormData(updatedUser);
        setEditingField(null);

        fetchUserData();
      } else {
        setNotification({ type: 'error', message: 'Failed to update user.' });
      }
    } catch {
      setNotification({ type: 'error', message: 'Something went wrong during update.' });
    }
  };

  const handleBack = () => {
    router.back(); // Or router.push('/products') if preferred
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-8 max-w-4xl mx-auto mt-12 border border-pink-400">
      <h2 className="text-3xl font-extrabold text-black mb-8 border-b-4 border-pink-500 pb-2">
        Account Information
      </h2>

      {notification && (
        <div
          className={`mb-6 px-5 py-3 rounded-md flex justify-between items-center text-white font-semibold ${
            notification.type === 'success' ? 'bg-pink-600' : 'bg-black'
          }`}
          role="alert"
        >
          <span>{notification.message}</span>
          <button
            onClick={() => setNotification(null)}
            aria-label="Close notification"
            className="text-xl font-bold hover:text-pink-300 transition-colors"
          >
            ×
          </button>
        </div>
      )}

      {/* FIRSTNAME */}
      <div className="mb-8">
        <label className="block text-black text-sm font-semibold mb-2 tracking-wide">First Name</label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            name="firstname"
            value={formData?.firstname || ''}
            onChange={handleChange}
            disabled={editingField !== 'firstname' || loading}
            className={`w-full px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
              editingField === 'firstname'
                ? 'bg-white border border-pink-400 text-black'
                : 'bg-gray-100 border border-transparent text-gray-900 cursor-not-allowed'
            }`}
          />
          <button
            onClick={() => handleEditClick('firstname')}
            disabled={loading}
            className="w-10 h-10 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center transition-shadow shadow-md"
          >
            <PencilIcon />
          </button>
        </div>
      </div>

      {/* LASTNAME */}
      <div className="mb-8">
        <label className="block text-black text-sm font-semibold mb-2 tracking-wide">Last Name</label>
        <div className="flex items-center gap-3">
          <input
            type="text"
            name="lastname"
            value={formData?.lastname || ''}
            onChange={handleChange}
            disabled={editingField !== 'lastname' || loading}
            className={`w-full px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
              editingField === 'lastname'
                ? 'bg-white border border-pink-400 text-black'
                : 'bg-gray-100 border border-transparent text-gray-900 cursor-not-allowed'
            }`}
          />
          <button
            onClick={() => handleEditClick('lastname')}
            disabled={loading}
            className="w-10 h-10 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center transition-shadow shadow-md"
          >
            <PencilIcon />
          </button>
        </div>
      </div>

      {/* EMAIL */}
      <div className="mb-8">
        <label className="block text-black text-sm font-semibold mb-2 tracking-wide">Email</label>
        <div className="flex items-center gap-3">
          <input
            type="email"
            name="email"
            value={formData?.email || ''}
            onChange={handleChange}
            disabled={editingField !== 'email' || loading}
            className={`w-full px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
              editingField === 'email'
                ? 'bg-white border border-pink-400 text-black'
                : 'bg-gray-100 border border-transparent text-gray-900 cursor-not-allowed'
            }`}
          />
          <button
            onClick={() => handleEditClick('email')}
            disabled={loading}
            className="w-10 h-10 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center transition-shadow shadow-md"
          >
            <PencilIcon />
          </button>
        </div>
      </div>

      {/* PHONE NUMBER */}
      <div className="mb-8">
        <label className="block text-black text-sm font-semibold mb-2 tracking-wide">Phone Number</label>
        <div className="flex gap-3 items-center">
          <span className="px-4 py-3 bg-gray-100 border border-pink-400 rounded-lg text-black font-semibold">{countryCode}</span>
          <input
            type="text"
            name="phonenumber"
            value={displayPhone}
            onChange={(e) => {
              setFormData({
                ...formData!,
                phonenumber: `${countryCode}${e.target.value}`,
              });
            }}
            disabled={editingField !== 'phonenumber' || loading}
            className={`flex-1 px-5 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition ${
              editingField === 'phonenumber'
                ? 'bg-white border border-pink-400 text-black'
                : 'bg-gray-100 border border-transparent text-gray-900 cursor-not-allowed'
            }`}
          />
          <button
            onClick={() => handleEditClick('phonenumber')}
            disabled={loading}
            className="w-10 h-10 bg-pink-600 text-white rounded-lg hover:bg-pink-700 flex items-center justify-center transition-shadow shadow-md"
          >
            <PencilIcon />
          </button>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex gap-6 mt-8">
        <button
          onClick={handleUpdateClick}
          disabled={loading}
          className="border border-pink-600 text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-pink-50 transition disabled:opacity-60"
        >
          {loading ? 'Updating...' : 'Update'}
        </button>
        <button
          onClick={handleBack}
          className="border border-pink-600 text-pink-600 font-semibold px-6 py-3 rounded-lg hover:bg-pink-50 transition"
        >
          Back to Products
        </button>
      </div>

      {error && <p className="text-pink-600 mt-4 font-semibold">{error}</p>}
    </div>
  );
}