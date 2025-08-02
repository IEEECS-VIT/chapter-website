import { useState, useEffect, useRef, useCallback } from "react"
import bgImage from './bg.png'

const BoardGrid = () => {
  const containerRef = useRef(null)
  const r1c2Ref = useRef(null)
  const r1c4Ref = useRef(null)
  const r2c3Ref = useRef(null)
  const r3c2Ref = useRef(null)
  const animationFrameRef = useRef(null)

  const animateCards = useCallback(() => {
    if (!containerRef.current) return

    const containerRect = containerRef.current.getBoundingClientRect()
    const containerTop = containerRect.top + window.scrollY
    const currentScrollY = window.scrollY
    
    // Calculate scroll relative to when component enters viewport
    const componentStartScroll = containerTop - window.innerHeight * 0.5 // Start earlier for better sync
    const relativeScroll = Math.max(0, currentScrollY - componentStartScroll)

    // R1C2 Animation - tighter sync with scroll
    if (r1c2Ref.current) {
      const startOffset = -200
      const settlePoint = 150 // Reduced for quicker response
      let translateY = startOffset

      if (relativeScroll >= settlePoint) {
        translateY = 0
      } else if (relativeScroll > 0) {
        const progress = relativeScroll / settlePoint
        translateY = startOffset * (1 - progress)
      }
      r1c2Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    // R1C4 Animation - more responsive timing
    if (r1c4Ref.current) {
      const startScrollPoint = 200 // Start sooner
      const endScrollPoint = 500   // Reduced distance for better sync
      const maxTranslate = 445

      let translateY = 0
      if (relativeScroll >= endScrollPoint) {
        translateY = maxTranslate
      } else if (relativeScroll > startScrollPoint) {
        const progress = (relativeScroll - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r1c4Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    // R2C3 Animation - better sync
    if (r2c3Ref.current) {
      const startScrollPoint = 550  // Start right after R1C4
      const endScrollPoint = 800    // Tighter range
      const maxTranslate = 445

      let translateY = 0
      if (relativeScroll >= endScrollPoint) {
        translateY = maxTranslate
      } else if (relativeScroll > startScrollPoint) {
        const progress = (relativeScroll - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r2c3Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    // R3C2 Animation - final sync
    if (r3c2Ref.current) {
      const startScrollPoint = 850 // Start right after R2C3
      const endScrollPoint = 1100  // Tighter range for immediate response
      const maxTranslate = 320

      let translateY = 0
      if (relativeScroll >= endScrollPoint) {
        translateY = maxTranslate
      } else if (relativeScroll > startScrollPoint) {
        const progress = (relativeScroll - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r3c2Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      animationFrameRef.current = requestAnimationFrame(animateCards)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [animateCards])

  const cardClass = "relative w-[289px] h-[289px] bg-white flex items-center justify-center font-bold text-3xl md:text-5xl"

  return (
    <div 
      ref={containerRef}
      className="min-h-[200vh] bg-black flex flex-col items-center justify-center py-10 overflow-x-hidden"
    >
      <div className="h-[20vh]" />
      <div className="w-full max-w-6xl mx-auto" style={{ minHeight: "140vh" }}>
        <div className="grid grid-cols-4 gap-y-8 gap-x-10 w-full relative">
          {/* Row 1 */}
          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div
            ref={r1c2Ref}
            className={cardClass}
            style={{ willChange: "transform" }}
          >
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div
            ref={r1c4Ref}
            className={cardClass}
            style={{ zIndex: 30, willChange: "transform" }}
          >
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div className="col-span-4 flex justify-start items-center text-yellow-400 text-6xl font-extrabold py-4 uppercase">
            THE BOARD
          </div>

          {/* Row 2 */}
          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div
            ref={r2c3Ref}
            className={cardClass}
            style={{ zIndex: 20, willChange: "transform" }}
          >
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div className="col-span-4 board-date text-yellow-400 text-6xl font-extrabold py-4 uppercase">
            25–26
          </div>

          {/* Row 3 */}
          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div
            ref={r3c2Ref}
            className={cardClass}
            style={{ zIndex: 20, willChange: "transform" }}
          >
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div></div>
          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          {/* Row 4 */}
          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div></div>
          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>

          <div className={cardClass}>
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>
        </div>
      </div>
      <div className="h-[54vh]" />
    </div>
  )
}

export default BoardGrid