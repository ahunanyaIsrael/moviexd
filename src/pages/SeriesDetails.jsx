import React from "react";
import { NavLink, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "../utilities/api";
import Loader from "../components/Loader";

const SeriesDetails = () => {
  const { id } = useParams();

  const fetchSeriesDetails = async () => {
    try {
      const response = await api.get(`/tv/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["series-details", id],
    queryFn: fetchSeriesDetails,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  const realSeasons = (data?.seasons || []).filter(
    (season) => season.season_number > 0,
  );

  return (
    <div className="py-10">
      <div className="flex flex-col md:flex-row gap-6 mb-10">
        <img
          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
          alt={data.name}
          className="w-48 rounded-lg"
        />

        <div className="flex-1">
          <h2 className="text-3xl font-bold">{data.name}</h2>
          <p className="text-sm text-gray-400 mt-2">
            {data.first_air_date?.split("-")[0]} • {data.status}
          </p>
          <p className="mt-4 text-sm text-gray-300 max-w-3xl">
            {data.overview}
          </p>
        </div>
      </div>

      <h3 className="text-xl font-semibold mb-6">Seasons</h3>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {realSeasons.map((season) => (
          <NavLink
            key={season.id}
            to={`/series/${id}/season/${season.season_number}`}
            className="bg-[#0c1420] rounded-lg overflow-hidden hover:scale-[1.02] transition"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${
                season.poster_path || data.poster_path
              }`}
              alt={`${data.name} Season ${season.season_number}`}
              className="w-full h-52 object-cover"
            />

            <div className="p-3">
              <p className="font-medium text-sm">
                Season {season.season_number}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {season.episode_count} Episodes
              </p>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default SeriesDetails;
