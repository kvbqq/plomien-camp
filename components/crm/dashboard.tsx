"use client";

import Link from "next/link";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiFileText,
  FiUsers,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { camps, money, overdue, summarize } from "@/lib/crm/demo-data";
import { useDemo } from "./demo-provider";
import { PageHeading, StatCard } from "./shared";
import { ParticipantsTable } from "./participants";

export function Dashboard() {
  const { reservations } = useDemo();
  const summary = summarize(reservations);
  const needsAttention = reservations.filter(
    (reservation) =>
      overdue(reservation) > 0 || reservation.contract !== "Zatwierdzona",
  );
  return (
    <>
      <PageHeading
        title="Dobry dzień na organizację obozu"
        description="Sprawdź zapisy i zobacz, co wymaga Twojej uwagi."
        action={
          <Button asChild>
            <Link href="/admin/uczestnicy">
              Zobacz uczestników
              <FiArrowRight />
            </Link>
          </Button>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Wszyscy uczestnicy"
          value={reservations.length}
          note="Aktywne rezerwacje w dwóch turnusach"
          icon={<FiUsers size={19} />}
        />
        <StatCard
          label="W pełni opłacone"
          value={summary.settledCount}
          note="Obóz rozliczony w 100% lub z nadpłatą"
          icon={<FiCheckCircle size={19} />}
        />
        <StatCard
          label="Osoby z zaległością"
          value={summary.overdueCount}
          note={`Łącznie ${money(summary.overdue)}`}
          warning
          icon={<FiClock size={19} />}
        />
        <StatCard
          label="Brak poprawnej umowy"
          value={summary.missingCount}
          note="Oczekujące lub wymagające poprawy"
          icon={<FiFileText size={19} />}
        />
      </div>
      <div className="mb-8 grid gap-5 md:grid-cols-2">
        {camps.map((camp, index) => {
          const count = reservations.filter(
            (reservation) => reservation.camp === camp.id,
          ).length;
          return (
            <Card
              key={camp.id}
              className="overflow-hidden border-slate-200 shadow-none"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Obóz siatkarski · Niechorze
                    </p>
                    <h2 className="mt-2 text-lg font-semibold">{camp.name}</h2>
                    <p className="mt-1 text-xs text-slate-500">{camp.dates}</p>
                  </div>
                  <span
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${index ? "bg-blue-50 text-blue-700" : "bg-red-50 text-red-600"}`}
                  >
                    {camp.id}
                  </span>
                </div>
                <div className="mt-6 flex items-baseline justify-between">
                  <p>
                    <span className="text-3xl font-semibold tracking-tight">
                      {count}
                    </span>
                    <span className="ml-1 text-sm text-slate-400">
                      / {camp.capacity} miejsc
                    </span>
                  </p>
                  <span className="text-xs text-slate-500">
                    {camp.capacity - count} wolnych
                  </span>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full ${index ? "bg-[#072a68]" : "bg-[#ed3339]"}`}
                    style={{ width: `${(count / camp.capacity) * 100}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Card className="overflow-hidden border-slate-200 shadow-none">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-5">
          <div>
            <h2 className="text-base font-semibold">
              Wymagają uwagi{" "}
              <span className="ml-2 rounded-md bg-amber-50 px-2 py-1 text-xs text-amber-700">
                {needsAttention.length}
              </span>
            </h2>
            <p className="mt-1 text-xs text-slate-500">
              Umowy do sprawdzenia i nieuregulowane wpłaty.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/uczestnicy">
              Wszyscy uczestnicy
              <FiArrowRight />
            </Link>
          </Button>
        </div>
        <ParticipantsTable reservations={needsAttention.slice(0, 5)} compact />
        <div className="border-t bg-slate-50/40 px-5 py-3 text-xs text-slate-400">
          Pokazano {Math.min(5, needsAttention.length)} z{" "}
          {needsAttention.length} rezerwacji wymagających uwagi.
        </div>
      </Card>
    </>
  );
}
