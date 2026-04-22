"use client";

import { useState } from "react";
import { UserRound, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCartStore } from "@/store/cart-store";

export function ProfileModal() {
  const { isProfileOpen, closeProfile } = useCartStore();
  const [name, setName] = useState("LUXE Customer");
  const [email, setEmail] = useState("customer@luxe.com");

  return (
    <AnimatePresence>
      {isProfileOpen ? (
        <>
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProfile}
            className="fixed inset-0 z-[82] bg-slate-900/35"
            aria-label="Close profile overlay"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            className="fixed left-1/2 top-1/2 z-[83] w-[92%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <UserRound className="h-4 w-4" />
                Profile
              </h3>
              <Button variant="ghost" size="icon" onClick={closeProfile}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-3">
              <Input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
              />
              <Input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                type="email"
              />
              <Button className="w-full" onClick={closeProfile}>
                Save Profile
              </Button>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
