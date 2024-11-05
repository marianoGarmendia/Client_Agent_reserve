import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { ChatContextProvider } from "./Context/ChatContext";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ChatContextProvider>
      <App />
    </ChatContextProvider>
  </HashRouter>
);
