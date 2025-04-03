import { useState } from "react";

export default function useFormValidation(initialState) {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Validation logic
  const validate = (name, value) => {
    let error = "";
    switch (name) {
      case "email":
        error = /\S+@\S+\.\S+/.test(value) ? "" : "Enter a valid email.";
        break;
      case "password":
        if (value.length < 8) error = "Password must be at least 8 characters.";
        else if (!/[A-Z]/.test(value))
          error = "Must contain an uppercase letter.";
        else if (!/[0-9]/.test(value)) error = "Must contain a number.";
        break;
      case "displayName":
        error =
          value.trim().length >= 3
            ? ""
            : "Username must be at least 3 characters.";
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
    }
  };

  // Handle blur event to trigger validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  // Form validation status
  const isFormValid =
    Object.values(errors).every((error) => !error) &&
    Object.values(values).every((value) => value.trim() !== "");

  // Reset form
  const resetForm = () => {
    setValues(initialState);
    setErrors({});
    setTouched({});
  };

  return { values, errors, handleChange, handleBlur, isFormValid, resetForm };
}
