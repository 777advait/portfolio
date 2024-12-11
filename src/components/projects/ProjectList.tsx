import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { urlForImage } from "@/sanity/lib/urlForImage";
import type { Projects } from "@/lib/definitions";
import { useMediaQuery } from "usehooks-ts";

interface ProjectListProps {
  projects: Projects[];
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <ul className="">
      {projects.map((project, index) => (
        <motion.li
          className="border-t hover:cursor-pointer p-1.5"
          initial={{ opacity: 0 }}
          animate={{
            opacity:
              hoveredIndex === index || expandedIndex === index
                ? 1
                : (isDesktop && hoveredIndex !== null) || expandedIndex !== null
                  ? 0.25
                  : 1,
          }}
          transition={{ duration: 0.2 }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() =>
            setExpandedIndex(expandedIndex === index ? null : index)
          }
          key={index}
        >
          <div className={"flex justify-between items-center "}>
            <div className="">
              <h2 className="font-medium">{project.title}</h2>
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
                    {project.image && (
                      <img
                        src={urlForImage(project.image).url()}
                        alt={project.title}
                        className="object-cover w-full h-auto rounded-md"
                      />
                    )}
                  </div>
                  <p className="text-muted-foreground font-medium pl-2">
                    {project.description}
                  </p>
                  {project.href ? (
                    <a
                      className="flex justify-end items-center gap-0.5 underline underline-offset-2 decoration-dashed text-muted-foreground"
                      target="_blank"
                      href={project.href}
                    >
                      preview{" "}
                      <span>
                        <ArrowUpRight className="h-4 w-4" />
                      </span>
                    </a>
                  ) : (
                    <p className="flex justify-end items-center gap-0.5 underline underline-offset-2 decoration-dashed text-muted-foreground">
                      no preview
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.li>
      ))}
    </ul>
  );
};

export default ProjectList;
