import React from "react";
import { useSearchParams } from "react-router-dom";
import SeriesCard from "../components/SeriesCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import api from "../utilities/api";
import Loader from "../components/Loader";

const Tv = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const region = searchParams.get("region") || "";
  const genre = searchParams.get("genre") || "";

  const fetchSeries = async () => {
    try {
      const params = { page };
      const today = new Date().toISOString().split("T")[0];

      if (region) params.with_origin_country = region;
      if (genre) params.with_genres = genre;

      const response = await api.get("/discover/tv", {
        params: {
          page,
          sort_by: "first_air_date.desc",
          "first_air_date.lte": today,
          "vote_count.gte": 50,
        },
      });
      const shows = response.data.results;

      const details = await Promise.all(
        shows.map(async (show) => {
          const result = await api.get(`/tv/${show.id}`);
          const full = result.data;

          const realSeasons = (full.seasons || []).filter(
            (season) => season.season_number > 0,
          );

          return {
            id: full.id,
            showId: full.id,
            showName: full.name,
            year: full.first_air_date?.split("-")[0],
            status: full.status,
            poster: full.poster_path,
            seasons: realSeasons,
            totalEpisodes: realSeasons.reduce(
              (sum, season) => sum + (season.episode_count || 0),
              0,
            ),
          };
        }),
      );

      return {
        ...response.data,
        results: details,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["series", page, region, genre],
    queryFn: fetchSeries,
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  const handlePageChange = (newPage) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("page", newPage.toString());
    setSearchParams(nextParams);
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
        <h2 className="text-xl font-semibold pl-2">Tv Series</h2>
        {isFetching && <p className="text-sm text-gray-400">Loading...</p>}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 gap-y-6 justify-items-center">
        {data?.results?.map((item) => (
          <SeriesCard
            key={item.id}
            showId={item.showId}
            name={item.showName}
            year={item.year}
            status={item.status}
            img={item.poster}
            totalEpisodes={item.totalEpisodes}
            seasons={item.seasons}
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

export default Tv;
