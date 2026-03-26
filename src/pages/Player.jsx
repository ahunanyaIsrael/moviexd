import React from "react";
import { useParams } from "react-router-dom";
import api from "../utilities/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

const Player = () => {
  const { id } = useParams();
  const fetchMovieVideo = async () => {
    try {
      const [videoRes, detailsRes] = await Promise.all([
        api.get(`/movie/${id}/videos`),
        api.get(`/movie/${id}`),
      ]);

      return {
        video: videoRes.data.results,
        details: detailsRes.data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["movie_video", id],
    queryFn: fetchMovieVideo,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  const trailer = data?.video?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const fallbackVideo = data?.video.find((video) => video.site === "YouTube");

  const selectedVideo = trailer || fallbackVideo;

  const genres = data.details.genres.map((g) => g.name).join(", ");
  const countries = data.details.production_countries
    .map((c) => c.iso_3166_1)
    .join(", ");

  console.log(countries);

  return (
    <div className="py-10">
      <iframe
        width="100%"
        height="500"
        src={`https://www.youtube.com/embed/${selectedVideo.key}`}
        title={selectedVideo.name}
        allowFullScreen
      />

      <div className="mt-10">
        <div className="flex gap-6">
          <div className="overflow-hidden h-52 w-[130px] ">
            <img
              src={`https://image.tmdb.org/t/p/original${data.details.poster_path}`}
              alt=""
              className="w-full h-full object-cover hover:scale-110 transition duration-300"
            />
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-base sm:text-xl md:text-2xl font-bold">
              {data.details.original_title}
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm">
              {data.details.overview}
            </p>
            <div>
              <p className="text-gray-500 font-medium">
                Genre:{" "}
                <span className="text-xs sm:tex-sm text-[var(--primary-color)]">
                  {genres}
                </span>{" "}
              </p>
              <p className="text-gray-500 font-medium">
                Release:{" "}
                <span className="text-xs sm:tex-sm text-[var(--primary-color)]">
                  {data.details.release_date?.split("-")[0]}
                </span>
              </p>
              <p className="text-gray-500 font-medium">
                Country:{" "}
                <span className="text-xs sm:tex-sm text-[var(--primary-color)]">
                  {countries}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
