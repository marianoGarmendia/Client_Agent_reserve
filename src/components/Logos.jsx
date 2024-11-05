import { twMerge } from "tailwind-merge";
import PropTypes from "prop-types";

function Logo({ image, logo }) {
  const bgColor = {
    react: "bg-[#3998B6]",
    light: "bg-[#c7c0c0]",
    tailwind: "bg-[#101726]",
    firestore: "bg-[#D62B00]",
  };
  return (
    <article className="flex flex-col  hover:bg-[#1F1F1F]  rounded-md">
      <div
        className={twMerge(
          "rounded-full grid place-content-center  w-[80px] h-[80px] shadow-lg shadow-black/60",
          bgColor[logo]
        )}
      >
        {image && <img src={image} alt="logo" className="w-[50px] h-[50px]" />}
      </div>
    </article>
  );
}
Logo.propTypes = {
  image: PropTypes.string,
  logo: PropTypes.oneOf(["react", "light", "tailwind", "firestore"]).isRequired,
};

export default Logo;
