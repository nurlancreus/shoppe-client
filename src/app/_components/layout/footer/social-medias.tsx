import SvgIcon from "@/components/shared/svg-icon";
import Link from "next/link";

export default function SocialMedias() {
  return (
    <ul className="flex space-x-4">
      <li>
        <Link
          href="https://www.linkedin.com"
          target="_blank"
          aria-label="LinkedIn"
        >
          <SvgIcon id="linkedin" className="hover:text-black" />
        </Link>
      </li>
      <li>
        <Link
          href="https://www.facebook.com"
          target="_blank"
          aria-label="Facebook"
        >
          <SvgIcon id="facebook" className="hover:text-black" />
        </Link>
      </li>
      <li>
        <Link
          href="https://www.instagram.com"
          target="_blank"
          aria-label="Instagram"
        >
          <SvgIcon id="instagram" className="hover:text-black" />
        </Link>
      </li>
      <li>
        <Link
          href="https://www.twitter.com"
          target="_blank"
          aria-label="Twitter"
        >
          <SvgIcon id="twitter" className="hover:text-black" />
        </Link>
      </li>
    </ul>
  );
}
