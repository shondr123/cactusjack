/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import {
  ArrowRight,
  Play,
  Menu,
  X,
  Instagram,
  Twitter,
  ExternalLink,
  Disc3,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "./lib/utils";

const SPOTIFY_ALBUM = "https://open.spotify.com/album/5m3cFmubEJK548Y4WvEMJZ";
const CACTUS_LOGO = "/logo.png";
const ALBUM_COVER = "/jackboys-cover.png";
const PHOTO_MOTION = "/travis-motion.png";
const MASK_PHOTO = "/neonmask.png"
const CAR_PHOTO = "/car.jpg"
const SICK_PHOTO = "/sick.jpg"
/** Group flash photo — add as public/jackboys-crew.png to use */
const PHOTO_CREW = "/crew.jpg";

type LogoSize = "nav" | "md" | "lg" | "hero";

const CactusLogo = ({
  size = "md",
  className,
}: {
  size?: LogoSize;
  className?: string;
}) => {
  const box =
    size === "nav"
      ? "h-11 w-9"
      : size === "md"
        ? "h-16 w-14"
        : size === "lg"
          ? "h-28 w-[5.5rem]"
          : "h-48 w-[9.5rem] md:h-60 md:w-48";

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        box,
        className
      )}
    >
      <img
        src={CACTUS_LOGO}
        alt="Cactus Jack Records"
        className="cactus-logo-img h-full w-full object-contain object-center"
      />
    </span>
  );
};

const TRACKS = [
  {
    n: "01",
    title: "HIGHEST IN THE ROOM",
    feat: "Travis Scott",
    url: "https://open.spotify.com/track/0pDTaUbMDyBqWWWVssHIBx",
  },
  {
    n: "02",
    title: "JACKBOYS",
    feat: "Gunna, Sheck Wes, Don Toliver, Lil Keed & Travis Scott",
    url: "https://open.spotify.com/track/4BHSjbYylfOH5WAGusDyny",
  },
  {
    n: "03",
    title: "GANG GANG",
    feat: "Sheck Wes, Don Toliver, Luxury Tax 50 & Travis Scott",
    url: "https://open.spotify.com/track/2wOXxtHZkV3pZOWXmDFjZ3",
  },
  {
    n: "04",
    title: "HAD ENOUGH",
    feat: "Don Toliver feat. Quavo & Offset",
    url: "https://open.spotify.com/track/6g6W3pMAFbp2FS2sqTYwhQ",
  },
  {
    n: "05",
    title: "OUT WEST",
    feat: "JACKBOYS & Young Thug",
    url: "https://open.spotify.com/track/4MoB6YrseVF9gXQa6afOf8",
  },
  {
    n: "06",
    title: "WHAT TO DO?",
    feat: "Don Toliver",
    url: "https://open.spotify.com/track/4MoB6YrseVF9gXQa6afOf8",
  },
  {
    n: "07",
    title: "GATTI",
    feat: "Pop Smoke, Travis Scott, Dababy & Rosalía",
    url: "https://open.spotify.com/track/2wOXxtHZkV3pZOWXmDFjZ3",
  },
] as const;

const CREW = [
  { name: "TRAVIS SCOTT", role: "CACTUS JACK", image: "/profPics/travisPFP.webp", },
  { name: "SHECK WES", role: "MOB", image: "/profPics/sheckPFP.webp", },
  { name: "DON TOLIVER", role: "HEAVEN", image: "/profPics/donPFP.webp", },
  { name: "GUNNA", role: "WUNNA", image: "/profPics/gunnaPFP.webp", },
  { name: "POP SMOKE", role: "LEGEND", image: "/profPics/popPFP.webp", },
  { name: "YOUNG THUG", role: "SLIME", image: "/profPics/youngPFP.webp", },
  { name: "LIL KEED", role: "SLIME", image: "/profPics/keedPFP.webp", },
] as const;

const ARTIFACTS = [
  {
    id: "CJ-001",
    title: "JACKBOYS",
    tag: "ALBUM · 2019",
    image: ALBUM_COVER,
    objectPosition: "center",
    span: "md:col-span-2",
  },
  {
    id: "CJ-002",
    title: "SICK OF IT ALL",
    tag: "RAW MOTION",
    image: SICK_PHOTO,
    objectPosition: "center",
    span: "md:col-span-1",
  },
  {
    id: "CJ-003",
    title: "NEON MASKS",
    tag: "THE LOT",
    image: MASK_PHOTO,
    objectPosition: "center 25%",
    span: "md:col-span-1",
  },
  {
    id: "CJ-004",
    title: "ASPHALT BURN",
    tag: "STREET UNIT",
    image: CAR_PHOTO,
    objectPosition: "center 40%",
    span: "md:col-span-2",
  },
] as const;

