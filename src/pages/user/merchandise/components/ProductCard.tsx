import React from "react";
import { Button } from "@/components/ui/button";

export type MerchandiseProduct = {
  id: string;
  name: string;
  price: number;
  providerName: string;
  image: string;
  category: "Books" | "Clothing" | "Accessories";
};

type ProductCardProps = {
  product: MerchandiseProduct;
  onAddToCart: (product: MerchandiseProduct) => void;
};

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_20px_40px_-22px_rgba(15,23,42,0.4)]">
      <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
          loading="lazy"
        />
      </div>

      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">{product.name}</h3>
          <p className="text-xs text-slate-500">By {product.providerName}</p>
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-bold text-slate-900">{currency(product.price)}</span>
          <Button
            type="button"
            onClick={() => onAddToCart(product)}
            className="h-9 rounded-xl bg-[#03c8dc] px-3 text-xs font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#02b4c6] hover:shadow-[0_12px_24px_-14px_rgba(3,200,220,0.85)] active:translate-y-0"
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}
