"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSideBarToggled, setIsDarkMode, setIsLoggedIn } from "@/state";
import Link from "next/link";
import React from "react";

import {
  LuMenu,
  LuBell,
  LuSun,
  LuSettings,
  LuSearch,
  LuLogOut,
  LuLogIn,
  LuMoon,
} from "react-icons/lu";

export const NavBar = () => {
  const dispatch = useAppDispatch();
  const isSidebarToggled = useAppSelector(
    (state) => state.global.isSidebarToggled
  );

  const isLoggedIn = useAppSelector((state) => state.global.isLoggedIn);
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const toggleSideBar = () => {
    dispatch(setIsSideBarToggled(!isSidebarToggled));
  };

  const handleLogout = () => {
    dispatch(setIsLoggedIn(!isLoggedIn));
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="flex transition-colors  justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <button
          onClick={toggleSideBar}
          className="p-3 bg-gray-100 rounded-full hover:bg-blue-100 transition-colors"
        >
          <LuMenu></LuMenu>
        </button>
        <div className="relative">
          <input
            type="search"
            placeholder="Start type to search groups & products"
            className="pl-10 pr-4 text-xs py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500 transition-colors"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LuSearch className="text-gray-500" size={20}></LuSearch>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      {isLoggedIn ? (
        <div className="flex justify-between items-center gap-5">
          <div className="hidden md:flex justify-between items-center gap-5">
            <div>
              <button onClick={toggleDarkMode}>
                {isDarkMode ? (
                  <LuSun
                    className="cursor-pointer text-gray-500"
                    size={24}
                  ></LuSun>
                ) : (
                  <LuMoon
                    className="cursor-pointer text-gray-500"
                    size={24}
                  ></LuMoon>
                )}
              </button>
            </div>
            <div className="relative">
              <LuBell
                className="cursor-pointer text-gray-500"
                size={24}
              ></LuBell>
              <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
                3
              </span>
            </div>
            <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3"></hr>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-9 h-9">Image</div>
              <span className="font-semibold">Name Surname</span>
            </div>
          </div>
          <button onClick={handleLogout}>
            <LuLogOut></LuLogOut>
          </button>
          <Link href="/setting">
            <LuSettings
              className="cursor-pointer text-gray-500"
              size={24}
            ></LuSettings>
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-4 pr-[5%]">
          <Link href="/login">
            <LuLogIn className="cursor-pointer text-gray-500 text-2xl "></LuLogIn>
          </Link>
          <button onClick={toggleDarkMode}>
            {isDarkMode ? (
              <LuSun className="cursor-pointer text-gray-500" size={24}></LuSun>
            ) : (
              <LuMoon
                className="cursor-pointer text-gray-500"
                size={24}
              ></LuMoon>
            )}
          </button>
        </div>
      )}
    </div>
  );
};
