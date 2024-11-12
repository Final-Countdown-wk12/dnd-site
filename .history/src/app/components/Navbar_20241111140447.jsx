// components/Navbar.jsx
"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import FullSidebarAccordion from "./SidebarAccordian";
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Navbar() {
  const [showCompendium, setShowCompendium] = useState(false);

  return (
    <nav className="bg-[#5A352A] shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-4">
            <Image
              src="/d20.jpeg"
              alt="D&D Logo"
              width={50}
              height={50}
              priority
            />
            <Link href="/" className="text-2xl font-bold text-[#FFD700]">
              The Nexus
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/compendium"
              className="text-[#F4ECE4] hover:text-[#FFD700] transition"
            >
              Compendium
            </Link>
            <button
              onClick={() => setShowCompendium(!showCompendium)}
              className="text-[#F4ECE4] hover:text-[#FFD700] transition"
            >
              {showCompendium ? "X" : "Nexus Companion"}
            </button>
          </div>
        </div>
      </div>
      {showCompendium && <FullSidebarAccordion />}
    </nav>
  );
}
