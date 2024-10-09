"use client";

import React, { useState } from "react";
import AddressForm from "./address-form";

type AddressProps = {
  title: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  address: any;
};

export default function Address({ title, address }: AddressProps) {
  const [isAddingAddress, setIsAddingAddress] = useState(true);

  const handleCloseForm = () => setIsAddingAddress(false);

  return (
    <article>
      <h5 className="mb-6 text-h3-desktop capitalize">{title}</h5>
      {!address && !isAddingAddress && (
        <div>
          <button
            className="text-body-large font-bold uppercase text-accent"
            onClick={() => setIsAddingAddress(true)}
          >
            {" "}
            Add
          </button>
          <p className="mt-3 text-body-medium">
            You have not set up this type of address yet.
          </p>
        </div>
      )}
      {isAddingAddress && (
        <AddressForm
          name={title === "billing address" ? "add-billing" : "add-shiping"}
          closeForm={handleCloseForm}
        />
      )}
    </article>
  );
}
