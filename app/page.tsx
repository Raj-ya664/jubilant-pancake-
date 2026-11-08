"use client";

import Image from "next/image";
import { Github, Linkedin, Mail, Phone, Download, Bot, User, QrCode, X, Music, Pause } from "lucide-react";
import { ExperienceItem } from "./components/ExperienceItem";
import { TechStack } from "./components/TechStack";
import { useState, useEffect, useMemo, useRef } from "react";
import { QRCodeSVG } from "qrcode.react";
import { ThemeToggle } from "./components/ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

import { PomodoroTimer } from "./components/PomodoroTimer";
import { NeuralNetworkSim } from "./components/NeuralNetworkSim";

import { getMarkdownContent } from "./data/content";
import { MusicPlayer, type Track } from "@/components/ui/music-player";

const musicQueue: Track[] = [
  {
    id: "goat-life",
    title: "Goat Life",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/goatlife.png",
    duration: 0,
    url: "/goatlife.mp3",
  },
  {
    id: "inception",
    title: "Inception",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/casual.png",
    duration: 0,
    url: "/inception.mp3",
  },
  {
    id: "interstellar",
    title: "Interstellar",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/intersteller.png",
    duration: 0,
    url: "/intersteller.mp3",
  },
  {
    id: "jingle",
    title: "Jingle",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/casual.png",
    duration: 0,
    url: "/jingle.mp3",
  },
  {
    id: "lofi-study",
    title: "Lo-fi Study Session",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/casual.png",
    duration: 0,
    url: "/lofi.mp3",
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/openhaimmer.png",
    duration: 0,
    url: "/openhaimmer.mp3",
  },
  {
    id: "drama-mind",
    title: "Drama Mind",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/casual.png",
    duration: 0,
    url: "/dramamind.mp3.mpeg",
  },
  {
    id: "leocarlo",
    title: "Leocarlo",
    artist: "Raj Yadav",
    album: "Portfolio Radio",
    artwork: "/leocarloSongimg.png",
    duration: 0,
    url: "/leocarlo.mp3",
  },
];

