import type { MediaType } from "@services/types";
import Image from "next/image";
import { ReactElement } from "react";

type Props = {
  media?: MediaType;
  links: Record<string, string | undefined>;
};

export const ExternalLinks = (props: Props): ReactElement => {
  return (
    <ul className="flex flex-row gap-4 opacity-80">
      {props.links.twitter_id ? (
        <li>
          <a
            href={`https://twitter.com/${props.links.twitter_id}`}
            target="_blank"
            aria-label="Twitter account"
            rel="noreferrer"
          >
            <Image
              src="/images/twitter.svg"
              width={20}
              height={20}
              alt="twitter"
              className="scale-95 transition duration-300 ease-in-out hover:scale-110"
            />
          </a>
        </li>
      ) : null}
      {props.links.facebook_id ? (
        <li>
          <a
            href={`https://facebook.com/${props.links.facebook_id}`}
            target="_blank"
            aria-label="Facebook account"
            rel="noreferrer"
          >
            <Image
              src="/images/facebook.svg"
              width={20}
              height={20}
              alt="facebook"
              className="scale-95 transition duration-300 ease-in-out hover:scale-110"
            />
          </a>
        </li>
      ) : null}
      {props.links.instagram_id ? (
        <li>
          <a
            href={`https://instagram.com/${props.links.instagram_id}`}
            target="_blank"
            aria-label="Instagram account"
            rel="noreferrer"
          >
            <Image
              src="/images/instagram.svg"
              width={20}
              height={20}
              alt="instagram"
              className="scale-95 transition duration-300 ease-in-out hover:scale-110"
            />
          </a>
        </li>
      ) : null}
      {props.links.imdb_id ? (
        <li>
          <a
            href={`https://www.imdb.com/${
              props.media === "person" ? "name" : "title"
            }/${props.links.imdb_id}`}
            target="_blank"
            aria-label="IMDb account"
            rel="noreferrer"
          >
            <Image
              src="/images/imdb.svg"
              width={20}
              height={20}
              alt="imdb"
              className="scale-95 transition duration-300 ease-in-out hover:scale-110"
            />
          </a>
        </li>
      ) : null}
      {props.links.homepage ? (
        <li>
          <a
            href={props.links.homepage}
            target="_blank"
            aria-label="Homepage"
            rel="noreferrer"
          >
            <Image
              src="/images/link.svg"
              width={20}
              height={20}
              alt="homepage"
              className="scale-95 transition duration-300 ease-in-out hover:scale-110"
            />
          </a>
        </li>
      ) : null}
    </ul>
  );
};
