import "./ErrorToast.css";

function ErrorToast({ message }) {
  return (
    <div className='error-toast'>
      <p>{message}</p>
      <span className='timeout'></span>
    </div>
  );
}

export default ErrorToast;
