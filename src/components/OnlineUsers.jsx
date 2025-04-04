import { useCollection } from "../hooks/useCollections";
import Avatar from "./Avatar";
import "./OnlineUsers.css";

export default function OnlineUsers() {
  const { data, error } = useCollection("users");

  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {error && <div className='error'>{error}</div>}
      {data &&
        data.map((user) => (
          <div key={user.id} className='user-list-item'>
            {user.online && <span className='online-user'></span>}
            <span>{user.displayName}</span>
            <Avatar src={user.photoURL} />
          </div>
        ))}
    </div>
  );
}
