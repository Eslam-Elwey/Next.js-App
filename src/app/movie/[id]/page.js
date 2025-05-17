"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function MovieDetailPage() {
  const params = useParams();
  const {id} = params;
  const [movie, setMovie] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();

 useEffect(() => {
    fetch(`/api/movies/${id}`)
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to fetch movie');
            }
            return res.json();
        })
        .then(data => setMovie(data))
        .catch(error => console.error('Error fetching movie:', error));
}, [id]);

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this movie?");
    if (!confirm) return;

    await fetch(`/api/movies/${id}`, { method: "DELETE" });
    router.push("/movie");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    await fetch(`/api/movies/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(movie),
    });
    setEditMode(false);
  };

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <div className="flex flex-col md:flex-row gap-6">
        <img src={movie.poster} alt={movie.title} className="w-72 rounded-lg shadow-lg" />

        <div className="flex-1 space-y-4">
          {editMode ? (
            <>
              <input
                className="bg-gray-700 p-2 rounded w-full"
                value={movie.title}
                name="title"
                onChange={handleInputChange}
              />
              <input
                className="bg-gray-700 p-2 rounded w-full"
                value={movie.genre.join(", ")}
                name="genre"
                onChange={(e) => setMovie(prev => ({
                  ...prev,
                  genre: e.target.value.split(",").map(g => g.trim())
                }))}
              />
              <textarea
                className="bg-gray-700 p-2 rounded w-full"
                value={movie.description}
                name="description"
                onChange={handleInputChange}
              />
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              <p><strong>Genre:</strong> {movie.genre.join(", ")}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Cast:</strong> {movie.cast?.join(", ")}</p>
              <p><strong>Release Year:</strong> {movie.releaseYear}</p>
              <p><strong>Duration:</strong> {movie.duration}</p>
              <p><strong>Language:</strong> {movie.language}</p>
              <p><strong>Rating:</strong> {movie.rating}</p>
              <p className="mt-4">{movie.description}</p>
            </>
          )}

          <div className="flex gap-4 mt-4">
            <button
              onClick={() => setEditMode(!editMode)}
              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded text-white"
            >
              {editMode ? "Cancel Edit" : "Edit"}
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
