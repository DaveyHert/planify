import { useEffect, useState } from "react";
import { useSignUp } from "../../hooks/useSignUp";
import ProgressIcon from "../../components/ProgressIcon";
import AvatarIcon from "../../assets/avatar-icon.svg";
import Error from "../../components/Error";

import "./SignUp.css";

function SignUp() {
  const [showError, setShowError] = useState(false);
  const [invalidInput, setInvalidInput] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    displayName: "",
    avatar: null,
  });

  const handleAvatarChange = (e) => {
    console.log(e);
    const imageFile = e.target.files[0];
    console.log(imageFile);
    if (!imageFile || !imageFile.type.includes("image")) {
      setInvalidInput("Please select an image");
      return;
    }
    // ensure image size is not too large
    if (imageFile.size > 1000000) {
      setInvalidInput("Image too large, must be smaller than 1 MB");
      return;
    }

    const imageURL = URL.createObjectURL(imageFile);
    setAvatarPreview(imageURL);
    setFormData((prevData) => ({ ...prevData, avatar: imageFile }));
  };

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

    if (
      !formData.email ||
      !formData.password ||
      !formData.displayName ||
      !formData.avatar
    ) {
      setInvalidInput("Email, password, username and profile picture required");
      return;
    }

    signUpNewUser(
      formData.email,
      formData.password,
      formData.displayName,
      formData.avatar
    );

    // clear state
    if (response)
      setFormData({
        email: "",
        password: "",
        displayName: "",
        avatar: null,
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
        <label>
          Profile thumbnail:
          <div className={`avatar-group ${avatarPreview ? "active" : ""}`}>
            <span className='avatar'>
              <img src={AvatarIcon} alt='upload image' />
              Choose image
            </span>
            {avatarPreview && (
              <img src={avatarPreview} className='avatar-preview' />
            )}
          </div>
          <input
            type='file'
            name='avatar'
            accept='image/*'
            onChange={handleAvatarChange}
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
