"use client";

import Image from "next/image";
import { Heart, ShoppingBag, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { products } from "@/lib/products";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";

export function WishlistSidebar() {
  const { isWishlistOpen, closeWishlist, wishlistIds, toggleWishlist, addItem } = useCartStore();
  const wishlistProducts = products.filter((product) => wishlistIds.includes(product.id));

  return (
    <AnimatePresence>
      {isWishlistOpen ? (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="fixed inset-0 z-[78] bg-slate-900/35"
            aria-label="Close wishlist overlay"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 z-[79] flex h-screen w-full max-w-md flex-col border-l border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-200 p-4">
              <h3 className="text-lg font-semibold text-slate-900">Wishlist</h3>
              <Button variant="ghost" size="icon" onClick={closeWishlist}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {wishlistProducts.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-600">
                  No items in wishlist yet.
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <article
                    key={product.id}
                    className="flex gap-3 rounded-2xl border border-slate-200 p-3"
                  >
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={90}
                      height={90}
                      className="h-20 w-20 rounded-xl object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {product.title}
                      </p>
                      <p className="mt-1 text-sm text-slate-600">${product.price}</p>
                      <div className="mt-2 flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            addItem(product);
                          }}
                        >
                          <ShoppingBag className="mr-1 h-3.5 w-3.5" />
                          Add
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleWishlist(product.id)}
                        >
                          <Heart className="mr-1 h-3.5 w-3.5" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
