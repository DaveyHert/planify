import { useEffect, useRef, useState } from "react";
import { useSignIn } from "../../hooks/useSignIn";
import ProgressIcon from "../../components/ProgressIcon";
import Error from "../../components/ErrorToast";

function SignIn() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [showError, setShowError] = useState(false);
  const [invalidInput, setInvalidInput] = useState("");

  const { isPending, error, signUserIn } = useSignIn();

  //   handle sign in
  const handleSignIn = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      setInvalidInput("Email and password required!");

      return;
    }
    signUserIn(email, password);
  };

  // handle error toast
  useEffect(() => {
    if (error || invalidInput) {
      setShowError(true);
      let timer = setTimeout(() => {
        setShowError(false);
        setInvalidInput("");
      }, 3000);

      return () => clearTimeout(timer); // cleanup timer on unmount
    }
  }, [error, invalidInput]);

  // Page jsx
  return (
    <>
      <form className='auth-form' onSubmit={handleSignIn}>
        <h2 className='page-title'>Sign In</h2>
        <label>
          Email:
          <input type='email' ref={emailRef} />
        </label>

        <label>
          Password:
          <input type='password' ref={passwordRef} />
        </label>

        <button className='btn' disabled={isPending}>
          Sign In
        </button>
      </form>
      {error && showError && <Error message={error} />}
      {invalidInput && showError && <Error message={invalidInput} />}
      {isPending && <ProgressIcon />}
    </>
  );
}

export default SignIn;
