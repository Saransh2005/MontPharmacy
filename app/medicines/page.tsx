import { Search, Filter } from "lucide-react";
import ProductCard from "../components/ProductCard";

// Nakli Data (Baad mein Database se aayega)
const allMedicines = [
  { id: 1, name: "Paracetamol 650", category: "Fever", price: 30, image: "" },
  { id: 2, name: "Vitamin C Serum", category: "Skincare", price: 499, image: "" },
  { id: 3, name: "Sugar Free Gold", category: "Diabetic", price: 250, image: "" },
  { id: 4, name: "Whey Protein", category: "Fitness", price: 2400, image: "" },
  { id: 5, name: "Cough Syrup", category: "Cold & Flu", price: 120, image: "" },
  { id: 6, name: "Pain Relief Gel", category: "Pain Relief", price: 150, image: "" },
  { id: 7, name: "Calcium Tablets", category: "Supplements", price: 399, image: "" },
  { id: 8, name: "Face Wash (Neem)", category: "Skincare", price: 199, image: "" },
];

export default function Medicines() {
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
                  <label className="flex items-center gap-2 cursor-pointer hover:text-teal-600">
                    <input type="checkbox" className="accent-teal-600" /> Fever & Pain
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-teal-600">
                    <input type="checkbox" className="accent-teal-600" /> Skincare
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-teal-600">
                    <input type="checkbox" className="accent-teal-600" /> Vitamins
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer hover:text-teal-600">
                    <input type="checkbox" className="accent-teal-600" /> Baby Care
                  </label>
                </div>
              </div>

              <hr className="my-6 border-slate-100" />

              {/* Price Filter */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-700 text-sm">Price Range</h4>
                <input type="range" className="w-full accent-teal-600" />
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
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 transition-all"
                />
              </div>
              <button className="bg-teal-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-teal-700 transition-colors">
                Search
              </button>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allMedicines.map((item) => (
                <ProductCard 
                  key={item.id} 
                  id={item.id}
                  name={item.name} 
                  category={item.category} 
                  price={item.price} 
                  image={item.image} 
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}