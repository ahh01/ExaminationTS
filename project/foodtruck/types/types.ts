// types.ts
export interface OrderItem {
  id: number;
  type: string;
  name: string;
  description: string;
  ingredients: string[];
  price: number;
}

export interface Order {
  id: string;
  timestamp: string;
  items: OrderItem[];
  orderValue: number;
  eta: string;
  state: "waiting" | "inProgress" | "done";
}

export interface OrderResponse {
  order: Order;
}

export interface MenuItem {
  id: number;
  type: string;
  name: string;
  description?: string;
  ingredients: string[]; // alltid array!
  price: number;
}
