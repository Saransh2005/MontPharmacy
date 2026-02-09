"use client";

import Link from "next/link";
import { Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/app/context/CartContext"; // Path check karna

export default function Cart() {
  const { cart, removeFromCart, totalPrice } = useCart(); // <-- Data liya

  if (cart.length === 0) {
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

              <button className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2">
                Proceed to Checkout
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}