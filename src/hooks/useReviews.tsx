import { useState } from "react";
import api from "../lib/axios";

// Types
interface Review {
  id: string;
  userId: string;
  productId: string;
  rating: number;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface ReviewDTO {
  productId: string;
  rating: number;
  title: string;
  description: string;
  userId?: string;
}

interface UseReviewsReturn {
  reviews: Review[];
  myReviews: Review[];
  loading: boolean;
  error: string | null;
  createReview: (review: ReviewDTO) => Promise<void>;
  getReviewsByProduct: (productId: string) => Promise<void>;
  getMyReviews: () => Promise<void>;
  getAllReviews: () => Promise<void>;
  deleteReview: (reviewId: string) => Promise<void>;
  deleteCustomerReview: (reviewId: string) => Promise<void>;
  updateReview: (reviewId: string, review: ReviewDTO) => Promise<void>;
}

const BASE_ENDPOINT = "/public/reviews";

export const useReviews = (): UseReviewsReturn => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createReview = async (reviewData: ReviewDTO): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_ENDPOINT}/create`;
      console.log({ message: "Attempting createReview from:", url });
      console.log({ message: "createReview", reviewData });
      const response = await api.post<Review>(
        `${BASE_ENDPOINT}/create`,
        reviewData
      );
      setReviews((prev) => [...prev, response.data]);
      setMyReviews((prev) => [...prev, response.data]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while creating the review"
      );
    } finally {
      setLoading(false);
    }
  };

  const getReviewsByProduct = async (productId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const url = `${BASE_ENDPOINT}/product/${productId}`;
      console.log("Request details:", {
        url,
        headers: (await api.get("/")).config?.headers,
        token: localStorage.getItem("token"),
      });
      const response = await api.get<Review[]>(
        `${BASE_ENDPOINT}/product/${productId}`
      );
      console.log({ message: "getReviewsByProduct", response });
      setReviews(response.data);
    } catch (err) {
      console.log({ message: "getReviewsByProduct", err });
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  const getMyReviews = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Review[]>(
        `${BASE_ENDPOINT}/customer/my-reviews`
      );
      setMyReviews(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching your reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  const getAllReviews = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get<Review[]>(`${BASE_ENDPOINT}/all`);
      setReviews(response.data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while fetching all reviews"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteReview = async (reviewId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`${BASE_ENDPOINT}/delete/${reviewId}`);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      setMyReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting the review"
      );
    } finally {
      setLoading(false);
    }
  };

  const deleteCustomerReview = async (reviewId: string): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await api.delete(`${BASE_ENDPOINT}/customer/delete/${reviewId}`);
      setReviews((prev) => prev.filter((review) => review.id !== reviewId));
      setMyReviews((prev) => prev.filter((review) => review.id !== reviewId));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while deleting your review"
      );
    } finally {
      setLoading(false);
    }
  };

  const updateReview = async (
    reviewId: string,
    reviewData: ReviewDTO
  ): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.patch<Review>(
        `${BASE_ENDPOINT}/update/${reviewId}`,
        reviewData
      );
      const updatedReview = response.data;
      setReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? updatedReview : review))
      );
      setMyReviews((prev) =>
        prev.map((review) => (review.id === reviewId ? updatedReview : review))
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred while updating the review"
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    reviews,
    myReviews,
    loading,
    error,
    createReview,
    getReviewsByProduct,
    getMyReviews,
    getAllReviews,
    deleteReview,
    deleteCustomerReview,
    updateReview,
  };
};
