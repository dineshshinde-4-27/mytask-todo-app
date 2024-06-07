import React from "react";

function Navbar() {
  return (
    <>
      <nav className="flex justify-between py-3 sticky top-0  px-5 w-full  text-[#ddd] bg-[#041955]  items-center">
        <div className="logo p-1">
          <span className="font-bold text-xl cursor-pointer text-white hover:text-[#041955] px-4 p-3 hover:bg-[#dee7ff] hover:rounded-xl transition-all duration-300">
            myTask
          </span>
        </div>
        <ul className="flex gap-8 ">
          <li className="hover:text-white transition-all duration-100 font-bold cursor-pointer  ">
            Home
          </li>
          <li className="hover:text-white transition-all duration-100 font-bold cursor-pointer ">
            Your ToDo's
          </li>
        </ul>
      </nav>
    </>
  );
}
export default Navbar;
