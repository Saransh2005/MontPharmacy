import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  onSnapshot,
  Unsubscribe,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export interface Medicine {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  imageURL: string;
  category?: string;
}

export interface MedicineInput {
  name: string;
  price: number;
  stock: number;
  description: string;
  imageURL: string;
  category?: string;
}

const MEDICINES_COLLECTION = "medicines";

export async function getMedicines(): Promise<Medicine[]> {
  const q = query(
    collection(db, MEDICINES_COLLECTION),
    orderBy("name", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Medicine));
}

export async function getMedicineById(id: string): Promise<Medicine | null> {
  const docRef = doc(db, MEDICINES_COLLECTION, id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return { id: docSnap.id, ...docSnap.data() } as Medicine;
}

export function subscribeMedicines(
  callback: (medicines: Medicine[]) => void
): Unsubscribe {
  const q = query(
    collection(db, MEDICINES_COLLECTION),
    orderBy("name", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    const medicines = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    })) as Medicine[];
    callback(medicines);
  });
}

export async function addMedicine(data: MedicineInput): Promise<string> {
  const docRef = await addDoc(collection(db, MEDICINES_COLLECTION), {
    ...data,
    category: data.category || "",
  });
  return docRef.id;
}

export async function updateMedicine(
  id: string,
  data: Partial<MedicineInput>
): Promise<void> {
  const docRef = doc(db, MEDICINES_COLLECTION, id);
  await updateDoc(docRef, data as Record<string, unknown>);
}

export async function deleteMedicine(id: string): Promise<void> {
  const docRef = doc(db, MEDICINES_COLLECTION, id);
  await deleteDoc(docRef);
}

export function searchMedicines(
  medicines: Medicine[],
  query: string
): Medicine[] {
  const q = query.trim().toLowerCase();
  if (!q) return medicines;
  return medicines.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      (m.category || "").toLowerCase().includes(q) ||
      (m.description || "").toLowerCase().includes(q)
  );
}
