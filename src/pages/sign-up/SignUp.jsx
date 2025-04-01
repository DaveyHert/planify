import { useEffect, useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import ProgressIcon from "../../components/ProgressIcon";
import Error from "../../components/Error";
import "./SignUp.css";

function SignUp() {
  const [showError, setShowError] = useState(false);
  const [invalidInput, setInvalidInput] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
  });

  const { signUpNewUser, isPending, error, response } = useSignUp();

  // handle form data update
  const handleChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // handle sign up
  const handleSignUp = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.displayName) {
      setInvalidInput("Email, password, and username required");
      return;
    }

    signUpNewUser(formData.email, formData.password, formData.displayName);

    // clear state
    if (response)
      setFormData({
        email: "",
        password: "",
        displayName: "",
      });
  };

  // handle error toast message
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
      <form className='auth-form' onSubmit={handleSignUp}>
        <h2 className='page-title'>Sign Up</h2>
        <label>
          Email:
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Password:
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label>
          Username:
          <input
            type='text'
            name='displayName'
            value={formData.displayName}
            onChange={handleChange}
          />
        </label>
        <button className='btn' disabled={isPending}>
          SIgn Up
        </button>
      </form>

      {isPending && <ProgressIcon />}
      {error && showError && <Error message={error} />}
      {invalidInput && showError && <Error message={invalidInput} />}
    </>
  );
}

export default SignUp;
