"use client";

import Stripe from "stripe";
import Image from "next/image";
import { Button } from "./ui/button";
import { useCartStore } from "@/store/cart-store";

interface Props {
  product: Stripe.Product;
}

export const ProductDetail = ({ product }: Props) => {
  const { items, addItem, removeItem } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find((item) => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const onAddItem = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: price.unit_amount as number,
      imageUrl: product.images ? product.images[0] : null,
      quantity: 1,
    });
  };

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-12">
      <div className="max-w-4xl mx-auto bg-white/90 rounded-xl shadow-lg flex flex-col md:flex-row gap-10 p-8 md:p-12">
        {product.images && product.images[0] && (
          <div className="relative w-full md:w-1/2 h-80 md:h-[28rem] rounded-xl overflow-hidden flex-shrink-0 shadow-md">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="transition duration-300 hover:opacity-90"
              priority
            />
          </div>
        )}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">{product.name}</h1>
            {product.description && (
              <p className="text-gray-700 mb-6 text-lg">{product.description}</p>
            )}
            {price && price.unit_amount && (
              <p className="text-2xl font-bold text-blue-600 mb-8">${(price.unit_amount / 100).toFixed(2)}</p>
            )}
          </div>
          <div className="flex items-center gap-4 mt-4">
            <Button variant="outline" className="text-2xl px-4 py-2" onClick={() => removeItem(product.id)}>
              –
            </Button>
            <span className="text-xl font-semibold min-w-[2rem] text-center">{quantity}</span>
            <Button className="bg-blue-600 text-white text-xl px-6 py-2 font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors" onClick={onAddItem}>+
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}