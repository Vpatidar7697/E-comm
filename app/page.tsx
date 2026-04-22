import { CartSidebar } from "@/components/site/cart-sidebar";
import { FeaturedProducts } from "@/components/site/featured-products";
import { HeroSection } from "@/components/site/hero";
import { Navbar } from "@/components/site/navbar";
import { ProfileModal } from "@/components/site/profile-modal";
import { WishlistSidebar } from "@/components/site/wishlist-sidebar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HeroSection />
      <FeaturedProducts />
      <CartSidebar />
      <WishlistSidebar />
      <ProfileModal />
    </main>
  );
}
