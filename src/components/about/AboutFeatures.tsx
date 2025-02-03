import Image from "next/image";

const AboutFeatures = () => {
  return (
    <div className="relative w-full md:h-[598px] h-[628px] flex flex-col sm:flex-row p-6 gap-4 mt-[5rem] md:mx-auto lg:px-[4rem] xl:px-[6rem] lg:p-6 about-feature">
      <div className="sm:w-[634px] sm:h-[478px] bg-darkPrimary p-8 sm:px-2 feature-div">
        <h4 className="font-clash font-normal leading-[28px] text-white text-xl md:text-4xl pb-4 sm:px-[2rem] sm:pt-[3rem]">
          It started with a small idea
        </h4>
        <p className="relative sm:px-[2rem]  leading-[21px] font-satoshi font-normal md:relative md:left-2 text-white text-[14px]  sm:text-[14px] sm:w-[495px] pb-10">
          A global brand with local beginnings, our story begain in a small
          studio in South London in early 2014
        </p>
        <button className="w-full sm:relative sm:w-[188px] sm:left-[3rem] lg:top-[10rem] py-[16px] px-[32px] bg-[#f9f9f9] bg-opacity-[15%] leading-6 text-white font-satoshi font-normal hover:bg-lightGray hover:text-darkBlue transition-all duration-300 ease-in-out">
          View collection
        </button>
      </div>
      <div className="sm:w-[630px] feature-image">
        <Image
          src="/images/yellowSofa.png"
          alt="Yellow Sofa"
          width={200}
          height={200}
          className="w-[342px] h-[259px] sm:w-[630px] sm:h-[478px] feature-img"
        />
      </div>
    </div>
  );
};

export default AboutFeatures;
