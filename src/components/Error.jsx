import "./Error.css";

function Error({ message }) {
  return (
    <div className='error'>
      <p>{message}</p>
      <span className='timeout'></span>
    </div>
  );
}

export default Error;
