import Image from "next/image";
import { FeatureProprs } from "../../../types/components";

const AboutFeatureCard: React.FC<FeatureProprs> = ({ image, heading, para }) => {
  return (
    <div className="border border-transparent hover:bg-gray-300 hover:border-darkPrimary bg-lightGray p-8 flex  flex-col gap-4 hover:bg-lightGray transition-all duration-300 ease-in-out rounded w-[300px] md:mx-4 lg:mx-0 features">
      <Image
        src={`/images/${image}.png`}
        alt={`${image} Icon Image`}
        width={50}
        height={50}
        className="w-[24px] h-[24px] md:w-[32px] md:h-[32px] rounded"
      />
      <h5 className="font-clash font-normal leading-[22.4px] text-darkPrimary text-[1.3rem]">
        {heading}
      </h5>
      <p className="font-satoshi font-normal leading-[21px] text-darkPrimary md:text-[0.9rem]">
        {para}
      </p>
    </div>
  );
};

export default AboutFeatureCard;


