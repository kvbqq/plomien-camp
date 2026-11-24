"use client";

import { createContext, useContext, useState } from "react";
import {
  DEMO_DATE,
  initialReservations,
  type ContractStatus,
  type Reservation,
} from "@/lib/crm/demo-data";

type Draft = { subject: string; body: string; group: string };
type DemoContextValue = {
  reservations: Reservation[];
  updateContract: (id: string, status: ContractStatus) => void;
  addPayment: (id: string, amount: number) => void;
  draft: Draft;
  setDraft: (draft: Draft) => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: React.ReactNode }) {
  const [reservations, setReservations] = useState(initialReservations);
  const [draft, setDraft] = useState<Draft>({
    subject: "Przygotowania do obozu Płomień Camp",
    body: "Dzień dobry,\n\nzbliża się nasz siatkarski obóz! Wkrótce prześlemy informacje o zbiórce oraz listę rzeczy do spakowania.\n\nDo zobaczenia!\nZespół Płomień Camp",
    group: "all",
  });

  function updateContract(id: string, contract: ContractStatus) {
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id ? { ...reservation, contract } : reservation,
      ),
    );
  }

  function addPayment(id: string, amount: number) {
    if (!Number.isSafeInteger(amount) || amount <= 0) return;
    setReservations((current) =>
      current.map((reservation) =>
        reservation.id === id
          ? {
              ...reservation,
              payments: [
                ...reservation.payments,
                {
                  id: crypto.randomUUID(),
                  amount,
                  date: DEMO_DATE,
                  source: "Dodana w demonstracji",
                },
              ],
            }
          : reservation,
      ),
    );
  }

  return (
    <DemoContext.Provider
      value={{ reservations, updateContract, addPayment, draft, setDraft }}
    >
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const value = useContext(DemoContext);
  if (!value) throw new Error("Brak kontekstu panelu demonstracyjnego");
  return value;
}
