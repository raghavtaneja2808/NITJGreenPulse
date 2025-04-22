const express = require("express")
const bodyParser = require("body-parser")
const { GoogleGenerativeAI } = require("@google/generative-ai")
require("dotenv").config()
const cors=require("cors");
const session=require("express-session");
const passport = require("passport");
const mongoose=require("mongoose")
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cors({credentials: true, 
  origin: process.env.CLIENT_URL||"http://localhost:3000"}))

app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30*24*60*60*1000 }, // 5 min expiry
  })
);
app.use(passport.initialize())
app.use(passport.session())
// Use your API key (hardcoded for now; in production, use process.env.GEMINI_API_KEY)
const genAI = new GoogleGenerativeAI("AIzaSyDGOVSR0ADvoooSBZ2LyfCkKHCX2Tkqxh4")
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

// Helper function: chunks long text (if needed)
const chunkText = (text, chunkSize = 500) => {
  const chunks = [];
  for (let i = 0; i < text.length; i += chunkSize) {
    chunks.push(text.substring(i, i + chunkSize));
  }
  return chunks;
};

// Global instruction to decide if the query is plant-related (text-based)
const INSTRUCTIONS =
  "You are a plant health specialist. " +
  "You excel at identifying plant diseases from a textual description of the plant's condition. " +
  "You have extensive expertise in Indian flora and fauna and understand multiple Indian languages. " +
  "If the user query is not in English, first translate it to English. " +
  "Then, if the prompt is related to plants, respond with '1'; otherwise, respond with '0'. " +
  "Respond strictly with only '1' or '0'.";

// POST /msg endpoint
app.post("/msg", async (req, res) => {
  const { messages } = req.body;
  
  // Check: Only work with text-based queries.
  if (messages.some(msg => msg.image)) {
    return res.json({ 
      reply: "For image-based diagnosis, please remove the image and provide a descriptive text about the plant's condition.",
      title: ""
    });
  }

  // Concatenate text-based messages (if very long, use chunkText and join)
  const textMsgs = messages
    .filter(msg => msg.text)
    .map(msg => `${msg.sender === "farmer" ? "Farmer" : "Agent"}: ${msg.text}`)
    .join("\n");

  // Decide language by sending a language detection prompt (optional)
  const languageInst = 
    "You excel at detecting language from queries. " +
    "Return only the language of the user query. " +
    "Examples: For Hindi query, respond with 'Hindi language', for Odia, 'odia language', etc.";
  let language = "English"; // default fallback

  try {
    const languageResponse = await model.generateContent(`${languageInst} Prompt: ${textMsgs}`);
    language = languageResponse.response.text().trim() || "English";
  } catch (err) {
    console.error("Language detection error:", err);
  }

  // Use the global instructions to decide if text is plant-related
  let decision = "1";
  try {
    const decisionPrompt = `${INSTRUCTIONS} Prompt: ${textMsgs}`;
    const decisionResponse = await model.generateContent(decisionPrompt);
    decision = decisionResponse.response.text().trim();
  } catch (err) {
    console.error("Decision prompt error:", err);
  }
  
  // If not plant-related, return a default answer
  if (decision !== "1") {
    return res.json({
      reply: "I assist with plant, crop, and farmer/botanist queries only. Please provide plant-specific details.",
      title: ""
    });
  }

  // --- Construct the improved system prompt for text-based analysis ---
  const systemPrompt =
    "---System-Instruction---" +
    " \nYou are an expert at identifying plant diseases based solely on a textual description of a plant’s condition." +
    " \nPlease analyze the description for any signs of disease and provide a diagnosis." +
    ` \nGive the final answer output to the user in ${language}.` +
    " \nConvert the query to English if it is not already in English." +
    " \nThink step by step." +
    " \nYou refine, reflect, and reevaluate your answers." +
    " \nDo not provide wrong or contradictory information." +
    " \nEngage only in conversations involving plants, crops, or farmer/botanist queries." +
    " \nIf the plant appears healthy, do not give a false diagnosis—reply accordingly." +
    " \nProvide the output in HTML format. Include a relevant title (using bold and italic tags) and a detailed explanation." +
    " \nUse <ul>, <li>, and <br> tags for formatting as necessary." +
    " \nEnsure your answer is well structured, clear, and includes emojis where appropriate." +
    " \nFollow a strict structure: Identify at most two possible diseases (treat these as the title) and supply the reasoning for the diagnosis as the subtitle." +
    " \nThen, step by step, propose all necessary actions for treatment—including factors such as optimal weather, temperature, insecticides, fertilizers, specialized medications, organic methods, and physical methods (e.g., isolating affected plants) to ensure full recovery." +
    " \nOrganize your solution in headers with corresponding subtext for each section." +
    " \nAvoid technical jargon where possible; be clear and simple." +
    " \nAdd a conclusion header at the end in bold with a summary (under 100 words) outlining the key urgent actions to save the crop/plant." +
    ` \nTranslate only your final answer from English back to ${language}.` +
    " \nStrictly adhere to the provided structure." +
    " \nThe solution should appear visually colorful, have a transparent background (or rgb(54, 69, 79)), white text, and white thin rounded borders." +
    " \nUse appealing color combinations, center-align everything, and provide sufficient padding to the text." +
    " \nDo not add any markdown markers like ```html at the beginning or end." +
    " \nDo not include any links, images, or videos in your response.";

  const finalTextPrompt = `${systemPrompt}\n\n${textMsgs}`;

  try {
    const analysisResponse = await model.generateContent(finalTextPrompt);
    const analysisText = analysisResponse.response.text().trim();

    // Optional: you may attempt to check if output contains HTML tags and extract them—but here we assume Gemini returns HTML.
    const finalOutput = {
      title: messages.length <= 2 ? analysisText.split("<br>")[0].replace(/<[^>]+>/g, "").trim() : "Plant Analysis Result",
      response: analysisText
    };

    return res.json(finalOutput);
  } catch (error) {
    console.error("Gemini API error:", error?.response?.data || error.message || error);
    return res.status(500).json({
      reply: "Sorry, something went wrong while processing your request.",
      title: ""
    });
  }
});

require("./models/user.js");
require("./services/passport.js")
mongoose.connect(process.env.MONGO_URL).then(()=>console.log("DB connected"));
require('./routes/authRoutes.js')(app);
app.listen(5000, () => console.log("Server running on http://localhost:5000"));
