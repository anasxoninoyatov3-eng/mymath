import { GeneratedLesson, GeneratedQuiz, LearningGoal } from '@/types';
import { parseJsonLoose } from '@/utils/aiParser';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY || '';

async function callGroqDirect(
  systemInstruction: string,
  userPrompt: string,
  useJsonFormat = true
): Promise<string> {
  const payload: Record<string, unknown> = {
    model: 'llama-3.3-70b-versatile',
    messages: [
      { role: 'system', content: systemInstruction },
      { role: 'user', content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 2000,
  };

  if (useJsonFormat) {
    payload.response_format = { type: 'json_object' };
  }

  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify(payload),
  });

  if (!resp.ok) {
    const errText = await resp.text();
    let errMsg = `API xatosi: ${resp.status}`;
    try {
      const errJson = JSON.parse(errText);
      errMsg = errJson?.error?.message || errMsg;
    } catch {
      /* ignore */
    }
    throw new Error(errMsg);
  }

  const data = await resp.json();
  const text = data?.choices?.[0]?.message?.content || '';
  if (!text) throw new Error('AI javob bermadi');
  return text;
}

function getLessonSystemInstruction(language: 'RU' | 'UZ'): string {
  const langName = language === 'RU' ? 'Russian' : 'Uzbek';
  return `You are the MyMath AI Tutor, a friendly and expert Mathematics teacher.
Focus: Help students of all levels (grades 1-11) master Mathematics, including arithmetic, algebra, geometry, and calculus.
Adapt the teaching strategy based on the DIFFICULTY and GOAL.

STRUCTURE RULES:
1. NO GREETINGS. Start directly with the lesson content.
2. Give 4-6 sections.
3. Use Section Types: "concept", "exercise", "summary", "example".
4. Language: EXPLAIN everything in ${langName}. Use ${langName} for all explanations, descriptions, and instructions.
5. Content: Use LaTeX for mathematical formulas (e.g., $x^2 + y^2 = r^2$).
6. Return ONLY a valid JSON object. No markdown, no extra text.

The JSON must follow this shape exactly:
{
  "topic": "string - the math topic",
  "level": "string - Grade 1-11",
  "goal": "string - theoretical/practical/professional",
  "sections": [
    { "title": "string", "content": "string with markdown formatting and LaTeX", "type": "concept|exercise|summary|example" }
  ],
  "vocabulary": [
    { "term": "Mathematical term", "definition": "definition in ${langName}" }
  ],
  "sources": ["string - reference sources"]
}`;
}

function getQuizSystemInstruction(language: 'RU' | 'UZ'): string {
  const langName = language === 'RU' ? 'Russian' : 'Uzbek';
  return `You are a Mathematics Quiz Generator for the MyMath app.
GENERATE A JSON OBJECT for a Multiple Choice Quiz with exactly this structure:
{
  "topic": "math quiz topic",
  "questions": [
    {
      "question": "The question in ${langName} (use LaTeX for formulas)",
      "options": ["A", "B", "C", "D"],
      "correctIndex": 0,
      "explanation": "explanation of the correct answer in ${langName} (with LaTeX)"
    }
  ]
}
Return ONLY valid JSON. Generate exactly 5 questions.`;
}

export async function createLesson(
  topic: string,
  level: string,
  goal: LearningGoal,
  language: 'RU' | 'UZ'
): Promise<GeneratedLesson> {
  try {
    const resp = await fetch('/api/createLesson', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, level, goal, language }),
    });

    if (resp.ok) {
      const data = await resp.json();
      if (data.lesson?.sections?.length) return data.lesson as GeneratedLesson;
    }
  } catch (e) {
    console.warn('createLesson API unavailable, using direct fallback', e);
  }

  const langName = language === 'RU' ? 'Russian' : 'Uzbek';
  const systemInstruction = getLessonSystemInstruction(language);
  const userPrompt = `Topic: "${topic}", Level: "${level}", Goal: "${goal}", Support Language: "${langName}"`;
  const text = await callGroqDirect(systemInstruction, userPrompt, true);
  const parsed = parseJsonLoose<GeneratedLesson>(text);

  if (parsed?.sections?.length) return parsed;
  throw new Error('Dars ma\'lumotlarini tahlil qilib bo\'lmadi');
}

export async function createQuiz(
  topic: string,
  level: string,
  language: 'RU' | 'UZ'
): Promise<GeneratedQuiz> {
  const langName = language === 'RU' ? 'Russian' : 'Uzbek';
  const systemInstruction = getQuizSystemInstruction(language);
  const userPrompt = `Create a comprehensive multiple-choice Practice Quiz covering the topic: "${topic}".
Level: "${level}", Language: "${langName}". Generate exactly 5 questions that test the main concepts of this topic.`;

  try {
    const resp = await fetch('/api/generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction, userPrompt }),
    });

    if (resp.ok) {
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const parsed = parseJsonLoose<GeneratedQuiz>(text);
      if (parsed?.questions?.length) return parsed;
    }
  } catch (e) {
    console.warn('generateContent API unavailable, using direct fallback', e);
  }

  const text = await callGroqDirect(systemInstruction, userPrompt, true);
  const parsed = parseJsonLoose<GeneratedQuiz>(text);

  if (parsed?.questions?.length) return parsed;
  throw new Error('Test ma\'lumotlarini tahlil qilib bo\'lmadi');
}

export async function generateContent(
  systemInstruction: string,
  userPrompt: string
): Promise<string> {
  try {
    const resp = await fetch('/api/generateContent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ systemInstruction, userPrompt }),
    });

    if (resp.ok) {
      const data = await resp.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (text) return text;
    }
  } catch (e) {
    console.warn('generateContent API unavailable, using direct fallback', e);
  }

  return callGroqDirect(systemInstruction, userPrompt, false);
}
