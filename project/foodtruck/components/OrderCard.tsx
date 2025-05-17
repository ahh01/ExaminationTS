import React from "react";
import { OrderItem } from "../types/types";

interface OrderCardProps {
  item: OrderItem;
}

const OrderCard: React.FC<OrderCardProps> = ({ item }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 mb-4">
      <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
      <p className="text-gray-600 mb-2">{item.description}</p>
      <p className="text-gray-800 mb-1">
        <span className="font-medium">Pris:</span> {item.price} kr
      </p>
      <p className="text-gray-800">
        <span className="font-medium">Ingredienser:</span>{" "}
        {item.ingredients.join(", ")}
      </p>
    </div>
  );
};

export default OrderCard;
