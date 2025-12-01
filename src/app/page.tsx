"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Home() {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [total, setTotal] = useState(1);

  const animeRef = useRef<any>(null); 

  const randomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;

  useEffect(() => {
    import("animejs").then((mod) => {
      animeRef.current = mod.default || mod;
      getGridSize(); 
    });

    window.addEventListener("resize", getGridSize);
    return () => window.removeEventListener("resize", getGridSize);
  }, []);

  const handleStagger = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!animeRef.current) return; 

    const el = Number(e.currentTarget.id);

    animeRef.current({
      targets: ".grid-item",
      backgroundColor: randomColor(),
      delay: animeRef.current.stagger(50, { grid: [columns, rows], from: el }),
    });
  };

  const getGridSize = () => {
    const c = Math.floor(window.innerWidth / 50);
    const r = Math.floor(window.innerHeight / 50);
    setColumns(c);
    setRows(r);
    setTotal(r * c);

    if (animeRef.current) {
      animeRef.current({
        targets: ".grid-item",
        backgroundColor: "#fff",
        duration: 0,
        easing: "linear",
      });
    }
  };

  return (
    <div
      id="grid"
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
      }}
    >
      {[...Array(total)].map((_, i) => (
        <div
          key={i}
          id={String(i)}
          className="grid-item"
          onClick={handleStagger}
          style={{
            width: "1fr",
            height: "1fr",
            backgroundColor: "#fff",
            border: "1px solid rgba(0,0,0,0.05)",
            cursor: "pointer",
          }}
        />
      ))}
    </div>
  );
}
