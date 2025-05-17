import React, { useEffect, useState } from "react";
import { getMenu } from "../services/api";
import { MenuItem } from "../types/types";
import CartIcon from "../components/CartIcon";
import { useRouter } from "next/router";
import { useOrder } from "../context/OrderContext";

const MenuPage: React.FC = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const { order, addToOrder } = useOrder();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    getMenu()
      .then((data) => setMenu(data.items || data))
      .catch(() => setError("Kunde inte hämta meny"))
      .finally(() => setLoading(false));
  }, []);

  const wonton = menu.filter((item) => item.type === "wonton");
  const dips = menu.filter((item) => item.type === "dip");
  const drinks = menu.filter((item) => item.type === "drink");

  if (loading) return <div>Laddar meny...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-[#4B8A76] flex flex-col items-start py-6 px-2">
      {/* Huvudrubrik */}
      <h1 className="text-white text-2xl font-bold mb-2 ml-2">MENY</h1>
      <div className="w-full max-w-xs space-y-6 ml-2">
        {/* Wonton kort */}
        <div className="bg-[#5e5a5a] rounded-xl p-6 w-full">
          {wonton.map((item, idx) => (
            <React.Fragment key={item.id}>
              <div
                className="mb-4 hover:bg-[#383636] transition duration-200 rounded px-2 py-1 cursor-pointer"
                onClick={() => addToOrder(item)}
              >
                <div className="flex items-center w-full">
                  <span className="font-bold text-base tracking-wide text-white">
                    {item.name}
                  </span>
                  <span className="flex-grow border-b border-dotted border-white mx-2 pb-3"></span>
                  <span className="font-bold text-base text-white">
                    {item.price} SEK
                  </span>
                </div>
                <div className="text-white text-xs">
                  {Array.isArray(item.ingredients)
                    ? item.ingredients.join(", ")
                    : item.ingredients}
                </div>
              </div>
              {/* Prickad linje mellan items, ej efter sista */}
              {idx < wonton.length - 1 && (
                <div className="border-b border-dotted border-white opacity-40 w-full" />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Dipsås kort */}
        <div className="bg-[#5e5a5a] rounded-xl shadow-lg p-4">
          <div className="flex items-center mb-2 w-full">
            <h2 className="text-white text-lg font-bold text-shadow-sm whitespace-nowrap">
              DIPSÅS
            </h2>
            <span className="flex-grow border-b border-dotted border-white mx-2 pb-3"></span>
            <span className="text-white font-bold text-shadow-lg whitespace-nowrap">
              {dips[0]?.price ? `${dips[0].price} SEK` : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {dips.map((item) => (
              <span
                key={item.id}
                className="bg-[#969393] text-white rounded px-2 py-1 text-xs font-semibold hover:bg-[#383636] transition duration-200 cursor-pointer"
                onClick={() => addToOrder(item)}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* Dricka kort */}
        <div className="bg-[#5e5a5a] rounded-xl shadow-lg p-4">
          <div className="flex items-center mb-2 w-full">
            <h2 className="text-white text-lg font-bold whitespace-nowrap">
              DRICKA
            </h2>
            <span className="flex-grow border-b border-dotted border-white mx-2 pb-3"></span>
            <span className="text-white font-bold whitespace-nowrap">
              {drinks[0]?.price ? `${drinks[0].price} SEK` : ""}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {drinks.map((item) => (
              <span
                key={item.id}
                className="bg-[#969393] text-white rounded px-2 py-1 text-xs font-semibold hover:bg-[#383636] transition duration-200 cursor-pointer"
                onClick={() => addToOrder(item)}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </div>
      <CartIcon count={order.length} onClick={() => router.push("/order")} />
    </div>
  );
};

export default MenuPage;
