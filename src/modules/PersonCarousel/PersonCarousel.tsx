import type { PersonMedia } from "@services/types";
import { PersonCarouselItem } from "./PersonCarouselItem/PersonCarouselItem";

type Props = {
  collection: PersonMedia[];
  title: string;
};

export const PersonCarousel = (props: Props) => {
  return (
    <section>
      <div className="flex flex-row items-center py-2 px-12">
        <h2 className="text-2xl text-white">{props.title}</h2>
        <div className="flex-auto" />
      </div>
      <div className="relative">
        <div className="overflow-y-auto py-4 px-8">
          <div className="carousel flex w-max flex-row gap-2">
            {props.collection?.map((media) => (
              <div className="carousel-item" key={media.id}>
                <PersonCarouselItem media={media} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
