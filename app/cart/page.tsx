"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2, ArrowRight, Loader2 } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { createOrder } from "@/lib/orders";

export default function Cart() {
  const { cart, removeFromCart, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    if (!user) {
      router.push("/login?redirect=/cart");
      return;
    }
    if (cart.length === 0) return;

    setPlacing(true);
    setError(null);
    try {
      await createOrder(
        user.uid,
        user.email ?? "",
        user.displayName ?? user.email ?? "User",
        cart,
        totalPrice
      );
      clearCart();
      router.push("/orders");
    } catch {
      setError("Failed to place order. Please try again.");
    } finally {
      setPlacing(false);
    }
  };

  if (cart.length === 0 && !placing) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <h2 className="text-2xl font-bold text-slate-400">Your Cart is Empty</h2>
        <Link href="/medicines" className="mt-4 text-teal-600 font-bold hover:underline">
          Browse Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-8">Your Cart ({cart.length} Items)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Side: Cart Items */}
          <div className="lg:w-2/3 space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-4">
                <div className="h-20 w-20 bg-slate-100 rounded-lg flex items-center justify-center text-2xl">💊</div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800">{item.name}</h3>
                  <div className="font-bold text-teal-600 mt-1">₹{item.price}</div>
                </div>

                <div className="font-bold text-slate-500">Qty: {item.quantity}</div>

                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-400 hover:text-red-600 p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Right Side: Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Order Summary</h3>
              
              <div className="space-y-3 text-sm text-slate-600 pb-6 border-b border-slate-100">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>₹0.00</span>
                </div>
              </div>

              <div className="flex justify-between font-bold text-lg text-slate-900 py-4">
                <span>Total</span>
                <span>₹{totalPrice}</span>
              </div>

              {error && (
                <p className="text-red-600 text-sm mb-2">{error}</p>
              )}

              <button
                onClick={handleCheckout}
                disabled={placing}
                className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {placing ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <>
                    Proceed to Checkout
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}