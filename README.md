# Mont Pharmacy

Online medicine store built with Next.js and Firebase.

## Firebase Setup (Medicines & Admin)

1. **Firestore Database**: Enable Firestore in [Firebase Console](https://console.firebase.google.com) → Build → Firestore Database → Create database. Use test mode for development, or configure rules:

   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /medicines/{doc} {
         allow read: if true;  // Public read for medicines
         allow write: if request.auth != null;  // Authenticated users (admin uses email check in app)
       }
       match /orders/{doc} { allow read, write: if request.auth != null; }
       match /users/{doc} { allow read, write: if request.auth != null; }
     }
   }
   ```

2. **Medicine images**: Use image URLs in the Admin form (e.g. from Imgur, your website). Firebase Storage is not required.

3. **Admin access**: Set `NEXT_PUBLIC_ADMIN_EMAIL` in `.env.local` to the pharmacy owner's email. Only this email can access `/admin`.

4. **Optional seed (sample medicines)**: Run `npx dotenv -e .env.local -- npx tsx scripts/seed-medicines.ts` (requires `tsx` and `dotenv-cli`) to add sample medicines, or add them via the Admin Dashboard.

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
