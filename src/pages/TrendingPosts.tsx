import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";
interface Post {
  id: number;
  title: string;
  body: string;
  commentCount: number;
}

const TrendingPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_BASE_URL}/posts`,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
            },
          }
        );

        const postsWithCommentCount = await Promise.all(
          response.data.map(async (post: any) => {
            const commentsRes = await axios.get(
              `${process.env.REACT_APP_API_BASE_URL}/posts/${post.id}/comments`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.REACT_APP_AUTH_TOKEN}`,
                },
              }
            );
            return {
              ...post,
              commentCount: commentsRes.data.length,
            };
          })
        );

        const maxCount = Math.max(...postsWithCommentCount.map((p) => p.commentCount));
        const trending = postsWithCommentCount.filter((p) => p.commentCount === maxCount);
        setPosts(trending);
      } catch (err) {
        console.error("Error fetching trending posts", err);
      }
    };

    fetchTrendingPosts();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">🔥 Trending Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} title={post.title} body={post.body} commentCount={post.commentCount} />
      ))}
    </div>
  );
};

export default TrendingPosts;
