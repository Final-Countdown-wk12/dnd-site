import { db } from "@/app/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM groups;");
    return new Response(JSON.stringify(result.rows), { status: 200 });
  } catch (error) {
    console.error("GET Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { group_name, description } = await req.json();
    const user = await currentUser();
    const dm = user.username;
    console.log("POST Data:", { group_name, description, dm });

    const result = await db.query("INSERT INTO groups (group_name, description, dm) VALUES ($1, $2, $3) RETURNING *;", [
      group_name,
      description,
      dm,
    ]);
    console.log("POST Result:", result.rows[0]);

    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}