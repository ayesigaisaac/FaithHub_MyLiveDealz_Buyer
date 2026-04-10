import React, { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/cart/CartContext";
import { processWalletPurchase } from "@/data/wallet";
import { useOrders } from "@/orders/OrderContext";

type PaymentMethod = "card" | "mobile_money" | "bank_transfer";

function currency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
}

export default function FaithHubCheckout() {
  const { items } = useCart();
  const { createOrder } = useOrders();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [createdOrderId, setCreatedOrderId] = useState<string | null>(null);
  const [walletError, setWalletError] = useState("");

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const canConfirm =
    Boolean(items.length) &&
    name.trim().length > 1 &&
    email.trim().length > 3 &&
    address.trim().length > 5;

  const handleConfirmOrder = () => {
    if (!canConfirm) return;
    setWalletError("");

    const purchaseResult = processWalletPurchase("user", {
      amount: subtotal,
      source: "faithmart",
    });
    if (!purchaseResult.ok) {
      setWalletError(
        purchaseResult.reason === "insufficient_funds"
          ? "Insufficient wallet balance for this purchase."
          : "Unable to process wallet purchase.",
      );
      return;
    }

    const created = createOrder({
      items,
      total: subtotal,
      user: {
        name,
        email,
        address,
      },
    });

    setCreatedOrderId(created.id);
  };

  return (
    <div className="space-y-5">
      <header className="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)] sm:p-6">
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">Checkout</h1>
        <p className="mt-1 text-sm text-slate-600 sm:text-base">
          Confirm your details and place your order
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)]">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="text-lg font-semibold text-slate-900">Billing Details</div>

            <label className="block space-y-1.5" htmlFor="checkout-name">
              <span className="text-sm font-medium text-slate-700">Name</span>
              <input
                id="checkout-name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-[#03c8dc] focus:ring-2 focus:ring-[#03c8dc]/20"
              />
            </label>

            <label className="block space-y-1.5" htmlFor="checkout-email">
              <span className="text-sm font-medium text-slate-700">Email</span>
              <input
                id="checkout-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm text-slate-900 outline-none transition focus:border-[#03c8dc] focus:ring-2 focus:ring-[#03c8dc]/20"
              />
            </label>

            <label className="block space-y-1.5" htmlFor="checkout-address">
              <span className="text-sm font-medium text-slate-700">Address</span>
              <textarea
                id="checkout-address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                placeholder="Shipping address"
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-[#03c8dc] focus:ring-2 focus:ring-[#03c8dc]/20"
              />
            </label>

            <div className="space-y-2">
              <div className="text-sm font-medium text-slate-700">Payment Method (Mock)</div>
              <div className="grid gap-2 sm:grid-cols-3">
                {[
                  { id: "card", label: "Card" },
                  { id: "mobile_money", label: "Mobile Money" },
                  { id: "bank_transfer", label: "Bank Transfer" },
                ].map((method) => {
                  const checked = paymentMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as PaymentMethod)}
                      className={`rounded-xl border px-3 py-2 text-sm font-semibold transition ${
                        checked
                          ? "border-[#03c8dc] bg-[#03c8dc]/10 text-[#028da0]"
                          : "border-slate-200 bg-white text-slate-700 hover:border-[#03c8dc]/40"
                      }`}
                    >
                      {method.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <Button
              type="button"
              disabled={!canConfirm}
              className="h-11 w-full rounded-xl bg-[#03c8dc] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#02b4c6] hover:shadow-[0_14px_28px_-16px_rgba(3,200,220,0.85)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleConfirmOrder}
            >
              Confirm Order
            </Button>

            {createdOrderId ? (
              <div className="rounded-xl border border-[rgba(3,205,140,0.34)] bg-[linear-gradient(135deg,rgba(3,205,140,0.14),rgba(3,200,220,0.1))] px-3 py-3 text-sm text-slate-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  <div>
                    <div className="font-semibold">Purchase successful</div>
                    <div className="text-slate-700">
                      Your wallet purchase was recorded and order{" "}
                      <span className="font-semibold">{createdOrderId}</span> is now pending.
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
            {walletError ? (
              <div className="rounded-xl border border-[rgba(247,127,0,0.35)] bg-[rgba(247,127,0,0.12)] px-3 py-2 text-sm text-slate-800">
                {walletError}
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="rounded-3xl border border-slate-200 bg-white shadow-[0_10px_30px_-18px_rgba(15,23,42,0.28)]">
          <CardContent className="space-y-4 p-5 sm:p-6">
            <div className="text-lg font-semibold text-slate-900">Order Summary</div>

            {items.length === 0 ? (
              <p className="text-sm text-slate-500">No items in cart.</p>
            ) : (
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3"
                  >
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-slate-900">{item.name}</div>
                      <div className="text-xs text-slate-500">
                        {currency(item.price)} x {item.quantity}
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {currency(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="space-y-2 border-t border-slate-200 pt-3 text-sm">
              <div className="flex items-center justify-between text-slate-600">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>{currency(subtotal)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