export default function Home() {
  const [time, setTime] = useState<string>("");
  const [showQR, setShowQR] = useState(false);
  const [mode, setMode] = useState<"human" | "agent">("human");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  const markdownContent = getMarkdownContent(time);

  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [lofiVolume, setLofiVolume] = useState(1);
  const lofiRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (lofiRef.current) {
      lofiRef.current.volume = lofiVolume;
    }
  }, [lofiVolume]);

  useEffect(() => {
    return () => {
      if (lofiRef.current) {
        lofiRef.current.pause();
        lofiRef.current = null;
      }
    };
  }, []);

  const toggleLofi = () => {
    if (!lofiRef.current) {
      lofiRef.current = new Audio("/lofi.mp3");
      lofiRef.current.loop = true;
      lofiRef.current.volume = lofiVolume;
    }

    if (isLofiPlaying) {
      lofiRef.current.pause();
    } else {
      lofiRef.current.play().catch(e => console.error("Lofi play failed:", e));
    }
    setIsLofiPlaying(!isLofiPlaying);
  };

  const starPositions = useMemo(() => {
    return [...Array(50)].map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: 2 + Math.random() * 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className={`relative flex min-h-screen flex-col items-center bg-white dark:bg-black px-3 pt-16 text-black dark:text-white selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black pb-32 sm:px-4 sm:pt-24 sm:pb-40 overflow-x-hidden transition-colors duration-300`}>
      {/* Easter Egg Effects */}
      <AnimatePresence>
        {showEasterEgg && (
          <>
            {/* Bluish Aura Edge Effect */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] pointer-events-none shadow-[inset_0_0_150px_rgba(29,78,216,0.5)] dark:shadow-[inset_0_0_150px_rgba(59,130,246,0.4)] transition-opacity duration-1000"
            />
            {/* Twinkling Stars Background */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
            >
              {starPositions.map((pos, i) => (
                <motion.div
                  key={i}
                  className="absolute h-[2px] w-[2px] bg-blue-500 dark:bg-white rounded-full shadow-[0_0_4px_rgba(59,130,246,0.8)] dark:shadow-[0_0_3px_white]"
                  style={{
                    top: pos.top,
                    left: pos.left,
                  }}
                  animate={{
                    opacity: [0.2, 1, 0.2],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{
                    duration: pos.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: pos.delay,
                  }}
                />
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Theme Toggle in Top Right */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <AnimatePresence mode="wait">
        {mode === "agent" ? (
          /* Agent Mode - Markdown View */
          <motion.main
            key="agent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-start text-left px-4 sm:px-0"
          >
            <pre
              className="w-full whitespace-pre-wrap font-mono text-sm leading-relaxed text-black dark:text-gray-300 selection:bg-black dark:selection:bg-white selection:text-white dark:selection:text-black antialiased"
              style={{ fontFamily: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Console", monospace' }}
            >
              {markdownContent}
            </pre>
          </motion.main>
        ) : (
          /* Human Mode - Original View */
          <motion.main
            key="human"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Profile Image - Easter Egg Trigger */}
            <button
              onClick={() => setShowEasterEgg(!showEasterEgg)}
              className="group relative mb-2 h-40 w-40 grayscale filter sm:h-56 sm:w-56 overflow-hidden cursor-pointer transition-all duration-500 hover:grayscale-0 active:scale-95"
              aria-label="Toggle Aura Mode"
            >
              <Image
                src="/me.png" // User's photo
                alt="Profile"
                fill
                className={`object-contain transition-all duration-700 ${showEasterEgg ? 'grayscale-0 scale-105' : 'grayscale'}`}
                priority
              />
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white via-white/60 to-transparent dark:from-black dark:via-black/60 backdrop-blur-[1px]" />

              {/* Subtle Glow on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_20px_rgba(59,130,246,0.3)] rounded-full pointer-events-none" />
            </button>

            {/* Hero Text */}
            <h1 className="mb-4 text-5xl font-bold tracking-tight sm:text-7xl">
              Raj Yadav
            </h1>

            {/* Phonetic Pronunciation (Aesthetic touch often found in minimal portfolios) */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-2 text-xs text-gray-400 dark:text-gray-500 sm:text-sm">
              <span>/raːʒ ˈjaːdʌv/
</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <span>noun</span>
              <span className="text-gray-300 dark:text-gray-700">•</span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="tabular-nums text-xs sm:text-sm">{time || "00:00:00"}</span>
                  <span className="text-[10px] uppercase tracking-wider sm:text-xs">IST</span>
                </div>

                <span className="text-gray-300 dark:text-gray-700">•</span>

                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-tight text-gray-400">lofi</span>
                  <button
                    onClick={toggleLofi}
                    className="flex h-5 w-5 items-center justify-center rounded-full transition-all hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-400 hover:text-black dark:hover:text-white"
                    aria-label={isLofiPlaying ? "Pause Lofi" : "Play Lofi"}
                  >
                    {isLofiPlaying ? <Pause size={10} fill="currentColor" /> : <Music size={10} />}
                  </button>
                  <AnimatePresence>
                    {isLofiPlaying && (
                      <motion.div
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 40, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        className="flex h-5 items-center overflow-hidden"
                      >
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={lofiVolume}
                          onChange={(e) => setLofiVolume(parseFloat(e.target.value))}
                          className="h-[2px] w-8 cursor-pointer appearance-none rounded-full bg-gray-200 dark:bg-zinc-800 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-2 [&::-webkit-slider-thumb]:w-2 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gray-400 dark:[&::-webkit-slider-thumb]:bg-zinc-500 hover:[&::-webkit-slider-thumb]:bg-black dark:hover:[&::-webkit-slider-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:h-2 [&::-moz-range-thumb]:w-2 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-gray-400 dark:[&::-moz-range-thumb]:bg-zinc-500 hover:[&::-moz-range-thumb]:bg-black dark:hover:[&::-moz-range-thumb]:bg-white transition-all"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            <div className="w-full space-y-4 text-left text-base leading-relaxed text-gray-600 dark:text-gray-400 sm:text-lg md:text-xl">
              <p>
                Computer Science Engineering (Data Science) student at Gyan Ganga Institute of Technology and Sciences (RGPV), graduating in 2027.
              </p>
              <p>
                I build full-stack applications, backend services, mobile apps, and AI-powered tools using JavaScript, TypeScript, Python, and modern web technologies.
              </p>
            </div>

            <NeuralNetworkSim />

            {/* Projects Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Projects
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Phone-Pay Backend Clone"
                  role="Node.js, Express.js, Docker, MongoDB"
                  collapsible={true}
                  link="https://github.com/Raj-ya664/phone-pay-mern-backend"
                >
                  <div className="space-y-2">
                    <p>Built modular APIs for authentication, wallet management, and peer-to-peer transactions.</p>
                    <p>Added JWT authentication, bcrypt credential handling, and MPIN-protected payment flows.</p>
                    <p>Implemented adding money, bill payments, balance tracking, transfers by phone number or UPI ID, and transaction history.</p>
                    <p>Documented APIs with Swagger and configured Docker and Docker Compose for portability.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Anonymous Chat Rooms"
                  role="Real-Time Chat Application · Node.js, Express.js, Socket.io, React.js, CSS"
                  collapsible={true}
                  link="https://github.com/Raj-ya664/chating_web_app-"
                >
                  <div className="space-y-2">
                    <p>Built a real-time chat platform with instant messaging, authentication, typing indicators, and live updates using Socket.io.</p>
                    <p>Designed REST APIs with Node.js and Express.js and developed the client in React.js with Vite.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="Calculator Mobile App"
                  role="React Native, Expo"
                  collapsible={true}
                  link="https://github.com/Raj-ya664/Calculator-mobile.git"
                >
                  <div className="space-y-2">
                    <p>Created a functional calculator supporting real-time calculations with an intuitive React Native interface.</p>
                  </div>
                </ExperienceItem>

                <ExperienceItem
                  title="AI Image Generator"
                  role="Text to Image · Node.js, Express.js, Gemini API, React.js, Tailwind CSS"
                  collapsible={true}
                  link="https://github.com/Raj-ya664/AI_image_genrator_web_app.git"
                >
                  <div className="space-y-2">
                    <p>Developed an AI-powered image generation tool using Gemini API with a responsive React and Tailwind CSS interface.</p>
                    <p>Optimized API usage and rendering performance for quicker results.</p>
                  </div>
                </ExperienceItem>
              </div>
            </div>


            {/* Education Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Education
              </h2>
              <div className="space-y-12">
                <ExperienceItem
                  title="Gyan Ganga Institute of Technology and Sciences (RGPV)"
                  role="Bachelor of Technology in Computer Science Engineering (Data Science)"
                >
                  <p>2023–2027 · CGPA: 7.26/10</p>
                </ExperienceItem>
              </div>
            </div>

            {/* Tech Stack Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Tech Stack
              </h2>
              <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                Tools and technologies I work with:
              </p>
              <TechStack />
              <p className="mt-6 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                CS fundamentals: Data Structures and Algorithms, Operating Systems, Database Management Systems, and Object-Oriented Programming.
              </p>
            </div>

            {/* Videos Section */}

            {/* Thing about me Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Achievements & Certifications
              </h2>
              <div className="space-y-6">
                <p className="w-full text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                  Debugging Champion 2026 Winner: awarded first prize at Gyan Ganga Institute of Technology and Sciences.
                </p>

                <ul className="grid grid-cols-1 gap-3 text-sm text-gray-600 dark:text-gray-400 sm:grid-cols-2">
                  <li>Commonwealth Bank Virtual Experience (Forage)</li>
                  <li>AWS Cloud Foundations</li>
                  <li>AWS Cloud Practitioner Essentials</li>
                  <li>Cisco Python Essentials</li>
                  <li>Cisco CCNA 1, 2, and 3</li>
                  <li>MongoDB Intro to MongoDB Atlas</li>
                  <li>Databricks Generative AI Fundamentals</li>
                  <li>Cisco Introduction to Data Science</li>
                </ul>

                <div className="flex justify-center">
                  <div className="relative h-[250px] w-full max-w-sm grayscale hover:grayscale-0 transition-all duration-700 sm:h-[350px]" style={{ maskImage: "radial-gradient(circle, black 40%, transparent 95%)", WebkitMaskImage: "radial-gradient(circle, black 40%, transparent 95%)" }}>
                    <Image
                      src="/casual.png"
                      alt="Casual photo"
                      fill
                      unoptimized
                      className="object-contain object-center"
                    />
                  </div>
                </div>

              </div>
            </div>

            {/* Get in Touch Section */}
            <div className="mb-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400">
                Get in Touch
              </h2>
              <div className="space-y-4">
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Reach me at{" "}
                  <a
                    href="mailto:rajyadav25974@gmail.com"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    rajyadav25974@gmail.com
                  </a>
                  {" "}or call{" "}
                  <a
                    href="tel:+919131732320"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    +91-9131732320
                  </a>.
                  {" "}Connect on{" "}
                  <a
                    href="https://www.linkedin.com/in/raj-yadav-661665320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-black dark:text-white underline underline-offset-4 hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    LinkedIn
                  </a>.
                </p>
              </div>
            </div>

            {/* Pomodoro Timer Section */}
            <PomodoroTimer />

            {/* Music Player Section */}
            <section className="mb-16 mt-16 w-full text-left">
              <h2 className="mb-6 text-xs font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
                Music Player
              </h2>
              <div className="flex w-full flex-col items-center justify-center gap-6 sm:flex-row sm:gap-8">
                <div className="w-full sm:w-80">
                  <MusicPlayer
                    currentTrack={musicQueue[0]}
                    queue={musicQueue}
                    currentIndex={0}
                    autoPlay={false}
                    className="rounded-xl"
                  />
                </div>
                <div className="relative aspect-[810/1024] w-full max-w-56 shrink-0 overflow-hidden rounded-2xl border border-gray-100 shadow-sm dark:border-zinc-800 sm:w-80 sm:max-w-none">
                  <Image
                    src="/cat.png"
                    alt="White cat"
                    fill
                    sizes="(max-width: 640px) 224px, 320px"
                    className="object-cover"
                  />
                </div>
              </div>
            </section>

          </motion.main>
        )}
      </AnimatePresence>

      {/* Glass Island Navbar */}
      <nav className="fixed bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full border border-gray-200 dark:border-zinc-700 bg-white/70 dark:bg-zinc-900/80 px-4 py-3 shadow-sm backdrop-blur-md transition-all hover:bg-white/90 dark:hover:bg-zinc-900 sm:gap-6 sm:px-6">
        {/* Mode Toggle Switch */}
        <div className="flex items-center">
          <button
            onClick={() => setMode(mode === "human" ? "agent" : "human")}
            className="group relative flex h-7 w-12 cursor-pointer rounded-full bg-gray-200 dark:bg-zinc-700 p-1 transition-colors duration-200 ease-in-out hover:bg-gray-300 dark:hover:bg-zinc-600 focus:outline-none"
            role="switch"
            aria-checked={mode === "agent"}
            title={`Switch to ${mode === "human" ? "agent" : "human"} mode`}
          >
            <div
              className={`flex h-5 w-5 transform items-center justify-center rounded-full bg-white dark:bg-white shadow-sm transition duration-200 ease-in-out ${mode === "agent" ? "translate-x-5" : "translate-x-0"
                }`}
            >
              {mode === "human" ? (
                <User className="h-3 w-3 text-black" />
              ) : (
                <Bot className="h-3 w-3 text-black" />
              )}
            </div>
          </button>
        </div>
        <button
          onClick={() => setShowQR(true)}
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Show QR Code"
        >
          <QrCode className="h-5 w-5" />
        </button>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href="https://github.com/Raj-ya664"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="GitHub profile"
          title="GitHub"
        >
          <Github className="h-5 w-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/raj-yadav-661665320?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="LinkedIn profile"
          title="LinkedIn"
        >
          <Linkedin className="h-5 w-5" />
        </a>
        <div className="h-6 w-px bg-gray-200 dark:bg-zinc-700" />
        <a
          href="mailto:rajyadav25974@gmail.com"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Email Raj Yadav"
          title="Email"
        >
          <Mail className="h-5 w-5" />
        </a>
        <a
          href="/Raj_yadav_3_%20(3).pdf"
          download="Raj_Yadav_Resume.pdf"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Download resume"
          title="Download resume"
        >
          <Download className="h-5 w-5" />
        </a>
        <a
          href="tel:+919131732320"
          className="text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors hover:scale-110"
          aria-label="Call Raj Yadav"
          title="Call"
        >
          <Phone className="h-5 w-5" />
        </a>
      </nav>

      {/* QR Code Modal */}
      {
        showQR && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/20 dark:bg-white/5 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          >
            <div
              className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-black p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowQR(false)}
                className="absolute -right-3 -top-3 rounded-full bg-black dark:bg-white p-2 text-white dark:text-black transition-transform hover:scale-110"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="rounded-lg bg-white p-2">
                <QRCodeSVG
                  value="mailto:rajyadav25974@gmail.com"
                  size={200}
                  level="H"
                  includeMargin={false}
                />
              </div>
            </div>
          </div>
        )
      }
    </div >
  );
}
