"use client";
import IconButton from "@/components/shared/icon-button";
import SvgIcon from "@/components/shared/svg-icon";
import Button from "@/components/ui/button";
import { formatCurrency } from "@/utils/client-utils";

const cart = [2, 3, 4];

export default function Cart() {
  return (
    <>
      <IconButton onClick={() => console.log("cart")}>
        <SvgIcon id="shopping-cart" />
      </IconButton>
      <aside className="fixed flex gap-9 flex-col bottom-0 right-0 top-0 z-50 w-[22.5rem] border-l border-l-gray bg-white px-9 pb-6 pt-[4.5rem]">
        <h5 className="mb-4 text-h5-desktop">Shopping bag</h5>
        <div className="grow h-20 space-y-5">
          <p className="mb-1 text-body-small text-dark-gray">
            {cart.length} items
          </p>
          <div className="overflow-y-auto grow space-y-5 bg-red-400">
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
            <div className="h-28 bg-gray">

            </div>
          </div>
        </div>
        <div className="px-4 pt-5 text-h5-desktop">
          <div className="mb-5 flex items-center justify-between">
            <p>Subtotal ({cart.length} items)</p>
            <p>{formatCurrency(100)}</p>
          </div>
          <Button type="button" variant="outlined" className="uppercase w-full">
            View Cart
          </Button>
        </div>
      </aside>
    </>
  );
}
