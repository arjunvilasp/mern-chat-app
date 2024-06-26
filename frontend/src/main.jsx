import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/authContext.jsx";
import { ChatContextProvider } from "./context/chatContext.jsx";
import { SocketContextProvider } from "./context/socketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ChatContextProvider>
          <SocketContextProvider>
            <App />
          </SocketContextProvider>
        </ChatContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
