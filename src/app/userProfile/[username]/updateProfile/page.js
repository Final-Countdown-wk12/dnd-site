"use client";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      // const { userId } = await auth();
      const response = await fetch(`/api/user`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(userId),
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    }
    console.log("hi");
    fetchUser();
  }, []);

  async function saveProfile(formValues) {
    const formData = {
      bio: formValues.get("user_bio"),
      profile_picture_url: formValues.get("profile_picture_url"),
    };
    console.log(formData);

    try {
      const method = "PUT";
      const response = await fetch("/api/user", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // I think response.ok is null or undefined so it goes to the else statement in this is else loop
      if (response.ok) {
        revalidatePath(`/user/${user?.clerk_id}`);
        router.push(`/user/${user?.clerk_id}`);
      } else {
        console.error(`Error ${user ? "updating" : "creating"} profile:`, await response.json());
      }
    } catch (error) {
      console.error(`Error ${user ? "updating" : "creating"} profile:`, error);
    }
  }

  return (
    <div>
      <div className="formContainer">
        <div>
          <h1 className="text-center text-xl font-bold">
            {user ? "Update your profile" : "Create your profile for others to see"}
          </h1>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              const formValues = new FormData(e.target);
              await saveProfile(formValues);
            }}
          >
            <div className="form-spacing">
              <label htmlFor="user_bio">Bio:</label>
              <textarea name="user_bio" id="user_bio" defaultValue={user?.user_bio || ""} required />
            </div>

            <div className="form-spacing">
              <label htmlFor="profile_picture_url">Profile Picture Url:</label>
              <textarea
                type="text"
                name="profile_picture_url"
                id="profile_picture_url"
                defaultValue={user?.profile_picture_url || ""}
              />
            </div>
            <button className="createButton" type="submit">
              {user ? "Update Profile" : "Create Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
