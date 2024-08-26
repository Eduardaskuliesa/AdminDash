"use client";
import React, { useEffect } from "react";
import { NavBar } from "../NavBar";
import SideBar from "../Sidebar";
import StoreProvider, { useAppSelector } from "@/app/redux";
import Toast from "../ui/Toast";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarToggled = useAppSelector(
    (state) => state.global.isSidebarToggled
  );

  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <>
      <div
        className={`flex ${
          isDarkMode ? "dark" : "light"
        } bg-gray-50 text-gray-900 w-full min-h-screen`}
      >
        <SideBar></SideBar>
        <main
          className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
            isSidebarToggled ? "md:pl-24" : "md:pl-72"
          } `}
        >
          <NavBar></NavBar>
          <Toast></Toast>
          {children}
          <div id="modal"></div>
        </main>
      </div>
    </>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </StoreProvider>
  );
};

export default DashboardWrapper;
