"use client";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import ProductCard from "../reuseableComponents/ProductCard";
import { CardProps } from "../../../types/components";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay} from "swiper/modules";

const Listing = () => {
  const [productData, setProductData] = useState<CardProps[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(
          `*[_type=="product"][0..3]{
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

  return (
    <div className="relative mt-[4rem] h-[573px] md:h-[744px] bg-white md:px-[2rem] lg:px-0 lg:mx-[1.5rem] md:mt-0 lg:top-[6rem] xl:mx-[3rem] popular-product listing slider">
      <h4 className="font-clash font-normal leading-[24.6px] text-darkPrimary text-xl lg:text-4xl xs:text-3xl lg:mb-6 hero-listing-h4">
        New ceramics
      </h4>
      <div className="detail-product-card md:block lg:block xl:block sm:block hidden ">
  {productData?.length ? (
    <Swiper
      spaceBetween={16} // Spacing between slides
      slidesPerView={3} // Default slides for small screens
      modules={[Autoplay]} // Include Autoplay in modules
      autoplay={{
        delay: 1000, // Delay between slides in milliseconds
        disableOnInteraction: false, // Allow autoplay even after interaction
      }}
      loop={true} // Enable looping
    >
      {productData.map((product) => (
        <SwiperSlide key={product.id}>
          {/* Render ProductCard for each product */}
          <ProductCard productData={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <p className="text-center text-3xl text-darkPrimary font-bold font-clash">Loading products...</p>
  )}
</div>

<div className="detail-product-card md:hidden lg:hidden xl:hidden sm:hidden block">
  {productData?.length ? (
    <Swiper
      spaceBetween={16} // Spacing between slides
      slidesPerView={2} // Default slides for small screens
     
      modules={[Autoplay]} // Include Autoplay in modules
      autoplay={{
        delay: 1000, // Delay between slides in milliseconds
        disableOnInteraction: false, // Allow autoplay even after interaction
      }}
      loop={true} // Enable looping
    >
      {productData.map((product) => (
        <SwiperSlide key={product.id}>
          {/* Render ProductCard for each product */}
          <ProductCard productData={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  ) : (
    <p className="text-center text-3xl text-darkPrimary font-bold font-clash">Loading products...</p>
  )}
</div>

      <button className="relative md:top-[4rem] lg:left-[28rem] md:left-[10rem] m-2 w-[309px] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-[#2a254b] font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out text-lg h-14 border-2 border-[#2a254b] hero-button">
       <Link href="/products"> View collection</Link>
      </button>
    </div>
  );
};

export default Listing;
