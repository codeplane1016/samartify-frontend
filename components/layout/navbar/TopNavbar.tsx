"use client";
import { ChevronDown, ShieldCheck, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { languages } from "./nav-data";

const flags: Record<string, string> = {
  English: "/flags/en.svg",
  French: "/flags/fr.svg",
  German: "/flags/de.svg",
  Italian: "/flags/it.svg",
  Spanish: "/flags/es.svg",
  Portuguese: "/flags/pt.svg",
  Russian: "/flags/ru.svg",
};

export default function TopNavbar() {
  const [language, setLanguage] = useState("English"),
    [open, setOpen] = useState(false);
  return (
    <div className="h-9 border-b border-border bg-surface-soft text-foreground-secondary">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 text-[11px] sm:text-xs">
        <p>
          Welcome back, <b className="text-primary-light">Maker!</b>
        </p>
        <div className="hidden items-center gap-5 lg:flex">
          <span className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-success" />
            Instant Digital Download
          </span>
          <i className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Premium Quality Designs
          </span>
          <i className="h-3 w-px bg-border" />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-blue" />
            Multiple Machine Formats
          </span>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            className="flex items-center gap-1.5 py-2 text-info"
          >
            <Image
              src={flags[language]}
              alt=""
              width={20}
              height={12}
              unoptimized
              className="h-3 w-5 rounded-[2px] object-cover shadow-sm"
            />
            {language}
            <ChevronDown className="h-3 w-3" />
          </button>
          {open && (
            <div className="absolute right-0 top-8 z-[70] w-40 rounded-xl border border-border bg-surface p-1.5 text-foreground shadow-xl">
              {languages.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setLanguage(item);
                    setOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left hover:bg-surface-soft hover:text-info"
                >
                  <Image
                    src={flags[item]}
                    alt=""
                    width={24}
                    height={14}
                    unoptimized
                    className="h-3.5 w-6 rounded-[2px] object-cover shadow-sm"
                  />
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
