import React, { useState } from "react";
import { validateForm } from "../../utils/validation";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../store/adminSlice";

const CreateUser = () => {
  const [isSignin, setSignin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.user);
  const token = userStore?.userInfo?.token || userStore?.token;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/admin/admindashboard");
  };

  const submitForm = async (e) => {
    e.preventDefault();
    console.log("formData before submission:", formData);
    const validationErrors = validateForm(formData, isSignin);
    setErrors(validationErrors);
    const noErrors = Object.values(validationErrors).every(
      (error) => error === null
    );
    console.log("formData after validation:", formData);

    if (noErrors) {
      await dispatch(createUser(formData));
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      //   navigate("/");
    }
  };

  return (
    <div className="relative w-screen h-screen bg-gray-300">
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-2/5 min-h-48 border-2 bg-slate-600 rounded-xl shadow-2xl">
        <h1 className="font-bold text-center py-5 text-2xl text-white">
          Add User
        </h1>
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={submitForm}
        >
          <input
            name="username"
            className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"
            type="text"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
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

          <div>
            <button
              type="submit"
              className="py-2 px-4 my-4 mx-4 bg-green-300 rounded-xl"
            >
              Add +
            </button>
            <button
              className="py-2 px-4 my-4 mx-4 bg-gray-300 rounded-xl"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
