"use client";

import Image from "next/image";
import Link from "next/link";
import { useCustomer } from "@/context/CustomerContext";
import { products } from "@/lib/catalog";

export function Dashboard() {
  const { points, ownedProductIds } = useCustomer();
  return <><h1 className="text-4xl font-semibold">Welcome back, Maker</h1><div className="mt-8 grid gap-4 sm:grid-cols-4">{[["Library", String(ownedProductIds.length)], ["Orders", "3"], ["Wishlist", "8"], ["Points", String(points)]].map(([label, value]) => <div className="rounded-2xl border border-border/70 bg-white p-6 shadow-sm" key={label}><p className="text-foreground-secondary">{label}</p><b className="text-3xl">{value}</b></div>)}</div><h2 className="mt-10 text-2xl font-semibold">Your design library</h2><DownloadList /></>;
}

export function DownloadList() {
  const { ownedProductIds } = useCustomer();
  const ownedProducts = products.filter((product) => ownedProductIds.includes(product.id));
  if (!ownedProducts.length) return <div className="mt-5 rounded-2xl border border-border bg-white p-10 text-center"><h2 className="text-xl font-semibold">Your library is ready for its first design</h2><p className="mt-2 text-foreground-secondary">Add a free design or purchase a premium design to see it here.</p><Link href="/free-designs" className="mt-5 inline-block rounded-full bg-success px-5 py-2.5 font-semibold text-white">Browse free designs</Link></div>;
  return <div className="mt-5 space-y-3">{ownedProducts.map((product) => <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-white p-4 hover:bg-secondary" key={product.id}><div className="flex min-w-0 items-center gap-4"><div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-background"><Image src={product.image} alt="" fill className="object-contain" /></div><span><b>{product.name}</b><small className="block text-foreground-secondary">{product.productType === "reward" ? "Reward redemption" : product.productType === "free" ? "Free library design" : "Personal license"} · {product.formats.join(", ")}</small></span></div><button type="button" className="rounded-full bg-primary px-4 py-2 text-white hover:bg-primary-hover">Download files</button></div>)}</div>;
}

export function RewardsAccount() {
  const { points, rewardTransactions } = useCustomer();
  return <><p className="font-semibold text-accent-hover">SamArtify Rewards</p><h1 className="mt-2 text-4xl font-semibold">You have {points} points</h1><p className="mt-3 text-foreground-secondary">Use points for exclusive designs. Once redeemed, a design stays permanently in My Downloads.</p><div className="mt-8 grid gap-4 sm:grid-cols-3">{[["Purchases", "10 points per $1"], ["Reviews", "50 points each"], ["Referrals", "150 points each"]].map(([title, detail]) => <div key={title} className="rounded-2xl border border-border bg-white p-5"><h2 className="font-semibold">{title}</h2><p className="mt-1 text-sm text-foreground-secondary">{detail}</p></div>)}</div><Link href="/rewards" className="mt-7 inline-block rounded-full bg-accent px-5 py-3 font-semibold text-foreground hover:bg-accent-hover hover:text-white">Browse reward designs</Link><h2 className="mt-10 text-2xl font-semibold">Reward history</h2>{rewardTransactions.length ? <div className="mt-4 space-y-3">{rewardTransactions.map((transaction) => { const product = products.find((item) => item.id === transaction.productId); return <div key={transaction.id} className="flex flex-wrap justify-between gap-3 rounded-2xl border border-border bg-white p-5"><div><h3 className="font-semibold">{product?.name ?? "Reward design"}</h3><p className="text-sm text-foreground-secondary">{new Date(transaction.createdAt).toLocaleDateString()} · {transaction.status}</p></div><b className="text-accent-hover">−{transaction.points} points</b></div>; })}</div> : <p className="mt-3 text-foreground-secondary">Your redeemed designs will appear here.</p>}</>;
}

export function Orders() {
  const { orders } = useCustomer();
  if (!orders.length) return <div className="mt-5 rounded-2xl border border-border bg-white p-10 text-center"><h2 className="text-xl font-semibold">No paid orders yet</h2><p className="mt-2 text-foreground-secondary">Free library additions and reward redemptions are tracked separately.</p><Link href="/shop" className="mt-5 inline-block rounded-full bg-primary px-5 py-2.5 font-semibold text-white">Browse paid designs</Link></div>;
  return <div className="mt-5 space-y-4">{orders.map((order) => <article key={order.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-lg font-semibold">Order #{order.id}</h2><p className="mt-1 text-sm text-foreground-secondary">{new Date(order.createdAt).toLocaleDateString("en-US", { dateStyle: "medium" })} · {order.items.length} {order.items.length === 1 ? "Design" : "Designs"}</p></div><div className="text-right"><b className="block text-lg">${order.total.toFixed(2)}</b><span className="text-sm font-semibold text-success">{order.status}</span></div></div><Link href={`/account/orders/${order.id}`} className="mt-5 inline-block rounded-full border border-primary px-4 py-2 text-sm font-semibold text-primary">View order</Link></article>)}</div>;
}
