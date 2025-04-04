import "./ErrorToast.css";

function Error({ message }) {
  return (
    <div className='error-toast'>
      <p>{message}</p>
      <span className='timeout'></span>
    </div>
  );
}

export default Error;
