import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "../types/types";

type OrderContextType = {
  order: MenuItem[];
  addToOrder: (item: MenuItem) => void;
  removeOneFromOrder: (item: MenuItem) => void; // Lägg till denna
  clearOrder: () => void;
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [order, setOrder] = useState<MenuItem[]>([]);

  const addToOrder = (item: MenuItem) => setOrder((prev) => [...prev, item]);
  const removeOneFromOrder = (item: MenuItem) => {
    setOrder((prev) => {
      const idx = prev.findIndex((i) => i.id === item.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy.splice(idx, 1);
        return copy;
      }
      return prev;
    });
  };
  const clearOrder = () => setOrder([]);

  return (
    <OrderContext.Provider
      value={{ order, addToOrder, removeOneFromOrder, clearOrder }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) throw new Error("useOrder must be used within OrderProvider");
  return context;
};
