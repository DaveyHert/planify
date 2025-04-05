import { useCollection } from "../hooks/useCollections";
import Avatar from "./Avatar";
import ProgressIcon from "./ProgressIcon";
import "./AssignUsers.css";
import { useMemo, useState } from "react";

export default function AssignUsers({ handleAssignToUser, searchUser }) {
  const { data: users, error, isPending } = useCollection("users");
  const [search, setSearch] = useState("");

  //   handle user selection
  const handleClick = (user) => {
    handleAssignToUser(user);
  };

  // handle user search
  // Memoize the filtered list so it only recalculates when users data or search term changes
  const filteredUsers = useMemo(() => {
    if (!users) return [];

    let term = search.trim().toLowerCase();
    if (term === "") return users; // if no search return data as is

    return users.filter((user) =>
      user.displayName.toLowerCase().includes(term)
    ); //return data that includes searched term
  }, [users, search]);

  return (
    <ul className='users-list'>
      <h3>Assign User</h3>
      <div className='users-list-content'>
        {error && <div className='error'>{error}</div>}
        {isPending && <ProgressIcon />}
        <input
          type='text'
          className='user-search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='search members'
        />
        {users &&
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className={`users-list-item ${user.online ? "online" : ""}`}
              onClick={() => handleClick(user)}
            >
              <Avatar src={user.photoURL} />
              <span>{user.displayName}</span>
            </div>
          ))}
      </div>
    </ul>
  );
}
