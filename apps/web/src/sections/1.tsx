function Hero() {
  return (
    <>
      <img
        className="w-[min(520px,82vw)] scale-110 max-[700px]:w-[76vw] max-[700px]:scale-100"
        src="/title.png"
        alt="Title"
      />

      <div
        className="relative h-[38vh] w-full max-[700px]:h-[32vh]"
        aria-hidden="true"
      >
        <div className="absolute top-[calc(50%+0.5rem)] left-0 z-10 w-full -translate-y-1/2 overflow-hidden">
          <div className="flex w-max animate-scroll-left [animation-duration:60s]">
            {Array.from({ length: 12 }).map((_, index) => (
              <img
                key={index}
                className="w-125 flex-none scale-75 opacity-75 max-[700px]:w-85"
                src="/elems.png"
                alt=""
              />
            ))}
          </div>
        </div>

        <div className="absolute top-[calc(50%+0.5rem)] left-1/2 z-20 animate-bounce-small opacity-85">
          <img
            className="size-40 object-contain invert sepia max-[700px]:size-30"
            src="/travel.png"
            alt=""
          />
        </div>

        <div className="absolute top-[calc(50%+1.75rem)] left-0 z-30 w-full -translate-y-1/2 overflow-hidden">
          <div className="flex w-max animate-scroll-left">
            {Array.from({ length: 12 }).map((_, index) => (
              <img
                key={index}
                className="w-125 flex-none max-[700px]:w-85"
                src="/elems.png"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

function StartButton({
  isLoading = false,
  onStart,
}: {
  isLoading?: boolean;
  onStart: () => void;
}) {
  return (
    <button
      className="rounded-full border-2 border-black bg-white/90 px-8 py-4 font-text text-xl shadow-[5px_5px_0_#111] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111] disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[5px_5px_0_#111]"
      disabled={isLoading}
      onClick={onStart}
      type="button"
    >
      {isLoading ? "Loading..." : "Start your own journey"}
    </button>
  );
}

export default function Section1({
  isLoading,
  onStart,
  stationCount,
}: {
  isLoading: boolean;
  onStart: () => void;
  stationCount: number;
}) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <Hero />

      {stationCount === 0 ? (
        <StartButton isLoading={isLoading} onStart={onStart} />
      ) : null}
    </section>
  );
}
