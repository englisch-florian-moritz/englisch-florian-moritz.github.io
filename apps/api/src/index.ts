import OpenAI from "openai";

import getFinishSysPrompt from "./finishsysprompt";
import getFinishUserPrompt from "./finishuserprompt";
import getSysPrompt from "./sysprompt";
import getUserPrompt from "./userprompt";

const port = Number(process.env.PORT ?? 3000);
const model = process.env.OPENAI_MODEL ?? "gpt-4.1-mini";
const openAiUrl = process.env.OPENAI_URL;
type RequestCheck = (request: Request) => Response | undefined;

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization, Content-Type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
    },
  });
}

function isAuthorized(request: Request) {
  const password = process.env.API_PASSWORD;

  if (!password) {
    return false;
  }

  return request.headers.get("Authorization") === `Bearer ${password}`;
}

function validateMethod(request: Request) {
  if (request.method === "OPTIONS") {
    return jsonResponse({ ok: true });
  }

  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }
}

function validatePasswordConfigured() {
  if (!process.env.API_PASSWORD) {
    return jsonResponse({ error: "API_PASSWORD is not configured" }, 500);
  }
}

function validateAuthorization(request: Request) {
  if (!isAuthorized(request)) {
    return jsonResponse({ error: "Unauthorized" }, 401);
  }
}

function validateOpenAiConfigured() {
  if (!process.env.OPENAI_API_KEY) {
    return jsonResponse({ error: "OPENAI_API_KEY is not configured" }, 500);
  }
}

const requestChecks: RequestCheck[] = [
  validateMethod,
  validatePasswordConfigured,
  validateAuthorization,
  validateOpenAiConfigured,
];

function validateGenerateRequest(request: Request) {
  for (const check of requestChecks) {
    const response = check(request);

    if (response) {
      return response;
    }
  }
}

async function readJsonArray(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON" }, 400);
  }

  if (!Array.isArray(body)) {
    return jsonResponse({ error: "Request body must be a JSON array" }, 400);
  }

  return body;
}

function stripJsonCodeFence(output: string) {
  const trimmedOutput = output.trim();
  const fencedJson = trimmedOutput.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);

  return fencedJson?.[1]?.trim() ?? trimmedOutput;
}

function parseOpenAiJson(output: string) {
  try {
    return jsonResponse(JSON.parse(stripJsonCodeFence(output)));
  } catch {
    return jsonResponse({ error: "OpenAI returned invalid JSON", output }, 502);
  }
}

function getErrorProperty(error: unknown, property: string) {
  if (!error || typeof error !== "object" || !(property in error)) {
    return undefined;
  }

  return error[property as keyof typeof error];
}

function getNumberValue(value: unknown) {
  if (typeof value === "number") {
    return value;
  }
}

function getStringValue(value: unknown) {
  if (typeof value === "string") {
    return value;
  }
}

function getStringOrNumberValue(value: unknown) {
  return getStringValue(value) ?? getNumberValue(value);
}

function getOpenAiErrorResponse(error: unknown) {
  const status = getNumberValue(getErrorProperty(error, "status"));
  const message = getStringValue(getErrorProperty(error, "message"));
  const code = getStringOrNumberValue(getErrorProperty(error, "code"));

  return jsonResponse(
    {
      error: "OpenAI request failed",
      status,
      code,
      message,
    },
    status ?? 502,
  );
}

async function requestOpenAiJson(systemPrompt: string, userPrompt: string) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: openAiUrl,
  });

  try {
    const response = await openai.responses.create({
      model,
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const output = response.output_text;

    if (!output) {
      return jsonResponse({ error: "OpenAI returned an empty response" }, 502);
    }

    return parseOpenAiJson(output);
  } catch (error) {
    console.error("OpenAI request failed", error);
    return getOpenAiErrorResponse(error);
  }
}

function requestGeneratedQuestion(questions: unknown[]) {
  return requestOpenAiJson(
    getSysPrompt(),
    getUserPrompt(JSON.stringify(questions)),
  );
}

function requestFinishResult(questions: unknown[]) {
  return requestOpenAiJson(
    getFinishSysPrompt(),
    getFinishUserPrompt(JSON.stringify(questions)),
  );
}

async function generate(request: Request) {
  const validationError = validateGenerateRequest(request);

  if (validationError) {
    return validationError;
  }

  const questions = await readJsonArray(request);

  if (questions instanceof Response) {
    return questions;
  }

  return requestGeneratedQuestion(questions);
}

async function finish(request: Request) {
  const validationError = validateGenerateRequest(request);

  if (validationError) {
    return validationError;
  }

  const questions = await readJsonArray(request);

  if (questions instanceof Response) {
    return questions;
  }

  return requestFinishResult(questions);
}

Bun.serve({
  port,
  routes: {
    "/": new Response("Hello world"),
    "/generate": generate,
    "/finish": finish,
  },
});

console.log(`API listening on http://localhost:${port}`);
