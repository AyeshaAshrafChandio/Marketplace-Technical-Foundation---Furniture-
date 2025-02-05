import Image from "next/image";

const GetInTouch = () => {
  return (
    <div className="relative h-[828px] lg:h-[603px] bg-white mt-[7rem] md:bottom-[11rem] lg:-bottom-[14rem] mx-auto lg:mx-0 flex md:flex-row flex-col">
      <div className="relative  md:bottom-[5rem] flex flex-col gap-[16px] p-4 lg:w-1/2 md:w-[850px] hero-touch">
        <h4 className="font-clash text-xl font-normal leading-[28px] text-[#2a254b] lg:text-2xl lg:w-[514px] md:w-[600px] md:text-3xl">
          From a studio in London to a global brand with over 400 outlets
        </h4>
        <p className="font-satoshi leading-[21px] font-normal text-[#505977] text-[14px] lg:w-[570px] md:w-[600px] md:text-xl  lg:text-lg lg:mt-3">
          When we started Avion, the idea was simple. Make high quality
          furniture affordable and available for the mass market. <br />
          <br /> Handmade, and lovingly crafted furniture and homeware is what
          we live, breathe and design so our Chelsea boutique become the hotbed
          for the London interior design community.
        </p>
        <div className="relative flex justify-start md:top-0 md:bottom-[14rem]">
          <button className="mt-[6rem] md:mt-4 lg:mt-[4rem] mb-8 w-[309px] py-[16px] px-[32px] bg-lightGray bg-opacity-[15%] leading-6 text-[#2a254b] font-satoshi font-normal hover:bg-darkPrimary hover:text-white transition-all duration-300 ease-in-out text-lg border-2 border-[#2a254b]">
            Get in touch
          </button>
        </div>
      </div>

      <div className="md:relative w-full lg:bottom-[6rem] touch-image">
        <Image
          src="/images/SofaWithVase.png"
          alt="Sofa and Vase Image"
          width={200}
          height={200}
          className="w-[390px] h-[358px] lg:w-1/2 lg:h-[500px] md:h-[555px] md:w-[850px] xl:w-[720px] img"
        />
      </div>
    </div>
  );
};

export default GetInTouch;
