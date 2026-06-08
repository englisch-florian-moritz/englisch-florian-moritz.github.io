import { useState } from "react";

type Question = {
  situation: string;
  question: string;
  answers: string[];
};

type AnsweredQuestion = Question & {
  selectedAnswer: string;
};

type FinishResult = {
  jongaOverlapPercent: number;
  successConfidencePercent: number;
  jongaOverlapExplanation: string;
  successExplanation: string;
  summary: string;
};

type Station = Question & {
  selectedAnswer?: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
};

type ApiError = {
  error: string;
  message?: string;
  status?: number;
  code?: string | number;
};

const totalQuestions = 10;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function hasStringProperties(
  value: Record<string, unknown>,
  properties: string[],
) {
  return properties.every((property) => typeof value[property] === "string");
}

function getOptionalString(value: unknown) {
  if (typeof value === "string") {
    return value;
  }

  return "";
}

function getApiError(body: unknown) {
  if (isRecord(body)) {
    return body as Partial<ApiError>;
  }

  return {};
}

function getStatusPrefix(apiError: Partial<ApiError>) {
  if (apiError.status) {
    return `${apiError.status}: `;
  }

  return "";
}

function isQuestion(value: unknown): value is Question {
  return (
    isRecord(value) &&
    hasStringProperties(value, ["situation", "question"]) &&
    isStringArray(value.answers) &&
    value.answers.length === 3
  );
}

function isFinishResult(value: unknown): value is FinishResult {
  return (
    isRecord(value) &&
    typeof value.jongaOverlapPercent === "number" &&
    typeof value.successConfidencePercent === "number" &&
    hasStringProperties(value, [
      "jongaOverlapExplanation",
      "successExplanation",
      "summary",
    ])
  );
}

function getErrorMessage(body: unknown, fallback: string) {
  const apiError = getApiError(body);
  const status = getStatusPrefix(apiError);
  const message = getOptionalString(apiError.message ?? apiError.error);

  return `${status}${message || fallback}`;
}

function getStationOffset(index: number) {
  const side = index % 2 === 0 ? -1 : 1;
  const drift = Math.sin(index * 2.11) * 28;
  const mobileSafeOffset = side * 72 + drift;

  return {
    offsetX: mobileSafeOffset,
    offsetY: Math.cos(index * 1.61) * 14,
    rotation: Math.sin(index * 1.37) * 2.4,
  };
}

function createStation(question: Question, index: number): Station {
  return {
    ...question,
    ...getStationOffset(index),
  };
}

function getTrailPath(index: number) {
  const wave = Math.sin(index * 1.73);
  const start = 50 + wave * 18;
  const end = 50 - Math.cos(index * 1.29) * 18;
  const firstControl = 18 + Math.cos(index * 0.83) * 20;
  const secondControl = 82 + Math.sin(index * 0.97) * 20;

  return `M ${start} 4 C ${firstControl} 42, ${secondControl} 96, ${end} 152`;
}

function getAnsweredQuestions(stations: Station[]): AnsweredQuestion[] {
  return stations.flatMap((station) => {
    if (!station.selectedAnswer) {
      return [];
    }

    return [
      {
        situation: station.situation,
        question: station.question,
        answers: station.answers,
        selectedAnswer: station.selectedAnswer,
      },
    ];
  });
}

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
    </>
  );
}

function Trail({ index }: { index: number }) {
  return (
    <svg
      className="my-3 h-40 w-44 overflow-visible opacity-75"
      viewBox="0 0 100 156"
      aria-hidden="true"
    >
      <path
        d={getTrailPath(index)}
        fill="none"
        stroke="#111"
        strokeDasharray="9 10"
        strokeLinecap="round"
        strokeWidth="4"
      />
    </svg>
  );
}

