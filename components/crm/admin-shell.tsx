"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiArrowUpRight,
  FiGrid,
  FiUsers,
  FiCreditCard,
  FiMail,
  FiInfo,
} from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { DemoProvider } from "./demo-provider";

const links = [
  { href: "/admin", label: "Dashboard", icon: FiGrid },
  { href: "/admin/uczestnicy", label: "Uczestnicy", icon: FiUsers },
  { href: "/admin/finanse", label: "Finanse", icon: FiCreditCard },
  { href: "/admin/maile", label: "Maile", icon: FiMail },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DemoProvider>
      <div className="crm-shell min-h-screen bg-[#f6f7f9] text-slate-900">
        <a
          href="#crm-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3"
        >
          Przejdź do treści
        </a>
        <aside className="border-b border-slate-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:z-20 lg:flex lg:w-60 lg:flex-col lg:border-b-0 lg:border-r">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-6 py-7"
            aria-label="Płomień Camp — panel administratora"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ed3339] text-white">
              <FaFire size={21} />
            </span>
            <span>
              <span className="block text-lg font-extrabold tracking-tight">
                PŁOMIEŃ CAMP
              </span>
              <span className="text-xs text-slate-500">Panel organizatora</span>
            </span>
          </Link>
          <p className="hidden px-7 pb-3 pt-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400 lg:block">
            Zarządzanie obozem
          </p>
          <nav
            aria-label="Panel administratora"
            className="grid grid-cols-4 gap-1 px-3 pb-4 lg:flex lg:flex-col lg:px-4"
          >
            {links.map(({ href, label, icon: Icon }) => {
              const active =
                href === "/admin"
                  ? pathname === href
                  : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-lg px-2 py-3 text-xs font-medium transition-colors lg:flex-row lg:gap-3 lg:px-3 lg:text-sm",
                    active
                      ? "bg-red-50 text-red-600"
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  <Icon size={18} aria-hidden="true" />
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-auto hidden p-5 lg:block">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-semibold text-slate-600">Sezon 2027</p>
              <p className="mt-1 text-xs leading-5 text-slate-400">
                Dwa turnusy.
                <br />
                Jedno miejsce do zarządzania.
              </p>
            </div>
            <Link
              href="/"
              className="mt-4 flex items-center justify-between px-2 py-2 text-xs text-slate-500 hover:text-slate-900"
            >
              Otwórz stronę obozu
              <FiArrowUpRight aria-hidden="true" />
            </Link>
          </div>
        </aside>
        <div className="lg:pl-60">
          <header className="flex min-h-16 flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:px-8">
            <p className="text-sm text-slate-500">
              Panel /{" "}
              <span className="font-medium text-slate-900">
                {links.find((link) => link.href === pathname)?.label ??
                  "Rezerwacja"}
              </span>
            </p>
            <div className="flex items-center gap-3">
              <span className="rounded-md border border-slate-200 px-2.5 py-1 text-xs text-slate-600">
                Sezon 2027
              </span>
              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                Wersja demo
              </span>
            </div>
          </header>
          <main
            id="crm-content"
            className="mx-auto max-w-[1440px] px-4 py-6 sm:px-8 sm:py-8"
          >
            <div className="mb-7 flex items-start gap-2 rounded-lg border border-amber-200/70 bg-amber-50/60 px-4 py-3 text-xs leading-5 text-amber-900">
              <FiInfo className="mt-0.5 shrink-0" size={15} />
              <p>
                Przykładowe dane · stan na 15.05.2027. Panel jest dostępny bez
                logowania. Zmiany działają tylko do odświeżenia strony;
                wiadomości nie są wysyłane.
              </p>
            </div>
            {children}
          </main>
          <footer className="px-8 pb-6 text-xs text-slate-400">
            Płomień Camp · Panel organizatora
          </footer>
        </div>
      </div>
    </DemoProvider>
  );
}
