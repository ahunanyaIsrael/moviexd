import React, { useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="flex justify-between items-center">
      <img
        src={assets.logo}
        alt=""
        className=" w-22 cursor-pointer"
        onClick={() => navigate("/")}
      />

      <ul className="hidden sm:flex gap-5 text-sm items-center">
        <div className="relative group font-medium text-base cursor-pointer text-gray-500 hover:text-white">
          <Link to="/movies?genre=28&page=1">GENRE</Link>
          <div className="hidden group-hover:block absolute left-0 top-4 mt-2 z-50 bg-[#060c15] rounded shadow-lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 min-w-[350px]">
              <NavLink
                to="/movies?genre=28&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Action
              </NavLink>
              <NavLink
                to="/movies?genre=1&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Drama
              </NavLink>
              <NavLink
                to="/movies?genre=35&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Drama
              </NavLink>
              <NavLink
                to="/movies?genre=16&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Animation
              </NavLink>
              <NavLink
                to="/movies?genre=53&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Thriller
              </NavLink>
              <NavLink
                to="/movies?genre=9648&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Mystery
              </NavLink>
              <NavLink
                to="/movies?genre=14&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Fantasy
              </NavLink>
              <NavLink
                to="/movies?genre=27&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Horror
              </NavLink>
            </div>
          </div>
        </div>
        <div className="relative group font-medium text-base cursor-pointer text-gray-500 hover:text-white">
          <Link to="/movies?page=1">MOVIES</Link>
          <div className="hidden group-hover:block absolute left-0 top-4 mt-2 z-50 bg-[#060c15] rounded shadow-lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 min-w-[350px]">
              <NavLink
                to="/movies?page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                All
              </NavLink>

              <NavLink
                to="/movies?region=US&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                United States
              </NavLink>

              <NavLink
                to="/movies?region=GB&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                United Kingdom
              </NavLink>
              <NavLink
                to="/movies?region=DE&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Germany
              </NavLink>
              <NavLink
                to="/movies?region=CA&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Canada
              </NavLink>
              <NavLink
                to="/movies?region=FR&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                France
              </NavLink>
            </div>
          </div>
        </div>
        <div className="relative group font-medium text-base cursor-pointer text-gray-500 hover:text-white">
          <Link to="/series?page=1">SERIES</Link>
          <div className="hidden group-hover:block absolute left-0 top-4 mt-2 z-50 bg-[#060c15] rounded shadow-lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 min-w-[350px]">
              <NavLink
                to="/series?page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                All
              </NavLink>

              <NavLink
                to="/series?region=KR&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                South Korea
              </NavLink>

              <NavLink
                to="/series?region=JP&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Japan
              </NavLink>
              <NavLink
                to="/series?region=IL&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Israel
              </NavLink>
              <NavLink
                to="/series?region=TR&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Turkey
              </NavLink>
            </div>
          </div>
        </div>
        <div className="relative group font-medium text-base cursor-pointer text-gray-500 hover:text-white">
          <Link to="/movies?genre=16&page=1">ANIME</Link>
          <div className="hidden group-hover:block absolute left-0 top-4 mt-2 z-50 bg-[#060c15] rounded shadow-lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 min-w-[350px]">
              {/* <NavLink
                to="/anime?page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                All
              </NavLink> */}
              <NavLink
                to="/movies?genre=16&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Movies
              </NavLink>
              {/* <NavLink
                to="/tv?genre=16&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Series
              </NavLink> */}
            </div>
          </div>
        </div>
        <div className="relative group font-medium text-base cursor-pointer text-gray-500 hover:text-white">
          <Link to="/movies?type=popular&page=1">SUGGESTIONS</Link>
          <div className="hidden group-hover:block absolute left-0 top-4 mt-2 z-50 bg-[#060c15] rounded shadow-lg">
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 p-4 min-w-[350px]">
              {/* <NavLink
                to="/movies?type=top_rated&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Top Movies
              </NavLink>
              <NavLink
                to="/movies?type=now_playing&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Top Viewed
              </NavLink>
              <NavLink
                to="/movies?type=trending&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Recommended
              </NavLink> */}
              <NavLink
                to="/movies?type=popular&page=1"
                className="whitespace-nowrap hover:bg-[var(--primary-color)] p-1 text-sm w-full block"
              >
                Most Popular
              </NavLink>
            </div>
          </div>
        </div>
      </ul>

      <div className="flex items-center gap-4">
        <input
          className="hidden lg:block border border-[#03f0fc] rounded-full px-3 py-1"
          type="text"
          placeholder="Search..."
        />
        <div className="hidden md:inline-block p-[2px] rounded-lg bg-gradient-to-r from-[var(--primary-color)] to-[#250c4e] ">
          <button className="bg-black text-white px-5 py-1 rounded-lg cursor-pointer">
            Login
          </button>
        </div>
        <img
          src={assets.menu_icon}
          className="sm:hidden w-9 cursor-pointer"
          onClick={() => setMenuToggle(true)}
        />
      </div>
      {
        <div
          className={`absolute overflow-hidden top-0 right-0 left-0 bottom-0 ${menuToggle ? "w-full" : "w-0"} z-50 bg-white transition ease-in duration-300 `}
        >
          <div className="px-4 py-2">
            <div className="flex items-center justify-between">
              <img
                src={assets.logo}
                alt="logo"
                className="w-16 cursor-pointer"
              />
              <img
                src={assets.cross}
                alt="cross"
                className="w-5 cursor-pointer"
                onClick={() => setMenuToggle(false)}
              />
            </div>

            <div className="mt-3">
              <button className="bg-gradient-to-r from-[var(--primary-color)] to-[#250c4e] px-5 py-1 rounded-lg cursor-pointer w-full">
                Login
              </button>
            </div>

            <ul className="flex flex-col gap-5 text-sm items-start my-9">
              <Link
                to="/movies?genre=28&page=1"
                className="text-white bg-[var(--primary-color)] w-full text-center p-2 text-base font-medium cursor-pointer"
                onClick={() => toggleMenu(false)}
              >
                Genre
              </Link>
              <Link
                to="/movies?page=1"
                className="text-white bg-[var(--primary-color)] w-full text-center p-2 text-base font-medium cursor-pointer"
                onClick={() => toggleMenu(false)}
              >
                Movies
              </Link>
              <Link
                to="/series?page=1"
                className="text-white bg-[var(--primary-color)] w-full text-center p-2 text-base font-medium cursor-pointer"
                onClick={() => toggleMenu(false)}
              >
                Series
              </Link>
              <Link
                to="/movies?genre=16&page=1"
                className="text-white bg-[var(--primary-color)] w-full text-center p-2 text-base font-medium cursor-pointer"
                onClick={() => toggleMenu(false)}
              >
                Anime
              </Link>
              <Link
                to="/movies?type=popular&page=1"
                className="text-white bg-[var(--primary-color)] w-full text-center p-2 text-base font-medium cursor-pointer"
                onClick={() => toggleMenu(false)}
              >
                Recommendation
              </Link>
            </ul>
          </div>
        </div>
      }
    </div>
  );
};

export default Navbar;
