import React from "react";
import Navbar from "./navbar";
import Search from "./search";
import Copyright from "./copyright";
import SocialMedias from "./social-medias";

export default function Footer() {
  return (
    <footer className="mb-[5.625rem]">
      <div className="container flex flex-col gap-12 border-t border-light-gray pt-9">
        <div className="flex items-center justify-between">
          <Navbar />
          <Search />
        </div>
        <div className="flex items-center justify-between">
          <Copyright />
          <SocialMedias />
        </div>
      </div>
    </footer>
  );
}
