const SignUp = () => {
  return (
    <div className="relative lg:right-[10rem] h-[292px] lg:h-[481px] lg:mt-[8rem] lg:border-[3.5rem] lg:left-0 mx-auto lg:border-lightGray bg-white p-4 bottom-[2rem] md:bottom-[8rem] lg:-bottom-[8rem] md:left-[8rem] lg:mx-6 hero-signup">
      <div className="relative top-[4rem] flex flex-col lg:items-center gap-[16px]">
        <h4 className="font-clash text-xl font-normal leading-[28px] lg:text-5xl md:text-4xl text-[#2a254b]">
          Join the club and get the benefits
        </h4>
        <p className="font-satoshi leading-[21px] font-normal text-darkPrimary text-[14px] lg:text-xl md:text-lg lg:w-[540px] md:w-[500px] text-center">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop up stores and more
        </p>
      </div>
      <div className="lg:relative mt-[6rem] flex lg:justify-center signup">
        <input
          type="email"
          placeholder="your@email.com"
          className="bg-lightGray placeholder:font-satoshi focus:outline-none py-4 px-5 lg:w-[400px] md:w-[400px]"
        />
        <button className="px-[32px] py-[16px] bg-darkPrimary text-white font-satoshi font-normal leading-6 hover:bg-navbarColor hover:text-darkPrimary">
          Sign up
        </button>
      </div>
    </div>
  );
};

export default SignUp;
