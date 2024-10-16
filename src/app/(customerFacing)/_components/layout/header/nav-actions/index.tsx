import { getSession } from "@/lib/helpers/server-helpers";
import Account from "./account";
import Cart from "./cart";
import Search from "./search";

export default function NavActions() {
  const session = getSession();

  return (
    <div className="flex items-center gap-10">
      <Search />
      <Cart />
      <Account isAuth={session?.isAuth} userRoles={session?.user?.roles} />
    </div>
  );
}
