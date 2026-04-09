import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="section-padding text-center">
        <div className="container max-w-md mx-auto">
          <ShoppingBag className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="font-display text-3xl mb-2">CARRITO VACÍO</h1>
          <p className="text-muted-foreground mb-6">Agrega productos desde nuestra tienda.</p>
          <Link to="/catalogo">
            <Button className="amber-gradient text-primary-foreground hover:opacity-90">Ir a la Tienda</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container max-w-3xl">
        <h1 className="font-display text-4xl mb-6">CARRITO</h1>

        <div className="space-y-4 mb-8">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="flex gap-4 bg-card border border-border rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded" />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <p className="font-bold mt-1">${(product.price * quantity).toLocaleString()}</p>
              </div>
              <div className="flex flex-col items-end justify-between">
                <button onClick={() => removeFromCart(product.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 border border-border rounded">
                  <button onClick={() => updateQuantity(product.id, quantity - 1)} className="p-1 hover:bg-muted rounded-l">
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-sm font-medium w-6 text-center">{quantity}</span>
                  <button onClick={() => updateQuantity(product.id, quantity + 1)} className="p-1 hover:bg-muted rounded-r">
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-bold text-lg">${totalPrice.toLocaleString()} MXN</span>
          </div>
          <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
            <span>Envío</span>
            <span>Calculado al pagar</span>
          </div>
          <Button className="w-full amber-gradient text-primary-foreground hover:opacity-90 font-semibold mb-3" size="lg">
            Proceder al Pago
          </Button>
          <button onClick={clearCart} className="w-full text-center text-sm text-muted-foreground hover:text-destructive transition-colors">
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
