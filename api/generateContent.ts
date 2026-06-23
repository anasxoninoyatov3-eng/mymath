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
        { role: 'system', content: (systemInstruction || '') },
        { role: 'user', content: userPrompt },
      ],
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
        { role: 'system', content: (systemInstruction || '') },
        { role: 'user', content: userPrompt },
      ],
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

  const { systemInstruction, userPrompt } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
    });

    const result = await model.generateContent({
      contents: [
        { role: 'user', parts: [{ text: (systemInstruction ? systemInstruction + "\n\n" : "") + userPrompt }] }
      ]
    });

    const responseData = {
      candidates: [{ content: { parts: [{ text: result.response.text() }] } }]
    };

    res.status(200).json(responseData);
  } catch (error: any) {
    console.warn('Gemini failed, trying fallbacks:', error.message);
    
    let text = '';
    
    // Try Groq first as it's usually more reliable than Pollinations for complex prompts
    if (GROQ_KEY) {
      try {
        text = await callGroq(systemInstruction, userPrompt);
      } catch (err) {
        console.warn('Groq fallback failed:', err);
      }
    }

    // Try Pollinations if Groq failed or was skipped
    if (!text) {
      try {
        text = await callPollinations(systemInstruction, userPrompt);
      } catch (err) {
        console.warn('Pollinations fallback failed:', err);
      }
    }

    if (text) {
      const responseData = {
        candidates: [{ content: { parts: [{ text: text }] } }]
      };
      return res.status(200).json(responseData);
    }

    res.status(500).json({ 
      error: 'AI xizmati vaqtincha mavjud emas.',
      debug: {
        mainError: error.message,
        env: {
          hasGemini: !!GEMINI_KEY,
          hasGroq: !!GROQ_KEY
        }
      }
    });
  }
}
