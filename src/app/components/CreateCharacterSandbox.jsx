"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CreateCharacterForm() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const userData = await currentUser();
      setUser(userData);
    }
    fetchUser();
  }, []);

  async function saveCharacter(formData) {
    const characterData = {
      player_name: formData.get("player_name"),
      character_info: {
        character_name: formData.get("character_name"),
        race: formData.get("race"),
        class: formData.get("class"),
        background: formData.get("background"),
        alignment: formData.get("morality"),
        alignment: formData.get("lawful"),
        level: formData.get("level"),
      },
      stats: {
        strength: formData.get("strength"),
        dexterity: formData.get("dexterity"),
        constitution: formData.get("constitution"),
        intelligence: formData.get("intelligence"),
        wisdom: formData.get("wisdom"),
        charisma: formData.get("charisma"),
      },
      inventory: formData.get("inventory").split(","),
      spells: formData.get("spells").split(","),
      notes: formData.get("notes"),
    };

    try {
      const response = await fetch("/api/characters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(characterData),
      });

      if (response.ok) {
        router.push("/characters");
      } else {
        console.error("Failed to create character");
      }
    } catch (error) {
      console.error("Error creating character:", error);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        saveCharacter(formData);
      }}
      className="space-y-8 p-8 bg-gray-800 text-white rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold">Create a New Character</h2>

      <div className="form-control">
        <label htmlFor="player_name" className="label">
          <span className="label-text text-lg">Player Name:</span>
        </label>
        <input
          type="text"
          name="player_name"
          id="player_name"
          className="input input-bordered w-full"
          defaultValue={user?.username || ""}
          required
        />
      </div>

      <div className="form-control">
        <label htmlFor="character_name" className="label">
          <span className="label-text text-lg">Character Name:</span>
        </label>
        <input
          type="text"
          name="character_name"
          id="character_name"
          className="input input-bordered w-full"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="race" className="label">
            <span className="label-text text-lg">Race:</span>
          </label>
          <input
            type="text"
            name="race"
            id="race"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="class" className="label">
            <span className="label-text text-lg">Class:</span>
          </label>
          <input
            type="text"
            name="class"
            id="class"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="background" className="label">
            <span className="label-text text-lg">Background:</span>
          </label>
          <input
            type="text"
            name="background"
            id="background"
            className="input input-bordered w-full"
          />
        </div>
        <div>
          <select className="select w-full max-w-xs">
            <option disabled selected>
              Pick your Morality alignment
            </option>
            <option>Good</option>
            <option>Neutral</option>
            <option>Evil</option>
          </select>
        </div>
        <div>
          <select className="select w-full max-w-xs">
            <option disabled selected>
              Pick your Lawful Alignment
            </option>
            <option>Lawful</option>
            <option>Neutral</option>
            <option>Chaos</option>
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="alignment" className="label">
            <span className="label-text text-lg">Alignment:</span>
          </label>
          <input
            type="text"
            name="alignment"
            id="alignment"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="form-control">
          <label htmlFor="xp" className="label">
            <span className="label-text text-lg">XP:</span>
          </label>
          <input
            type="number"
            name="xp"
            id="xp"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control">
          <label htmlFor="level" className="label">
            <span className="label-text text-lg">Level:</span>
          </label>
          <input
            type="number"
            name="level"
            id="level"
            className="input input-bordered w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          "strength",
          "dexterity",
          "constitution",
          "intelligence",
          "wisdom",
          "charisma",
        ].map((stat) => (
          <div key={stat} className="form-control">
            <label htmlFor={stat} className="label">
              <span className="label-text text-lg capitalize">{stat}:</span>
            </label>
            <input
              type="number"
              name={stat}
              id={stat}
              className="input input-bordered w-full"
              required
            />
          </div>
        ))}
      </div>

      <div className="form-control">
        <label htmlFor="inventory" className="label">
          <span className="label-text text-lg">
            Inventory (comma-separated):
          </span>
        </label>
        <textarea
          name="inventory"
          id="inventory"
          className="textarea textarea-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label htmlFor="spells" className="label">
          <span className="label-text text-lg">Spells (comma-separated):</span>
        </label>
        <textarea
          name="spells"
          id="spells"
          className="textarea textarea-bordered w-full"
        />
      </div>

      <div className="form-control">
        <label htmlFor="notes" className="label">
          <span className="label-text text-lg">Notes:</span>
        </label>
        <textarea
          name="notes"
          id="notes"
          className="textarea textarea-bordered w-full"
        />
      </div>

      <div className="form-control mt-4">
        <button className="btn btn-success w-full" type="submit">
          Create Character
        </button>
      </div>
    </form>
  );
}
