import React from "react";
import RegisterFormLogin from "./RegisterFormLogin";
import RegisterFormFields from "./RegisterFormFields";

const RegisterForm = () => {
  return (
    <div className="w-full max-w-6xl h-[700px] mx-auto bg-white shadow-2xl rounded-xl overflow-hidden flex flex-col md:flex-row">
      <RegisterFormLogin></RegisterFormLogin>
      <RegisterFormFields></RegisterFormFields>
    </div>
  );
};

export default RegisterForm;
