"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { ScrollTrigger } from "gsap/ScrollTrigger"

import ElasticSlider from "../events/ElasticSlider"
import bgImage from "../assets/board/bg.png"
import ram from "../assets/board/ram.png"
import anubhav from "../assets/board/anubhav.png"
import aditya from "../assets/board/aditya.png"
import akshit from "../assets/board/akshit.png"
import ansh from "../assets/board/ansh.png"
import arjun from "../assets/board/arjun.png"
import arya from "../assets/board/arya.png"
import dhriti from "../assets/board/dhriti.png"
import gouri from "../assets/board/gouri.png"
import krish from "../assets/board/krish.png"
import varun from "../assets/board/varun.png"
import parth from "../assets/board/parth.png"
import medhansh from "../assets/board/medhansh.png"

gsap.registerPlugin(Draggable, ScrollTrigger)

const TeamCard = ({ name, position, photo, linkedin }) => {
  return (
    <div className="relative w-[265px] h-[280px] shadow-2xl overflow-hidden flex flex-col justify-between items-center">
      <img
        src={bgImage || "/placeholder.svg"}
        alt="card-bg"
        className="absolute w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
        <div className="flex flex-col items-center space-y-1 text-center">
          <div className="text-yellow-400 text-3xl font-caveat leading-tight">{name}</div>
          <div className="text-black text-sm" style={{ fontFamily: "Special Elite" }}>{position}</div>
        </div>
        <div className="w-[240px] h-[240px] flex items-center justify-center relative">
          <img src={photo} alt={name} className="w-[240px] h-[240px] object-contain" />
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-6 right-1 z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-black-600 hover:text-black-800 transition-colors"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 
                5v14c0 2.76 2.24 5 
                5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 
                19h-3v-10h3v10zm-1.5-11.29c-.96 
                0-1.75-.79-1.75-1.75s.79-1.75 
                1.75-1.75 1.75.79 1.75 
                1.75-.79 1.75-1.75 
                1.75zm13.5 11.29h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 
                0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 
                1.38-1.54 2.84-1.54 3.04 
                0 3.6 2 3.6 4.59v5.59z"/>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

const MobileBoard = () => {
  const scrollerRef = useRef(null)  
  const pinRef = useRef(null)      
  const tlRef = useRef(null)
  const [sliderValue, setSliderValue] = useState(0)
  const [maxScroll, setMaxScroll] = useState(1000)

  const allCards = [
    { name: "Ram Krishna", position: "Chairperson", photo: ram, linkedin: "https://www.linkedin.com/in/ramkrishna2967/" },
    { name: "Anubhav Batra", position: "Vice Chairperson", photo: anubhav, linkedin: "https://www.linkedin.com/in/anubhav-batra-9ba7271b1/" },
    { name: "Aditya Verma", position: "Secretary", photo: aditya, linkedin: "https://www.linkedin.com/in/adityaverma121/" },
    { name: "Arjun Bector", position: "Co-secretary", photo: arjun, linkedin: "https://www.linkedin.com/in/arjun-bector/" },
    { name: "Ansh Mehta", position: "Technical Head", photo: ansh, linkedin: "https://www.linkedin.com/in/anshmehta/" },
    { name: "Akshit Anand", position: "Projects Head", photo: akshit, linkedin: "https://www.linkedin.com/in/akshit-anand-10a90b219/" },
    { name: "Dhriti Sharma", position: "Events Head", photo: dhriti, linkedin: "https://www.linkedin.com/in/dhriti-sharma-b03014275/" },
    { name: "Varun Shirsath", position: "PNM Head", photo: varun, linkedin: "https://www.linkedin.com/in/varun-shirsath-50403534b/" },
    { name: "Parth Jadhav", position: "Design Head", photo: parth, linkedin: "https://www.linkedin.com/in/parthjadhav2004/" },
    { name: "Gouri Kanade", position: "RND Head", photo: gouri, linkedin: "https://www.linkedin.com/in/gourikanade1012/" },
    { name: "Medhansh Jain", position: "Web Lead", photo: medhansh, linkedin: "https://www.linkedin.com/in/medhansh-jain/" },
    { name: "Krish Mehta", position: "App Lead", photo: krish, linkedin: "https://www.linkedin.com/in/krish1604/" },
    { name: "Arya Patil", position: "IOT Lead", photo: arya, linkedin: "https://www.linkedin.com/in/arya-patil-2a8366330/" },
  ]

  const cardPairs = []
  for (let i = 0; i < allCards.length; i += 2) {
    cardPairs.push({
      first: allCards[i],
      second: i + 1 < allCards.length ? allCards[i + 1] : null,
    })
  }

useEffect(() => {
  const scroller = scrollerRef.current
  const pin = pinRef.current
  if (!scroller || !pin) return

  const setupAnimation = () => {
    if (tlRef.current) {
      tlRef.current.scrollTrigger?.kill()
      tlRef.current.kill()
      tlRef.current = null
    }

    const totalScroll = scroller.scrollWidth - window.innerWidth
    if (totalScroll <= 0) return

    setMaxScroll(totalScroll)
gsap.set(scroller, { x: 0 })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${totalScroll*2}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const newVal = self.progress * totalScroll
          setSliderValue(prev => 
            Math.abs(prev - newVal) > 1 ? newVal : prev
          )
        },
      },
    })

    tl.fromTo(scroller, { x: 0 }, { x: -totalScroll, ease: "none" })

    tlRef.current = tl
  }

  setupAnimation()
  ScrollTrigger.refresh()

  const handleResize = () => {
    setupAnimation()
    ScrollTrigger.refresh()
  }

  window.addEventListener("resize", handleResize)
  window.addEventListener("orientationchange", handleResize)

  return () => {
    tlRef.current?.scrollTrigger?.kill()
    tlRef.current?.kill()
    tlRef.current = null
    window.removeEventListener("resize", handleResize)
    window.removeEventListener("orientationchange", handleResize)
  }
}, [])

const handleSliderChange = (val) => {
  setSliderValue(val)

  requestAnimationFrame(() => {
    const tl = tlRef.current
    if (tl && tl.scrollTrigger) {
      const progress = Math.min(1, Math.max(0, val / maxScroll))

      if (tl.scrollTrigger.scroll) {
        tl.scrollTrigger.scroll(
          progress * (tl.scrollTrigger.end - tl.scrollTrigger.start) + tl.scrollTrigger.start
        )
      }
    }
  })
}


  return (
    <div ref={pinRef} className="relative w-full bg-black">
      <div
        ref={scrollerRef}
        className="flex items-center gap-12 h-screen pl-8 pr-8 select-none"
      >
        <div className="flex-shrink-0 flex items-center justify-center w-6">
          <div className="text-yellow-400 text-6xl font-extrabold uppercase tracking-wider transform -rotate-90 whitespace-nowrap">
            THE BOARD
          </div>
        </div>
        {cardPairs.map((pair, index) => (
          <div key={index} className="flex flex-col gap-8 flex-shrink-0">
            <TeamCard {...pair.first} />
            {pair.second && <TeamCard {...pair.second} />}
          </div>
        ))}
      </div>

      {/* popup slider */}
      <div className="absolute left-1/2 bottom-[1%] transform -translate-x-1/2 rounded-2xl p-5 z-50 w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] block lg:hidden">
        <ElasticSlider
          leftIcon={
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </span>
          }
          rightIcon={
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </span>
          }
          //defaultValue={sliderValue}
          maxValue={maxScroll}
          isStepped
          stepSize={10}
          value={sliderValue}
          onChange={handleSliderChange}
        />
      </div>
    </div>
  )
}

export default MobileBoard
