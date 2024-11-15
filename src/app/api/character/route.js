import { db } from "@/app/utils/dbconnection";
import { withAuth } from "@clerk/nextjs/server"; // Clerk middleware for authentication

export default withAuth(async (req, res) => {
  const { method } = req;

  switch (method) {
    case "POST":
      try {
        const { userId } = req.auth; // Clerk user ID for the authenticated user
        if (!userId) {
          return res.status(401).json({ error: "Unauthorized" });
        }

        const { player_name, character_info, stats } = req.body;

        await db.query(
          `
          INSERT INTO character (player_name, character_info, stats) 
          VALUES ($1, $2, $3)
          `,
          [player_name, character_info, stats]
        );

        res.status(201).json({ message: "Character created successfully" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error creating character" });
      }
      break;

    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
});