import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Catalog = () => {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get("categoria") || "";
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCat);
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase());
      const matchCat = !selectedCategory || p.category === selectedCategory;
      return matchSearch && matchCat;
    });
  }, [search, selectedCategory]);

  return (
    <div className="section-padding">
      <div className="container">
        <h1 className="font-display text-4xl md:text-5xl mb-6">TIENDA</h1>

        {/* Search */}
        <div className="flex gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar herramientas, materiales..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="md:hidden">
            <SlidersHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Sidebar filters */}
          <aside className={`${showFilters ? "block" : "hidden"} md:block w-full md:w-56 shrink-0`}>
            <h3 className="font-display text-lg mb-3">CATEGORÍAS</h3>
            <div className="space-y-1">
              <button
                onClick={() => setSelectedCategory("")}
                className={`block w-full text-left text-sm px-3 py-2 rounded transition-colors ${!selectedCategory ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
              >
                Todas ({products.length})
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`block w-full text-left text-sm px-3 py-2 rounded transition-colors ${selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Products grid */}
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-4">{filtered.length} productos encontrados</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No se encontraron productos. Intenta con otro término de búsqueda.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
