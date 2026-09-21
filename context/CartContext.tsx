"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface CartContextType {
  items: number[];
  add: (id: number) => void;
  remove: (id: number) => void;
  clear: () => void;
  has: (id: number) => boolean;
  count: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  add: () => {},
  remove: () => {},
  clear: () => {},
  has: () => false,
  count: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<number[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("sidrah-cart");
    if (saved) setItems(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("sidrah-cart", JSON.stringify(items));
  }, [items]);

  const add = (id: number) => {
    if (items.includes(id)) {
      toast.info("الكورس موجود في السلة بالفعل");
      return;
    }
    setItems((prev) => [...prev, id]);
    toast.success("تمت الإضافة إلى السلة 🛒");
  };

  const remove = (id: number) => {
    setItems((prev) => prev.filter((i) => i !== id));
    toast.success("تمت الإزالة من السلة");
  };

  const clear = () => setItems([]);
  const has = (id: number) => items.includes(id);

  return (
    <CartContext.Provider value={{ items, add, remove, clear, has, count: items.length }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
