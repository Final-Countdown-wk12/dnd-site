// export default function CreateCharacterPage() {
//   return (
//     <div className="form-spacing">
//         <form>
//         <label htmlFor="character_name">Character Name:</label>
//         <textarea
//           name="user_bio"
//           id="user_bio"
//           defaultValue={user?.user_bio || ""}

//           required
//         />
//         </form>
//       </div>

//   )
// }

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

export default function App() {
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="bordered">Open Menu</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger">
          Delete file
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
