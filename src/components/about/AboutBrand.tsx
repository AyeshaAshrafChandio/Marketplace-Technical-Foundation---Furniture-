import AboutFeatureCard from "../reuseableComponents/AboutFeatureCard";

const AboutBrand = () => {
  return (
    <div className="relative sm:h-[335px] top-[25rem] sm:top-[25rem] w-full h-[757px] bg-white flex flex-col gap-[2rem] sm:p-0 mx-auto sm:mx-5 lg:justify-center lg:items-center about-brand sm:ml-0">
      <h4 className="px-8 font-clash text-2xl font-normal leading-[28px] sm:text-3xl">
        What makes our brand different
      </h4>

      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 lg:gap-6 about-brands">
        <AboutFeatureCard
          image="Delivery"
          heading="Next day as standard"
          para="Order before 3pm and get your order the next day as standard"
        />

        <AboutFeatureCard
          image="Checkmark"
          heading="Made by true artisans"
          para="Handmade crafted goods made with real passion and craftmanship"
        />

        <AboutFeatureCard
          image="Purchase"
          heading="Unbeatable prices"
          para="For our materials and quality you won't find better prices anywhere"
        />

        <AboutFeatureCard
          image="Sprout"
          heading="Recycled packaging"
          para="We use 100% recycled packaging to ensure our footprint is manageable"
        />
      </div>
    </div>
  );
};

export default AboutBrand;
