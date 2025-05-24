import React, { useEffect, useState } from "react";
import { getOrderById } from "../services/api";
import Image from "next/image";
import { useRouter } from "next/router";

const EtaPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const orderId = localStorage.getItem("orderId");
    if (!orderId) return;

    getOrderById(orderId)
      .then((data) => {
        setOrder(data.order);
      })
      .finally(() => setLoading(false));
  }, []);

  function getEtaMinutes(eta: string) {
    const etaDate = new Date(eta);
    const now = new Date();
    const diff = Math.max(
      0,
      Math.round((etaDate.getTime() - now.getTime()) / 60000)
    );
    return diff;
  }

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Laddar...
      </div>
    );
  if (!order)
    return (
      <div className="flex justify-center items-center min-h-screen">
        Ingen order hittades.
      </div>
    );

  return (
    <div className="bg-[#5B5351] min-h-screen flex flex-col items-center justify-center p-2">
      <Image
        src="/boxtop.png"
        alt="Box"
        width={300}
        height={300}
        className="mb-6"
        priority
      />
      <h2 className="text-white text-2xl font-bold text-center mb-2">
        DINA WONTONS
        <br />
        TILLAGAS!
      </h2>
      <div className="text-white text-lg font-bold mb-1">
        ETA {getEtaMinutes(order.eta)} MIN
      </div>
      <div className="text-white text-sm font-bold mb-6 tracking-widest">
        #{order.id?.toUpperCase()}
      </div>
      <button
        className="w-full max-w-xs border border-white rounded-md py-2 text-white font-bold mb-3 transition hover:bg-white hover:text-[#5B5351]"
        onClick={() => router.push("/receipt")}
      >
        SE KVITTO
      </button>
      <button
        className="w-full max-w-xs bg-[#222] rounded-md py-2 text-white font-bold transition hover:bg-[#444]"
        onClick={() => router.push("/")}
      >
        GÖR EN NY BESTÄLLNING
      </button>
    </div>
  );
};

export default EtaPage;
