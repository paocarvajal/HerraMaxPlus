import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import Catalog from "./pages/Catalog";
import Rental from "./pages/Rental";
import Workshops from "./pages/Workshops";
import Blog from "./pages/Blog";
import B2B from "./pages/B2B";
import Cart from "./pages/Cart";
import Loyalty from "./pages/Loyalty";
import ProductDetail from "./pages/ProductDetail";
import Contractors from "./pages/Contractors";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Navbar />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/renta" element={<Rental />} />
              <Route path="/talleres" element={<Workshops />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/b2b" element={<B2B />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/lealtad" element={<Loyalty />} />
              <Route path="/producto/:id" element={<ProductDetail />} />
              <Route path="/contratistas" element={<Contractors />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
