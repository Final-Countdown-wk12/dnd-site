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
            <option value="good">Good</option>
            <option value="neutral">Neutral</option>
            <option value="evil">Evil</option>
          </select>
        </label>
        <label>
          Select your race:
          <select name="race">
            <option value="good">Dragonborn</option>
            <option value="neutral">Dwarf</option>
            <option value="elf">Elf</option>
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
            <option value="good">Dragonborn</option>
            <option value="neutral">Dwarf</option>
            <option value="elf">Elf</option>
            <option value="half-elf">Half-Elf</option>
            <option value="hal">Half-Orc</option>
            <option value="evil">Halfling</option>
            <option value="evil">Human</option>
            <option value="evil">Tiefling</option>
          </select>
        </label>
      </form>
    </div>
  );
}
