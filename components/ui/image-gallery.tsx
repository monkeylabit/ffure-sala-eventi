'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const FFURE_PHOTOS = [
  "/eventi/SnapInsta.to_496066143_17849759220453132_736675396195444650_n.jpg",
  "/eventi/SnapInsta.to_496307304_17849759199453132_1941444102467690414_n.jpg",
  "/eventi/SnapInsta.to_499225115_17851181826453132_520108042713438518_n.jpg",
  "/eventi/SnapInsta.to_502565204_17857107489453132_6636836426640425247_n.jpg",
  "/eventi/SnapInsta.to_515482116_17857107498453132_1197202394232756239_n.jpg",
  "/eventi/SnapInsta.to_515714712_17857107441453132_8739045844216038359_n.jpg",
  "/eventi/SnapInsta.to_541050719_17864254185453132_2472718374233321529_n.jpg",
  "/eventi/SnapInsta.to_542000336_17864254230453132_2422834604870284160_n.jpg",
  "/eventi/SnapInsta.to_543416874_17864254221453132_3451169178576821501_n.jpg",
  "/eventi/SnapInsta.to_555049749_17867385240453132_4551923173738107532_n.jpg",
  "/eventi/SnapInsta.to_555447026_17867385252453132_2408928482109879123_n.jpg",
  "/eventi/SnapInsta.to_557411102_17867385270453132_6769731847809186128_n.jpg",
  "/eventi/SnapInsta.to_560457826_17868207087453132_5727858721341045132_n.jpg",
  "/eventi/SnapInsta.to_561444071_17868207126453132_4363929487105113720_n.jpg",
  "/eventi/SnapInsta.to_573042264_17871266907453132_6976669707942063451_n.jpg",
  "/eventi/SnapInsta.to_573499572_17871473565453132_532099717012509929_n.jpg",
  "/eventi/SnapInsta.to_581847306_17872784514453132_8530572488304752198_n.jpg",
  "/eventi/SnapInsta.to_582243598_17872784532453132_3743843570983191116_n.jpg",
  "/eventi/SnapInsta.to_670652930_17892159375453132_5067391862701741077_n.jpg",
  "/eventi/SnapInsta.to_673043486_17892159357453132_3638051623456103126_n.jpg",
];

function splitIntoColumns(photos: string[], cols: number): string[][] {
  const columns: string[][] = Array.from({ length: cols }, () => []);
  photos.forEach((photo, i) => columns[i % cols].push(photo));
  return columns;
}

interface AnimatedImageProps {
  src: string;
  globalIndex: number;
  onOpen: (index: number) => void;
}

function AnimatedImage({ src, globalIndex, onOpen }: AnimatedImageProps) {
  return (
    <motion.div
      className="relative w-full cursor-pointer overflow-hidden rounded-xl"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-40px' }}
      onClick={() => onOpen(globalIndex)}
    >
      <AspectRatio ratio={1}>
        <img
          src={src}
          alt="Evento Ffure"
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </AspectRatio>
    </motion.div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function ImageGallery() {
  const [lbIndex, setLbIndex] = useState<number | null>(null);
  const [photos, setPhotos] = useState(FFURE_PHOTOS);

  useEffect(() => {
    setPhotos(shuffle(FFURE_PHOTOS));
  }, []);

  const columns = splitIntoColumns(photos, 3);

  const prev = () =>
    setLbIndex(i =>
      i !== null ? (i - 1 + photos.length) % photos.length : null,
    );
  const next = () =>
    setLbIndex(i =>
      i !== null ? (i + 1) % photos.length : null,
    );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLbIndex(null);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  });

  useEffect(() => {
    document.body.style.overflow = lbIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lbIndex]);

  return (
    <>
      <div className="mx-auto grid w-full max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((colPhotos, col) => (
          <div key={col} className="grid gap-3">
            {colPhotos.map((src, rowIdx) => {
              const globalIndex = rowIdx * 3 + col;
              return (
                <AnimatedImage
                  key={src}
                  src={src}
                  globalIndex={globalIndex}
                  onOpen={setLbIndex}
                />
              );
            })}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {lbIndex !== null && (
          <motion.div
            key="lb-backdrop"
            className="fixed inset-0 z-50 flex items-center justify-center"
            initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
            animate={{ backgroundColor: 'rgba(0,0,0,0.96)' }}
            exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
            transition={{ duration: 0.3 }}
            onClick={() => setLbIndex(null)}
          >
            <button
              onClick={() => setLbIndex(null)}
              aria-label="Chiudi"
              className="absolute top-5 right-6 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer z-10"
              style={{ backgroundColor: 'rgba(201,164,101,0.18)', color: '#C9A465' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Precedente"
              className="absolute left-4 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer z-10"
              style={{ backgroundColor: 'rgba(201,164,101,0.18)', color: '#C9A465' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Successiva"
              className="absolute right-4 w-11 h-11 rounded-full flex items-center justify-center cursor-pointer z-10"
              style={{ backgroundColor: 'rgba(201,164,101,0.18)', color: '#C9A465' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <motion.img
              key={photos[lbIndex]}
              src={photos[lbIndex]}
              alt="Evento Ffure"
              initial={{ scale: 0.88, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.88, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[88vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-xs font-bold tracking-widest uppercase"
              style={{ color: 'rgba(201,164,101,0.7)' }}
            >
              {lbIndex + 1} / {photos.length}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
