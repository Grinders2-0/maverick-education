import {GoogleGenerativeAI} from '@google/generative-ai';

// const { GoogleGenerativeAI } = require('@google/generative-ai');

// Access your API key as an environment variable
const genAI = new GoogleGenerativeAI("AIzaSyCo_LLxQYKKBtzVVeV_JJaT-N4H3S_rZ2s");

const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Define the endpoint


export const chatbot = async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        res.json({ text });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}