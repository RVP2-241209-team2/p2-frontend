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
    label: "category-1",
    href: "/products/category/category-1",
    slug: "category-1",
  },
  {
    label: "category-2",
    href: "/products/category/category-2",
    slug: "category-2",
  },
  {
    label: "category-3",
    href: "/products/category/category-3",
    slug: "category-3",
  },
  {
    label: "category-4",
    href: "/products/category/category-4",
    slug: "category-4",
  },
  {
    label: "category-5",
    href: "/products/category/category-5",
    slug: "category-5",
  },
];
