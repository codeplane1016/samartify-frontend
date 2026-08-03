"use client";
import { useEffect, useState } from "react";
import BottomNavbar from "./BottomNavbar";
import MainNavbar from "./MainNavbar";
import MobileDrawer from "./MobileDrawer";
import SearchBox from "./SearchBox";
import TopNavbar from "./TopNavbar";
export default function Navbar() {
  const [menu, setMenu] = useState(false),
    [search, setSearch] = useState(false);
  useEffect(() => {
    const esc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setSearch(false);
      }
    };
    window.addEventListener("keydown", esc);
    document.body.style.overflow = menu || search ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [menu, search]);
  return (
    <>
      <TopNavbar />
      <header className="sticky top-0 z-50 border-b bg-white/95 shadow-sm backdrop-blur-xl">
        <MainNavbar
          onMenu={() => setMenu(true)}
          onSearch={() => setSearch(true)}
        />
        <BottomNavbar />
      </header>
      <MobileDrawer open={menu} onClose={() => setMenu(false)} />
      {search && (
        <div className="fixed inset-0 z-[90] bg-white p-4 md:hidden">
          <div className="mx-auto mt-12 max-w-xl">
            <SearchBox mobile onClose={() => setSearch(false)} />
          </div>
        </div>
      )}
    </>
  );
}
