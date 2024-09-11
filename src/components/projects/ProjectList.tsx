import { motion } from "framer-motion";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Define the type for a project object
interface Project {
  title: string;
  role: string;
  description: string;
  href: string;
}

// Define the props for the ProjectList component
interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [cursorPosition, setCursorPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  // Capture mouse movement and update position
  const handleMouseMove = (e: React.MouseEvent<HTMLLIElement>) => {
    setCursorPosition({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <ul className="flex flex-col justify-start relative">
      {projects.map((project, index) => (
        <li
          key={index}
          className={cn([
            "relative py-2.5 px-2.5 group",
            { "border-b": index !== projects.length - 1 },
          ])}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMove} // Track mouse movement
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5">
            <a
              className="font-medium truncate md:max-w-[calc(100%-5rem)] max-w-[70%]"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {project.title}
            </a>
            <p className="text-xs md:text-sm text-muted-foreground whitespace-nowrap">
              {project.role}
            </p>
          </div>

          {hoveredIndex === index && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed bg-white shadow-lg border rounded p-4 w-64 z-10 pointer-events-none"
              style={{
                top: cursorPosition.y + 10, // Adjust positioning relative to cursor
                left: cursorPosition.x + 10,
                transform: "translate(-50%, -50%)", // Center the modal around cursor
              }}
            >
              <h4 className="text-sm font-semibold mb-2">{project.title}</h4>
              <p className="text-xs text-gray-600">{project.description}</p>
            </motion.div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
