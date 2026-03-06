"use client";

import { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";
import {
  Medicine,
  subscribeMedicines,
  searchMedicines,
} from "@/lib/medicines";

export default function Medicines() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(5000);

  useEffect(() => {
    return subscribeMedicines(setMedicines);
  }, []);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const allCategories = Array.from(
    new Set([
      "Fever & Pain",
      "Skincare",
      "Vitamins",
      "Baby Care",
      ...medicines.map((m) => m.category).filter((c) => c && c.trim() !== ""),
    ])
  ) as string[];

  let displayedMedicines =
    searchQuery.trim() === ""
      ? medicines
      : searchMedicines(medicines, searchQuery);

  displayedMedicines = displayedMedicines.filter((m) => m.price <= maxPrice);

  if (selectedCategories.length > 0) {
    displayedMedicines = displayedMedicines.filter(
      (m) => m.category && selectedCategories.includes(m.category)
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 md:px-8">

        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800">Our Medicines</h1>
          <p className="text-slate-500 mt-2">Browse our wide range of 100% genuine healthcare products.</p>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Sidebar: Filters */}
          <div className="w-full md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-teal-700 font-bold">
                <Filter size={20} />
                <span>Filters</span>
              </div>

              {/* Category Filter */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 text-sm">Categories</h4>
                <div className="flex flex-col gap-2 text-sm text-slate-600">
                  {allCategories.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer hover:text-teal-600"
                    >
                      <input
                        type="checkbox"
                        className="accent-teal-600"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryChange(cat)}
                      />{" "}
                      {cat}
                    </label>
                  ))}
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              {/* Price Filter */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 text-sm">Max Price: ₹{maxPrice}</h4>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-teal-600"
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>₹0</span>
                  <span>₹5000+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Products Grid */}
          <div className="w-full md:w-3/4">

            {/* Search Bar */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-8 flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                <input
                  type="text"
                  placeholder="Search for medicines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedMedicines.length > 0 ? (
                displayedMedicines.map((item) => (
                  <ProductCard
                    key={item.id}
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    image={item.imageURL || ""}
                  />
                ))
              ) : (
                <p className="col-span-full text-center py-12 text-slate-500">
                  No medicines found. Try a different search.
                </p>
              )}
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
