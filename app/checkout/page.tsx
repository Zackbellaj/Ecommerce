"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem } = useCartStore();
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen flex items-center justify-center">
        <div className="bg-white/90 rounded-xl shadow-lg p-12 text-center max-w-lg mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Your Cart is Empty</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-12">
      <div className="max-w-2xl mx-auto bg-white/90 rounded-xl shadow-lg p-8 md:p-12">
        <h1 className="text-3xl font-extrabold mb-8 text-center text-gray-900">Checkout</h1>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col gap-2 border-b pb-4 last:border-b-0 last:pb-0">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{item.name}</span>
                    <span className="font-semibold text-blue-600">
                      ${((item.price * item.quantity) / 100).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-lg px-3 py-1"
                      onClick={() => removeItem(item.id)}
                    >
                      –
                    </Button>
                    <span className="text-lg font-semibold min-w-[2rem] text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-lg px-3 py-1"
                      onClick={() => addItem({ ...item, quantity: 1 })}
                    >
                      +
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6 border-t pt-4 text-xl font-bold text-right text-gray-900">
              Total: <span className="text-blue-600">${(total / 100).toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
        <form action={checkoutAction} className="max-w-md mx-auto">
          <input type="hidden" name="items" value={JSON.stringify(items)} />
          <Button type="submit" variant="default" className="w-full bg-blue-600 text-white text-lg font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors py-4">
            Proceed to Payment
          </Button>
        </form>
      </div>
    </div>
  );
}