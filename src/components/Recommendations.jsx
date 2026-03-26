import React from "react";
import { assets } from "../assets/assets";
import MovieCard from "./MovieCard";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import api from "../utilities/api";
import { Link, useNavigate } from "react-router-dom";

const Recommendations = () => {
  const fetchRecommendations = async () => {
    try {
      const response = await api.get("/movie/popular");
      return response.data.results.slice(0, 16);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recommendation"],
    queryFn: fetchRecommendations,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;
  return (
    <div className="mt-10 w-full">
      {/* -----------header Navigation */}
      <div className="hidden sm:flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm pl-4">Suggstions</h2>
          <img src={assets.arrow_icon} className="w-4" />
        </div>
        <Link
          to="/movies?type=popular&page=1"
          className="text-sm text-[var(--primary-color)] cursor-pointer pr-4"
        >
          View More
        </Link>
      </div>
      {/* Recomendations */}

      <div className="mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 gap-y-6 w-full justify-items-center">
          {data.map((item) => (
            <MovieCard
              id={item.id}
              key={item.id}
              name={item.title || item.name}
              year={item.release_date?.split("-")[0]}
              img={item.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
