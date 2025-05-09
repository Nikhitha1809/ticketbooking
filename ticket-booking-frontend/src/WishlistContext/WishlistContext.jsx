// WishlistContext.js
import React, { createContext, useEffect, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(()=>{
    try {
      const stored = localStorage.getItem('wishlist');
      return stored && stored !== 'undefined' ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to parse wishlist from localStorage:", error);
      return [];
    }
  });

   // Save to localStorage whenever wishlist changes
  useEffect(()=>{
    localStorage.setItem('wishlist',JSON.stringify(wishlist))
  },[wishlist]);

  const addToWishlist = (movie) => {
    // setWishlist([...wishlist, movie]);
    setWishlist((prevWishList)=>{
      const existingMovie =prevWishList.find((item)=>item.id == movie.id);
      if (existingMovie) {
        return prevWishList; // or increaseQuantity(movie.id)
      }
      return [...prevWishList, { ...movie, quantity: 1, amount: 200}];
    });
    // console.log("setwishlist",wishlist);
  };
  const increaseQuantity =(id)=>{
    // setWishlist((prevWishList)=>{
    //   prevWishList.map((item)=>
    //     item.id == id? {...item, quantity:(item.quantity||1)+1}: item
    //   )
    // });
    setWishlist((prevWishlist)=>{
    const updated = prevWishlist.map((item) =>
      item.id === id
        ? { ...item, quantity: (item.quantity || 1) + 1, amount:200*(item.quantity +1) }
        : item
    );
    // console.log("Updated wishlist:", updated);
    return updated;
  })
  };
  const decreaseQuantity =(id)=>{
    // setWishlist((prevWishList)=>{
    //   const updated = prevWishList.map((item)=> 
    //     item.id === id && item.quantity>1 ? {...item, quantity:item.quantity-1}:item)
    //   console.log("updated decrement",updated)
    // return updated;
    // });
    setWishlist((prevWishlist) =>
      prevWishlist
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1,  amount:200*(item.quantity -1) }
            : item
        )
        .filter((item) => item.quantity > 0) // Remove items with 0 quantity
    );
    
  }
  const clearWishlist = () => {
    setWishlist([]);
    localStorage.removeItem("wishlist"); // if using localStorage
  };
  
  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist,increaseQuantity, decreaseQuantity, clearWishlist}}>
      {children}
    </WishlistContext.Provider>
  );
};
