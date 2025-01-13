import { Menu } from "lucide-react";
import { Link } from "react-router-dom";
import {
  ADMIN_NAV_LINKS,
  LOGGED_IN_NAV_LINKS,
  LOGGED_OUT_NAV_LINKS,
  NAV_LINKS,
  STORE_OWNER_NAV_LINKS,
} from "../../lib/constants";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import SearchInput from "./search-input";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const onOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isDropdownOpen) return;
    e.stopPropagation();
    setIsDropdownOpen(true);
  };
  useEffect(() => {
    if (!isDropdownOpen) return;
    const closeDropDown = () => {
      setIsDropdownOpen(false);
    };
    document.addEventListener("click", closeDropDown);
    return () => document.removeEventListener("click", closeDropDown);
  }, [isDropdownOpen]);

  const isStoreOwner = user?.role === "STORE_OWNER";
  const isAdmin = user?.role === "ADMIN";

  return (
    <header className="bg-zinc-50 shadow-xl h-16 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex justify-between items-center gap-x-8">
          {/* Logo */}
          <div className="w-32">
            <Link to="/" className="flex items-center hover:cursor-pointer">
              <img src="/shoply-banner.png" alt="Shoply Logo" />
            </Link>
          </div>
          
          {/* Categories */}
          <div className="hidden md:flex md:justify-center">
            <SearchInput />
          </div>

          {/* Dropdown Menu Button */}
          <button className="text-white hover:bg-blue-100 focus:ring-2 focus:outline-none focus:ring-blue-300 rounded-lg px-6 py-2 text-center inline-flex items-center" type="button" onClick={onOpen}>
            <Menu className ="size-6 text-gray-900"/>
          </button>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className={`absolute top-16 left-auto right-0 bg-zinc-50 border-t border-gray-200 shadow-lg transition-all duration-200 ${
            isDropdownOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}>
            <div className="flex flex-column z-10 divide-y divide-gray-200 rounded-lg shadow w-44">
              {NAV_LINKS.map((link) => {
                const Icon = link.icon
                return(
                  <Link to={link.href} key={link.label} 
                  className="flex items-center gap-x-2 p-3 text-gray-900 hover:text-sky-600"
                  onClick={() => setIsDropdownOpen(false)}>
                    <Icon className="size-4"/>
                    <span>{link.label}</span>
                  </Link>
                )
              })}
              {user ? (
                LOGGED_IN_NAV_LINKS.map((link) => {
                  const Icon = link.icon
                  return(
                    <Link
                      to={link.href}
                      key={link.label}
                      className="flex items-center gap-x-2 p-3 text-gray-900 hover:text-sky-600"
                    >
                      <Icon className="size-4" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })
              ):(
                LOGGED_OUT_NAV_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      to={link.href}
                      key={link.label}
                      onClick={logout}
                      className="flex items-center gap-x-2 p-3 text-gray-900 hover:text-sky-600"
                    >
                      <Icon className="size-4" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })
              )}
              {isStoreOwner && (
                STORE_OWNER_NAV_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      to={link.href}
                      key={link.label}
                      className="flex items-center gap-x-2 p-3 text-gray-900 hover:text-sky-600"
                    >
                      <Icon className="size-4" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })
              )}
              {isAdmin && (
                ADMIN_NAV_LINKS.map((link) => {
                  const Icon = link.icon
                  return (
                    <Link
                      to={link.href}
                      key={link.label}
                      className="flex items-center gap-x-2 p-3 text-gray-900 hover:text-sky-600"
                    >
                      <Icon className="size-4" />
                      <span>{link.label}</span>
                    </Link>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
