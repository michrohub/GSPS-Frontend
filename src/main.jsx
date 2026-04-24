import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./Router/router.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ChatProvider } from "./context/ChatContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ChatProvider>
        <RouterProvider router={router} />
      </ChatProvider>
    </AuthProvider>
  </StrictMode>
);


