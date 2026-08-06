"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCustomer } from "@/context/CustomerContext";
export default function AuthForm({
  mode,
}: {
  mode: "login" | "register" | "forgot";
}) {
  const [done, setDone] = useState(false),
    router = useRouter(),
    { signIn } = useCustomer(),
    title =
      mode === "login"
        ? "Welcome back"
        : mode === "register"
          ? "Create your account"
          : "Reset your password";
  return (
    <main className="mx-auto max-w-md px-4 py-16">
      <h1 className="text-4xl font-semibold">{title}</h1>
      <p className="mt-2 text-stone-500">
        Access purchases, downloads, favorites and rewards.
      </p>
      {done ? (
        <p className="mt-8 rounded-xl bg-green-50 p-4">
          Password reset instructions sent.
        </p>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (mode === "forgot") {
              setDone(true);
              return;
            }
            signIn();
            const next = new URLSearchParams(window.location.search).get("next");
            router.push(next?.startsWith("/") ? next : "/account");
          }}
          className="mt-8 space-y-4"
        >
          {mode === "register" && (
            <div className="grid grid-cols-2 gap-3">
              <input
                required
                placeholder="First name"
                className="rounded-xl border p-3"
              />
              <input
                required
                placeholder="Last name"
                className="rounded-xl border p-3"
              />
            </div>
          )}
          <input
            required
            type="email"
            placeholder="Email"
            className="w-full rounded-xl border p-3"
          />
          {mode !== "forgot" && (
            <input
              required
              minLength={8}
              type="password"
              placeholder="Password"
              className="w-full rounded-xl border p-3"
            />
          )}
          <button className="w-full rounded-full bg-stone-900 p-3 text-white">
            {mode === "forgot"
              ? "Send reset link"
              : mode === "login"
                ? "Sign in"
                : "Create account"}
          </button>
        </form>
      )}
      <div className="mt-5 flex justify-between text-sm">
        <Link href="/login">Sign in</Link>
        <Link href="/register">Register</Link>
        <Link href="/forgot-password">Forgot password?</Link>
      </div>
    </main>
  );
}
