import { getProfile, getProfileSet } from "@services/images";
import type { PersonMedia } from "@services/types";
import { paths } from "@utils/paths";

type Props = {
  media: PersonMedia;
};

export const PersonCarouselItem = (props: Props) => {
  return (
    <a href={paths.media("person", props.media.id)} className="w-48">
      <div className="transition-scale scale-95 duration-300 ease-in-out hover:scale-100">
        <picture>
          <img
            alt={props.media.name}
            className="max-w-full border-4 border-base-300 object-cover "
            src={getProfile(props.media, "w45")}
            srcSet={getProfileSet(props.media)}
            width={185}
            height={270}
          />
        </picture>
      </div>
      <span>{props.media.name}</span>
    </a>
  );
};
