import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const MovieCard = ({ name, year, img, id }) => {
  return (
    <NavLink
      to={`/movies/${id}`}
      className={"cursor-pointer shadow rounded flex flex-col h-full"}
    >
      <div className="relative overflow-hidden h-52 w-[130px] ">
        <img
          src={`https://image.tmdb.org/t/p/original${img}`}
          alt=""
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <p className="absolute top-0 bg-black/40 p-1 rounded text-sm ml-1 mt-1">
          HD
        </p>
        <p className="absolute bottom-0 left-0 w-full p-2 text-center text-xs font-medium">
          {name} ({year})
        </p>
      </div>
    </NavLink>
  );
};

export default MovieCard;
