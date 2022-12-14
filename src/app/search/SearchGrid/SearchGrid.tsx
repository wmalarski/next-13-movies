"use client";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import type { Collection, ProductionMedia } from "@services/types";
import { useState } from "react";

type Props = {
  collection: Collection<ProductionMedia>;
};

export const SearchGrid = ({ collection }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productions, setProductions] = useState<ProductionMedia[]>([]);

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

  return (
    <>
      {collection ? (
        <MediaGrid
          collection={[...(collection.results || []), ...productions]}
          currentPage={currentPage}
          pageCount={collection.total_pages || 1}
          // parentContainer={container.value}
          onMore={async () => {
            const newResult = await fetcher(currentPage + 1);
            const newMedia = newResult?.result.results || [];
            setCurrentPage(newResult?.result.page || currentPage);
            setProductions([...productions, ...newMedia]);
          }}
        />
      ) : (
        <span className="w-full py-40 text-center text-4xl opacity-80">
          Type something to search...
        </span>
      )}
    </>
  );
};
