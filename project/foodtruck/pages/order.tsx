// pages/order.tsx
import React, { useEffect, useState } from "react";
import { getOrders, createOrder } from "../services/api";
import { useOrder } from "../context/OrderContext";
import { useRouter } from "next/router";
import CartIcon from "../components/CartIcon";

const OrderPage: React.FC = () => {
  const { order, addToOrder, removeOneFromOrder, clearOrder } = useOrder();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const response = await getOrders();
        console.log("API-svar från getOrders:", response);
        if (response.orders?.length > 0) {
          clearOrder();
          // setOrder(response.orders[0]);
        } else {
          // setOrder(null);
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Ett okänt fel inträffade."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [clearOrder]);

  // Gruppera produkter på namn
  const grouped = order.reduce<
    Record<string, { item: (typeof order)[0]; count: number }>
  >((acc, item) => {
    if (acc[item.name]) {
      acc[item.name].count += 1;
    } else {
      acc[item.name] = { item, count: 1 };
    }
    return acc;
  }, {});

  const total = order.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleOrder = async () => {
    try {
      const items = order.map((item) => item.id);
      const response = await createOrder({ items });
      localStorage.setItem("orderId", response.order.id);
      clearOrder();
      router.push("/eta");
    } catch (err) {
      setError("Kunde inte skicka beställning!");
      console.error("Order error:", err);
    }
  };
  // Hantera laddning, fel och tom order
  if (loading) return <div className="p-4">Laddar beställning...</div>;
  if (error) return <div className="p-4 text-red-500">Fel: {error}</div>;
  if (!order || order.length === 0)
    return <div className="p-4">Ingen order hittades.</div>;

  return (
    <div className="bg-[#f5f5f5] min-h-screen flex flex-col items-center py-6 px-2">
      <div className="w-full max-w-xs bg-white rounded-xl shadow-lg p-4">
        {/* Cart header */}
        <div className="flex justify-between items-center mb-4">
          <div /> 
          <CartIcon count={0}/>
        </div>
        {/* Order items */}
        <div className="space-y-2">
          {Object.values(grouped).map(({ item, count }) => (
            <div key={item.id} className="pb-2">
              <div className="flex items-end w-full">
                <span className="font-bold text-base tracking-wide text-[#222] whitespace-nowrap">
                  {item.name}
                </span>
                <span className="flex-grow border-b border-dotted border-[#888] mx-2"></span>
                <span className="font-bold text-base text-[#222] whitespace-nowrap">
                  {item.price * count} SEK
                </span>
              </div>
              <div className="flex items-center text-xs text-[#888] mt-1">
                {/* Plus-knapp */}
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-[#dedede] hover:bg-[#bbb] mr-1"
                  onClick={() => addToOrder(item)}
                  aria-label="Öka antal"
                >
                  +
                </button>

                <span>{count} stycken</span>
                {/* Minus-knapp */}
                <button
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-[#dedede] hover:bg-[#bbb] ml-1"
                  onClick={() => removeOneFromOrder(item)}
                  aria-label="Minska antal"
                >
                  –
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Total */}
        <div className="bg-[#dedede] rounded mt-6 p-3 flex justify-between items-end">
          <div>
            <div className="font-bold text-xs text-[#444]">TOTALT</div>
            <div className="text-[10px] text-[#888]">inkl 20% moms</div>
          </div>
          <div className="text-2xl font-bold text-[#222]">{total} SEK</div>
        </div>
        {/* Button */}
        <button
          className="w-full mt-4 bg-[#383636] text-white font-bold py-3 rounded text-lg hover:bg-[#222] transition"
          onClick={handleOrder}
        >
          TAKE MY MONEY!
        </button>
      </div>
    </div>
  );
};

export default OrderPage;
