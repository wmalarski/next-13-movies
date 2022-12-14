import { paths } from "@utils/paths";
import Image from "next/image";

export const Navbar = () => {
  return (
    <nav className="bg-black px-6 py-8 text-black md:h-screen">
      <ul className="flex justify-around gap-10 md:flex-col md:justify-start w-max">
        <li className="hover:opacity-80">
          <a href={paths.index}>
            <Image
              src="/images/home.svg"
              width={24}
              height={24}
              alt="home"
              aria-label="Home"
            />
          </a>
        </li>
        <li className="hover:opacity-80">
          <a href={paths.movies}>
            <Image
              src="/images/movie.svg"
              width={24}
              height={24}
              alt="movie"
              aria-label="Movies"
            />
          </a>
        </li>
        <li className="hover:opacity-80">
          <a href={paths.tv}>
            <Image
              src="/images/tv.svg"
              width={24}
              height={24}
              alt="tv"
              aria-label="TV"
            />
          </a>
        </li>
        <li className="hover:opacity-80">
          <a href={paths.search}>
            <Image
              src="/images/magnifier.svg"
              width={24}
              height={24}
              alt="search"
              aria-label="Search"
            />
          </a>
        </li>
      </ul>
    </nav>
  );
};
