
  async function page({ params }) {
    const getData = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${params.itemId}`, {
        cache: 'force-cache',
      });
  
      return res.json();
    };
  
    const item = await getData();
  
    return (
      <div className="min-h-screen bg-gray-900 text-white px-6 py-10">
        <h1 className="text-center text-3xl font-bold text-lime-400 mb-8">SSG Product Details</h1>
  
        <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6 grid md:grid-cols-2 items-center gap-8">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-96 object-contain bg-white p-4 rounded"
          />
          <div>
            <h2 className="text-2xl font-semibold text-lime-300 mb-2">{item.title}</h2>
            <p className="text-gray-400 mb-4">{item.description}</p>
            <p className="text-lime-200 mb-2">Price: ${item.price}</p>
            <p className="text-gray-400">Category: {item.category}</p>
            <p className="text-gray-400 mt-2">
              Rating: {item.rating.rate} ⭐ ({item.rating.count} reviews)
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  export default page;
  