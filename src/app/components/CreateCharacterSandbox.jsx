'use client';

export default function CreateCharacterForm ({characters, player_name }) {
    const router = useRouter();
    const user = await currentUser();

// i need to get the users username from the User table in Supabase    
//   username => get from user.username 
}

    async function saveCharacter(formData) {
      const updatedData = {
        player_name: formData.get("player_name"),
        character-info: formData.get("character_name", "race", "class", "background", "alignment" "xp", "level"),
    }};
      try {
        const method = user ? 'PUT' : 'POST';
        const response = await fetch('/api/characters', {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        });
        
        return (
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                await saveCharacter(formData);
              }}
              className="space-y-4"
            >


              <div className="form-control">
                <label htmlFor="character" className="label">
                  <span className="label-text">Player Name:</span>
                </label>
                <textarea
                  name="player_name"
                  id="player_name"
                  className="textarea textarea-bordered"
                  defaultValue={character?.player_name || ""}
                  required
                />
              </div>
        
              <div className="form-control">
                <label htmlFor="user_bio" className="label">
                  <span className="label-text">Bio:</span>
                </label>
                <textarea
                  name="user_bio"
                  id="user_bio"
                  className="textarea textarea-bordered"
                  defaultValue={user?.user_bio || ""}
                  required
                />
              </div>
        
              <div className="form-control">
                <label htmlFor="profile_picture_url" className="label">
                  <span className="label-text">Profile Picture URL:</span>
                </label>
                <textarea
                  name="profile_picture_url"
                  id="profile_picture_url"
                  className="textarea textarea-bordered"
                  defaultValue={user?.profile_picture_url || ""}
                />
              </div>
        
              <div className="form-control mt-4">
                <button className="btn btn-success w-full" type="submit">
                  {user ? 'Update Profile' : 'Create Profile'}
                </button>
              </div>
            </form>
          );
        }