function VizBars() {
  const heights = [40, 70, 55, 90, 35, 80, 60, 95, 45, 75, 50, 85];
  return (
    <motion.div className="flex items-end gap-[3px] h-8" aria-hidden>
      {heights.map((h, i) => (
        <div
          key={i}
          className="viz-bar w-[3px] origin-bottom"
          style={{
            height: `${h}%`,
            animationDelay: `${i * 0.07}s`,
            animationDuration: `${0.5 + (i % 4) * 0.15}s`,
          }}
        />
      ))}
    </motion.div>
  );
}

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  const links = ["THE LOT", "TRACKLIST", "THE CREW", "ARTIFACTS"];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] px-4 md:px-10 py-5 flex items-center justify-between transition-all duration-500",
        scrolled
          ? "bg-forest/95 backdrop-blur-md border-b border-neon/10 py-3"
          : "bg-transparent"
      )}
    >
      <a href="#" className="flex items-center gap-3 group shrink-0">
        <CactusLogo size="nav" className="group-hover:drop-shadow-[0_0_12px_rgba(164,255,0,0.5)] transition-[filter]" />
        <motion.div className="leading-none hidden sm:block">
          <span className="font-mono text-[8px] text-mustard tracking-[0.4em] block">
            CACTUS JACK
          </span>
          <span className="font-display text-xl tracking-wide text-paper">
            JACKBOYS
          </span>
        </motion.div>
      </a>

      <div className="hidden md:flex items-center gap-8">
        {links.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/ /g, "-")}`}
            className="font-mono text-[9px] font-medium uppercase tracking-[0.25em] text-paper/45 hover:text-neon transition-colors"
          >
            {item}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-4 shrink-0">
        <div className="hidden lg:flex items-center gap-2 font-mono text-[8px] text-paper/30 tracking-widest">
          <span className="rec-dot" />
          REC
        </div>
        <a
          href={SPOTIFY_ALBUM}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 bg-neon text-black px-5 py-2.5 font-display text-sm tracking-wide hover:bg-paper transition-colors"
        >
          STREAM <ArrowRight size={14} />
        </a>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 text-paper"
          aria-label="Menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-forest z-[110] p-10 flex flex-col justify-center gap-8 md:hidden"
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-6 right-6 p-2"
            aria-label="Close"
          >
            <X size={28} />
          </button>
          {links.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(/ /g, "-")}`}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="font-display text-5xl uppercase tracking-tight hover:text-neon transition-colors"
            >
              {item}
            </motion.a>
          ))}
          <a
            href={SPOTIFY_ALBUM}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 bg-neon text-black py-5 text-center font-display text-lg tracking-wide"
          >
            STREAM ALBUM
          </a>
        </motion.div>
      )}
    </nav>
  );
};

const Hero = () => {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  return (
    <section
      ref={ref}
      className="relative min-h-[110vh] flex items-center justify-center overflow-hidden border-b border-neon/10"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={ALBUM_COVER}
          alt="JACKBOYS album cover"
          className="cover-grade h-full w-full object-cover object-center"
        />
        <div className="hero-cover-gradient absolute inset-0 z-10" />
        <motion.div className="absolute inset-0 bg-neon/5 mix-blend-soft-light z-10" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-20 w-full max-w-6xl mx-auto px-6 text-center pt-28"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <CactusLogo size="hero" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-10"
        >
          <span className="parental-badge px-3 py-1 text-[8px] font-bold">
            EXPLICIT
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-mustard border border-mustard/40 px-4 py-1.5">
            Cactus Jack Records
          </span>
          <span className="font-mono text-[9px] text-paper/40 tracking-[0.3em]">
            DEC 27 · 2019
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(4rem,18vw,14rem)] leading-[0.82] uppercase tracking-tight text-paper glitch-hover"
        >
          JACK
          <span className="text-glow-neon text-neon">BOYS</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-[10px] md:text-xs uppercase tracking-[0.45em] text-paper/50 mt-6 max-w-lg mx-auto leading-relaxed"
        >
          Compilation · 7 tracks · Houston garage energy · masks on · engines loud
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          <a
            href={SPOTIFY_ALBUM}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center gap-3 w-full sm:w-auto bg-neon text-black px-12 py-5 font-display text-lg tracking-wide hover:bg-mustard hover:text-paper transition-all"
          >
            <Disc3 size={20} className="group-hover:rotate-180 transition-transform duration-700" />
            PLAY ALBUM
          </a>
          <a
            href="#tracklist"
            className="flex items-center justify-center gap-2 w-full sm:w-auto border border-paper/20 px-10 py-5 font-mono text-[10px] uppercase tracking-[0.3em] hover:border-neon hover:text-neon transition-colors"
          >
            <Play size={14} fill="currentColor" /> Full tracklist
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-14 flex flex-col items-center gap-3"
        >
          <VizBars />
          <span className="font-mono text-[8px] text-paper/25 tracking-[0.4em]">
            NOW SPINNING — SIDE A
          </span>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-6 md:left-12 z-20 font-mono text-[8px] text-paper/25 tracking-[0.35em] uppercase"
        style={{ opacity }}
      >
        TC: 00:21:04
      </motion.div>
      <motion.div
        className="absolute bottom-8 right-6 md:right-12 z-20 flex gap-6"
        style={{ opacity }}
      >
        <Instagram size={18} className="text-paper/20 hover:text-neon transition-colors cursor-pointer" />
        <Twitter size={18} className="text-paper/20 hover:text-neon transition-colors cursor-pointer" />
      </motion.div>
    </section>
  );
};

