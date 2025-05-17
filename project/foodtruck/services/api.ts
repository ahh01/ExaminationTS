// services/api.ts
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";
const TENANT_ID = process.env.NEXT_PUBLIC_TENANT_ID || "";

// Hämta meny
export const getMenu = async () => {
  const response = await fetch(`${BASE_URL}/menu`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": API_KEY,
    },
  });
  if (!response.ok) throw new Error("Kunde inte hämta meny");
  return response.json();
};

// Hämta alla ordrar för en tenant
export const getOrders = async () => {
  const response = await fetch(`${BASE_URL}/${TENANT_ID}/orders`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": API_KEY,
    },
  });
  if (!response.ok) throw new Error("Kunde inte hämta ordrar");
  return response.json();
};

// Skapa en order
export const createOrder = async (orderData: any) => {
  const response = await fetch(`${BASE_URL}/${TENANT_ID}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": API_KEY,
    },
    body: JSON.stringify(orderData),
  });
  if (!response.ok) throw new Error("Kunde inte skapa order");
  return response.json();
};

// Hämta kvitto
export const getReceipt = async (orderId: string) => {
  const response = await fetch(`${BASE_URL}/receipts/${orderId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-zocom": API_KEY,
    },
  });
  if (!response.ok) throw new Error("Kunde inte hämta kvitto");
  return response.json();
};
