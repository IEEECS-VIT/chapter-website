"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import bgImage from "/assets/board/bg.webp";
import linkedinIcon from "/assets/board/linkedin.svg";

// Updated imports based on 2025-26 Board and File Explorer
import raghav from "/assets/board/Raghav.webp";
import devraj from "/assets/board/devraj.webp";
import diya from "/assets/board/diya.webp";
import utkarsh from "/assets/board/Utkarsh.webp";
import kshitij from "/assets/board/kshitij.webp";
import atharv from "/assets/board/atharv.webp";
import aryan from "/assets/board/Aryan.webp";
import ani from "/assets/board/ani.webp";
import saanvi from "/assets/board/Saanvi.webp";
import jeevesh from "/assets/board/Jeevesh.webp";
import vishwa from "/assets/board/Vishwa.webp";
import samanvi from "/assets/board/samanvee.webp";
import ananya from "/assets/board/ananya.webp";


const TeamCard = ({ name, position, photo, linkedin, innerRef, extraClass = "" }) => {
  return (
    <div
      ref={innerRef}
      className={`relative w-full aspect-square overflow-hidden shadow-2xl flex items-center justify-center max-w-[320px] ${extraClass}`}
      style={{ 
        willChange: "transform",
        transform: "translate3d(0, 0, 0)"
      }}
    >
      <div className="absolute w-full h-full">
        <img src={bgImage || "/placeholder.svg"} alt="card-bg" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 flex flex-col justify-between items-center w-full h-full">
        <div className="flex flex-col items-center space-y-1 pt-4">
          <div className="text-yellow-400 text-4xl sm:text-4xl font-caveat text-center leading-none">{name}</div>
          <div
            className="text-black text-sm sm:text-base text-center px-2"
            style={{ fontFamily: "'Special Elite', cursive" }}
          >
            {position}
          </div>
        </div>
        <div className="w-[275px] h-[275px] overflow-hidden flex justify-center items-end">
          <img src={photo} alt={name} className="w-[220px] h-[200px] object-contain" />
        </div>
      </div>
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="absolute bottom-0.5 right-0.5 z-20">
          <img
          src={linkedinIcon}
          alt="LinkedIn"
          className="w-7 h-7 hover:opacity-80 transition-opacity"
        />
        </a>
      )}
    </div>
  )
}

