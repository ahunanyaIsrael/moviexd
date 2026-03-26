import React from "react";
import { assets } from "../assets/assets";
import SeriesCard from "./SeriesCard";
import api from "../utilities/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { Link } from "react-router-dom";

const Series = () => {
  const latestSeries = async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      const response = await api.get("/discover/tv", {
        params: {
          page: 1,
          sort_by: "popularity.desc",
          "first_air_date.lte": today,
          "first_air_date.gte": "2020-01-01",
          "vote_count.gte": 100,
        },
      });

      const shows = response.data.results.slice(0, 16);

      const fetchSeriesData = await Promise.all(
        shows.map(async (show) => {
          const result = await api.get(`/tv/${show.id}`);
          const details = result.data;

          const realSeasons = (details.seasons || []).filter(
            (season) => season.season_number > 0,
          );

          return {
            id: details.id,
            showId: details.id,
            showName: details.name,
            year: details.first_air_date?.split("-")[0],
            status: details.status,
            poster: details.poster_path,
            totalEpisodes: realSeasons.reduce(
              (sum, season) => sum + (season.episode_count || 0),
              0,
            ),
          };
        }),
      );

      return fetchSeriesData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["latest-series-popular"],
    queryFn: latestSeries,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  return (
    <div className="mt-10 pb-10 w-full">
      <div className="hidden sm:flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-sm pl-4">Latest TV Series</h2>
          <img src={assets.arrow_icon} className="w-4" />
        </div>
        <Link
          to="/series?page=1"
          className="text-sm text-[var(--primary-color)] cursor-pointer pr-4"
        >
          View More
        </Link>
      </div>

      <div className="mt-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-8 gap-4 gap-y-6 w-full justify-items-center">
          {data?.map((item) => (
            <SeriesCard
              key={item.id}
              showId={item.showId}
              name={item.showName}
              year={item.year}
              status={item.status}
              img={item.poster}
              totalEpisodes={item.totalEpisodes}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Series;
