import { createContext, useContext, useState } from "react";
import type { ReactNode } from 'react';
import  { useEffect} from "react";
import { getMyArticles } from "../api/crud";


type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
};

type PostContextType = {
  posts: Post[];
  addPost: (post: Omit<Post, "id">) => void;
};

const PostContext = createContext<PostContextType | undefined>(undefined);

/**const initialPosts: Post[] = [
  { id: 1, title: "第一篇文章", content: "这是第一篇正文", author: "小明" },
  { id: 2, title: "第二篇文章", content: "这是第二篇正文", author: "小红" },
  { id: 3, title: "第三篇文章", content: "这是第三篇正文", author: "小刚" },
];**/

export const PostProvider = ({ children }: { children: ReactNode }) => {
  //const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [posts, setPosts] = useState<any[]>([]);

  const addPost = (newPost: Omit<Post, "id">) => {
    setPosts((prev) => [
      ...prev,
      { ...newPost, id: prev.length + 1 },
    ]);
  };
  
  useEffect(() => {
    getMyArticles().then(res => setPosts(res.data));
  }, []);

  return (
    <PostContext.Provider value={{ posts, addPost }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePostContext = () => {
  const context = useContext(PostContext);
  if (!context) throw new Error("PostContext 未初始化");
  return context;
};
