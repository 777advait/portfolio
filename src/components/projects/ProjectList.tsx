import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Project {
  title: string;
  role: string;
  description: string;
  href: string;
}

interface ProjectListProps {
  projects: Project[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ul className="space-y-2">
      {projects.map((project, index) => (
        <li className={"border-t hover:cursor-pointer p-1.5"} key={index}>
          <div
            className="flex justify-between items-center "
            onClick={() => toggleExpand(index)}
          >
            <div className="">
              <h2 className="font-medium text-base">{project.title}</h2>
              <p className="text-muted-foreground">{project.role}</p>
            </div>
            <div>{expandedIndex === index ? "-" : "+"}</div>
          </div>
          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden hover:cursor-auto"
              >
                <div className="space-y-4 py-4 pl-2 lg:w-3/4 ">
                  <div className="space-y-1.5">
                    <img
                      src="/wne3.png"
                      alt={project.title}
                      className="object-cover w-full h-auto rounded-md"
                    />
                    <a
                      className="flex justify-end items-center gap-0.5 underline underline-offset-2 decoration-dashed text-muted-foreground"
                      target="_blank"
                      href={project.href}
                    >
                      live{" "}
                      <span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  </div>
                  <p className="text-muted-foreground font-medium pl-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
};

export default ProjectList;
