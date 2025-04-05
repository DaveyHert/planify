import { useCollection } from "../hooks/useCollections";
import Avatar from "./Avatar";
import ProgressIcon from "./ProgressIcon";
import "./AssignUsers.css";

export default function AssignUsers({ handleAssignToUser }) {
  const { data, error, isPending } = useCollection("users");

  //   handle user selection
  const handleClick = (user) => {
    handleAssignToUser(user);
  };

  return (
    <ul className='users-list'>
      <h3>Assign User</h3>
      <div className='users-list-content'>
        {error && <div className='error'>{error}</div>}
        {isPending && <ProgressIcon />}
        {data &&
          data.map((user) => (
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
