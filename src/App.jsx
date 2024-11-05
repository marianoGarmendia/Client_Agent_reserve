import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
function App() {
  console.log(import.meta.url);

  return (
    <main className="h-dvh flex flex-col w-full items-center justify-center">
      <Routes>
        <Route path="/" element={<ChatPage />}></Route>
      </Routes>
    </main>
  );
}

export default App;