import movies from "@/app/data/data.json";

export async function GET(req, { params }) {
    const { id } = params;
    const movie = movies.find(m => m.id === Number(id));
    if (!movie) {
        return new Response(JSON.stringify({ message: "Movie not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(movie), { status: 200 });
}

export async function PUT(req, { params }) {
  const { id } = params;
  const updatedData = await req.json();

  const index = movies.findIndex(m => m.id === Number(id));
  if (index === -1) {
    return new Response(JSON.stringify({ message: "Movie not found" }), { status: 404 });
  }

  movies[index] = { ...movies[index], ...updatedData, id: Number(id) };

  return new Response(JSON.stringify(movies[index]), { status: 200 });
}

export async function DELETE(req, { params }) {
  const { id } = params;
  const index = movies.findIndex(m => m.id === Number(id));
  if (index === -1) {
    return new Response(JSON.stringify({ message: "Movie not found" }), { status: 404 });
  }

  movies.splice(index, 1);

  return new Response(JSON.stringify({ message: "Movie deleted" }), { status: 200 });
}
