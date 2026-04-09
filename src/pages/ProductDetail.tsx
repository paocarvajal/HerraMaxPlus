import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, ShoppingCart, Truck, Shield, RotateCcw, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { products, categories } from "@/data/products";
import { useCart } from "@/context/CartContext";
import ProductCard from "@/components/ProductCard";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useState } from "react";

const mockGallery = (mainImage: string) => [
  mainImage,
  "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=600",
  "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600",
  "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600",
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(product?.variants?.[0]?.id || null);

  if (!product) {
    return (
      <div className="container section-padding text-center">
        <h2 className="font-display text-3xl mb-4">Producto no encontrado</h2>
        <Link to="/catalogo">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Volver al catálogo
          </Button>
        </Link>
      </div>
    );
  }

  const currentVariant = product.variants?.find(v => v.id === selectedVariantId) || null;
  const displayPrice = currentVariant?.price || product.price;
  const displayOriginalPrice = currentVariant?.originalPrice || product.originalPrice;
  const displayName = currentVariant ? `${product.name} - ${currentVariant.name}` : product.name;

  // if variant has specific image, put it first
  const displayImage = currentVariant?.image || product.image;
  const gallery = mockGallery(displayImage);

  const categoryObj = categories.find((c) => c.id === product.category);
  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    const productToAdd = currentVariant
      ? { ...product, id: currentVariant.id, name: displayName, price: displayPrice, image: displayImage }
      : product;

    for (let i = 0; i < qty; i++) addToCart(productToAdd);
    toast.success(`${qty}x ${displayName} agregado al carrito`);
  };

  return (
    <div className="container section-padding">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Inicio</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/catalogo" className="hover:text-foreground">Catálogo</Link>
        <ChevronRight className="w-3 h-3" />
        {categoryObj && (
          <>
            <Link to={`/catalogo?categoria=${categoryObj.id}`} className="hover:text-foreground">{categoryObj.name}</Link>
            <ChevronRight className="w-3 h-3" />
          </>
        )}
        <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Gallery */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="relative aspect-square rounded-lg overflow-hidden bg-muted mb-3">
            <img
              src={gallery[selectedImage]}
              alt={displayName}
              className="w-full h-full object-cover"
            />
            {displayOriginalPrice && (
              <Badge className="absolute top-3 left-3 amber-gradient text-primary-foreground border-0 text-sm">
                -{Math.round((1 - displayPrice / displayOriginalPrice) * 100)}% OFF
              </Badge>
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {gallery.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-md overflow-hidden border-2 transition-all ${selectedImage === i ? "border-primary" : "border-border hover:border-muted-foreground"
                  }`}
              >
                <img src={img} alt={`Vista ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
          <p className="text-sm text-muted-foreground mb-1">{product.brand}</p>
          <h1 className="font-display text-3xl md:text-4xl mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">{product.rating} / 5</span>
          </div>

          <div className="flex items-baseline gap-3 mb-6">
            <span className="text-4xl font-bold">${displayPrice.toLocaleString()}</span>
            {displayOriginalPrice && (
              <span className="text-lg text-muted-foreground line-through">${displayOriginalPrice.toLocaleString()}</span>
            )}
          </div>

          {product.variants && product.variants.length > 0 && (
            <div className="mb-6">
              <p className="font-semibold mb-2">{product.variantLabel || "Opciones"}:</p>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <Button
                    key={v.id}
                    variant={selectedVariantId === v.id ? "default" : "outline"}
                    className={selectedVariantId === v.id ? "amber-gradient border-0" : ""}
                    onClick={() => {
                      setSelectedVariantId(v.id);
                      setSelectedImage(0); // reset image gallery to show variant
                    }}
                  >
                    {v.name}
                  </Button>
                ))}
              </div>
            </div>
          )}

          <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

          <div className="mb-6 space-y-2 text-sm">
            <p><span className="font-semibold">Categoría:</span> {categoryObj?.name}</p>
            <p><span className="font-semibold">Marca:</span> {product.brand}</p>
            <p><span className="font-semibold">Disponibilidad:</span>{" "}
              <span className={product.inStock ? "text-green-600" : "text-destructive"}>
                {product.inStock ? "En stock" : "Agotado"}
              </span>
            </p>
          </div>

          <Separator className="mb-6" />

          {/* Quantity + Add to Cart */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-border rounded-md">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-2 hover:bg-muted transition-colors">−</button>
              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-2 hover:bg-muted transition-colors">+</button>
            </div>
            <Button onClick={handleAdd} size="lg" className="flex-1 amber-gradient text-primary-foreground hover:opacity-90 font-semibold" disabled={!product.inStock}>
              <ShoppingCart className="w-5 h-5 mr-2" /> Agregar al Carrito
            </Button>
          </div>

          {/* Perks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: Truck, label: "Entrega express disponible" },
              { icon: Shield, label: "Garantía de producto" },
              { icon: RotateCcw, label: "Devolución en 30 días" },
            ].map((perk) => (
              <div key={perk.label} className="flex items-center gap-2 text-xs text-muted-foreground bg-muted/50 rounded-md p-3">
                <perk.icon className="w-4 h-4 text-primary shrink-0" />
                <span>{perk.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display text-2xl md:text-3xl mb-6">PRODUCTOS RELACIONADOS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <Link key={p.id} to={`/producto/${p.id}`}>
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
