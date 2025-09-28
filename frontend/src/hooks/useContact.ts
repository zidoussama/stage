'use client';

import axios from 'axios';

export const createContact = async (data: {
  name: string;
  email: string;
  object: string; // Assuming this is the subject field
  message: string;
}) => {
  try {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/contact`, data);
    return response.data;
  } catch (error: any) {
    console.error('Error creating contact:', error);
    throw new Error(error.response?.data?.message || 'Failed to send message');
  }
};

export const useContact = () => {
  return { createContact };
};