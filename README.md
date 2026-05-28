# 📚 Quotes Gallery App

A modern **React + Vite** web application that fetches and displays inspirational quotes from a public API in a clean, responsive UI.

---

# 🚀 Live Features
Live https://quotes-gallerys.netlify.app/

* 📡 Fetch quotes from API in real time
* 🧾 Display quotes in a clean card layout
* 👤 Show author name for each quote
* 📱 Fully responsive design (mobile + desktop)
* ⏳ Loading state while fetching data
* ❌ Error handling for failed API calls
* 🎨 Simple and modern UI using CSS

---

# 🌐 API Used

## Quotes API Endpoint

```txt
https://api.freeapi.app/api/v1/public/quotes
```

### 📦 Sample Response Structure

```json
{
  "success": true,
  "data": {
    "data": [
      {
        "content": "Your quote here",
        "author": "Author Name"
      }
    ]
  }
}
```

---

# 🛠️ Tech Stack

* ⚛️ React (Hooks: useState, useEffect)
* ⚡ Vite (Fast build tool)
* 🎨 CSS3
* 📡 Fetch API

---

# 📁 Project Structure

```txt
quotes-gallery/
│
├── public/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

# ⚙️ Installation & Setup

## 1️⃣ Create Project

```bash
npm create vite@latest quotes-gallery -- --template react
```

---

## 2️⃣ Move into project

```bash
cd quotes-gallery
```

---

## 3️⃣ Install dependencies

```bash
npm install
```

---

## 4️⃣ Run development server

```bash
npm run dev
```

App will run at:

```txt
http://localhost:5173
```

---

# 🏗️ Build for Production

```bash
npm run build
```

---

# 👀 Preview Production Build

```bash
npm run preview
```

---

# 🔄 Git Setup (Optional)

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/Quotes-Gallery-App.git
git push -u origin main
```

---

# ✨ Features Explained

## 📡 API Fetching

Data is fetched using `fetch()` inside `useEffect()` when the app loads.

## 🧠 State Management

* `useState` for quotes, loading, and error handling

## 🎨 UI Design

* Grid-based responsive layout
* Card hover effects
* Clean typography

---

# 🚀 Future Improvements

* 🔍 Search quotes by author
* ❤️ Favorite quotes system
* 🌙 Dark mode toggle
* 🔄 Random quote generator
* 📄 Pagination or infinite scroll
* 📋 Copy quote button

---

# 👨‍💻 Author
Sudhanshu
