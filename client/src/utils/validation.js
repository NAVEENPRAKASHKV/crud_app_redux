export const validateUsername = (username) => {
  if (!username) return "Username is required.";
  if (username.length < 3)
    return "Username must be at least 3 characters long.";
  return null; // No error
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return "Email is required.";
  if (!emailRegex.test(email)) return "Please enter a valid email.";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  if (password.length < 6)
    return "Password must be at least 6 characters long.";
  return null;
};

//  Function to validate all fields together
export const validateForm = (formData, isSignin) => {
  const errors = {
    email: validateEmail(formData.email),
    password: validatePassword(formData.password),
  };
  if (isSignin) {
    errors.username = validateUsername(formData.username);
  }
  return errors;
};
