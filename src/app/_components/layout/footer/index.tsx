import React from "react";
import Navbar from "./navbar";
import Search from "./search";
import Copyright from "./copyright";
import SocialMedias from "../../../../components/ui/social-medias";
import { SocialMedia } from "@/lib/types";

const socialMediaLinks = [
  {
    platform: "LinkedIn",
    url: "https://www.linkedin.com",
    ariaLabel: "LinkedIn",
  },
  {
    platform: "Facebook",
    url: "https://www.facebook.com",
    ariaLabel: "Facebook",
  },
  {
    platform: "Instagram",
    url: "https://www.instagram.com",
    ariaLabel: "Instagram",
  },
  { platform: "Twitter", url: "https://www.twitter.com", ariaLabel: "Twitter" },
];

export default function Footer() {
  return (
    <footer className="mb-[5.625rem] mt-64">
      <div className="container flex flex-col gap-12 border-t border-light-gray pt-9">
        <div className="flex items-center justify-between">
          <Navbar />
          <Search />
        </div>
        <div className="flex items-center justify-between">
          <Copyright />
          <SocialMedias socialMedias={socialMediaLinks as SocialMedia[]} />
        </div>
      </div>
    </footer>
  );
}
