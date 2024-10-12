# Auranox AI Chatbot

**Note: This app is being developed as part of a CS course project and for the UAE IoT&AI Challenge competition. Development is currently in progress.**

Welcome to the Auranox AI Chatbot project! This is an AI-powered healthcare assistant built with Next.js, React, and Tailwind CSS.

## App Screenshots

Here are some screenshots of the Auranox AI Chatbot in action:

### Home Page (Light Mode)
![Home Page Light Mode](/public/images/home-page-light.png)
*Home Page of Auranox AI Chatbot in Light Mode*

### Home Page (Dark Mode)
![Home Page Dark Mode](/public/images/home-page-dark.png)
*Home Page of Auranox AI Chatbot in Dark Mode*

### Chat Interface
![Chat Interface](/public/images/chat-page.png)
*AI-powered Chat Interface*

## Features

- AI-powered chat interface using Google's Generative AI
- Multiple chat modes: General, Medical Report Analysis, Drug Details, and Expert Advice
- Dynamic theme switching (light/dark mode)
- Persistent chat history using local storage
- YouTube video suggestions for health-related queries
- Responsive design for desktop and mobile devices

## Technologies and Languages Used

- **TypeScript**: Used throughout the project for type-safe JavaScript development
  - Main application logic in `components/ChatInterface.tsx`
  - Page components in `app/` directory
- **JavaScript**: Configuration files and some utility functions
  - `next.config.js` for Next.js configuration
  - `tailwind.config.js` for Tailwind CSS setup
- **React 18**: UI component library
  - Functional components with hooks in `components/` directory
- **Next.js 14**: React framework for server-side rendering and routing
  - App Router in `app/` directory
  - API routes in `app/api/` directory
- **Tailwind CSS**: Utility-first CSS framework for styling
  - Custom styles in `app/globals.css`
- **shadcn/ui**: Customizable UI components
  - Used in various components like buttons, inputs, and dialogs
- **Google Generative AI**: For generating AI responses
  - Integrated in `components/ChatInterface.tsx`
- **YouTube Data API**: For fetching related health videos
  - API integration in `app/api/youtube-search.ts`

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

- `app/`: Next.js app router and page components (TypeScript)
  - `layout.tsx`: Root layout component
  - `page.tsx`: Main page component
  - `api/`: API routes for server-side operations
- `components/`: React components (TypeScript)
  - `ChatInterface.tsx`: Main chat interface logic
  - `ui/`: Reusable UI components
- `lib/`: Utility functions and shared logic (TypeScript)
- `public/`: Static assets
- `styles/`: Global CSS styles (Tailwind CSS)

## Key Files

- `components/ChatInterface.tsx`: Core chat functionality and UI
- `app/layout.tsx`: Root layout with theme provider
- `tailwind.config.js`: Tailwind CSS configuration
- `next.config.js`: Next.js configuration

## Deployment

This project is ready for deployment on platforms like Vercel or Netlify. Make sure to set up the environment variables in your deployment platform's settings.

**Important Note:** The app is currently in development and far from perfect. There are many incomplete features and potential bugs. We welcome your feedback, bug reports, and feature suggestions to help improve the application.

## Contributing

Contributions are welcome! We appreciate any help in improving the app, fixing bugs, or implementing new features. Please feel free to:

- Report bugs or issues you encounter
- Suggest new features or improvements
- Submit pull requests for bug fixes or new functionality

If you notice any incomplete aspects of the app, please don't hesitate to bring them to our attention. We're actively working on enhancing the app and value your input.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
