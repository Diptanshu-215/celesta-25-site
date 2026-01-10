import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { toast } from "react-hot-toast";

export default function ProductCard({ name, cost, img_src, id }) {
  const { cart, addToCart, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ name, cost, img_src, id });
    toast.success("Added to cart");
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  const getQuantity = () => {
    const product = cart.find(item => item.id === id);
    return product ? product.quantity : 0;
  };

  return (
    <div className="p-4 rounded-xl w-[28rem] transition hover:scale-105 shadow-xl flex flex-col">
      {/* Image Container */}
      <div className="relative w-full h-[32rem] overflow-hidden rounded-xl">
        <Image
          src={img_src}
          alt={name}
          fill
          className="object-cover brightness-50"
        />

        {/* Overlay Content (correctly placed inside image container) */}
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <h1 className="text-white uppercase text-4xl font-extrabold">
            {name}
          </h1>
          <h2 className="text-white uppercase text-2xl font-medium">
            Rs.{cost}
          </h2>

          {getQuantity() > 0 ? (
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={handleRemoveFromCart}
                className="px-2 py-1 rounded-md border-2 border-white hover:bg-white hover:text-gray-800 transition uppercase tracking-[2px] text-md"
              >
                -
              </button>
              <span className="text-white text-xl">{getQuantity()}</span>
              <button
                onClick={handleAddToCart}
                className="px-2 py-1 rounded-md border-2 border-white hover:bg-white hover:text-gray-800 transition uppercase tracking-[2px] text-md"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="px-2 py-1 mt-4 rounded-md border-2 border-white hover:bg-white hover:text-gray-800 transition uppercase tracking-[2px] text-md"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
