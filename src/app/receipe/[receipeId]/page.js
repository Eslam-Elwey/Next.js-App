"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function RecipeDetails() {
  const { receipeId } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`https://forkify-api.herokuapp.com/api/get?rId=${receipeId}`)
      .then((res) => res.json())
      .then((data) => setRecipe(data.recipe));
  }, [receipeId]);

  if (!recipe) return <p className="text-center text-white mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-5">
      <div className="max-w-3xl mx-auto bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
        <img
          src={recipe.image_url}
          alt={recipe.title}
          className="w-full h-96 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-bold text-lime-400 mb-3 text-center">
            {recipe.title}
          </h1>
          <p className="text-gray-300 text-center mb-2">
            👨‍🍳 Published by:{" "}
            <a
              href={recipe.publisher_url}
              target="_blank"
              className="text-lime-300 underline hover:text-lime-200"
            >
              {recipe.publisher}
            </a>
          </p>
          <p className="text-gray-400 text-center mb-4">
            ⭐ Social Rank: {Math.round(recipe.social_rank)}
          </p>

          <div className="flex justify-center mb-4">
            <a
              href={recipe.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-lime-500 text-black font-semibold px-5 py-2 rounded-full hover:bg-lime-400 transition"
            >
              View Full Recipe 🔗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
