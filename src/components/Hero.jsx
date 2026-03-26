import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import { useQuery } from "@tanstack/react-query";
import api from "../utilities/api";

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchTrending = async () => {
    try {
      const response = await api.get("/trending/all/day");

      return response.data.results.slice(0, 5);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["trending"],
    queryFn: fetchTrending,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  useEffect(() => {
    if (!data.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % data.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [data]);

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  const currentItem = data[currentIndex];

  return (
    <div
      className="relative bg-cover bg-center sm:bg-none flex items-end h-[500px] py-3 sm:py-0 text-white overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${currentItem.backdrop_path || currentItem.poster_path})`,
      }}
    >
      {/* <div className="absolute inset-0 bg-black/40"></div> */}

      <div className="relative z-10 bg-black/30 w-full sm:w-3/5 min-h-[220px] px-6 sm:px-9 py-6 sm:py-8 flex flex-col justify-between items-start gap-2">
        <h4 className="text-2xl sm:text-4xl font-bold">
          {currentItem.title || currentItem.name}
        </h4>

        <p className="text-xm sm:text-sm line-clamp-3 sm:line-clamp-4">
          {currentItem.overview}
        </p>

        <button className="bg-[var(--primary-color)] px-5 py-2 rounded-lg cursor-pointer">
          Watch Now
        </button>
      </div>

      <div className="absolute bottom-4 right-4 z-10 flex gap-2">
        {data.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
