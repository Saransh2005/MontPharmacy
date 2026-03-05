/**
 * Optional script to seed Firestore with initial medicines.
 * Run with: npx dotenv -e .env.local -- npx tsx scripts/seed-medicines.ts
 * (Requires: npm install -D tsx dotenv-cli)
 *
 * Or use the Admin Dashboard at /admin to add medicines manually.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const SEED_MEDICINES = [
  { name: "Paracetamol 650", category: "Fever", price: 30, stock: 100, description: "Effective relief from fever and mild to moderate pain.", imageURL: "" },
  { name: "Vitamin C Serum", category: "Skincare", price: 499, stock: 50, description: "Brightening vitamin C serum for healthy skin.", imageURL: "" },
  { name: "Sugar Free Gold", category: "Diabetic", price: 250, stock: 75, description: "Sugar substitute for diabetic diets.", imageURL: "" },
  { name: "Whey Protein", category: "Fitness", price: 2400, stock: 30, description: "High-quality whey protein for muscle recovery.", imageURL: "" },
  { name: "Cough Syrup", category: "Cold & Flu", price: 120, stock: 60, description: "Relief from dry and wet cough.", imageURL: "" },
  { name: "Pain Relief Gel", category: "Pain Relief", price: 150, stock: 45, description: "Topical pain relief gel.", imageURL: "" },
  { name: "Calcium Tablets", category: "Supplements", price: 399, stock: 80, description: "Calcium supplement for bone health.", imageURL: "" },
  { name: "Face Wash (Neem)", category: "Skincare", price: 199, stock: 90, description: "Neem-based face wash for clear skin.", imageURL: "" },
];

async function seed() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  for (const m of SEED_MEDICINES) {
    await addDoc(collection(db, "medicines"), m);
    console.log("Added:", m.name);
  }
  console.log("Done! Seeded", SEED_MEDICINES.length, "medicines.");
}

seed().catch(console.error);
