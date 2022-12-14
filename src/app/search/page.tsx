import { search } from "@services/tmdb";
import { SearchGrid } from "./SearchGrid/SearchGrid";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { query?: string };
}) {
  const query = searchParams?.query;

  if (!query) {
    return null;
  }

  const result = await search({ page: 1, query });

  return (
    <div className="flex flex-col">
      <form className="flex flex-row justify-start gap-4 bg-base-300 p-4">
        <img
          src="/images/magnifier.svg"
          width={24}
          height={24}
          alt="search"
          aria-label="Search"
        />
        <input
          className="input"
          name="query"
          id="query"
          aria-label="query"
          value={query}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      <SearchGrid collection={result} />
    </div>
  );
}
