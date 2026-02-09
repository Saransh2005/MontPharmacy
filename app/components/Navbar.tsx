"use client"; // <-- Zaroori hai

import Link from "next/link";
import { ShoppingCart, User, Search, Menu } from "lucide-react";
import { useCart } from "@/app/context/CartContext"; // Path check karna

const Navbar = () => {
  const { cart } = useCart(); // <-- Cart data nikala

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        
        <Link href="/" className="text-2xl font-bold text-teal-700">
          Mont<span className="text-slate-900">Pharmacy</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="hover:text-teal-600">Home</Link>
          <Link href="/medicines" className="hover:text-teal-600">Medicines</Link>
          <Link href="/about" className="hover:text-teal-600">Company</Link>
          <Link href="/contact" className="hover:text-teal-600">Contact</Link>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-slate-100 rounded-full text-slate-600">
            <Search size={20} />
          </button>

          <Link href="/login" className="hidden md:flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-teal-700">
            <User size={16} />
            Login
          </Link>

          {/* DYNAMIC CART BUTTON */}
          <Link href="/cart" className="relative p-2 hover:bg-slate-100 rounded-full text-slate-600">
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cart.length} {/* <-- Yahan ab asli number dikhega */}
              </span>
            )}
          </Link>

          <button className="md:hidden p-2 text-slate-600">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;