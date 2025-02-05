import Features from "../components/heroSection/Features";
import GetInTouch from "../components/heroSection/GetInTouch";
import Hero from "../components/heroSection/Hero";
import Listing from "../components/heroSection/Listing";
import PopularProducts from "../components/heroSection/PopularProducts";
import SignUp from "../components/heroSection/SignUp";


export default function Home() {
  return (
    <div className="relative mx-auto w-full max-h-[4500px] md:max-h-[4160px] overflow-hidden hero-page">
      <Hero />
      <Features />
      <Listing />
      <PopularProducts />
      <SignUp />
      <GetInTouch />
    </div>
  );
}
