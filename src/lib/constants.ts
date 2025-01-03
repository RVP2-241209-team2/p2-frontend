import { Home, Package, ShoppingCart, User } from "lucide-react";

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
  {
    label: "Account",
    href: "/account",
    icon: User,
  },
];

export const ADMIN_NAV_LINKS = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: Home,
  },
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
  {
    label: "Products",
    href: "/admin/products",
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
