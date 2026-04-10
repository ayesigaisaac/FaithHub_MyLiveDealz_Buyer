import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "@/cart/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

type StockStatus = "in_stock" | "low_stock" | "out_of_stock";

type MockProduct = {
  id: string;
  name: string;
  price: number;
  providerName: string;
  description: string;
  image: string;
  stockStatus: StockStatus;
  stockCount: number;
};

const mockProducts: MockProduct[] = [
  {
    id: "book-1",
    name: "Faith in Action Devotional",
    price: 18.99,
    providerName: "Grace House Ministry",
    description:
      "A 40-day devotional designed for small groups and personal quiet time, with practical reflection prompts and weekly prayer plans.",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1400&q=80",
    stockStatus: "in_stock",
    stockCount: 27,
  },
  {
    id: "cloth-1",
    name: "FaithHub Signature Hoodie",
    price: 39.0,
    providerName: "FaithHub Store",
    description:
      "Midweight fleece hoodie with soft lining and premium embroidery. Designed for outreach nights, worship rehearsals, and everyday wear.",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    stockStatus: "low_stock",
    stockCount: 4,
  },
  {
    id: "acc-1",
    name: "Scripture Verse Wristband",
    price: 9.75,
    providerName: "Hope Alive",
    description:
      "Durable silicone wristband featuring a daily reminder verse. Great for youth teams, volunteer kits, and ministry giveaways.",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1400&q=80",
    stockStatus: "out_of_stock",
    stockCount: 0,
  },
];

type ProductDetailProps = {
  productId?: string;
};

function toCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

function statusMeta(status: StockStatus, stockCount: number) {
  if (status === "out_of_stock") {
    return {
      label: "Out of stock",
      tone: "border-red-200 bg-red-50 text-red-700",
      detail: "This product is currently unavailable.",
    };
  }

  if (status === "low_stock") {
    return {
      label: "Low stock",
      tone: "border-amber-200 bg-amber-50 text-amber-700",
      detail: `${stockCount} item${stockCount === 1 ? "" : "s"} left.`,
    };
  }

  return {
    label: "In stock",
    tone: "border-emerald-200 bg-emerald-50 text-emerald-700",
    detail: `${stockCount} item${stockCount === 1 ? "" : "s"} available.`,
  };
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { addToCart } = useCart();
  const params = useParams<{ productId?: string }>();
  const resolvedProductId = productId || params.productId || mockProducts[0].id;

  const product = useMemo(
    () => mockProducts.find((entry) => entry.id === resolvedProductId) || null,
    [resolvedProductId],
  );

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [resolvedProductId]);

  if (!product) {
    return (
      <Card className="rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)]">
        <CardContent className="p-8 text-center text-sm text-slate-600">
          Product not found.
        </CardContent>
      </Card>
    );
  }

  const stock = statusMeta(product.stockStatus, product.stockCount);
  const maxQty = product.stockCount > 0 ? product.stockCount : 1;
  const canAddToCart = product.stockStatus !== "out_of_stock";

  const updateQuantity = (value: number) => {
    const safeValue = Number.isFinite(value) ? value : 1;
    setQuantity(Math.max(1, Math.min(maxQty, Math.trunc(safeValue))));
  };

  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
      <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)]">
        <div className="aspect-[4/3] w-full bg-slate-100">
          <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
        </div>
      </Card>

      <Card className="rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)]">
        <CardContent className="space-y-5 p-5 sm:p-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{product.name}</h1>
            <p className="mt-1 text-sm text-slate-600">By {product.providerName}</p>
            <div className="mt-3 text-2xl font-bold text-slate-900">{toCurrency(product.price)}</div>
          </div>

          <p className="text-sm leading-7 text-slate-700">{product.description}</p>

          <div className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${stock.tone}`}>
            {stock.label}
          </div>
          <p className="-mt-3 text-xs text-slate-500">{stock.detail}</p>

          <div className="space-y-2">
            <label htmlFor="product-quantity" className="text-sm font-semibold text-slate-800">
              Quantity
            </label>
            <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
              <button
                type="button"
                onClick={() => updateQuantity(quantity - 1)}
                className="h-10 w-10 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <input
                id="product-quantity"
                type="number"
                min={1}
                max={maxQty}
                value={quantity}
                onChange={(event) => updateQuantity(Number(event.target.value))}
                className="h-10 w-14 border-x border-slate-200 text-center text-sm font-semibold text-slate-900 outline-none"
              />
              <button
                type="button"
                onClick={() => updateQuantity(quantity + 1)}
                className="h-10 w-10 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          <Button
            type="button"
            disabled={!canAddToCart}
            className="h-11 w-full rounded-xl bg-[#03c8dc] font-semibold text-white hover:bg-[#02b4c6] disabled:cursor-not-allowed disabled:opacity-60"
            onClick={() => {
              addToCart({
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity,
              });
            }}
          >
            {canAddToCart ? "Add to Cart" : "Unavailable"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
