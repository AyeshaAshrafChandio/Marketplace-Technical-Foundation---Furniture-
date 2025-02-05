import Image from "next/image";

const AboutGetInTouch = () => {
  return (
    <div className="relative h-[836px] w-full mx-auto sm:mx-0 sm:h-[603px] bg-lightGray flex top-[14rem] flex-col-reverse sm:flex-row-reverse sm:top-[8rem] justify-center items-center
    sm:justify-normal sm:items-start about-get-in-touch">
      <div className="flex flex-col gap-[16px] p-4 md:w-[720px] sm:w-[630px] mt-[5rem] px-8  sm:px-[7rem] sm:mt-[5rem] about-touch">
        <h4 className="font-clash text-2xl font-normal leading-[28px] text-[#2a254b] sm:text-[1.5rem] sm:w-[514px]">
          Our service isn&apos;t just personal, it&apos;s actually hyper
          personally exquisite
        </h4>
        <p className="font-satoshi leading-[21px] font-normal text-[#505977] text-[14px] sm:w-[570px] sm:text-lg sm:mt-3">
          When we started Avion, the idea was simple. Make high quality
          furniture affordable and available for the mass market. <br />
          <br />
          Handmade, and lovingly crafted furniture and homeware is what we live,
          breathe and design so our Chelsea boutique become the hotbed for the
          London interior design community.
        </p>
        <div className="relative flex sm:top-[3rem] sm:right-[6rem] justify-center -top-[6rem] right-[10rem] get-touch-btn">
          <button className="mt-[6rem] mb-8 w-[309px] py-[16px] px-[32px] bg-white bg-opacity-[15%] leading-6 text-[#2a254b] font-satoshi font-normal hover:bg-darkPrimary shadow border border-darkPrimary hover:text-white transition-all duration-300 ease-in-out text-lg">
            Get in touch
          </button>
        </div>
      </div>

      <div className="md:relative about-touch-image">
        <Image
          src="/images/blackSofa.png"
          alt="Black Sofa Image"
          width={200}
          height={200}
          className="w-[390px] h-[358px] md:w-[890px] lg:w-[720px] sm:h-[603px] about-img"
        />
      </div>
    </div>
  );
};

export default AboutGetInTouch;
