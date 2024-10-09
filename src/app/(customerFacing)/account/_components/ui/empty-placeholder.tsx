import Link from "next/link";

type EmptyNotificationProps = {
  message: string;
  text: string;
  href: string;
};

export default function EmptyPlaceholder({
  message,
  text,
  href,
}: EmptyNotificationProps) {
  return (
    <div className="flex items-center justify-between border-t-2 border-t-accent bg-light-gray px-10 py-5">
      <p className="text-h5-desktop">{message}</p>
      <Link href={href} className="text-body-large font-bold text-accent">
        {text}
      </Link>
    </div>
  );
}
