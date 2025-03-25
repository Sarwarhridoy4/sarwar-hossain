"use client";
import { ThemeProvider } from "next-themes";
import { MagicCursor, MagicCursorProvider } from "react-magic-cursor";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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
      <MagicCursorProvider thickness={2}>
        <div className='bg-slate-100 dark:bg-gray-900 shadow-lg'>
          <MagicCursor />
          <ToastContainer />
          {children}
        </div>
      </MagicCursorProvider>
    </ThemeProvider>
  );
}
