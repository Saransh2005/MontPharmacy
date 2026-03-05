import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  items: OrderItem[];
  totalPrice: number;
  status: "placed" | "processing" | "shipped" | "delivered";
  createdAt: string;
}

export async function createOrder(
  userId: string,
  userEmail: string,
  userName: string,
  items: OrderItem[],
  totalPrice: number
): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    userId,
    userEmail,
    userName,
    items,
    totalPrice,
    status: "placed",
    createdAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getOrdersByUser(userId: string): Promise<Order[]> {
  const q = query(
    collection(db, "orders"),
    where("userId", "==", userId)
  );
  const snapshot = await getDocs(q);
  const orders = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      userId: data.userId,
      userEmail: data.userEmail,
      userName: data.userName,
      items: data.items,
      totalPrice: data.totalPrice,
      status: data.status || "placed",
      createdAt: data.createdAt?.toDate?.()?.toISOString?.() ?? new Date().toISOString(),
    };
  });
  return orders.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
}
