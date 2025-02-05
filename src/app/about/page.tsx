import AboutBrand from "@/components/about/AboutBrand";
import AboutFeatures from "@/components/about/AboutFeatures";
import AboutGetInTouch from "@/components/about/AboutGetInTouch";
import AboutSection from "@/components/about/AboutSection";
import AboutSignUp from "@/components/about/AboutSignUp";

const About = () => {
  return (
    <div className="relative mx-auto h-[3911px] w-full xl:h-[2960px] bg-white overflow-hidden about">
      <AboutSection />
      <AboutFeatures />
      <AboutGetInTouch />
      <AboutBrand />
      <AboutSignUp />
    </div>
  );
};

export default About;
