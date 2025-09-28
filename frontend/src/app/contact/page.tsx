'use client';

import { useState } from 'react';
import { useContact } from '@/hooks/useContact'; // Adjust path as needed

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    object: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { createContact } = useContact();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createContact(formData);
      setShowSuccessModal(true);
      setFormData({ name: '', email: '', object: '', message: '' }); // Reset form
    } catch (err: any) {
      setError(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#f9fafc] to-[#fffaf2] px-4">
        <div className="bg-white rounded-xl shadow-lg p-10 md:flex md:gap-16 max-w-5xl w-full">
          
          {/* Left - Contact Info */}
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
            <p className="text-gray-600 mb-6">
              We are committed to processing the information in order to contact you and talk about your project.
            </p>

            <div className="space-y-4 text-sm text-gray-800">
              <div className="flex items-center gap-2">
                <span>📧</span>
                <span>hamdouch.par@gmail.com</span>
              </div>
              <div className="flex items-start gap-2">
                <span>🏠</span>
                <div>
                  <p>RUE BACHIR SFAR, 8011</p>
                  <p>Dar-Chaabane, Tunisia</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span>📞</span>
                <span>+216 23 200 130</span>
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <form onSubmit={handleSubmit} className="md:w-1/2 space-y-4 w-full">
            <input
              name="name"
              type="text"
              placeholder="Name*"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50"
            />
            <input
              name="email"
              type="email"
              placeholder="Email*"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50"
            />
            <input
              name="object"
              type="text"
              placeholder="Object*"
              value={formData.object}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={5}
              disabled={loading}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300 disabled:opacity-50"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-md hover:opacity-90 transition disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      {/* Success Modal Popup */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-pink-400 to-pink-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h2>
              <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you soon!</p>
              <button
                onClick={closeModal}
                className="w-full bg-gradient-to-r from-pink-600 to-pink-500 text-white py-3 rounded-md hover:opacity-90 transition font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}