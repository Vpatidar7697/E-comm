import type { Product } from "@/store/cart-store";

export const products: Product[] = [
  {
    id: "p1",
    title: "Classic Overshirt",
    category: "Apparel",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p2",
    title: "Signature Leather Tote",
    category: "Bags",
    price: 129,
    image:
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p3",
    title: "Minimal Timepiece",
    category: "Accessories",
    price: 149,
    image:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p4",
    title: "Urban Sneakers",
    category: "Footwear",
    price: 99,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p5",
    title: "Premium Hoodie",
    category: "Apparel",
    price: 89,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p6",
    title: "Tailored Trousers",
    category: "Apparel",
    price: 109,
    image:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p7",
    title: "Marble Desk Lamp",
    category: "Home",
    price: 119,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: "p8",
    title: "Scented Candle Set",
    category: "Home",
    price: 59,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=80",
  },
];

export const categories = ["All", ...new Set(products.map((product) => product.category))];
