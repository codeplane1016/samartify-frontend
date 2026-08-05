"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { useCustomer } from "@/context/CustomerContext";
import { getStableProductImage } from "@/lib/product-images";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { completeOrder } = useCustomer();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Stripe");
  const digitalItems = cart.map((item) => ({ ...item, quantity: 1 }));
  const subtotal = digitalItems.reduce((sum, item) => sum + item.price, 0);
  const tax = Number((subtotal * 0.08).toFixed(2));
  const total = subtotal + tax;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 lg:py-16">
      <h1 className="text-4xl font-semibold">Secure digital checkout</h1>
      <p className="mt-2 text-foreground-secondary">No shipping address needed. Your completed purchases will appear in My Downloads.</p>
      <div className="mt-8 grid gap-8 lg:grid-cols-5">
        <form onSubmit={(event) => {
          event.preventDefault();
          setBusy(true);
          const data = new FormData(event.currentTarget);
          window.setTimeout(() => {
            const order = completeOrder(
              digitalItems,
              String(data.get("email")),
              paymentMethod,
            );
            clearCart();
            router.push(`/checkout/success?order=${order.id}`);
          }, 700);
        }} className="space-y-5 lg:col-span-3">
          <section className="rounded-2xl border border-border bg-white p-6">
            <h2 className="text-xl font-semibold">Account and receipt</h2>
            <label className="mt-4 block">Email address<input required name="email" type="email" autoComplete="email" className="mt-1 w-full rounded-xl border border-border p-3" /></label>
            <label className="mt-4 block">Country or region <span className="text-sm text-foreground-secondary">(for digital tax)</span><select required name="country" className="mt-1 w-full rounded-xl border border-border bg-white p-3"><option value="">Select country or region</option><option>United States</option><option>Canada</option><option>United Kingdom</option><option>European Union</option><option>Other</option></select></label>
          </section>
          <fieldset className="rounded-2xl border border-border bg-white p-6">
            <legend className="px-2 font-semibold">Payment method</legend>
            <div className="grid grid-cols-2 gap-3">
              {["Card", "PayPal", "Stripe", "Crypto"].map((method) => <label className={`rounded-xl border p-3 ${paymentMethod === method ? "border-primary bg-primary-soft" : "border-border"}`} key={method}><input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={() => setPaymentMethod(method)} /> {method}</label>)}
            </div>
            {paymentMethod === "Stripe" && <div className="mt-4 grid gap-3 sm:grid-cols-2"><p className="sm:col-span-2 rounded-xl bg-background p-3 text-sm text-foreground-secondary">Secure card payment powered by Stripe</p><label className="sm:col-span-2">Card number<input required inputMode="numeric" defaultValue="4242 4242 4242 4242" className="mt-1 w-full rounded-xl border border-border p-3" /></label><label>Expiry<input required defaultValue="12/28" className="mt-1 w-full rounded-xl border border-border p-3" /></label><label>CVC<input required inputMode="numeric" defaultValue="123" className="mt-1 w-full rounded-xl border border-border p-3" /></label></div>}
          </fieldset>
          <label className="flex items-start gap-2 text-sm"><input required type="checkbox" className="mt-1" /><span>I agree to the terms and the licenses selected for these digital products.</span></label>
          <button disabled={!cart.length || busy} className="w-full rounded-full bg-cta p-4 font-semibold text-white hover:bg-cta-hover disabled:opacity-40">{busy ? "Payment processing…" : `Pay and place order · $${total.toFixed(2)}`}</button>
          {!cart.length && <p className="text-center text-sm text-foreground-secondary">Your cart is empty. <Link href="/shop" className="font-semibold text-primary">Return to shop</Link></p>}
        </form>
        <aside className="h-fit rounded-2xl border border-border bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold">Order summary</h2>
          {digitalItems.map((item) => <div className="flex items-center gap-3 border-b border-border py-4" key={item.id}><div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-border bg-white"><Image src={getStableProductImage(item.id)} alt={item.name} fill sizes="56px" className="object-contain p-1" /></div><span className="min-w-0 flex-1"><span className="block truncate font-medium">{item.name}</span><small className="block text-foreground-secondary">{item.hoopSize || "All sizes"} · {item.license || "Personal"}</small></span><b>${item.price.toFixed(2)}</b></div>)}
          <dl className="mt-5 space-y-2 text-sm"><div className="flex justify-between"><dt>Subtotal</dt><dd>${subtotal.toFixed(2)}</dd></div><div className="flex justify-between"><dt>Discount</dt><dd>−$0.00</dd></div><div className="flex justify-between"><dt>Estimated digital tax</dt><dd>${tax.toFixed(2)}</dd></div><div className="flex justify-between border-t border-border pt-3 text-xl"><dt className="font-semibold">Total</dt><dd className="font-semibold">${total.toFixed(2)}</dd></div></dl>
        </aside>
      </div>
    </main>
  );
}
