// Import necessary dependencies
import React from "react";

// Define the types for skill data
interface Skill {
  name: string;
  percentage: number;
  color: string;
}

// Skills component
const Skills: React.FC = () => {
  // Data for skills, including name, percentage, and color for progress bar
  const skills: Skill[] = [
    { name: "HTML", percentage: 95, color: "#E34F26" }, // HTML (orange-red)
    { name: "CSS", percentage: 95, color: "#1572B6" },  // CSS (blue)
    { name: "SAAS", percentage: 95, color: "#CC6699" }, // SASS (pinkish-purple)
    { name: "Bootstrap", percentage: 95, color: "#7952B3" }, // Bootstrap (purple)
    { name: "Tailwind", percentage: 95, color: "#38BDF8" },  // Tailwind CSS (light blue)
    { name: "JavaScript", percentage: 95, color: "#F7DF1E" }, // JavaScript (yellow)
    { name: "React", percentage: 95, color: "#61DAFB" },     // React (light blue)
    { name: "NextJs", percentage: 95, color: "#000000" },    // Next.js (black)
    { name: "React Native", percentage: 95, color: "#61DAFB" }, // React Native (same as React)
    { name: "NodeJs", percentage: 95, color: "#339933" },    // Node.js (green)
    { name: "MongoDB", percentage: 95, color: "#47A248" },   // MongoDB (green)
    { name: "Git", percentage: 95, color: "#F05032" },       // Git (orange)
    { name: "GitHub", percentage: 95, color: "#181717" },    // GitHub (black)
    { name: "Figma", percentage: 30, color: "#F24E1E" },     // Figma (orange)
    { name: "Illustrator", percentage: 65, color: "#FF9A00" }, // Illustrator (orange)
    { name: "PhotoShop", percentage: 75, color: "#31A8FF" },  // Photoshop (blue)
  ];
  

  return (
    <>
      <h1 className='masked-text text-left p-8'>Skills</h1>
      <div className='max-w-lg mx-auto w-full'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {skills.map((skill, index) => (
            <div className='mb-7' key={index}>
              {/* Skill label and percentage display */}
              <div className='flex justify-between py-1'>
                <span className='text-base text-gray-lite font-semibold dark:text-[#A6A6A6]'>
                  {skill.name}
                </span>
                <span className='text-base font-semibold text-gray-lite pr-5 dark:text-[#A6A6A6]'>
                  {skill.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <svg
                className='rc-progress-line'
                viewBox='0 0 100 1'
                preserveAspectRatio='none'
              >
                {/* Background line of the progress bar */}
                <path
                  className='rc-progress-line-trail'
                  d='M 0.5,0.5 L 99.5,0.5'
                  strokeLinecap='round'
                  stroke='#D9D9D9'
                  strokeWidth='1'
                  fillOpacity='0'
                ></path>

                {/* Progress indicator line */}
                <path
                  className='rc-progress-line-path'
                  d='M 0.5,0.5 L 99.5,0.5'
                  strokeLinecap='round'
                  stroke={skill.color}
                  strokeWidth='1'
                  fillOpacity='0'
                  style={{
                    strokeDasharray: `${
                      (skill.percentage / 100) * 100
                    }px, 100px`,
                    strokeDashoffset: "0px",
                    transition:
                      "stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s linear 0s, 0.06s",
                  }}
                ></path>
              </svg>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
