export interface Medicine {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
}

export const ALL_MEDICINES: Medicine[] = [
  { id: 1, name: "Paracetamol 650", category: "Fever", price: 30, image: "" },
  { id: 2, name: "Vitamin C Serum", category: "Skincare", price: 499, image: "" },
  { id: 3, name: "Sugar Free Gold", category: "Diabetic", price: 250, image: "" },
  { id: 4, name: "Whey Protein", category: "Fitness", price: 2400, image: "" },
  { id: 5, name: "Cough Syrup", category: "Cold & Flu", price: 120, image: "" },
  { id: 6, name: "Pain Relief Gel", category: "Pain Relief", price: 150, image: "" },
  { id: 7, name: "Calcium Tablets", category: "Supplements", price: 399, image: "" },
  { id: 8, name: "Face Wash (Neem)", category: "Skincare", price: 199, image: "" },
];

export function searchMedicines(query: string): Medicine[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return ALL_MEDICINES.filter(
    (m) =>
      m.name.toLowerCase().includes(q) || m.category.toLowerCase().includes(q)
  );
}
