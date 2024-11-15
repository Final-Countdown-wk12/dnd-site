import { auth } from "@clerk/nextjs/server";
import { db } from "@/app/utils/dbconnection";
import React from "react";
import ProfileForm from "@/app/components/ProfileForm";
import ProfileView from "@/app/components/ProfileView";
import Link from "next/link";

export default async function ProfilePage({ searchParams }) {
  const { userId } = await auth();

  const userResult = await db.query(`SELECT * FROM users WHERE clerk_id = $1`, [userId]);

  const user = userResult.rows?.[0] || null;
  const isEditing = (await searchParams)?.edit === "true";

  if (user?.username) {
    const charactersResult = await db.query(`SELECT * FROM character WHERE player_name = $1`, [user.username]);

    const characters = charactersResult.rows || [];

    return (
      <div className="max-w-4xl mx-auto p-8 bg-gradient-to-b from-yellow-500 via-yellow-700 to-yellow-800 shadow-xl rounded-lg border border-yellow-900">
        {/* Welcome Message */}
        <div className="card bg-base-100 p-4 shadow-lg mb-6">
          <h1 className="text-center text-3xl font-bold text-yellow-900 text-shadow:_0_3px_0_rgb(0_0_0_/_40%)">
            Welcome, {user.username}!
          </h1>
          <p className="text-center text-white italic">Forge your legend in this realm.</p>
        </div>

        {/* Profile Picture, Username, and Bio */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Picture and Username */}
          <div className="card bg-base-100 p-4 shadow-lg">
            <div className="flex items-center space-x-4">
              <img
                src={user.profile_picture_url || "/default-avatar.png"}
                alt="Profile"
                className="w-24 h-24 rounded-full border border-yellow-500"
              />
              <div >
                <h2 className="text-2xl font-bold text-yellow-900 break-words">{user.username}</h2>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="card bg-base-100 p-4 shadow-lg col-span-2">
            <h2 className="text-xl font-semibold text-yellow-500 mb-2">Bio</h2>
            <p className="text-white">{user.user_bio || "This user has not added a bio yet."}</p>
          </div>
        </div>

        {/* Profile Form or View */}
        <div className="mt-6">
          {isEditing ? <ProfileForm user={user} userId={userId} /> : <ProfileView user={user} />}
        </div>

        {/* Edit/Cancel Button */}
        <div className="mt-6 flex justify-center">
          {isEditing ? (
            <Link href="?edit=false">
              <button className="btn btn-outline btn-error btn-wide">Cancel</button>
            </Link>
          ) : (
            <Link href="?edit=true">
              <button className="btn btn-primary btn-wide">{user ? "Edit Profile" : "Create Profile"}</button>
            </Link>
          )}
        </div>

        {/* Character Sheets */}
        <h2 className="text-center text-2xl font-semibold text-yellow-200 mt-10">Your Character Sheets</h2>

        {characters.length === 0 ? (
          <p className="text-center text-gray-300 mt-4">No character sheets found. Create one to begin your journey!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {characters.map((character) => (
              <div key={character.id} className="card bg-base-200 shadow-lg border border-yellow-500">
                <div className="card-body">
                  <h3 className="card-title text-xl text-yellow-300">{character.player_name}</h3>
                  <p className="text-gray-300">AC: {character.ac}</p>
                  <p className="text-gray-300">Proficiency Bonus: {character.profiecency_bonus}</p>
                  <Link href={`/character/${character.id}`}>
                    <button className="btn btn-primary w-full mt-4">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-8">
          <Link href="/character/new">
            <button className="btn btn-success btn-wide">Create New Character</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 shadow-xl rounded-lg border border-yellow-500">
      <h1 className="text-center text-3xl font-extrabold text-yellow-300 tracking-wide">Your Profile</h1>
      <p className="text-center text-gray-300 mt-4">No username found. Please update your profile.</p>
      <div className="mt-6 flex justify-center">
        <Link href="?edit=true">
          <button className="btn btn-primary btn-wide">Edit Profile</button>
        </Link>
      </div>
    </div>
  );
}
