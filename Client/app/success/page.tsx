"use client";

import { useCartStore } from "@/store/cart-store";
import Link from "next/link";
import { useEffect } from "react";

export default function SuccessPage() {
  const { clearCart } = useCartStore();
  useEffect(() => {
    clearCart();
  }, [clearCart]);
  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex items-center justify-center py-12">
      <div className="bg-white/90 rounded-xl shadow-lg p-12 max-w-lg mx-auto text-center">
        <svg className="mx-auto mb-6" width="64" height="64" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#22c55e" opacity="0.15"/><path d="M7 13l3 3 7-7" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <h1 className="text-3xl font-extrabold mb-4 text-gray-900">Payment Successful!</h1>
        <p className="mb-6 text-lg text-gray-700">
          Thank you for your purchase. Your order is being processed.
        </p>
        <Link href="/products" className="inline-block bg-blue-600 text-white text-lg font-semibold rounded-lg shadow px-8 py-3 hover:bg-blue-700 transition-colors">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}