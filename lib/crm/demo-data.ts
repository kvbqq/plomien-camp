export type ContractStatus =
  "Oczekuje" | "Otrzymana" | "Zatwierdzona" | "Do poprawy";

export type DemoPayment = {
  id: string;
  amount: number;
  date: string;
  source: string;
};

export type Reservation = {
  id: string;
  name: string;
  birthDate: string;
  parent: string;
  email: string;
  camp: "I" | "II";
  contract: ContractStatus;
  price: number;
  required: number;
  payments: DemoPayment[];
};

export const DEMO_DATE = "2027-05-15";
export const DEMO_DATE_LABEL = "15.05.2027";
export const camps = [
  { id: "I", name: "Turnus I", dates: "04–11 lipca 2027", capacity: 100 },
  { id: "II", name: "Turnus II", dates: "11–18 lipca 2027", capacity: 100 },
] as const;

const names = [
  "Aleksandra",
  "Jakub",
  "Zofia",
  "Jan",
  "Maja",
  "Antoni",
  "Julia",
  "Filip",
  "Lena",
  "Adam",
  "Hanna",
  "Michał",
];
const paidAmounts = [
  300000, 150000, 200000, 50000, 300000, 0, 200000, 100000, 300000, 250000,
  50000, 320000,
];
const contracts: ContractStatus[] = [
  "Zatwierdzona",
  "Otrzymana",
  "Zatwierdzona",
  "Oczekuje",
  "Zatwierdzona",
  "Do poprawy",
];

export const initialReservations: Reservation[] = names.map((name, index) => ({
  id: `PVC-2027-${String(index + 1).padStart(3, "0")}`,
  name: `${name} ${index % 2 === 0 ? "Przykładowa" : "Przykładowy"}`,
  birthDate: `${2012 + (index % 3)}-0${(index % 8) + 1}-12`,
  parent: `Opiekun testowy ${index + 1}`,
  email: `rodzic${index + 1}@example.invalid`,
  camp: index < 6 ? "I" : "II",
  contract: contracts[index % contracts.length],
  price: 300000,
  required: 200000,
  payments:
    paidAmounts[index] > 0
      ? [
          {
            id: `demo-${index}`,
            amount: paidAmounts[index],
            date: "2027-04-28",
            source: "Wpłata przykładowa",
          },
        ]
      : [],
}));

export const money = (amount: number) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 2,
  }).format(amount / 100);
export const paid = (reservation: Reservation) =>
  reservation.payments.reduce((sum, payment) => sum + payment.amount, 0);
export const remaining = (reservation: Reservation) =>
  Math.max(0, reservation.price - paid(reservation));
export const overdue = (reservation: Reservation) =>
  Math.max(0, reservation.required - paid(reservation));
export const overpayment = (reservation: Reservation) =>
  Math.max(0, paid(reservation) - reservation.price);
export const paidPercent = (reservation: Reservation) =>
  Math.round((paid(reservation) / reservation.price) * 100);

export function paymentStage(reservation: Reservation) {
  const amount = paid(reservation);
  if (amount >= reservation.price) return "Opłacone";
  if (amount * 3 >= reservation.price * 2) return "Minimum 2/3";
  if (amount * 3 >= reservation.price) return "Minimum 1/3";
  return "Poniżej 1/3";
}

export function summarize(reservations: Reservation[]) {
  return {
    total: reservations.reduce(
      (sum, reservation) => sum + reservation.price,
      0,
    ),
    paid: reservations.reduce((sum, reservation) => sum + paid(reservation), 0),
    remaining: reservations.reduce(
      (sum, reservation) => sum + remaining(reservation),
      0,
    ),
    overdue: reservations.reduce(
      (sum, reservation) => sum + overdue(reservation),
      0,
    ),
    overpayment: reservations.reduce(
      (sum, reservation) => sum + overpayment(reservation),
      0,
    ),
    settledCount: reservations.filter(
      (reservation) => remaining(reservation) === 0,
    ).length,
    overdueCount: reservations.filter((reservation) => overdue(reservation) > 0)
      .length,
    missingCount: reservations.filter((reservation) =>
      ["Oczekuje", "Do poprawy"].includes(reservation.contract),
    ).length,
  };
}
