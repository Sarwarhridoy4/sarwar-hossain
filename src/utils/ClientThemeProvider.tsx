"use client";

import SnowflakeCursor from "@/components/SnowflakeCursor/SnowflakeCursor";
import { ThemeProvider } from "next-themes";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // State to track when the component has mounted on the client-side
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Set to true when the component has mounted
  }, []);

  // Only render the ThemeProvider after the component has mounted
  if (!mounted) return null;

  return (
    <ThemeProvider attribute='class'>
      <div className='bg-slate-100 dark:bg-gray-900 shadow-lg'>
        <ToastContainer />
        <SnowflakeCursor />
        {children}
      </div>
    </ThemeProvider>
  );
}
