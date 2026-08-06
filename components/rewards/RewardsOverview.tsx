"use client";

import Link from "next/link";
import { Gift, MessageSquareText, ShoppingBag, UserRoundPlus } from "lucide-react";
import { useCustomer } from "@/context/CustomerContext";

const ways = [
  [ShoppingBag, "Make a purchase", "Earn 10 points per $1"],
  [MessageSquareText, "Share a review", "Earn 50 points"],
  [UserRoundPlus, "Refer a friend", "Earn 150 points"],
] as const;

export default function RewardsOverview() {
  const { isAuthenticated, points } = useCustomer();
  return (
    <section className="border-b border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-sm font-semibold text-accent-hover"><Gift className="h-4 w-4" /> SamArtify Rewards</span>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold">Exclusive designs that reward your creativity</h1>
            <p className="mt-4 max-w-2xl text-lg text-foreground-secondary">Earn points from purchases and community activities, then redeem them for designs that are not part of the free catalog.</p>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent-soft p-6">
            <p className="text-sm text-foreground-secondary">Your available balance</p>
            <p className="mt-1 text-4xl font-semibold text-accent-hover">{isAuthenticated ? points : "—"} points</p>
            {!isAuthenticated && <Link href="/login?next=%2Frewards" className="mt-4 inline-block rounded-full bg-primary px-5 py-2.5 font-semibold text-white">Sign in to see balance</Link>}
          </div>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {ways.map(([Icon, title, detail]) => <div key={title} className="rounded-2xl border border-border bg-background p-5"><Icon className="h-5 w-5 text-accent-hover" /><h2 className="mt-3 font-semibold">{title}</h2><p className="mt-1 text-sm text-foreground-secondary">{detail}</p></div>)}
        </div>
      </div>
    </section>
  );
}
