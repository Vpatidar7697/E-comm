"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Filter, Heart, Search, SlidersHorizontal, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { categories, products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";

function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  maxPrice,
  setMaxPrice,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
}) {
  return (
    <aside className="h-fit space-y-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <Filter className="h-4 w-4 text-slate-500" />
        <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Category
        </p>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm transition",
                selectedCategory === category
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-slate-200 text-slate-700 hover:bg-slate-50"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
          Max Price
        </p>
        <input
          type="range"
          min={50}
          max={160}
          step={1}
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-indigo-500"
        />
        <p className="mt-2 text-sm text-slate-700">Up to ${maxPrice}</p>
      </div>
    </aside>
  );
}

export function FeaturedProducts() {
  const {
    addItem,
    toggleWishlist,
    wishlistIds,
    isFilterOpen,
    openFilter,
    closeFilter,
    searchQuery,
    setSearchQuery,
  } = useCartStore();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(160);

  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const categoryMatch =
          selectedCategory === "All" || product.category === selectedCategory;
        const priceMatch = product.price <= maxPrice;
        const searchMatch = product.title
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase());
        return categoryMatch && priceMatch && searchMatch;
      }),
    [maxPrice, searchQuery, selectedCategory]
  );

  const ratingArray = [1, 2, 3, 4, 5];

  return (
    <section id="shop-now" className="container py-12 md:py-16">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4 md:mb-10">
        <div>
          <p className="text-sm font-medium text-primary">Featured Products</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
            Curated picks with premium quality
          </h2>
        </div>
        <Button
          variant="outline"
          className="md:hidden"
          onClick={openFilter}
          aria-label="Open filters"
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="mb-5 flex items-center rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm md:ml-[17.6rem]">
        <Search className="mr-2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Search in featured products..."
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-[280px_1fr]">
        <div className="hidden md:block">
          <ProductFilters
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => {
            const wished = wishlistIds.includes(product.id);
            return (
              <motion.article
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={900}
                    height={700}
                    className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={cn(
                      "absolute left-3 top-3 rounded-full border p-2 backdrop-blur transition",
                      wished
                        ? "border-rose-200 bg-rose-100 text-rose-600"
                        : "border-white/80 bg-white/85 text-slate-600 hover:text-rose-600"
                    )}
                    aria-label="Toggle wishlist"
                  >
                    <Heart className={cn("h-4 w-4", wished ? "fill-current" : "")} />
                  </button>

                  <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900 shadow-sm">
                    ${product.price}
                  </span>

                  <button className="absolute bottom-3 right-3 translate-y-2 rounded-full bg-white px-3 py-1.5 text-xs font-medium text-slate-700 opacity-0 shadow-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                    Quick View
                  </button>
                </div>

                <div className="space-y-3 p-5">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      {product.category}
                    </p>
                    <h3 className="text-lg font-semibold text-slate-900">{product.title}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    {ratingArray.map((star) => (
                      <Star
                        key={star}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                        aria-hidden
                      />
                    ))}
                    <span className="ml-1 text-xs text-slate-500">(128)</span>
                  </div>
                  <Button className="w-full" onClick={() => addItem(product)}>
                    Add to Cart
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {isFilterOpen ? (
        <>
          <button
            onClick={closeFilter}
            className="fixed inset-0 z-[65] bg-slate-900/35 md:hidden"
            aria-label="Close filter overlay"
          />
          <div className="fixed left-0 top-0 z-[70] h-screen w-[82%] max-w-xs border-r border-slate-200 bg-white p-4 md:hidden">
            <ProductFilters
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
            />
            <Button className="mt-3 w-full" onClick={closeFilter}>
              Apply Filters
            </Button>
          </div>
        </>
      ) : null}
    </section>
  );
}
