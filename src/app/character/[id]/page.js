import { notFound } from "next/navigation";
import { db } from "@/app/utils/dbconnection";
import { currentUser } from "@clerk/nextjs/server";
import EditCharacter from "@/app/components/EditCharacter"; // Import client component for editing

export default async function CharacterSheet({ params, searchParams }) {
  const id = (await params).id;
  const user = await currentUser();
  const username = user.username;

  let query;
  try {
    query = await db.query(`SELECT player_name FROM character WHERE ID = $1`, [id]);
  } catch (error) {
    console.error("DB Query Error:", error);
  }

  const characterOwner = query?.rows[0]?.player_name;
  if (!characterOwner) {
    return notFound(); // Character not found
  }

  if (characterOwner !== username) {
    return notFound(); // Unauthorized access
  }

  // Fetch character data
  const char_info = await db.query(
    `
    SELECT player_name, (info).char_name, (info).race, (info).class, (info).background, 
    ((info).alignment).lawful, ((info).alignment).morality, 
    (info).xp, (info).level 
    FROM character WHERE id = $1`,
    [id]
  );
  const character = char_info.rows[0];

  const misc_info = await db.query(
    `
    SELECT 
      (misc_info).sex, 
      (misc_info).size, 
      (misc_info).height, 
      (misc_info).weight, 
      (misc_info).speed, 
      (misc_info).initiative,
      notes 
    FROM character WHERE id = $1`,
    [id]
  );
  const parsedMisc = misc_info.rows[0];

  const stats = await db.query(
    `
    SELECT ac, profiecency_bonus, 
    (stats).strength, (stats).dexterity, (stats).constitution, 
    (stats).intelligence, (stats).wisdom, (stats).charisma 
    FROM character WHERE id = $1`,
    [id]
  );
  const parsedStats = stats.rows[0];

  const skills = await db.query(
    `
    SELECT 
    ((skills).acrobatics).modifier AS acrobatics_modifier, ((skills).acrobatics).proficiency AS acrobatics_prof,
    ((skills).animal_handling).modifier AS animal_handling_modifier, ((skills).animal_handling).proficiency AS animal_handling_prof,
    ((skills).arcana).modifier AS arcana_modifier, ((skills).arcana).proficiency AS arcana_prof,
    ((skills).athletics).modifier AS athletics_modifier, ((skills).athletics).proficiency AS athletics_prof,
    ((skills).deception).modifier AS deception_modifier, ((skills).deception).proficiency AS deception_prof,
    ((skills).history).modifier AS history_modifier, ((skills).history).proficiency AS history_prof,
    ((skills).insight).modifier AS insight_modifier, ((skills).insight).proficiency AS insight_prof,
    ((skills).intimidation).modifier AS intimidation_modifier, ((skills).intimidation).proficiency AS intimidation_prof,
    ((skills).investigation).modifier AS investigation_modifier, ((skills).investigation).proficiency AS investigation_prof,
    ((skills).medicine).modifier AS medicine_modifier, ((skills).medicine).proficiency AS medicine_prof,
    ((skills).nature).modifier AS nature_modifier, ((skills).nature).proficiency AS nature_prof,
    ((skills).perception).modifier AS perception_modifier, ((skills).perception).proficiency AS perception_prof,
    ((skills).performance).modifier AS performance_modifier, ((skills).performance).proficiency AS performance_prof,
    ((skills).persuasion).modifier AS persuasion_modifier, ((skills).persuasion).proficiency AS persuasion_prof,
    ((skills).religion).modifier AS religion_modifier, ((skills).religion).proficiency AS religion_prof,
    ((skills).slight_of_hand).modifier AS slight_of_hand_modifier, ((skills).slight_of_hand).proficiency AS slight_of_hand_prof,
    ((skills).stealth).modifier AS stealth_modifier, ((skills).stealth).proficiency AS stealth_prof,
    ((skills).survival).modifier AS survival_modifier, ((skills).survival).proficiency AS survival_prof
    FROM character WHERE id = $1`,
    [id]
  );
  const parsedSkills = skills.rows[0];
  const inventory = await db.query(`SELECT inventory FROM character WHERE id = $1`, [id]);
  const parsedInventory = inventory.rows[0].inventory;

  const hp = await db.query(`SELECT (hp).max_hp, (hp).current_hp, (hp).temp_hp FROM character WHERE id = $1`, [id]);
  const parsedHp = hp.rows[0];

  const featuresQuery = await db.query(
    `
    SELECT languages, 
    (features).race_and_subrace, (features).traits, 
    (features).ideals, (features).bonds, (features).flaws 
    FROM character WHERE id = $1`,
    [id]
  );
  const parsedFeatures = featuresQuery.rows[0];

  const spellSlotsQuery = await db.query(
    `SELECT (spell_slots).max_spell_level, (spell_slots).max_slots, (spell_slots).used_slots, (spell_slots).can_use_magic FROM character WHERE id = $1`,
    [id]
  );
  const parsedSpellSlots = spellSlotsQuery.rows[0];

  const spellsQuery = await db.query(`SELECT spells FROM character WHERE id = $1`, [id]);
  const parsedSpells = spellsQuery.rows[0].spells;

  // Check if we are in edit mode
  const isEditing = (await searchParams)?.edit === "true";

  return (
    <div className="p-8 bg-grey-900 text-white min-h-screen">
      <div className="max-w-5xl mx-auto bg-white text-black rounded-lg shadow-md p-6">
        <header className="flex justify-between items-center border-b-2 border-gray-700 pb-4">
          <h1 className="text-5xl font-bold">{character.char_name}</h1>
          {!isEditing && (
            <a href={`/character/${id}?edit=true`} className="btn btn-primary">
              Edit
            </a>
          )}
        </header>

        {isEditing ? (
          <EditCharacter
            id={id}
            initialData={{
              character,
              parsedStats,
              parsedMisc,
              parsedSkills,
              parsedHp,
              parsedInventory,
              parsedFeatures,
              parsedSpellSlots,
              parsedSpells,
            }}
          />
        ) : (
          <>
            <section className="mt-6">
              <h2 className="text-2xl font-semibold">Character Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-gray-200 p-4 rounded-lg">
                  <p>
                    <strong>Player Name:</strong> {character.player_name}
                  </p>
                  <p>
                    <strong>Class:</strong> {character.class}
                  </p>
                  <p>
                    <strong>Race:</strong> {character.race}
                  </p>
                  <p>
                    <strong>Background:</strong> {character.background}
                  </p>
                  <p>
                    <strong>Alignment:</strong> {character.lawful} {character.morality}
                  </p>
                  <p>
                    <strong>XP:</strong> {character.xp} | <strong>Level:</strong> {character.level}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-2xl font-semibold">Stats</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(parsedStats).map(([stat, value]) => (
                  <div key={stat} className="card bg-gray-200 p-4 rounded-lg">
                    <p>
                      <strong>{stat.toUpperCase()}:</strong> {value}
                    </p>
                  </div>
                ))}

                <div className="card bg-gray-200 p-4 rounded-lg">
                  <p>
                    <strong>Max HP:</strong> {parsedHp.max_hp} | <strong>Current HP:</strong> {parsedHp.current_hp} |{" "}
                    <strong>Temp HP:</strong> {parsedHp.temp_hp}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-2xl font-semibold">Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="card bg-gray-200 p-4 rounded-lg">
                  <p>
                    <strong>Acrobatics: </strong>
                    <strong> Modifier: </strong> {parsedSkills.acrobatics_modifier}
                    <strong> Proficient: </strong> {parsedSkills.acrobatics_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Animal Handling: </strong>
                    <strong> Modifier: </strong> {parsedSkills.animal_handling_modifier}
                    <strong> Proficient: </strong> {parsedSkills.animal_handling_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Arcana: </strong>
                    <strong> Modifier: </strong> {parsedSkills.arcana_modifier}
                    <strong> Proficient: </strong> {parsedSkills.arcana_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Athletics: </strong>
                    <strong> Modifier: </strong> {parsedSkills.athletics_modifier}
                    <strong> Proficient: </strong> {parsedSkills.athletics_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Deception: </strong>
                    <strong> Modifier: </strong> {parsedSkills.deception_modifier}
                    <strong> Proficient: </strong> {parsedSkills.deception_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>History: </strong>
                    <strong> Modifier: </strong> {parsedSkills.history_modifier}
                    <strong> Proficient: </strong> {parsedSkills.history_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Insight: </strong>
                    <strong> Modifier: </strong> {parsedSkills.insight_modifier}
                    <strong> Proficient: </strong> {parsedSkills.insight_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Intimidation: </strong>
                    <strong> Modifier: </strong> {parsedSkills.intimidation_modifier}
                    <strong> Proficient: </strong> {parsedSkills.intimidation_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Investigation: </strong>
                    <strong> Modifier: </strong> {parsedSkills.investigation_modifier}
                    <strong> Proficient: </strong> {parsedSkills.investigation_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Medicine: </strong>
                    <strong> Modifier: </strong> {parsedSkills.medicine_modifier}
                    <strong> Proficient: </strong> {parsedSkills.medicine_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Nature: </strong>
                    <strong> Modifier: </strong> {parsedSkills.nature_modifier}
                    <strong> Proficient: </strong> {parsedSkills.nature_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Perception: </strong>
                    <strong> Modifier: </strong> {parsedSkills.perception_modifier}
                    <strong> Proficient: </strong> {parsedSkills.perception_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Performance: </strong>
                    <strong> Modifier: </strong> {parsedSkills.performance_modifier}
                    <strong> Proficient: </strong> {parsedSkills.performance_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Persuasion: </strong>
                    <strong> Modifier: </strong> {parsedSkills.persuasion_modifier}
                    <strong> Proficient: </strong> {parsedSkills.persuasion_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Religion: </strong>
                    <strong> Modifier: </strong> {parsedSkills.religion_modifier}
                    <strong> Proficient: </strong> {parsedSkills.religion_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Slight of Hand: </strong>
                    <strong> Modifier: </strong> {parsedSkills.slight_of_hand_modifier}
                    <strong> Proficient: </strong> {parsedSkills.slight_of_hand_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Stealth: </strong>
                    <strong> Modifier: </strong> {parsedSkills.stealth_modifier}
                    <strong> Proficient: </strong> {parsedSkills.stealth_prof == true ? "Yes" : "No"}
                  </p>
                  <p>
                    <strong>Survival: </strong>
                    <strong> Modifier: </strong> {parsedSkills.survival_modifier}
                    <strong> Proficient: </strong> {parsedSkills.survival_prof == true ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-2xl font-semibold">Features & Traits</h2>
              <div className="card bg-gray-200 p-4 rounded-lg">
                <ul className="list-disc list-inside">
                  {Object.entries(parsedFeatures).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key.replace("_", " ")}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-2xl font-semibold">Inventory</h2>
              <div className="card bg-gray-200 p-4 rounded-lg">
                <ul className="list-disc list-inside">
                  {parsedInventory.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-2xl font-semibold">Spell Slots</h2>
              <div className="card bg-gray-200 p-4 rounded-lg">
                <p>
                  <strong>Can Use Magic:</strong> {parsedSpellSlots.can_use_magic == true ? "Yes" : "No"}
                </p>
                <p>
                  <strong>Max Spell Level:</strong> {parsedSpellSlots.max_spell_level}
                </p>
                <p>
                  <strong>Max Slots:</strong> {parsedSpellSlots.max_slots}
                </p>
                <p>
                  <strong>Used Slots:</strong> {parsedSpellSlots.used_slots}
                </p>
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-2xl font-semibold">Spells</h2>
              <div className="card bg-gray-200 p-4 rounded-lg">
                <ul className="list-disc list-inside">
                  {parsedSpells.map((spell, index) => (
                    <li key={index}>{spell}</li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
