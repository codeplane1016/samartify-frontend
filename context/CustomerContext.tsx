"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/product";

type LibraryResult = "added" | "owned";
type RewardResult = "redeemed" | "owned" | "insufficient";

export type OrderStatus = "Pending" | "Payment Processing" | "Completed" | "Payment Failed" | "Cancelled" | "Refunded" | "Partially Refunded";
export interface CustomerOrder {
  id: string;
  createdAt: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  email: string;
  paymentMethod: string;
  paymentReference: string;
}
export interface RewardTransaction {
  id: string;
  productId: number;
  points: number;
  createdAt: string;
  status: "Redeemed";
}

interface CustomerContextValue {
  isAuthenticated: boolean;
  points: number;
  ownedProductIds: number[];
  orders: CustomerOrder[];
  rewardTransactions: RewardTransaction[];
  signIn: () => void;
  ownsProduct: (productId: number) => boolean;
  addFreeDesign: (productId: number) => LibraryResult;
  redeemReward: (productId: number, cost: number) => RewardResult;
  completeOrder: (items: CartItem[], email: string, paymentMethod: string) => CustomerOrder;
}

const STORAGE_KEY = "samartify-customer";
const CustomerContext = createContext<CustomerContextValue | undefined>(undefined);

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [points, setPoints] = useState(420);
  const [ownedProductIds, setOwnedProductIds] = useState<number[]>([2, 3]);
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [rewardTransactions, setRewardTransactions] = useState<RewardTransaction[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const customer = JSON.parse(saved) as { isAuthenticated?: boolean; points?: number; ownedProductIds?: number[]; orders?: CustomerOrder[]; rewardTransactions?: RewardTransaction[] };
        setIsAuthenticated(Boolean(customer.isAuthenticated));
        setPoints(customer.points ?? 420);
        setOwnedProductIds(customer.ownedProductIds ?? [2, 3]);
        setOrders(customer.orders ?? []);
        setRewardTransactions(customer.rewardTransactions ?? []);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem(STORAGE_KEY, JSON.stringify({ isAuthenticated, points, ownedProductIds, orders, rewardTransactions }));
  }, [isAuthenticated, orders, ownedProductIds, points, ready, rewardTransactions]);

  const signIn = useCallback(() => setIsAuthenticated(true), []);
  const ownsProduct = useCallback((productId: number) => ownedProductIds.includes(productId), [ownedProductIds]);
  const addFreeDesign = useCallback((productId: number): LibraryResult => {
    if (ownedProductIds.includes(productId)) return "owned";
    setOwnedProductIds((current) => [...current, productId]);
    return "added";
  }, [ownedProductIds]);
  const redeemReward = useCallback((productId: number, cost: number): RewardResult => {
    if (ownedProductIds.includes(productId)) return "owned";
    if (points < cost) return "insufficient";
    setPoints((current) => current - cost);
    setOwnedProductIds((current) => [...current, productId]);
    setRewardTransactions((current) => [{ id: `RW-${Date.now()}`, productId, points: cost, createdAt: new Date().toISOString(), status: "Redeemed" }, ...current]);
    return "redeemed";
  }, [ownedProductIds, points]);

  const completeOrder = useCallback((items: CartItem[], email: string, paymentMethod: string) => {
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = 0;
    const tax = Number((subtotal * 0.08).toFixed(2));
    const order: CustomerOrder = {
      id: `SA-${String(Date.now()).slice(-6)}`,
      createdAt: new Date().toISOString(),
      status: "Completed",
      items,
      subtotal,
      discount,
      tax,
      total: subtotal - discount + tax,
      email,
      paymentMethod,
      paymentReference: paymentMethod === "Stripe" ? "Stripe •••• 4242" : `${paymentMethod} · Demo payment`,
    };
    setOrders((current) => [order, ...current]);
    setOwnedProductIds((current) => Array.from(new Set([...current, ...items.map((item) => item.id)])));
    return order;
  }, []);

  const value = useMemo(() => ({ isAuthenticated, points, ownedProductIds, orders, rewardTransactions, signIn, ownsProduct, addFreeDesign, redeemReward, completeOrder }), [addFreeDesign, completeOrder, isAuthenticated, orders, ownedProductIds, ownsProduct, points, redeemReward, rewardTransactions, signIn]);
  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  const context = useContext(CustomerContext);
  if (!context) throw new Error("useCustomer must be used within CustomerProvider");
  return context;
}
