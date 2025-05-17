import React from "react";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-2 py-4">
      <h1 className="text-3xl text-black font-bold mb-8 text-center">
        Yum Yum Gim Mi Sum
      </h1>
      <button
        className="bg-gray-800 text-white rounded px-8 py-4 text-lg font-semibold shadow hover:bg-gray-700 transition"
        onClick={() => router.push("/menu")}
      >
        Beställ Här
      </button>
    </div>
  );
};

export default Home;
