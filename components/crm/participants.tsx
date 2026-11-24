"use client";

import { useState, type FormEvent } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiArrowRight,
  FiDownload,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DEMO_DATE_LABEL,
  money,
  overdue,
  overpayment,
  paid,
  paidPercent,
  remaining,
  type ContractStatus,
  type Reservation,
} from "@/lib/crm/demo-data";
import { useDemo } from "./demo-provider";
import { ContractBadge, PageHeading, PaymentBadge } from "./shared";

export function exportReservations(reservations: Reservation[]) {
  const rows = [
    [
      "Numer",
      "Uczestnik",
      "Turnus",
      "Umowa",
      "Cena PLN",
      "Wpłaty PLN",
      "Pozostało PLN",
      "Zaległość PLN",
    ],
    ...reservations.map((reservation) => [
      reservation.id,
      reservation.name,
      reservation.camp,
      reservation.contract,
      (reservation.price / 100).toFixed(2),
      (paid(reservation) / 100).toFixed(2),
      (remaining(reservation) / 100).toFixed(2),
      (overdue(reservation) / 100).toFixed(2),
    ]),
  ];
  const content =
    "\uFEFF" +
    rows
      .map((row) =>
        row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(";"),
      )
      .join("\r\n");
  const url = URL.createObjectURL(
    new Blob([content], { type: "text/csv;charset=utf-8;" }),
  );
  const link = document.createElement("a");
  link.href = url;
  link.download = "plomien-uczestnicy-demo.csv";
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function ParticipantsTable({
  reservations,
  compact = false,
}: {
  reservations: Reservation[];
  compact?: boolean;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { reservations: allReservations } = useDemo();
  const selected = allReservations.find(
    (reservation) => reservation.id === selectedId,
  );
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/80 hover:bg-slate-50/80">
            <TableHead className="pl-5">Uczestnik</TableHead>
            <TableHead>Turnus</TableHead>
            <TableHead>Umowa</TableHead>
            <TableHead>Wpłaty</TableHead>
            {!compact && <TableHead>Status płatności</TableHead>}
            <TableHead>
              <span className="sr-only">Szczegóły</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {reservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="py-4 pl-5">
                <button
                  onClick={() => setSelectedId(reservation.id)}
                  className="text-left hover:text-red-600"
                >
                  <span className="block whitespace-nowrap text-sm font-semibold">
                    {reservation.name}
                  </span>
                  <span className="mt-1 block text-[11px] font-normal text-slate-400">
                    {reservation.id}
                  </span>
                </button>
              </TableCell>
              <TableCell className="whitespace-nowrap text-slate-600">
                Turnus {reservation.camp}
              </TableCell>
              <TableCell>
                <ContractBadge status={reservation.contract} />
              </TableCell>
              <TableCell>
                <span className="block whitespace-nowrap text-sm font-medium tabular-nums">
                  {money(paid(reservation))}
                </span>
                <div className="mt-2 h-1 w-24 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={
                      remaining(reservation) === 0
                        ? "h-full bg-emerald-500"
                        : "h-full bg-slate-400"
                    }
                    style={{
                      width: `${Math.min(100, paidPercent(reservation))}%`,
                    }}
                  />
                </div>
                <span className="sr-only">
                  {paidPercent(reservation)}% ceny
                </span>
              </TableCell>
              {!compact && (
                <TableCell>
                  <PaymentBadge reservation={reservation} />
                </TableCell>
              )}
              <TableCell className="pr-4 text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Szczegóły: ${reservation.name}`}
                  onClick={() => setSelectedId(reservation.id)}
                >
                  <FiArrowRight />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {reservations.length === 0 && (
        <div className="px-6 py-14 text-center">
          <FiUsers className="mx-auto mb-3 text-slate-300" size={26} />
          <p className="font-medium">Brak uczestników spełniających kryteria</p>
          <p className="mt-1 text-sm text-slate-500">
            Zmień wyszukiwanie lub wyczyść filtry.
          </p>
        </div>
      )}
      <Dialog
        open={Boolean(selected)}
        onOpenChange={(open) => {
          if (!open) setSelectedId(null);
        }}
      >
        {selected && (
          <ReservationDetails key={selected.id} reservation={selected} />
        )}
      </Dialog>
    </>
  );
}

function ReservationDetails({ reservation }: { reservation: Reservation }) {
  const { updateContract, addPayment } = useDemo();
  const [amount, setAmount] = useState("");
  const [notice, setNotice] = useState("");

  function submitPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalized = amount.trim().replace(",", ".");
    if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
      setNotice("Podaj kwotę z maksymalnie dwoma miejscami po przecinku.");
      return;
    }
    const cents = Math.round(Number(normalized) * 100);
    if (!Number.isSafeInteger(cents) || cents <= 0 || cents > 10000000) {
      setNotice("Podaj kwotę od 0,01 do 100 000 zł.");
      return;
    }
    addPayment(reservation.id, cents);
    setAmount("");
    setNotice(
      "Dodano przykładową wpłatę. Zmiana zniknie po odświeżeniu strony.",
    );
  }

  return (
    <DialogContent className="crm-dialog max-h-[90dvh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{reservation.name}</DialogTitle>
        <DialogDescription>
          {reservation.id} · Turnus {reservation.camp} · dane demonstracyjne
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 rounded-lg bg-slate-50 p-4 sm:grid-cols-2">
        <div>
          <p className="text-xs text-slate-500">Data urodzenia</p>
          <p className="mt-1 text-sm">
            {reservation.birthDate.split("-").reverse().join(".")}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-500">Rodzic / opiekun</p>
          <p className="mt-1 text-sm">{reservation.parent}</p>
          <p className="text-sm text-slate-500">{reservation.email}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b pb-4">
        <div>
          <p className="mb-2 text-sm font-semibold">Umowa</p>
          <ContractBadge status={reservation.contract} />
        </div>
        <div>
          <label htmlFor="contract-status" className="sr-only">
            Status umowy
          </label>
          <select
            id="contract-status"
            className="rounded-md border bg-white p-2 text-sm"
            value={reservation.contract}
            onChange={(event) => {
              updateContract(
                reservation.id,
                event.target.value as ContractStatus,
              );
              setNotice("Zmieniono status umowy w demonstracji.");
            }}
          >
            {["Oczekuje", "Otrzymana", "Zatwierdzona", "Do poprawy"].map(
              (status) => (
                <option key={status}>{status}</option>
              ),
            )}
          </select>
        </div>
        <p className="w-full text-xs text-slate-500">
          W tej wersji nie ma załączonych dokumentów. Zmiana statusu służy do
          sprawdzenia interfejsu.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          ["Cena obozu", reservation.price],
          ["Wpłacono", paid(reservation)],
          ["Pozostało", remaining(reservation)],
          ["Zaległość", overdue(reservation)],
        ].map(([label, value]) => (
          <div key={label}>
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-1 text-sm font-semibold tabular-nums">
              {money(Number(value))}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">
        Wymagane na {DEMO_DATE_LABEL}: {money(reservation.required)} łącznie.
        {overpayment(reservation) > 0 &&
          ` Nadpłata: ${money(overpayment(reservation))}.`}
      </p>
      <div>
        <h3 className="mb-3 text-sm font-semibold">Historia wpłat</h3>
        {reservation.payments.length ? (
          <ul className="divide-y">
            {reservation.payments.map((payment) => (
              <li
                key={payment.id}
                className="flex items-center justify-between gap-3 py-2 text-sm"
              >
                <span>
                  {payment.source}
                  <span className="block text-xs text-slate-400">
                    {payment.date.split("-").reverse().join(".")}
                  </span>
                </span>
                <span className="whitespace-nowrap font-medium">
                  {money(payment.amount)}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-500">Brak wpłat.</p>
        )}
      </div>
      <form
        onSubmit={submitPayment}
        className="rounded-lg border bg-slate-50 p-4"
      >
        <label
          htmlFor="payment-amount"
          className="mb-2 block text-sm font-medium"
        >
          Dodaj wpłatę demonstracyjną (PLN)
        </label>
        <div className="flex flex-wrap gap-2">
          <Input
            id="payment-amount"
            inputMode="decimal"
            required
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
            placeholder="np. 500,00"
            className="min-w-0 flex-1 bg-white"
          />
          <Button type="submit">Dodaj wpłatę demo</Button>
        </div>
      </form>
      <p role="status" className="min-h-5 text-xs text-slate-600">
        {notice}
      </p>
    </DialogContent>
  );
}

export function ParticipantsPage() {
  const { reservations } = useDemo();
  const [query, setQuery] = useState("");
  const [camp, setCamp] = useState("all");
  const [contract, setContract] = useState("all");
  const [payment, setPayment] = useState("all");
  const [ascending, setAscending] = useState(true);
  const filtered = reservations
    .filter(
      (reservation) =>
        `${reservation.name} ${reservation.id} ${reservation.parent} ${reservation.email}`
          .toLocaleLowerCase("pl")
          .includes(query.toLocaleLowerCase("pl")) &&
        (camp === "all" || reservation.camp === camp) &&
        (contract === "all" || reservation.contract === contract) &&
        (payment === "all" ||
          (payment === "paid"
            ? remaining(reservation) === 0
            : overdue(reservation) > 0)),
    )
    .sort((a, b) => a.name.localeCompare(b.name, "pl") * (ascending ? 1 : -1));
  const hasFilters =
    query || camp !== "all" || contract !== "all" || payment !== "all";
  return (
    <>
      <PageHeading
        title="Uczestnicy"
        description="Rezerwacje, umowy i płatności — wszystko w jednym miejscu."
        action={
          <Button
            variant="outline"
            onClick={() => exportReservations(filtered)}
            disabled={!filtered.length}
          >
            <FiDownload />
            Eksport CSV
          </Button>
        }
      />
      <Card className="overflow-hidden border-slate-200 shadow-none">
        <CardContent className="p-0">
          <div className="flex flex-wrap gap-3 border-b p-5">
            <div className="relative min-w-[200px] flex-1">
              <FiSearch
                className="absolute left-3 top-3 text-slate-400"
                aria-hidden="true"
              />
              <Input
                aria-label="Szukaj uczestnika"
                placeholder="Szukaj imienia, numeru lub e-maila…"
                className="pl-9"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </div>
            <select
              aria-label="Filtr turnusu"
              value={camp}
              onChange={(event) => setCamp(event.target.value)}
            >
              <option value="all">Wszystkie turnusy</option>
              <option value="I">Turnus I</option>
              <option value="II">Turnus II</option>
            </select>
            <select
              aria-label="Filtr umowy"
              value={contract}
              onChange={(event) => setContract(event.target.value)}
            >
              <option value="all">Wszystkie umowy</option>
              {["Oczekuje", "Otrzymana", "Zatwierdzona", "Do poprawy"].map(
                (status) => (
                  <option key={status}>{status}</option>
                ),
              )}
            </select>
            <select
              aria-label="Filtr płatności"
              value={payment}
              onChange={(event) => setPayment(event.target.value)}
            >
              <option value="all">Wszystkie płatności</option>
              <option value="paid">Opłacone</option>
              <option value="overdue">Z zaległością</option>
            </select>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3">
            <p className="text-xs text-slate-500" aria-live="polite">
              {filtered.length} z {reservations.length} uczestników
            </p>
            <div className="flex gap-2">
              {hasFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setQuery("");
                    setCamp("all");
                    setContract("all");
                    setPayment("all");
                  }}
                >
                  Wyczyść filtry
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAscending((current) => !current)}
              >
                {ascending ? <FiArrowDown /> : <FiArrowUp />}Imię{" "}
                {ascending ? "A–Z" : "Z–A"}
              </Button>
            </div>
          </div>
          <ParticipantsTable reservations={filtered} />
        </CardContent>
      </Card>
    </>
  );
}
