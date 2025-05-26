import React, { useEffect, useState } from "react";
import { getOrderById } from "../services/api";
import { useRouter } from "next/router";
import Image from "next/image";

const ReceiptPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    if (!orderId) return;

    getOrderById(orderId)
      .then((data) => setOrder(data.order))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Laddar kvitto...
      </div>
    );
  if (!order)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Ingen order hittades.
      </div>
    );

  // Gruppera produkter på namn och räkna antal
  const grouped = order.items.reduce(
    (acc: Record<string, { item: any; count: number }>, item: any) => {
      if (acc[item.name]) {
        acc[item.name].count += 1;
      } else {
        acc[item.name] = { item, count: 1 };
      }
      return acc;
    },
    {}
  );

  return (
    <div className="bg-[#5B5351] min-h-screen flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-xs mx-auto">
        <div className="bg-white rounded shadow-lg flex flex-col items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={60}
            height={60}
            className="mb-2 mt-10"
            priority
          />
          <h2 className="text-black text-xl font-bold text-center tracking-wide">
            KVITTO
          </h2>
          <div className="text-xs text-gray-500 font-mono mb-4">
            #{order.id?.toUpperCase()}
          </div>
          <ul className="w-full mb-4 p-4">
            {Object.values(grouped).map(({ item, count }: any) => (
              <li key={item.id} className="mb-1">
                <div className="flex items-center font-bold text-sm text-black">
                  <span className="uppercase">{item.name}</span>
                  <span className="flex-grow border-b border-dotted border-black mx-2"></span>
                  <span className="tracking-wider">
                    {item.price * count} SEK
                  </span>
                </div>
                <div className="text-xs text-black mb-1">{count} stycken</div>
              </li>
            ))}
          </ul>
          <div className="w-full bg-[#d3d3d3] text-black rounded-b py-3">
            <div className="flex justify-between items-center px-4">
              <div className="flex flex-col">
                <span className="font-bold text-sm">TOTALT</span>
                <span className="text-xs text-gray-600">inkl 20% moms</span>
              </div>
              <span className="font-bold text-lg pt-1">{order.orderValue} SEK</span>
            </div>
          </div>
        </div>
        <button
          className="w-full mt-10 bg-[#222] rounded py-4 text-white font-bold transition hover:bg-[#444]"
          onClick={() => router.push("/")}
        >
          GÖR EN NY BESTÄLLNING
        </button>
      </div>
    </div>
  );
};

export default ReceiptPage;
