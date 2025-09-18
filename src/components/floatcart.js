"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@/context/AuthUserContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from 'lucide-react';
import { checkout } from '@/lib/checkout'

export default function FloatingCart() {

  const { cart, emptyCart } = useCart();

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
  };
  const [isOpen, setIsOpen] = useState(false);
  const { authUser, loading, signOutUser } = useAuth();
  const menuRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div ref={menuRef} className="fixed top-48 right-4 sm:right-8 z-50 group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-20 h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white
                   flex items-center justify-center shadow-lg hover:bg-black/60 transition-all duration-300"
        aria-label="Toggle navigation menu"
      >
        <ShoppingCart size={30} />
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 p-2 rounded-xl shadow-2xl
                    bg-black/60 backdrop-blur-xl border border-white/20
                    transition-all duration-300 ease-in-out origin-top-right
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
      >
        <nav className="flex flex-col space-y-1">

          <Link href="/store" onClick={() => setIsOpen(false)} className="px-4 py-2 text-white rounded-md hover:bg-white/10 transition-colors">
            Store
          </Link>
          {cart.length === 0 ? (
            <p className="text-white/70 text-sm px-4">Your cart is empty.</p>
          ) : (
            <div>
              <hr className="my-2 opacity-20" />
              {cart.map((item, index) => (
                <div key={index} className="px-4 py-2 text-white rounded-md transition-colors flex gap-2">
                  <span>{item.name} (x{item.quantity})</span>
                  <span>Rs.{item.cost * item.quantity}</span>
                </div>
              ))}
              <hr className="my-2 opacity-20" />
              <div className="px-4 py-2 text-white rounded-md transition-colors text-left flex gap-2">
                <span>Total</span>
                <span>Rs. {getTotal()}</span>
              </div>
            </div>
          )}
          <button onClick={async () => { setIsOpen(false); checkout(cart, authUser).then(() => emptyCart()) }} className="text-left px-4 py-2 text-white rounded-md hover:bg-white/10 transition-colors">
            Check Out
          </button>

        </nav>
      </div>
    </div>
  );
}

