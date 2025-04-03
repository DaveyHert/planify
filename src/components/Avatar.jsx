import "./Avatar.css";

export default function Avatar({ src, displayName }) {
  return (
    <div className='user'>
      <div className='avatar-wrapper'>
        <img className='avatar' src={src} alt='user avatar' />
      </div>
      <p>Hey {displayName}</p>
    </div>
  );
}
