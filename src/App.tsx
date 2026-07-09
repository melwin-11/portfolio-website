import { useMemo, useRef, useState } from "react"
import { ImageTrail } from "@/components/ImageTrail"
import { MacOSDock, type DockApp } from "@/components/ui/mac-os-dock"
import { AboutWindow } from "@/components/AboutWindow"

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const [isHoveringName, setIsHoveringName] = useState(false)
  const [openApps, setOpenApps] = useState<string[]>(["finder", "safari"])
  const [isAboutOpen, setIsAboutOpen] = useState(false)

  const dockApps: DockApp[] = [
    {
      id: "finder",
      name: "Finder",
      icon: "https://cdn.jim-nielsen.com/macos/1024/finder-2021-09-10.png?rf=1024",
    },
    {
      id: "safari",
      name: "Safari",
      icon: "https://cdn.jim-nielsen.com/macos/1024/safari-2021-06-02.png?rf=1024",
    },
    {
      id: "notes",
      name: "Notes",
      icon: "https://cdn.jim-nielsen.com/macos/1024/notes-2021-05-25.png?rf=1024",
    },
    {
      id: "github",
      name: "GitHub",
      icon: "https://cdn.jim-nielsen.com/macos/1024/github-desktop-2021-05-20.png?rf=1024",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png",
      className: "rounded-[22%] p-[8%]",
    },
    {
      id: "leetcode",
      name: "LeetCode",
      icon: "https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png",
      className: "rounded-[26%] p-[12%] bg-white shadow-md scale-[0.78]",
    },
  ]

  const handleAppClick = (appId: string) => {
    if (appId === "notes") {
      setIsAboutOpen((prev) => !prev)
      setOpenApps((prev) =>
        prev.includes("notes") ? prev.filter((id) => id !== "notes") : [...prev, "notes"]
      )
    } else if (appId === "github") {
      setOpenApps((prev) =>
        prev.includes("github") ? prev.filter((id) => id !== "github") : [...prev, "github"]
      )
      window.open("https://github.com/melwin-11", "_blank", "noopener,noreferrer")
    } else if (appId === "linkedin") {
      setOpenApps((prev) =>
        prev.includes("linkedin") ? prev.filter((id) => id !== "linkedin") : [...prev, "linkedin"]
      )
      window.open("https://www.linkedin.com/in/melwin-robinson/", "_blank", "noopener,noreferrer")
    } else if (appId === "leetcode") {
      setOpenApps((prev) =>
        prev.includes("leetcode") ? prev.filter((id) => id !== "leetcode") : [...prev, "leetcode"]
      )
      window.open("https://leetcode.com/u/melwinrobinson_11/", "_blank", "noopener,noreferrer")
    } else {
      setOpenApps((prev) =>
        prev.includes(appId) ? prev.filter((id) => id !== appId) : [...prev, appId]
      )
    }
  }

  const handleCloseAbout = () => {
    setIsAboutOpen(false)
    setOpenApps((prev) => prev.filter((id) => id !== "notes"))
  }

  // Curated list of images with custom sizes and shadows to create an organic, tactile feel
  const trailItems = [
    {
      src: "/melwin-robinson-portrait-1.png",
      alt: "Portrait cutout of Melwin Robinson for his software engineering portfolio",
      className: "w-32 md:w-44 h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)]",
    },
    {
      src: "/chrome-3d-star-decoration.png",
      alt: "Chrome 3D star graphic used in Melwin Robinson's interactive portfolio",
      className: "w-20 md:w-28 h-auto drop-shadow-[0_8px_10px_rgba(0,0,0,0.12)] rotate-12",
    },
    {
      src: "/melwin-robinson-portrait-2.png",
      alt: "Creative portrait of Melwin Robinson, software engineer and web developer",
      className: "w-36 md:w-52 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] -rotate-6",
    },
    {
      src: "/retro-ipod-classic.png",
      alt: "Retro iPod Classic graphic in the portfolio image trail",
      className: "w-24 md:w-32 h-auto drop-shadow-[0_8px_12px_rgba(0,0,0,0.1)] rotate-6",
    },
    {
      src: "/melwin-robinson-portrait-3.png",
      alt: "Melwin Robinson portrait representing software engineering and creative development",
      className: "w-28 md:w-40 h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] rotate-3",
    },
    {
      src: "/vintage-basf-cassette-tape.jpg",
      alt: "Vintage BASF cassette tape graphic for a retro portfolio visual style",
      className: "w-28 md:w-36 h-auto rounded border border-white/10 shadow-md -rotate-12",
    },
    {
      src: "/melwin-robinson-portrait-4.png",
      alt: "Melwin Robinson full stack developer portrait cutout",
      className: "w-40 md:w-56 h-auto drop-shadow-[0_15px_25px_rgba(0,0,0,0.2)] rotate-6",
    },
    {
      src: "/j-cole-portrait-cutout.png",
      alt: "J. Cole portrait cutout used as a music-inspired portfolio visual",
      className: "w-36 md:w-48 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.15)] -rotate-3",
    },
    {
      src: "/melwin-robinson-portrait-5.png",
      alt: "Melwin Robinson web developer portrait in the interactive image trail",
      className: "w-32 md:w-44 h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.15)] rotate-12",
    },
    {
      src: "/melwin-robinson-portrait-6.png",
      alt: "Melwin Robinson portfolio portrait for social and personal branding",
      className: "w-36 md:w-48 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.18)] -rotate-12",
    },
    {
      src: "/pixel-art-globe-internet-icon.png",
      alt: "Pixel art globe internet icon representing web development",
      className: "w-20 md:w-28 h-auto drop-shadow-[0_8px_12px_rgba(0,0,0,0.14)] rotate-6",
    },
    {
      src: "/meme-cat-la-cap-glasses-cutout.png",
      alt: "Meme cat wearing an LA cap and glasses as a playful portfolio sticker",
      className: "w-28 md:w-40 h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.18)] -rotate-6",
    },
    {
      src: "/cute-spiderman-cartoon-sticker.png",
      alt: "Cute Spider-Man cartoon sticker used as the site favicon and image trail graphic",
      className: "w-28 md:w-40 h-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.18)] rotate-12",
    },
    {
      src: "/retro-flip-phone-text-message.png",
      alt: "Retro flip phone with a text message for a nostalgic web aesthetic",
      className: "w-24 md:w-36 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.2)] -rotate-12",
    },
    {
      src: "/retro-notepad-destiny-quote.png",
      alt: "Retro notepad window with the quote destiny can be changed only in the present",
      className: "w-28 md:w-40 h-auto rounded border border-white/10 shadow-md rotate-3",
    },
    {
      src: "/pixel-retro-computer-monitor-icon.png",
      alt: "Pixel art retro computer monitor icon representing computing and development",
      className: "w-20 md:w-28 h-auto drop-shadow-[0_8px_12px_rgba(0,0,0,0.14)] -rotate-3",
    },
  ]

  const randomizedTrailItems = useMemo(
    () =>
      Array.from(
        { length: trailItems.length * 8 },
        () => trailItems[Math.floor(Math.random() * trailItems.length)]
      ),
    []
  )

  const pathname = window.location.pathname
  const isHomePath = pathname === "/" || pathname === "/index.html"

  if (!isHomePath) {
    return <NotFoundPage requestedPath={pathname} />
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen bg-black text-white overflow-hidden flex flex-col justify-center items-center select-none font-sans"
    >
      {/* Image Trail container - behind the name text (z-10) */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <ImageTrail
          containerRef={containerRef}
          targetRef={nameRef}
          interval={120}
          rotationRange={20}
          disableSpawn={isHoveringName}
        >
          {randomizedTrailItems.map((item, index) => (
            <div key={index} className="flex relative items-center justify-center pointer-events-none">
              <img
                src={item.src}
                alt={item.alt}
                className={`${item.className} object-contain`}
                draggable={false}
              />
            </div>
          ))}
        </ImageTrail>
      </div>

      {/* Main name in the center (z-20) */}
      <div
        ref={nameRef}
        className="relative z-20 flex flex-col justify-center items-center text-center cursor-default"
        onMouseEnter={() => setIsHoveringName(true)}
        onMouseLeave={() => setIsHoveringName(false)}
      >
        <h1 className="font-display text-[22vw] sm:text-[18vw] md:text-[14vw] leading-[0.75] tracking-tighter text-white select-none uppercase">
          MELWIN
          <br />
          ROBINSON
        </h1>
      </div>

      {/* MacOS Dock floating at the bottom */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
        <MacOSDock apps={dockApps} onAppClick={handleAppClick} openApps={openApps} />
      </div>

      {/* About Me Popup Window */}
      <AboutWindow isOpen={isAboutOpen} onClose={handleCloseAbout} />
    </div>
  )
}

interface NotFoundPageProps {
  requestedPath: string
}

function NotFoundPage({ requestedPath }: NotFoundPageProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white select-none font-sans">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />
      <img
        src="/cute-spiderman-cartoon-sticker.png"
        alt="Cute Spider-Man sticker marking a missing portfolio page"
        className="absolute right-6 top-8 w-24 rotate-12 drop-shadow-[0_16px_24px_rgba(255,44,55,0.28)] sm:right-12 sm:top-12 sm:w-36 md:w-44"
        draggable={false}
      />

      <section className="relative z-10 flex min-h-screen flex-col justify-center px-6 py-16 sm:px-10 md:px-16">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-white/55">
          {requestedPath}
        </p>
        <h1 className="font-display text-[22vw] uppercase leading-[0.78] tracking-normal text-white sm:text-[16vw] md:text-[12vw]">
          Page
          <br />
          Not Found
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-white/68 sm:text-lg">
          This part of Melwin Robinson's portfolio does not exist. Head back to the main page.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex w-fit items-center rounded-full border border-white/20 bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/70"
        >
          Back to home
        </a>
      </section>
    </main>
  )
}
