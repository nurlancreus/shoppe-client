"use client";

type CartActionsProps = {
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
};

export default function CartActions({
  quantity,
  handleIncrement,
  handleDecrement,
}: CartActionsProps) {
  return (
    <div className="flex bg-light-gray text-dark-gray">
      <button className="p-4" onClick={handleDecrement}>
        -
      </button>
      <span className="flex items-center px-2">{quantity}</span>
      <button className="p-4" onClick={handleIncrement}>
        +
      </button>
    </div>
  );
}
