import React, { useEffect, useMemo, useState } from "react";
import { Search, Sparkles } from "lucide-react";
import { useCart } from "@/cart/CartContext";
import ProductCard, { type MerchandiseProduct } from "@/pages/user/merchandise/components/ProductCard";

type MerchandiseCategory = "All" | "Books" | "Clothing" | "Accessories";

const categoryFilters: MerchandiseCategory[] = ["All", "Books", "Clothing", "Accessories"];

const mockProducts: MerchandiseProduct[] = [
  {
    id: "book-1",
    name: "Faith in Action Devotional",
    price: 18.99,
    providerName: "Grace House Ministry",
    image:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1200&q=80",
    category: "Books",
  },
  {
    id: "book-2",
    name: "Leadership for Kingdom Builders",
    price: 24.5,
    providerName: "Harvest Community",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
    category: "Books",
  },
  {
    id: "cloth-1",
    name: "FaithHub Signature Hoodie",
    price: 39.0,
    providerName: "FaithHub Store",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80",
    category: "Clothing",
  },
  {
    id: "cloth-2",
    name: "Worship Night T-Shirt",
    price: 22.0,
    providerName: "New Dawn Church",
    image:
      "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=1200&q=80",
    category: "Clothing",
  },
  {
    id: "acc-1",
    name: "Scripture Verse Wristband",
    price: 9.75,
    providerName: "Hope Alive",
    image:
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=1200&q=80",
    category: "Accessories",
  },
  {
    id: "acc-2",
    name: "Prayer Journal Tote Bag",
    price: 16.4,
    providerName: "Faith Collective",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
    category: "Accessories",
  },
  {
    id: "book-3",
    name: "Daily Psalms Study Guide",
    price: 14.99,
    providerName: "City Light Fellowship",
    image:
      "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80",
    category: "Books",
  },
  {
    id: "cloth-3",
    name: "Volunteer Team Cap",
    price: 19.0,
    providerName: "River of Life Chapel",
    image:
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80",
    category: "Clothing",
  },
];

export default function FaithHubMerchandise() {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<MerchandiseCategory>("All");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 450);
    return () => window.clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return mockProducts.filter((product) => {
      const inCategory = selectedCategory === "All" || product.category === selectedCategory;
      if (!inCategory) return false;

      if (!query) return true;

      return (
        product.name.toLowerCase().includes(query) ||
        product.providerName.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }, [searchTerm, selectedCategory]);

  const handleAddToCart = (product: MerchandiseProduct) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="space-y-5">
      <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Merchandise</h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">Support ministries through products</p>

        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <label className="relative block w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search merchandise..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition focus:border-[#03c8dc] focus:ring-2 focus:ring-[#03c8dc]/20"
            />
          </label>

          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    isActive
                      ? "bg-[#03c8dc] text-white shadow-[0_8px_20px_-12px_rgba(3,200,220,0.7)]"
                      : "border border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-[#03c8dc]/40 hover:shadow-[0_10px_24px_-18px_rgba(15,23,42,0.4)]"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {isLoading ? (
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <article
              key={`merch-skeleton-${index}`}
              className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.18)]"
            >
              <div className="aspect-[4/3] animate-pulse bg-slate-200" />
              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-1/2 animate-pulse rounded bg-slate-200" />
                <div className="mt-3 flex items-center justify-between gap-2">
                  <div className="h-5 w-16 animate-pulse rounded bg-slate-200" />
                  <div className="h-9 w-24 animate-pulse rounded-xl bg-slate-200" />
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : filteredProducts.length ? (
        <section className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))}
        </section>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-[0_10px_30px_-20px_rgba(15,23,42,0.24)]">
          <div className="mx-auto mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="text-base font-semibold text-slate-800">No products found</div>
          <p className="mt-1 text-sm text-slate-500">
            Try a different keyword or clear your filters to discover more merchandise.
          </p>
        </div>
      )}
    </div>
  );
}
