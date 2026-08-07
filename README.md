# Feedple Web Application

Feedple enables people to create an AI companion trained using their expertise to guide real-world decisions on their behalf.

---

## 🚀 Features

- 🤖 **AI Companion Creation & Customization**: Easily build, fine-tune, and deploy custom AI companions.
- 📝 **Rich Text Editing**: Integrated [Tiptap](https://tiptap.dev/) editor with extensions for formatting, tables, typography, subscript, superscript, images, and highlights.
- 💳 **Stripe Payment Integration**: Seamless subscription and payment processing powered by `@stripe/stripe-js`.
- ⚡ **Next.js 15 & React 19**: Built on the latest web technologies for fast rendering, dynamic routing, and optimal user experience.
- 🎨 **Modern Dark-Themed UI**: Built using Material UI (MUI v7), `@mui/material-nextjs`, and SCSS styling.
- 🔄 **Backend Proxy**: Automated environment-aware URL resolution to proxy `/api/py/*` requests to the Python FastAPI backend service.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components & Styling**: Material UI (MUI v7), Radix UI, Sass / SCSS, Emotion
- **Editor**: Tiptap Editor Suite
- **State Management & Data Fetching**: TanStack React Query v5, Zustand, SWR
- **Payments**: Stripe JS (`@stripe/react-stripe-js`)
- **Authentication & Tokens**: `jose` (JWT handling)

---

## 📦 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher
- **npm** (or `yarn` / `pnpm`)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd KaitabDemo
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and specify the required environment configurations:

   ```env
   APP_ENV=development
   LOCAL_BACKEND_URL=http://127.0.0.1:8000/api/py/
   # GCLOUD_BACKEND_URL=https://your-gcloud-backend-url/api/py/
   # RENDER_BACKEND_URL=https://your-render-backend-url/api/py/
   ```

4. **Run the Development Server**:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command | Description |
|---|---|
| `npm run dev` | Runs the app in development mode on `http://0.0.0.0:3000` |
| `npm run build` | Builds the app for production usage |
| `npm run start` | Starts the Next.js production server |
| `npm run lint` | Runs ESLint to check for code quality issues |

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///home/umar/Projects/KaitabDemo/LICENSE) file for details.
