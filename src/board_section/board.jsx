"use client"

import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import bgImage from "./bg.png"

gsap.registerPlugin(ScrollTrigger)

const BoardGrid = () => {
  // ---------------- preserved state & refs ----------------
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  const componentRef = useRef(null)
  const mobileContainerRef = useRef(null)

  // desktop refs preserved
  const r1c2Ref = useRef(null)
  const r1c4Ref = useRef(null)
  const r2c3Ref = useRef(null)
  const r3c2Ref = useRef(null)

  const [componentOffsetTop, setComponentOffsetTop] = useState(0)

  // ---------------- responsive checks ----------------
  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  useEffect(() => {
    const upd = () => {
      if (!componentRef.current) return
      const rect = componentRef.current.getBoundingClientRect()
      const top = (window.pageYOffset || document.documentElement.scrollTop) + rect.top
      setComponentOffsetTop(top)
    }
    upd()
    window.addEventListener("resize", upd)
    const t = setTimeout(upd, 120)
    return () => {
      window.removeEventListener("resize", upd)
      clearTimeout(t)
    }
  }, [isMobile])

  // ---------------- desktop animation loop (unchanged) ----------------
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
    if (isMobile) {
      requestAnimationFrame(animateCards)
      return
    }
    const values = getResponsiveValues()
    const currentScrollY = window.scrollY
    const componentStart = componentOffsetTop - 500
    const componentEnd = componentOffsetTop + 2000

    if (currentScrollY < componentStart || currentScrollY > componentEnd) {
      requestAnimationFrame(animateCards)
      return
    }

    if (r1c2Ref.current) {
      const { startOffset, settlePoint } = values.r1c2
      let translateY = startOffset
      if (currentScrollY >= settlePoint) translateY = 0
      else if (currentScrollY > componentOffsetTop) {
        const progress = (currentScrollY - componentOffsetTop) / (settlePoint - componentOffsetTop)
        translateY = startOffset * (1 - progress)
      }
      r1c2Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    if (r1c4Ref.current) {
      const { startScrollPoint, endScrollPoint, maxTranslate } = values.r1c4
      let translateY = 0
      if (currentScrollY >= endScrollPoint) translateY = maxTranslate
      else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r1c4Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    if (r2c3Ref.current) {
      const { startScrollPoint, endScrollPoint, maxTranslate } = values.r2c3
      let translateY = 0
      if (currentScrollY >= endScrollPoint) translateY = maxTranslate
      else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r2c3Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    if (r3c2Ref.current) {
      const { startScrollPoint, endScrollPoint, maxTranslate } = values.r3c2
      let translateY = 0
      if (currentScrollY >= endScrollPoint) translateY = maxTranslate
      else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r3c2Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    requestAnimationFrame(animateCards)
  }, [getResponsiveValues, isMobile, componentOffsetTop])

  useEffect(() => {
    requestAnimationFrame(animateCards)
    const onScroll = () => {}
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [animateCards])

  // ---------------- robust GSAP mobile horizontal scroll ----------------
  useLayoutEffect(() => {
    // We'll create and manage tween & trigger ourselves so we can rebuild on resize/RO
    let tween = null
    let trigger = null
    let resizeObserver = null

    const setup = async () => {
      const section = componentRef.current
      const container = mobileContainerRef.current
      if (!section || !container) return

      // ensure container layout won't wrap
      container.style.display = "flex"
      container.style.flexWrap = "nowrap"

      // Wait for images inside container to load (so scrollWidth is correct)
      const imgs = Array.from(container.querySelectorAll("img"))
      const loadPromises = imgs.map((img) => {
        if (img.complete && img.naturalWidth !== 0) return Promise.resolve()
        return new Promise((resolve) => {
          const onLoad = () => {
            img.removeEventListener("load", onLoad)
            img.removeEventListener("error", onLoad)
            resolve()
          }
          img.addEventListener("load", onLoad)
          img.addEventListener("error", onLoad)
          // fallback: if image already has naturalWidth later, resolve after short delay
          setTimeout(resolve, 300)
        })
      })
      // Wait for all (with a safe timeout)
      await Promise.all(loadPromises)

      // small nextTick to ensure layout settled
      await new Promise((r) => requestAnimationFrame(r))

      // measure
      const containerWidth = Math.ceil(container.scrollWidth)
      const vw = window.innerWidth
      const buffer = 24
      const distance = Math.max(0, containerWidth - vw + buffer)

      // cleanup old instances before creating new
      if (tween) {
        tween.kill()
        tween = null
      }
      if (trigger) {
        trigger.kill()
        trigger = null
      }

      if (distance <= 0) {
        // nothing to animate
        return
      }

      // create fromTo tween driven by ScrollTrigger (scrub:true for exact mapping)
      tween = gsap.fromTo(
        container,
        { x: 0 },
        {
          x: -distance,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance + window.innerHeight}`,
            scrub: true, // exact mapping; change to 0.6 for smoothing
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              // optional: you can watch self.progress here if you need UI
            },
            onRefresh: () => {
              // no-op; invalidateOnRefresh will re-evaluate
            },
          },
        }
      )

      // store the trigger reference
      const st = tween.scrollTrigger
      if (st) trigger = st
    }

    // initial setup only on mobile viewport
    const mm = gsap.matchMedia()
    mm.add("(max-width: 767px)", () => {
      setup()

      // rebuild when container resize (cards changed or fonts loaded etc.)
      if (mobileContainerRef.current) {
        resizeObserver = new ResizeObserver(() => {
          // re-setup to recalc distance and recreate tween
          try {
            // destroy old
            if (tween) tween.kill()
            if (trigger) trigger.kill()
          } catch (e) {}
          setup()
          ScrollTrigger.refresh()
        })
        resizeObserver.observe(mobileContainerRef.current)
      }

      // also rebuild on window resize
      const onResize = () => {
        try {
          if (tween) tween.kill()
          if (trigger) trigger.kill()
        } catch (e) {}
        setup()
        ScrollTrigger.refresh()
      }
      window.addEventListener("resize", onResize)

      return () => {
        // cleanup media-query specific
        window.removeEventListener("resize", onResize)
        if (resizeObserver && mobileContainerRef.current) resizeObserver.unobserve(mobileContainerRef.current)
        if (tween) tween.kill()
        if (trigger) trigger.kill()
      }
    })

    // cleanup matchMedia when effect unmounts
    return () => {
      try {
        mm.revert()
      } catch (e) {}
      if (resizeObserver && mobileContainerRef.current) resizeObserver.unobserve(mobileContainerRef.current)
      if (tween) tween.kill()
      if (trigger) trigger.kill()
    }
  }, [isMobile])

  // ---------------- UI data + render ----------------
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
      pairs.push({ first: allCards[i], second: i + 1 < allCards.length ? allCards[i + 1] : null })
    }
    return pairs
  }

  if (isMobile) {
    const cardPairs = createCardPairs()
    return (
      <div ref={componentRef} className="bg-black h-[100vh] flex relative">
        <div className="flex-1 flex items-center justify-start overflow-hidden h-screen">
          <div
            ref={mobileContainerRef}
            className="flex gap-8 ease-out will-change-transform flex-nowrap"
            // styles managed by GSAP; touch handlers not required
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

  // desktop/tablet layout unchanged (kept long for parity)
  return (
    <div ref={componentRef} className="min-h-[200vh] bg-black flex flex-col items-center justify-center py-6 sm:py-8 md:py-10 overflow-x-hidden">
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