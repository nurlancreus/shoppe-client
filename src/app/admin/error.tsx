"use client";

import { useEffect } from "react";
import { Button } from "./_components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error:", error);
  }, [error]);

  return (
    <div className="bg-gray-100 flex h-screen flex-col items-center mt-52">
      <h2 className="text-4xl font-bold text-red-600">Something went wrong!</h2>
      <p className="text-gray-700 mt-4 text-lg">{error.message}</p>
      <Button
        className="mt-6"
        onClick={() => reset()} // Attempt to recover by trying to re-render the segment
      >
        Try Again
      </Button>
    </div>
  );
}
