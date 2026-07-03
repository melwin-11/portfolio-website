# Melwin Robinson - Personal Portfolio

A minimalist, high-performance personal portfolio website built with React, Vite, Tailwind CSS, and Framer Motion. 
Features a dynamic cursor image trail, a macOS-style interactive dock, and custom frosted-glass popups.

## Features
- **Dynamic Image Trail**: Images follow your cursor with spring physics and fall into an infinity-loop animation when idle.
- **macOS Dock**: Interactive bottom dock with magnification, bounce animations, and application state indicators.
- **About Window**: Frosted glass macOS-style popup window with spring entrance/exit animations.
- **SEO Optimized**: Fully configured with meta tags, Open Graph, Twitter cards, `robots.txt`, and `sitemap.xml`.

---

## Local Development & Setup

This repository is private. Follow these instructions to download it locally, run it, and make your own modifications.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher recommended) installed on your machine.

### 1. Clone the Repository
Open your terminal and clone the repository using Git:

```bash
git clone https://github.com/melwin-11/portfolio-website.git
cd portfolio-website
```

### 2. Install Dependencies
Install all the required packages using npm:

```bash
npm install
```

### 3. Start the Development Server
Run the local Vite development server:

```bash
npm run dev
```
Open `http://localhost:5173` in your browser to view the site.

### 4. Making Changes
- **Photos**: Add your images to the `public/Photos/` folder.
- **Image Trail**: Edit `src/App.tsx` and modify the `trailItems` array to change the images, their rotation, and shadows.
- **Dock Icons**: Edit the `dockApps` array in `src/App.tsx` to add/remove apps or change their click behaviors.
- **About Me**: Edit `src/components/AboutWindow.tsx` to modify the content of the popup window.

### 5. Build for Production
To create a production-ready build (e.g., before deploying to Vercel):

```bash
npm run build
```
This will generate optimized static files in the `dist/` directory.

---
*Domain: [melwinrobinson.xyz](https://melwinrobinson.xyz/)*
