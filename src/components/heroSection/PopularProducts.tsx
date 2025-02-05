"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import ProductCard from "../reuseableComponents/ProductCard";
import { client } from "@/sanity/lib/client";
import { useEffect, useState } from "react";
import { CardProps } from "../../../types/components";
import Link from "next/link";

const PopularProducts = () => {
  const [productData, setProductData] = useState<CardProps[] | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(
         ` *[_type=="product"][4..7]{
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
          }
       `
        );
        setProductData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="relative mt-[14rem] h-[573px] md:h-[744px] bg-white md:px-[2rem] mx-auto lg:px-0 lg:mx-[1.5rem] md:mt-0 lg:top-[20rem] xl:mx-[3rem] popular-product">
      <h4 className="relative my-4 pl-4 font-clash font-normal leading-[24.6px] text-darkPrimary text-lg lg:text-4xl xs:text-3xl lg:bottom-[8rem] popular-heading">
        Our popular products
      </h4>

      {/* Swiper for smaller screens */}
      <div className="md:hidden px-4 md:px-0 py-2">
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2000, disableOnInteraction: true }}
          loop={true}
          slidesPerView={2}
          spaceBetween={0}
        >
          {productData &&
            productData.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard productData={product} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Larger screens */}
      <div className="relative lg:bottom-[8rem] hidden md:flex gap-4 hero-popular">
        {productData?.length ? (
          productData.map((product) => (
            <div key={product.id} className="flex flex-col gap-4">
              <ProductCard productData={product} />
            </div>
          ))
        ) : (
          <p className="col-span-4 justify-center items-center text-2xl font-bold text-darkPrimary">
            Loading products...
          </p>
        )}
      </div>

      {/* View Collection Button */}
      <div className="relative lg:-left-[2rem] lg:top-[-2.5rem] flex lg:justify-center mt-0 md:mt-[4rem] lg:mt-0 md:left-[12rem] hero-popular-button">
        <button className="m-2 w-[309px] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-[#2a254b] font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out text-lg border-2 border-[#2a254b]">
          <Link href="/products"> View collection</Link>
        </button>
      </div>
    </div>
  );
};

export default PopularProducts;
