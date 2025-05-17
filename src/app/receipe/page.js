"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [receipe, setReceipe] = useState([]);
  const pathName = usePathname();

  useEffect(() => {
    fetch("https://forkify-api.herokuapp.com/api/search?q=pizza")
      .then((res) => res.json())
      .then((data) => setReceipe(data.recipes));
  }, []);

  
  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <h1 className="text-3xl font-bold text-center text-lime-400 mb-8">
        🍕 CSR - Pizza Recipes
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {receipe.map((rec) => (
          <div
            key={rec.recipe_id}
            className="bg-gray-800 rounded-2xl shadow-md overflow-hidden transition-transform hover:scale-105"
          >
            <Link href={`${pathName}/${rec.recipe_id}`}>
              <img
                src={rec.image_url}
                alt={rec.title}
                className="object-cover w-full h-52"
              />
            </Link>
              <div className="p-3">
                <h2 className="text-lg font-semibold text-center text-lime-300">
                  {rec.title}
                </h2>
              </div>
            
          </div>
        ))}
      </div>
    </div>
  );
}
