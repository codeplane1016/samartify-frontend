"use client";
import Image from "next/image";
import Link from "next/link";
import { Heart, Menu, Search, ShoppingBag, UserRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import SearchBox from "./SearchBox";

export default function MainNavbar({
  onMenu,
  onSearch,
}: {
  onMenu: () => void;
  onSearch: () => void;
}) {
  const { cart } = useCart();
  const [account, setAccount] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const count = cart.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    setAccount(false);
  }, [pathname]);

  useEffect(() => {
    const closeAccountMenu = (event: MouseEvent) => {
      if (!accountMenuRef.current?.contains(event.target as Node)) {
        setAccount(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAccount(false);
    };

    document.addEventListener("mousedown", closeAccountMenu);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeAccountMenu);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return (
    <div className="bg-white">
      <div className="mx-auto flex h-[76px] max-w-7xl items-center gap-3 px-4 lg:h-[88px] lg:gap-8">
        <button
          onClick={onMenu}
          className="rounded-lg p-2 hover:bg-rose-50 md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu />
        </button>
        <Link
          href="/"
          className="mr-auto flex shrink-0 items-center md:mr-0"
          aria-label="SamArtify home"
        >
          <Image
            src="/images/samartify-logo.png?v=2"
            alt="SamArtify"
            width={826}
            height={302}
            unoptimized
            className="block h-auto w-[150px] object-contain sm:w-[180px] lg:w-[210px]"
          />
        </Link>
        <div className="hidden min-w-0 flex-1 md:block">
          <SearchBox />
        </div>
        <div className="ml-auto flex items-center gap-1 sm:gap-3">
          <button
            onClick={onSearch}
            className="nav-action md:hidden"
            aria-label="Open search"
          >
            <Search />
          </button>
          <div ref={accountMenuRef} className="relative hidden md:block">
            <button
              onClick={() => setAccount(!account)}
              aria-expanded={account}
              className="nav-action group"
            >
              <UserRound />
              <span>Account</span>
            </button>
            {account && (
              <div className="absolute right-0 top-14 z-50 w-52 rounded-2xl border bg-white p-2 shadow-xl">
                {[
                  ["/account", "My Account"],
                  ["/account/orders", "My Orders"],
                  ["/account/downloads", "My Downloads"],
                  ["/account/rewards", "Rewards"],
                  ["/account/profile", "Profile"],
                ].map(([href, label]) => (
                  <Link
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-rose-50"
                    href={href}
                    key={href}
                  >
                    {label}
                  </Link>
                ))}
                <hr className="my-1" />
                <Link
                  href="/login"
                  className="block rounded-lg px-3 py-2 text-sm text-rose-700 hover:bg-rose-50"
                >
                  Sign out
                </Link>
              </div>
            )}
          </div>
          <Link href="/wishlist" className="nav-action relative">
            <Heart />
            <span className="hidden md:block">Wishlist</span>
          </Link>
          <Link href="/cart" className="nav-action relative">
            <ShoppingBag />
            <span className="hidden md:block">Cart</span>
            {count > 0 && (
              <b className="absolute right-0 top-0 grid h-5 min-w-5 place-items-center rounded-full bg-rose-700 px-1 text-[10px] text-white">
                {count}
              </b>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
