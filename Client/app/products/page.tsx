import { ProductList } from "@/components/product-list";
import { stripe } from "@/lib/stripe";

export default async function ProductsPage() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-extrabold leading-none tracking-tight text-gray-900 text-center mb-10 mt-4">
          All Products
        </h1>
        <ProductList products={products.data} />
      </div>
    </div>
  );
}