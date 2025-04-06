import { useCollection } from "../hooks/useCollections";
import Avatar from "./Avatar";
import ProgressIcon from "./ProgressIcon";
import "./AssignUsers.css";
import { useEffect, useMemo, useRef, useState } from "react";

export default function AssignUsers({ handleAssignToUser, closeModal }) {
  const { data: users, error, isPending } = useCollection("users");
  const [search, setSearch] = useState("");
  const searchRef = useRef();

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

  // use keyboard search
  useEffect(() => {
    const keyboardAccessibility = (e) => {
      if (e.key === "Escape") return closeModal();
      if (searchRef.current === window.document.activeElement) {
        return; // return if search input already in focus
      } else {
        return searchRef.current.focus(); // focus on search input
      }
    };

    window.addEventListener("keydown", keyboardAccessibility);
    return () => window.removeEventListener("keydown", keyboardAccessibility);
    //add listoner and cleanup when unmounted
  }, []);

  return (
    <div className='users-list'>
      <section>
        <h3>Assign User</h3>
        <span className='close-modal' onClick={() => closeModal()}>
          &#10005;
        </span>
      </section>

      <div className='users-list-content'>
        {error && <div className='error'>{error}</div>}
        {isPending && <ProgressIcon />}

        <input
          type='text'
          className='user-search'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search members...'
          ref={searchRef}
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

        {/* Optionally show a “no results” message */}
        {!isPending && filteredUsers.length === 0 && (
          <div className='no-results'>No users found!</div>
        )}
      </div>
    </div>
  );
}
