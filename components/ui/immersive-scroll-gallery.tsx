"use client";

import { useRef } from "react";
import React from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

// Types
interface iIPicture {
  src: string;
  scale: MotionValue<number>;
}

interface ImmersiveScrollGalleryProps {
  images?: { src: string; scale: MotionValue<number> | null }[];
  className?: string;
}

// Ffure event photos (7 images matching IMAGE_STYLES slots)
const DEFAULT_IMAGES = [
  { src: "/eventi/SnapInsta.to_670652930_17892159375453132_5067391862701741077_n.jpg",   scale: null },
  { src: "/eventi/SnapInsta.to_555049749_17867385240453132_4551923173738107532_n.jpg",   scale: null },
  { src: "/eventi/SnapInsta.to_581847306_17872784514453132_8530572488304752198_n.jpg",   scale: null },
  { src: "/eventi/SnapInsta.to_502565204_17857107489453132_6636836426640425247_n.jpg",   scale: null },
  { src: "/eventi/SnapInsta.to_673043486_17892159357453132_3638051623456103126_n.jpg",   scale: null },
  { src: "/eventi/SnapInsta.to_560457826_17868207087453132_5727858721341045132_n.jpg",   scale: null },
  { src: "/eventi/SnapInsta.to_543416874_17864254221453132_3451169178576821501_n.jpg",   scale: null },
];

// Positioning for the 7 overlapping image tiles
const IMAGE_STYLES = [
  "w-[25vw] h-[25vh]",
  "w-[35vw] h-[30vh] -top-[30vh] left-[5vw]",
  "w-[20vw] h-[55vh] -top-[15vh] -left-[25vw]",
  "w-[25vw] h-[25vh] left-[27.5vw]",
  "w-[20vw] h-[30vh] top-[30vh] left-[5vw]",
  "w-[30vw] h-[25vh] top-[27.5vh] -left-[22.5vw]",
  "w-[15vw] h-[15vh] top-[22.5vh] left-[25vw]",
];

const ImmersiveScrollGallery: React.FC<ImmersiveScrollGalleryProps> = ({
  images = DEFAULT_IMAGES,
  className = "",
}) => {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
  const opacityImage    = useTransform(scrollYProgress, [0, 1],   [1, 0]);
  const opacitySection2 = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const scaleSection2   = useTransform(scrollYProgress, [0.6, 0.8], [0.8, 1]);

  const scaleMap = [scale4, scale5, scale6, scale5, scale6, scale8, scale9];

  const pictures: iIPicture[] = images.map((img, i) => ({
    src:   img.src,
    scale: scaleMap[i % 7],
  }));

  return (
    <div ref={container} className={`relative h-[200vh] ${className}`}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Zooming image tiles */}
        {pictures.map(({ src, scale }, index) => (
          <motion.div
            key={index}
            style={{ scale, opacity: opacityImage }}
            className="absolute flex items-center justify-center w-full h-full top-0"
          >
            <div className={`relative overflow-hidden ${IMAGE_STYLES[index]}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Evento Ffure ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </div>
          </motion.div>
        ))}

        {/* Reveal text section that appears at end of scroll */}
        <motion.div
          style={{ opacity: opacitySection2, scale: scaleSection2 }}
          className="w-full h-full flex flex-col items-center justify-center px-8 relative"
        >
          <p className="font-display text-sm tracking-[0.2em] text-gold mb-4 uppercase">
            Sala per eventi &amp; conferenze
          </p>
          <h2
            className="font-display text-[clamp(2.5rem,6vw,5rem)] text-dark text-center leading-tight max-w-3xl"
            style={{ lineHeight: 1.15 }}
          >
            OGNI EVENTO MERITA{" "}
            <span className="gold-text">UNO SPAZIO SPECIALE</span>
          </h2>
          <p className="text-dark/60 text-lg font-light text-center mt-6 max-w-xl leading-relaxed">
            Compleanni, battesimi, feste a tema, conferenze aziendali — curiamo
            ogni dettaglio per rendere il tuo momento indimenticabile.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-block bg-gold text-dark font-extrabold px-10 py-4 rounded-full text-xs tracking-widest uppercase hover:bg-warm transition-colors duration-200 cursor-pointer shadow-xl"
          >
            Richiedi un preventivo
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default ImmersiveScrollGallery;
