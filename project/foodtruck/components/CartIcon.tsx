import React from "react";
import Image from "next/image";

interface CartIconProps {
  count: number;
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ count, onClick }) => (
  <div className="cursor-pointer" onClick={onClick}>
    <div className="relative">
      <Image
        src="/cart.svg"
        alt="Cart"
        width={40}
        height={340}
        className=" bg-white rounded p-2" />
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </div>
  </div>
);

export default CartIcon;
