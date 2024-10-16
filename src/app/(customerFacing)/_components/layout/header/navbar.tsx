import { NavLink } from "../../../../../components/shared/nav-link";
import NavActions from "./nav-actions";

const NAVIGATION_ROUTES = [
  {
    id: 1,
    path: "/shop",
    label: "Shop",
  },
  {
    id: 2,
    path: "/blogs",
    label: "Blog",
  },
  {
    id: 3,
    path: "/about",
    label: "Our Story",
  },
  {
    id: 4,
    path: "/contact",
    label: "Contact Us",
  },
];

export default function Navbar() {
  return (
    <nav className="flex items-center gap-12">
      <ul className="flex items-center gap-16">
        {NAVIGATION_ROUTES.map((nav_route) => (
          <li key={nav_route.id}>
            <NavLink href={nav_route.path} variant="header">
              {nav_route.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="h-4 w-[.0625rem] bg-black" />
      <NavActions />
    </nav>
  );
}
