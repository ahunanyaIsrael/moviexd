import React from "react";
import api from "../utilities/api";
import { useSearchParams } from "react-router-dom";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") || 1);
  const region = searchParams.get("region") || "";
  const genre = searchParams.get("genre") || "";
  const fetchMovies = async () => {
    try {
      const params = { page };
      const today = new Date().toISOString().split("T")[0];
      if (region) params.with_origin_country = region;
      if (genre) params.with_genres = genre;
      const response = await api.get("/discover/movie", {
        params: {
          page,
          sort_by: "popularity.desc.desc",
          "popularity.desc.lte": today,
          ...(region && { with_origin_country: region }),
          ...(genre && { with_genres: genre }),
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["movies", { page, region, genre }],
    queryFn: fetchMovies,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", newPage);
      return next;
    });
  };

  const totalPages = Math.min(data?.total_pages || 1, 500);

  const getVisiblePages = () => {
    const pages = [];
    const start = Math.max(1, page - 2);
    const end = Math.min(totalPages, page + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };
  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;
  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold pl-2">Movies</h2>
        {isFetching && <p className="text-sm text-gray-400">Loading...</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 gap-y-6 justify-items-center">
        {data?.results?.map((item) => (
          <MovieCard
            key={item.id}
            id={item.id}
            name={item.title || item.name}
            year={item.release_date?.split("-")[0]}
            img={item.poster_path}
          />
        ))}
      </div>

      <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}
          className="px-3 py-2 rounded border border-gray-600 disabled:opacity-40"
        >
          Prev
        </button>

        {getVisiblePages().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-4 py-2 rounded ${
              page === pageNumber
                ? "bg-[var(--primary-color)] text-white"
                : "bg-[#250c4e] text-white"
            }`}
          >
            {pageNumber}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => handlePageChange(page + 1)}
          className="px-3 py-2 rounded border border-gray-600 disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Movies;
