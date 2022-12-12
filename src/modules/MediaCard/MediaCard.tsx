import { Stars } from "@components/Stars/Stars";
import { getPoster, getPosterSet } from "@services/images";
import type { ProductionMedia } from "@services/types";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { getHeading, getMediaType } from "./MediaCard.utils";

type Props = {
  media: ProductionMedia;
};

export const MediaCard = (props: Props): ReactElement => {
  const mediaType = getMediaType(props.media);
  const heading = getHeading(props.media);

  return (
    <a href={paths.media(mediaType, props.media.id)} className="w-48">
      <div className="transition-scale scale-95 duration-300 ease-in-out hover:scale-100">
        <picture>
          <img
            alt={heading}
            className="max-w-full border-4 border-base-300 object-cover "
            src={getPoster(props.media, "92")}
            srcSet={getPosterSet(props.media, "185")}
            width={185}
            height={270}
          />
        </picture>
      </div>
      <span>{heading}</span>
      <Stars rating={props.media.vote_average} />
    </a>
  );
};
