import React from "react";
import Navbar from "./components/Navbar";
import TrendingPosts from "./pages/TrendingPosts";
import TopUsers from "./pages/TopUsers";
import Feed from "./pages/Feed";

const App = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Feed />
          <TrendingPosts />
        </div>
        <aside>
          <TopUsers />
        </aside>
      </main>
    </div>
  );
};

export default App;
