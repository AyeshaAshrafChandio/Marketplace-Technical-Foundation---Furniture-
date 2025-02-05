"use client";
import { useEffect, useState } from "react";
import {CartItem } from "../../../types/components";
import { createOrUpdateUser } from "@/actions/createUser";
import { createOrder } from "@/actions/createOrder";
import { createShipment } from "@/actions/createShipment";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";


const CheckoutModal = ({
  isOpen,
  closeModal,
  
  orderSuccess,
  setCartItems,
  calculateSubtotal,
  cartItems,
}: {
  isOpen: any;
  closeModal: () => void;
  onsubmit: (formData: any) => void;
  orderSuccess: any;
  setCartItems: any | CartItem;
  calculateSubtotal: number | any;
  cartItems: CartItem | any;
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    countryCode: "+92", // Default country code for Pakistan
    address: "",
    city: "",
    zipCode: "",
    state: "",
    country: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [shipmentDetails, setShipmentDetails] = useState<any | null>(null);
  const [checkoutStatus, setCheckoutStatus] = useState<string | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingData, setTrackingData] = useState<any | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showShipmentDetails, setShowShipmentDetails] = useState(false); // State to control shipment details visibility

  const countries = [
    { code: "+92", name: "Pakistan", flag: "🇵🇰" },
    { code: "+1", name: "USA", flag: "🇺🇸" },
    { code: "+44", name: "UK", flag: "🇬🇧" },
    { code: "+91", name: "India", flag: "🇮🇳" },
    { code: "+61", name: "Australia", flag: "🇦🇺" },
  ];

  useEffect(() => {
    emailjs.init(`${process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY}`);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      countryCode: e.target.value,
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Required fields check
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof typeof formData].trim()) {
        newErrors[key] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      }
    });

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  function generateOrderId(): string {
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit number
    return `ORDER${randomDigits}`;
  }

  function generateUserId(): string {
    const randomDigits = Math.floor(10000 + Math.random() * 90000); // Generate a 5-digit number
    return `User${randomDigits}`;
  }

  const orderId = generateOrderId();
  const userId = generateUserId();
  

  const handleSubmit = async (e: React.FormEvent) => {
    const isConfirmed = window.confirm("Are you sure you want to place this order?");
    if (!isConfirmed) return;
    
    e.preventDefault();
    if (validateForm()) {
      const userData = { ...formData }; // use the state data directly
  
      // Trigger the checkout process
      handleCheckout(userData);
      
  
      const handleUserSubmit = async () => {
        // Collect form data from state directly
        const userData = {
          userId: userId,
          name: formData.fullName,  // Get values from formData state
          email: formData.email,
          phoneNumber: formData.phoneNumber,
          countryCode: formData.countryCode,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
          state: formData.state,
          country: formData.country,
          order: cartItems.map((item: CartItem) => ({
            orderId: orderId,
            productId: item.id,
            productName: item.name,
            productPrice: item.price,
            quantity: item.quantity,
          })),
        };
  
        console.log("User Data", userData);
  
        // Ensure all required fields are not null
        if (!userData.name || !userData.email || !userData.phoneNumber || !userData.address) {
          console.error("All form fields are required.");
          return;
        }
  
        try {
          // Call the API function
          const result = await createOrUpdateUser(userData);
          console.log("User created successfully:", result);
        } catch (error) {
          console.error("Failed to create user:", error);
        }
      };
  
      await handleUserSubmit(); 


      const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so we add 1
const day = String(currentDate.getDate()).padStart(2, '0');
let hours = currentDate.getHours();
const minutes = String(currentDate.getMinutes()).padStart(2, '0');
const seconds = String(currentDate.getSeconds()).padStart(2, '0');

// Determine AM or PM
const amPm = hours >= 12 ? 'PM' : 'AM';

// Convert hours to 12-hour format
hours = hours % 12 || 12; // If hours is 0 (midnight), set it to 12

const formattedDateTime = `${year}-${month}-${day} ${String(hours).padStart(2, '0')}:${minutes}:${seconds} ${amPm}`;

      const handleOrderSubmit = async () => {
        const OrderData = {
          orderId: orderId,
          userId: userId,
          orderDate: formattedDateTime,
          orderData: cartItems.map((item: CartItem) => ({
            productId: item.id,
            productName: item.name,
            originalPrice: item.price,
            quantity: item.quantity,
            totalAmount: (typeof item.price === 'string' ? parseFloat(item.price) : item.price) * item.quantity,
            status: "Delivered",
          })),
        };
  
        console.log("Order Data", OrderData);
  
        try {
          // Call the API function
          const result = await createOrder(OrderData);
          console.log("Order created successfully:", result);
        } catch (error) {
          console.error("Failed to create order:", error);
        }
      };
  
      await handleOrderSubmit();

      const handleSendEmail = async () => {
        try {
          // Check if productData is available for the current order
          const orderItems = cartItems?.length
            ? cartItems
                .map(
                  (item: CartItem) =>
                    `${item.name} (x${item.quantity})\nSKU: ${item.id || "N/A"}\nProduct Link: https://marketplacefurniture715.vercel.app/products/${item.id}`
                )
                .join("\n\n")
            : "No items found.";
      
          // Customer email parameters
          const customerEmailParams = {
            to_email: userData.email || "ahchandio24@gmail.com",
            to_name: userData.fullName || "Customer",
            item_name: orderItems,
            total_price: `£${calculateSubtotal().toFixed(2)}`,
            recipient_name: userData.fullName || "N/A",
            shipping_address: userData.address || "N/A",
            city: userData.city || "N/A",
            postal_code: userData.zipCode || "N/A",
            contact_number: userData.phoneNumber || "N/A",
            support_email: "ahchandio24@gmail.com",
            support_phone: "+923181227587",
            payment_method: "COD",
            company_name: "Avion Furniture",
          };

          if (!formData.email) {
            console.log("Email Error:", customerEmailParams);
            return;  // Don't send the email if email is empty
          }
      
          // Store email parameters (sent to admin)
    
          // Sending email to customer
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_CUSTOMER!,
            customerEmailParams,
          );
      
          toast.success("Emails sent successfully!");
        } catch (error) {
          console.error("Error sending email:", error);
          toast.error("An error occurred while sending the email.");
        }
      };
      
      // Call function
      await handleSendEmail();
  
      localStorage.removeItem("cart");
      setCartItems([]);
    }
  };

  // Shipment API
  const handleCheckout = async (userData: any) => {
    // Retrieve cart from localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    // If cart is empty, handle accordingly
    if (cart.length === 0) {
      setCheckoutStatus("Your cart is empty. Please add items to your cart.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Set loading to true while waiting for response
    const addressFrom = {
      name: "Avion Furniture",
      street1: "123 saeedabad baldia town",
      city: "Karachi",
      state: "Sindh",
      zip: "75760",
      country: "Pakistan",
    };

    const addressTo = {
      name: userData.fullName,
      street1: userData.address,
      city: userData.city,
      state: userData.state,
      zip: userData.zipCode,
      country: userData.country, // Dynamic country from form
    };

    const parcels = [
      {
        length: "10",
        width: "10",
        height: "10",
        distance_unit: "in",
        weight: "5",
        mass_unit: "lb",
      },
    ];

    let amount = `£${calculateSubtotal().toFixed(2)}`;
    setIsLoading(true);
    try {
      const response = await fetch("/api/shippoOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          addressFrom,
          addressTo,
          parcels,
          orderId: orderId,
          totalAmount: amount,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setShipmentDetails({
          orderId: data.orderId,
          totalAmount: data.totalAmount,
          eta: data.eta,
          trackingNumber: data.trackingNumber,
        });
        setShowShipmentDetails(true);
        setCheckoutStatus(
          "Your order has been successfully placed. We will notify you once it's shipped!"
        );
      } else {
        setCheckoutStatus("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      setCheckoutStatus("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading after API call finishes
    }
  };

  const handleTrackShipment = async () => {
    if (!trackingNumber) {
      alert("Please enter a tracking number");
      return;
    }
  
    setIsTracking(true);
    try {
      const carrier = "shippo";
      const orderId = shipmentDetails?.orderId;
  
      const response = await fetch("/api/liveTracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trackingNumber, carrier, orderId }),
      });
  
      const data = await response.json();
      console.log("Tracking API response:", data);
  
      if (response.ok && data?.trackingDetails) {
        setTrackingData(data);
  
        const currentDate = new Date();
        const formattedDateTime = currentDate.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  
        const etaDate = new Date(data.trackingDetails.eta);
        const etaFormattedDate = etaDate.toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        });
  
        const status =
          data?.trackingDetails?.tracking_history?.find(
            (historyItem: any) => historyItem.status === "TRANSIT"
          )?.status || "Pending";
  
        const shipmentData = {
          orderId,
          userName: formData.fullName,
          userEmail: formData.email,
          userPhone: formData.phoneNumber,
          countryCode: formData.countryCode,
          shippingAddress: `${formData.address}, ${formData.state}, ${formData.city}, ${formData.country}`,
          status,
          trackingNumber: shipmentDetails.trackingNumber,
          shipmentDate: formattedDateTime,
          deliveryDate: etaFormattedDate,
          carrier,
          shipmentCharges: "Free",
          totalAmount: shipmentDetails.totalAmount,
        };
  
        console.log("Shipment Data:", shipmentData);
  
        try {
          const result = await createShipment(shipmentData);
          console.log("Shipment created successfully:", result);
        } catch (shipmentError) {
          console.error("Failed to create shipment:", shipmentError);
        }
      } else {
        console.error("Tracking details missing in response.");
        setTrackingData(null);
      }
    } catch (error) {
      console.error("Error fetching tracking status:", error);
      setTrackingData(null);
    } finally {
      setIsTracking(false);
    }
  };

  const userFormData = { ...formData };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {!shipmentDetails && orderSuccess ? (
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name and Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="fullName" className="block font-medium">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName} // Ensure the value is correctly linked
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2 text-black"
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-sm">{errors.fullName}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Row 2: Phone Number */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="countryCode" className="block font-medium">
                      Country Code
                    </label>
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleCountryCodeChange}
                      className="w-1/4 p-2 border border-gray-300 rounded-l-lg"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="phoneNumber" className="block font-medium">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your phone number"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm">
                        {errors.phoneNumber}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3: Address */}
                <div>
                  <label htmlFor="address" className="block font-medium">
                    Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="border rounded-lg w-full p-2"
                    placeholder="Enter your address"
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">{errors.address}</p>
                  )}
                </div>

                {/* Row 4: State, City, and Zip Code */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="state" className="block font-medium">
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your state"
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm">{errors.state}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="city" className="block font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your city"
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="zipCode" className="block font-medium">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="border rounded-lg w-full p-2"
                      placeholder="Enter your zip code"
                    />
                    {errors.zipCode && (
                      <p className="text-red-500 text-sm">{errors.zipCode}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="country" className="block font-medium">
                      Country Name
                    </label>
                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Enter your country name"
                      className="border rounded-lg w-full p-2"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-6 py-2 bg-gray-300 text-white rounded-md hover:bg-gray-400"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-navbarColor disabled:opacity-50"
                    disabled={isLoading}
                  >
                    Submit
                  </button>

                  {isLoading && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="w-12 h-12 border-4 border-gray-300 border-t-darkPrimary rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
              </form>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 max-h-[90vh] overflow-y-auto">
              {/* Show shipment details */}
              {checkoutStatus && (
                <div>
                  <p className="text-darkPrimary text-xl font-clash mt-4 p-2">
                    {checkoutStatus}
                  </p>
                  <p className="text-xl text-yellow-400 bg-darkPrimary p-4 outline-double  rounded-lg font-satoshi">
                    Thank you for your purchase! We hope you enjoy your items.
                    Don&apos;t forget to come back for more unique finds next
                    time!
                  </p>
                </div>
              )}
              {isLoading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="w-12 h-12 border-4 border-gray-300 border-t-darkPrimary rounded-full animate-spin"></div>
                </div>
              )}

              {/* Shipment Details */}
              {showShipmentDetails && shipmentDetails && (
                <div className="mt-8 bg-yellow-100 p-6 rounded-lg">
                  <h3 className="text-xl font-bold border-b border-darkPrimary py-1 mb-2">
                    Shipment Details
                  </h3>
                  <p>Order ID: {shipmentDetails.orderId}</p>
                  <p>Total Amount: {shipmentDetails.totalAmount}</p>
                  <p>ETA: {shipmentDetails.eta}</p>
                  <p>
                    Tracking Number:{" "}
                    {shipmentDetails.trackingNumber ||
                      "Tracking information is not available yet."}
                  </p>
                </div>
              )}

              {/* Track Shipment Card */}
              <div className="mt-6 bg-white p-6 rounded-lg  shadow-lg shadow-gray-600">
                <h1 className="text-2xl font-bold mb-4">Track Your Shipment</h1>
                <p className="p-2">
                  Write (SHIPPO_TRANSIT) in input field to track history
                </p>
                <div className="flex space-x-4 mb-6">
                  <input
                    type="text"
                    placeholder="Tracking Number"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="p-2 border rounded-md w-full"
                  />
                  <button
                    onClick={handleTrackShipment}
                    className="bg-darkPrimary border border-yellow-500 text-lightGray p-2 rounded-md"
                    disabled={isTracking}
                  >
                    Track
                  </button>
                  {isTracking && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                      <div className="w-12 h-12 border-4 border-darkPrimary border-t-yellow-500 rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {trackingData && trackingData.trackingDetails && (
                  <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                    <h2 className="text-xl border-b-2 border-darkPrimary p-2 font-bold mb-4">
                      Shipment Tracking Details
                    </h2>
                    <p>
                      <strong>Carrier:</strong>{" "}
                      {trackingData.trackingDetails.carrier}
                    </p>
                    <p>
                      <strong>ETA:</strong>{" "}
                      {trackingData.trackingDetails.eta|| "N/A"}
                    </p>
                    <p>
                      <strong>Origin:</strong>{" "}
                      {`saeedabad baldia town| Karachi, Sindh - Pakistan`}
                    </p>
                    <p>
                      <strong>Destination:</strong>{" "}
                      {`${userFormData.address}, ${userFormData.state}, ${userFormData.city}, ${userFormData.country}`}
                    </p>
                    <h3 className="text-lg font-bold mt-4">Tracking History</h3>
                    {trackingData.trackingDetails.tracking_history?.filter(
                      (historyItem: any) => historyItem.status === "TRANSIT"
                    ).length > 0 ? (
                      <ul className="list-disc ml-6">
                        {trackingData.trackingDetails.tracking_history
                          .filter(
                            (historyItem: any) =>
                              historyItem.status === "TRANSIT"
                          )
                          .map((historyItem: any, index: number) => (
                            <li key={index}>
                              <p>
                                <strong>Date:</strong>{" "}
                                {new Date(
                                  historyItem.status_date
                                ).toLocaleString()}
                              </p>
                              <p>
                                <strong>Location:</strong>{" "}
                                {`${historyItem.location?.city || "N/A"}, ${historyItem.location?.state || "N/A"}, ${historyItem.location?.country || "N/A"}`}
                              </p>
                              <p>
                                <strong>Status:</strong> {historyItem.status}
                              </p>
                              <p>
                                <strong>Details:</strong>{" "}
                                {historyItem.status_details || "N/A"}
                              </p>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p>
                        No tracking history with status &apos;TRANSIT&apos;.
                      </p>
                    )}
                  </div>
                )}
                {!trackingData && !isTracking && (
                  <p className="text-gray-500">
                    Enter a tracking number to see shipment details.
                  </p>
                )}
              </div>

              <div className="flex justify-end mt-6 mb-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 bg-darkPrimary text-white rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CheckoutModal;
