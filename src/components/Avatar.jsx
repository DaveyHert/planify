import "./Avatar.css";

export default function Avatar({ src }) {
  return (
    <div className='avatar-wrapper'>
      <img className='avatar' src={src} alt='user avatar' />
    </div>
  );
}
