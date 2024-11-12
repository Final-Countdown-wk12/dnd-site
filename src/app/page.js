// app/page.js
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const user = await currentUser();
  const username = user.username;
  return (
    <div className="min-h-screen bg-[url('/parchment-texture.jpeg')] bg-cover relative">
      <div className="absolute top-4 left-4">
        <Image src="/dnddice.png" alt="D&D Dice" width={100} height={100} className="rounded-lg shadow-lg" />
      </div>
      <main className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex flex-col lg:flex-row items-start lg:items-start">
          <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
            <h1 className="text-5xl font-bold text-[#B22222] mb-6">Welcome to The Nexus</h1>
            <p className="text-xl text-[#5A352A] mb-8">Your ultimate companion for D&D 5e adventures</p>

            <div className="grid grid-cols-1 gap-8">
              <Link href="/character-sheet">
                <div className="p-6 rounded-lg shadow-lg bg-[#5A352A] hover:bg-[#7A4A3B] text-[#F4ECE4] transition cursor-pointer">
                  <h3 className="font-bold text-xl text-[#FFD700] mb-2">Create Character</h3>
                  <p className="text-sm">Build and manage your D&D character sheets</p>
                </div>
              </Link>

              <Link href={`/userProfile/${username}`}>
                <div className="p-6 rounded-lg shadow-lg bg-[#5A352A] hover:bg-[#7A4A3B] text-[#F4ECE4] transition cursor-pointer">
                  <h3 className="font-bold text-xl text-[#FFD700] mb-2">My Profile</h3>
                  <p className="text-sm">View and edit your adventurer profile</p>
                </div>
              </Link>

              <Link href="/campaigns">
                <div className="p-6 rounded-lg shadow-lg bg-[#5A352A] hover:bg-[#7A4A3B] text-[#F4ECE4] transition cursor-pointer">
                  <h3 className="font-bold text-xl text-[#FFD700] mb-2">Join Campaign</h3>
                  <p className="text-sm">Find and join ongoing campaigns</p>
                </div>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center lg:justify-end mt-32 lg:mt-32">
            <Image src="/dndimage.jpeg" alt="D&D Image" width={600} height={600} className="rounded-lg shadow-lg" />
          </div>
        </div>
      </main>
    </div>
  );
}
