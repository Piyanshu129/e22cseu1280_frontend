const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-xl font-bold">📊 Social Analytics</h1>
      <div className="space-x-4">
        <a href="/" className="hover:underline">Home</a>
        <a href="/trending" className="hover:underline">Trending</a>
        <a href="/users" className="hover:underline">Top Users</a>
      </div>
    </nav>
  );
};

export default Navbar;
