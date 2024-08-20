import React from "react";
import { FaUser, FaLock, FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

export const LoginFormFields = () => {
  return (
    <form className="bg-white p-6 md:p-10 flex-[1.5] flex flex-col justify-center">
      <div className="flex flex-col mb-8 md:mb-10">
        <h2 className="text-4xl md:text-5xl mx-auto font-bold text-gray-800 mb-4 md:mb-6 text-center">
          Welcome Back
        </h2>
        <p className="text-gray-600 text-center mb-6">Log in to your account</p>
        <div className="flex gap-4 mx-auto">
          {[FaGoogle, FaFacebook, FaGithub].map((Icon, index) => (
            <button
              key={index}
              className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition duration-300"
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4 md:mb-6">
        <div className="relative w-full md:w-4/5 mx-auto">
          <FaUser className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg md:text-xl" />
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="Your Username"
            className="w-full border-2 border-gray-300 rounded-lg py-2 md:py-3 px-10 md:px-12 text-base md:text-lg focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>
      </div>
      <div className="mb-6 md:mb-8">
        <div className="relative w-full md:w-4/5 mx-auto">
          <FaLock className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-blue-500 text-lg md:text-xl" />
          <input
            type="password"
            name="password"
            id="password"
            required
            placeholder="Your Password"
            className="w-full border-2 border-gray-300 rounded-lg py-2 md:py-3 px-10 md:px-12 text-base md:text-lg focus:outline-none focus:border-blue-500 transition duration-300"
          />
        </div>
      </div>
      <button
        type="submit"
        className="w-full md:w-4/5 mx-auto flex items-center justify-center bg-blue-600 text-white py-2 md:py-3 rounded-lg text-lg md:text-xl font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
      >
        Login
      </button>
      <p className="text-center text-gray-600 mt-4 md:mt-6 text-sm md:text-base">
        Forgot your password?{" "}
        <a href="#" className="text-blue-600 hover:underline">
          Reset it here
        </a>
      </p>
    </form>
  );
};
