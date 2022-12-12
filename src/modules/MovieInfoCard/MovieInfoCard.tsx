import { ExternalLinks } from "@modules/ExternalLinks/ExternalLinks";
import { getPoster, getPosterSet } from "@services/images";
import type { MovieMediaDetails, TvMediaDetails } from "@services/types";
import {
  formatCurrency,
  formatDate,
  formatLanguage,
  formatRuntime,
} from "@utils/format";
import { paths } from "@utils/paths";
import { ReactElement } from "react";

type Props = {
  media: MovieMediaDetails | TvMediaDetails;
};

export const MovieInfoCard = (props: Props): ReactElement => {
  const directors = props.media.credits?.crew?.filter(
    (person) => person.job === "Director"
  );

  const links = {
    ...props.media.external_ids,
    homepage: props.media.homepage,
  };

  return (
    <section className="flex justify-center p-6">
      <div className="flex max-w-5xl flex-row items-center gap-8">
        <div className="hidden flex-grow md:flex">
          <div className="min-w-max">
            <picture>
              <img
                alt="Poster"
                className="h-full w-80 max-w-full object-cover"
                src={getPoster(props.media, "92")}
                srcSet={getPosterSet(props.media, "342")}
              />
            </picture>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          {props.media.overview ? (
            <div>
              <h2 className="mb-4 text-3xl">Storyline</h2>
              <div className="opacity-80">{props.media.overview}</div>
            </div>
          ) : null}
          <div className="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm opacity-80 lg:grid-cols-[max-content_1fr_max-content_1fr]">
            {props.media.media_type === "movie" && props.media.release_date ? (
              <>
                <div>Released</div>
                <div>{formatDate(props.media.release_date)}</div>
              </>
            ) : null}
            {props.media.runtime ? (
              <>
                <div>Runtime</div>
                <div>{formatRuntime(props.media.runtime)}</div>
              </>
            ) : null}
            {directors && directors.length > 0 ? (
              <>
                <div>Director</div>
                <div>
                  {directors.map((person, i) => (
                    <>
                      <a href={paths.person(person.id)}>{person.name}</a>
                      {i < directors.length - 1 ? ", " : ""}
                    </>
                  ))}
                </div>
              </>
            ) : null}
            {props.media.budget ? (
              <>
                <div>Budget</div>
                <div>{formatCurrency(props.media.budget)}</div>
              </>
            ) : null}
            {props.media.revenue ? (
              <>
                <div>Revenue</div>
                <div>{formatCurrency(props.media.revenue)}</div>
              </>
            ) : null}
            {props.media.media_type && props.media.genres ? (
              <>
                <div>Genre</div>
                <div>
                  {props.media.genres.map(
                    (genre, i, arr) =>
                      props.media.media_type && (
                        <>
                          <a
                            href={paths.genre(props.media.media_type, genre.id)}
                          >
                            {genre.name}
                          </a>
                          {i < arr.length - 1 ? ", " : ""}
                        </>
                      )
                  )}
                </div>
              </>
            ) : null}
            {props.media.status ? (
              <>
                <div>Status</div>
                <div>{props.media.status}</div>
              </>
            ) : null}
            {props.media.original_language ? (
              <>
                <div>Language</div>
                <div>{formatLanguage(props.media.original_language)}</div>
              </>
            ) : null}
            {props.media.production_companies ? (
              <>
                <div>Production</div>
                <div>
                  {props.media.production_companies
                    .map((c) => c.name)
                    .join(", ")}
                </div>
              </>
            ) : null}
          </div>
          <div>
            {<ExternalLinks links={links} media={props.media.media_type} />}
          </div>
        </div>
      </div>
    </section>
  );
};
