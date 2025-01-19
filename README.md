
Hackathon-03-Document
Furniture E-commerce Website
Author: Ayesha Muhammad Ashraf
Role: Rising Star, Chair Haven Online

Overview
This document outlines the technical foundation and enhanced workflow for the Chair Haven Online Platform, specifically designed for retailers and wholesalers dealing in furniture. The platform aims to simplify inventory management and provide an effortless shopping experience for bulk and individual buyers of chairs and related furniture.

System Architecture
Tech Stack
Frontend: Next.js
Backend: Sanity CMS
API Integration: External APIs for shipment tracking and data import
Document Structure

Business Goals
Data Schema Breakdown
Workflow Diagram
Code Snippets
Business Goals
1. Streamline Furniture Inventory Management
Create an efficient system for displaying and managing furniture products like chairs, tables, and accessories.

2. Target Audience
Wholesalers
Furniture Retailers
Interior Designers
Direct Consumers
3. Key Differentiators
Real-time stock updates for furniture availability.
A visually appealing platform to showcase high-quality furniture designs.
Cost-effective and scalable for businesses of any size.
Data Schema Breakdown
Products
ID: Unique identifier for each furniture piece.
Name: Name of the product (e.g., Chair, Table).
Category: Type of furniture (e.g., Chairs, Sofas, Tables).
Details: Material, dimensions, and other specifications.
Price: Cost per unit.
Stock: Current availability.
Image: High-quality image of the furniture.
Description: Short product overview.
Orders
Order ID: Unique identifier for each order.
Customer Info: Buyer details (e.g., name, email, phone).
Product Details: List of purchased items.
Status: Order status (e.g., pending, shipped, delivered).
Timestamp: Date and time of the order.
Customers
ID: Unique identifier for each customer.
Name: Customer's name.
Contact Info: Email and phone number.
Address: Delivery address.
Order History: Record of past purchases.
Delivery Zones
Zone Name: Name of the delivery zone.
Coverage Area: Defined geographical area.
Assigned Drivers: Personnel managing deliveries.
Shipments
Shipment ID: Unique identifier for each shipment.
Order ID: Associated order details.
Status: Shipment progress (e.g., in transit, delivered).
Delivery Date: Estimated delivery date.
Workflow Diagram
User Journey:

User → Browse Furniture → Add to Cart → Proceed to Checkout → Generate Order ID → Enter Customer Details → Order Confirmation → Payment → Shipment → Delivery Confirmation

Code Snippets
Sanity Schema Example
javascript
Copy code
// schemas/furniture.js
export default {
  name: 'furniture',
  title: 'Furniture',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
    },
    {
      name: 'stock',
      title: 'Stock',
      type: 'number',
    },
    {
      name: 'image',
      title: 'Product Image',
      type: 'image',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ],
};
Next.js Page: Add to Cart
javascript
Copy code
// pages/furniture/[id].js
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../lib/sanityClient';

export default function FurnitureDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      client
        .fetch(`*[_id == "${id}"]`)
        .then((data) => setProduct(data[0]))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const addToCart = () => {
    console.log('Added to cart:', product);
  };

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image.asset.url} alt={product.name} />
      <p>{product.description}</p>
      <button onClick={addToCart}>Add to Cart</button>
    </div>
  );
}
Next.js Page: Checkout
javascript
Copy code
// pages/checkout.js
import { useState } from 'react';

export default function Checkout() {
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e) => {
    setCustomerInfo({ ...customerInfo, [e.target.name]: e.target.value });
  };

  const submitOrder = () => {
    console.log('Customer Info:', customerInfo);
    // Call API to process order
  };

  return (
    <div>
      <h1>Checkout</h1>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={customerInfo.name}
        onChange={handleInputChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={customerInfo.email}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        value={customerInfo.phone}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={customerInfo.address}
        onChange={handleInputChange}
      />
      <button onClick={submitOrder}>Submit Order</button>
    </div>
  );
}








