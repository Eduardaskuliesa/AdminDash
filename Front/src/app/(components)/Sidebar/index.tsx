"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSideBarToggled } from "@/state";
import React from "react";
import { LuMenu } from "react-icons/lu";

const SideBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarToggled = useAppSelector(
    (state) => state.global.isSidebarToggled
  );

  const toggleSideBar = () => {
    dispatch(setIsSideBarToggled(!isSidebarToggled));
  };

  const sidebarClassName = `fixed flex flex-col ${
    isSidebarToggled ? "w-0 md:w-16" : "w-72 md: w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={sidebarClassName}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarToggled ? "px-5" : "px-8"
        }`}
      >
        <div>Logo</div>
        <h1 className={`font-extrabold text-2xl ${isSidebarToggled ? 'hidden': 'block'}`}>Your Shop</h1>
        <button
          onClick={toggleSideBar}
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <LuMenu className="w-4 h-4"></LuMenu>
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">{/* Links here */}</div>

      {/* FOOTER */}
      <div>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Your Name
        </p>
      </div>
    </div>
  );
};

export default SideBar;
