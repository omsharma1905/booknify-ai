# Booknify AI – Backend

This directory contains the backend service for **Booknify AI**, responsible for AI content generation, ebook structuring, and file exports.

---

## ⚙️ Responsibilities

- Handle AI prompt requests
- Generate outlines and chapters
- Structure ebook content
- Export ebooks to PDF / EPUB
- Serve APIs to the frontend

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- AI API (GeminiAI / compatible LLM)
- PDF & DOCX generation libraries

---

## 🔐 Environment Variables

Create a `.env` file in the backend root:

```env
MONGO_URI=your_mongo_uri_key
JWT_SECRET=your_jwt_secret_key
PORT=5000
GEMINI_API_KEY=your_api_key_here
```