"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import bgImage from "./bg.png"

const BoardGrid = () => {
  const [scrollYState, setScrollYState] = useState(0)
  const [r1c2Settled, setR1c2Settled] = useState(false)
  const [r1c4Settled, setR1c4Settled] = useState(false)
  const [r2c3Settled, setR2c3Settled] = useState(false)
  const [r3c2Settled, setR3c2Settled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [mobileScrollProgress, setMobileScrollProgress] = useState(0)
  const [allCardsCycled, setAllCardsCycled] = useState(false)

  const r1c2Ref = useRef(null)
  const r1c4Ref = useRef(null)
  const r2c3Ref = useRef(null)
  const r3c2Ref = useRef(null)
  const mobileContainerRef = useRef(null)
  const lastScrollY = useRef(0)
  const accumulatedScroll = useRef(0)
  const handleTouchStart = useRef(null)

  // --- responsive sizing ---
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  // --- scroll animation ---
  const getResponsiveValues = useCallback(() => {
    const baseMultiplier = isMobile ? 0.6 : isTablet ? 0.8 : 1
    const translateMultiplier = isMobile ? 0.7 : isTablet ? 0.85 : 1
    return {
      r1c2: {
        startOffset: -200 * translateMultiplier,
        settlePoint: 200 * baseMultiplier,
      },
      r1c4: {
        startScrollPoint: 250 * baseMultiplier,
        endScrollPoint: 650 * baseMultiplier,
        maxTranslate: 445 * translateMultiplier,
      },
      r2c3: {
        startScrollPoint: 700 * baseMultiplier,
        endScrollPoint: 950 * baseMultiplier,
        maxTranslate: 445 * translateMultiplier,
      },
      r3c2: {
        startScrollPoint: 1000 * baseMultiplier,
        endScrollPoint: 1300 * baseMultiplier,
        maxTranslate: 320 * translateMultiplier,
      },
    }
  }, [isMobile, isTablet])

  const animateCards = useCallback(() => {
    const currentScrollY = window.scrollY
    if (isMobile) {
      requestAnimationFrame(animateCards)
      return
    }

    const values = getResponsiveValues()

    if (r1c2Ref.current) {
      const { startOffset, settlePoint } = values.r1c2
      let translateY = startOffset
      if (currentScrollY >= settlePoint) {
        translateY = 0
      } else if (currentScrollY > 0) {
        const progress = currentScrollY / settlePoint
        translateY = startOffset * (1 - progress)
      }
      r1c2Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    if (r1c4Ref.current) {
      const { startScrollPoint, endScrollPoint, maxTranslate } = values.r1c4
      let translateY = 0
      if (currentScrollY >= endScrollPoint) {
        translateY = maxTranslate
      } else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r1c4Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    if (r2c3Ref.current) {
      const { startScrollPoint, endScrollPoint, maxTranslate } = values.r2c3
      let translateY = 0
      if (currentScrollY >= endScrollPoint) {
        translateY = maxTranslate
      } else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r2c3Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    if (r3c2Ref.current) {
      const { startScrollPoint, endScrollPoint, maxTranslate } = values.r3c2
      let translateY = 0
      if (currentScrollY >= endScrollPoint) {
        translateY = maxTranslate
      } else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r3c2Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    requestAnimationFrame(animateCards)
  }, [getResponsiveValues, isMobile])

  useEffect(() => {
    requestAnimationFrame(animateCards)
    const handleScroll = () => {
      setScrollYState(window.scrollY)
      lastScrollY.current = window.scrollY
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [animateCards])

  // --- Card CSS class ---
  const cardClass =
    "relative w-[320px] h-[320px] bg-gray-900 overflow-hidden shadow-2xl flex items-center justify-center font-bold text-2xl"

  // --- Card data ---
  const allCards = Array.from({ length: 15 }, (_, i) => `Demo Name ${i + 1}`)

  // --- MOBILE ---
  if (isMobile) {
    const cardPairs = []
    for (let i = 0; i < allCards.length; i += 2) {
      cardPairs.push({
        first: allCards[i],
        second: i + 1 < allCards.length ? allCards[i + 1] : null,
      })
    }
    const totalWidth = cardPairs.length * 280
    const loopedX = -((mobileScrollProgress / 100) * totalWidth) % totalWidth

    return (
      <div className="bg-black min-h-screen flex">
        <div className="flex-1 flex items-center justify-start pl-4 overflow-hidden">
          <div
            ref={mobileContainerRef}
            className="flex gap-16 transition-transform duration-200 ease-out"
            style={{ transform: `translateX(${loopedX}px)` }}
          >
            <div className="flex items-center justify-center w-6 flex-shrink-0 pr-6 ml-4">
              <div className="text-yellow-400 text-5xl font-extrabold uppercase tracking-wider transform -rotate-90 whitespace-nowrap">
                THE BOARD 25–26
              </div>
            </div>
            {[...cardPairs, ...cardPairs].map((pair, index) => (
              <div key={index} className="flex flex-col gap-12 flex-shrink-0">
                <div className="relative w-[265px] h-[300px] bg-white flex items-center justify-center font-bold text-2xl overflow-hidden shadow-2xl">
                  <div className="absolute w-full h-full">
                    <img src={bgImage} alt="card" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 text-white text-center px-4">{pair.first}</div>
                </div>
                {pair.second && (
                  <div className="relative w-[265px] h-[300px] bg-white flex items-center justify-center font-bold text-2xl overflow-hidden shadow-2xl">
                    <div className="absolute w-full h-full">
                      <img src={bgImage} alt="card" className="w-full h-full object-cover" />
                    </div>
                    <div className="relative z-10 text-white text-center px-4">{pair.second}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // --- DESKTOP GRID ---
  return (
    <div className="min-h-[200vh] bg-black flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 overflow-x-hidden">
      <div className="h-[10vh] sm:h-[15vh] md:h-[20vh]" />
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8" style={{ minHeight: "140vh" }}>
        <div className="grid grid-cols-[repeat(4,320px)] gap-6 justify-center">
          <div className={cardClass}>
            <img src={bgImage} alt="card" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
          <div ref={r1c2Ref} className={cardClass} style={{ willChange: "transform" }}>
            <img src={bgImage} alt="card" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
          <div className={`${cardClass} md:flex`}>
            <img src={bgImage} alt="card" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
          <div ref={r1c4Ref} className={`${cardClass} lg:flex`} style={{ zIndex: 30, willChange: "transform" }}>
            <img src={bgImage} alt="card" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
          <div className="col-span-4 text-yellow-400 text-6xl font-extrabold uppercase py-4">THE BOARD</div>
          <div className={cardClass}>
            <img src={bgImage} alt="card" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
          <div ref={r2c3Ref} className={`${cardClass} md:flex`} style={{ zIndex: 20, willChange: "transform" }}>
            <img src={bgImage} alt="card" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
          <div className="col-span-4 text-yellow-400 text-6xl font-extrabold uppercase py-4">25–26</div>
          <div ref={r3c2Ref} className={cardClass} style={{ zIndex: 20, willChange: "transform" }}>
            <img src={bgImage} alt="card" className="absolute w-full h-full object-cover" />
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
        </div>
      </div>
      <div className="h-[30vh] sm:h-[40vh] md:h-[54vh]" />
    </div>
  )
}

export default BoardGrid
