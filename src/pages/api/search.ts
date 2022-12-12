import { RequestEvent } from "@builder.io/qwik-city";
import { search } from "@services/tmdb";

export const onGet = async (event: RequestEvent) => {
  const query = event.url.searchParams.get("query");
  const page = event.url.searchParams.get("page") || "1";

  if (!query) {
    return null;
  }

  const result = await search({ page: +page, query });

  return { query, result };
};
