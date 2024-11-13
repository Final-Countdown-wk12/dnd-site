export default function CreateCharacterForm() {
  return (
    <div>
      <form>
        <label>
          Pick a fruit:
          <select name="selectedFruit">
            <option value="apple">Apple</option>
            <option value="banana">Banana</option>
            <option value="orange">Orange</option>
          </select>
        </label>
      </form>
    </div>
  );
}
