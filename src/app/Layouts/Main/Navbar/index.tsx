"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation"; // To get the active path
import {
  FiSun,
  FiMoon,
  FiMenu,
  FiX,
  FiHome,
  FiFolder,
  FiInfo,
} from "react-icons/fi";
import Link from "next/link";

const Navbar: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname(); // Get the current active route

  // Avoid rendering mismatched HTML
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => pathname === path;

  return (
    <nav className='shadow-lg sticky top-0 z-[100000000000000]'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          {/* Logo */}
          <div className='flex-shrink-0 flex items-center'>
            <Link
              href='/'
              className='font-sacramento text-2xl font-bold text-orange-600 dark:text-orange-400'
            >
              Sarwar Hossain
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex items-center space-x-8'>
            <Link
              href='/'
              className={`flex items-center ${
                isActive("/")
                  ? "text-yellow-500"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-blue-600 dark:hover:text-blue-400`}
            >
              <FiHome className='h-6 w-6 mr-2' />
              Home
            </Link>
            <Link
              href='/projects'
              className={`flex items-center ${
                isActive("/projects")
                  ? "text-yellow-500"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-blue-600 dark:hover:text-blue-400`}
            >
              <FiFolder className='h-6 w-6 mr-2' />
              Projects
            </Link>
            <Link
              href='/about'
              className={`flex items-center ${
                isActive("/about")
                  ? "text-yellow-500"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-blue-600 dark:hover:text-blue-400`}
            >
              <FiInfo className='h-6 w-6 mr-2' />
              About
            </Link>
            <button
              name="theme-switcher"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className='p-2 rounded-full bg-gray-200 dark:bg-gray-700'
            >
              {theme === "dark" ? (
                <FiSun className='h-6 w-6 text-yellow-500' />
              ) : (
                <FiMoon className='h-6 w-6 text-gray-800' />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='flex md:hidden'>
            <button
              name="mobile-menu-button"
              onClick={toggleMenu}
              className='text-gray-700 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-blue-400 focus:outline-none'
            >
              {isOpen ? (
                <FiX className='h-6 w-6' />
              ) : (
                <FiMenu className='h-6 w-6' />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden bg-white dark:bg-gray-900 transition-all duration-300 ease-in-out'>
          <div className='space-y-1 px-2 pt-2 pb-3 sm:px-3'>
            <Link
              href='/'
              className={`flex items-center px-3 py-2 text-base font-medium ${
                isActive("/")
                  ? "text-yellow-500"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-blue-600 dark:hover:text-blue-400`}
              onClick={() => setIsOpen(false)}
            >
              <FiHome className='h-5 w-5 mr-2' />
              Home
            </Link>
            <Link
              href='/projects'
              className={`flex items-center px-3 py-2 text-base font-medium ${
                isActive("/projects")
                  ? "text-yellow-500"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-blue-600 dark:hover:text-blue-400`}
              onClick={() => setIsOpen(false)}
            >
              <FiFolder className='h-5 w-5 mr-2' />
              Projects
            </Link>
            <Link
              href='/about'
              className={`flex items-center px-3 py-2 text-base font-medium ${
                isActive("/about")
                  ? "text-yellow-500"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-blue-600 dark:hover:text-blue-400`}
              onClick={() => setIsOpen(false)}
            >
              <FiInfo className='h-5 w-5 mr-2' />
              About
            </Link>
            <button
              name="theme-switcher"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className='flex items-center px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md'
            >
              {theme === "dark" ? (
                <FiSun className='h-5 w-5 mr-2 text-yellow-500' />
              ) : (
                <FiMoon className='h-5 w-5 mr-2 text-gray-800' />
              )}
              Switch Theme
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
