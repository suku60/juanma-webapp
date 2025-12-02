"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

type SectionType = "profile" | "experience" | "contact" | "other";

interface Section {
  type: SectionType;
  text: string;
}

export default function Home() {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);
  const [total, setTotal] = useState(1);
  const [isPlain, setIsPlain] = useState(true)

  const [isESlang, setIsESLang] = useState<boolean>(true)

  const animeRef = useRef<any>(null);

  const fixedColors: Record<SectionType, string> = {
    profile: "hsl(210, 80%, 60%)",
    experience: "hsl(120, 80%, 60%)",
    contact: "hsl(45, 80%, 60%)",
    other: "hsl(300, 80%, 60%)",
  };

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

  const handleStagger = (e: React.MouseEvent<HTMLDivElement>, type?: SectionType) => {
    if (!animeRef.current) return;

    if(!type){
      setIsPlain(!isPlain)
    }else{
      setIsPlain(true)
    }

    const el = Number(e.currentTarget.id);

    const background = type
      ? fixedColors[type]
      : randomColor();

    animeRef.current({
      targets: ".grid-item",
      backgroundColor: !isPlain ? `hsl(0, 0%, 13%)` : background,
      borderColor: !isPlain ? `hsl(0, 0%, 13%)` : null,
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
        backgroundColor: "hsla(0, 0%, 13%, 1.00)",
        duration: 0,
        easing: "linear",
      });
    }
  };

  const sections: Section[] = [
    { type: "profile", text: !isESlang ? "About" : "Sobre mí" },
    { type: "experience", text: !isESlang ? "Experience" : "Experiencia" },
    { type: "contact", text: !isESlang ? "Contacto" : "Contacto" },
    { type: "other", text: !isESlang ? "Others" : "Otros" },
  ];


  const handleLangChange = () => {
    setIsESLang(!isESlang)
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
      {[...Array(total)].map((_, i) => {
        const isButton = i < sections.length;
        const isLangButton = i == sections.length;
        const sectionLabel = sections[i];

        return (
          <div
            key={i}
            id={String(i)}
            className={`grid-item ${isButton ? "section" : ""} ${isPlain ? "plain" : "color"}`}
            onClick={(e) =>
              isLangButton
                ? () => handleLangChange()
                : handleStagger(e, isButton ? sections[i].type : undefined)
            }
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "hsla(0, 0%, 13%, 1)",
              border: "1px solid hsla(0, 0%, 13%, 1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isButton && <Image alt="" height={20} width={20} src={`/assets/icons/${sections[i].type}.svg`} />}
            {isLangButton && <p>{isESlang ? 'es' : 'en'}</p>}
          </div>
        );
      })}
    </div>
  );
}
