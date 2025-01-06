import { useState, useEffect } from "react";

export const useResponsiveItemsPerPage = () => {
  const getItemsPerPage = () => {
    if (typeof window === "undefined") return 4;
    if (window.innerWidth < 640) return 2; // sm breakpoint - 2 columns
    if (window.innerWidth < 1024) return 3; // lg breakpoint - 4 columns
    return 4; // xl breakpoint - 6 columns
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return itemsPerPage;
};
