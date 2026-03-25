"use client";

import CartItem, { type CartItemData } from "@/components/features/cart/cart-item";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores";
import formatMoney from "@/utils/formatMoney";
import { useMemo } from "react";

type CartItemsProps = {
  onCheckout?: (items: CartItemData[]) => void;
  className?: string;
};

function toNumber(value: string | number) {
  if (typeof value === "number") return value;
  const normalized = value.replace(/,/g, "").trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function CartItems({
  onCheckout,
  className = "",
}: CartItemsProps) {
  const items = useCartStore((state) => state.items);
  const removeCourse = useCartStore((state) => state.removeCourse);

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + toNumber(item.price), 0),
    [items]
  );

  const handleRemoveItem = (id: string) => {
    removeCourse(id);
  };

  return (
    <section className={["w-full space-y-6", className].join(" ").trim()}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[20px] font-semibold text-neutral-900 border-b pb-3.4 border-neutral-500 w-full ">{items.length} {items.length === 1 ? "Course" : "Courses"} in Cart</h2>
        {/* <span className="text-sm text-neutral-600">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span> */}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 px-6 py-10 text-center">
          <p className="text-base font-medium text-neutral-900">Your cart is empty</p>
          <p className="mt-1 text-sm text-neutral-600">
            Add a course to continue to checkout.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 items-stretch">
          {items.map((item) => (
            <CartItem key={item._id} {...item} onRemove={handleRemoveItem} />
          ))}
        </div>
      )}

      <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl border border-neutral-200 p-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-neutral-600">Total</p>
          <p className="text-xl font-semibold text-neutral-900">
            &#8358;{formatMoney(totalPrice)}
          </p>
        </div>
        <Button
          type="button"
          disabled={items.length === 0}
          onClick={() => onCheckout?.(items)}
          className="w-full sm:w-auto"
        >
          Checkout ({items.length})
        </Button>
      </div>
    </section>
  );
}
