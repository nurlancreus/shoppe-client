import { getUser } from "@/utils/server-utils";
import Account from "./account";
import Cart from "./cart";
import Search from "./search";

export default function NavActions() {
const user = getUser();

  return (
    <div className="flex items-center gap-10">
      <Search />
      {/* <Cart /> */}
      <Account isAuth={user?.isAuth} userRoles={user?.roles}/>
    </div>
  );
}
