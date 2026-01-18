import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import PostDetail from "./pages/PostDetail";
import WritePost from "./pages/WritePost";
import Login from "./pages/Login";
import RequireAuth from "./components/RequireAuth";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Chatbot from "./pages/Chatbot"

function App() {
  return (
    <div>
      <Navbar />
      <div className="text-3xl font-bold text-blue-600">Hello Tailwind</div>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/write" element={
          <RequireAuth>
            <WritePost />
          </RequireAuth>} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ai" element={<Chatbot />} />
      </Routes>
    </div>
  );
}

export default App;