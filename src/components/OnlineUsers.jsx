import "./OnlineUsers.css";

export default function OnlineUsers({ users }) {
  return (
    <div className='user-list'>
      <ul>
        {users.map((user) => {
          <li key={user.id}>{user.displayName}</li>;
        })}
      </ul>
    </div>
  );
}
