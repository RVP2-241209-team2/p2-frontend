import { ArrowLeft, Heart, ShoppingCart, Star } from "lucide-react";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../types/product";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../lib/axios";
import { toast } from "sonner";
import ProductReviewForm from "../../components/main/forms/product-review-form";
import ReviewsList from "../../components/main/reviews-list";

export default function ProductDetailPage() {
  const { loading, error, fetchProductById } = useProducts();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [refreshReviews, setRefreshReviews] = useState(0);
  const { id } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      if (!id) {
        return;
      }
      const response = await fetchProductById(id);
      if (response) {
        console.log(response);
        setProduct(response);
      }
    };
    loadProduct();
  }, [fetchProductById, id]);

  const handleAddToCart = async () => {
    console.log("add to cart");
    const response = await api.post("/customers/cart/add", {
      productId: product?.id,
      quantity: 1,
    });
    if (response.status === 200) {
      toast.success(
        <div className="flex flex-col gap-2">
          <p>Product added to cart</p>
          <p>Total: ${product?.price.toFixed(2)}</p>
          <Link to="/cart" className="text-blue-500 hover:text-blue-600">
            View Cart
          </Link>
        </div>
      );
    } else {
      toast.error("Failed to add product to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error.message}</div>;
  }

  if (!product) {
    return <div className="text-red-500 text-center">Product not found</div>;
  }

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Products
          </button>
        </div>
      {/* Hero Section with Two Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Left Column - Product Image */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.slice(0, 4).map((image, index) => (
              <button
                key={index}
                className="aspect-square rounded-md overflow-hidden bg-gray-100"
              >
                <img
                  src={image}
                  alt={`${product.name} view ${index + 1}`}
                  className="w-full h-full object-cover hover:opacity-75 transition"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column - Product Info */}
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="ml-1 text-sm text-gray-600">
                  {/* TODO: get from api */}
                  {/* {product.rating.toFixed(1)} */}
                </span>
              </div>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-600">
                {product.quantity > 0 ? (
                  <span className="text-green-600">In Stock</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div className="space-y-4">
              {/* todo: add to cart / wishlist */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button className="w-full border border-white text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2">
                <Heart fill="red" className="w-5 h-5" />
                Add to Wishlist
              </button>
            </div>
          </div>

          <div className="prose prose-sm">
            <h3 className="text-lg font-semibold mb-2">Description</h3>
            <p className="text-gray-600">{product.description}</p>
          </div>

          {/* Product Options */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Options</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <select className="w-full border border-gray-300 rounded-md py-2 px-3">
                  {/** TODO: products from api */}
                  {/* {product.colors?.map((color) => (
                    <option key={color}>{color}</option>
                  ))} */}
                  <option>Red</option>
                  <option>Blue</option>
                  <option>Green</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Size
                </label>
                <select className="w-full border border-gray-300 rounded-md py-2 px-3">
                  {/** TODO: products from api */}
                  {/* {product.sizes?.map((size) => (
                    <option key={size}>{size}</option>
                  ))} */}
                  <option>Small</option>
                  <option>Medium</option>
                  <option>Large</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}

      <ProductReviewForm
        productId={product.id}
        onSuccess={() => setRefreshReviews((prev) => prev + 1)}
      />
      <ReviewsList productId={product.id} refreshTrigger={refreshReviews} />
    </div>
  );
}
