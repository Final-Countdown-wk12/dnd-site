const user = await currentUser();

export default function CreateCharacterForm() {
  return (
    <div>
      <form>
        <label>
          Select your alignment:
          <select name="alignment">
            <option value="good">Good</option>
            <option value="neutral">Neutral</option>
            <option value="evil">Evil</option>
          </select>
        </label>
        <label>
          Select your alignment:
          <select name="alignment">
            <option value="lawful">Good</option>
            <option value="neutral">Neutral</option>
            <option value="choas">Evil</option>
          </select>
        </label>
        <label>
          Select your race:
          <select name="race">
            <option value="good">Dragonborn</option>
            <option value="neutral">Dwarf</option>
            <option value="elf">Elf</option>
            <option value="gnome">Gnome</option>
            <option value="half-elf">Half-Elf</option>
            <option value="half-orc">Half-Orc</option>
            <option value="halfling">Halfling</option>
            <option value="Human">Human</option>
            <option value="tiefling">Tiefling</option>
          </select>
        </label>
        <label>
          Select your class:
          <select name="class">
            <option value="barbarian">Barbarian</option>
            <option value="bard">Bard</option>
            <option value="cleric">Cleric</option>
            <option value="druid">Druid</option>
            <option value="fighter">Fighter</option>
            <option value="monk">Halfling</option>
            <option value="monk">Monk</option>
            <option value="paladin">Paladin</option>
            <option value="ranger">Tiefling</option>
            <option value="ranger">Ranger</option>
            <option value="rogue">Rogue</option>
            <option value="sorcerer">Sorcerer</option>
            <option value="warlock">Warlock</option>
            <option value="wizard">Wizard</option>
          </select>
        </label>
        <label>
          Background:
          <input type="text" name="background" required />
        </label>
        <input
          type="number"
          name="level"
          id="level"
          placeholder="Level"
          required
          min={1}
        />
      </form>
    </div>
  );
}
