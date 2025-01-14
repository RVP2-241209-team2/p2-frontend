import { ArrowRightFromLine, Home, Package, ShoppingCart, User } from "lucide-react";

export const API_URL = "http://3.144.215.146:8081/api";

export const NAV_LINKS = [
  {
    label: "Home",
    href: "/",
    icon: Home,
  },
  {
    label: "Products",
    href: "/products",
    icon: Package,
  },
  {
    label: "Cart",
    href: "/cart",
    icon: ShoppingCart,
  },
];

export const LOGGED_IN_NAV_LINKS = [
  {
    label: "Account",
    href: "/account",
    icon: User,
  },
  {
    label: "Logout",
    href: "/",
    icon: ArrowRightFromLine,
  },
]

export const LOGGED_OUT_NAV_LINKS = [
  {
    label: "Login",
    "href": "/login",
    icon: User,
  },
]

export const STORE_OWNER_NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/store-owner",
    icon: Home,
  },
  {
    label: "Products",
    href: "/store-owner/products",
    icon: Package,
  },
];

export const ADMIN_NAV_LINKS = [
  {
    label: "Manage Users",
    href: "/admin/users",
    icon: User,
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: Package,
  },
];

export const CATEGORIES = [
  {
    label: "Electronics",
    href: "/products/category/electronics",
    slug: "electronics",
  },
  {
    label: "Clothing",
    href: "/products/category/clothing",
    slug: "clothing",
  },
  {
    label: "Home & Office",
    href: "/products/category/home-office",
    slug: "home-office",
  },
  {
    label: "Sports & Outdoors",
    href: "/products/category/sports-outdoors",
    slug: "sports-outdoors",
  },
  {
    label: "Toys & Games",
    href: "/products/category/toys-games",
    slug: "toys-games",
  },
];

export const BACKGROUND_IMAGES = [
  // TODO: Actual Images
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc",
  "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04",
];
