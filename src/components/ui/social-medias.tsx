import SvgIcon from "@/components/shared/svg-icon";
import { type SocialMedia } from "@/types";
import Link from "next/link";

type SocialMediasProps = {
  socialMedias: SocialMedia[];
};

export default function SocialMedias({ socialMedias }: SocialMediasProps) {
  const renderIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "linkedin":
        return "linkedin";
      case "facebook":
        return "facebook";
      case "instagram":
        return "instagram";
      case "twitter":
        return "twitter";
      default:
        return "letter"; 
    }
  };

  return (
    <ul className="flex space-x-4">
      {socialMedias.map((media) => (
        <li key={media.platform} className="group">
          <Link href={media.url} target="_blank" aria-label={media.ariaLabel}>
            <SvgIcon
              id={renderIcon(media.platform)}
              className="group-hover:text-black"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
