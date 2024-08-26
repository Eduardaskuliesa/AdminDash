"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { X, CheckCircle, XCircle, Info } from "lucide-react";
import { removeToast } from "@/state/toastSlice";

const Toast = () => {
  const dispatch = useAppDispatch();
  const toasts = useAppSelector((state) => state.toast.toasts);
  const [visibleToasts, setVisibleToasts] = useState<number[]>([]);

  useEffect(() => {
    toasts.forEach((toast) => {
      setVisibleToasts((prev) => [...prev, toast.id]);
      const timer = setTimeout(() => {
        setVisibleToasts((prev) => prev.filter((id) => id !== toast.id));
        setTimeout(() => {
          dispatch(removeToast(toast.id));
        }, 300);
      }, 5000);
      return () => clearTimeout(timer);
    });
  }, [toasts, dispatch]);

  const handleClose = (id: number) => {
    setVisibleToasts((prev) => prev.filter((visibleId) => visibleId !== id));
    setTimeout(() => {
      dispatch(removeToast(id));
    }, 300);
  };

  const getIcon = (type: "success" | "error" | "info") => {
    const iconClass = "mr-2";
    switch (type) {
      case "success":
        return (
          <CheckCircle size={20} className={`${iconClass} text-green-600`} />
        );
      case "error":
        return <XCircle size={20} className={`${iconClass} text-red-600`} />;
      case "info":
        return <Info size={20} className={`${iconClass} text-blue-600`} />;
    }
  };

  const getBackgroundColor = (type: "success" | "error" | "info") => {
    switch (type) {
      case "success":
        return "bg-green-100";
      case "error":
        return "bg-red-100";
      case "info":
        return "bg-blue-100";
    }
  };

  const getBorderColor = (type: "success" | "error" | "info") => {
    switch (type) {
      case "success":
        return "border-green-500";
      case "error":
        return "border-red-500";
      case "info":
        return "border-blue-500";
    }
  };

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className="fixed bottom-4 right-4 space-y-2 z-50"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            ${getBackgroundColor(
              toast.type
            )} text-gray-800 p-4 rounded-md shadow-lg 
            flex items-center justify-between
            border-l-4 ${getBorderColor(toast.type)}
            transform transition-all duration-300 ease-in-out
            ${
              visibleToasts.includes(toast.id)
                ? "translate-x-0 opacity-100"
                : "translate-x-full opacity-0"
            }
            relative
          `}
        >
          <div className="flex items-center">
            {getIcon(toast.type)}
            <span className="font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => handleClose(toast.id)}
            className="ml-4 focus:outline-none text-gray-500 hover:text-gray-700 transition-colors duration-200"
          >
            <X size={18} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
