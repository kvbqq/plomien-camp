"use client";

import { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { money, paymentStage, summarize } from "@/lib/crm/demo-data";
import { useDemo } from "./demo-provider";
import { exportReservations, ParticipantsTable } from "./participants";
import { PageHeading, StatCard } from "./shared";

export function FinancesPage() {
  const { reservations } = useDemo();
  const [camp, setCamp] = useState("all");
  const filtered = reservations.filter(
    (reservation) => camp === "all" || reservation.camp === camp,
  );
  const summary = summarize(filtered);
  const stages = ["Poniżej 1/3", "Minimum 1/3", "Minimum 2/3", "Opłacone"];
  return (
    <>
      <PageHeading
        title="Finanse"
        description="Wpłaty i należności według wspólnych terminów turnusu."
        action={
          <Button
            variant="outline"
            onClick={() => exportReservations(filtered)}
          >
            <FiDownload />
            Eksport CSV
          </Button>
        }
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <select
          aria-label="Turnus w finansach"
          value={camp}
          onChange={(event) => setCamp(event.target.value)}
        >
          <option value="all">Wszystkie turnusy</option>
          <option value="I">Turnus I</option>
          <option value="II">Turnus II</option>
        </select>
        <p className="text-xs text-slate-500">
          Stan demonstracyjny na 15.05.2027
        </p>
      </div>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Wartość rezerwacji"
          value={money(summary.total)}
          note={`${filtered.length} aktywnych rezerwacji`}
        />
        <StatCard
          label="Suma wpłat"
          value={money(summary.paid)}
          note={`Nadpłaty: ${money(summary.overpayment)}`}
        />
        <StatCard
          label="Pozostało do zapłaty"
          value={money(summary.remaining)}
          note="Do pełnej ceny wszystkich rezerwacji"
        />
        <StatCard
          label="Zaległości na dziś"
          value={money(summary.overdue)}
          note={`${summary.overdueCount} osób poniżej wymaganego progu`}
          warning
        />
      </div>
      <div className="mb-6 grid gap-5 xl:grid-cols-[1.2fr_1fr]">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="p-5">
            <h2 className="mb-5 font-semibold">Etapy płatności</h2>
            <div className="space-y-4">
              {stages.map((stage, index) => {
                const count = filtered.filter(
                  (reservation) => paymentStage(reservation) === stage,
                ).length;
                return (
                  <div key={stage} className="flex items-center gap-4">
                    <span className="w-24 shrink-0 text-xs text-slate-600">
                      {stage}
                    </span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={
                          index === 3
                            ? "h-full rounded-full bg-emerald-500"
                            : "h-full rounded-full bg-[#072a68]"
                        }
                        style={{
                          width: `${filtered.length ? (count / filtered.length) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="w-7 text-right text-sm font-semibold">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-5 text-xs text-slate-400">
              Każda osoba jest liczona w jednym etapie. Zaległości zależą
              dodatkowo od terminu.
            </p>
          </CardContent>
        </Card>
        <Card className="border-slate-200 shadow-none">
          <CardContent className="p-5">
            <h2 className="mb-5 font-semibold">Przykładowy harmonogram</h2>
            <div className="space-y-4">
              {[
                ["1 marca", "1/3 ceny", "1 000 zł"],
                ["1 maja", "2/3 ceny", "2 000 zł"],
                ["1 czerwca", "100% ceny", "3 000 zł"],
              ].map(([date, label, amount], index) => (
                <div key={date} className="flex items-center gap-3 text-sm">
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${index === 1 ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-500"}`}
                  >
                    {index + 1}
                  </span>
                  <span className="flex-1">
                    {date}
                    <span className="ml-2 text-xs text-slate-400">{label}</span>
                  </span>
                  <span className="font-medium">{amount}</span>
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs text-slate-400">
              Kwoty łączne dla ceny 3 000 zł. Zaliczka wlicza się do wpłat.
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="overflow-hidden border-slate-200 shadow-none">
        <div className="border-b px-5 py-5">
          <h2 className="font-semibold">Rozliczenia uczestników</h2>
          <p className="mt-1 text-xs text-slate-500">
            Otwórz rezerwację, aby zobaczyć historię lub dodać wpłatę
            demonstracyjną.
          </p>
        </div>
        <ParticipantsTable reservations={filtered} />
      </Card>
    </>
  );
}
