"use client";

import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";

interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, category, price, image }: ProductProps) => {
  const { cart, addToCart, decreaseQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === id);
  const quantity = cartItem?.quantity ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, quantity: 1 });
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQuantity(id);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, name, price, image, quantity: 1 });
  };

  return (
    <Link href={`/medicines/${id}`} className="block group">
      <div className="bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col justify-between">
        
        <div className="relative h-48 w-full bg-slate-50 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
          <div className="text-4xl">💊</div>
        </div>

        <div>
          <p className="text-xs font-bold text-teal-600 uppercase tracking-wider">{category}</p>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1">{name}</h3>
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-extrabold text-slate-900">₹{price}</span>
          
          {quantity === 0 ? (
            <button
              className="bg-teal-50 text-teal-700 p-2 rounded-lg hover:bg-teal-600 hover:text-white transition-all flex items-center gap-2 text-sm font-bold z-10"
              onClick={handleAdd}
            >
              <Plus size={18} />
              Add
            </button>
          ) : (
            <div
              className="flex items-center gap-1 bg-teal-600 text-white rounded-lg overflow-hidden z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="p-2 hover:bg-teal-700 transition-colors"
                onClick={handleDecrease}
              >
                <Minus size={16} />
              </button>
              <span className="min-w-[28px] text-center font-bold text-sm py-2">
                {quantity}
              </span>
              <button
                className="p-2 hover:bg-teal-700 transition-colors"
                onClick={handleIncrease}
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;