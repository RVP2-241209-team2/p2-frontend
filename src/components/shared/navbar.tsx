import { Menu, ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { CATEGORIES, NAV_LINKS } from "../../lib/constants";
import { useState } from "react";

// TODO: make responsive

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <header className="bg-zinc-50 shadow-xl h-16 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center gap-x-8">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:cursor-pointer">
            <ShoppingCart className="size-8 text-sky-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Shoplify</h1>
          </Link>

          {/* Categories */}
          <div className="hidden md:flex md:justify-center">
            <div className="flex items-center gap-x-4">
              {CATEGORIES.map((category) => (
                <Link
                  to={category.href}
                  key={category.label}
                  className="text-sm text-gray-900 hover:text-sky-600"
                >
                  {category.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-x-4">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  to={link.href}
                  key={link.label}
                  className="flex items-center gap-x-1 text-sm text-gray-900 hover:text-sky-600"
                >
                  <Icon className="size-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? (
              <X className="size-6 text-gray-900" />
            ) : (
              <Menu className="size-6 text-gray-900" />
            )}
          </button>
        </div>
        {/* Mobile Nav Links */}
        {isMobile && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-zinc-50 border-t border-gray-200 shadow-lg">
            <div className="px-4 py-2">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    to={link.href}
                    key={link.label}
                    className="flex items-center gap-x-2 py-3 text-sm text-gray-900 hover:text-sky-600"
                    onClick={() => setIsMobile(false)}
                  >
                    <Icon className="size-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
