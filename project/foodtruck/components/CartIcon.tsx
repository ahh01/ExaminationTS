import React from "react";

interface CartIconProps {
  count: number;
  onClick?: () => void;
}

const CartIcon: React.FC<CartIconProps> = ({ count, onClick }) => (
  <div className="absolute top-4 right-4 cursor-pointer" onClick={onClick}>
    <div className="relative">
      <svg width={32} height={32} fill="white" viewBox="0 0 24 24">
        <path d="M7 18c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 0c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm-12.293-2.707l1.414 1.414c.195.195.451.293.707.293h12c.256 0 .512-.098.707-.293l1.414-1.414c.391-.391.391-1.023 0-1.414l-1.414-1.414c-.195-.195-.451-.293-.707-.293h-12c-.256 0-.512.098-.707.293l-1.414 1.414c-.391.391-.391 1.023 0 1.414z" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </div>
  </div>
);

export default CartIcon;
