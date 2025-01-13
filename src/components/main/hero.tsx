import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative h-[60vh] -mt-8 flex items-center justify-center rounded-lg overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Discover Your Style
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Curated collections for the modern lifestyle
        </p>
        <Link
          to="/products"
          className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