const LotSection = () => (
  <section id="the-lot" className="py-32 md:py-40 px-6 md:px-12 bg-forest relative">
    <motion.div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative aspect-[4/5] overflow-hidden border border-paper/10"
      >
        <img
          src={PHOTO_MOTION}
          alt="Travis Scott — raw motion"
          className="photo-grade h-full w-full object-cover object-center hover:scale-105 transition-transform duration-[3s]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/30 to-burnt/25" />
        <span className="absolute bottom-4 left-4 font-mono text-[8px] text-neon/60 tracking-[0.5em]">
          HOUSTON · THE LOT
        </span>
        <div className="absolute top-4 right-4 parental-badge px-2 py-0.5 text-[7px] bg-black/80">
          CJ
        </div>
      </motion.div>

      <div className="space-y-10">
        <div>
          <span className="font-mono text-[9px] text-mustard tracking-[0.5em] uppercase block mb-4">
            [ 001 · MANIFESTO ]
          </span>
          <motion.h2
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-5xl md:text-7xl lg:text-8xl uppercase leading-[0.85] tracking-tight"
          >
            THE GARAGE
            <br />
            <span className="text-stroke-neon">IS HOME.</span>
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="font-mono text-sm text-paper/55 leading-relaxed uppercase tracking-tight max-w-md"
        >
          Travis Scott&apos;s first Cactus Jack compilation — raw, masked, and built for the lot.
          Seven tracks. One brotherhood. Out West to Gatti. This is the sound before the world caught up.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap gap-6 font-mono text-[9px] tracking-widest text-paper/35 uppercase"
        >
          <span>Genre: Hip-Hop</span>
          <span>·</span>
          <span>Label: Cactus Jack</span>
          <span>·</span>
          <span>Length: 21:04</span>
        </motion.div>
      </div>
    </div>
  </section>
);

