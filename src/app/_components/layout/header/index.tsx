import Logo from "@/components/ui/logo";
import Navbar from "./navbar";

export default function Header() {
  return (
    <header className="pt-16">
      <div className="container flex items-center justify-between">
        <Logo />
        <Navbar />
      </div>
    </header>
  );
}
