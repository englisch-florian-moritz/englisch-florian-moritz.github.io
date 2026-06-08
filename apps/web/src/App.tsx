import { useState } from "react";

import Section1 from "./sections/1";
import Section2 from "./sections/2";
import Section3, {
  createStation,
  type FinishResult,
  type Question,
  type Station,
} from "./sections/3";

type AnsweredQuestion = Question & {
  selectedAnswer: string;
};

type ApiError = {
  error: string;
  message?: string;
  status?: number;
  code?: string | number;
};

const totalQuestions = 10;
const retryDelayMs = 1800;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function isStringArray(value: unknown): value is string[] {
  return (
    Array.isArray(value) && value.every((item) => typeof item === "string")
  );
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
    ])
  );
}

function getErrorMessage(body: unknown, fallback: string) {
  const apiError = getApiError(body);
  const status = getStatusPrefix(apiError);
  const message = getOptionalString(apiError.message ?? apiError.error);

  return `${status}${message || fallback}`;
}

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
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

function useJourney(apiUrl: string, apiPassword: string) {
  const [stations, setStations] = useState<Station[]>([]);
  const [finishResult, setFinishResult] = useState<FinishResult>();
  const [isLoading, setIsLoading] = useState(false);

  async function requestJsonOnce(path: string, body: unknown[]) {
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

  async function requestJson(path: string, body: unknown[]) {
    for (;;) {
      try {
        return await requestJsonOnce(path, body);
      } catch (requestError) {
        console.error(`Retrying ${path}`, requestError);
        await delay(retryDelayMs);
      }
    }
  }

  async function loadNextQuestion(answeredQuestions: AnsweredQuestion[]) {
    for (;;) {
      const body = await requestJson("/generate", answeredQuestions);

      if (isQuestion(body)) {
        setStations((currentStations) => [
          ...currentStations,
          createStation(body, currentStations.length),
        ]);
        return;
      }

      console.error("Retrying /generate: invalid question response", body);
      await delay(retryDelayMs);
    }
  }

  async function loadFinishResult(answeredQuestions: AnsweredQuestion[]) {
    for (;;) {
      const body = await requestJson("/finish", answeredQuestions);

      if (isFinishResult(body)) {
        setFinishResult(body);
        return;
      }

      console.error("Retrying /finish: invalid final result response", body);
      await delay(retryDelayMs);
    }
  }

  async function startJourney() {
    setStations([]);
    setFinishResult(undefined);
    setIsLoading(true);

    await loadNextQuestion([]);
    setIsLoading(false);
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
    setIsLoading(true);

    if (answeredQuestions.length >= totalQuestions) {
      await loadFinishResult(answeredQuestions);
    } else {
      await loadNextQuestion(answeredQuestions);
    }

    setIsLoading(false);
  }

  return {
    chooseAnswer,
    finishResult,
    isLoading,
    startJourney,
    stations,
  };
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
      <Section1
        isLoading={journey.isLoading}
        onStart={startJourney}
        stationCount={journey.stations.length}
      />

      <Section2 />

      <Section3
        finishResult={journey.finishResult}
        isLoading={journey.isLoading}
        onAnswer={chooseAnswer}
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
