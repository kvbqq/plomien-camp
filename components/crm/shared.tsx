import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  overdue,
  remaining,
  type ContractStatus,
  type Reservation,
} from "@/lib/crm/demo-data";

export function PageHeading({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">
          {title}
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
      </div>
      {action}
    </div>
  );
}

export function StatCard({
  label,
  value,
  note,
  icon,
  warning = false,
}: {
  label: string;
  value: string | number;
  note: string;
  icon?: React.ReactNode;
  warning?: boolean;
}) {
  return (
    <Card className="border-slate-200 shadow-none">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm text-slate-500">{label}</p>
          <span className={warning ? "text-amber-500" : "text-slate-400"}>
            {icon}
          </span>
        </div>
        <p className="mt-4 text-3xl font-semibold tracking-tight tabular-nums">
          {value}
        </p>
        <p className="mt-2 text-xs text-slate-400">{note}</p>
      </CardContent>
    </Card>
  );
}

export function ContractBadge({ status }: { status: ContractStatus }) {
  const classes = {
    Zatwierdzona: "bg-emerald-50 text-emerald-700 border-emerald-100",
    Otrzymana: "bg-blue-50 text-blue-700 border-blue-100",
    Oczekuje: "bg-slate-50 text-slate-600 border-slate-200",
    "Do poprawy": "bg-amber-50 text-amber-800 border-amber-100",
  };
  return (
    <Badge
      variant="outline"
      className={`whitespace-nowrap font-medium ${classes[status]}`}
    >
      {status}
    </Badge>
  );
}

export function PaymentBadge({ reservation }: { reservation: Reservation }) {
  if (remaining(reservation) === 0)
    return (
      <Badge
        variant="outline"
        className="whitespace-nowrap border-emerald-100 bg-emerald-50 font-medium text-emerald-700"
      >
        Opłacone
      </Badge>
    );
  if (overdue(reservation) > 0)
    return (
      <Badge
        variant="outline"
        className="whitespace-nowrap border-red-100 bg-red-50 font-medium text-red-600"
      >
        Zaległość
      </Badge>
    );
  return (
    <Badge
      variant="outline"
      className="whitespace-nowrap border-blue-100 bg-blue-50 font-medium text-blue-700"
    >
      Zgodnie z planem
    </Badge>
  );
}
