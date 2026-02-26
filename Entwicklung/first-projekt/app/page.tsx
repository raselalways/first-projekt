"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const canvas = document.getElementById("bg") as HTMLCanvasElement | null;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: any[] = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
      x: number;
      y: number;
      dx: number;
      dy: number;
      radius: number;
      color: string;

      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.dx = (Math.random() - 0.5) * 2;
        this.dy = (Math.random() - 0.5) * 2;
        this.radius = Math.random() * 2 + 0.5;
        this.color = "rgba(0, 255, 255, 0.8)";
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = "#00FFFF";
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.x < 0 || this.x > canvas.width) this.dx = -this.dx;
        if (this.y < 0 || this.y > canvas.height) this.dy = -this.dy;
        this.draw();
      }
    }

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.6)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) particles[i].update();
      requestAnimationFrame(animate);
    }

    for (let i = 0; i < 70; i++) {
      particles.push(
        new Particle(Math.random() * canvas.width, Math.random() * canvas.height)
      );
    }
    animate();
  }, []);

  const projects = [
    {
      id: 1,
      img: "/project1.jpg",
      title: "AI Chatbot",
      desc: "Conversational assistant built with Next.js and OpenAI API.",
    },
    {
      id: 2,
      img: "/project2.jpg",
      title: "Data Visualizer",
      desc: "Interactive data dashboard using D3.js and React.",
    },
    {
      id: 3,
      img: "/project3.jpg",
      title: "Neural Canvas",
      desc: "Generative art with WebGL and Three.js.",
    },
  ];

  return (
    <div className="bg-black text-white relative min-h-screen overflow-hidden">
      {/* Hintergrund-Canvas */}
      <canvas
        id="bg"
        className="absolute top-0 left-0 w-full h-full z-0 bg-black"
      ></canvas>

      {/* Ambient Light Bar unten */}
      <div
        className="
          pointer-events-none
          fixed bottom-0 left-1/2 -translate-x-1/2
          w-[70vw] h-24
          bg-cyan-500/40
          blur-3xl
          opacity-80
          rounded-full
          z-0
        "
      />

      {/* Header */}
      <header className="flex justify-between items-center p-8 relative z-10 backdrop-blur-md bg-black/60">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-cyan-400 drop-shadow-[0_0_8px_#00ffff]"
        >
          Rasel | Informatiker
        </motion.h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded-lg backdrop-blur-md border border-cyan-400 text-cyan-300 hover:bg-cyan-400 hover:text-black transition"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center text-center h-[80vh] relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-extrabold tracking-tight text-cyan-400 mb-4 drop-shadow-[0_0_12px_#00ffff]">
            Build. Innovate. Automate.
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Ich bin Rasel — Informatiker mit Leidenschaft für moderne
            Webentwicklung, KI und Automatisierung.
          </p>
          <a
            href="#projects"
            className="inline-block px-8 py-4 bg-cyan-500 text-black font-semibold rounded-lg shadow-lg hover:bg-cyan-400 transition-transform transform hover:scale-105"
          >
            Projekte ansehen
          </a>
        </motion.div>
      </main>

      {/* Projects */}
      <section id="projects" className="py-20 relative z-10">
        <h3 className="text-4xl font-bold text-center mb-12 text-cyan-300">
          Meine Projekte
        </h3>
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-8">
          {projects.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ scale: 1.05 }}
              className="rounded-xl overflow-hidden bg-gray-900/80 backdrop-blur-lg shadow-lg border border-cyan-700/40"
            >
              <Image
                src={p.img}
                alt={p.title}
                width={500}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 text-left">
                <h4 className="text-xl text-cyan-400 font-semibold mb-2">
                  {p.title}
                </h4>
                <p className="text-gray-300 text-sm">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-400 relative z-10">
        <p>&copy; 2026 Rasel — Developed with ❤️ in Berlin</p>
        <div className="space-x-6 mt-2">
          <a
            href="https://github.com/rasel"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/rasel"
            target="_blank"
            rel="noreferrer"
            className="hover:text-cyan-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </div>
  );
}
