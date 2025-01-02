import { Menu, ShoppingCart, X } from "lucide-react";
import { Link } from "react-router-dom";
import { ADMIN_NAV_LINKS, NAV_LINKS } from "../../lib/constants";
import { useState } from "react";
import SearchBar from "./search-input";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isAdmin = true; // TODO: check auth context for user role

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
            <SearchBar />
          </div>

          {/* Desktop Nav Links */}
          {/* <div className="hidden lg:flex items-center gap-x-4">
            <h1>Desktop Nav Links</h1>
          </div> */}

          {/* Dropdown Menu Button */}
          <button
            className="p-2 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {isDropdownOpen ? (
              <X className="size-6 text-gray-900" />
            ) : (
              <Menu className="size-6 text-gray-900" />
            )}
          </button>
        </div>
        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div
            className={`absolute top-16 left-0 right-0 bg-zinc-50 border-t border-gray-200 shadow-lg transition-all duration-200 ${
              isDropdownOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <div className="md:hidden px-4 py-2">
              <SearchBar />
            </div>
            <div className="px-4 py-2 flex justify-around mx-auto">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    to={link.href}
                    key={link.label}
                    className="flex items-center gap-x-2 py-3 text-sm text-gray-900 hover:text-sky-600"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Icon className="size-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
              {isAdmin && (
                <div className="flex items-center gap-x-2 py-3 text-sm text-gray-900 hover:text-sky-600">
                  {ADMIN_NAV_LINKS.map((link) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        to={link.href}
                        key={link.label}
                        className="flex items-center gap-x-2 py-3 text-sm text-gray-900 hover:text-sky-600"
                      >
                        <Icon className="size-4" />
                        <span>{link.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
