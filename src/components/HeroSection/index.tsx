"use client";
import {
  downloadAppFromGoogleDrive,
  downloadFileFromGoogleDrive,
} from "@/utils/Download";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import HBanner from "../HadithContainer";

const HeroSection: React.FC = () => {
  const maskStyle = {
    width: "280px", // Adjust the width
    height: "280px", // Adjust the height
    backgroundImage: "url('/assets/sarwar.png')", // Path to the main image
    backgroundSize: "cover",
    backgroundPosition: "center",
    WebkitMaskImage: "url('/assets/brush_stroke.png')", // Path to the brush stroke
    WebkitMaskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskImage: "url('/assets/brush_stroke.png')",
    maskSize: "contain",
    maskRepeat: "no-repeat",
    maskPosition: "center",
  };
  const slugs = useMemo(
    () => ["Full-Stack", "React", "React-Native", "Front-End", "Back-End"],
    []
  );

  const [currentSlug, setCurrentSlug] = useState<string>(slugs[0]);
  const [displayText, setDisplayText] = useState<string>("");
  const [charIndex, setCharIndex] = useState<number>(0);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [banner, setBanner] = useState<boolean>(true);
  useEffect(() => {
    const typewriter = setInterval(
      () => {
        const currentWord = slugs[slugs.indexOf(currentSlug)];
        if (!isDeleting && charIndex < currentWord.length) {
          setDisplayText((prev) => prev + currentWord[charIndex]);
          setCharIndex((prev) => prev + 1);
        } else if (isDeleting && charIndex > 0) {
          setDisplayText((prev) => prev.slice(0, -1));
          setCharIndex((prev) => prev - 1);
        } else if (!isDeleting && charIndex === currentWord.length) {
          // Start deleting after typing is complete
          setTimeout(() => setIsDeleting(true), 1000);
        } else if (isDeleting && charIndex === 0) {
          // Move to the next word when deletion is complete
          const nextIndex = (slugs.indexOf(currentSlug) + 1) % slugs.length;
          setCurrentSlug(slugs[nextIndex]);
          setIsDeleting(false);
        }
      },
      isDeleting ? 50 : 150
    ); // Faster speed for deleting

    return () => clearInterval(typewriter); // Cleanup interval on component unmount
  }, [charIndex, isDeleting, currentSlug, slugs]);

  const [selectedRole, setSelectedRole] = useState("Select Role");
  const MernLink = `https://drive.google.com/file/d/${process.env.NEXT_PUBLIC_SECRETLINK_MERN}/view?usp=sharing`;
  const ReactLink = `https://drive.google.com/file/d/${process.env.NEXT_PUBLIC_SECRETLINK_REACT}/view?usp=sharing`;
  const NodeLink = `https://drive.google.com/file/d/${process.env.NEXT_PUBLIC_SECRETLINK_NODE}/view?usp=sharing`;
  const appDriveLink = `https://drive.google.com/file/d/${process.env.NEXT_PUBLIC_SECRETLINK_APP}/view?usp=sharing`;
  type RoleChangeEvent = React.ChangeEvent<HTMLSelectElement>;

  const handleRoleChange = (event: RoleChangeEvent): void => {
    const selectedValue = event.target.value;
    setSelectedRole(selectedValue);

    if (selectedValue === "Full Stack") {
      downloadFileFromGoogleDrive(MernLink);
    } else if (selectedValue === "Front End") {
      downloadFileFromGoogleDrive(ReactLink);
    } else if (selectedValue === "Back End") {
      downloadFileFromGoogleDrive(NodeLink);
    }
  };

  return (
    <React.Fragment>
      <div className='w-full absolute top-0 z-[1000000000000000]'>
        {banner && <HBanner setBanner={setBanner} />}
      </div>
      <div className='grid grid-cols-1 gap-8 p-8 md:grid-cols-2 lg:grid-cols-2'>
        <div className='flex flex-col justify-center space-y-4'>
          <h1 className='masked-text'>I&apos;m Sarwar Hossain</h1>
          <p className='dynamic-text'>
            I&apos;m a <span className='slug'>{displayText}</span> developer
          </p>
        </div>
        <div className='flex justify-center items-center' style={maskStyle} />
        {/* Buttons to download resume */}
        <div className='w-full mx-auto'>
          <div className='flex flex-col md:flex-row gap-3 items-center justify-between my-20'>
            <div className='w-40'>
              <select
                name='role'
                value={selectedRole}
                onChange={handleRoleChange}
                className='w-full p-2 border-2 border-yellow-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-transparent dark:text-slate-50 text-slate-950'
              >
                <option value='Select Role' defaultChecked>
                  Select Role
                </option>
                <option value='Full Stack'>Full Stack</option>
                <option value='Front End'>Front End</option>
                <option value='Back End'>Back End</option>
              </select>
            </div>

            <Link href='/contact'>
              <button
                name='contact-me'
                className='w-40 h-10 uppercase border-2 border-yellow-600 text-yellow-600 bg-transparent rounded-md hover:bg-yellow-600 hover:text-white transition duration-300'
              >
                contact me
              </button>
            </Link>

            <button
              name='get-app'
              onClick={() => downloadAppFromGoogleDrive(appDriveLink)}
              className='w-40 h-10 uppercase border-2 border-yellow-600 text-yellow-600 bg-transparent rounded-md hover:bg-yellow-600 hover:text-white transition duration-300'
            >
              get app
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HeroSection;
