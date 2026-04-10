import React, { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/cart/CartContext";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function FaithHubCart() {
  const { items } = useCart();
  const [quantityOverrides, setQuantityOverrides] = useState<Record<string, number>>({});
  const [removedProductIds, setRemovedProductIds] = useState<Record<string, true>>({});

  const visibleItems = useMemo(
    () =>
      items
        .filter((item) => !removedProductIds[item.productId])
        .map((item) => ({
          ...item,
          quantity: quantityOverrides[item.productId] ?? item.quantity,
        })),
    [items, quantityOverrides, removedProductIds],
  );

  const totalPrice = useMemo(
    () => visibleItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [visibleItems],
  );

  const updateQuantity = (productId: string, nextQuantity: number) => {
    const safeQuantity = Math.max(1, Math.trunc(nextQuantity || 1));
    setQuantityOverrides((prev) => ({ ...prev, [productId]: safeQuantity }));
  };

  const removeItem = (productId: string) => {
    setRemovedProductIds((prev) => ({ ...prev, [productId]: true }));
  };

  return (
    <div className="space-y-5">
      <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Cart</h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Review selected products before checkout
        </p>
      </header>

      {visibleItems.length === 0 ? (
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)]">
          <CardContent className="p-10 text-center text-sm text-slate-500">
            Your cart is empty.
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_0.9fr]">
          <section className="space-y-3">
            {visibleItems.map((item) => (
              <Card
                key={item.productId}
                className="rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.2)]"
              >
                <CardContent className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-semibold text-slate-900">{item.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">Unit price: {currency(item.price)}</p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                    <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        className="h-10 w-10 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                        aria-label={`Decrease quantity for ${item.name}`}
                      >
                        -
                      </button>
                      <span className="inline-flex h-10 min-w-[3rem] items-center justify-center border-x border-slate-200 px-3 text-sm font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        className="h-10 w-10 text-lg font-semibold text-slate-700 transition hover:bg-slate-50"
                        aria-label={`Increase quantity for ${item.name}`}
                      >
                        +
                      </button>
                    </div>

                    <div className="min-w-[96px] text-right text-sm font-semibold text-slate-900">
                      {currency(item.price * item.quantity)}
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="h-10 rounded-xl border-red-200 text-red-600 hover:bg-red-50"
                      onClick={() => removeItem(item.productId)}
                    >
                      <Trash2 className="h-4 w-4" />
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </section>

          <aside>
            <Card className="rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)]">
              <CardContent className="space-y-4 p-5">
                <div className="text-lg font-semibold text-slate-900">Order Summary</div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Items</span>
                  <span>{visibleItems.length}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Total quantity</span>
                  <span>{visibleItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-slate-200 pt-3">
                  <span className="text-base font-semibold text-slate-900">Total</span>
                  <span className="text-xl font-bold text-slate-900">{currency(totalPrice)}</span>
                </div>
                <Button
                  type="button"
                  className="h-11 w-full rounded-xl bg-[#03c8dc] font-semibold text-white hover:bg-[#02b4c6]"
                  onClick={() => {
                    // Placeholder checkout action. Payment integration comes later.
                    console.log("[Cart] Checkout", { totalPrice, itemCount: visibleItems.length });
                  }}
                >
                  Checkout
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      )}
    </div>
  );
}

