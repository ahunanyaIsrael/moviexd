# MovieXD (React + Vite)

A modern movie/TV browsing and streaming frontend built with React, Vite, Tailwind CSS and React Query.

## 🚀 Project Overview

`moviexd` is a frontend app for searching and viewing movies and series, with features like:

- Home page with popular & trending content
- Movies and TV routes
- Search input and results
- Item detail pages including series details + episodes
- Video player pages
- Recommendations
- Responsive layout

## 🧩 Tech Stack

- React 19
- Vite
- Tailwind CSS 4
- React Router DOM 7
- React Query (TanStack) 5
- Axios
- ESLint

## 📁 Project Structure

- `src/main.jsx` - app entry
- `src/App.jsx` - routes and layout
- `src/pages/` - page components (`Home`, `Movies`, `Tv`, `Player`, `SeriesDetails`, `SeriesPlayer`)
- `src/components/` - reusable UI (Navbar, Hero, MovieCard, Series, SeriesCard, Recommendations, Footer, Loader)
- `src/utilities/api.js` - API data fetching

## 🛠️ Available Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run preview` - preview prod build locally
- `npm run lint` - run ESLint

## ⚙️ Install & Run

1. `npm install`
2. `npm run dev`
3. Open `http://localhost:5173`

## 🔗 API Integration

Configure `src/utilities/api.js` with your preferred provider (e.g., TMDB). Ensure the API supports:

- movie/series list endpoints
- search endpoints
- item detail endpoints
- streaming/video source data

## 🧪 Deployment

1. `npm run build`
2. Deploy `dist/` to Vercel, Netlify, GitHub Pages, etc.

## 📌 License

MIT
