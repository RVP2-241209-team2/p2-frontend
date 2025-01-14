import { Star } from "lucide-react";
import { useReviews } from "../../hooks/useReviews";
import { useEffect } from "react";

interface ReviewsListProps {
  productId: string;
}

export default function ReviewsList({ productId }: ReviewsListProps) {
  const { reviews, loading, error, getReviewsByProduct } = useReviews();

  useEffect(() => {
    getReviewsByProduct(productId);
  }, [productId, getReviewsByProduct]);

  
  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="border-t pt-12">
      <h2 className="text-2xl font-bold mb-8">Customer Reviews</h2>
      <div className="space-y-8">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-8">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-gray-200" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium">{review.title}</h4>
                  <span className="text-sm text-gray-500">•</span>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-gray-600">{review.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
