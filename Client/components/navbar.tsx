"use client";

import Link from "next/link";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useCartStore } from "@/store/cart-store";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors">
          <span className="bg-blue-600 text-white rounded-full px-3 py-1 text-lg font-extrabold">EC</span>
          <span className="hidden sm:inline">Ecommerce</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-lg font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <Link href="/products" className="hover:text-blue-600 transition-colors">Products</Link>
          <Link href="/checkout" className="hover:text-blue-600 transition-colors">Checkout</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/checkout" className="relative group">
            <ShoppingCartIcon className="h-7 w-7 text-gray-700 group-hover:text-blue-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white font-bold shadow-md">
                {cartCount}
              </span>
            )}
          </Link>
          <Button
            variant="ghost"
            className="md:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
          >
            {mobileOpen ? (
              <XMarkIcon className="h-7 w-7" />
            ) : (
              <Bars3Icon className="h-7 w-7" />
            )}
          </Button>
        </div>
      </div>
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-md border-t border-gray-100 animate-fade-in-down">
          <ul className="flex flex-col p-4 space-y-2 text-lg font-medium">
            <li>
              <Link href="/" className="block hover:text-blue-600 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/products" className="block hover:text-blue-600 transition-colors">Products</Link>
            </li>
            <li>
              <Link href="/checkout" className="block hover:text-blue-600 transition-colors">Checkout</Link>
            </li>
          </ul>
        </nav>
      )}
    </nav>
  );
};