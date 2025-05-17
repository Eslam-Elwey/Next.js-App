import movies from "@/app/data/data.json";

export async function GET() {
  return new Response(JSON.stringify(movies), { status: 200 });
}

export async function POST(req) {
  const newMovie = await req.json();
  movies.push({ ...newMovie, id: movies.length + 1 });
  return new Response(JSON.stringify(newMovie), { status: 201 });
}
