import React, { useState, useEffect } from "react";
import SketchfabModel from "./SketchFabModel";
import LocalModelViewer from "./LocalModelView";

const Contact = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [vw, setVw] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(max-width: 440px)");
    const handleMQ = (e) => setIsMobile(e.matches);
    setIsMobile(mq.matches);

    const handleResize = () => setVw(window.innerWidth);

    mq.addEventListener
      ? mq.addEventListener("change", handleMQ)
      : mq.addListener(handleMQ);
    window.addEventListener("resize", handleResize);

    return () => {
      mq.removeEventListener
        ? mq.removeEventListener("change", handleMQ)
        : mq.removeListener(handleMQ);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const base = Math.min(vw || 440, 440);
  const s = base / 440;

  const emblemScale = base >= 400 ? s : base >= 360 ? s * 0.92 : s * 0.78;

  const coords = {
    logo: { left: 95, top: 149, width: 251, height: 167 },
    desc: { left: 73, top: 326, width: 293, height: 131 },
    contactBox: { left: 47, top: 542, width: 237, height: 257 },
    submit: { left: 117, top: 827 },
    getInTouch: { left: 316, top: 542, width: 124, height: 70 },
    footerLinks: { left: 5, top: 908, width: 399, height: 9 },
    socialsTop: 929,
  };

  const descStyle = {
    left: coords.desc.left * s,
    top: coords.desc.top * s,
    width: coords.desc.width * s,
    height: coords.desc.height * s,
  };
  const contactBoxStyle = {
    left: coords.contactBox.left * s,
    top: coords.contactBox.top * s,
    width: coords.contactBox.width * s,
    height: coords.contactBox.height * s,
  };

  const emblemWidth = Math.round(coords.logo.width * emblemScale);
  const emblemHeight = Math.round(coords.logo.height * emblemScale);
  const originalCenterX = coords.logo.left + coords.logo.width / 2;
  const originalCenterY = coords.logo.top + coords.logo.height / 2;
  const emblemLeft = Math.round(originalCenterX * s - emblemWidth / 2);
  const emblemTop = Math.round(originalCenterY * s - emblemHeight / 2);

  const emblemRatio = emblemHeight > 0 ? emblemWidth / emblemHeight : 1;

  const extraSubmitTop = Math.round((1 - s) * 140);
  const submitStyle = {
    left: Math.round(coords.submit.left * s),
    top: Math.round(coords.submit.top * s + extraSubmitTop),
  };

  const getInTouchStyle = {
    left: Math.round(coords.getInTouch.left * s),
    top: Math.round(coords.getInTouch.top * s),
    width: Math.round(coords.getInTouch.width * s),
    height: Math.round(coords.getInTouch.height * s),
  };

  const footerLinksStyle = {
    left: Math.round(coords.footerLinks.left * s),
    top: Math.round(coords.footerLinks.top * s),
    width: Math.round(coords.footerLinks.width * s),
    height: Math.round(coords.footerLinks.height * s),
  };

  const socialsTop = Math.round(coords.socialsTop * s);

  const MobileLayout = (
    <div
      className="w-full max-w-[440px] mx-auto min-h-[100vh] relative overflow-hidden font-serif"
      style={{
        backgroundColor: "#EF9E00",
        fontFamily: "Henju, serif",
        color: "#4B3200",
      }}
    >
      <div className="relative w-full h-[172px]">
        <svg
          className="absolute -top-1 left-0 w-full  h-[172px]"
          width="440"
          height="172"
          viewBox="0 0 440 157"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -15H440V157C339.769 91.4234 131.028 79.2404 0 157V-15Z"
            fill="black"
          />
        </svg>
      </div>

      <div
        className="absolute"
        style={{
          left: "50%",
           top: emblemTop - 100,
          transform: "translateX(-50%)",
          width: emblemWidth * 1.6,
          height: emblemHeight * 1.6,
        }}
      >
        <div style={{ width: "70%", height: "60%", position: "relative" }} className="top-20 left-14">
           <LocalModelViewer />
        </div>
      </div>

      <div
        className="absolute mt-12 px-5 w-full text-center"
        style={{
          top: emblemTop + emblemHeight * 1.5,
        }}
      >
        <h1
          className="mb-[20px] font-semibold font"
          style={{
            color: "#4B3200",
            fontSize: `${28.6 * s}px`,
            letterSpacing: `${1.513 * s}px`,
            fontFamily: "henju, serif",
          }}
        >
          Contact Us
        </h1>

        <form className="flex flex-col gap-4 items-center">
          <div className="w-full max-w-[320px] text-left">
            <label
              className="block mb-2"
              style={{
                color: "#4B3200",
                fontSize: `${13 * s}px`,
                fontFamily: "henju, serif",
                letterSpacing: `${0.911 * s}px`,
              }}
            >
              Full name
            </label>
            <input
              type="text"
              placeholder="enter your name..."
              className="w-full rounded-[16px] px-2 py-2 bg-[#ECE0D0] border-none outline-none"
              style={{
                color: "#4B3200",
                fontSize: `${10.8 * s}px`,
                fontFamily: "henju, serif",
                letterSpacing: `${0.756 * s}px`,
              }}
            />
          </div>

          <div className="w-full max-w-[320px] text-left">
            <label
              className="block mb-2"
              style={{
                color: "#4B3200",
                fontSize: `${13 * s}px`,
                fontFamily: "henju, serif",
                letterSpacing: `${0.911 * s}px`,
              }}
            >
              Email address*
            </label>
            <input
              type="email"
              placeholder="enter your email address..."
              className="w-full rounded-[16px] px-2 py-2 bg-[#ECE0D0] border-none outline-none"
              style={{
                color: "#4B3200",
                fontSize: `${10.8 * s}px`,
                fontFamily: "henju, serif",
                letterSpacing: `${0.756 * s}px`,
              }}
            />
          </div>

          <div className="w-full max-w-[320px] text-left">
            <label
              className="block mb-2"
              style={{
                color: "#4B3200",
                fontSize: `${13 * s}px`,
                fontFamily: "henju, serif",
                letterSpacing: `${0.911 * s}px`,
              }}
            >
              Message
            </label>
            <input
              type="text"
              placeholder="enter your message..."
              className="w-full rounded-[16px] px-2 py-2 h-14 bg-[#ECE0D0] border-none outline-none"
              style={{
                color: "#4B3200",
                fontSize: `${10.8 * s}px`,
                fontFamily: "henju, serif",
                letterSpacing: `${0.756 * s}px`,
              }}
            />
          </div>

          <button
            className="flex justify-center items-center rounded-[33.684px] border hover:shadow-lg transition-shadow duration-200 mx-auto"
            style={{
              width: "40%",
              height: Math.max(45 * s, 22),
              padding: `${10.526 * s}px ${17.684 * s}px`,
              borderColor: "#DDB373",
              background: "black",
              color: "white",
              fontSize: `${20 * s}px`,
              fontFamily: "henju, serif",
              letterSpacing: `${0.589 * s}px`,
            }}
          >
            Submit
          </button>
        </form>
      </div>

      <div className="absolute bottom-5 left-5 flex flex-col">
         
      <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[clamp(1rem,1.2vw,1.2rem)] font-normal hover:underline"
          >
           
        <lottie-player
          src="/sd.json"
          background="transparent"
          speed="1"
          style={{ width: "60px", height: "60px", transform: "rotate(180deg)" }}
          loop
          autoplay
        ></lottie-player>

          </button>

        <h3
          className="mb-[6px]"
          style={{
            color: "black",
            fontSize: `${14.9 * s}px`,
            fontFamily: "henju, serif",
            letterSpacing: `${1.044 * s}px`,
          }}
        >
          Get in Touch
        </h3>
        <div
          style={{
            color: "black",
            fontSize: `${11.15 * s}px`,
            fontFamily: "henju, serif",
            letterSpacing: `${0.781 * s}px`,
            lineHeight: 1.4,
          }}
        >
          <p>ieeecs@vit.ac.in</p>
          <p>91 9380302937</p>
        </div>
      </div>

      <div className="absolute bottom-5 right-5 flex gap-4 items-center">
        <a
          href="https://www.instagram.com/ieeecs_vit/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-full h-full"
          >
            <path d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89" />
          </svg>
        </a>

        <a
          href="https://www.linkedin.com/company/ieee-cs-vit"
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29 24"
           fill="black"
            className="w-full h-full"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 2.838A1.84 1.84 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.84 1.84 0 0 1 21.161 23H2.838A1.84 1.84 0 0 1 1 21.161zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708zm-5.5 10.403h3.208V9.25H4.208zM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0"
            />
          </svg>
        </a>

        <a
          href="https://twitter.com/ieeecsvit"
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29 24"
            fill="black"
            className="w-full h-full"
          >
            <path d="M13.808 10.469L20.88 2h-1.676l-6.142 7.353L8.158 2H2.5l7.418 11.12L2.5 22h1.676l6.486-7.765L15.842 22H21.5zm-2.296 2.748l-.752-1.107L4.78 3.3h2.575l4.826 7.11l.751 1.107l6.273 9.242h-2.574z" />
          </svg>
        </a>

        <a
          href="https://www.youtube.com/@ieeecomputersociety-vitcha2386"
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29 24"
            fill="black"
            className="w-full h-full"
          >
            <path d="M23.5 6.507a2.8 2.8 0 0 0-.766-1.27a3.05 3.05 0 0 0-1.338-.742C19.518 4 11.994 4 11.994 4a77 77 0 0 0-9.39.47a3.16 3.16 0 0 0-1.338.76c-.37.356-.638.795-.778 1.276A29 29 0 0 0 0 12c-.012 1.841.151 3.68.488 5.494c.137.479.404.916.775 1.269s.833.608 1.341.743c1.903.494 9.39.494 9.39.494a77 77 0 0 0 9.402-.47a3.05 3.05 0 0 0 1.338-.742a2.8 2.8 0 0 0 .765-1.27A28.4 28.4 0 0 0 24 12.023a26.6 26.6 0 0 0-.5-5.517M9.602 15.424V8.577l6.26 3.424z" />
          </svg>
        </a>

        <a
          href="https://github.com/ieeecs-vit"
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="black"
            className="w-full h-full"
          >
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.082-.73.082-.73c1.205.084 1.84 1.236 1.84 1.236c1.07 1.834 2.807 1.304 3.492.997c.108-.775.418-1.305.762-1.605c-2.665-.304-5.467-1.332-5.467-5.933c0-1.31.468-2.382 1.236-3.222c-.124-.303-.536-1.523.117-3.176c0 0 1.008-.322 3.3 1.23c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.289-1.552 3.295-1.23 3.295-1.23c.656 1.653.245 2.873.12 3.176c.77.84 1.235 1.912 1.235 3.222c0 4.61-2.807 5.625-5.48 5.922c.43.37.815 1.102.815 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
        </a>

        <a
          href="https://medium.com/@IEEE_Computer_Society_VIT"
          target="_blank"
          rel="noopener noreferrer"
          className="w-6 h-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="24"
            height="24"
            fill="black"
          >
            <title>Medium</title>
            <rect width="48" height="48" fill="none" />
            <path d="M2,40.2l5.3-6.1v-21L2.6,7.8V7H15.1l10,21.2L33.9,7H46v.8l-4,3.7V36.6l4,3.6V41H28.6v-.8l4.1-4.8V16.6L22.7,41H21.4L9.8,17.1V33.9l5.3,6.3V41H2Z" />
          </svg>

        </a>

        
      </div>


    </div>
  );
  const DesktopLayout = (
    <div
      className="min-h-screen w-full flex flex-col justify-start items-center relative overflow-hidden font-serif"
      style={{
        backgroundColor: "#EF9E00",
       fontFamily: "henju, serif",
        color: "#4B3200",
      }}
    >
      <div className="absolute w-full h-[220px] z-0 overflow-hidden">
        <svg
          className="absolute top-0 left-0 w-full h-[220px]"
          viewBox="0 0 440 200"
          fill="none"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 -25H440V200C330 40 110 40 0 200V-25Z" fill="black" />
        </svg>
      </div>

      <main className="z-10 w-[90%] max-w-[90vw] mt-40 grid grid-cols-1 lg:grid-cols-2 gap-8 px-[5%] mx-auto flex-1 place-content-center">
        <div className="flex flex-col justify-center w-full">
          <h2
            className="text-[clamp(1.5rem,2vw,2.8rem)] font-semibold mb-8 text-center"
            style={{ color: "black",fontFamily: "henju, serif" }}
          >
            Contact Us
          </h2>

          <form className="flex flex-col gap-6">
            <div>
              <label
                className="block text-[clamp(0.95rem,1.1vw,1.3rem)] font-semibold mb-2"
                style={{ color: "black", fontFamily: "henju, serif" }}
              >
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                className="w-full px-4 py-2 rounded-full shadow-sm text-[clamp(0.95rem,1.05vw,1.05rem)]"
                style={{ color: "#4B3200",fontFamily: "henju, serif" }}
              />
            </div>

            <div>
              <label
                className="block text-[clamp(0.95rem,1.1vw,1.3rem)] font-semibold mb-2"
                style={{ color: "black",fontFamily: "henju, serif" }}
              >
                Email address*
              </label>
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full px-4 py-2 rounded-full shadow-sm text-[clamp(0.95rem,1.05vw,1.05rem)]"
                style={{ color: "#4B3200",fontFamily: "henju, serif", }}
              />
            </div>

            <div>
              <label
                className="block text-[clamp(0.95rem,1.1vw,1.3rem)] font-semibold mb-2"
                style={{ color: "black", fontFamily: "henju, serif", }}
              >
                Message
              </label>
              <input
                type="text"
                placeholder="Enter your message..."
                className="w-full px-4 h-14 py-2 rounded-full shadow-sm text-[clamp(0.95rem,1.05vw,1.05rem)]"
                style={{ color: "#4B3200", fontFamily: "henju, serif", }}
              />
            </div>

            <div className="flex justify-center mt-6">
              <button
                type="button"
                className="flex justify-center w-[40%] items-center rounded-full border hover:shadow-lg transition-shadow duration-200"
                style={{
                  borderColor: "#DDB373",
                  background: "black",
                  color: "white",
                  fontFamily: "henju, serif",
                  fontSize: "clamp(0.9rem,1.05vw,1.2rem)",
                  letterSpacing: "0.05em",
                  padding: "0.6em 1.4em",
                }}
              >
                <span style={{ fontWeight: "bold" , fontFamily: "henju, serif" }}>Submit</span>
              </button>
            </div>
          </form>
        </div>

<div className="flex items-center justify-center w-full h-full mb-10">
  <LocalModelViewer />
</div>
      </main>

      <footer
        className="w-full relative z-10 flex items-center justify-between mt-auto px-40 py-6"
        style={{ color: "#4B3200",fontFamily: "henju, serif",}}
      >
        <div className="flex flex-row md:flex-row items-start md:items-center gap-12">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-[clamp(1rem,1.2vw,1.2rem)] font-normal hover:underline"
          >
           
        <lottie-player
          src="/sd.json"
          background="transparent"
          speed="1"
          style={{ width: "60px", height: "60px", transform: "rotate(180deg)" }}
          loop
          autoplay
        ></lottie-player>

          </button>

          <div className="flex flex-row gap-8">
            <p className="text-[clamp(1rem,1.2vw,1.2rem)] font-henju text-black">ieeecs@vit.ac.in</p>
            <p className="text-[clamp(1rem,1.2vw,1.2rem)] font-henju text-black">+91 9380302937</p>
          </div>
        </div>

        <div className="flex items-center gap-10">
          <a
            href="https://www.instagram.com/ieeecs_vit/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="black"
            >
              {" "}
              <path
                fill="black"
                d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89"
              />{" "}
            </svg>{" "}
          </a>{" "}
          <a
            href="https://www.linkedin.com/company/ieee-cs-vit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="black"
            >
              {" "}
              <path
                fill="black"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M1 2.838A1.84 1.84 0 0 1 2.838 1H21.16A1.837 1.837 0 0 1 23 2.838V21.16A1.84 1.84 0 0 1 21.161 23H2.838A1.84 1.84 0 0 1 1 21.161zm8.708 6.55h2.979v1.496c.43-.86 1.53-1.634 3.183-1.634c3.169 0 3.92 1.713 3.92 4.856v5.822h-3.207v-5.106c0-1.79-.43-2.8-1.522-2.8c-1.515 0-2.145 1.089-2.145 2.8v5.106H9.708zm-5.5 10.403h3.208V9.25H4.208zM7.875 5.812a2.063 2.063 0 1 1-4.125 0a2.063 2.063 0 0 1 4.125 0"
              />{" "}
            </svg>{" "}
          </a>{" "}
          <a
            href="https://twitter.com/ieeecsvit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="black"
            >
              {" "}
              <path
                fill="black"
                d="M13.808 10.469L20.88 2h-1.676l-6.142 7.353L8.158 2H2.5l7.418 11.12L2.5 22h1.676l6.486-7.765L15.842 22H21.5zm-2.296 2.748l-.752-1.107L4.78 3.3h2.575l4.826 7.11l.751 1.107l6.273 9.242h-2.574z"
              />{" "}
            </svg>{" "}
          </a>{" "}
          <a
            href="https://www.youtube.com/@ieeecomputersociety-vitcha2386"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="black"
            >
              {" "}
              <g fill="none">
                {" "}
                <g clipPath="url(#akarIconsYoutubeFill0)">
                  {" "}
                  <path
                    fill="black"
                    d="M23.5 6.507a2.8 2.8 0 0 0-.766-1.27a3.05 3.05 0 0 0-1.338-.742C19.518 4 11.994 4 11.994 4a77 77 0 0 0-9.39.47a3.16 3.16 0 0 0-1.338.76c-.37.356-.638.795-.778 1.276A29 29 0 0 0 0 12c-.012 1.841.151 3.68.488 5.494c.137.479.404.916.775 1.269s.833.608 1.341.743c1.903.494 9.39.494 9.39.494a77 77 0 0 0 9.402-.47a3.05 3.05 0 0 0 1.338-.742a2.8 2.8 0 0 0 .765-1.27A28.4 28.4 0 0 0 24 12.023a26.6 26.6 0 0 0-.5-5.517M9.602 15.424V8.577l6.26 3.424z"
                  />{" "}
                </g>{" "}
                <defs>
                  {" "}
                  <clipPath id="akarIconsYoutubeFill0">
                    {" "}
                    <path fill="#fff" d="M0 0h24v24H0z" />{" "}
                  </clipPath>{" "}
                </defs>{" "}
              </g>{" "}
            </svg>{" "}
          </a>
          <a
            href="https://github.com/ieeecs-vit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="black"
            >
              <path
                fill="black"
                d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415c-.546-1.387-1.333-1.756-1.333-1.756c-1.089-.745.082-.73.082-.73c1.205.084 1.84 1.236 1.84 1.236c1.07 1.834 2.807 1.304 3.492.997c.108-.775.418-1.305.762-1.605c-2.665-.304-5.467-1.332-5.467-5.933c0-1.31.468-2.382 1.236-3.222c-.124-.303-.536-1.523.117-3.176c0 0 1.008-.322 3.3 1.23c.957-.266 1.983-.399 3.003-.404c1.02.005 2.047.138 3.006.404c2.289-1.552 3.295-1.23 3.295-1.23c.656 1.653.245 2.873.12 3.176c.77.84 1.235 1.912 1.235 3.222c0 4.61-2.807 5.625-5.48 5.922c.43.37.815 1.102.815 2.222v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.296 24 12c0-6.63-5.37-12-12-12z"
              />
            </svg>
          </a>
          <a
            href="https://medium.com/@IEEE_Computer_Society_VIT"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6"
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            width="36"
            height="36"
            fill="black"
          >
            <title>Medium</title>
            <rect width="48" height="48" fill="none" />
            <path d="M2,40.2l5.3-6.1v-21L2.6,7.8V7H15.1l10,21.2L33.9,7H46v.8l-4,3.7V36.6l4,3.6V41H28.6v-.8l4.1-4.8V16.6L22.7,41H21.4L9.8,17.1V33.9l5.3,6.3V41H2Z" />
          </svg>

          </a>
        </div>
      </footer>
    </div>
  );

  return isMobile ? MobileLayout : DesktopLayout;
};

export default Contact;


