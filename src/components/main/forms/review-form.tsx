import { useEffect, useState } from "react";
import { useReviews } from "../../../hooks/useReviews";

export default function ReviewForm({ productId }: { productId: string }) {
  const { reviews, loading, error, getReviewsByProduct, createReview } =
    useReviews();
  const [formData, setFormData] = useState({
    title: "",
    rating: 5,
    description: "",
  });

  useEffect(() => {
    getReviewsByProduct(productId);
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createReview({
      ...formData,
      productId,
    });
    setFormData({ title: "", rating: 5, description: "" }); // Reset form
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, title: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            value={formData.rating}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                rating: Number(e.target.value),
              }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Review
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            rows={4}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <p className="font-medium">{review.title}</p>
            <p className="text-sm text-gray-600">
              Rating: {review.rating} stars
            </p>
            <p className="mt-2">{review.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
