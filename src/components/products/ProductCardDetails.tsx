 "use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "../reuseableComponents/ProductCard";
import SignUp from "../heroSection/SignUp";
import { CardProps } from "../../../types/components";
import { client } from "@/sanity/lib/client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const ProductCardDetails = () => {
  const params = useParams();
  const productSlug = params?.id;
  const [details, setDetails] = useState<CardProps | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [productData, setProductData] = useState<CardProps[] | null>(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productDetails = await client.fetch(
          `*[_type=="product" && slug.current == $slug][0]{
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
            features,
            quantity,
            slug,
            tags
          }`,
          { slug: productSlug }
        );

        setDetails(productDetails);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (productSlug) {
      fetchProductDetails();
    }
  }, [productSlug]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await client.fetch(
          `*[_type=="product"][2..5]{
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
            features,
            quantity,
            slug,
            tags
          }`
        );
        setProductData(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const increase = () => setQuantity(quantity + 1);
  const decrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingProductIndex = existingCart.findIndex(
      (item: any) => item.id === details?.id
    );

    if (existingProductIndex !== -1) {
      existingCart[existingProductIndex].quantity += quantity;
    } else {
      existingCart.push({
        id: details?.id,
        heading: details?.name,
        price: details?.price,
        quantity,
        image: details?.imageUrl,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
  };

  return (
    <div className="relative w-full lg:h-[2827px] h-[3579px] mx-auto lg:mx-0 md:mx-auto">
      {details ? (
        <div className="w-full mt-[6rem] h-[1055px] bg-white flex flex-col md:mt-[8rem] md:flex-row md:gap-[1.5rem] md:h-[759px] details">
          <div className="md:w-[55%] md:h-[759px] xs:h-[600px] h-[380px]">
            <Image
              src={details.imageUrl || "/placeholder-image.png"}
              alt={details.name}
              width={500}
              height={500}
              className="w-full md:h-[759px] h-[380px] detail-img"
            />
          </div>
          <div className="lg:h-[657px] md:w-[45%] w-full lg:mx-[1.5rem] h-[675px] p-[1.5rem] detail-div">
            <h3 className="text-2xl">{details.name}</h3>
            <p>£{details.price}</p>
            <p>{details.description}</p>
            <p>Stock: {details.stock ? `${details.stock} Available` : "Out of Stock"}</p>
            <div className="flex gap-2">
              <button onClick={decrease}>-</button>
              <span>{quantity}</span>
              <button onClick={increase}>+</button>
            </div>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
      <h5 className="text-xl">You might also like</h5>
      {productData ? (
        <Swiper
          spaceBetween={16}
          slidesPerView={3}
          modules={[Autoplay]}
          autoplay={{ delay: 1000, disableOnInteraction: false }}
          loop={true}
        >
          {productData.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard productData={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p>Loading products...</p>
      )}
      <SignUp />
    </div>
  );
};

export default ProductCardDetails;