function StationCard({
  index,
  isLoading,
  onAnswer,
  station,
}: {
  index: number;
  isLoading: boolean;
  onAnswer: (stationIndex: number, selectedAnswer: string) => void;
  station: Station;
}) {
  return (
    <article
      className="w-full max-w-2xl rounded-[2rem] border-2 border-black bg-white/90 p-6 text-left shadow-[6px_6px_0_#111] transition max-[700px]:translate-x-0!"
      style={{
        transform: `translate(${station.offsetX}px, ${station.offsetY}px) rotate(${station.rotation}deg)`,
      }}
    >
      <p className="font-title text-sm tracking-[0.35em] uppercase opacity-70">
        Station {index + 1} / {totalQuestions}
      </p>
      <p className="mt-4 text-lg leading-8">{station.situation}</p>
      <h2 className="mt-6 font-title text-3xl leading-tight">
        {station.question}
      </h2>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {station.answers.map((answer) => (
          <button
            className="rounded-2xl border-2 border-black bg-[#fff7d6] px-4 py-3 text-left shadow-[3px_3px_0_#111] transition hover:-translate-y-0.5 hover:shadow-[5px_5px_0_#111] disabled:cursor-default disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_#111]"
            disabled={Boolean(station.selectedAnswer) || isLoading}
            key={answer}
            onClick={() => onAnswer(index, answer)}
            type="button"
          >
            {station.selectedAnswer === answer ? `Chosen: ${answer}` : answer}
          </button>
        ))}
      </div>
    </article>
  );
}

