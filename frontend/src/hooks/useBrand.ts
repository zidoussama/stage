'use client';
import axios from 'axios';
const getAllBrand = async () => {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/brands`
    );
    return res.data;
  } catch (error) {
    console.error('Error fetching all brands:', error);
    throw error;
  }
};
export { getAllBrand };