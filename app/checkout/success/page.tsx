"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCustomer } from "@/context/CustomerContext";

export default function Success() {
  const { orders } = useCustomer();
  const [orderId, setOrderId] = useState("");
  useEffect(() => setOrderId(new URLSearchParams(window.location.search).get("order") ?? ""), []);
  const order = orders.find((item) => item.id === orderId);
  if (!order) return <main className="mx-auto max-w-2xl px-4 py-20 text-center"><h1 className="text-4xl font-semibold">No confirmed order found</h1><p className="mt-4 text-foreground-secondary">Opening this page directly does not create an order or unlock downloads.</p><Link href="/shop" className="mt-7 inline-block rounded-full bg-primary px-6 py-3 font-semibold text-white">Return to shop</Link></main>;
  return <main className="mx-auto max-w-2xl px-4 py-20 text-center"><div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-success-soft text-4xl text-success">✓</div><h1 className="mt-7 text-4xl font-semibold">Your designs are ready!</h1><p className="mt-4 text-foreground-secondary">Order #{order.id} is {order.status.toLowerCase()}. A receipt has been prepared for {order.email}, and your purchased designs are now in My Downloads.</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Link href={`/account/orders/${order.id}`} className="rounded-full border border-primary px-6 py-3 font-semibold text-primary">View order</Link><Link href="/account/downloads" className="rounded-full bg-primary px-6 py-3 font-semibold text-white">My downloads</Link></div></main>;
}
