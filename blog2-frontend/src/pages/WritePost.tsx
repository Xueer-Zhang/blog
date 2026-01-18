import { useState } from "react";
import { usePostContext } from "../contexts/PostContext";
import { useNavigate } from "react-router-dom";
import { createArticle } from "../api/crud";

export default function WritePost() {
  const { addPost } = usePostContext();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content || !author) return alert("Please fill in all fields！");
    addPost({ title, content, author });
    navigate("/");

    const article = createArticle(title,content,"draft",[]);
    console.log("The draft has been saved：", article);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">write</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded h-40"
          placeholder="Article text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="w-full border p-2 rounded"
          placeholder="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-1800 text-blue px-40 py-2 rounded hover:bg-blue-700"
        >
          post!
        </button>
      </form>
    </div>
  );
}