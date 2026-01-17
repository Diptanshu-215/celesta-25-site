"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@/context/AuthUserContext";
import { useCart } from "@/context/CartContext";
import { ShoppingCart } from 'lucide-react';
import { checkout } from '@/lib/checkout'
import Script from 'next/script';

export default function FloatingCart() {

  const { cart, emptyCart } = useCart();

  const getTotal = () => {
    return cart.reduce((acc, item) => acc + item.cost * item.quantity, 0);
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const { authUser, loading, signOutUser } = useAuth();
  const menuRef = useRef(null);

  // Script URL based on environment
  const scriptUrl = `https://${process.env.NEXT_PUBLIC_ATOM_ENV === 'prod' ? 'psa' : 'pgtest'}.atomtech.in/staticdata/ots/js/atomcheckout.js?v=${Date.now()}`;

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
    <>
      {/* AtomPaynetz Script moved outside the conditional render for better loading reliability */}
      <Script
        src={scriptUrl}
        strategy="lazyOnload"
        onLoad={() => {
          console.log("AtomPaynetz script loaded successfully");
          setIsScriptLoaded(true);
        }}
        onError={() => {
          console.error("Failed to load AtomPaynetz script");
          setIsScriptLoaded(false);
        }}
      />

      <div ref={menuRef} className="hidden lg:flex fixed top-48 right-4 sm:right-8 z-50 group">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white
                   flex items-center justify-center shadow-lg hover:bg-black/60 transition-all duration-300"
          aria-label="Toggle navigation menu"
        >
          <ShoppingCart className="w-6 h-6 md:w-[30px] md:h-[30px]" />
        </button>
        <div
          className={`absolute right-0 top-full mt-4 w-72 p-6 rounded-xl shadow-2xl
                    bg-black/60 backdrop-blur-lg border border-white/10
                    transition-all duration-300 ease-in-out origin-top-right
                    ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        >
          <nav className="flex flex-col space-y-1">

            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold uppercase text-white">Store</h3>
              <Link href="/store" onClick={() => setIsOpen(false)} className="text-xs bg-teal-500/20 text-teal-400 px-3 py-1 rounded-full hover:bg-teal-500/30 transition-colors uppercase font-bold tracking-wider">
                Visit
              </Link>
            </div>
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

            <button
              disabled={!isScriptLoaded}
              onClick={async () => {
                if (!isScriptLoaded) {
                  alert("Payment gateway is still loading. Please wait a moment.");
                  return;
                }

                try {
                  const data = await checkout(cart, authUser);
                  if (data && data.token) {
                    const options = {
                      atomTokenId: data.token,
                      merchId: data.merchId,
                      custEmail: authUser.email || "test.user@gmail.com",
                      custMobile: "8888888888", // Should ideally come from user profile
                      returnUrl: `${window.location.origin}/api/payment/response`
                    };

                    // Ensure AtomPaynetz is loaded and available
                    if (window.AtomPaynetz) {
                      const atom = new window.AtomPaynetz(options, process.env.NEXT_PUBLIC_ATOM_ENV === 'prod' ? 'prod' : 'uat');
                    } else {
                      console.error("AtomPaynetz object not found on window despite script load event");
                      alert("Payment gateway error. Please refresh and try again.");
                    }
                    setIsOpen(false);
                  } else {
                    console.error("No token received from checkout API");
                  }
                } catch (error) {
                  console.error("Checkout error:", error);
                }
              }}
              className={`text-left px-4 py-2 text-white rounded-md transition-colors ${!isScriptLoaded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'}`}
            >
              {isScriptLoaded ? 'Check Out' : 'Loading...'}
            </button>

          </nav>
        </div>
      </div>
    </>
  );
}

