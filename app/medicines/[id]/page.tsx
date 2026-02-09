import Link from "next/link";
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck } from "lucide-react";

export default function ProductDetail({ params }: { params: { id: string } }) {
  // Filhal hum "Fake Data" dikha rahe hain. 
  // Real app mein hum 'params.id' use karke database se data layenge.
  
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
            <div className="bg-slate-100 flex items-center justify-center p-12 min-h-[400px]">
              <div className="text-9xl animate-pulse">💊</div>
            </div>

            {/* Right: Product Details */}
            <div className="p-8 md:p-12 space-y-6">
              <div>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Prescription Required
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mt-4 mb-2">
                  Paracetamol 650mg (Strip of 15)
                </h1>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <Star fill="currentColor" size={20} />
                  <span className="text-slate-400 text-sm ml-2">(450 Reviews)</span>
                </div>
              </div>

              <div className="text-3xl font-bold text-slate-900">
                ₹30.00 <span className="text-lg text-slate-400 font-normal line-through ml-2">₹45.00</span>
              </div>

              <p className="text-slate-600 leading-relaxed">
                Effective relief from fever and mild to moderate pain. Contains Paracetamol IP 650mg. 
                Dosage: As directed by the physician. Store in a cool, dry place.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-teal-600 text-white py-3 rounded-xl font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-200">
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
                <button className="px-6 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:border-teal-600 hover:text-teal-600 transition-all">
                  Buy Now
                </button>
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

        {/* Additional Info Tabs (Description, Dosage, etc.) */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">Composition</h3>
            <p className="text-sm text-slate-500">Each uncoated tablet contains: Paracetamol IP 650mg.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">Side Effects</h3>
            <p className="text-sm text-slate-500">Nausea, allergic reactions (rare). Consult doctor if symptoms persist.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="font-bold text-slate-800 mb-2">Manufacturer</h3>
            <p className="text-sm text-slate-500">MontPharmacy Labs, Industrial Area, New Delhi.</p>
          </div>
        </div>

      </div>
    </div>
  );
}