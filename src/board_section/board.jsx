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
  const [componentOffsetTop, setComponentOffsetTop] = useState(0)
  const [mobileAnimationProgress, setMobileAnimationProgress] = useState(0)
  const [isInMobileBoardSection, setIsInMobileBoardSection] = useState(false)
  const [isHoveringCards, setIsHoveringCards] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [horizontalProgress, setHorizontalProgress] = useState(0)

  const r1c2Ref = useRef(null)
  const r1c4Ref = useRef(null)
  const r2c3Ref = useRef(null)
  const r3c2Ref = useRef(null)
  const mobileContainerRef = useRef(null)
  const componentRef = useRef(null)
  const lastScrollY = useRef(0)
  const scrollBlocked = useRef(false)
  const scrollDirection = useRef(0)
  const accumulatedScroll = useRef(0)
  const mobileScrollStart = useRef(0)
  const accumulatedScrollDelta = useRef(0)
  const stickyStartPosition = useRef(0)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  useEffect(() => {
    const updateComponentOffset = () => {
      if (componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect()
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop
        setComponentOffsetTop(rect.top + scrollTop)

        if (isMobile) {
          mobileScrollStart.current = rect.top + scrollTop
        }
      }
    }

    updateComponentOffset()
    window.addEventListener("resize", updateComponentOffset)

    const timeout = setTimeout(updateComponentOffset, 100)

    return () => {
      window.removeEventListener("resize", updateComponentOffset)
      clearTimeout(timeout)
    }
  }, [isMobile])

