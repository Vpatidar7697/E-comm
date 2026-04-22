"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  UserRound,
  Heart,
  X,
  ChevronRight,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useCartStore } from "@/store/cart-store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const items = useCartStore((state) => state.items);
  const wishlistCount = useCartStore((state) => state.wishlistIds.length);
  const searchQuery = useCartStore((state) => state.searchQuery);
  const setSearchQuery = useCartStore((state) => state.setSearchQuery);
  const openCart = useCartStore((state) => state.openCart);
  const openWishlist = useCartStore((state) => state.openWishlist);
  const openProfile = useCartStore((state) => state.openProfile);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="container flex h-20 items-center justify-between gap-3">
          <Link href="/" className="group flex items-center gap-2">
            <div className="rounded-xl bg-slate-900 px-3 py-2 text-xs font-semibold tracking-wider text-white transition-transform duration-300 group-hover:scale-105">
              LUXE
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">
              Commerce
            </span>
          </Link>

          <div className="relative hidden w-full max-w-xl md:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search premium essentials..."
              className="h-11 rounded-2xl border-slate-200 bg-white pl-9 pr-3 shadow-sm"
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl"
              onClick={openProfile}
            >
              <UserRound className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl"
              onClick={openWishlist}
            >
              <Heart className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 min-w-5 justify-center px-1">
                {wishlistCount}
              </Badge>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl"
              onClick={openCart}
            >
              <ShoppingBag className="h-4 w-4" />
              <Badge className="absolute -right-1 -top-1 min-w-5 justify-center px-1">
                {itemCount}
              </Badge>
            </Button>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="rounded-xl md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-slate-900/35 md:hidden"
              aria-label="Close menu overlay"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              className="fixed right-0 top-0 z-[70] h-screen w-[86%] max-w-sm border-l border-slate-200 bg-white p-5 md:hidden"
            >
              <div className="mb-6 flex items-center justify-between">
                <p className="text-lg font-semibold text-slate-900">Menu</p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <div className="relative mb-5">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search products..."
                  className="h-11 rounded-xl border-slate-200 pl-9"
                />
              </div>

              <div className="space-y-2">
                {[
                  { label: "Profile", icon: UserRound, count: 0 },
                  { label: "Wishlist", icon: Heart, count: wishlistCount },
                  { label: "Cart", icon: ShoppingBag, count: itemCount },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (item.label === "Cart") openCart();
                      if (item.label === "Wishlist") openWishlist();
                      if (item.label === "Profile") openProfile();
                    }}
                    className="flex w-full items-center justify-between rounded-xl border border-slate-200 p-3 text-left transition hover:bg-slate-50"
                  >
                    <span className="flex items-center gap-2 text-sm font-medium text-slate-800">
                      <item.icon className="h-4 w-4" />
                      {item.label}
                    </span>
                    <span className="flex items-center gap-2">
                      <Badge variant="secondary">{item.count}</Badge>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </span>
                  </button>
                ))}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
