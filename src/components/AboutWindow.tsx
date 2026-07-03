import React from "react"
import { motion, AnimatePresence } from "framer-motion"

interface AboutWindowProps {
  isOpen: boolean
  onClose: () => void
}

export const AboutWindow: React.FC<AboutWindowProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-40 p-4 pointer-events-none">
          {/* Smooth Backdrop Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-xs pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Window Container */}
          <motion.div
            className="relative w-full max-w-lg md:max-w-2xl bg-neutral-900/90 text-white rounded-xl border border-white/10 shadow-2xl overflow-hidden pointer-events-auto backdrop-blur-md"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.12 }}
          >
            {/* macOS Window Header */}
            <div className="h-10 flex items-center px-4 justify-between border-b border-white/10 select-none bg-neutral-950/80">
              {/* Window Controls */}
              <div className="flex gap-2 items-center">
                <button
                  onClick={onClose}
                  className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] hover:brightness-90 flex items-center justify-center text-[9px] text-black/50 group"
                  aria-label="Close"
                >
                  <span className="opacity-0 group-hover:opacity-100 font-bold leading-none">-</span>
                </button>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
              </div>

              {/* Title */}
              <span className="text-xs font-semibold text-neutral-400 tracking-wide">
                About Me — Notes
              </span>

              {/* Spacer for centering layout */}
              <div className="w-12" />
            </div>

            {/* Window Content */}
            <div className="p-4 md:p-6 flex items-center justify-center max-h-[75vh] overflow-y-auto bg-neutral-900">
              <img
                src="/Photos/about%20me.png"
                alt="About Me"
                className="max-w-full h-auto rounded-lg shadow-lg select-none pointer-events-none"
                draggable={false}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
