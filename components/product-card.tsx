import Link from "next/link";
import Stripe from "stripe";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";

interface Props {
  product: Stripe.Product;
}

export const ProductCard = ({ product }: Props) => {
  const price = product.default_price as Stripe.Price;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="group hover:shadow-2xl transition-shadow duration-300 py-0 h-full flex flex-col border-gray-200 gap-0 rounded-xl shadow-md bg-white">
        {product.images && product.images[0] && (
          <div className="relative h-60 w-full rounded-t-xl overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              layout="fill"
              objectFit="cover"
              className="group-hover:opacity-90 transition-opacity duration-300"
            />
          </div>
        )}
        <CardHeader className="p-5 pb-2">
          <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
            {product.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-5 flex-grow flex flex-col justify-between">
          {product.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2 min-h-[2.5em]">{product.description}</p>
          )}
          {price && price.unit_amount && (
            <p className="text-lg font-semibold text-blue-600 mb-4">${(price.unit_amount / 100).toFixed(2)}</p>
          )}
          <Button className="mt-auto w-full bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors">View Details</Button>
        </CardContent>
      </Card>
    </Link>
  );
};