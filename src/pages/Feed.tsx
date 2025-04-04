import { useEffect, useState } from "react";
import axios from "axios";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;
  const USER_ID = "YOUR_USER_ID"; // Replace with dynamic user ID

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/users/${USER_ID}/posts`, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });
        setPosts(response.data.reverse());
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
    const interval = setInterval(fetchPosts, 5000);
    return () => clearInterval(interval);
  }, [API_BASE_URL, AUTH_TOKEN]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Live Feed</h1>
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow-md p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold">{post.title}</h2>
          <p className="text-gray-600">{post.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
