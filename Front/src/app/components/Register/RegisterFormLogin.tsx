import React from "react";

const RegisterFormLogin = () => {
  return (
    <div className="bg-gradient-to-br from-red-700 to-red-400 p-10 text-white flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="w-40 h-40 bg-red-500 rounded-full opacity-10 absolute -top-10 -left-10"></div>
        <div className="w-60 h-60 bg-red-400 rounded-full opacity-10 absolute -bottom-20 -right-20"></div>
        <div className="w-20 h-20 bg-red-300 rounded-full opacity-10 absolute top-1/2 left-1/4"></div>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 relative z-10 text-center">
        Already a Member?
      </h2>
      <p className="text-base md:text-lg mb-6 md:mb-8 text-center relative z-10 px-4">
        Log in to access your account and enjoy our services
      </p>
      <a
        href="/login"
        className="py-2 md:py-3 px-6 md:px-8 bg-white text-red-700 rounded-full w-auto text-center text-lg md:text-xl font-semibold hover:bg-gray-100 transition duration-300 relative z-10 shadow-lg"
      >
        Login Now
      </a>
    </div>
  );
};

export default RegisterFormLogin;
