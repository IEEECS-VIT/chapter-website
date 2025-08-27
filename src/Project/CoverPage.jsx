import React, { useState, useEffect } from "react";
import ieeeLogo from "./ieeelogo.png";
import fb from "./fb.png";
import lin from "./lin.png";
import ins from "./ins.png";
import x from "./x.png";

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

  // --- scale factor relative to design width (440) ---
  const base = Math.min(vw || 440, 440);
  const s = base / 440; // global shrink factor (1 at 440, <1 below)

  // additional emblem scale so emblem can shrink more aggressively on very small screens
  const emblemScale = base >= 400 ? s : base >= 360 ? s * 0.92 : s * 0.78;

  // original mobile coords from your TSX
  const coords = {
    logo: { left: 95, top: 149, width: 251, height: 167 },
    desc: { left: 73, top: 326, width: 293, height: 131 },
    contactBox: { left: 47, top: 542, width: 237, height: 257 },
    submit: { left: 117, top: 827 },
    getInTouch: { left: 316, top: 542, width: 124, height: 70 },
    footerLinks: { left: 5, top: 908, width: 399, height: 9 },
    socialsTop: 929,
  };

  // scaled values (global)
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

  // emblem size/position (aggressively scaled)
  const emblemWidth = Math.round(coords.logo.width * emblemScale);
  const emblemHeight = Math.round(coords.logo.height * emblemScale);
  const originalCenterX = coords.logo.left + coords.logo.width / 2;
  const originalCenterY = coords.logo.top + coords.logo.height / 2;
  const emblemLeft = Math.round(originalCenterX * s - emblemWidth / 2);
  const emblemTop = Math.round(originalCenterY * s - emblemHeight / 2);

  // submit button: extra vertical offset on small screens
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

  // ---------------- MOBILE LAYOUT ----------------
  const MobileLayout = (
    <div
      className="w-full max-w-[440px] mx-auto min-h-[956px] relative overflow-hidden font-serif"
      style={{
        backgroundColor: "#EF9E00",
        fontFamily: "Gloock, serif",
        color: "#4B3200",
      }}
    >
      {/* Black curved header */}
      <div className="relative w-full h-[172px]">
        <svg
          className="absolute top-0 left-0 w-full h-[172px]"
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

      {/* Central emblem / phi (resizes more aggressively) */}
      <div
        className="absolute"
        style={{
          left: emblemLeft,
          top: emblemTop,
          width: emblemWidth,
          height: emblemHeight,
        }}
      >
        <img
          src={ieeeLogo}
          alt="Phi"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Main description (scaled) */}
      <div
        className="absolute"
        style={{
          left: descStyle.left,
          top: descStyle.top,
          width: descStyle.width,
          height: descStyle.height,
        }}
      >
        <p
          className="leading-normal mt-10"
          style={{
            color: "#4B3200",
            fontSize: `${15.5 * s}px`,
            letterSpacing: `${1.085 * s}px`,
            lineHeight: 1.25,
            fontFamily: "Gloock, serif",
          }}
        >
          We, here at IEEECS, nurture the coders and leaders of tomorrow. We
          empower and support new ideas giving them a platform to shine.IEEECS
          has been a home to great ideas capable of bringing a better future for
          all.
        </p>
      </div>

      {/* Contact box (scaled) */}
      <div
        className="absolute"
        style={{
          left: contactBoxStyle.left,
          top: contactBoxStyle.top,
          width: contactBoxStyle.width,
          height: contactBoxStyle.height,
        }}
      >
        <h2
          className="mb-[39px]"
          style={{
            color: "#4B3200",
            fontSize: `${21.6 * s}px`,
            letterSpacing: `${1.513 * s}px`,
            fontFamily: "Gloock, serif",
          }}
        >
          Contact Us
        </h2>

        <form style={{ display: "block", rowGap: `${21 * s}px` }}>
          {/* Full Name */}
          <div>
            <label
              className="block"
              style={{
                marginLeft: `${7 * s}px`,
                marginBottom: `${6 * s}px`,
                color: "#4B3200",
                fontSize: `${13 * s}px`,
                letterSpacing: `${0.911 * s}px`,
                fontFamily: "Gloock, serif",
              }}
            >
              Full name*
            </label>
            <div className="relative">
              <div
                className="rounded-[16.568px]"
                style={{
                  width: Math.round(237 * s),
                  height: Math.round(30 * s),
                  backgroundColor: "#ECE0D0",
                }}
              />
              <input
                type="text"
                placeholder="enter your name..."
                className="absolute inset-0 w-full h-full bg-transparent px-2 border-none outline-none"
                style={{
                  color: "#4B3200",
                  fontSize: `${10.8 * s}px`,
                  letterSpacing: `${0.756 * s}px`,
                  fontFamily: "Gloock, serif",
                }}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              className="block"
              style={{
                marginLeft: `${7 * s}px`,
                marginBottom: `${6 * s}px`,
                color: "#4B3200",
                fontSize: `${13 * s}px`,
                letterSpacing: `${0.911 * s}px`,
                fontFamily: "Gloock, serif",
              }}
            >
              Email address*
            </label>
            <div className="relative">
              <div
                className="rounded-[16.568px]"
                style={{
                  width: Math.round(237 * s),
                  height: Math.round(30 * s),
                  backgroundColor: "#ECE0D0",
                }}
              />
              <input
                type="email"
                placeholder="enter your email address..."
                className="absolute inset-0 w-full h-full bg-transparent px-2 border-none outline-none"
                style={{
                  color: "#4B3200",
                  fontSize: `${10.8 * s}px`,
                  letterSpacing: `${0.756 * s}px`,
                  fontFamily: "Gloock, serif",
                }}
              />
            </div>
          </div>

          {/* Contact number */}
          <div>
            <label
              className="block"
              style={{
                marginLeft: `${7 * s}px`,
                marginBottom: `${6 * s}px`,
                color: "#4B3200",
                fontSize: `${13 * s}px`,
                letterSpacing: `${0.911 * s}px`,
                fontFamily: "Gloock, serif",
              }}
            >
              Contact number*
            </label>
            <div className="relative">
              <div
                className="rounded-[16.568px]"
                style={{
                  width: Math.round(237 * s),
                  height: Math.round(30 * s),
                  backgroundColor: "#ECE0D0",
                }}
              />
              <input
                type="tel"
                placeholder="enter your contact number..."
                className="absolute inset-0 w-full h-full bg-transparent px-2 border-none outline-none"
                style={{
                  color: "#4B3200",
                  fontSize: `${10.8 * s}px`,
                  letterSpacing: `${0.756 * s}px`,
                  fontFamily: "Gloock, serif",
                }}
              />
            </div>
          </div>
        </form>
      </div>

      {/* Submit Button (moved further down on smaller screens) */}
      <div
        className="absolute"
        style={{
          left: Math.round(submitStyle.left),
          top: Math.round(submitStyle.top),
        }}
      >
        <button
          className="flex justify-center items-center rounded-[33.684px] border hover:shadow-lg transition-shadow duration-200"
          style={{
            width: Math.round(81 * s),
            height: Math.max(24 * s, 20),
            padding: `${10.526 * s}px ${17.684 * s}px`,
            borderColor: "#DDB373",
            background:
              "linear-gradient(90deg, #D4A02A 0%, #AD4C01 50%, #9B4102 100%)",
            color: "#4B3200",
            fontFamily: "Gloock, serif",
            fontSize: `${8.4 * s}px`,
            letterSpacing: `${0.589 * s}px`,
          }}
        >
          <span style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}>
            Submit
          </span>
        </button>
      </div>

      {/* Get in Touch (scaled) */}
      <div
        className="absolute"
        style={{
          left: getInTouchStyle.left,
          top: getInTouchStyle.top,
          width: getInTouchStyle.width,
          height: getInTouchStyle.height,
        }}
      >
        <h3
          className="mb-[12px]"
          style={{
            color: "#4B3200",
            fontSize: `${14.9 * s}px`,
            letterSpacing: `${1.044 * s}px`,
            fontFamily: "Gloock, serif",
          }}
        >
          Get in Touch
        </h3>
        <div
          style={{
            color: "#4B3200",
            fontSize: `${11.15 * s}px`,
            letterSpacing: `${0.781 * s}px`,
            lineHeight: 1.4,
            fontFamily: "Gloock, serif",
          }}
        >
          <p>IEEECS@vit.ac.in</p>
          <p>91 9380302937</p>
        </div>
      </div>

      {/* Footer links (scaled - mobile) */}
      <div
        className="absolute left-5"
        style={{
          top: footerLinksStyle.top,
          width: footerLinksStyle.width,
          height: footerLinksStyle.height,
          display: "flex",
          justifyContent: "center",
          gap: Math.round(29 * s),
          color: "#4B3200",
          fontFamily: "Gloock, serif",
        }}
      >
        <span
          style={{ fontSize: `${7.39 * s}px`, letterSpacing: `${0.517 * s}px` }}
        >
          PRIVACY POLICY
        </span>
        <span
          style={{ fontSize: `${7.39 * s}px`, letterSpacing: `${0.517 * s}px` }}
        >
          DISCLAMER
        </span>
        <span
          style={{ fontSize: `${7.39 * s}px`, letterSpacing: `${0.517 * s}px` }}
        >
          TERMS AND CONDITIONS
        </span>
        <span
          style={{ fontSize: `${7.39 * s}px`, letterSpacing: `${0.517 * s}px` }}
        >
          SEE WHAT WE'RE UP TO
        </span>
      </div>

      {/* Social icons row (scaled) */}
      <div
        className="absolute left-0"
        style={{ top: socialsTop, width: "100%", height: Math.round(15 * s) }}
      >
        <div
          style={{
            width: Math.round(111 * s),
            height: Math.round(15 * s),
            margin: "0 auto",
            display: "flex",
            gap: Math.round(6 * s),
            alignItems: "center",
          }}
        >
          <a
            href="https://www.instagram.com/ieeecs_vit/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 29 24"
              fill="currentColor"
            >
              <path
                fill="black"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89"
              />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/ieee-cs-vit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 29 24"
              fill="black"
            >
              <path
                fill="black"
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
          className="w-9 h-9"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 29 24"
            fill="currentColor"
          >
            <path
              fill="black"
              d="M13.808 10.469L20.88 2h-1.676l-6.142 7.353L8.158 2H2.5l7.418 11.12L2.5 22h1.676l6.486-7.765L15.842 22H21.5zm-2.296 2.748l-.752-1.107L4.78 3.3h2.575l4.826 7.11l.751 1.107l6.273 9.242h-2.574z"
            />
          </svg>
        </a>
           <a href="https://www.youtube.com/@ieeecomputersociety-vitcha2386"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 29 24"
                    fill="currentColor"
                  >
                    <g fill="none">
                      <g clip-path="url(#akarIconsYoutubeFill0)">
                        <path
                          fill="black"
                          d="M23.5 6.507a2.8 2.8 0 0 0-.766-1.27a3.05 3.05 0 0 0-1.338-.742C19.518 4 11.994 4 11.994 4a77 77 0 0 0-9.39.47a3.16 3.16 0 0 0-1.338.76c-.37.356-.638.795-.778 1.276A29 29 0 0 0 0 12c-.012 1.841.151 3.68.488 5.494c.137.479.404.916.775 1.269s.833.608 1.341.743c1.903.494 9.39.494 9.39.494a77 77 0 0 0 9.402-.47a3.05 3.05 0 0 0 1.338-.742a2.8 2.8 0 0 0 .765-1.27A28.4 28.4 0 0 0 24 12.023a26.6 26.6 0 0 0-.5-5.517M9.602 15.424V8.577l6.26 3.424z"
                        />
                      </g>
                      <defs>
                        <clipPath id="akarIconsYoutubeFill0">
                          <path fill="#fff" d="M0 0h24v24H0z" />
                        </clipPath>
                      </defs>
                    </g>
                  </svg>
                </a>

        </div>
      </div>
    </div>
  );

  // ---------------- DESKTOP LAYOUT ----------------
  const DesktopLayout = (
    <div
      className="min-h-screen w-full flex flex-col justify-start items-center relative overflow-hidden font-serif"
      style={{
        backgroundColor: "#EF9E00",
        fontFamily: "Gloock, serif",
        color: "#4B3200",
      }}
    >
      {/* Black curved header (same as mobile) */}
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

      {/* Main content (normal flow so footer stays at bottom) */}
      <main className="z-10 w-[90%] max-w-[90vw] mt-40 grid grid-cols-1 lg:grid-cols-3 gap-[5%] px-[5%] mx-auto flex-1 place-content-center">
        {/* Contact Form (left) */}
        <div className="flex flex-col order-3 lg:order-1">
          <h2
            className="text-[clamp(1.2rem,2vw,2.4rem)] font-semibold mb-[6%] tracking-wide"
            style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
          >
            Contact Us
          </h2>

          <form className="flex flex-col">
            <div className="mb-[4%]">
              <label
                className="block text-[clamp(0.95rem,1.1vw,1.3rem)] font-semibold mb-[1%]"
                style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
              >
                Full name*
              </label>
              <input
                type="text"
                placeholder="enter your name..."
                className="w-full px-[3%] py-[1.5%] rounded-full shadow-sm text-[clamp(0.95rem,1.05vw,1.05rem)]"
                style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
              />
            </div>

            <div className="mb-[4%]">
              <label
                className="block text-[clamp(0.95rem,1.1vw,1.3rem)] font-semibold mb-[1%]"
                style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
              >
                Email address*
              </label>
              <input
                type="email"
                placeholder="enter your email address..."
                className="w-full px-[3%] py-[1.5%] rounded-full shadow-sm text-[clamp(0.95rem,1.05vw,1.05rem)]"
                style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
              />
            </div>

            <div className="mb-[6%]">
              <label
                className="block text-[clamp(0.95rem,1.1vw,1.3rem)] mb-[1%] font-semibold"
                style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
              >
                Contact number*
              </label>
              <input
                type="tel"
                placeholder="enter your contact number..."
                className="w-full px-[3%] py-[1.5%] rounded-full shadow-sm text-[clamp(0.95rem,1.05vw,1.05rem)]"
                style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
              />
            </div>

            <div className="flex justify-center mt-[10%]">
              <button
                type="button"
                className="flex justify-center w-[50%] items-center rounded-full border hover:shadow-lg transition-shadow duration-200"
                style={{
                  borderColor: "#DDB373",
                  background:
                    "linear-gradient(90deg, #D4A02A 0%, #AD4C01 50%, #9B4102 100%)",
                  color: "#4B3200",
                  fontFamily: "Gloock, serif",
                  fontSize: "clamp(0.9rem,1.05vw,1.2rem)",
                  letterSpacing: "0.05em",
                  padding: "0.6em 1.4em",
                }}
              >
                <span style={{ fontWeight: "bold" }}>Submit</span>
              </button>
            </div>
          </form>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center order-1 lg:order-2">
          <img
            src={ieeeLogo}
            alt="IEEE Logo"
            className="w-[90%] max-w-[20vw] h-auto drop-shadow-xl"
          />
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col order-2">
          <h2
            className="text-[clamp(1rem,1.4vw,1.6rem)] mt-[5%] mb-[2%]"
            style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
          >
            Get in Touch
          </h2>
          <p
            className="text-[clamp(1.45rem,1.1vw,1.3rem)]"
            style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
          >
            IEEECS@vit.ac.in
          </p>
          <p
            className="text-[clamp(1.45rem,1.1vw,1.3rem)] mb-[20%]"
            style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
          >
            +91 9380302937
          </p>
          <p
            className="text-[clamp(1.45rem,1.1vw,1.3rem)] leading-relaxed mt-[4%] max-w-[100%]"
            style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
          >
            We, here at IEEE CS, nurture the coders and leaders of tomorrow. We
            empower and support new ideas giving them a platform to shine. IEEE CS
            has been a home to great ideas capable of bringing a better future
            for all.
          </p>
        </div>
      </main>

      {/* Footer pinned to bottom */}
      <footer
        className="w-full relative z-10 flex flex-col items-center mt-auto pb-[3%]"
        style={{ color: "#4B3200", fontFamily: "Gloock, serif" }}
      >
        <div className="w-full max-w-[100%] flex flex-col md:flex-row items-center justify-center gap-6 md:gap-64">
          <div className="flex items-center gap-6 md:gap-8">
            <a
              href="#"
              className="hover:underline whitespace-nowrap font-semibold"
              style={{
                color: "#4B3200",
                fontSize: "clamp(0.95rem,1rem,1.1rem)",
              }}
            >
              PRIVACY POLICY
            </a>
            <a
              href="#"
              className="hover:underline whitespace-nowrap font-semibold"
              style={{
                color: "#4B3200",
                fontSize: "clamp(0.95rem,1rem,1.1rem)",
              }}
            >
              DISCLAIMER
            </a>
            <a
              href="#"
              className="hover:underline whitespace-nowrap font-semibold"
              style={{
                color: "#4B3200",
                fontSize: "clamp(0.95rem,1rem,1.1rem)",
              }}
            >
              TERMS AND CONDITIONS
            </a>
            <span
              className="whitespace-nowrap font-semibold"
              style={{
                color: "#4B3200",
                fontSize: "clamp(0.95rem,1rem,1.1rem)",
              }}
            >
              SEE WHAT WE'RE UP TO
            </span>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
           <a
            href="https://www.instagram.com/ieeecs_vit/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fill="black"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.465 1.066C8.638 1.012 9.012 1 12 1s3.362.013 4.534.066s1.972.24 2.672.511c.733.277 1.398.71 1.948 1.27c.56.549.992 1.213 1.268 1.947c.272.7.458 1.5.512 2.67C22.988 8.639 23 9.013 23 12s-.013 3.362-.066 4.535c-.053 1.17-.24 1.97-.512 2.67a5.4 5.4 0 0 1-1.268 1.949c-.55.56-1.215.992-1.948 1.268c-.7.272-1.5.458-2.67.512c-1.174.054-1.548.066-4.536.066s-3.362-.013-4.535-.066c-1.17-.053-1.97-.24-2.67-.512a5.4 5.4 0 0 1-1.949-1.268a5.4 5.4 0 0 1-1.269-1.948c-.271-.7-.457-1.5-.511-2.67C1.012 15.361 1 14.987 1 12s.013-3.362.066-4.534s.24-1.972.511-2.672a5.4 5.4 0 0 1 1.27-1.948a5.4 5.4 0 0 1 1.947-1.269c.7-.271 1.5-.457 2.67-.511m8.98 1.98c-1.16-.053-1.508-.064-4.445-.064s-3.285.011-4.445.064c-1.073.049-1.655.228-2.043.379c-.513.2-.88.437-1.265.822a3.4 3.4 0 0 0-.822 1.265c-.151.388-.33.97-.379 2.043c-.053 1.16-.064 1.508-.064 4.445s.011 3.285.064 4.445c.049 1.073.228 1.655.379 2.043c.176.477.457.91.822 1.265c.355.365.788.646 1.265.822c.388.151.97.33 2.043.379c1.16.053 1.507.064 4.445.064s3.285-.011 4.445-.064c1.073-.049 1.655-.228 2.043-.379c.513-.2.88-.437 1.265-.822c.365-.355.646-.788.822-1.265c.151-.388.33-.97.379-2.043c.053-1.16.064-1.508.064-4.445s-.011-3.285-.064-4.445c-.049-1.073-.228-1.655-.379-2.043c-.2-.513-.437-.88-.822-1.265a3.4 3.4 0 0 0-1.265-.822c-.388-.151-.97-.33-2.043-.379m-5.85 12.345a3.669 3.669 0 0 0 4-5.986a3.67 3.67 0 1 0-4 5.986M8.002 8.002a5.654 5.654 0 1 1 7.996 7.996a5.654 5.654 0 0 1-7.996-7.996m10.906-.814a1.337 1.337 0 1 0-1.89-1.89a1.337 1.337 0 0 0 1.89 1.89"
              />
            </svg>
          </a>

            
            
          <a
            href="https://www.linkedin.com/company/ieee-cs-vit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9"
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
          className="w-9 h-9"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fill="black"
              d="M13.808 10.469L20.88 2h-1.676l-6.142 7.353L8.158 2H2.5l7.418 11.12L2.5 22h1.676l6.486-7.765L15.842 22H21.5zm-2.296 2.748l-.752-1.107L4.78 3.3h2.575l4.826 7.11l.751 1.107l6.273 9.242h-2.574z"
            />
          </svg>
        </a>


            <a href="https://www.youtube.com/@ieeecomputersociety-vitcha2386"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <g fill="none">
                      <g clip-path="url(#akarIconsYoutubeFill0)">
                        <path
                          fill="black"
                          d="M23.5 6.507a2.8 2.8 0 0 0-.766-1.27a3.05 3.05 0 0 0-1.338-.742C19.518 4 11.994 4 11.994 4a77 77 0 0 0-9.39.47a3.16 3.16 0 0 0-1.338.76c-.37.356-.638.795-.778 1.276A29 29 0 0 0 0 12c-.012 1.841.151 3.68.488 5.494c.137.479.404.916.775 1.269s.833.608 1.341.743c1.903.494 9.39.494 9.39.494a77 77 0 0 0 9.402-.47a3.05 3.05 0 0 0 1.338-.742a2.8 2.8 0 0 0 .765-1.27A28.4 28.4 0 0 0 24 12.023a26.6 26.6 0 0 0-.5-5.517M9.602 15.424V8.577l6.26 3.424z"
                        />
                      </g>
                      <defs>
                        <clipPath id="akarIconsYoutubeFill0">
                          <path fill="#fff" d="M0 0h24v24H0z" />
                        </clipPath>
                      </defs>
                    </g>
                  </svg>
                </a>

          </div>
        </div>
      </footer>
    </div>
  );

  return isMobile ? MobileLayout : DesktopLayout;
};

export default Contact;
