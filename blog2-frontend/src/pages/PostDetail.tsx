// src/pages/PostDetail.tsx
import { useParams } from "react-router-dom";
import { dummyPosts } from "../data/posts";

export default function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const postId = parseInt(id || "");
  const post = dummyPosts.find((p) => p.id === postId);

  if (!post) return <p>article does not exist!</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>author：{post.author}</p>
      <p>{post.content}</p>
    </div>
  );
}