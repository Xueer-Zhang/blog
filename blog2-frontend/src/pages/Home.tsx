import { Link } from "react-router-dom";
import { usePostContext } from "../contexts/PostContext";

export default function Home() {
  const { posts } = usePostContext();

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">article list</h1>
      <ul className="space-y-4">
        {posts.map((post) => (
          <li key={post.id} className="p-4 border rounded hover:shadow">
            <h3 className="text-xl font-semibold text-blue-600 hover:underline">
              <Link to={`/post/${post.id}`}>{post.title}</Link>
            </h3>
            <p className="text-gray-600">{post.content.slice(0, 50)}...</p>
            
          </li>
        ))}
      </ul>
    </div>
  );
}