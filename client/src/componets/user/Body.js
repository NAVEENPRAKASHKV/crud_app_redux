import React, { useEffect } from "react";
import Header from "./Header";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate();
  const userStore = useSelector((store) => store.user);
  const token = userStore?.token;

  // useEffect(() => {
  //   if (!token) navigate("/login");
  // }, []);

  return (
    <div className="bg-gray-300 h-screen overflow-auto overflow-x-hidden">
      <Header />
      <Outlet />
    </div>
  );
};

export default Body;
