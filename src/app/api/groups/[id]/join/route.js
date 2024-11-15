import { db } from "@/app/utils/dbconnection";
import { getAuth } from "@clerk/nextjs/server";

export async function POST(req, { params }) {
  const { userId } = getAuth(req);
  const usernameQuery = await db.query(`SELECT username FROM users WHERE clerk_id = $1`, [userId]);
  const username = usernameQuery.rows[0].username;

  const { id } = await params;
  try {
    const result = await db.query(
      "INSERT INTO player_group_junction (group_id, player) VALUES ($1, $2) ON CONFLICT DO NOTHING RETURNING *;",
      [id, username]
    );
    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "User already in group" }), { status: 200 });
    }
    return new Response(JSON.stringify(result.rows[0]), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
