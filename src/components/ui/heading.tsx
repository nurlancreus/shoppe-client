import React from "react";

export default function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-h1-desktop font-semibold">{children}</h3>;
}
