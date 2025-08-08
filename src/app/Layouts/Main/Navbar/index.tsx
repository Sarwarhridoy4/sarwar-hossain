"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { motion, Variants } from "framer-motion";
import { Home, User, Sun, Moon, Menu, X, FolderCheckIcon } from "lucide-react";

const menuItems = [
  {
    icon: <Home className='h-5 w-5' />,
    label: "Home",
    href: "/",
    gradient:
      "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "group-hover:text-blue-500 dark:group-hover:text-blue-400",
  },
  {
    icon: <FolderCheckIcon className='h-5 w-5' />,
    label: "Projects",
    href: "/projects",
    gradient:
      "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "group-hover:text-orange-500 dark:group-hover:text-orange-400",
  },
  {
    icon: <User className='h-5 w-5' />,
    label: "Profile",
    href: "/about",
    gradient:
      "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "group-hover:text-red-500 dark:group-hover:text-red-400",
  },
];

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
};

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
};

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring", stiffness: 300, damping: 25 },
    },
  },
};

const navGlowVariants: Variants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
};

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
};

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isActive = (href: string) => pathname === href;

  return (
    <nav className='sticky top-0 z-50 bg-transparent p-4'>
      <div className='max-w-6xl mx-auto flex justify-between items-center'>
        <h1 className='font-sacramento text-2xl font-bold text-orange-600 dark:text-orange-400'>
          Sarwar Hossain
        </h1>

        {/* Desktop Menu */}
        <motion.ul
          className='hidden md:flex items-center gap-4 relative z-10'
          initial='initial'
          whileHover='hover'
        >
          <motion.div
            className='absolute -inset-2 rounded-3xl z-0 pointer-events-none'
            style={{
              background:
                "radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(147,51,234,0.1) 50%, rgba(239,68,68,0.1) 100%)",
            }}
            variants={navGlowVariants}
          />
          {menuItems.map((item) => (
            <motion.li key={item.label} className='relative'>
              <motion.div
                className='block rounded-xl group relative overflow-visible'
                style={{ perspective: "600px" }}
                whileHover='hover'
                initial='initial'
              >
                <motion.div
                  className='absolute inset-0 z-0 pointer-events-none rounded-2xl'
                  variants={glowVariants}
                  style={{ background: item.gradient }}
                />

                <Link href={item.href} legacyBehavior>
                  <motion.a
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-xl relative z-10
                    ${
                      isActive(item.href)
                        ? "text-yellow-500"
                        : "text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white"
                    }`}
                    variants={itemVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center bottom",
                    }}
                  >
                    <span className={`${item.iconColor}`}>{item.icon}</span>
                    {item.label}
                  </motion.a>
                </Link>

                <Link href={item.href} legacyBehavior>
                  <motion.a
                    className='flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 rounded-xl'
                    variants={backVariants}
                    transition={sharedTransition}
                    style={{
                      transformStyle: "preserve-3d",
                      transformOrigin: "center top",
                      transform: "rotateX(90deg)",
                    }}
                  >
                    <span className={`${item.iconColor}`}>{item.icon}</span>
                    {item.label}
                  </motion.a>
                </Link>
              </motion.div>
            </motion.li>
          ))}

          {/* Theme Toggle */}
          <button
            name='theme-toggle'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className='ml-4 p-2 bg-gray-200 dark:bg-gray-700 rounded-full'
          >
            {theme === "dark" ? (
              <Sun className='h-5 w-5 text-yellow-400' />
            ) : (
              <Moon className='h-5 w-5 text-gray-800' />
            )}
          </button>
        </motion.ul>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='text-gray-700 dark:text-gray-200'
          >
            {isOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden mt-2 bg-white dark:bg-gray-900 shadow rounded-xl p-4 space-y-2'>
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <a
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(item.href)
                    ? "text-yellow-500"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.icon}
                {item.label}
              </a>
            </Link>
          ))}
          <button
            name='theme-toggle'
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className='flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300'
          >
            {theme === "dark" ? (
              <Sun className='h-5 w-5 text-yellow-400' />
            ) : (
              <Moon className='h-5 w-5 text-gray-800' />
            )}
            Switch Theme
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
