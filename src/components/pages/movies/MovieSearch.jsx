import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { searchMovies } from "../../../shared/api/tmdbAPI";
import Skeleton from "../../ui/Skeleton";

const MovieSearch = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Достаем поисковый запрос из URL (например, ?query=batman)
  const query = searchParams.get("query") || "";
  
  // Синхронизируем инпут со значением из URL
  const [value, setValue] = useState(query);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Выполняем поиск при изменении параметра query в URL
  useEffect(() => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    searchMovies(query)
      .then((data) => {
        if (!data?.results || data.results.length === 0) {
          setMovies([]);
          return;
        }
        setMovies(data.results);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message || "Не удалось загрузить фильмы");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [query]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedValue = value.trim();

    // Обновляем URL: добавляем ?query=... или удаляем параметр, если инпут пустой
    if (trimmedValue) {
      setSearchParams({ query: trimmedValue });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="space-y-5">
      <form className="flex items-center" onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search movies..."
          className="w-50 rounded-l border border-gray-300 px-2 py-0.5 outline-none focus:border-gray-400"
        />
        <button
          type="submit"
          className="rounded-r border border-gray-500 bg-gray-500 px-3 py-0.5 text-white transition hover:bg-gray-600 active:bg-gray-700"
        >
          Search
        </button>
      </form>

      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {!isLoading && !error && movies.length === 0 && query && (
        <p className="text-sm text-gray-500">Nothing found...</p>
      )}
      {isLoading && (
        <ul className="space-y-2">
          {Array.from({ length: 5 }).map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-4 w-[75%] animate-pulse rounded bg-gray-200"
            />
          ))}
        </ul>
      )}
      {!isLoading && movies.length > 0 && (
        <ul className="flex flex-col gap-1 list-disc pl-7">
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link
                to={`/movies/${movie.id}`}
                className="text-blue-600 underline transition leading-none hover:text-blue-700 active:text-blue-900"
              >
                {movie.title || movie.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieSearch;