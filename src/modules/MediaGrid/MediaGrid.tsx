"use client";
import type { ProductionMedia } from "@services/types";
import { ReactElement, useRef } from "react";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: ProductionMedia[];
  currentPage: number;
  pageCount: number;
  onMore?: () => void;
  parentContainer?: Element | null;
};

export const MediaGrid = (props: Props): ReactElement => {
  const throttleTimer = useRef(false);
  const scrollEnabled = useRef(props.currentPage < props.pageCount);

  const handleScroll = () => {
    if (!props.parentContainer) {
      return;
    }

    const endOfPage =
      props.parentContainer.clientHeight + props.parentContainer.scrollTop >=
      props.parentContainer.scrollHeight - 100;

    if (endOfPage) {
      props.onMore?.();
    }

    if (props.currentPage === props.pageCount) {
      scrollEnabled.current = false;
    }
  };

  return (
    <section>
      <div
        onScroll={() => {
          if (throttleTimer.current || !scrollEnabled.current) {
            return;
          }
          throttleTimer.current = true;
          setTimeout(() => {
            handleScroll();
            throttleTimer.current = false;
          }, 1000);
        }}
        className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-4 p-8"
      >
        {props.collection?.map((media) => (
          <MediaCard key={media.id} media={media} />
        ))}
      </div>
    </section>
  );
};
