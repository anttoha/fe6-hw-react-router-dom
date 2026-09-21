import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useParams, useNavigate } from "react-router";
import { getDetails, getImageUrl } from "../../../shared/api/tmdbAPI";
import { cn } from "../../../shared/utils/cn";
import Skeleton from "../../ui/Skeleton";

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  return (
    <div>
      <section className="flex flex-col py-1.5 border-y border-gray-400">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="active:bg-cyan-200 mr-auto"
        >
          Go back
        </button>
        <div className="flex flex-col md:flex-row gap-3">
          {!movie ? (
            <>
              <Skeleton className="w-50 h-[300px] rounded" />

              <div className="mt-2 space-y-3 w-full">
                <Skeleton className="h-7 w-[40%] rounded" />
                <Skeleton className="h-4 w-[20%] rounded" />

                <div className="space-y-1 pt-2">
                  <Skeleton className="h-5 w-[15%] rounded" />
                  <Skeleton className="h-4 w-[90%] rounded" />
                  <Skeleton className="h-4 w-[85%] rounded" />
                </div>

                <div className="space-y-1 pt-2">
                  <Skeleton className="h-5 w-[12%] rounded" />
                  <Skeleton className="h-4 w-[30%] rounded" />
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src={
                  movie.poster_path
                    ? getImageUrl(movie.poster_path)
                    : "https://cdn.pixabay.com/photo/2015/11/03/09/03/question-mark-1019993_640.jpg"
                }
                alt={movie.original_title}
                className="w-50 h-auto object-cover"
              />
              <div className="mt-2 space-y-2">
                <h2 className="text-2xl font-semibold">
                  {movie.original_title}
                </h2>
                <p className="text-sm">
                  User Score: {Math.round(movie.vote_average * 10)}%
                </p>
                <h3 className="text-xl font-semibold">Overview</h3>
                <p className="text-sm">{movie.overview}</p>
                <h4 className="text-lg font-semibold">Genres</h4>
                <p className="text-sm">
                  {movie.genres?.map((g) => g.name).join(", ")}
                </p>
              </div>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="py-4 border-b border-gray-400">
          <h3>Additional information</h3>
          <ol className="list-disc pl-7 space-y-1">
            {["cast", "reviews"].map((tab) => (
              <li key={tab}>
                <NavLink
                  to={`/movies/${movieId}/${tab}`}
                  className={({ isActive }) =>
                    cn(
                      "leading-none text-blue-600 underline hover:text-blue-700 active:text-blue-900 transition",
                      {
                        "text-cyan-600": isActive,
                      },
                    )
                  }
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </NavLink>
              </li>
            ))}
          </ol>
        </div>
        <div className="py-4">
          <Outlet />
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
