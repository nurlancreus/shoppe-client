import { NavLink } from "../../../../../components/shared/nav-link";

const NAVIGATION_ROUTES = [
  {
    id: 7,
    path: "/contact",
    text: "Contact",
  },
  {
    id: 8,
    path: "/teams-of-services",
    text: "Teams of Services",
  },
  {
    id: 9,
    path: "/shipping",
    text: "Shipping and Returns",
  },
];

export default function Navbar() {
  return (
    <nav>
      <ul className="flex items-center gap-10">
        {NAVIGATION_ROUTES.map((nav_route) => (
          <li key={nav_route.id}>
            <NavLink variant="footer" href={nav_route.path}>
              {nav_route.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
