import "./Avatar.css";

export default function Avatar({ user }) {
  return (
    <div className='user'>
      <img className='avatar' src={user?.photoURL} alt="user's avatar" />
      <p>Hey {user?.displayName}</p>
    </div>
  );
}
