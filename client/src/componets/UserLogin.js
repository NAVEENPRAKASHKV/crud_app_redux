import React from "react";
import { useState } from "react";


const UserLogin = () => {
  const [isSignin, setSignin] = useState(false);
  const handlePageShift =()=>{setSignin(!isSignin)}
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-orange-100">
      <div className="absolute left-1/2 top-24 -translate-x-1/2 w-2/5 min-h-48 border-2 bg-orange-400 rounded-xl shadow-2xl">
        <h1 className="font-bold text-center py-5 text-2xl ">{isSignin? "SignUp":"Login"}</h1>
        <div className="">
          <form className="flex flex-col justify-center items-center" action="">
            { isSignin && <input
              className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"
              type="password"
              placeholder="Name"
              required
            /> }
            { isSignin &&<input
              className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl "
              type="password"
              placeholder="Mobile Number"
              required
            /> }
            <input
              className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"
              type="text"
              placeholder="Email Id"
              required
            />
            <input
              className="m-2 py-2 px-5 w-3/5 rounded-3xl shadow-xl"
              type="password"
              placeholder="Password"
              required
            />
            <div className="flex  w-3/5 ">
            <p className="cursor-pointer text-sm pt-2 px-4" onClick={handlePageShift}>{isSignin? "Already User ? Login now" :"NewUser? Register now"}</p>
            </div>
            <button className=" py-2 px-4 my-4  bg-green-300 rounded-xl">
            {isSignin? "SignUp":"Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
