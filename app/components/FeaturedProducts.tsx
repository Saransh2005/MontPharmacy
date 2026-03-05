"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "./ProductCard";
import { Medicine, subscribeMedicines } from "@/lib/medicines";

const FeaturedProducts = () => {
  const [medicines, setMedicines] = useState<Medicine[]>([]);

  useEffect(() => {
    return subscribeMedicines(setMedicines);
  }, []);

  const featured = medicines.slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Best Selling Products</h2>
            <p className="text-slate-500 mt-2">Recommended by our top pharmacists.</p>
          </div>
          <Link href="/medicines" className="text-teal-600 font-bold hover:underline">View All Products &rarr;</Link>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((item) => (
            <ProductCard 
              key={item.id} 
              id={item.id}
              name={item.name} 
              category={item.category} 
              price={item.price} 
              image={item.imageURL || ""} 
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;
