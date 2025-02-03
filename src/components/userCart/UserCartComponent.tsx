"use client";
import { use, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ItemCard from "./ItemCard";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { CartItem } from "../../../types/components";

const CheckoutModal = dynamic(() => import("../OrderSystem/CheckoutModal"), {
  ssr: false,
});

const UserCartComponent = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderSucess, setOrderSuccess ] = useState<any | boolean>(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    console.log("cart:",cart);
  }, []);

  const removeItemFromCart = (productId: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const decreaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productId: number) => {
    const updatedCart = cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOpenModal = () => {
    if (cartItems.length === 0 || calculateSubtotal() === 0) {
      alert("Please add items to your cart before proceeding to checkout.");
      return;
    }
    setIsModalOpen(true);
  };

  const handleSubmitForm = (formData: any) => {
    console.log(formData);
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="relative bg-lightGray h-full mx-auto w-full lg:px-0 py-4 px-6 user-cart">
      <h3 className="mx-10 font-clash font-normal leading-[33.6px] text-darkPrimary my-2 text-2xl md:text-4xl">
        Your shopping cart
      </h3>

      <div className="hidden lg:block md:m-[2rem]">
        <div className="flex relative">
          <p className="pl-[1rem] text-lg font-clash font-normal leading-[19.6px] text-darkPrimary">
            Product
          </p>
          <p className="pl-[23.5rem] font-clash font-normal text-lg leading-[19.6px] text-darkPrimary">
            Total
          </p>
        </div>
        <hr className="bg-lightGray" />
      </div>

      <div className="mx-auto md:mx-4 flex md:flex-row flex-col md:justify-between mt-8 gap-4">
        <div className="w-full md:w-2/3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <ItemCard
                key={item.id}
                image={item.image}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onIncrease={() => increaseQuantity(item.id)}
                onDecrease={() => decreaseQuantity(item.id)}
                onRemove={() => removeItemFromCart(item.id)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500 mt-4">
              Your cart is empty.
            </p>
          )}
        </div>

        <div className="w-full md:w-1/3 p-4 bg-white rounded-lg shadow-md mx-auto md:mx-4">
          <h4 className="font-clash text-darkPrimary text-xl mb-4">Summary</h4>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div className="flex justify-between" key={item.id}>
                <p className="font-satoshi text-lg text-darkPrimary">
                  {item.quantity} x {item.name}
                </p>
                <p className="font-satoshi text-lg text-darkPrimary">
                  £{(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-6">
            <p className="font-satoshi text-lg text-darkPrimary">Subtotal</p>
            <p className="font-satoshi text-lg text-darkPrimary">
              £{calculateSubtotal().toFixed(2)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="font-satoshi text-lg text-darkPrimary">
              Taxes & Shipping
            </p>
            <p className="font-satoshi text-lg text-green-500">(Free)</p>
          </div>

          <div className="flex justify-between lg:items-center mt-6 lg:flex-row flex-col lg:gap-0 gap-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-navbarColor">
                  Sign in to Checkout
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <button
                onClick={handleOpenModal}
                className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-navbarColor"
              >
                Go to checkout
              </button>
            </SignedIn>

            {isModalOpen && (
        <CheckoutModal
        isOpen={setIsModalOpen}
          onSubmit={(formData) => {
            console.log("Order Submitted", formData);
            setTimeout(() => {
              setIsModalOpen(false); // Close the modal after actions are completed
              setOrderSuccess(false); // Reset order success status
            }, 5000); 
          }}
          cartItems={cartItems}
          closeModal={handleCloseModal}
          orderSuccess={setOrderSuccess}
          setCartItems={setCartItems} // Pass setCartItems function
          calculateSubtotal={calculateSubtotal}
        />
      )}

            <button className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-navbarColor">
              <Link href="/products">Continue Shopping</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCartComponent;
