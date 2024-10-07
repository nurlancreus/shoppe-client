import React from "react";
import Titles from "./titles";
import Nav from "./nav";

export default function Header() {
  return (
    <header className="mt-32">
      <Titles />
      <Nav/>
    </header>
  );
}
