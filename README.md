# 🧑‍🏫 Markdown Presentation App (Frontend)

A lightweight, custom-built presentation app inspired by PowerPoint — powered by React + Vite — where all slides are written and rendered using **Markdown** (parsed to AST). Features include slide navigation, editing, syntax highlighting, mobile support, and more.

> 🔗 [Live Demo (Vercel)](https://webppt-app.vercel.app)  
> 🔌 [Backend Repo](https://github.com/wiseinvoker/webppt-api)

---

## 🛠 Tech Stack

- **React.js** (Frontend framework)
- **Vite** (Lightning-fast dev/build tool)
- **Markdown AST Parsing**: `remark`, `unified`, custom React renderers
- **Routing**: `react-router-dom`
- **Mobile Friendly**: CSS Grid/Flexbox
- **Slide Progression**: Custom Progress Bar + Hotkeys

---

## 🚀 Features

✅ Markdown-based slide content  
✅ Forward/backward navigation  
✅ Slide editor with saving  
✅ Code syntax highlighting  
✅ AST → React component rendering (no HTML injection)  
✅ Multiple slide layouts  
✅ Mobile-responsive design  
✅ Slide progression UI  
✅ Hotkeys for navigation (`←`, `→`)  
✅ Storybook for component development  
✅ Unit & integration tests with Vitest + React Testing Library

---

## 🧪 Running Locally

### 1. Clone the repo

```bash
git clone https://github.com/wiseinvoker/webppt-app
cd webppt-app
```
### 2. Install dependencies
```bash
yarn
```
### 3. Start the app
```bash
yarn dev
```
## ⚙️ Environment Variables
Create a .env file in the root:
```env
VITE_API_URL=http://localhost:5000/api
```

## 🧪 Testing
Run tests:
```bash
yarn test
```
Run Storybook:
```bash
yarn storybook
```
## 📁 API Integration
The app fetches slides via REST API from a Node.js/Express backend with Sequelize (PostgreSQL).
Endpoints used:

- GET /slides

- POST /slides

- PUT /slides/:id

- DELETE /slides/:id

