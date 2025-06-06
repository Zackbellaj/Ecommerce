import Image from "next/image";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Carousel } from "@/components/carousel";

export default async function Home() {
  const products = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 5,
  });

  return (
    <div className="bg-gradient-to-b from-white to-blue-50 min-h-screen">
      <section className="rounded-xl bg-white/80 shadow-lg py-12 sm:py-16 mb-12 mt-8 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 md:px-12">
        <div className="flex-1 space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4 leading-tight">
            Welcome to <span className="text-blue-600">Ecommerce</span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Discover the latest products at the best prices. Shop with confidence and enjoy fast delivery.
          </p>
          <Button
            asChild
            variant="default"
            className="inline-flex items-center justify-center rounded-full px-8 py-4 bg-blue-600 text-white text-lg font-semibold shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full px-8 py-4"
            >
              Browse All Products
            </Link>
          </Button>
        </div>
        <div className="flex-1 flex justify-center">
          <Image
            alt="Hero Image"
            src={products.data[1].images[0]}
            className="rounded-xl shadow-xl object-cover"
            width={400}
            height={400}
            priority
          />
        </div>
      </section>
      <section className="py-8 max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Featured Products</h3>
        <Carousel products={products.data}/>
      </section>
    </div>
  );
}