const BoardGrid = () => {
  const [componentOffsetTop, setComponentOffsetTop] = useState(0)
  const r1c2Ref = useRef(null)
  const r1c4Ref = useRef(null)
  const r2c3Ref = useRef(null)
  const r3c2Ref = useRef(null)
  const componentRef = useRef(null)
  const boardTextRef = useRef(null)
  const dateTextRef = useRef(null)
  

  const lastScrollY = useRef(0)
  const animationFrameId = useRef(null)
  const isAnimating = useRef(false)

  const animationValues = useCallback(() => {
    return {
      r1c2: { startOffset: -200, settlePoint: componentOffsetTop + 200 },
      r1c4: { startScrollPoint: componentOffsetTop + 250, endScrollPoint: componentOffsetTop + 600, maxTranslate: 425 },
      r2c3: { startScrollPoint: componentOffsetTop + 700, endScrollPoint: componentOffsetTop + 950, maxTranslate: 425 },
      r3c2: { startScrollPoint: componentOffsetTop + 1000, endScrollPoint: componentOffsetTop + 1300, maxTranslate: 309 },
    }
  }, [componentOffsetTop])

  useEffect(() => {
    const updateComponentOffset = () => {
      if (componentRef.current) {
        const rect = componentRef.current.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        setComponentOffsetTop(rect.top + scrollTop)
      }
    }

    updateComponentOffset()
    
    //debounced resize handler
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateComponentOffset, 16) // ~60fps
    }
    
    window.addEventListener("resize", handleResize, { passive: true })
    const timeout = setTimeout(updateComponentOffset, 100)

    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeout)
      clearTimeout(resizeTimeout)
    }
  }, [])

  const easeInOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2

  const animateElements = useCallback(() => {
    if (isAnimating.current) return
    isAnimating.current = true

    const currentScrollY = window.scrollY
    
  
    if (Math.abs(currentScrollY - lastScrollY.current) < 1) {
      isAnimating.current = false
      animationFrameId.current = requestAnimationFrame(animateElements)
      return
    }
    
    lastScrollY.current = currentScrollY
    const values = animationValues()

    const viewMargin = 500
    const componentStart = componentOffsetTop - viewMargin
    const componentEnd = componentOffsetTop + 2000 + viewMargin
    
    if (currentScrollY < componentStart || currentScrollY > componentEnd) {
      isAnimating.current = false
      animationFrameId.current = requestAnimationFrame(animateElements)
      return
    }

    const animateRef = (ref, startScroll, endScroll, maxTranslate, isInitialOffset = false, startOffset = 0) => {
      if (!ref.current) return

      let progress = 0
      if (isInitialOffset) {
        progress = currentScrollY > componentOffsetTop 
          ? (currentScrollY - componentOffsetTop) / (endScroll - componentOffsetTop) 
          : 0
      } else {
        progress = (currentScrollY - startScroll) / (endScroll - startScroll)
      }

      progress = Math.min(Math.max(progress, 0), 1)
      const easedProgress = easeInOutSine(progress)

      let translateY = 0
      if (isInitialOffset) {
        translateY = currentScrollY >= endScroll ? 0 : startOffset * (1 - easedProgress)
      } else {
        translateY = currentScrollY <= startScroll ? 0 : easedProgress * maxTranslate
      }

      const transform = `translate3d(0, ${translateY}px, 0)`
      if (ref.current.style.transform !== transform) {
        ref.current.style.transform = transform
      }
    }
    
    const animateText = (ref, startScroll, duration, startX) => {
      if (!ref.current) return

      const endX = 0
      const progress = Math.min(Math.max((currentScrollY - startScroll) / duration, 0), 1)
      const easedProgress = easeInOutSine(progress)
      const currentX = startX + easedProgress * (endX - startX)
      
      const transform = `translateX(${currentX}px)`
      if (ref.current.style.transform !== transform) {
        ref.current.style.transform = transform
      }
    }
    
    // Batch DOM updates
    animateRef(r1c2Ref, 0, values.r1c2.settlePoint, 0, true, values.r1c2.startOffset)
    animateRef(r1c4Ref, values.r1c4.startScrollPoint, values.r1c4.endScrollPoint, values.r1c4.maxTranslate)
    animateRef(r2c3Ref, values.r2c3.startScrollPoint, values.r2c3.endScrollPoint, values.r2c3.maxTranslate)
    animateRef(r3c2Ref, values.r3c2.startScrollPoint, values.r3c2.endScrollPoint, values.r3c2.maxTranslate)
    
    animateText(boardTextRef, componentOffsetTop, 500, -300)
    animateText(dateTextRef, componentOffsetTop + 400, 500, -300)

    isAnimating.current = false
    animationFrameId.current = requestAnimationFrame(animateElements)
  }, [animationValues, componentOffsetTop])

  useEffect(() => {

    animationFrameId.current = requestAnimationFrame(animateElements)
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animateElements])

  useEffect(() => {
    if (boardTextRef.current) {
      boardTextRef.current.style.willChange = "transform"
      boardTextRef.current.style.transform = "translate3d(0, 0, 0)"
    }
    if (dateTextRef.current) {
      dateTextRef.current.style.willChange = "transform"
      dateTextRef.current.style.transform = "translate3d(0, 0, 0)"
    }
  }, [])

  return (
    <div ref={componentRef} className="hidden lg:flex min-h-[200vh] bg-black flex-col items-center justify-center py-10 overflow-x-hidden">
      <div className="h-[20vh]" /> 
      <div className="w-full max-w-7xl mx-auto px-8" style={{ minHeight: "140vh" }}>
        <div className="grid grid-cols-4 gap-6 justify-items-start">
          {/* Row 1 */}
          <TeamCard name="Raghav Sejpal" position="Chairperson" photo={raghav} linkedin="https://www.linkedin.com/in/raghav-sejpal/" />
          <TeamCard name="Devraj K Chandani" position="Vice Chairperson" photo={devraj} linkedin="https://www.linkedin.com/in/devraj-chandani-098438293/" innerRef={r1c2Ref} />
          <TeamCard name="Diya Aravind" position="Secretary" photo={diya} linkedin="https://www.linkedin.com/in/diya-aravind-760462290/" />
          <TeamCard name="Utkarsh Kashyap" position="Co Secretary" photo={utkarsh} linkedin="https://www.linkedin.com/in/utkarsh-kashyap-041931285/" innerRef={r1c4Ref} />
          
          {/* Row 2: Text */}
          <div ref={boardTextRef} className="col-span-4 flex justify-start items-center text-yellow-400 text-6xl font-extrabold py-4 uppercase" style={{ fontFamily: "'Gloock', serif" }}>THE BOARD</div>
          
          {/* Row 3 */}
          <TeamCard name="Aryan Jain" position="Technical Head" photo={aryan} linkedin="https://www.linkedin.com/in/jainaryan04/" />
          <TeamCard name="Aniruddha Neema" position="Projects Head" photo={ani} linkedin="https://www.linkedin.com/in/aniruddhaneema/" />
          <TeamCard name="P Vishwajith" position="AI/ML Lead" photo={vishwa} linkedin="https://www.linkedin.com/in/vishwajith-p/" innerRef={r2c3Ref} />
          

          {/* Row 4: Date */}
          <div ref={dateTextRef} className="col-span-full board-date text-yellow-400 text-6xl font-extrabold py-4 uppercase text-left" style={{ fontFamily: "'Gloock', serif" }}>25–26</div>
          
          {/* Row 5 */}
          <TeamCard name="Atharv Gupta" position="Publicity & Marketing Head" photo={atharv} linkedin="https://www.linkedin.com/in/atharv-gupta-037005245/" />
          <TeamCard name="Kshitij Vankar" position="Events Head" photo={kshitij} linkedin="https://www.linkedin.com/in/kshitijvankar/" innerRef={r3c2Ref} />
          <div></div>
          <TeamCard name="Saanvi Goel" position="Design Head" photo={saanvi} linkedin="https://www.linkedin.com/in/saanvi-goel17777/" />

          {/* Row 6 */}
          <TeamCard name="Jeevesh Malhotra" position="App Lead" photo={jeevesh} linkedin="https://www.linkedin.com/in/jeeveshmalhotra/" />
          <div></div>
          <TeamCard name="Samanvi Rajput" position="Technical Community Lead" photo={samanvi} linkedin="https://www.linkedin.com/in/samanvi-rajput-5b90b3279/" />
          <TeamCard name="Ananya Deo" position="Editorial Lead" photo={ananya} linkedin="https://www.linkedin.com/in/ananya-deo-774713298/" />
          <div></div>
          <div></div>
        </div>
      </div>
      <div className="h-[15vh]" />
    </div>
  )
}

export default BoardGrid