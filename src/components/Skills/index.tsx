"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Variants } from "framer-motion";

// Lucide icons (ShadCN UI)
import {
  Code,
  FileCode,
  GitBranch,
  Github,
  Atom,
  Palette,
  Paintbrush,
  Database,
  Terminal,
  Brush,
} from "lucide-react";

interface Skill {
  name: string;
  percentage: number;
  color: string;
  icon: React.ReactNode;
}

const skills: Skill[] = [
  { name: "HTML", percentage: 95, color: "#E34F26", icon: <Code size={20} /> },
  { name: "CSS", percentage: 95, color: "#1572B6", icon: <Code size={20} /> },
  { name: "SASS", percentage: 95, color: "#CC6699", icon: <Brush size={20} /> },
  {
    name: "Bootstrap",
    percentage: 95,
    color: "#7952B3",
    icon: <Code size={20} />,
  },
  {
    name: "Tailwind",
    percentage: 95,
    color: "#38BDF8",
    icon: <Palette size={20} />,
  },
  {
    name: "JavaScript",
    percentage: 95,
    color: "#F7DF1E",
    icon: <FileCode size={20} />,
  },
  { name: "React", percentage: 95, color: "#61DAFB", icon: <Atom size={20} /> },
  {
    name: "Next.js",
    percentage: 95,
    color: "#000000",
    icon: <Atom size={20} />,
  },
  {
    name: "React Native",
    percentage: 95,
    color: "#61DAFB",
    icon: <Atom size={20} />,
  },
  {
    name: "Node.js",
    percentage: 95,
    color: "#339933",
    icon: <Terminal size={20} />,
  },
  {
    name: "MongoDB",
    percentage: 95,
    color: "#47A248",
    icon: <Database size={20} />,
  },
  {
    name: "Git",
    percentage: 95,
    color: "#F05032",
    icon: <GitBranch size={20} />,
  },
  {
    name: "GitHub",
    percentage: 95,
    color: "#181717",
    icon: <Github size={20} />,
  },
  {
    name: "Figma",
    percentage: 70,
    color: "#F24E1E",
    icon: <Palette size={20} />,
  },
  {
    name: "Illustrator",
    percentage: 65,
    color: "#FF9A00",
    icon: <Paintbrush size={20} />,
  },
  {
    name: "Photoshop",
    percentage: 75,
    color: "#31A8FF",
    icon: <Paintbrush size={20} />,
  },
];

const cardVariants:Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: "easeOut", 
    },
  }),
};


const Skills: React.FC = () => {
  return (
    <section className='max-w-6xl mx-auto px-4 py-12'>
      <h1 className='text-4xl font-bold mb-10 text-left text-gray-900 dark:text-gray-100'>
        Skills
      </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            custom={i}
            variants={cardVariants}
            initial='hidden'
            animate='visible'
            whileHover={{ scale: 1.03 }}
          >
            <Card className='transition duration-300 ease-in-out'>
              <CardContent className='p-5'>
                <div className='flex items-center justify-between mb-3'>
                  <div className='flex items-center gap-2 text-lg font-semibold text-gray-800 dark:text-gray-200'>
                    <span>{skill.icon}</span>
                    {skill.name}
                  </div>
                  <span className='font-medium text-gray-700 dark:text-gray-300'>
                    {skill.percentage}%
                  </span>
                </div>
                <Progress
                  value={skill.percentage}
                  className='h-3'
                  style={{
                    width: `${skill.percentage}%`,
                    backgroundColor: skill.color,
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
