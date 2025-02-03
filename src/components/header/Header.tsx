"use client";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  color: string;
  material: string;
  dimensions: string;
  stock: number;
  added_on: string;
  imageUrl: string;
  rating: number;
  rating_counts: number;
  category: string;
  comments: string[];
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [productData, setProductData] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const toggleSearch = () => setIsSearchOpen((prev) => !prev);

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products: Product[] = await client.fetch(
          `*[_type=="product"]{
          id,
          name,
          description,
          price,
          color,
          material,
          dimensions,
          "stock": stock->stock,
          added_on,
          "imageUrl": image.asset->url,
          rating,
          rating_counts,
          category,
          comments,
        }`
        );
        setProductData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = productData.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchQuery, productData]);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts([]);
    } else {
      const results = productData.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [searchQuery, productData]);

  return (
    <nav className="relative w-full p-6 md:py-5 bg-white">
      <div className="flex justify-between md:justify-center items-center md:border-b md:border-lightGray">
        {/* Logo */}
        <h1 className="text-2 font-normal font-clash leading-[29.52px] text-darkBlue">
          Avion
        </h1>

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button
            onClick={toggleSearch}
            aria-label="Search"
            className="md:relative md:right-[20rem] lg:right-[33rem] flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200"
          >
            <CiSearch className="text-lg" />
          </button>

          {/* Hamburger Icon */}
          <button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden flex items-center justify-center w-8 h-8 rounded-full text-darkPrimary hover:bg-gray-200"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Search Box */}
      {isSearchOpen && (
        <div className="mt-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:w-[70%] border placeholder:text-black  bg-black/10 text-black border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-black"
          />
          {/* Display filtered products */}
          <div className="my-4">
            {filteredProducts.length > 0 ? (
              <ul className="bg-white border border-gray-200 rounded-md shadow-md grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                {filteredProducts.map((product) => (
                  <li
                  key={product.id}
                  className="p-4 flex items-center justify-between border-b last:border-none border-r"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <div>
                      <p className="font-medium text-darkBlue sm:text-base text-xs">{product.name}</p>
                      <p className="text-gray-600 sm:text-base text-xs">${product.price}</p>
                    </div>
                  </div>
                
                  {/* Align View button to the right */}
                  <div>
                    <Link href={`/products/${product.id}`}>
                      <button className="text-white border border-darkPrimary bg-darkBlue px-4 py-2 rounded-md hover:bg-lightGray hover:text-darkPrimary">
                        View
                      </button>
                    </Link>
                  </div>
                </li>
                ))}
              </ul>
            ) : (
              searchQuery && (
                <p className="mt-2 text-gray-500">No products found.</p>
              )
            )}
          </div>
        </div>
      )}

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex md:grid md:grid-cols-5 flex-col lg:flex-row md:items-center md:justify-center mt-4 md:mt-0 space-y-4 md:space-y-0 md:space-x-1 lg:space-x-8 lg:ml-16 md:ml-4 `}
      >
        <Link
          href="/"
          className="block text-center border-b border-transparent py-1 md:mt-3 lg:-mt-1 mt-0 hover:border-darkPrimary"
        >
          Home
        </Link>
        <Link
          href="/products"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Products
        </Link>
        <Link
          href="/about"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="block text-center border-b border-transparent py-1 hover:border-darkPrimary"
        >
          Contact
        </Link>
       

        <div className="relative flex gap-4 justify-center">
          {/* User Icon */}
          <Link href="/" aria-label="User Profile">
            <div className="stick right-[18rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
              <FaUserCircle />
            </div>
          </Link>

          {/* Cart Icon */}
          <Link href="/usercart" aria-label="Cart">
            <div className="stick  right-[16rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
              <FaShoppingCart />
            </div>
          </Link>

          { /* User Account by Clerk */}
          <div className="stick  right-[16rem] flex items-center justify-center w-6 h-6 rounded-full border border-transparent hover:bg-lightGray">
              <UserButton />
            </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
