import { db } from "../../utils/dbconnection";
import { auth } from "@clerk/nextjs/server";

export async function POST(req) {
  const { userId } = await auth();
  if (!userId) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
  }

  try {
    const { data } = await req.json();
    await db.collection('yourCollection').insertOne({ userId, data });
    return new Response(JSON.stringify({ message: "Data inserted successfully" }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error", error: error.message }), { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { Allow: "POST" } });
}



