# Auranox AI Chatbot

Welcome to the Auranox AI Chatbot project! This is an AI-powered healthcare assistant built with Next.js, React, and Tailwind CSS.

## Features

- AI-powered chat interface using Google's Generative AI
- Multiple chat modes: General, Medical Report Analysis, Drug Details, and Expert Advice
- Dynamic theme switching (light/dark mode)
- Persistent chat history using local storage
- YouTube video suggestions for health-related queries
- Responsive design for desktop and mobile devices

## Technologies Used

- Next.js 14
- React 18
- Tailwind CSS
- shadcn/ui components
- Google Generative AI
- YouTube Data API

## Getting Started

To run this project locally:

1. Clone the repository:
   ```
   git clone https://github.com/your-username/auranox-chatbot.git
   cd auranox-chatbot
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
   YOUTUBE_API_KEY=your_youtube_api_key
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `app/`: Next.js app router and page components
- `components/`: React components including the main ChatInterface
- `lib/`: Utility functions and shared logic
- `public/`: Static assets
- `styles/`: Global CSS styles

## Deployment

This project is ready for deployment on platforms like Vercel or Netlify. Make sure to set up the environment variables in your deployment platform's settings.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
