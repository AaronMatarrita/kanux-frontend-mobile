import { useState, useEffect, useCallback, useMemo } from 'react';
import { Clipboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { challengesService } from "@/services/challenges.service";

// types
export type NormalizedFeedback = {
  markdown?: string;
  finalScore?: number;
  summary?: string;
  strengths?: string[];
  areasForImprovement?: string[];
  nextSteps?: string[];
  answersOverview?: { total?: number; correct?: number; incorrect?: number; };
  perQuestionFeedback?: Array<{ questionId?: string; correct?: boolean; explanation?: string; }>;
  scoreBreakdown?: Record<string, number>;
  tests?: { total?: number; passed?: number; failed?: number; details?: unknown; };
  codeQuality?: Record<string, number>;
  title?: string;
  type?: string;
  tags?: string[];
};

type FeedbackPayload = {
  markdown?: string;
  final_score?: number;
  summary?: string;
  strengths?: unknown;
  areas_for_improvement?: unknown;
  next_steps?: unknown;
  answers_overview?: { total?: unknown; correct?: unknown; incorrect?: unknown; };
  per_question_feedback?: unknown;
  score_breakdown?: Record<string, unknown>;
  tests?: { total?: unknown; passed?: unknown; failed?: unknown; details?: unknown; };
  code_quality?: Record<string, unknown>;
  title?: string;
  type?: string;
  tags?: unknown;
  raw?: string;
  feedback?: unknown;
};

// normalized

function safeJsonParse<T = unknown>(value: string): T | null {
  try { return JSON.parse(value) as T; } 
  catch (error) { return null; }
}

function sanitizeJsonString(input: string): string {
  const stripped = input.trim()
    .replace(/^```[a-zA-Z0-9]*\s*\n?/, "")
    .replace(/\n?```\s*$/, "");
  return stripped.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
}

function normalizeMarkdown(md: string): string {
  return md.replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n")
    .replace(/(^|[^\n])\s(#{1,6}\s)/g, "$1\n$2")
    .replace(/(^|[^\n])\s-\s(?=\S)/g, "$1\n- ")
    .replace(/([^\n])\s\|\s/g, "$1\n| ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\*\*(\d+%)\n/g, "**$1**\n")
    .replace(/## Fuertes\b/g, "## Fortalezas")
    .trim();
}

function normalizeStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const normalized = value.filter((item): item is string => typeof item === "string");
  return normalized.length > 0 ? normalized : undefined;
}

function normalizeNumberRecord(value?: Record<string, unknown>): Record<string, number> | undefined {
  if (!value || typeof value !== "object") return undefined;
  const entries = Object.entries(value).filter((entry): entry is [string, number] => typeof entry[1] === "number");
  return entries.length > 0 ? Object.fromEntries(entries) : undefined;
}

function normalizeTests(value?: FeedbackPayload["tests"]): NormalizedFeedback["tests"] {
  if (!value || typeof value !== "object") return undefined;
  return {
    total: typeof value.total === "number" ? value.total : undefined,
    passed: typeof value.passed === "number" ? value.passed : undefined,
    failed: typeof value.failed === "number" ? value.failed : undefined,
    details: value.details,
  };
}

function normalizeAnswersOverview(value?: FeedbackPayload["answers_overview"]): NormalizedFeedback["answersOverview"] {
  if (!value || typeof value !== "object") return undefined;
  return {
    total: typeof value.total === "number" ? value.total : undefined,
    correct: typeof value.correct === "number" ? value.correct : undefined,
    incorrect: typeof value.incorrect === "number" ? value.incorrect : undefined,
  };
}

function normalizePerQuestionFeedback(value?: FeedbackPayload["per_question_feedback"]): NormalizedFeedback["perQuestionFeedback"] {
  if (!Array.isArray(value)) return undefined;
  return value.map((item): any => {
    if (!item || typeof item !== "object") return null;
    const record = item as Record<string, unknown>;
    return {
      questionId: typeof record.question_id === "string" ? record.question_id : undefined,
      correct: typeof record.correct === "boolean" ? record.correct : undefined,
      explanation: typeof record.explanation === "string" ? record.explanation : undefined,
    };
  }).filter(item => item !== null);
}

function extractFeedbackPayload(input: unknown): FeedbackPayload | null {
  if (!input) return null;
  if (typeof input === "string") {
    const parsed = safeJsonParse<FeedbackPayload>(input);
    return parsed ? parsed : { markdown: input };
  }
  if (typeof input === "object") {
    const payload = input as FeedbackPayload;
    if (payload.feedback) return extractFeedbackPayload(payload.feedback);
    return payload;
  }
  return null;
}

function normalizePayload(payload: FeedbackPayload): NormalizedFeedback {
  if (typeof payload.raw === "string") {
    const sanitizedRaw = sanitizeJsonString(payload.raw);
    const parsedRaw = safeJsonParse<FeedbackPayload>(sanitizedRaw);
    if (parsedRaw) return normalizePayload(parsedRaw);
  }

  return {
    markdown: typeof payload.markdown === "string" ? normalizeMarkdown(payload.markdown) : undefined,
    finalScore: typeof payload.final_score === "number" ? payload.final_score : undefined,
    summary: typeof payload.summary === "string" ? payload.summary : undefined,
    strengths: normalizeStringArray(payload.strengths),
    areasForImprovement: normalizeStringArray(payload.areas_for_improvement),
    nextSteps: normalizeStringArray(payload.next_steps),
    answersOverview: normalizeAnswersOverview(payload.answers_overview),
    perQuestionFeedback: normalizePerQuestionFeedback(payload.per_question_feedback),
    scoreBreakdown: normalizeNumberRecord(payload.score_breakdown as any),
    tests: normalizeTests(payload.tests),
    codeQuality: normalizeNumberRecord(payload.code_quality as any),
    title: payload.title,
    tags: normalizeStringArray(payload.tags),
  };
}

export function normalizeFeedback(feedback?: unknown): NormalizedFeedback {
  if (!feedback) return {};
  try {
    const payload = extractFeedbackPayload(feedback);
    if (!payload) return {};
    return normalizePayload(payload);
  } catch (error) {
    return {};
  }
}


export const useSoftChallengeResults = (submissionId: string) => {
  const [resultData, setResultData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const feedback = useMemo(() => normalizeFeedback(resultData?.feedback), [resultData?.feedback]);

  const copyToClipboard = () => {
    Clipboard.setString(submissionId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const applyLatestFeedback = useCallback(async (latestFeedback: any) => {
    if (!latestFeedback) return;
    setResultData((prev: any) => ({ ...prev, feedback: latestFeedback }));
    try {
      await AsyncStorage.setItem(`challenge:result:${submissionId}`, JSON.stringify({ ...resultData, feedback: latestFeedback }));
    } catch (e) {}
  }, [submissionId]);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const cached = await AsyncStorage.getItem(`challenge:result:${submissionId}`);
      if (cached) {
        setResultData(JSON.parse(cached));
        setLoading(false);
      }

      const [res, fb] = await Promise.allSettled([
        challengesService.getTechnicalChallengeResult(submissionId),
        challengesService.getLatestChallengeFeedback(submissionId)
      ]);

      if (res.status === 'fulfilled') {
        setResultData(res.value);
        await AsyncStorage.setItem(`challenge:result:${submissionId}`, JSON.stringify(res.value));
      }
      if (fb.status === 'fulfilled') applyLatestFeedback(fb.value);
      setLoading(false);
    } catch (err) {
      setError("Error");
      setLoading(false);
    }
  }, [submissionId, applyLatestFeedback]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { resultData, feedback, loading, error, copied, copyToClipboard };
};