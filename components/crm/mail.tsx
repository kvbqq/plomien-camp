"use client";

import { useState } from "react";
import { FiMail, FiEye, FiSave } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { overdue } from "@/lib/crm/demo-data";
import { useDemo } from "./demo-provider";
import { PageHeading } from "./shared";

const templates = [
  {
    title: "Informacje organizacyjne",
    description: "Zbiórka i przygotowania do wyjazdu",
    subject: "Przygotowania do obozu Płomień Camp",
    body: "Dzień dobry,\n\nzbliża się nasz siatkarski obóz! Wkrótce prześlemy informacje o zbiórce oraz listę rzeczy do spakowania.\n\nDo zobaczenia!\nZespół Płomień Camp",
  },
  {
    title: "Przypomnienie o umowie",
    description: "Prośba o dostarczenie dokumentu",
    subject: "Płomień Camp — podpisana umowa",
    body: "Dzień dobry,\n\nprzypominamy o odesłaniu podpisanej umowy uczestnictwa w obozie. Jeśli dokument został już przesłany, prosimy o kontakt z organizatorem.\n\nPozdrawiamy,\nZespół Płomień Camp",
  },
  {
    title: "Lista rzeczy do spakowania",
    description: "Najważniejsze rzeczy na obóz",
    subject: "Co zabrać na Płomień Camp?",
    body: "Dzień dobry,\n\nna obóz warto zabrać odzież sportową, buty na halę, bidon i nakrycie głowy. Pełną listę oraz szczegóły przekaże organizator przed wyjazdem.\n\nDo zobaczenia!\nZespół Płomień Camp",
  },
];

export function MailPage() {
  const { reservations, draft, setDraft } = useDemo();
  const [subject, setSubject] = useState(draft.subject);
  const [body, setBody] = useState(draft.body);
  const [group, setGroup] = useState(draft.group);
  const [preview, setPreview] = useState(false);
  const [notice, setNotice] = useState("");
  const recipients = reservations.filter(
    (reservation) =>
      group === "all" ||
      (group === "missing"
        ? ["Oczekuje", "Do poprawy"].includes(reservation.contract)
        : group === "overdue"
          ? overdue(reservation) > 0
          : reservation.camp === group),
  );
  const recipientCount = new Set(
    recipients.map((reservation) => reservation.email),
  ).size;

  return (
    <>
      <PageHeading
        title="Maile"
        description="Przygotuj komunikat dla rodziców i sprawdź jego podgląd."
      />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <Card className="border-slate-200 shadow-none">
          <CardContent className="space-y-5 p-5 sm:p-6">
            <div className="flex items-center gap-3 border-b pb-5">
              <span className="rounded-lg bg-red-50 p-2.5 text-red-500">
                <FiMail size={20} />
              </span>
              <div>
                <h2 className="font-semibold">Nowa wiadomość</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Szkic demonstracyjny
                </p>
              </div>
            </div>
            <div>
              <label
                htmlFor="mail-recipients"
                className="mb-2 block text-sm font-medium"
              >
                Odbiorcy
              </label>
              <select
                id="mail-recipients"
                className="w-full"
                value={group}
                onChange={(event) => {
                  setGroup(event.target.value);
                  setNotice("");
                }}
              >
                <option value="all">Wszyscy rodzice</option>
                <option value="I">Rodzice — Turnus I</option>
                <option value="II">Rodzice — Turnus II</option>
                <option value="missing">Brak poprawnej umowy</option>
                <option value="overdue">Zaległe płatności</option>
              </select>
              <p className="mt-2 text-xs text-slate-500" aria-live="polite">
                Liczba adresów w wybranej grupie: {recipientCount}
              </p>
            </div>
            <div>
              <label
                htmlFor="mail-subject"
                className="mb-2 block text-sm font-medium"
              >
                Temat
              </label>
              <Input
                id="mail-subject"
                maxLength={200}
                value={subject}
                onChange={(event) => {
                  setSubject(event.target.value);
                  setNotice("");
                }}
              />
            </div>
            <div>
              <label
                htmlFor="mail-body"
                className="mb-2 block text-sm font-medium"
              >
                Treść wiadomości
              </label>
              <Textarea
                id="mail-body"
                className="min-h-64 leading-7"
                maxLength={20000}
                value={body}
                onChange={(event) => {
                  setBody(event.target.value);
                  setNotice("");
                }}
              />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                disabled={!subject.trim() || !body.trim()}
                onClick={() => {
                  setDraft({ subject, body, group });
                  setNotice(
                    "Zapisano szkic na czas tej sesji demonstracyjnej. Odświeżenie strony go zresetuje.",
                  );
                }}
              >
                <FiSave />
                Zapisz szkic demo
              </Button>
              <Button
                variant="outline"
                disabled={!subject.trim() || !body.trim()}
                onClick={() => setPreview(true)}
              >
                <FiEye />
                Podgląd wiadomości
              </Button>
            </div>
            <p role="status" className="text-xs leading-5 text-slate-500">
              {notice ||
                "Wysyłka zostanie podłączona w kolejnym etapie. Ten panel nie wysyła e-maili."}
            </p>
          </CardContent>
        </Card>
        <div className="space-y-5">
          <Card className="border-slate-200 shadow-none">
            <CardContent className="p-5">
              <h2 className="mb-1 font-semibold">Zacznij od szablonu</h2>
              <p className="mb-4 text-xs text-slate-500">
                Szablon zastępuje temat i treść szkicu.
              </p>
              <div className="space-y-2">
                {templates.map((template) => (
                  <button
                    key={template.title}
                    className="w-full rounded-lg border border-slate-200 p-3 text-left transition-colors hover:border-red-200 hover:bg-red-50/40"
                    onClick={() => {
                      setSubject(template.subject);
                      setBody(template.body);
                      setNotice(`Wczytano szablon: ${template.title}.`);
                    }}
                  >
                    <span className="block text-sm font-medium">
                      {template.title}
                    </span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">
                      {template.description}
                    </span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card className="border-dashed border-slate-200 bg-transparent shadow-none">
            <CardContent className="p-5">
              <h2 className="text-sm font-semibold">Historia wysyłek</h2>
              <p className="mt-2 text-xs leading-6 text-slate-500">
                Brak wysłanych wiadomości. Historia i automatyczne przypomnienia
                pojawią się po podłączeniu backendu.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={preview} onOpenChange={setPreview}>
        <DialogContent className="crm-dialog max-h-[90dvh] overflow-y-auto sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Podgląd wiadomości</DialogTitle>
            <DialogDescription>
              {recipientCount} adresów demonstracyjnych · wiadomość nie zostanie
              wysłana
            </DialogDescription>
          </DialogHeader>
          <div className="min-w-0 rounded-lg border p-5">
            <p className="break-words border-b pb-3 font-semibold">{subject}</p>
            <p className="mt-4 whitespace-pre-wrap break-words text-sm leading-7">
              {body}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
