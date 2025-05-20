import { GoogleGenerativeAI } from "@google/generative-ai";
import express from "express";
import dotenv from "dotenv";

const router = express.Router();
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  try {
    const { title, section } = req.body;

    if (!title || !section) {
      return res.status(400).json({ error: "Title and section are required" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt;
    switch (section) {
      case "intro":
        prompt = `Write a compelling introduction paragraph for a blog post titled "${title}". 
        The introduction should hook the reader and provide a brief overview of what the post will cover.`;
        break;
      case "description":
        prompt = `Write a detailed, multi-paragraph description for a blog post titled "${title}". 
        Include relevant information, examples, and insights. Make it informative and engaging.`;
        break;
      case "conclusion":
        prompt = `Write a strong concluding paragraph for a blog post titled "${title}". 
        Summarize the key points and end with a thought-provoking statement or call to action.`;
        break;
      default:
        return res.status(400).json({ error: "Invalid section specified" });
    }

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return res.json({ content: text });
  } catch (error) {
    console.error("AI generation error:", error);
    return res.status(500).json({ error: "Failed to generate content" });
  }
});

export default router;
