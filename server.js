const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Use the correct class name
//Put your won API KEY
const ai = new GoogleGenerativeAI("");

const app = express();
const PORT = process.env.PORT || 5500;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// Chat route
app.post('/chat', async (req, res) => {
  const userMessage = req.body.userInput;

  if (!userMessage) {
    return res.status(400).json({ error: "No message provided." });
  }

  try {
    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(userMessage); // just pass the string!

    const reply = result.response.text();
    res.json({ response: reply });

  } catch (err) {
    console.error('AI error:', err);
    res.status(500).json({ response: "AI could not respond. Try again later." });
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
