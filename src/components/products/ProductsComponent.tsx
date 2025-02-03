"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import ProductCard from "../reuseableComponents/ProductCard";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { CardProps } from "../../../types/components";

const ProductsComponent = () => {
   
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMaterialOpen, setIsMaterialOpen] = useState(false);
  const [isProductTypeOpen, setIsProductTypeOpen] = useState(false);
  const [isColorOpen, setIsColorOpen] = useState(false); // Changed from isStockOpen to isColorOpen

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<string | null>(null);
  const [selectedProductType, setSelectedProductType] = useState<string | null>(
    null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(null); // New state for color
  const [selectedSort, setSelectedSort] = useState<string | null>(null);

  const [productData, setProductData] = useState<CardProps[] | null>(null);

  const toggleSortMenu = () => setIsSortOpen(!isSortOpen);
  const toggleCategoryMenu = () => setIsCategoryOpen(!isCategoryOpen);
  const toggleMaterialMenu = () => setIsMaterialOpen(!isMaterialOpen);
  const toggleProductTypeMenu = () => setIsProductTypeOpen(!isProductTypeOpen);
  const toggleColorMenu = () => setIsColorOpen(!isColorOpen); // Toggle color filter menu

  const fetchProducts = async () => {
    let baseQuery = `*[_type=="product"`;

    if (selectedCategory) baseQuery += ` && category == "${selectedCategory}"`;
    if (selectedMaterial) baseQuery += ` && material == "${selectedMaterial}"`;
    if (selectedProductType) {
      if (selectedProductType === "Furniture")
        baseQuery += ` && category in ["Sofas", "Chairs"]`;
      else if (selectedProductType === "Lighting")
        baseQuery += ` && category == "Lamps"`;
      else if (selectedProductType === "Decor")
        baseQuery += ` && category == "Vases"`;
    }
    if (selectedColor) baseQuery += ` && color == "${selectedColor}"`; // Add color filter
    baseQuery += `]{
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
    }`;

    try {
      const products = await client.fetch(baseQuery);

      // Sort products based on selected sort option
      let sortedProducts = [...products];
      if (selectedSort === "Newest") {
        sortedProducts.sort(
          (a, b) =>
            new Date(b.added_on).getTime() - new Date(a.added_on).getTime()
        );
      } else if (selectedSort === "Oldest") {
        sortedProducts.sort(
          (a, b) =>
            new Date(a.added_on).getTime() - new Date(b.added_on).getTime()
        );
      } else if (selectedSort === "Price: Low to High") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (selectedSort === "Price: High to Low") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      setProductData(sortedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const debounce = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(debounce);
  }, [
    selectedCategory,
    selectedMaterial,
    selectedProductType,
    selectedColor,
    selectedSort,
  ]);

  // Updated Category Filter Logic
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category); // Update selected category
    setIsCategoryOpen(false); // Close dropdown
  };

  return (
    <div className="relative  flex flex-col w-full lg:h-[2439px] md:h-[2900px] product-sec">
      {/* Product Image Section */}
      <div className="relative w-full lg:h-[2439px] h-[146px] ">
        <Image
          src="/images/productBg.png"
          alt="Product Background Image"
          width={200}
          height={200}
          className="w-full h-[146px] lg:h-[209px] object-cover"
        />
        <h1 className="font-clash font-normal leading-[50.4px] text-white text-3xl lg:text-[1.9rem] absolute top-[3.5rem] lg:top-[7.7rem] xl:left-[5rem] xl:text-[2.27rem] lg:left-[3.5rem] left-[6rem] md:text-[1.5rem] md:top-[5.1rem] md:left-[3.45rem]">
          All products
        </h1>
      </div>

      <div className="h-[96px] flex gap-4 justify-center my-[4rem] sm:hidden relative">
        {/* Filter Button */}
        <div className="relative">
          <button
            className="w-[143px] h-[56px] flex items-center justify-center px-4 py-2 shadow-sm bg-lightGray hover:bg-darkPrimary hover:text-white transition text-darkBlue"
            onClick={toggleCategoryMenu}
          >
            <span className="font-satoshi font-normal leading-6">Category</span>
            <IoMdArrowDropdown className="ml-2 " />
          </button>
          {isCategoryOpen && (
            <div className="absolute top-12 left-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="text-darkBlue text-sm">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategoryClick("Sofas")}
                >
                  Sofas
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategoryClick("Chairs")}
                >
                  Chairs
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategoryClick("Lamps")}
                >
                  Lamps
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleCategoryClick("Vases")}
                >
                  Vases
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Sorting Button */}
        <div className="relative">
          <button
            className="w-[143px] h-[56px] flex items-center justify-center px-4 py-2 shadow-sm bg-lightGray hover:bg-darkPrimary hover:text-white transition text-darkBlue"
            onClick={toggleSortMenu}
          >
            <span className="font-satoshi font-normal leading-6">
              {selectedSort || "Date Added"}
            </span>
            <IoMdArrowDropdown className="ml-2 " />
          </button>
          {isSortOpen && (
            <div className="absolute top-12 left-0 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="text-darkBlue text-sm">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Price: Low to High")}
                >
                  Price: Low to High
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Price: High to Low")}
                >
                  Price: High to Low
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Oldest")}
                >
                  Oldest
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Newest")}
                >
                  Newest
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:flex lg:justify-between sm:justify-start sm:items-start lg:items-center lg:flex-row flex-col px-6 py-8">
        {/* Left Side Filters */}
        <div className="flex gap-4">
          {/* Category Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={toggleCategoryMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Category
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>
            {isCategoryOpen && (
              <div className="absolute top-12 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-darkBlue">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategoryClick("Sofas")}
                  >
                    Sofas
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategoryClick("Chairs")}
                  >
                    Chairs
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategoryClick("Lamps")}
                  >
                    Lamps
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleCategoryClick("Vases")}
                  >
                    Vases
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Product Type Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={toggleProductTypeMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Product Type
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>
            {isProductTypeOpen && (
              <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-darkBlue">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedProductType("Furniture")}
                  >
                    Furniture
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedProductType("Decor")}
                  >
                    Decor
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedProductType("Lighting")}
                  >
                    Lighting
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Price Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={toggleMaterialMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Material
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>
            {isMaterialOpen && (
              <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-darkBlue">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Wood")}
                  >
                    Wood
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Metal")}
                  >
                    Metal
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Glass")}
                  >
                    Glass
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Plastic")}
                  >
                    Plastic
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Stoneware")}
                  >
                    Stoneware
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Ceramic")}
                  >
                    Ceramic
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Leather")}
                  >
                    Leather
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Fabric")}
                  >
                    Fabric
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Velvet")}
                  >
                    Velvet
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedMaterial("Acrylic")}
                  >
                    Acrylic
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Colors Filter */}
          <div className="relative lg:bottom-[90rem]">
            <button
              onClick={toggleColorMenu}
              className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
            >
              Color
              <IoMdArrowDropdown className="ml-2 text-xl" />
            </button>
            {isColorOpen && (
              <div className="absolute top-12 left-0 bg-[#e4dbdb] border border-gray-300 rounded-lg shadow-lg z-10">
                <ul className="text-sm text-darkBlue">
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Clear")}
                  >
                    <span className="inline-block w-4 h-4 mr-2 bg-transparent border border-gray-400 "></span>{" "}
                    Clear
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Wooden Brown")}
                  >
                    <span
                      className="inline-block w-4 h-4 mr-2"
                      style={{ backgroundColor: "#6A4E23" }}
                    ></span>{" "}
                    Wooden <span className="pl-7">Brown</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Black")}
                  >
                    <span className="inline-block w-4 h-4 mr-2 bg-black"></span>{" "}
                    Black
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("White")}
                  >
                    <span className="inline-block w-4 h-4 mr-2 bg-white border border-gray-400 "></span>{" "}
                    White
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Royal Blue")}
                  >
                    <span className="inline-block w-4 h-4 mr-2 bg-blue-600 "></span>{" "}
                    Royal <span className="pl-7">Blue</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Grey")}
                  >
                    <span className="inline-block w-4 h-4 mr-2 bg-gray-500 "></span>{" "}
                    Grey
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Dark Brown")}
                  >
                    <span
                      className="inline-block w-4 h-4 mr-2"
                      style={{ backgroundColor: "#3E2723" }}
                    ></span>{" "}
                    Dark <span className="pl-7">Brown</span>
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Tan")}
                  >
                    <span
                      className="inline-block w-4 h-4 mr-2"
                      style={{ backgroundColor: "#D2B48C" }}
                    ></span>{" "}
                    Tan
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Beige")}
                  >
                    <span
                      className="inline-block w-4 h-4 mr-2"
                      style={{ backgroundColor: "#F5F5DC" }}
                    ></span>{" "}
                    Beige
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => setSelectedColor("Gold")}
                  >
                    <span className="inline-block w-4 h-4 mr-2 bg-yellow-500 "></span>{" "}
                    Gold
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Right Side Sorting */}
        <div className="relative flex gap-4 lg:bottom-[90rem] lg:ml-0 md:ml-6 right-side">
          <p className="leading-[21px] font-satoshi font-normal text-darkPrimary text-lg mt-3">
            Sorted by:
          </p>
          <button
            onClick={toggleSortMenu}
            className="flex items-center px-[24px] py-[12px] text-[#2a254b] hover:bg-gray-100 font-satoshi font-normal leading-6 text-lg"
          >
            {selectedSort || "Date Added"}
            <IoMdArrowDropdown className="ml-2 text-xl" />
          </button>
          {isSortOpen && (
            <div className="absolute top-12 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              <ul className="text-sm text-darkBlue">
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Newest")}
                >
                  Newest
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Oldest")}
                >
                  Oldest
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Price: Low to High")}
                >
                  Price: Low to High
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setSelectedSort("Price: High to Low")}
                >
                  Price: High to Low
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="relative lg:bottom-[85rem] h-[625px] grid grid-cols-2 lg:grid-cols-4 gap-[2rem] md:gap-0 md:pr-32 lg:pr-0 gap-y-[6rem] lg:gap-y-[10rem] lg:gap-[2rem] lg:mx-4 lg:mt-0 md:mx-4 xl:ml-8 product-sec-card">
        {productData?.length ? (
          productData.map((product) => (
            <ProductCard key={product.id} productData={product} />
          ))
        ) : (
          <p className="col-span-4 text-center text-2xl font-bold text-darkPrimary">
            No products found.
          </p>
        )}
      </div>

      <div className="px-[2rem] product-sec-btn">
        <button className="w-full md:relative mt-[12rem] lg:bottom-[5rem] md:-bottom-[21rem] md:left-[16rem] lg:left-[30rem] xl:left-[36rem] md:mt-0 md:w-[200px] md:h-[56px] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-darkPrimary font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out border-2 border-darkPrimary">
          <Link href="/ ">View collection</Link>
        </button>
      </div>
    </div>
  );
};

export default ProductsComponent;
