async function page() {
    const getData = async () => {
      const res = await fetch("https://6821d512b342dce8004bfd39.mockapi.io/users", {
        cache: "no-store",
      });
      return res.json();
    };
  
    const users = await getData();
  
    return (
      <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
        <h1 className="text-center text-3xl font-bold text-lime-400 mb-8">Server-Side Users</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {users.map((user) => (
            <div
              key={user.id}
              className="bg-gray-800 rounded-xl p-5 shadow-lg hover:shadow-lime-500/20 transition duration-300"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full border-2 border-lime-500"
                />
                <div>
                  <h2 className="text-xl font-semibold text-lime-300">{user.name}</h2>
                  <p className="text-sm text-gray-400">
                    Joined: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  export default page;
  