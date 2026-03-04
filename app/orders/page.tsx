"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Package, ArrowLeft, Loader2 } from "lucide-react";
import { useAuth } from "@/app/context/AuthContext";
import { getOrdersByUser, Order } from "@/lib/orders";

const statusColors: Record<string, string> = {
  placed: "bg-blue-100 text-blue-800",
  processing: "bg-amber-100 text-amber-800",
  shipped: "bg-purple-100 text-purple-800",
  delivered: "bg-green-100 text-green-800",
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return d.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function OrderHistory() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
      return;
    }
    if (!user) return;

    getOrdersByUser(user.uid)
      .then(setOrders)
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user, authLoading, router]);

  if (authLoading || (loading && user)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-teal-600" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <h1 className="text-3xl font-bold text-slate-800 mb-2">Order History</h1>
        <p className="text-slate-600 mb-8">
          View all your past orders
        </p>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <Package className="mx-auto text-slate-300 mb-4" size={48} />
            <h2 className="text-xl font-bold text-slate-700 mb-2">No orders yet</h2>
            <p className="text-slate-500 mb-6">
              Your orders will appear here after you checkout from the cart.
            </p>
            <Link
              href="/medicines"
              className="inline-flex items-center gap-2 bg-teal-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-teal-700 transition-colors"
            >
              Browse Medicines
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden"
              >
                <div className="p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-100">
                  <div>
                    <p className="font-mono text-sm text-slate-500 mb-1">
                      Order #{order.id.slice(-8).toUpperCase()}
                    </p>
                    <p className="text-sm text-slate-600">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${
                        statusColors[order.status] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-lg font-bold text-slate-800">
                      ₹{order.totalPrice}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6">
                  <ul className="space-y-3">
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center text-sm"
                      >
                        <span className="text-slate-700">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-slate-800">
                          ₹{item.price * item.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