function FinishCard({
  finishResult,
  onRestart,
}: {
  finishResult: FinishResult;
  onRestart: () => void;
}) {
  return (
    <section className="mt-12 w-full max-w-3xl rounded-[2rem] border-2 border-black bg-white/95 p-7 text-left shadow-[7px_7px_0_#111]">
      <p className="font-title text-sm tracking-[0.35em] uppercase opacity-70">
        Final Result
      </p>
      <h2 className="mt-4 font-title text-4xl">Your journey ends here</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border-2 border-black bg-[#fff7d6] p-5">
          <p className="font-title text-5xl">
            {finishResult.jongaOverlapPercent}%
          </p>
          <h3 className="mt-3 text-xl">Overlap with the Jongas</h3>
          <p className="mt-3 leading-7">
            {finishResult.jongaOverlapExplanation}
          </p>
        </div>
        <div className="rounded-3xl border-2 border-black bg-[#dcf7ff] p-5">
          <p className="font-title text-5xl">
            {finishResult.successConfidencePercent}%
          </p>
          <h3 className="mt-3 text-xl">Story success confidence</h3>
          <p className="mt-3 leading-7">{finishResult.successExplanation}</p>
        </div>
      </div>
      <p className="mt-6 rounded-3xl border-2 border-black bg-white p-5 leading-7">
        {finishResult.summary}
      </p>
      <button
        className="mt-6 rounded-full border-2 border-black bg-white px-7 py-3 shadow-[4px_4px_0_#111] transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111]"
        onClick={onRestart}
        type="button"
      >
        Start again
      </button>
    </section>
  );
}

function useJourney(apiUrl: string, apiPassword: string) {
  const [stations, setStations] = useState<Station[]>([]);
  const [finishResult, setFinishResult] = useState<FinishResult>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function requestJson(path: string, body: unknown[]) {
    const response = await fetch(`${apiUrl}${path}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiPassword}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const responseBody: unknown = await response.json();

    if (!response.ok) {
      throw new Error(getErrorMessage(responseBody, "Request failed"));
    }

    return responseBody;
  }

  async function loadNextQuestion(answeredQuestions: AnsweredQuestion[]) {
    const body = await requestJson("/generate", answeredQuestions);

    if (!isQuestion(body)) {
      throw new Error("The API returned an invalid question.");
    }

    setStations((currentStations) => [
      ...currentStations,
      createStation(body, currentStations.length),
    ]);
  }

  async function loadFinishResult(answeredQuestions: AnsweredQuestion[]) {
    const body = await requestJson("/finish", answeredQuestions);

    if (!isFinishResult(body)) {
      throw new Error("The API returned an invalid final result.");
    }

    setFinishResult(body);
  }

  async function startJourney() {
    setStations([]);
    setFinishResult(undefined);
    setError("");
    setIsLoading(true);

    try {
      await loadNextQuestion([]);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Request failed",
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function chooseAnswer(stationIndex: number, selectedAnswer: string) {
    const nextStations = stations.map((station, index) => {
      if (index !== stationIndex) {
        return station;
      }

      return { ...station, selectedAnswer };
    });
    const answeredQuestions = getAnsweredQuestions(nextStations);

    setStations(nextStations);
    setError("");
    setIsLoading(true);

    try {
      if (answeredQuestions.length >= totalQuestions) {
        await loadFinishResult(answeredQuestions);
        return;
      }

      await loadNextQuestion(answeredQuestions);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Request failed",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return {
    chooseAnswer,
    error,
    finishResult,
    isLoading,
    startJourney,
    stations,
  };
}

function StartButton({ onStart }: { onStart: () => void }) {
  return (
    <button
      className="rounded-full border-2 border-black bg-white/90 px-8 py-4 font-text text-xl shadow-[5px_5px_0_#111] transition hover:-translate-y-0.5 hover:shadow-[7px_7px_0_#111]"
      onClick={onStart}
      type="button"
    >
      Start your own journey
    </button>
  );
}

function ErrorBox({ error }: { error: string }) {
  return (
    <p className="mt-6 max-w-xl rounded-2xl border-2 border-black bg-white/90 p-4 text-red-800 shadow-[4px_4px_0_#111]">
      {error}
    </p>
  );
}

function LoadingPill() {
  return (
    <p className="mt-8 rounded-full border-2 border-black bg-white/90 px-8 py-4 text-xl shadow-[4px_4px_0_#111]">
      Loading...
    </p>
  );
}

function JourneyPath({
  finishResult,
  isLoading,
  onAnswer,
  onRestart,
  stations,
}: {
  finishResult?: FinishResult;
  isLoading: boolean;
  onAnswer: (stationIndex: number, selectedAnswer: string) => void;
  onRestart: () => void;
  stations: Station[];
}) {
  if (stations.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto mt-14 flex max-w-4xl flex-col items-center pb-16">
      {stations.map((station, index) => (
        <div className="contents" key={`${station.question}-${index}`}>
          <StationCard
            index={index}
            isLoading={isLoading}
            onAnswer={onAnswer}
            station={station}
          />

          {index < stations.length - 1 ? <Trail index={index} /> : null}
        </div>
      ))}

      {isLoading ? <LoadingPill /> : null}

      {finishResult ? (
        <FinishCard finishResult={finishResult} onRestart={onRestart} />
      ) : null}
    </section>
  );
}

function IntroSection({
  error,
  isLoading,
  onStart,
  stationCount,
}: {
  error: string;
  isLoading: boolean;
  onStart: () => void;
  stationCount: number;
}) {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-center text-center">
      <Hero />

      {stationCount === 0 && !isLoading ? <StartButton onStart={onStart} /> : null}

      {error ? <ErrorBox error={error} /> : null}
    </section>
  );
}

function JourneyPage({
  apiUrl,
  journey,
}: {
  apiUrl: string;
  journey: ReturnType<typeof useJourney>;
}) {
  const startJourney = () => void journey.startJourney();
  const chooseAnswer = (stationIndex: number, selectedAnswer: string) =>
    void journey.chooseAnswer(stationIndex, selectedAnswer);

  return (
    <main className="min-h-svh overflow-hidden px-4 py-8" data-api-url={apiUrl}>
      <IntroSection
        error={journey.error}
        isLoading={journey.isLoading}
        onStart={startJourney}
        stationCount={journey.stations.length}
      />

      <JourneyPath
        finishResult={journey.finishResult}
        isLoading={journey.isLoading}
        onAnswer={chooseAnswer}
        onRestart={startJourney}
        stations={journey.stations}
      />
    </main>
  );
}

function getApiUrl() {
  return import.meta.env.VITE_API_URL || "http://localhost:3000";
}

function App() {
  const apiUrl = getApiUrl();
  const journey = useJourney(apiUrl, import.meta.env.VITE_API_PASSWORD);

  return <JourneyPage apiUrl={apiUrl} journey={journey} />;
}

export default App;
