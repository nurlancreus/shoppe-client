import Link from "next/link";

export default function Logo() {
  return (
    <div className="font-allertaStencil text-4xl uppercase">
      <Link href="/">
        <span className="text-accent-custom">s</span>hoppe
      </Link>
    </div>
  );
}
