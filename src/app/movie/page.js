"use client";
import Link from "next/link";

import { useEffect, useState } from "react";

export default function MoviePage() {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    genre: "",
    description: "",
    poster: "",
  });

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      id: Date.now(),
      title: formData.title,
      genre: formData.genre.split(",").map((g) => g.trim()),
      description: formData.description,
      poster: formData.poster,
    };
    setMovies((prev) => [newMovie, ...prev]);
    setFormData({ title: "", genre: "", description: "", poster: "" });
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-10 relative">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">🎬 Movies</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          + Add Movie
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-gray-600 shadow-md rounded-lg overflow-hidden"
          >
            <Link href={`/movie/${movie.id}`}>
                <div className="aspect-[2/3] w-full bg-gray-800 cursor-pointer">
                    <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 hover:scale-105"
                    />
                </div>
            </Link>
            <div className="p-4">
              <h2 className="text-lg font-bold">{movie.title}</h2>
              <p className="text-sm text-gray-500">{movie.genre.join(", ")}</p>
              <p className="text-sm mt-2">{movie.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Add New Movie</h2>
            <label className="block mb-2">
              <span className="text-sm font-medium">Title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInput}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>
            <label className="block mb-2">
              <span className="text-sm font-medium">Genre (comma-separated)</span>
              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleInput}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>
            <label className="block mb-2">
              <span className="text-sm font-medium">Poster URL</span>
              <input
                type="url"
                name="poster"
                value={formData.poster}
                onChange={handleInput}
                className="w-full mt-1 p-2 border rounded"
                required
              />
            </label>
            <label className="block mb-4">
              <span className="text-sm font-medium">Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInput}
                className="w-full mt-1 p-2 border rounded"
                rows={4}
                required
              ></textarea>
            </label>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
