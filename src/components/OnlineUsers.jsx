import Avatar from "./Avatar";
import "./OnlineUsers.css";

export default function OnlineUsers({ users }) {
  return (
    <div className='user-list'>
      <h2>All Users</h2>
      {users.map((user) => (
        <div key={user.id}>
          <span>{user.displayName}</span>
          <Avatar src={user.displayName} />
        </div>
      ))}
    </div>
  );
}
