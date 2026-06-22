import { GoogleGenerativeAI } from '@google/generative-ai';
import { parseJsonLoose } from '../src/utils/aiParser';

const GEMINI_KEY = process.env.VITE_GEMINI_API_KEY || process.env.GEMINI_API_KEY;
const GROQ_KEY = process.env.GROQ_API_KEY;

const genAI = new GoogleGenerativeAI(GEMINI_KEY || '');

async function callPollinations(systemInstruction: string, userPrompt: string) {
  const resp = await fetch('https://text.pollinations.ai/openai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'openai',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt },
      ],
      jsonMode: true,
    }),
  });
  const data = await resp.json();
  return data.choices[0].message.content;
}

async function callGroq(systemInstruction: string, userPrompt: string) {
  const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_KEY}`,
    },
    body: JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemInstruction },
        { role: 'user', content: userPrompt },
      ],
      response_format: { type: 'json_object' },
    }),
  });
  const data = await resp.json();
  return data.choices[0].message.content;
}

export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { topic, level, goal, language } = req.body;
  const langName = language === 'RU' ? 'Russian' : 'Uzbek';

  const systemInstruction = `You are the MyMath AI Tutor, a friendly and expert Mathematics teacher.
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
  "topic": "string",
  "level": "string",
  "goal": "string",
  "sections": [
    { "title": "string", "content": "string with markdown formatting and LaTeX", "type": "concept|exercise|summary|example" }
  ],
  "vocabulary": [
    { "term": "Mathematical term", "definition": "definition in ${langName}" }
  ],
  "sources": ["string"]
}`;

  const userPrompt = `Topic: "${topic}", Level: "${level}", Goal: "${goal}", Support Language: "${langName}"`;

  try {
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: { responseMimeType: 'application/json' }
    });

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: systemInstruction + "\n\n" + userPrompt }] }]
    });

    const text = result.response.text();
    const lesson = parseJsonLoose(text);
    if (!lesson) {
      console.error('Gemini returned invalid JSON:', text);
      throw new Error('Gemini JSON format rejected');
    }
    return res.status(200).json({ lesson });
  } catch (error: any) {
    console.warn('Gemini failed, trying fallbacks. Error:', error.message);
    try {
      // For Vercel, let's prioritize Pollinations if keys might be missing
      const text = await callPollinations(systemInstruction, userPrompt);
      const lesson = parseJsonLoose(text);
      if (lesson) return res.status(200).json({ lesson });
      
      // Try Groq as second fallback
      const groqText = await callGroq(systemInstruction, userPrompt);
      const groqLesson = parseJsonLoose(groqText);
      if (groqLesson) return res.status(200).json({ lesson: groqLesson });
      
      throw new Error('All JSON parsing failed');
    } catch (fallbackError: any) {
      console.error('All AI providers failed:', fallbackError);
      res.status(500).json({ 
        error: 'AI xizmati vaqtincha mavjud emas.',
        debug: {
          mainError: error.message,
          fallbackError: fallbackError.message,
          env: {
            hasGemini: !!GEMINI_KEY,
            hasGroq: !!GROQ_KEY
          }
        }
      });
    }
  }
}
