import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: number;
  name: string;
  postCount: number;
}

const TopUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
  const AUTH_TOKEN = process.env.REACT_APP_AUTH_TOKEN;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersResponse = await axios.get(`${API_BASE_URL}/users`, {
          headers: {
            Authorization: `Bearer ${AUTH_TOKEN}`,
          },
        });

        const usersData = usersResponse.data;
        const postsPromises = usersData.map((user: any) =>
          axios.get(`${API_BASE_URL}/users/${user.id}/posts`, {
            headers: { Authorization: `Bearer ${AUTH_TOKEN}` },
          })
        );

        const postsResponses = await Promise.all(postsPromises);
        const postCounts = postsResponses.reduce((acc: any, response, index) => {
          acc[usersData[index].id] = response.data.length;
          return acc;
        }, {});

        const sortedUsers = usersData
          .map((user: any) => ({ ...user, postCount: postCounts[user.id] || 0 }))
          .sort((a: any, b: any) => b.postCount - a.postCount)
          .slice(0, 5);

        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [API_BASE_URL, AUTH_TOKEN]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Top Users</h1>
      {users.map((user) => (
        <div key={user.id} className="bg-white shadow-md p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-gray-600">Posts: {user.postCount}</p>
        </div>
      ))}
    </div>
  );
};

export default TopUsers;
