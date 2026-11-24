This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/(public)/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


## Panel organizatora — wersja demonstracyjna

Panel działa w tym samym projekcie Next.js, bez logowania i z fikcyjnymi danymi:

- `/admin` — dashboard, miejsca na turnusach i sprawy wymagające uwagi;
- `/admin/uczestnicy` — wyszukiwanie, filtry, CSV, karta uczestnika i status umowy;
- `/admin/finanse` — wpłaty, należności, zaległości i nadpłaty;
- `/admin/maile` — grupy odbiorców, szablony i podgląd wiadomości.

Uruchom `npm ci`, a następnie `npm run dev` i otwórz http://localhost:3000/admin.
Komponenty interfejsu pochodzą z shadcn/ui (Tailwind + Radix).
Dane i reguły przykładowych rozliczeń są w `lib/crm/demo-data.ts`.
Stan panelu obsługuje `components/crm/demo-provider.tsx`.
Zmiany statusów, wpłaty demonstracyjne i zapisane szkice utrzymują się między
zakładkami, ale znikają po odświeżeniu. Nie ma wywołań zewnętrznego API,
uploadu dokumentów, importu bankowego ani wysyłania wiadomości.
Data rozliczeń jest stała: 15.05.2027; przykładowy harmonogram nie jest
rzeczywistą ofertą obozu.

Panel jest publicznie dostępny. Przed podłączeniem rzeczywistych danych należy
wdrożyć uwierzytelnianie i autoryzację po stronie backendu. `noindex` jest tylko
wskazówką dla wyszukiwarek, a nie ochroną dostępu.

Publiczne strony są w grupie `app/(public)` — ich adresy URL pozostają te same.
Stopka i skrypty marketingowe znajdują się w layoucie tej grupy;
bezpośrednie otwarcie panelu ich nie ładuje.

Testy rozliczeń (Node.js 24):

```bash
node --experimental-strip-types --test lib/crm/demo-data.test.mjs
```

Sprawdzenie typów i kompilacji:

```bash
npx tsc --noEmit
npm run build
```
