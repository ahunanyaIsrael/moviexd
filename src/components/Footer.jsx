import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="bg-gradient-to-r from-[#060c15] to-[#250c4e] pt-10 pb-20">
      <div className="text-white px-4 sm:px-[1vw] md:px-[3vw] lg:px-[5vw]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-4 md:justify-items-center lg:justify-items-start">
          {/* left */}
          <div className="flex flex-col">
            <img src={assets.logo} alt="logo" className="w-32" />
            <p className="text-xs sm:text-sm text-gray-400">
              MovieXD is your go-to platform for discovering movies and TV
              series. Explore trending titles, watch your favorites, and stay
              updated with the latest releases—all in one place.
            </p>
          </div>
          {/* Middle */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-3">
              Suggestions
            </h3>
            <ul className="flex flex-col gap-2">
              <li className="text-xs sm:text-sm text-gray-400">
                Recommendations
              </li>
              <li className="text-xs sm:text-sm text-gray-400 cursor-pointer">
                Latest Movies
              </li>
              <li className="text-xs sm:text-sm text-gray-400 cursor-pointer">
                Trending
              </li>
              <li className="text-xs sm:text-sm text-gray-400 cursor-pointer">
                Popular
              </li>
            </ul>
          </div>
          {/* right */}
          <div>
            <h3 className="text-base font-medium text-gray-700 mb-3">
              Stay Connected
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Like & follow us on social networking sites to get the latest
              updates on movies, tv-series and news
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
