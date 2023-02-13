import "./App.scss";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/auth";
import SetAvatar from "./pages/SetAvatar/SetAvatar";
import Chat from "./pages/chat/Chat";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/setavatar" element={<SetAvatar />} />
      <Route path="/" element={<Chat />} />
    </Routes>
  );
}

export default App;
