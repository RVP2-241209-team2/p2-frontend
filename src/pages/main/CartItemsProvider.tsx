import { createContext, ReactNode } from "react";
import { CartItem } from "./cart-page";

interface CartItemContextType {
    total:number;
    setTotal:(value:number)=>void;
    cartItems:CartItem[];
    setCartItems:(value:CartItem[])=>void;
  }
  
export const CartItemsContext = createContext<CartItemContextType | undefined>(undefined);

import { useState } from "react";

export const CartItemsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [total, setTotal] = useState<number>(0);
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    return (
        <CartItemsContext.Provider value={{ total, setTotal, cartItems, setCartItems }}>
            {children}
        </CartItemsContext.Provider>
    );
};