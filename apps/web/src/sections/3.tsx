export type Question = {
  situation: string;
  question: string;
  answers: string[];
};

export type FinishResult = {
  jongaOverlapPercent: number;
  successConfidencePercent: number;
  jongaOverlapExplanation: string;
  successExplanation: string;
};

export type Station = Question & {
  selectedAnswer?: string;
  offsetX: number;
  offsetY: number;
  rotation: number;
};

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

export function createStation(question: Question, index: number): Station {
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
      className="w-full max-w-2xl rounded-4xl border-2 border-black bg-[#f3f2e0] p-6 text-left shadow-[6px_6px_0_#111] transition max-[700px]:translate-x-0!"
      style={{
        transform: `translate(${station.offsetX}px, ${station.offsetY}px) rotate(${station.rotation}deg)`,
      }}
    >
      <div className="flex gap-3">
        <p className="text-lg leading-8">{station.situation}</p>
        <p className="text-sm">{index + 1}</p>
      </div>
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

function FinishCard({ finishResult }: { finishResult: FinishResult }) {
  return (
    <section className="mt-12 w-full max-w-3xl rounded-4xl border-2 border-black bg-[#fcf4e3] p-7 text-left shadow-[7px_7px_0_#111]">
      <h2 className="font-title text-4xl">This is your story</h2>
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
    </section>
  );
}

function LoadingPill() {
  return (
    <p className="mt-8 rounded-full border-2 border-black bg-white/90 px-8 py-4 text-xl shadow-[4px_4px_0_#111]">
      Loading...
    </p>
  );
}

export default function Section3({
  finishResult,
  isLoading,
  onAnswer,
  stations,
}: {
  finishResult?: FinishResult;
  isLoading: boolean;
  onAnswer: (stationIndex: number, selectedAnswer: string) => void;
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

      {finishResult ? <FinishCard finishResult={finishResult} /> : null}
    </section>
  );
}
