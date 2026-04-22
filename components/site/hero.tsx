"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-14 md:py-20">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(79,70,229,0.12),transparent_60%)]" />

      <div className="container grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
            Curated essentials for modern living
          </div>

          <h1 className="text-balance text-4xl font-semibold leading-tight tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
            Elevate your everyday style with timeless premium picks.
          </h1>
          <p className="max-w-xl text-base text-slate-600 md:text-lg">
            Discover beautifully crafted pieces that blend minimal design,
            comfort, and quality. Built for those who value understated luxury.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="group">
              <Link href="#shop-now">
                Shop Now
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#shop-now">Explore Collection</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="relative mx-auto w-full max-w-2xl"
        >
          <div className="absolute -inset-3 -z-10 rounded-[2rem] bg-gradient-to-tr from-indigo-100 via-white to-slate-100 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white p-2 shadow-2xl shadow-slate-900/10">
            <Image
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=1600&q=80"
              alt="Premium fashion showcase"
              width={1200}
              height={800}
              priority
              className="h-[420px] w-full rounded-[1.5rem] object-cover md:h-[520px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
