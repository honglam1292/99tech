# Problem 2 — React + Vite + TypeScript

**🌐 Demo:** [https://honglam1292.github.io/99tech/](https://honglam1292.github.io/99tech/)

---

## 🧠 Overview

This project is the **Problem2** folder inside the `99tech` repository.  
It is a small **React + TypeScript + Vite** application that focuses on implementing a clean, maintainable UI using **MUI**, **TailwindCSS**, and **Emotion**.

The goal of this project is to demonstrate:
- Modular component-based UI design.
- Type-safe implementation with TypeScript.
- Responsive and consistent layout using MUI and TailwindCSS.
- Proper build and deployment setup for GitHub Pages.

---

## ⚙️ Tech Stack

| Tool / Library | Purpose |
|----------------|----------|
| **React 19** | Frontend UI framework |
| **TypeScript** | Type checking and autocompletion |
| **Vite 6** | Lightning-fast dev server and bundler |
| **TailwindCSS 3.4** | Utility-first CSS framework |
| **MUI 7** | Material Design component library |
| **Emotion** | CSS-in-JS for styling customization |
| **Axios** | HTTP client for API requests |
| **Day.js** | Lightweight date utility |

---

## 🧩 Project Structure


---

## 💡 Implementation Details

- **UI Design:**  
  The layout and components are implemented using a mix of **MUI** and **TailwindCSS**, providing both flexibility and clean visual hierarchy.

- **Component Logic:**  
  Each component handles its own state using React’s built-in hooks (`useState`, `useEffect`), focusing on clarity and maintainability.  
  There is **no external state management** or complex global store — the architecture remains simple and easy to follow.

- **Styling Approach:**  
  - TailwindCSS handles the general layout and spacing.  
  - Emotion is used for cases requiring dynamic or conditional styling.  
  - MUI components ensure accessibility and design consistency.

- **TypeScript Integration:**  
  Types are defined for component props and function parameters to ensure safe and predictable code behavior.

- **Code Style:**  
  ESLint and TypeScript are configured to maintain a consistent coding standard and catch potential issues early.

- **Date & Data Handling:**  
  - `dayjs` is used for date formatting and manipulation.  
  - `axios` is integrated for handling HTTP requests (ready for API connection).

---

## 🚀 Deployment

This project is deployed via **GitHub Pages** using the `gh-pages` package.

###  Steps
```bash
cd Problem2
yarn install
yarn dev
