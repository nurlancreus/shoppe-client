// File: components/shared/dropdown.tsx

import clsx from "clsx";

type DropdownProps = {
  isOpened?: boolean;
  close: () => void;
  menu: Array<{
    id: number;
    icon?: React.JSX.Element;
    action: () => void;
    label: string;
  }>;
};

export default function Dropdown({
  isOpened = false,
  menu,
  close,
}: DropdownProps) {
  if (!isOpened) return null;

  return (
    <div className="relative">
      <div className="fixed inset-0 z-30" onClick={close} />

      <ul
        role="menu"
        className="absolute -left-10 top-full z-40 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
      >
        {menu.map((item) => (
          <li key={item.id} role="none">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                item.action();
                close();
              }}
              className={clsx("w-full rounded-md bg-white px-5 py-2 text-left text-h5-desktop transition hover:bg-light-gray focus:bg-light-gray focus:outline-none focus:ring-2 focus:ring-primary", item.icon && "flex items-center gap-4")}
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
