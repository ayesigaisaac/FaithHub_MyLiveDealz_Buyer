import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type CartItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

type AddToCartInput = {
  productId: string;
  name: string;
  price: number;
  quantity?: number;
};

type CartContextValue = {
  items: CartItem[];
  addToCart: (input: AddToCartInput) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((input: AddToCartInput) => {
    const qty = Number.isFinite(input.quantity) ? Math.max(1, Math.trunc(input.quantity as number)) : 1;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.productId === input.productId);

      if (existingIndex === -1) {
        return [
          ...prev,
          {
            productId: input.productId,
            name: input.name,
            price: input.price,
            quantity: qty,
          },
        ];
      }

      return prev.map((item, index) =>
        index === existingIndex ? { ...item, quantity: item.quantity + qty } : item,
      );
    });
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addToCart,
    }),
    [addToCart, items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider.");
  return context;
}

