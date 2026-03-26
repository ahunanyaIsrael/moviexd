import React from "react";
import { NavLink } from "react-router-dom";

const SeriesCard = ({ showId, img, name, year, status, totalEpisodes }) => {
  const isOngoing = status === "Returning Series";

  return (
    <NavLink
      to={`/series/${showId}`}
      className="cursor-pointer flex flex-col h-full"
    >
      <div className="relative overflow-hidden h-52 w-[130px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${img}`}
          alt={name}
          className="w-full h-full object-cover hover:scale-110 transition duration-300"
        />

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="absolute top-2 left-2 bg-black/50 px-2 py-1 rounded-full w-[50px] h-[50px] text-[10px] flex flex-col text-center">
          <p className="font-medium text-sm">{totalEpisodes}</p>
          <p className="font-medium text-sm">EPS</p>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-2 text-center">
          <p className="text-xs font-medium">
            {name} {year && `(${year})`}
          </p>
        </div>

        <p className="absolute top-0 right-0 text-[10px] bg-[#250c4e] py-1 rounded-bl-xl px-3 font-medium">
          <i>{isOngoing ? "Ongoing" : "Completed"}</i>
        </p>
      </div>
    </NavLink>
  );
};

export default SeriesCard;
