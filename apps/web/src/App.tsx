function App() {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <main
      className="flex min-h-svh flex-col items-center justify-center overflow-hidden"
      data-api-url={apiUrl}
    >
      <img
        className="w-[min(520px,82vw)] scale-110 max-[700px]:w-[76vw] max-[700px]:scale-100"
        src="/title.png"
        alt="Title"
      />

      <div
        className="relative h-[50vh] w-full max-[700px]:h-[46vh]"
        aria-hidden="true"
      >
        <div className="absolute top-[calc(50%+0.5rem)] left-0 z-10 w-full -translate-y-1/2 overflow-hidden">
          <div className="flex w-max animate-scroll-left [animation-duration:60s]">
            {Array.from({ length: 12 }).map((_, index) => (
              <img
                key={index}
                className="w-[500px] flex-none scale-75 opacity-75 max-[700px]:w-[340px]"
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
                className="w-[500px] flex-none max-[700px]:w-[340px]"
                src="/elems.png"
                alt=""
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
