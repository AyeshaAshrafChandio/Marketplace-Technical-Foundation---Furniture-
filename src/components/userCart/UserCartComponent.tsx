 "use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import ItemCard from "./ItemCard";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

const CheckoutModal = dynamic(() => import("../OrderSystem/CheckoutModal"), {
  ssr: false,
});

const UserCartComponent = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [, setOrderSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingStep, setTrackingStep] = useState(1);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    console.log("cart:", cart);
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

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmitTracking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate tracking number submission
    setTimeout(() => {
      setTrackingStep(2); // Move to next step (show success message)
      setIsSubmitting(false);
    }, 2000); // Simulate delay in submission
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate checkout form submission
    setTimeout(() => {
      setCheckoutSuccess(true); // Show success message after submission
      setIsSubmitting(false);
      setTimeout(() => {
        setIsModalOpen(false); // Close the modal after 2 seconds
        setCheckoutSuccess(false); // Reset checkout success
      }, 2000); // Close modal after 2 seconds
    }, 2000); // Simulate submission time
  };

  return (
    <div className="relative bg-lightGray h-full mx-auto w-full lg:px-0 py-4 px-6 user-cart">
      <h3 className="mx-10 font-clash font-normal leading-[33.6px] text-darkPrimary my-2 text-2xl md:text-4xl">
        Your shopping cart
      </h3>

      <div className="mx-auto md:mx-4 flex md:flex-row flex-col md:justify-between mt-8 gap-4">
        {/* Cart Items */}
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
            <p className="text-center text-gray-500 mt-4">Your cart is empty.</p>
          )}
        </div>

        {/* Cart Summary */}
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

          {/* Tracking Form */}
          <div className="mt-6">
            {trackingStep === 1 ? (
              <form onSubmit={handleSubmitTracking}>
                <label className="block text-lg">Enter Tracking Number:</label>
                <input
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Tracking Number"
                  required
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {isSubmitting ? (
                  <div className="mt-4 text-green-500">Submitting...</div>
                ) : (
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-darkPrimary text-white rounded-md"
                  >
                    Submit
                  </button>
                )}
              </form>
            ) : (
              <div className="text-green-500">
                <p>Tracking number submitted successfully!</p>
                <div className="animate-ping inline-block ml-2">✔️</div>
              </div>
            )}
          </div>

          {/* Checkout Form Success Animation */}
          <div className="mt-6">
            {checkoutSuccess && (
              <div className="text-green-500">
                <p>Checkout submitted successfully!</p>
                <div className="animate-ping inline-block ml-2">✔️</div>
              </div>
            )}
          </div>

          {/* Checkout Section */}
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
                onsubmit={handleCheckoutSubmit} // Using handleCheckoutSubmit
                cartItems={cartItems}
                closeModal={handleCloseModal}
                orderSuccess={setOrderSuccess}
                setCartItems={setCartItems}
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
