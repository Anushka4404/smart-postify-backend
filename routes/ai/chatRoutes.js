import express from 'express';
import dotenv from "dotenv";
import { GoogleGenerativeAI } from '@google/generative-ai';
const router = express.Router();

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a helpful AI assistant for a blog website. The website allows users to read and write blog posts, 
    share their stories, and connect with other writers. Please provide a helpful response to the following user query: ${message}
    Keep your response concise, friendly, and informative. If asked about specific features, explain how to use them.
    If asked about writing blogs, provide tips and encouragement.`;

    const result = await model.generateContent(prompt);
    // Assuming result.response.text() returns a Promise<string>
    const text = await result.response.text();

    return res.json({ content: text });
  } catch (error) {
    console.error('AI chat error:', error);
    return res.status(500).json({ error: 'Failed to generate response' });
  }
});

export default router;


