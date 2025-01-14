
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Truck,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t">
      {/* Trust badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-b">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <CreditCard className="w-8 h-8 text-sky-600" />
            <h3 className="font-semibold">Secure Payment</h3>
            <p className="text-sm text-gray-600">100% secure transactions</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Truck className="w-8 h-8 text-sky-600" />
            <h3 className="font-semibold">Fast Shipping</h3>
            <p className="text-sm text-gray-600">Free on orders over $50</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-sky-600" />
            <h3 className="font-semibold">Quality Guarantee</h3>
            <p className="text-sm text-gray-600">30-day money back</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <HeartHandshake className="w-8 h-8 text-sky-600" />
            <h3 className="font-semibold">24/7 Support</h3>
            <p className="text-sm text-gray-600">Dedicated assistance</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-600 mb-4">
              We're dedicated to providing the best shopping experience with quality products and exceptional service.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span>123 Shop Street, City, ST 12345</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>support@example.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/products" className="text-gray-600 hover:text-sky-600">Products</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">About Us</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">Contact</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">Blog</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-sky-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">Shipping Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">Returns & Exchanges</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">Privacy Policy</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">Terms & Conditions</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-sky-600">Track Order</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-500 mb-4">Subscribe to our newsletter for updates and exclusive offers!</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-600"
              />
              <button className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm hover:bg-sky-700 whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-600">
              © {currentYear} Shoply. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-sky-600">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-sky-600">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-sky-600">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-sky-600">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;