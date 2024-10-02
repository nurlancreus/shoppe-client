type TabButtonProps = {
  text: string;
  value: string;
  isActive: boolean;
  onClick: () => void;
};

export default function TabButton({ text, isActive, onClick }: TabButtonProps) {
  return (
    <button
      className={`border-b px-4 pb-8 transition duration-300 ${isActive ? "border-b-black text-black" : "border-b-transparent text-dark-gray"}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
