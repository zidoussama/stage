'use client';

import React, { useState, useEffect } from 'react';
import { FaPen } from "react-icons/fa6";
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { useParams, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { useAvis } from "../app/ProductDetails/hooks/createcomment";
import { useDeleteAvis } from "../app/ProductDetails/hooks/useDeleteAvis";
import { useUpdateAvis } from "../app/ProductDetails/hooks/UpdateAvis";

// JWT payload type
interface JwtPayload {
  id?: string;
  _id?: string;
  userId?: string;
}

// Review type
interface Review {
  _id?: string;
  userId?: string;
  name: string;
  date: string;
  text: string;
}

// Single Review component
interface SingleReviewProps {
  review: Review;
  currentUserId?: string;
  editingId?: string | null;
  editText?: string;
  setEditText?: (value: string) => void;
  setEditingId?: (id: string | null) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const SingleReview: React.FC<SingleReviewProps> = ({
  review,
  currentUserId,
  editingId,
  editText,
  setEditText,
  setEditingId,
  onDelete,
  onUpdate
}) => {
  const isOwner = review.userId === currentUserId;
  const isEditing = editingId === review._id;

  return (
    <div className="flex flex-col sm:flex-row gap-4 py-6 border-b border-gray-100 last:border-b-0">
      <div className="flex-shrink-0 w-12 h-12 bg-gray-200 rounded-full"></div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-1">
          <div>
            <h4 className="font-semibold text-gray-800">{review.name}</h4>
          </div>
          <span className="text-xs text-gray-400 whitespace-nowrap">{review.date}</span>
        </div>

        {isEditing ? (
          <div className="mb-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText!(e.target.value)}
              className="border rounded p-1 w-full text-sm"
            />
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => onUpdate(review._id!)}
                className="px-2 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={() => setEditingId!(null)}
                className="px-2 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-600 leading-relaxed my-3">{review.text}</p>
        )}

        {isOwner && !isEditing && (
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setEditingId!(review._id!);
                setEditText!(review.text);
              }}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-pink-600 transition-colors"
            >
              <FaPen />
            </button>
            <button
              onClick={() => onDelete(review._id!)}
              className="flex items-center gap-2 text-xs text-gray-500 hover:text-pink-600 transition-colors"
            >
              <RiDeleteBin5Fill />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Main Avis component
const Avis: React.FC = () => {
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(false);
  const [errorReviews, setErrorReviews] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const params = useParams();
  const productId = params?.id as string;
  const router = useRouter();

  const { createAvis, loading, error } = useAvis();
  const { deleteAvis, error: deleteError } = useDeleteAvis();
  const { updateAvis, error: updateError } = useUpdateAvis();

  // Get current user ID from token
  const token = Cookies.get('token');
  let currentUserId: string | undefined;
  if (token) {
    const decoded = jwtDecode<JwtPayload>(token);
    currentUserId = decoded.id || decoded._id || decoded.userId;
  }

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      setLoadingReviews(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/avis/${productId}`);
      const data = res.data.map((r: any) => ({
        _id: r._id,
        userId: r.userId._id,
        name: r.userId.firstname + ' ' + r.userId.lastname,
        date: new Date(r.date).toLocaleDateString(),
        text: r.text,
      }));
      setReviews(data);
    } catch (err: any) {
      setErrorReviews(err.message || 'Failed to load reviews');
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Add comment
  const handleAddComment = async () => {
    if (!token) {
      router.push('/sign-in');
      return;
    }

    if (!comment.trim()) return;

    try {
      await createAvis({ productId, text: comment });
      setComment('');
      fetchReviews();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete comment
  const handleDeleteComment = async (avisId: string) => {
    if (!confirm("Are you sure you want to delete this comment?")) return;
    await deleteAvis(avisId);
    fetchReviews();
  };

  // Update comment
  const handleUpdateComment = async (id: string) => {
    if (!editText.trim()) return;
    await updateAvis(id, editText);
    setEditingId(null);
    setEditText('');
    fetchReviews();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
      <div className="lg:col-span-8">
        {/* Add Comment Form */}
        <div className="mb-6 space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border rounded p-2 text-sm"
          />
          <button
            onClick={handleAddComment}
            disabled={loading}
            className={`px-4 py-2 rounded text-sm text-white ${
              loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Adding...' : 'Add Comment'}
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {/* Reviews List */}
        {loadingReviews ? (
          <p>Loading reviews...</p>
        ) : errorReviews ? (
          <p className="text-red-500">{errorReviews}</p>
        ) : reviews.length > 0 ? (
          reviews.map((review) => (
            <SingleReview
              key={review._id}
              review={review}
              currentUserId={currentUserId}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
              setEditingId={setEditingId}
              onDelete={handleDeleteComment}
              onUpdate={handleUpdateComment}
            />
          ))
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}

        {deleteError && <p className="text-red-500">{deleteError}</p>}
        {updateError && <p className="text-red-500">{updateError}</p>}
      </div>
    </div>
  );
};

export default Avis;
