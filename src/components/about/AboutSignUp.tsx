const AboutSignUp = () => {
  return (
    <div className="relative top-[50rem] sm:top-[25.3rem] h-[292px] w-full sm:h-[481px] sm:mt-[8rem] sm:border-[3.5rem] sm:border-lightGray bg-white p-4 bottom-[5rem] sm:mx-auto mx-auto justify-center items-center sm:justify-normal sm:items-start about-signup sm:ml-0 ">
      <div className="relative top-[4rem] flex flex-col sm:items-center gap-[16px]">
        <h4 className="font-clash text-xl font-normal leading-[28px] sm:text-4xl lg:text-5xl text-[#2a254b]">
          Join the club and get the benefits
        </h4>
        <p className="font-satoshi leading-[21px] font-normal text-darkPrimary text-[14px] lg:text-xl sm:text-lg sm:w-[540px] text-center">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
      </div>
      <div className="sm:relative mt-[6rem] flex sm:justify-center signup-2">
        <input
          type="email"
          placeholder="your@email.com"
          className="bg-lightGray placeholder:font-satoshi focus:outline-none py-4 px-5 lg:w-[400px] sm:w-[340px]"
        />
        <button className="px-[32px] py-[16px] bg-darkPrimary text-white font-satoshi font-normal leading-6 hover:bg-navbarColor hover:text-darkPrimary">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default AboutSignUp;
