'use client';

import React from 'react';

const CAROUSEL_PHOTOS = [
  "/eventi/SnapInsta.to_496066143_17849759220453132_736675396195444650_n.jpg",
  "/eventi/SnapInsta.to_499225115_17851181826453132_520108042713438518_n.jpg",
  "/eventi/SnapInsta.to_502565204_17857107489453132_6636836426640425247_n.jpg",
  "/eventi/SnapInsta.to_515482116_17857107498453132_1197202394232756239_n.jpg",
  "/eventi/SnapInsta.to_541050719_17864254185453132_2472718374233321529_n.jpg",
  "/eventi/SnapInsta.to_555049749_17867385240453132_4551923173738107532_n.jpg",
  "/eventi/SnapInsta.to_557411102_17867385270453132_6769731847809186128_n.jpg",
  "/eventi/SnapInsta.to_560457826_17868207087453132_5727858721341045132_n.jpg",
  "/eventi/SnapInsta.to_573042264_17871266907453132_6976669707942063451_n.jpg",
  "/eventi/SnapInsta.to_581847306_17872784514453132_8530572488304752198_n.jpg",
  "/eventi/SnapInsta.to_670652930_17892159375453132_5067391862701741077_n.jpg",
  "/eventi/SnapInsta.to_673043486_17892159357453132_3638051623456103126_n.jpg",
];

const N = CAROUSEL_PHOTOS.length;

export function Carousel3D() {
  return (
    <div
      className="c3d-scene"
    >
      <div
        className="c3d-ring"
        style={{ '--n': N } as React.CSSProperties}
      >
        {CAROUSEL_PHOTOS.map((src, i) => (
          <img
            key={src}
            className="c3d-card"
            src={src}
            alt="Evento Ffure"
            loading="lazy"
            style={{ '--i': i } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
