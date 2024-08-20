"use client";
import React, { useState } from "react";
import { LoginFormRegsiter } from "./LoginFormRegsiter";
import { LoginFormFields } from "./LoginFormFields";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  return (
    <div className="w-full max-w-6xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
      <LoginFormRegsiter></LoginFormRegsiter>
      <LoginFormFields></LoginFormFields>
    </div>
  );
};

export default LoginForm;
