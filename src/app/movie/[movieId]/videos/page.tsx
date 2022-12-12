import { DocumentHead } from "@builder.io/qwik-city";

export default function MovieVideosPage() {
  return (
    <section className="grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-6 px-16 py-4">
      {data.videos?.results?.map((video) => (
        <a
          className="aspect-video"
          href={`https://www.youtube.com/watch?v=${video.key}`}
          target="_none"
        >
          <img
            alt={video.name}
            src={`https://movies-proxy.vercel.app/ipx/f_webp,s_400x600/youtube/vi/${video.key}/maxresdefault.jpg`}
            className="h-full max-h-full w-full object-cover"
            width={400}
            height={600}
          />
          <div className="mt-2 flex flex-col gap-2">
            <span>{video.name}</span>
            <span className="op-60 text-sm">{video.type}</span>
          </div>
        </a>
      ))}
    </section>
  );
}

export const head: DocumentHead = {
  title: "Qwik City Movies",
};
