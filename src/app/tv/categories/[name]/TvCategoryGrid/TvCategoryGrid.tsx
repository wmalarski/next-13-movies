"use client";
import { MediaGrid } from "@modules/MediaGrid/MediaGrid";
import type { Collection, ProductionMedia } from "@services/types";
import { useState } from "react";

type Props = {
  collection: Collection<ProductionMedia>;
};

export const TvCategoryGrid = ({ collection }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [productions, setProductions] = useState<ProductionMedia[]>([]);

  const fetcher = async (page: number) => {
    const params = new URLSearchParams({ page: String(page) });
    const url = `${location.href}/api?${params}`;
    const response = await fetch(url);
    return response.json();
  };

  return (
    <MediaGrid
      collection={[...(collection.results || []), ...productions]}
      currentPage={currentPage}
      pageCount={collection.total_pages || 1}
      // parentContainer={container.value}
      onMore={async () => {
        const newResult = await fetcher(currentPage + 1);
        const newMedia = newResult.results || [];
        setCurrentPage(newResult.page || currentPage);
        setProductions([...productions, ...newMedia]);
      }}
    />
  );
};
