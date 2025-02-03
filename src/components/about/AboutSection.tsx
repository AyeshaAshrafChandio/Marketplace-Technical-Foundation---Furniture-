import Link from "next/link";

const AboutSection = () => {
  return (
    <div className="relative h-[385px] py-[32px] px-[24px] my-[3rem] flex flex-col sm:flex-row w-full lg:h-[277px] sm:pl-[12rem] sm:py-[2rem] sm:gap-[6rem] xs:justify-center xs:items-center sm:justify-normal sm:items-start about-sec">
      <h2 className="font-clash font-normal leading-[44.8px] text-darkPrimary text-3xl sm:w-[704px] w-[520px] ">
        A brand built on the love of craftmanship, quality and outstanding
        customer service
      </h2>

      <button className="w-full sm:relative lg:pr-8 sm:pr-8 mt-[4rem] sm:mt-4 lg:mt-2 sm:w-[200px] sm:h-[56px] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-darkPrimary font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out">
        <Link href="/products" className="text-center">View our products</Link>
      </button>
    </div>
  );
};

export default AboutSection;
