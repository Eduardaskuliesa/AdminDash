"use client";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSideBarToggled } from "@/state";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { IconType } from "react-icons";
import {
  LuArchive,
  LuCircleDollarSign,
  LuClipboard,
  LuLayout,
  LuMenu,
  LuSlidersHorizontal,
  LuUser,
} from "react-icons/lu";

interface SideBarLinkProps {
  href: string;
  icon: IconType;
  label: string;
  isToggled: boolean;
}

const SideBarLink = ({
  href,
  icon: Icon,
  label,
  isToggled,
}: SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isToggled ? "justify-center py-4" : "justify-start px-8 py-4"
        } hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="w-6 h-6 text-gray-700"></Icon>
        <span
          className={`${
            isToggled ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

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
        <h1
          className={`font-extrabold text-xl ${
            isSidebarToggled ? "hidden" : "block"
          }`}
        >
          Shop
        </h1>
        <button
          onClick={toggleSideBar}
          className="md:hidden p-3 bg-gray-100 rounded-full hover:bg-blue-100"
        >
          <LuMenu className="w-4 h-4"></LuMenu>
        </button>
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SideBarLink
          href="/dashboard"
          icon={LuLayout}
          label="Dashboard"
          isToggled={isSidebarToggled}
        ></SideBarLink>
        <SideBarLink
          href="/inventory"
          icon={LuArchive}
          label="Inventory"
          isToggled={isSidebarToggled}
        ></SideBarLink>
        <SideBarLink
          href="/products"
          icon={LuClipboard}
          label="Products"
          isToggled={isSidebarToggled}
        ></SideBarLink>
        <SideBarLink
          href="/users"
          icon={LuUser}
          label="Users"
          isToggled={isSidebarToggled}
        ></SideBarLink>
        <SideBarLink
          href="/settings"
          icon={LuSlidersHorizontal}
          label="Settings"
          isToggled={isSidebarToggled}
        ></SideBarLink>
        <SideBarLink
          href="/expenses"
          icon={LuCircleDollarSign}
          label="Expenses"
          isToggled={isSidebarToggled}
        ></SideBarLink>
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarToggled ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Your Name
        </p>
      </div>
    </div>
  );
};

export default SideBar;
