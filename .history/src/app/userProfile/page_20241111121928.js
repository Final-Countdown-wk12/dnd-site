import { db } from "@/utils/dbConnection";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import * as React from "react";
import { redirect } from "next/navigation";

export default async function createProfilePage() {
  const { userId } = await auth();

  async function createProfile(formValues) {
    "use server";
    const formData = {
      name: formValues.get("name"),
      username: formValues.get("username"),
      bio: formValues.get("bio"),
      profile_picture_url: formValues.get("profile_picture_url"),
      clerk_id: userId,
    };
    formData;

    try {
      await db.query(
        `INSERT INTO users (clerk_id, name, username, user_bio, user_email, profile_picture_url,)
          VALUES ($1, $2, $3, $4, $5 $6)`,
        [formData.name, formData.username, formData.bio, formData.profile_picture_url, formData.clerk_id]
      );

      revalidatePath(`/user/${userId}`);
      redirect(`/user/${userId}`);
    } catch (error) {
      console.error("Error creating profile:", error);
    }
  }
  return (
    <div>
      <div className="formContainer">
        <div>
          <h1 className="text-center text-xl font-bold">Create your profile for others to see</h1>

          <form action={createProfile} className="space-y-4">
            <div className="form-spacing">
              <label htmlFor="name">Name:</label>
              <textarea type="text" name="name" id="name" required />
            </div>
            <div className="form-spacing">
              <label htmlFor="username">Username:</label>
              <textarea type="text" name="username" id="username" required />
            </div>

            <div className="form-spacing">
              <label htmlFor="bio">Bio:</label>
              <textarea name="bio" id="bio" required />
            </div>

            <div className="form-spacing">
              <label htmlFor="profile_picture_url">Profile Picture Url:</label>
              <textarea
                type="text"
                name="profile_picture_url"
                id="profile_picture_url"
                // required
              />
            </div>
            <button className="createButton" type="submit">
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
