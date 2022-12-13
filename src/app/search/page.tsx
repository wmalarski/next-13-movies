import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import { search } from "@services/tmdb";
import type { ProductionMedia } from "@services/types";

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

  const location = useLocation();

  const fetcher = async (page: number) => {
    const currentUrl = new URL(location.href);
    const params = new URLSearchParams({
      page: String(page),
      query: currentUrl.searchParams.get("query") || "",
    });
    const url = `${currentUrl.origin}${currentUrl.pathname}/api?${params}`;
    const response = await fetch(url);
    return response.json();
  };

  const store = useStore({
    currentPage: 1,
    results: [] as ProductionMedia[],
  });

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
          value={location.query.query}
        />
        <button className="btn" type="submit">
          Search
        </button>
      </form>

      <>
        {result ? (
          <MediaGrid
            collection={[...(result.results || []), ...store.results]}
            currentPage={store.currentPage}
            pageCount={result?.total_pages || 1}
            parentContainer={container.value}
            onMore={async () => {
              const newResult = await fetcher(store.currentPage + 1);
              const newMedia = newResult?.result.results || [];
              store.currentPage = newResult?.result.page || store.currentPage;
              store.results = [...store.results, ...newMedia];
            }}
          />
        ) : (
          <span className="w-full py-40 text-center text-4xl opacity-80">
            Type something to search...
          </span>
        )}
      </>
    </div>
  );
}
