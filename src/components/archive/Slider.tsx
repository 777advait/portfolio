import { motion } from "framer-motion";
import React from "react";

export default function Slider({
  imageData,
}: {
  imageData: { title: string; url: string; webpUrl: string }[];
}) {
  const [width, setWidth] = React.useState(0);
  const carousel = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, []);

  return (
    <div className="slider-container">
      <motion.div ref={carousel} className="cursor-grab overflow-hidden px-1">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -width }}
          className="flex space-x-6"
        >
          {imageData.map((image) => (
            <motion.div
              key={image.url}
              className="aspect-square min-w-[300px] h-[300px]"
            >
              <img
                className="rounded-md w-full h-full object-cover pointer-events-none"
                src={image.webpUrl}
                alt={image.title}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
