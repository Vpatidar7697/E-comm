"use client";

import Image from "next/image";
import { useMemo } from "react";
import { Minus, Plus, ShieldCheck, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function CartSidebar() {
  const { isCartOpen, closeCart, items, removeItem, addItem, decreaseItem } = useCartStore();

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return (
    <AnimatePresence>
      {isCartOpen ? (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[70] bg-slate-900/35"
            aria-label="Close cart overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 z-[80] flex h-screen w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h3 className="text-lg font-semibold text-slate-900">Your Cart</h3>
              <Button variant="ghost" size="icon" onClick={closeCart}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
                  Your cart is empty.
                </div>
              ) : (
                items.map((item) => (
                  <article
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-slate-200 p-3"
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={90}
                      height={90}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">${item.price}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() => decreaseItem(item.id)}
                          className="rounded-lg border border-slate-200 p-1.5 text-slate-700 transition hover:bg-slate-50"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-6 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => addItem(item)}
                          className="rounded-lg border border-slate-200 p-1.5 text-slate-700 transition hover:bg-slate-50"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="mt-2 w-fit text-xs font-medium text-red-600 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                ))
              )}

              <div id="explore-collection" className="rounded-2xl border border-slate-200 p-4">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Items</span>
                  <span>{itemCount}</span>
                </div>
                <div className="mt-2 flex items-center justify-between text-base font-semibold text-slate-900">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <Button className="mt-4 w-full" disabled={items.length === 0}>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Secure Checkout
                </Button>
              </div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
