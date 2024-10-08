import React from "react";
import Address from "../_components/pages/addresses/address";

export default function AddressesPage() {
  return (
    <div>
      <h3 className="mb-11 text-h5-desktop">
        The following addresses will be used on the checkout page by default.
      </h3>
      <div className="flex items-start gap-20 [&>article]:flex-1">
        <Address title="billing address" address={null} />
        <Address title="shipping address" address={null} />
      </div>
    </div>
  );
}
