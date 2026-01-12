"use client"
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const addToCart = (product) => {
        setCart(prevCart => {
            const addFestPass = (product) => {
                const existingPass = prevCart.find(item => item.id === product.id);
                if(existingPass) return prevCart;
                else {
                    return [...prevCart, { ...product, quantity: 1 }];
                }
            }
            const existingProduct = prevCart.find(item => item.id === product.id);
            if(product.id == "FEST_PASS") {
                return addFestPass(product);
            }
            if (existingProduct) {
                return prevCart.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (productId) => {
        setCart(prevCart => {
            return prevCart.reduce((acc, item) => {
                if (item.id === productId) {
                    if (item.quantity > 1) {
                        acc.push({ ...item, quantity: item.quantity - 1 });
                    }
                } else {
                    acc.push(item);
                }
                return acc;
            }, []);
        });
    };

    const emptyCart = () => {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, emptyCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
