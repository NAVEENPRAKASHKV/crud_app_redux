import React, { useEffect, useState } from "react";
import { validateForm } from "../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, loginUser } from "../store/userSlice";
import { useNavigate } from "react-router-dom";

const UserLoginRegister = () => {
  const [isSignin, setSignin] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.user);
  const token = userStore?.userInfo?.token || localStorage.getItem("userToken");
  useEffect(() => {
    if (token) {
      navigate("/"); // Replace '/profile' with the actual profile route
    }
  }, [token, navigate]);
  const submitForm = async (e) => {
    try {
      e.preventDefault();
      // Validate all fields
      const validationErrors = validateForm(formData, isSignin);
      setErrors(validationErrors);
      // Check if there are no errors before submitting
      const noErrors = Object.values(validationErrors).every(
        (error) => error === null
      );
      if (noErrors) {
        // Form submission logic here
        if (isSignin) {
          console.log("the value of isSignIn", isSignin);
          console.log("register");
          dispatch(registerUser(formData));
          navigate("/login");
        }
        if (!isSignin) {
          console.log("is login ");
          const response = await dispatch(loginUser(formData));
          if (response.payload.token) navigate("/");
        }
      }
    } catch (error) {
      console.log("error while login", error);
      alert("check the password and login no user exits");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-orange-100">
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-2/5 min-h-48 border-2 bg-orange-400 rounded-xl shadow-2xl">
        <h1 className="font-bold text-center py-5 text-2xl ">
          {isSignin ? "SignUp" : "Login"}
        </h1>
        <div>
          <form
            className="flex flex-col justify-center items-center"
            onSubmit={submitForm}
          >
            {isSignin && (
              <input
                name="username"
                className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                required
              />
            )}
            {errors.username && (
              <p className="text-xs text-white">*{errors.username}</p>
            )}
            <input
              name="email"
              className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"
              type="text"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Id"
              required
            />
            {errors.email && (
              <p className="text-xs text-white">*{errors.email}</p>
            )}
            <input
              name="password"
              className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {errors.password && (
              <p className="text-xs text-white">*{errors.password}</p>
            )}
            <div className="flex w-3/5">
              <p
                className="cursor-pointer text-sm pt-2 px-4"
                onClick={() => setSignin(!isSignin)}
              >
                {isSignin
                  ? "Already a user? Login now"
                  : "New user? Register now"}
              </p>
            </div>
            <button
              type="submit"
              className="py-2 px-4 my-4 bg-green-300 rounded-xl"
            >
              {isSignin ? "SignUp" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLoginRegister;
