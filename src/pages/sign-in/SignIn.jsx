import { useEffect, useState } from "react";
import { useSignIn } from "../../hooks/useSignIn";
import ProgressIcon from "../../components/ProgressIcon";
import Error from "../../components/Error";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [invalidInput, setInvalidInput] = useState("");

  const { isPending, error, signUserIn } = useSignIn();

  //   handle sign in
  const handleSignIn = (e) => {
    e.preventDefault();
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
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
