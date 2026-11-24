import test from "node:test";
import assert from "node:assert/strict";
import {
  initialReservations,
  overdue,
  remaining,
  overpayment,
  paymentStage,
  summarize,
} from "./demo-data.ts";

test("nadpłata jednej osoby nie zmniejsza należności pozostałych", () => {
  const base = initialReservations[0];
  const reservations = [
    { ...base, payments: [{ amount: 320000 }] },
    { ...base, payments: [{ amount: 100000 }] },
  ];
  const totals = summarize(reservations);
  assert.equal(totals.paid, 420000);
  assert.equal(totals.remaining, 200000);
  assert.equal(totals.overpayment, 20000);
  assert.equal(totals.overdue, 100000);
});

test("etapy są rozłączne i uwzględniają dokładne granice", () => {
  const cases = [
    [0, "Poniżej 1/3"],
    [99999, "Poniżej 1/3"],
    [100000, "Minimum 1/3"],
    [199999, "Minimum 1/3"],
    [200000, "Minimum 2/3"],
    [299999, "Minimum 2/3"],
    [300000, "Opłacone"],
    [320000, "Opłacone"],
  ];
  for (const [amount, stage] of cases) {
    assert.equal(
      paymentStage({ ...initialReservations[0], payments: [{ amount }] }),
      stage,
    );
  }
});

test("zaległość jest odrębna od pozostałej ceny", () => {
  const reservation = {
    ...initialReservations[0],
    payments: [{ amount: 200000 }],
  };
  assert.equal(overdue(reservation), 0);
  assert.equal(remaining(reservation), 100000);
  assert.equal(overpayment(reservation), 0);
});
