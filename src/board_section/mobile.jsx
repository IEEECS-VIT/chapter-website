"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Draggable } from "gsap/Draggable"

import bgImage from "./assets/bg.png"
import ram from "./assets/ram.png"
import anubhav from "./assets/anubhav.png"
import aditya from "./assets/aditya.png"
import akshit from "./assets/Akshit.png"
import ansh from "./assets/ansh.png"
import arjun from "./assets/Arjun.png"
import arya from "./assets/arya.png"
import dhriti from "./assets/dhriti.png"
import gouri from "./assets/Gouri.png"
import krish from "./assets/Krish.png"
import varun from "./assets/varun.png"
import parth from "./assets/parth.png"
import medhansh from "./assets/medhansh.png"

gsap.registerPlugin(ScrollTrigger, Draggable)

const TeamCard = ({ name, position, photo, linkedin }) => {
  return (
    <div className="relative w-[265px] h-[300px] shadow-2xl overflow-hidden flex flex-col justify-between items-center">
      <img
        src={bgImage || "/placeholder.svg"}
        alt="card-bg"
        className="absolute w-full h-full object-cover"
      />
      <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
        <div className="flex flex-col items-center space-y-1 text-center">
          <div className="text-yellow-400 text-3xl font-caveat leading-tight">{name}</div>
          <div className="text-black text-sm font-karla">{position}</div>
        </div>
        <div className="w-[240px] h-[240px] flex items-center justify-center relative">
          <img
            src={photo}
            alt={name}
            className="w-[240px] h-[240px] object-contain"
          />
          {linkedin && (
            <a
              href={linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-1 right-1 z-20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-black-600 hover:text-black-800 transition-colors"
              >
                <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 
                5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.29c-.96 0-1.75-.79-1.75-1.75s.79-1.75 
                1.75-1.75 1.75.79 1.75 1.75-.79 1.75-1.75 1.75zm13.5 11.29h-3v-5.6c0-1.34-.03-3.07-1.87-3.07-1.87 
                0-2.16 1.46-2.16 2.97v5.7h-3v-10h2.88v1.36h.04c.4-.75 1.38-1.54 2.84-1.54 3.04 
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
  const wrapperRef = useRef(null)
  const containerRef = useRef(null)

  const allCards = [
    { name: "Ram Krishna", position: "Chairperson", photo: ram, linkedin: "https://www.linkedin.com/in/ramkrishna2967/" },
    { name: "Anubhav Batra", position: "Vice Chairperson", photo: anubhav, linkedin: "https://www.linkedin.com/in/anubhav-batra-9ba7271b1/" },
    { name: "Aditya Verma", position: "Secretary", photo: aditya, linkedin: "https://www.linkedin.com/in/adityaverma121/" },
    { name: "Arjun Bector", position: "Co-secretary", photo: arjun, linkedin: "https://www.linkedin.com/in/arjun-bector/" },
    { name: "Ansh Mehta", position: "Technical Head", photo: ansh, linkedin: "https://www.linkedin.com/in/anshmehta/" },
    { name: "Medhansh Jain", position: "Web Lead", photo: medhansh, linkedin: "https://www.linkedin.com/in/medhansh-jain/" },
    { name: "Krish Mehta", position: "App Lead", photo: krish, linkedin: "https://www.linkedin.com/in/krish1604/" },
    { name: "Dhriti Sharma", position: "Events Head", photo: dhriti, linkedin: "https://www.linkedin.com/in/dhriti-sharma-b03014275/" },
    { name: "Gouri Kanade", position: "RND Head", photo: gouri, linkedin: "https://www.linkedin.com/in/gourikanade1012/" },
    { name: "Parth Jadhav", position: "Design Head", photo: parth, linkedin: "https://www.linkedin.com/in/parthjadhav2004/" },
    { name: "Varun Sharith", position: "PNM Head", photo: varun, linkedin: "https://www.linkedin.com/in/varun-shirsath-50403534b/" },
    { name: "Arya", position: "IOT Lead", photo: arya, linkedin: "https://www.linkedin.com/in/arya-patil-2a8366330/" },
    { name: "Akshit Anand", position: "Projects Head", photo: akshit, linkedin: "https://www.linkedin.com/in/akshit-anand-10a90b219/" },
  ]

  const cardPairs = []
  for (let i = 0; i < allCards.length; i += 2) {
    cardPairs.push({
      first: allCards[i],
      second: i + 1 < allCards.length ? allCards[i + 1] : null,
    })
  }

  useEffect(() => {
    const mm = gsap.matchMedia()

    mm.add("(max-width: 768px)", () => {
      const wrapper = wrapperRef.current
      const container = containerRef.current
      if (!wrapper || !container) return

      let totalScroll = Math.max(container.scrollWidth - window.innerWidth, 0)
      wrapper.style.height = `${container.scrollWidth / 2.4}px`

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: () => `+=${totalScroll * 1.2}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      tl.fromTo(container, { x: 0 }, { x: () => -totalScroll, ease: "none" })

      const proxy = document.createElement("div")

      const syncFromProxy = function () {
        const progress = 1 - (this.x / totalScroll || 0)
        tl.progress(progress)
        const st = tl.scrollTrigger
        if (st) st.scroll(st.start + progress * (st.end - st.start))
      }

      const draggable = Draggable.create(proxy, {
        type: "x",
        trigger: container,
        inertia: true,
        bounds: { minX: 0, maxX: totalScroll },
        onPress() {
          gsap.set(proxy, { x: (1 - tl.progress()) * totalScroll })
        },
        onDrag: syncFromProxy,
        onThrowUpdate: syncFromProxy,
        onRelease: syncFromProxy,
      })[0]

      const syncProxyToScroll = () => {
        gsap.set(proxy, { x: (1 - tl.progress()) * totalScroll })
      }

      const onRefresh = () => {
        totalScroll = Math.max(container.scrollWidth - window.innerWidth, 0)
        wrapper.style.height = `${container.scrollWidth / 2.4}px`
        if (draggable && draggable.applyBounds) {
          draggable.applyBounds({ minX: 0, maxX: totalScroll })
        }
        syncProxyToScroll()
      }

      ScrollTrigger.addEventListener("scrollEnd", syncProxyToScroll)
      ScrollTrigger.addEventListener("refresh", onRefresh)
      syncProxyToScroll()

      return () => {
        ScrollTrigger.removeEventListener("scrollEnd", syncProxyToScroll)
        ScrollTrigger.removeEventListener("refresh", onRefresh)
        if (tl.scrollTrigger) tl.scrollTrigger.kill()
        tl.kill()
        if (draggable) draggable.kill()
      }
    })

    return () => mm.revert()
  }, [])

  return (
    <div>
      <div ref={wrapperRef} className="relative w-full overflow-hidden bg-black">
        <div
          ref={containerRef}
          className="flex items-center gap-12 h-screen pl-8 pr-8 cursor-grab active:cursor-grabbing select-none touch-pan-y"
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
      </div>

    </div>
  )
}

export default MobileBoard
