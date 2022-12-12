import { getProfile, getProfileSet } from "@services/images";
import type { PersonMediaDetails } from "@services/types";
import { formatDate } from "@utils/format";
import { ExternalLinks } from "../ExternalLinks/ExternalLinks";

export const calculateAge = (birthday: string, deathday?: string) => {
  const cutoffDate = deathday ? Number(new Date(deathday)) : Date.now();
  const ageDifMs = cutoffDate - Number(new Date(birthday));
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

type Props = {
  person: PersonMediaDetails;
};

export const PersonHero = (props: Props) => {
  const links = {
    ...props.person.external_ids,
    homepage: props.person.homepage,
  };

  return (
    <section className="flex justify-center p-6">
      <div className="flex max-w-5xl flex-row items-center gap-8">
        <div className="hidden flex-grow md:flex">
          {props.person.profile_path ? (
            <div className="min-w-max">
              <picture>
                <img
                  alt={props.person.name}
                  className="w-80"
                  src={getProfile(props.person, "w45")}
                  srcSet={getProfileSet(props.person)}
                />
              </picture>
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="mb-4 text-3xl">{props.person.name}</h2>
            {props.person.biography ? (
              <div className="opacity-80">
                {props.person.biography
                  .split("\n")
                  .filter((section) => section !== "")
                  .map((section) => (
                    <p key={section} className="mt-4">
                      {section}
                    </p>
                  ))}
              </div>
            ) : null}
          </div>
          <div className="grid grid-cols-[max-content_1fr] items-center gap-3 text-sm opacity-80 lg:grid-cols-[max-content_1fr_max-content_1fr]">
            {props.person.known_for_department ? (
              <>
                <div>Known For</div>
                <div>{props.person.known_for_department}</div>
              </>
            ) : null}
            {props.person.birthday ? (
              <>
                <div>Born</div>
                <div>
                  {formatDate(props.person.birthday)}{" "}
                  {!props.person.deathday ? (
                    <span>(age {calculateAge(props.person.birthday)})</span>
                  ) : null}
                </div>
              </>
            ) : null}

            {props.person.place_of_birth ? (
              <>
                <div>Place of Birth</div>
                <div>{props.person.place_of_birth}</div>
              </>
            ) : null}

            {props.person.deathday ? (
              <>
                <div>Died</div>
                <div>
                  {formatDate(props.person.deathday)}{" "}
                  {props.person.birthday ? (
                    <span>
                      age{" "}
                      {calculateAge(
                        props.person.birthday,
                        props.person.deathday
                      )}
                    </span>
                  ) : null}
                </div>
              </>
            ) : null}
          </div>

          <div>
            <ExternalLinks media="person" links={links} />
          </div>
        </div>
      </div>
    </section>
  );
};
