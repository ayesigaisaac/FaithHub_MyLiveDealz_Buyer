import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { CartItem } from "@/cart/CartContext";

export type OrderStatus = "pending";

export type OrderUserInfo = {
  name: string;
  email: string;
  address: string;
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  user: OrderUserInfo;
  status: OrderStatus;
  createdAt: string;
};

type CreateOrderInput = {
  items: CartItem[];
  total: number;
  user: OrderUserInfo;
};

type OrderContextValue = {
  orders: Order[];
  createOrder: (input: CreateOrderInput) => Order;
};

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = useCallback((input: CreateOrderInput) => {
    const order: Order = {
      id: `order-${Date.now()}`,
      items: input.items.map((item) => ({ ...item })),
      total: input.total,
      user: {
        name: input.user.name.trim(),
        email: input.user.email.trim(),
        address: input.user.address.trim(),
      },
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [order, ...prev]);
    return order;
  }, []);

  const value = useMemo<OrderContextValue>(
    () => ({
      orders,
      createOrder,
    }),
    [orders, createOrder],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrders must be used inside OrderProvider.");
  return context;
}

