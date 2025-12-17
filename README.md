<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LifeThrottling - Adventure Portfolio

A Next.js-powered travel and adventure portfolio showcasing journeys across diverse landscapes, cities, mountains, deserts, and coasts.

## Features

- 🗺️ Interactive map view with Leaflet
- 📸 Beautiful image galleries and slideshows
- 🤖 AI-powered travel assistant (Gemini)
- 📱 Fully responsive design
- ⚡ Built with Next.js 15 and React 19

## Run Locally

**Prerequisites:** Node.js 18+ and npm/yarn/pnpm

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
   ```
   Or use `GEMINI_API_KEY` for server-side only usage.

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS
- **Maps:** Leaflet
- **AI:** Google Gemini API
- **Language:** TypeScript
