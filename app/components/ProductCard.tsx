"use client"; 

import { ShoppingCart, Plus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext"; // Path check karlena (../context/CartContext bhi ho sakta hai)

interface ProductProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

const ProductCard = ({ id, name, category, price, image }: ProductProps) => {
  const { addToCart } = useCart(); // <-- Cart function nikala

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Link open hone se roka
    e.stopPropagation();
    
    addToCart({ id, name, price, image, quantity: 1 }); // <-- Asli function call kiya
    alert(`Added ${name} to cart!`);
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
          
          <button 
            className="bg-teal-50 text-teal-700 p-2 rounded-lg hover:bg-teal-600 hover:text-white transition-all flex items-center gap-2 text-sm font-bold z-10"
            onClick={handleAddToCart} // <-- Yahan function lagaya
          >
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;