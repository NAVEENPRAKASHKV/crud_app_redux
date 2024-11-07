import React, { useEffect, useState } from "react";
import { validateForm } from "../../utils/validation";
import { useDispatch } from "react-redux";
import { updateUserProfile } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProfileChange = () => {
  const [isSignin, setSignin] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const Userstore = useSelector((store) => store.user);
  const token = Userstore?.userInfo?.token || Userstore?.token;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);

      // Create a preview URL for the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  const submitForm = async (e) => {
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
      const form = new FormData();
      form.append("username", formData.username);
      form.append("email", formData.email);
      form.append("password", formData.password);
      if (profileImage) form.append("profileImage", profileImage);
      await dispatch(updateUserProfile(form));
      alert("profile updated");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  useEffect(() => {
    // if (!token) navigate("/login");
    setFormData({
      username: Userstore?.userInfo?.username,
      email: Userstore?.userInfo?.email,
      password: "",
    });
  }, []);

  return (
    <div className="relative w-screen h-screen  bg-gray-300 ">
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-2/5 min-h-48 border-2 bg-orange-400 rounded-xl shadow-2xl">
        <h1 className="font-bold text-center py-5 text-2xl ">Update Profile</h1>
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
              disabled
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

            <div className="flex flex-col my-12 py-4 px-2 border-2 items-center  ">
              <label className="text-white pb-3">Change Profile Picture</label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="m-2 w-28 rounded-xl"
                />
              )}
              <input
                type="file"
                name="profileImage"
                onChange={handleImageChange}
                accept="image/*" // Optional: restrict to image file types
              />
            </div>

            <div>
              <button
                type="submit"
                className="py-2 px-4 my-4 mx-4 bg-green-300 rounded-xl  hover:bg-green-500 hover:text-white"
              >
                Update
              </button>
              <button
                className="py-2 px-4 my-4 mx-4 bg-gray-300 rounded-xl  hover:text-white hover:bg-gray-400"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileChange;
