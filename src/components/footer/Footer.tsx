import FooterHeading from "./FooterHeading";
import FooterLinks from "./FooterLinks";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaSkype,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="relative w-full md:h-[500px] lg:h-[360px] h-[720px] bottom-0 sm:mx-0 bg-darkPrimary gap-8 sm:gap-2 md:gap-8 md:px-[2rem] mx-auto footer">
      <div className="grid grid-cols-1 lg:grid-cols-2 md:border-b md:border-[#4e4d93] ">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-6 py-8 lg:gap-[5rem] md:-gap-[0rem] md:pr-[18rem] lg:px-6">
          <div>
            <FooterHeading name="Categories" />
            <FooterLinks name="Crockery" />
            <FooterLinks name="Furniture" />
            <FooterLinks name="Homeware" />
            <FooterLinks name="Plant post" />
            <FooterLinks name="Chairs" />
            <FooterLinks name="Crockery" />
          </div>
          <div>
            <FooterHeading name="Menu" />
            <FooterLinks name="New arrivals" />
            <FooterLinks name="Best sellers" />
            <FooterLinks name="Recently viewed" />
            <FooterLinks name="Popular this week" />
            <FooterLinks name="All products" />
          </div>
          <div>
            <FooterHeading name="Our Company" />
            <FooterLinks name="About us" />
            <FooterLinks name="Vacancies" />
            <FooterLinks name="Contact us" />
            <FooterLinks name="Privacy" />
            <FooterLinks name="Returns policy" />
          </div>
        </div>

        <div className="lg:pt-[3rem] lg:pl-[4rem] footer-end">
          <div className="ml-8 md:ml-0 ">
            <FooterHeading name="Join our mailing list" />
          </div>
          <div className="lg:relative lg:bottom-0 mt-5 flex justify-center pb-6 border-b border-[#4e4d93] md:border-darkPrimary lg:right-[4rem] footer-signup">
            <input
              type="email"
              placeholder="your@email.com"
              className="bg-white bg-opacity-[15%] placeholder:font-satoshi focus:outline-none py-4 px-5 placeholder:text-white lg:w-[400px] md:w-[250px]"
            />
            <button className="px-[32px] py-[16px] bg-white text-[#2A254B] font-satoshi font-normal leading-6 hover:bg-navbarColor hover:text-lightGray">
              Sign up
            </button>
          </div>
        </div>
      </div>
      <div className="md:flex lg:justify-between md:justify-start gap-0 lg:gap-0 md:gap-[20rem]">
        <p className="text-center  font-satoshi font-normal leading-[18.9px] text-white mt-4 md:mt-6">
          Copyright 2022 Avion LTD
        </p>
        <div className="hidden md:flex mt-6 lg:mr-4 gap-3">
          <FaLinkedin className="w-[24px] h-[24px] text-white" />
          <FaFacebookSquare className="w-[24px] h-[24px] text-white" />
          <FaInstagram className="w-[24px] h-[24px] text-white" />
          <FaSkype className="w-[24px] h-[24px] text-white" />
          <FaTwitter className="w-[24px] h-[24px] text-white" />
          <FaPinterest className="w-[24px] h-[24px] text-white" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
