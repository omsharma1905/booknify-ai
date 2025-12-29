const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// @desc    Generate a book outline
// @route   POST /api/ai/generate-outline
// @access  Private
const generateOutline = async (req, res) => {
    try {
        const { topic, style, numChapters, description } = req.body;

        if (!topic) {
            return res.status(400).json({ message: "Please provide a topic" });
        }

        const safeNumChapters = Number(numChapters) || 5;

        const prompt = `You are an expert book outline generator. Create a comprehensive book outline based on the following requirements:

Topic: "${topic}"
${description ? `Description: ${description}` : ""}
const safeStyle = style || "neutral";
Number of Chapters: ${safeNumChapters}

Requirements:

1. Generate exactly ${safeNumChapters} chapters
2. Each chapter title should be clear, engaging, and follow a logical progression
3. Each chapter description should be 2-3 sentences explaining what the chapter covers
4. Ensure chapters build upon each other coherently
5. Match the "${style}" writing style in your titles and descriptions

Output Format:
Return ONLY a valid JSON array with no additional text, markdown, or formatting. Each object must have exactly two keys: "title" and "description".

Generate the outline now:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        if (!response || !response.text) {
            console.error("Empty AI response");
            return res
                .status(500)
                .json({ message: "AI returned an empty response" });
        }

        const text = response.text.trim();

        const startIndex = text.indexOf("[");
        const endIndex = text.lastIndexOf("]");

        if (startIndex === -1 || endIndex === -1 || endIndex < startIndex) {
            console.error("Could not find JSON array in AI response:", text);
            return res.status(500).json({
                message: "Failed to parse AI response, no JSON array found.",
            });
        }

        const jsonString = text.slice(startIndex, endIndex + 1);

        try {
            const outline = JSON.parse(jsonString);

            if (!Array.isArray(outline)) {
                throw new Error("Parsed outline is not an array");
            }

            res.status(200).json({ outline });
        } catch (e) {
            console.error("Failed to parse AI response:", jsonString);
            res.status(500).json({
                message:
                    "Failed to generate a valid outline. The AI response was not valid JSON.",
            });
        }
    } catch (error) {
        console.error("Error generating outline:", error);
        res
            .status(500)
            .json({ message: "Server error during AI outline generation" });
    }
};

// @desc    Generate content for a chapter
// @route   POST /api/ai/generate-chapter-content
// @access  Private
const generateChapterContent = async (req, res) => {
    try {
        const { chapterTitle, chapterDescription, style } = req.body;

        if (!chapterTitle) {
            return res
                .status(400)
                .json({ message: "Please provide a chapter title" });
        }

        const prompt = `You are an expert writer specializing in ${style} content. Write a complete chapter for a book with the following specifications:

Chapter Title: "${chapterTitle}"
${chapterDescription ? `Chapter Description: ${chapterDescription}` : ""}
const safeStyle = style || "neutral";
Target Length: Comprehensive and detailed (aim for 1500-2500 words)

Requirements:
1. Write in a ${style ? style.toLowerCase() : "consistent"} tone throughout the chapter
2. Structure the content with clear sections and smooth transitions
3. Include relevant examples, explanations, or anecdotes as appropriate for the style
4. Ensure the content flows logically from introduction to conclusion
5. Make the content engaging and valuable to readers
${chapterDescription ? "6. Cover all points mentioned in the chapter description" : ""}

Format Guidelines:
- Start with a compelling opening paragraph
- Use clear paragraph breaks for readability
- Include subheadings if appropriate for the content length
- End with a strong conclusion or transition to the next chapter
- Write in plain text without markdown formatting

Begin writing the chapter content now:`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
        });

        if (!response || !response.text) {
            console.error("Empty AI response");
            return res
                .status(500)
                .json({ message: "AI returned an empty response" });
        }

        res.status(200).json({ content: response.text });
    } catch (error) {
        console.error("Error generating chapter:", error);
        res
            .status(500)
            .json({ message: "Server error during AI chapter generation" });
    }
};

module.exports = {
    generateOutline,
    generateChapterContent,
};