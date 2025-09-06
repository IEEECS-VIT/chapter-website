"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import bgImage from "/assets/board/bg.webp";
import ram from "/assets/board/ram.webp";
import anubhav from "/assets/board/anubhav.webp";
import aditya from "/assets/board/aditya.webp";
import akshit from "/assets/board/akshit.webp";
import ansh from "/assets/board/ansh.webp";
import arjun from "/assets/board/arjun.webp";
import arya from "/assets/board/arya.webp";
import dhriti from "/assets/board/dhriti.webp";
import gouri from "/assets/board/gouri.webp";
import krish from "/assets/board/krish.webp";
import varun from "/assets/board/varun.webp";
import parth from "/assets/board/parth.webp";
import medhansh from "/assets/board/medhansh.webp";
import linkedinIcon from "/assets/board/linkedin.svg";


const TeamCard = ({ name, position, photo, linkedin, innerRef, extraClass = "" }) => {
  return (
    <div
      ref={innerRef}
      className={`relative w-full aspect-square overflow-hidden shadow-2xl flex items-center justify-center max-w-[320px] ${extraClass}`}
      style={{ 
        willChange: "transform",
        transform: "translate3d(0, 0, 0)" // Force hardware acceleration
      }}
    >
      <div className="absolute w-full h-full">
        <img src={bgImage || "/placeholder.svg"} alt="card-bg" className="w-full h-full object-cover" />
      </div>
      <div className="relative z-10 flex flex-col justify-between items-center w-full h-full">
        <div className="flex flex-col items-center space-y-1">
          <div className="text-yellow-400 text-4xl sm:text-4xl font-caveat">{name}</div>
          <div
            className="text-black text-sm sm:text-base"
            style={{ fontFamily: "'Special Elite', cursive" }}
          >
            {position}
          </div>
        </div>
        <div className="w-[275px] h-[275px] overflow-hidden flex justify-center">
          <img src={photo} alt={name} className="w-[275px] h-[275px] object-contain" />
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
  
  // Track previous scroll position and animation frame
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
    
    // Debounced resize handler
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
    
    // Skip if scroll hasn't changed significantly
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
      
      // Use transform3d for better performance
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
    // Start animation loop
    animationFrameId.current = requestAnimationFrame(animateElements)
    
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [animateElements])

  // Initialize text elements with hardware acceleration
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
          <TeamCard name="Ram Krishna" position="Chairperson" photo={ram} linkedin="https://www.linkedin.com/in/ramkrishna2967/" />
          <TeamCard name="Anubhav Batra" position="Vice Chairperson" photo={anubhav} linkedin="https://www.linkedin.com/in/anubhav-batra-9ba7271b1/" innerRef={r1c2Ref} />
          <TeamCard name="Aditya Verma" position="Secretary" photo={aditya} linkedin="https://www.linkedin.com/in/adityaverma121/" />
          <TeamCard name="Arjun Bector" position="Co-secretary" photo={arjun} linkedin="https://www.linkedin.com/in/arjun-bector/" innerRef={r1c4Ref} />
          <div ref={boardTextRef} className="col-span-4 flex justify-start items-center text-yellow-400 text-6xl font-extrabold py-4 uppercase">THE BOARD</div>
          <TeamCard name="Ansh Mehta" position="Technical Head" photo={ansh} linkedin="https://www.linkedin.com/in/anshmehta/" />
          <TeamCard name="Akshit Anand" position="Projects Head" photo={akshit} linkedin="https://www.linkedin.com/in/akshit-anand-10a90b219/" />
          <TeamCard name="Dhriti Sharma" position="Events Head" photo={dhriti} linkedin="https://www.linkedin.com/in/dhriti-sharma-b03014275/" innerRef={r2c3Ref} />
          <div></div>
          <div ref={dateTextRef} className="col-span-full board-date text-yellow-400 text-6xl font-extrabold py-4 uppercase text-left">25–26</div>
          <TeamCard name="Varun Sharith" position="PnM Head" photo={varun} linkedin="https://www.linkedin.com/in/varun-shirsath-50403534b/" />
          <TeamCard name="Parth Jadhav" position="Design Head" photo={parth} linkedin="https://www.linkedin.com/in/parthjadhav2004/" innerRef={r3c2Ref} />
          <div></div>
          <TeamCard name="Gouri Kanade" position="RnD Head" photo={gouri} linkedin="https://www.linkedin.com/in/gourikanade1012/" />
          <TeamCard name="Medhansh Jain" position="Web Lead" photo={medhansh} linkedin="https://www.linkedin.com/in/medhansh-jain/" />
          <div></div>
          <TeamCard name="Krish Mehta" position="App Lead" photo={krish} linkedin="https://www.linkedin.com/in/krish1604/" />
          <TeamCard name="Arya" position="IOT Lead" photo={arya} linkedin="https://www.linkedin.com/in/arya-patil-2a8366330/" />
        </div>
      </div>
      <div className="h-[15vh]" />
    </div>
  )
}

export default BoardGrid