import Link from "next/link";

type ShopHeaderProps = {
  title: string;
  href: string;
};

export default function ShopHeader({ title, href }: ShopHeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <h3 className="text-h1-desktop font-medium">{title}</h3>
      <Link href={href} className="text-h4-desktop font-medium text-accent">
        View All
      </Link>
    </header>
  );
}
