"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import bgImage from "./bg.png"

const BoardGrid = () => {
  const [componentOffsetTop, setComponentOffsetTop] = useState(0)
  const [isTablet, setIsTablet] = useState(false)

  const r1c2Ref = useRef(null)
  const r1c4Ref = useRef(null)
  const r2c3Ref = useRef(null)
  const r3c2Ref = useRef(null)
  const componentRef = useRef(null)

  useEffect(() => {
    const checkScreenSize = () => {
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
      }
    }
    updateComponentOffset()
    window.addEventListener("resize", updateComponentOffset)
    const timeout = setTimeout(updateComponentOffset, 100)
    return () => {
      window.removeEventListener("resize", updateComponentOffset)
      clearTimeout(timeout)
    }
  }, [])

  const getResponsiveValues = useCallback(() => {
    const baseMultiplier = isTablet ? 0.8 : 1
    const translateMultiplier = isTablet ? 0.85 : 1
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
  }, [isTablet, componentOffsetTop])

  const animateCards = useCallback(() => {
    const currentScrollY = window.scrollY
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
  }, [getResponsiveValues, componentOffsetTop])

  useEffect(() => {
    requestAnimationFrame(animateCards)
  }, [animateCards])

  const cardClass =
    "relative w-full aspect-square bg-gray-900 overflow-hidden shadow-2xl flex items-center justify-center font-bold text-lg sm:text-xl md:text-2xl max-w-[320px]"

  return (
    <div
      ref={componentRef}
      className="hidden md:flex min-h-[200vh] bg-black flex-col items-center justify-center py-6 sm:py-8 md:py-10 overflow-x-hidden"
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

          <div className="col-span-full board-date text-yellow-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold py-2 sm:py-3 md:py-4 uppercase text-left">
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
