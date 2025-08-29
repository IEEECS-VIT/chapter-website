"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"
import bgImage from "./bg.png"
import Footer from "../footer/Contact"

gsap.registerPlugin(ScrollTrigger, Draggable)

const MobileBoard = () => {
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)

  const allCards = [
    "Demo Name 1", "Demo Name 2", "Demo Name 3", "Demo Name 4",
    "Demo Name 5", "Demo Name 6", "Demo Name 7", "Demo Name 8",
    "Demo Name 9", "Demo Name 10", "Demo Name 11", "Demo Name 12",
    "Demo Name 13", "Demo Name 14", "Demo Name 15",
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

  const cardPairs = createCardPairs()

  useEffect(() => {
    let ctx = gsap.context(() => {
      ScrollTrigger.matchMedia({
        "(max-width: 768px)": () => {
          const wrapper = wrapperRef.current
          const container = containerRef.current
          const totalWidth = container.scrollWidth
          const viewportWidth = window.innerWidth
          const scrollDistance = totalWidth - viewportWidth

          wrapper.style.height = `${container.scrollWidth / 2.4}px`

          // Scroll animation
          gsap.to(container, {
            x: -scrollDistance,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: wrapper,
              start: "top top",
              end: () => `+=${scrollDistance * 1.5}`,
              scrub: 1.1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })

          Draggable.create(container, {
            type: "x",
            inertia: true,
            bounds: { minX: -scrollDistance, maxX: 0 },
            edgeResistance: 0.9,
          })
        },
      })

      ScrollTrigger.refresh()
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      <div ref={wrapperRef} className="relative w-full overflow-hidden bg-black">
        <div
          ref={containerRef}
          className="flex items-center gap-12 h-screen pl-8 pr-8"
        >
          <div className="flex-shrink-0 flex items-center justify-center w-6">
            <div className="text-yellow-400 text-4xl font-extrabold uppercase tracking-wider transform -rotate-90 whitespace-nowrap">
              THE BOARD 25–26
            </div>
          </div>

          {cardPairs.map((pair, index) => (
            <div key={index} className="flex flex-col gap-8 flex-shrink-0">
              <div className="relative w-[265px] h-[300px] bg-white rounded-lg shadow-2xl overflow-hidden flex items-center justify-center font-bold text-xl">
                <img
                  src={bgImage || "/placeholder.svg"}
                  alt="card"
                  className="absolute w-full h-full object-cover"
                />
                <div className="relative z-10 text-white text-center px-4">
                  {pair.first}
                </div>
              </div>

              {pair.second && (
                <div className="relative w-[265px] h-[300px] bg-white rounded-lg shadow-2xl overflow-hidden flex items-center justify-center font-bold text-xl">
                  <img
                    src={bgImage || "/placeholder.svg"}
                    alt="card"
                    className="absolute w-full h-full object-cover"
                  />
                  <div className="relative z-10 text-white text-center px-4">
                    {pair.second}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <section className="normal-section">
        <Footer />
      </section>
    </div>
  )
}

export default MobileBoard
