
import { createBrowserRouter } from "react-router";

import App from "../App";
import Movies from "../components/pages/Movies";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,

    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (
            await import("../components/pages/Home")
          ).default,
        }),
      },
      {
        path: "movies",
        Component: Movies,

        children: [
          {
            index: true,
            lazy: async () => ({
              Component: (
                await import(
                  "../components/pages/movies/MovieSearch"
                )
              ).default,
            }),
          },
          {
            path: ":movieId",
            lazy: async () => ({
              Component: (
                await import(
                  "../components/pages/movies/MovieDetails"
                )
              ).default,
            }),

            children: [
              {
                path: "cast",
                lazy: async () => ({
                  Component: (
                    await import(
                      "../components/pages/movies/MovieDetailCast"
                    )
                  ).default,
                }),
              },
              {
                path: "reviews",
                lazy: async () => ({
                  Component: (
                    await import(
                      "../components/pages/movies/MovieDetailReviews"
                    )
                  ).default,
                }),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default router;
