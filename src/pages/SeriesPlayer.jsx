import React from "react";
import { useParams } from "react-router-dom";
import api from "../utilities/api";
import { useQuery } from "@tanstack/react-query";
import Loader from "../components/Loader";

const SeriesPlayer = () => {
  const { id, seasonNumber } = useParams();

  const fetchSeriesVideo = async () => {
    try {
      const [videoRes, detailsRes, seasonRes] = await Promise.all([
        api.get(`/tv/${id}/videos`),
        api.get(`/tv/${id}`),
        api.get(`/tv/${id}/season/${seasonNumber}`),
      ]);

      return {
        video: videoRes.data.results,
        details: detailsRes.data,
        season: seasonRes.data,
      };
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["series_video", id, seasonNumber],
    queryFn: fetchSeriesVideo,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <Loader />;
  if (isError) return <p>{error.message}</p>;

  const trailer = data?.video?.find(
    (video) => video.site === "YouTube" && video.type === "Trailer",
  );

  const fallbackVideo = data?.video?.find((video) => video.site === "YouTube");

  const selectedVideo = trailer || fallbackVideo;

  return (
    <div className="py-10">
      {selectedVideo ? (
        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${selectedVideo.key}`}
          title={selectedVideo.name}
          allowFullScreen
          className="rounded-lg"
        />
      ) : (
        <div className="w-full h-[500px] bg-black/30 rounded-lg flex items-center justify-center">
          <p>Movie not Available</p>
        </div>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-bold">
          {data.details.name} - Season {seasonNumber}
        </h2>
        <p className="text-sm text-gray-400 mt-2">
          {data.season.episode_count} Episodes
        </p>
        <p className="mt-3 text-sm text-gray-300">
          {data.season.overview || "No season overview available."}
        </p>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-4">Episodes</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-x-4">
          {data.season.episodes?.map((episode) => (
            <div key={episode.id} className="flex gap-4 bg-[#0c1420] p-4">
              <p className="font-medium text-sm text-center w-full">
                {episode.episode_number}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SeriesPlayer;
