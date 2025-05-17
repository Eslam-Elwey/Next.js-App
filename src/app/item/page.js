import Link from "next/link";

async function page() {
  const getData = async () => {
    const data = await fetch("https://fakestoreapi.com/products", {
      next: { revalidate: 10 }, // ISR with 10-second revalidation
    });
    return data.json();
  };

  const items = await getData();

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-10">
      <h1 className="text-center text-3xl font-bold text-lime-400 mb-8">ISR - Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-gray-800 rounded-xl p-4 shadow-lg hover:shadow-lime-500/20 transition duration-300"
          >
            <Link href={`/item/${item.id}`}>
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-60 object-contain bg-white rounded-md p-3 hover:scale-105 transition-transform"
              />
            </Link>
            <h2 className="text-lg font-semibold mt-4 text-lime-300">{item.title}</h2>
            <p className="text-sm text-gray-400 mt-1">${item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
