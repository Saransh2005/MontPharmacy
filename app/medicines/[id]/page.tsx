"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { getMedicineById } from "@/lib/medicines";
import { useCart } from "@/app/context/CartContext";
import type { Medicine } from "@/lib/medicines";

export default function ProductDetail() {
  const params = useParams();
  const id = params.id as string;
  const { addToCart } = useCart();
  const [medicine, setMedicine] = useState<Medicine | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) return;
    getMedicineById(id).then((m) => {
      setMedicine(m);
      setLoading(false);
    });
  }, [id]);

  const handleAddToCart = () => {
    if (!medicine) return;
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: medicine.id,
        name: medicine.name,
        price: medicine.price,
        image: medicine.imageURL || "",
        quantity: 1,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-teal-600" size={48} />
      </div>
    );
  }

  if (!medicine) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-4">
        <h2 className="text-xl font-bold text-slate-700">Medicine not found</h2>
        <Link href="/medicines" className="text-teal-600 font-bold hover:underline">
          Back to Medicines
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Back Button */}
        <Link href="/medicines" className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 mb-8 transition-colors">
          <ArrowLeft size={20} />
          Back to Medicines
        </Link>

        {/* Main Product Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Image */}
            <div className="bg-slate-100 flex items-center justify-center p-12 min-h-80">
              {medicine.imageURL ? (
                <img
                  src={medicine.imageURL}
                  alt={medicine.name}
                  className="max-h-80 w-auto object-contain"
                />
              ) : (
                <div className="text-9xl animate-pulse">💊</div>
              )}
            </div>

            {/* Right: Product Details */}
            <div className="p-8 md:p-12 space-y-6">
              <div>
                {medicine.category && (
                  <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {medicine.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4 mb-2">
                  {medicine.name}
                </h1>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <span className="text-slate-400 text-sm ml-2">(Reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-slate-900">
                ₹{medicine.price}
                {medicine.stock <= 0 && (
                  <span className="ml-3 text-red-600 text-lg">Out of Stock</span>
                )}
              </div>

              {medicine.description && (
                <p className="text-slate-600 leading-relaxed">
                  {medicine.description}
                </p>
              )}

              {/* Quantity & Add to Cart */}
              <div className="flex flex-wrap gap-4 pt-4">
                {medicine.stock > 0 && (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-600 font-medium">Qty:</span>
                      <select
                        value={quantity}
                        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                        className="border border-slate-200 rounded-lg px-3 py-2 font-bold"
                      >
                        {Array.from({ length: Math.min(10, medicine.stock) }, (_, i) => (
                          <option key={i} value={i + 1}>{i + 1}</option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-teal-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-200"
                    >
                      <ShoppingCart size={20} />
                      Add to Cart
                    </button>
                  </>
                )}
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-teal-500" size={24} />
                  <span className="text-sm font-medium text-slate-600">100% Genuine</span>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="text-teal-500" size={24} />
                  <span className="text-sm font-medium text-slate-600">Fast Delivery</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
