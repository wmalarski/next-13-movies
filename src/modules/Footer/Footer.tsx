import Image from "next/image";
import { ReactElement } from "react";

export const Footer = (): ReactElement => {
  return (
    <footer className="flex flex-col gap-4 px-8 py-20">
      <div className="text-lg text-white">Next.js 13 Movies</div>
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm opacity-80">Made with</span>
        <a href="https://beta.nextjs.org/docs" className="rounded-md p-1">
          <Image
            src="/images/nextjs.svg"
            width={100}
            height={20}
            alt="Next.js"
            aria-label="Next.js"
          />
        </a>
      </div>
      <div className="flex flex-row items-center gap-2">
        <span className="text-sm opacity-80">Design by</span>
        <a href="https://movies.nuxt.space/" className="link">
          Nuxt Movies
        </a>
      </div>
      <div className="text-sm opacity-80">
        This product uses the{" "}
        <a className="link" href="https://www.themoviedb.org/documentation/api">
          TMDB API
        </a>{" "}
        but is not endorsed or certified by TMDB.
      </div>
      <div className="text-sm opacity-80">
        <a href="https://github.com/wmalarski/next-13-movies">
          <Image
            src="/images/git-hub.svg"
            width={24}
            height={24}
            alt="GitHub repository"
            aria-label="GitHub repository"
          />
        </a>
      </div>
    </footer>
  );
};
