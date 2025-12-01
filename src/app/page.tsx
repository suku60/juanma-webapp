"use client";

import React, { useEffect, useState } from "react";
import anime from "animejs";

export default function Home() {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [total, setTotal] = useState(1);

  const randomColor = () =>
    `hsl(${Math.floor(Math.random() * 360)}, 80%, 60%)`;

  const handleStagger = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = Number(e.currentTarget.id);

    anime({
      targets: ".grid-item",
      backgroundColor: randomColor(),
      delay: anime.stagger(50, { grid: [columns, rows], from: el }),
    });
  };

  const getGridSize = () => {
    const c = Math.floor(window.innerWidth / 50);
    const r = Math.floor(window.innerHeight / 50);

    setColumns(c);
    setRows(r);
    setTotal(r * c);

    anime({
      targets: ".grid-item",
      backgroundColor: "#fff",
      duration: 0,
      easing: "linear",
    });
  };

  useEffect(() => {
    getGridSize();
    window.addEventListener("resize", getGridSize);
    return () => window.removeEventListener("resize", getGridSize);
  }, []);

  return (
    <div className="page w-full h-screen overflow-hidden">
      <main>
        <section>
          <div
            id="grid"
            className="wrapper grid"
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${columns}, 50px)`,
              gridTemplateRows: `repeat(${rows}, 50px)`,
            }}
          >
            {[...Array(total)].map((_, i) => (
              <div
                key={i}
                id={String(i)}
                className="grid-item"
                onClick={handleStagger}
                style={{
                  width: "50px",
                  height: "50px",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(0,0,0,0.05)",
                  cursor: "pointer",
                }}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
