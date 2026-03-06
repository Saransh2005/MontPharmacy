"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Search, Menu, X, LogOut, Package, Shield } from "lucide-react";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import { subscribeMedicines, searchMedicines } from "@/lib/medicines";
import type { Medicine } from "@/lib/medicines";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL?.toLowerCase().trim();

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { cart } = useCart();
  const { user, loading, signOut } = useAuth();
  const isAdmin = ADMIN_EMAIL && user?.email?.toLowerCase() === ADMIN_EMAIL;

  useEffect(() => {
    return subscribeMedicines(setMedicines);
  }, []);

  const searchResults = searchMedicines(medicines, searchQuery);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    } else {
      setSearchQuery("");
    }
  }, [searchOpen]);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const closeSearch = () => setSearchOpen(false);

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
          {isAdmin && (
            <Link href="/admin" className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold">
              <Shield size={16} />
              Admin
            </Link>
          )}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 hover:bg-slate-100 rounded-full text-slate-600"
            aria-label="Search medicines"
            onClick={() => setSearchOpen(true)}
          >
            <Search size={20} />
          </button>

          {!loading && (
            user ? (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/orders"
                  className="flex items-center gap-2 text-slate-600 hover:text-teal-600 text-sm font-medium"
                >
                  <Package size={16} />
                  Orders
                </Link>
                <span className="text-slate-600 text-sm truncate max-w-[120px]">
                  {user.displayName || user.email?.split("@")[0]}
                </span>
                <button
                  onClick={() => signOut()}
                  className="flex items-center gap-2 bg-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-300 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="hidden md:flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-teal-700">
                <User size={16} />
                Login
              </Link>
            )
          )}

          <Link href="/cart" className="relative p-2 hover:bg-slate-100 rounded-full text-slate-600" onClick={closeMobileMenu}>
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Full-screen overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] md:hidden"
          onClick={closeMobileMenu}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" />
          {/* Slide-in panel - full width on small screens */}
          <div
            className="absolute top-0 left-0 h-full w-full sm:max-w-[300px] bg-white shadow-2xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 pt-6 space-y-1">
              <div className="flex items-center justify-between mb-6">
                <Link href="/" className="text-xl font-bold text-teal-700" onClick={closeMobileMenu}>
                  Mont<span className="text-slate-900">Pharmacy</span>
                </Link>
                <button
                  onClick={closeMobileMenu}
                  className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"
                >
                  <X size={24} />
                </button>
              </div>
              <Link
                href="/"
                className="block py-3 px-4 rounded-lg text-slate-700 font-medium hover:bg-teal-50 hover:text-teal-600 transition-colors"
                onClick={closeMobileMenu}
              >
                Home
              </Link>
              <Link
                href="/medicines"
                className="block py-3 px-4 rounded-lg text-slate-700 font-medium hover:bg-teal-50 hover:text-teal-600 transition-colors"
                onClick={closeMobileMenu}
              >
                Medicines
              </Link>
              <Link
                href="/about"
                className="block py-3 px-4 rounded-lg text-slate-700 font-medium hover:bg-teal-50 hover:text-teal-600 transition-colors"
                onClick={closeMobileMenu}
              >
                Company
              </Link>
              <Link
                href="/contact"
                className="block py-3 px-4 rounded-lg text-slate-700 font-medium hover:bg-teal-50 hover:text-teal-600 transition-colors"
                onClick={closeMobileMenu}
              >
                Contact
              </Link>
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center gap-2 block py-3 px-4 rounded-lg text-amber-600 font-bold hover:bg-amber-50 transition-colors"
                  onClick={closeMobileMenu}
                >
                  <Shield size={18} />
                  Admin Dashboard
                </Link>
              )}
              {user && (
                <Link
                  href="/orders"
                  className="block py-3 px-4 rounded-lg text-slate-700 font-medium hover:bg-teal-50 hover:text-teal-600 transition-colors"
                  onClick={closeMobileMenu}
                >
                  Order History
                </Link>
              )}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {!loading && (
                  user ? (
                    <div className="flex flex-col gap-2">
                      <p className="py-2 px-4 text-sm text-slate-600 break-all">
                        {user.displayName || user.email}
                      </p>
                      <button
                        onClick={() => {
                          signOut();
                          closeMobileMenu();
                        }}
                        className="flex items-center gap-2 py-3 px-4 rounded-lg bg-slate-200 text-slate-700 font-medium hover:bg-slate-300 transition-colors text-left w-full"
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/login"
                      className="flex items-center gap-2 py-3 px-4 rounded-lg bg-teal-600 text-white font-bold hover:bg-teal-700 transition-colors"
                      onClick={closeMobileMenu}
                    >
                      <User size={18} />
                      Login
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/50 flex items-start justify-center pt-20 px-4"
          onClick={closeSearch}
        >
          <div
            className="bg-white rounded-xl shadow-2xl w-full max-w-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2 p-4 border-b border-slate-200">
              <Search className="text-slate-400 shrink-0" size={20} />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search medicines by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 py-2 outline-none text-slate-800 placeholder:text-slate-400"
              />
              <button
                onClick={closeSearch}
                className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {searchQuery.trim() === "" ? (
                <p className="p-6 text-slate-500 text-sm text-center">
                  Type to search for medicines...
                </p>
              ) : searchResults.length > 0 ? (
                <ul className="py-2">
                  {searchResults.map((medicine) => (
                    <li key={medicine.id}>
                      <Link
                        href={`/medicines/${medicine.id}`}
                        onClick={closeSearch}
                        className="flex items-center justify-between px-4 py-3 hover:bg-teal-50 transition-colors group"
                      >
                        <div>
                          <p className="font-medium text-slate-800 group-hover:text-teal-700">
                            {medicine.name}
                          </p>
                          <p className="text-sm text-slate-500">{medicine.category}</p>
                        </div>
                        <span className="font-bold text-teal-600">₹{medicine.price}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-6 text-slate-500 text-sm text-center">
                  No medicines found for &quot;{searchQuery}&quot;
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;