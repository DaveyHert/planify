import "./Avatar.css";

export default function Avatar({ user }) {
  return (
    <div className='user'>
      <div className='avatar-wrapper'>
        <img className='avatar' src={user?.photoURL} alt="user's avatar" />
      </div>
      <p>Hey {user?.displayName}</p>
    </div>
  );
}
