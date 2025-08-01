import { useState, useEffect, useRef, useCallback } from "react"
import bgImage from './bg.png';

const BoardGrid = () => {
  const [scrollYState, setScrollYState] = useState(0)
  const [r1c2Settled, setR1c2Settled] = useState(false)
  const [r1c4Settled, setR1c4Settled] = useState(false)
  const [r2c3Settled, setR2c3Settled] = useState(false)
  const [r3c2Settled, setR3c2Settled] = useState(false) 

  const r1c2Ref = useRef(null)
  const r1c4Ref = useRef(null)
  const r2c3Ref = useRef(null)
  const r3c2Ref = useRef(null) 

  const animateCards = useCallback(() => {
    const currentScrollY = window.scrollY

   
    if (r1c2Ref.current) {
      const startOffset = -200
      const settlePoint = 200
      let translateY = startOffset

      if (currentScrollY >= settlePoint) {
        translateY = 0
      } else if (currentScrollY > 0) {
        const progress = currentScrollY / settlePoint
        translateY = startOffset * (1 - progress)
      }
      r1c2Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    // R1C4 Animation
    if (r1c4Ref.current) {
      const startScrollPoint = 250
      const endScrollPoint = 650
      const maxTranslate = 445

      let translateY = 0
      if (currentScrollY >= endScrollPoint) {
        translateY = maxTranslate
      } else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r1c4Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    // R2C3 Animation
    if (r2c3Ref.current) {
      const startScrollPoint = 700
      const endScrollPoint = 950
      const maxTranslate = 445

      let translateY = 0
      if (currentScrollY >= endScrollPoint) {
        translateY = maxTranslate
      } else if (currentScrollY > startScrollPoint) {
        const progress = (currentScrollY - startScrollPoint) / (endScrollPoint - startScrollPoint)
        translateY = maxTranslate * progress
      }
      r2c3Ref.current.style.transform = `translate3d(0, ${translateY}px, 0)`
    }

    // R3C2 Animation (New)
    if (r3c2Ref.current) {
      
      const startScrollPoint = 1000
      const endScrollPoint = 1300
      const maxTranslate = 320 

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
  }, [])

  useEffect(() => {
    requestAnimationFrame(animateCards)

    const handleScroll = () => {
      setScrollYState(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [animateCards])

  useEffect(() => {
    // R1C2 settled state
    if (scrollYState >= 200 && !r1c2Settled) {
      setR1c2Settled(true)
    } else if (scrollYState < 200 && r1c2Settled) {
      setR1c2Settled(false)
    }

    // R1C4 settled state
    if (scrollYState >= 650 && !r1c4Settled) {
      setR1c4Settled(true)
    } else if (scrollYState < 650 && r1c4Settled) {
      setR1c4Settled(false)
    }

    // R2C3 settled state
    if (scrollYState >= 950 && !r2c3Settled) {
      setR2c3Settled(true)
    } else if (scrollYState < 950 && r2c3Settled) {
      setR2c3Settled(false)
    }

    
    if (scrollYState >= 1300 && !r3c2Settled) {
      setR3c2Settled(true)
    } else if (scrollYState < 1300 && r3c2Settled) {
      setR3c2Settled(false)
    }
  }, [scrollYState, r1c2Settled, r1c4Settled, r2c3Settled, r3c2Settled])

  const cardClass = "relative w-[289px] h-[289px] bg-white flex items-center justify-center font-bold text-3xl md:text-5xl"

  return (
    <div className="min-h-[200vh] bg-black flex flex-col items-center justify-center py-10 overflow-x-hidden">
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

          {/* R2C3 - Will move to R3C3 */}
          <div
            ref={r2c3Ref}
            className={cardClass}
            style={{ zIndex: 20, willChange: "transform" }} // Hint to browser for optimization
          >
            <div className="absolute w-full h-full">
              <img src={bgImage} alt="card" className="w-full h-full object-cover" />
            </div>
            <div className="relative z-10 text-white text-center">Demo Name</div>
          </div>


          {/* Date */}
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

          {/* R3C2 - Will move to R4C2 (New Animated Card) */}
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

          {/* Row 4 (New Row) */}
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
