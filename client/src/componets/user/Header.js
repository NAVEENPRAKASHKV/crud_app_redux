import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { REACT_APP_API_URL } from "../../utils/constants";
import { logout } from "../../store/userSlice";

const Header = () => {
  const userDetails = useSelector((store) => store.user);
  const username = userDetails?.userInfo?.username || "Guest";
  const profileImage = userDetails?.userInfo?.profileImage || null;
  const imagePath = REACT_APP_API_URL + profileImage;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    // navigate("/login");
  };
  return (
    <div className="flex p-3 justify-between bg-slate-500 text-white items-center">
      <div className="flex items-center">
        <h1 className="m-2 text-lg font-bold">Home Page</h1>
        <ul className="flex mx-10 space-x-4">
          <li>
            <Link to="/home" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/profilechange" className="hover:underline">
              Edit Profile
            </Link>
          </li>
        </ul>
      </div>
      <div className="flex items-center space-x-3">
        <p className="m-2">{username}</p>
        <div className="w-10 h-10 rounded-full overflow-hidden bg-white">
          {profileImage ? (
            <img
              src={imagePath}
              alt="profile pic"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-gray-300 text-black text-xs">
              No Image
            </div>
          )}
        </div>
        <button
          className="m-2 py-1 px-2 bg-red-400 rounded-lg hover:bg-red-500"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;
