import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import InstructionsPage from "./pages/InstructionsPage";

function App() {
  return (
    <main className="h-dvh flex flex-col w-full items-center justify-center px-4">
      <Routes>
        <Route path="/" element={<ChatPage />}></Route>
        <Route path="/instructions" element={<InstructionsPage />}></Route>
      </Routes>
    </main>
  );
}

export default App;
