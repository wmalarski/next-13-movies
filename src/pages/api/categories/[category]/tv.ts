import { RequestEvent } from "@builder.io/qwik-city";
import { paths } from "@utils/paths";
import { z } from "zod";

export const onGet = async (event: RequestEvent) => {
  const rawPage = event.url.searchParams.get("page") || "1";
  const parseResult = z
    .object({ name: z.string().min(1), page: z.number().min(1).step(1) })
    .safeParse({ ...event.params, page: +rawPage });

  if (!parseResult.success) {
    throw event.response.redirect(paths.notFound);
  }

  const { getTvShows, getTrendingTv } = await import("@services/tmdb");
  const { page, name } = parseResult.data;

  try {
    const movies =
      name === "trending"
        ? await getTrendingTv({ page })
        : await getTvShows({ page, query: name });
    return movies;
  } catch {
    throw event.response.redirect(paths.notFound);
  }
};
