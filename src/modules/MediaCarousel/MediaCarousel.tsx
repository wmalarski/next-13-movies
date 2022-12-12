import type { ProductionMedia } from "@services/types";
import { ReactElement } from "react";
import { MediaCard } from "../MediaCard/MediaCard";

type Props = {
  collection: ProductionMedia[];
  title: string;
  viewAllHref: string;
};

export const MediaCarousel = (props: Props): ReactElement => {
  return (
    <section>
      <div className="flex flex-row items-center py-2 px-12">
        <h2 className="text-2xl text-white">{props.title}</h2>
        <div className="flex-auto" />
        <a
          className="transition-text opacity-80 duration-100 ease-in-out hover:text-qwik-light-blue hover:opacity-100"
          href={props.viewAllHref}
        >
          Explore All
        </a>
      </div>
      <div className="relative">
        <div className="overflow-y-auto py-4 px-8">
          <div className="carousel flex w-max flex-row gap-2">
            {props.collection?.map((media) => (
              <div className="carousel-item" key={media.id}>
                <MediaCard media={media} />
              </div>
            ))}
            <a
              className="transition-text flex w-44 items-center justify-center duration-100 ease-in-out hover:text-qwik-light-blue"
              href={props.viewAllHref}
            >
              Explore All
            </a>
          </div>
        </div>
        {/* TODO: Add buttons */}
      </div>
    </section>
  );
};
