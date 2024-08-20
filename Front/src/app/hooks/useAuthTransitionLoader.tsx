"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export const useAuthTransitionLoading = () => {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const authPaths = ["/login", "/register", "/"];
    if (authPaths.includes(pathname)) {
      setIsLoading(false);
    }
  }, [pathname]);

  const startLoading = () => setIsLoading(true);

  return { isLoading, startLoading };
};