const Tracklist = () => (
  <section id="tracklist" className="py-32 md:py-40 px-6 md:px-12 bg-night relative overflow-hidden">
    <div className="absolute inset-0 opacity-[0.04] pointer-events-none font-display text-[30vw] leading-none text-lavender select-none overflow-hidden whitespace-nowrap top-20">
      GANG GANG OUT WEST GATTI
    </div>

    <div className="max-w-5xl mx-auto relative z-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-paper/10">
        <div>
          <span className="font-mono text-[9px] text-neon tracking-[0.4em] uppercase">
            Side A — Compilation
          </span>
          <h2 className="font-display text-6xl md:text-8xl uppercase mt-2 tracking-tight">
            Tracklist
          </h2>
        </div>
        <div className="font-mono text-[9px] text-paper/35 uppercase tracking-widest text-right">
          <p>7 tracks</p>
          <p className="text-mustard mt-1">JACKBOYS · 2019</p>
        </div>
      </div>

      <ol className="space-y-1">
        {TRACKS.map((track, idx) => (
          <motion.li
            key={track.n}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
          >
            <a
              href={track.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col md:flex-row md:items-center gap-4 md:gap-0 justify-between py-6 px-4 md:px-6 border border-transparent hover:border-neon/25 hover:bg-neon/5 transition-all duration-300"
            >
              <div className="flex items-start md:items-center gap-6 md:gap-10 min-w-0">
                <span className="font-mono text-sm text-mustard group-hover:text-neon transition-colors shrink-0">
                  {track.n}
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-2xl md:text-3xl uppercase tracking-tight group-hover:text-neon transition-colors truncate md:whitespace-normal">
                    {track.title}
                  </h3>
                  <p className="font-mono text-[9px] text-paper/40 mt-1 uppercase tracking-wide">
                    {track.feat}
                  </p>
                </div>
              </div>
              <motion.div className="flex items-center gap-4 shrink-0 md:ml-4">
                <span className="hidden md:block font-mono text-[8px] text-paper/20 group-hover:text-neon/50 tracking-widest uppercase">
                  Spotify →
                </span>
                <div className="w-11 h-11 border border-paper/15 flex items-center justify-center group-hover:border-neon group-hover:bg-neon group-hover:text-black transition-all">
                  <Play size={16} fill="currentColor" />
                </div>
              </motion.div>
            </a>
          </motion.li>
        ))}
      </ol>

      <div className="mt-16 text-center">
        <a
          href={SPOTIFY_ALBUM}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 border-2 border-neon text-neon px-10 py-4 font-display text-lg tracking-wide hover:bg-neon hover:text-black transition-all"
        >
          OPEN ON SPOTIFY <ExternalLink size={18} />
        </a>
      </div>
    </div>
  </section>
);

const CrewSection = () => (
  <section id="the-crew" className="py-32 px-6 md:px-12 bg-forest border-y border-paper/5">
    <motion.div className="max-w-7xl mx-auto">
      <span className="font-mono text-[9px] text-mustard tracking-[0.5em] uppercase">
        [ 002 · ROSTER ]
      </span>
      <h2 className="font-display text-5xl md:text-7xl uppercase mt-3 mb-10 tracking-tight">
        The <span className="text-neon">Crew</span>
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative mb-16 aspect-[21/9] md:aspect-[2.4/1] overflow-hidden border border-paper/10"
      >
        <img
          src={PHOTO_CREW}
          alt="JACKBOYS crew"
          className="photo-grade h-full w-full object-cover object-center"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = ALBUM_COVER;
            e.currentTarget.style.objectPosition = "center 35%";
          }}
        />
        <motion.div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/20 to-transparent" />
        <span className="absolute bottom-4 left-4 font-mono text-[8px] text-neon tracking-[0.5em]">
          FLASH · THE GANG
        </span>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {CREW.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="tape-edge border border-paper/10 p-3 md:p-4 hover:border-neon/40 transition-colors group overflow-hidden"
          >
            <div className="aspect-square w-full mb-4 overflow-hidden border border-paper/10">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
            </div>

            <span className="font-mono text-[7px] text-mustard tracking-[0.3em] block mb-3">
              {member.role}
            </span>

            <p className="font-display text-sm md:text-base uppercase leading-tight group-hover:text-neon transition-colors">
              {member.name}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const Artifacts = () => (
  <section id="artifacts" className="py-32 md:py-40 px-6 md:px-12 bg-forest">
    <div className="max-w-7xl mx-auto">
      <div className="mb-20">
        <span className="font-mono text-[9px] text-neon tracking-[0.4em] uppercase">
          Secured files
        </span>
        <h2 className="font-display text-6xl md:text-[10vw] uppercase leading-none mt-2 tracking-tight">
          Artifacts
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {ARTIFACTS.map((item, idx) => (
          <motion.article
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "relative h-[420px] md:h-[560px] overflow-hidden group border border-paper/5",
              item.span
            )}
          >
            <img
              src={item.image}
              alt={item.title}
              style={{ objectPosition: item.objectPosition }}
              className="photo-grade w-full h-full object-cover brightness-[0.7] contrast-110 group-hover:brightness-90 transition-all duration-[2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/40 to-transparent" />
            <div className="absolute inset-0 bg-neon/0 group-hover:bg-neon/5 transition-colors duration-700" />
            <span className="absolute top-5 left-5 font-mono text-[8px] text-paper/40 tracking-[0.4em]">
              {item.id}
            </span>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="font-mono text-[8px] text-mustard uppercase tracking-widest">
                {item.tag}
              </span>
              <h3 className="font-display text-3xl md:text-4xl uppercase mt-1 tracking-tight">
                {item.title}
              </h3>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);
const Marquee = () => {
  const text = "GANG GANG · OUT WEST · HIGHEST IN THE ROOM · GATTI ·";

  const content = Array.from({ length: 10 }).map((_, i) => (
    <span
      key={i}
      className="font-display text-5xl md:text-7xl uppercase px-12 tracking-tight"
    >
      {text}
    </span>
  ));

  return (
    <section className="py-16 bg-neon text-forest overflow-hidden border-y-4 border-forest">
      <div className="marquee">
        <div className="marquee-track">
          <div className="marquee-content">{content}</div>
          <div className="marquee-content" aria-hidden="true">
            {content}
          </div>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Origin", value: "Houston, TX", sub: "CACTUS JACK HQ" },
    { label: "Release", value: "Dec 27, 2019", sub: "COMPILATION" },
    { label: "Tracks", value: "07", sub: "SIDE A COMPLETE" },
    { label: "Energy", value: "MAX", sub: "GARAGE MODE" },
  ];
  return (
    <section className="py-24 px-6 md:px-12 bg-night">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="border-l-2 border-mustard/50 pl-6"
          >
            <p className="font-mono text-[8px] uppercase tracking-[0.35em] text-paper/35">
              {s.label}
            </p>
            <p className="font-display text-2xl md:text-3xl uppercase mt-2 tracking-tight">
              {s.value}
            </p>
            <p className="font-mono text-[8px] text-mustard mt-2 tracking-widest uppercase">
              {s.sub}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Quote = () => (
  <section className="py-28 px-6 md:px-12 bg-forest relative overflow-hidden">
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-purple/20 via-transparent to-mustard/10" />
    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <span className="font-mono text-[9px] text-lavender tracking-[0.5em] uppercase">
        Press log
      </span>
      <motion.blockquote
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-5xl uppercase leading-[1.1] mt-8 tracking-tight"
      >
        &ldquo;Not a playlist — a{" "}
        <span className="text-neon">takeover</span> from the garage.&rdquo;
      </motion.blockquote>
      <p className="font-mono text-[9px] text-paper/35 mt-10 tracking-[0.3em] uppercase">
        — The Lot, Houston
      </p>
    </div>
  </section>
);

const FooterCTA = () => (
  <section className="py-32 px-6 md:px-12 relative overflow-hidden border-t border-paper/10">
    <div className="absolute inset-0">
      <img
        src={ALBUM_COVER}
        alt=""
        className="cover-grade h-full w-full object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-forest/90" />
      <div className="absolute inset-0 bg-gradient-to-t from-lavender/15 to-transparent" />
    </div>

    <div className="max-w-4xl mx-auto text-center relative z-10">
      <CactusLogo size="lg" className="mx-auto mb-8" />
      <h2 className="font-display text-5xl md:text-8xl uppercase tracking-tight leading-[0.9]">
        Enter the
        <br />
        <span className="text-glow-neon text-neon">Garage.</span>
      </h2>
      <p className="font-mono text-xs text-paper/45 mt-8 uppercase tracking-[0.25em] max-w-md mx-auto">
        Stream the original compilation. All gas. No brakes.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
        <a
          href={SPOTIFY_ALBUM}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-neon text-black px-12 py-5 font-display text-lg tracking-wide hover:bg-mustard hover:text-paper transition-colors"
        >
          Stream JACKBOYS
        </a>
        <a
          href="https://www.travisscott.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-paper/25 px-12 py-5 font-mono text-[10px] uppercase tracking-[0.25em] hover:border-neon transition-colors"
        >
          Cactus Jack →
        </a>
      </div>

      <footer className="mt-24 pt-12 border-t border-paper/10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-3">
          <CactusLogo size="md" />
          <span className="font-display text-xl uppercase tracking-wide">
            Cactus Jack
          </span>
        </div>
        <div className="flex gap-8 font-mono text-[8px] uppercase tracking-widest text-paper/30">
          <a href="#" className="hover:text-neon transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-neon transition-colors">
            Contact
          </a>
        </div>
        <p className="font-mono text-[8px] text-mustard tracking-widest uppercase">
          Fan tribute · Not affiliated
        </p>
      </footer>
    </div>
  </section>
);

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="grain min-h-screen bg-forest text-paper overflow-x-hidden">
      <div className="vhs-overlay" aria-hidden />
      <div className="vhs-chrome" aria-hidden />

      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-neon z-[120] origin-left"
        style={{ scaleX }}
      />

      <Navbar />
      <Hero />
      <LotSection />
      <Tracklist />
      <CrewSection />
      <Artifacts />
      <Marquee />
      <Stats />
      <Quote />
      <FooterCTA />
    </main>
  );
}