useEffect(() => {
  if (!isMobile) return

  const speed = 0.5
  let touchStartY = 0

  const lastProgressRef = { current: 0 }           // 0..100
  const stickyRef = { current: false }
  const pinnedOnceRef = { current: false }

  const maxFor = () => window.innerHeight * 1.5

  const setSticky = (v) => {
    stickyRef.current = v
    setIsSticky(v)
    if (!v) pinnedOnceRef.current = false
  }

  const setProgFromAccum = (acc, max) => {
    const clamped = Math.max(0, Math.min(acc, max))
    if (clamped !== accumulatedScrollDelta.current) accumulatedScrollDelta.current = clamped
    const p = (clamped / max) * 100
    setHorizontalProgress(p)
    setMobileAnimationProgress(p)
    return p
  }

  const pinAtStartOnce = () => {
    if (!pinnedOnceRef.current) {
      window.scrollTo(0, mobileScrollStart.current)
      pinnedOnceRef.current = true
    }
  }

  const enterStickyFromBoundary = () => {
    if (!stickyRef.current) {
      setSticky(true)
      const max = maxFor()
      const acc = (lastProgressRef.current / 100) * max
      setProgFromAccum(acc, max)
      pinAtStartOnce()
    }
  }

  const releaseIfEdge = (progress) => {
    if (progress <= 0 || progress >= 100) {
      lastProgressRef.current = progress
      setSticky(false)
    }
  }

  const onScroll = () => {
    const y = window.scrollY
    const start = mobileScrollStart.current

    if (y < start - 1) {
      if (stickyRef.current) setSticky(false)
      const max = maxFor()
      setProgFromAccum((lastProgressRef.current / 100) * max, max)
      return
    }

    if (Math.abs(y - start) <= 1) {
      enterStickyFromBoundary()
      return
    }
  }

  const onWheel = (e) => {
    if (!stickyRef.current) return
    const max = maxFor()
    const p = setProgFromAccum(accumulatedScrollDelta.current + e.deltaY * speed, max)
    if (p > 0 && p < 100) {
      e.preventDefault()
      pinAtStartOnce()
    } else {
      releaseIfEdge(p)
    }
  }

  const onTouchStart = (e) => {
    touchStartY = e.touches[0].clientY
  }

  const onTouchMove = (e) => {
    if (!stickyRef.current) return
    const max = maxFor()
    const dy = touchStartY - e.touches[0].clientY
    touchStartY = e.touches[0].clientY
    const p = setProgFromAccum(accumulatedScrollDelta.current + dy * speed, max)
    if (p > 0 && p < 100) {
      e.preventDefault()
      pinAtStartOnce()
    } else {
      releaseIfEdge(p)
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true })
  window.addEventListener("wheel", onWheel, { passive: false })
  window.addEventListener("touchstart", onTouchStart, { passive: true })
  window.addEventListener("touchmove", onTouchMove, { passive: false })

  return () => {
    window.removeEventListener("scroll", onScroll)
    window.removeEventListener("wheel", onWheel)
    window.removeEventListener("touchstart", onTouchStart)
    window.removeEventListener("touchmove", onTouchMove)
  }
}, [isMobile])

  const getResponsiveValues = useCallback(() => {
    const baseMultiplier = isMobile ? 0.6 : isTablet ? 0.8 : 1
    const translateMultiplier = isMobile ? 0.7 : isTablet ? 0.85 : 1

    return {
      r1c2: {
        startOffset: -200 * translateMultiplier,
        settlePoint: componentOffsetTop + 200 * baseMultiplier,
      },
      r1c4: {
        startScrollPoint: componentOffsetTop + 250 * baseMultiplier,
        endScrollPoint: componentOffsetTop + 600 * baseMultiplier,
        maxTranslate: 425 * translateMultiplier,
      },
      r2c3: {
        startScrollPoint: componentOffsetTop + 700 * baseMultiplier,
        endScrollPoint: componentOffsetTop + 950 * baseMultiplier,
        maxTranslate: 425 * translateMultiplier,
      },
      r3c2: {
        startScrollPoint: componentOffsetTop + 1000 * baseMultiplier,
        endScrollPoint: componentOffsetTop + 1300 * baseMultiplier,
        maxTranslate: 309 * translateMultiplier,
      },
    }
  }, [isMobile, isTablet, componentOffsetTop])

  const animateCards = useCallback(() => {
    const currentScrollY = window.scrollY

    if (isMobile) {
      requestAnimationFrame(animateCards)
      return
    }

    const values = getResponsiveValues()

    const componentStart = componentOffsetTop - 500
    const componentEnd = componentOffsetTop + 2000

    if (currentScrollY < componentStart || currentScrollY > componentEnd) {
      requestAnimationFrame(animateCards)
      return
    }

    if (r1c2Ref.current) {
      const { startOffset, settlePoint } = values.r1c2
      let translateY = startOffset

      if (currentScrollY >= settlePoint) {
        translateY = 0
      } else if (currentScrollY > componentOffsetTop) {
        const progress = (currentScrollY - componentOffsetTop) / (settlePoint - componentOffsetTop)
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
  }, [getResponsiveValues, isMobile, componentOffsetTop])

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

  useEffect(() => {
    const values = getResponsiveValues()

    if (scrollYState >= values.r1c2.settlePoint && !r1c2Settled) {
      setR1c2Settled(true)
    } else if (scrollYState < values.r1c2.settlePoint && r1c2Settled) {
      setR1c2Settled(false)
    }

    if (scrollYState >= values.r1c4.endScrollPoint && !r1c4Settled) {
      setR1c4Settled(true)
    } else if (scrollYState < values.r1c4.endScrollPoint && r1c4Settled) {
      setR1c4Settled(false)
    }

    if (scrollYState >= values.r2c3.endScrollPoint && !r2c3Settled) {
      setR2c3Settled(true)
    } else if (scrollYState < values.r2c3.endScrollPoint && r2c3Settled) {
      setR2c3Settled(false)
    }

    if (scrollYState >= values.r3c2.endScrollPoint && !r3c2Settled) {
      setR3c2Settled(true)
    } else if (scrollYState < values.r3c2.endScrollPoint && r3c2Settled) {
      setR3c2Settled(false)
    }
  }, [scrollYState, r1c2Settled, r1c4Settled, r2c3Settled, r3c2Settled, getResponsiveValues])

  const cardClass =
    "relative w-full aspect-square bg-gray-900 overflow-hidden shadow-2xl flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl max-w-[320px]"

  const allCards = [
    "Demo Name 1",
    "Demo Name 2",
    "Demo Name 3",
    "Demo Name 4",
    "Demo Name 5",
    "Demo Name 6",
    "Demo Name 7",
    "Demo Name 8",
    "Demo Name 9",
    "Demo Name 10",
    "Demo Name 11",
    "Demo Name 12",
    "Demo Name 13",
    "Demo Name 14",
    "Demo Name 15",
  ]

  const createCardPairs = () => {
    const pairs = []
    for (let i = 0; i < allCards.length; i += 2) {
      pairs.push({
        first: allCards[i],
        second: i + 1 < allCards.length ? allCards[i + 1] : null,
      })
    }
    return pairs
  }

  if (isMobile) {
    const cardPairs = createCardPairs()
    const cardWidth = 265
    const gapWidth = 32
    const pairWidth = cardWidth + gapWidth
    const totalWidth = cardPairs.length * pairWidth
    const textWidth = 80

    const maxTranslate = totalWidth + textWidth - window.innerWidth + 100
    const normalizedProgress = horizontalProgress / 100
    const translateX = -normalizedProgress * maxTranslate

    return (
      
      <div ref={componentRef} className="bg-black h-[100vh] flex relative">
        <div
          className={`flex-1 flex items-center justify-start overflow-hidden ${isSticky ? "fixed top-0 left-0 right-0" : ""} h-screen`}
        >
          <div
            ref={mobileContainerRef}
            
            className="flex gap-8 ease-out will-change-transform"
            style={{
              transform: `translateX(${translateX}px)`,
            }}
            onMouseEnter={() => setIsHoveringCards(true)}
            onMouseLeave={() => setIsHoveringCards(false)}
            onTouchStart={() => setIsHoveringCards(true)}
            onTouchEnd={() => setTimeout(() => setIsHoveringCards(false), 100)}
          >
            <div className="flex items-center justify-center w-[80px] flex-shrink-0 ml-2">
              <div className="text-yellow-400 text-3xl md:text-4xl font-extrabold uppercase tracking-wider transform -rotate-90 whitespace-nowrap">
                THE BOARD 25–26
              </div>
            </div>

            {cardPairs.map((pair, index) => (
              <div key={index} className="flex flex-col gap-8 flex-shrink-0">
                <div className="relative w-[265px] h-[300px] bg-white flex items-center justify-center font-bold text-2xl overflow-hidden shadow-2xl rounded-lg">
                  <div className="absolute w-full h-full">
                    <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10 text-white text-center px-4">{pair.first}</div>
                </div>

                {pair.second && (
                  <div className="relative w-[265px] h-[300px] bg-white flex items-center justify-center font-bold text-2xl overflow-hidden shadow-2xl rounded-lg">
                    <div className="absolute w-full h-full">
                      <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
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

  return (
    <div
      ref={componentRef}
      className="min-h-[200vh] bg-black flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 overflow-x-hidden"
    >
      <div className="h-[10vh] sm:h-[15vh] md:h-[20vh]" />
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8" style={{ minHeight: "140vh" }}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 justify-items-start">
          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div ref={r1c2Ref} className={cardClass} style={{ willChange: "transform" }}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div className={`${cardClass} hidden sm:flex`}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div ref={r1c4Ref} className={`${cardClass} hidden lg:flex`} style={{ zIndex: 30, willChange: "transform" }}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div className="col-span-2 sm:col-span-3 lg:col-span-4 flex justify-start items-center text-yellow-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold py-2 sm:py-3 md:py-4 uppercase">
            THE BOARD
          </div>

          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div ref={r2c3Ref} className={`${cardClass} hidden sm:flex`} style={{ zIndex: 20, willChange: "transform" }}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div></div>

          <div className="col-span-full board-date 
    text-yellow-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
    font-extrabold py-2 sm:py-3 md:py-4 uppercase text-left">
  25–26
</div>

          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div ref={r3c2Ref} className={cardClass} style={{ zIndex: 20, willChange: "transform" }}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div className="hidden sm:block"></div>

          <div className={`${cardClass} hidden lg:flex`}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

          <div className={`${cardClass} hidden lg:flex`}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>
                  <div></div>

          <div className={`${cardClass} hidden sm:flex`}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>

  

          <div className={`${cardClass} hidden lg:flex`}>
            <div className="absolute w-full h-full">
              <img src={bgImage || "/placeholder.svg"} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center px-2">Demo Name</div>
          </div>
        </div>
      </div>
      <div className="h-[8vh] sm:h-[10vh] md:h-[15vh]" />
    </div>
  )
}

export default BoardGrid