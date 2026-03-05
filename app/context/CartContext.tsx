"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // 1. Add to Cart Function
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // Agar pehle se hai, toh quantity badha do
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      // Agar naya hai, toh add kar do
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // 2. Remove from Cart Function
  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // 3. Decrease Quantity (remove if 1)
  const decreaseQuantity = (id: string) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.id === id);
      if (!item || item.quantity <= 1) {
        return prevCart.filter((i) => i.id !== id);
      }
      return prevCart.map((i) =>
        i.id === id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  // 4. Clear Cart (after order placed)
  const clearCart = () => setCart([]);

  // 5. Total Price Calculation
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, decreaseQuantity, clearCart, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom Hook taaki hum aasani se use kar sakein
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}