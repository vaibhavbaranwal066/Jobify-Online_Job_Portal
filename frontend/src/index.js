// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import { JobProvider } from "./context/JobContext";

// ✅ Define a single recruiter object globally
export const DEFAULT_RECRUITER = {
  id: "recruiter_001",
  name: "Recruiter Admin",
  email: "recruiter@company.com",
  role: "recruiter",
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        {/* ✅ Pass the recruiter to JobProvider */}
        <JobProvider recruiter={DEFAULT_RECRUITER}>
          <App />
        </JobProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
