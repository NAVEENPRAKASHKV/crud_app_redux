import React from "react";

const AdminLogin = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-red-300">
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-2/5 min-h-48 border-2 bg-red-400 rounded-xl shadow-2xl">
        <h1 className="font-bold text-center py-5 text-2xl ">Admin Sign In</h1>
        <div className="">
            <form className="flex flex-col justify-center items-center" action="">
                <input className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl" type="text" placeholder="Email Id" />
                <input className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"  type="password" placeholder="Password" /> 
                <button className=" py-2 px-4 my-4  bg-green-300 rounded-xl">Sign In</button>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
