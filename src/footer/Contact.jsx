import React from "react";
import ieeeLogo from "./ieeelogo.jpg";
import fb from "./fb.jpg";
import lin from "./lin.jpg";
import ins from "./ins.jpg";
import x from "./x.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col justify-end items-center relative overflow-hidden font-sans">
      {/* Arch Background */}
      <div
        className="absolute bottom-0 left-0 w-full z-0 shadow-[0_-1vh_4vh_rgba(0,0,0,0.6)] h-[85%] bg-[#f5a200] 
        rounded-tl-[80%_20%] rounded-tr-[80%_20%]"
      ></div>

      {/* Main Content */}
      <div
        className="absolute z-10 w-[90%] max-w-[90vw] grid grid-cols-1 lg:grid-cols-3 gap-[5%] 
        px-[5%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-[45%]"
      >
        {/* Left: Contact Form */}
        <div className="flex flex-col text-[#4B3200]">
          <h2 className="text-[clamp(1rem,1.8vw,2rem)] font-semibold mb-[6%] tracking-wide">
            Contact Us
          </h2>
          <form className="flex flex-col">
            <div className="mb-[4%]">
              <label className="block text-[clamp(0.8rem,1vw,1.2rem)] font-medium mb-[1%]">
                Full name*
              </label>
              <input
                type="text"
                placeholder="enter your name..."
                className="w-full px-[3%] py-[1.5%] rounded-full shadow-sm text-[#4B3200] 
                  placeholder-[#4B3200]/70 focus:ring-2 focus:ring-[#4B3200] bg-[#f3f3f3]"
              />
            </div>
            <div className="mb-[4%]">
              <label className="block text-[clamp(0.8rem,1vw,1.2rem)] font-medium mb-[1%]">
                Email address*
              </label>
              <input
                type="email"
                placeholder="enter your email address..."
                className="w-full px-[3%] py-[1.5%] rounded-full shadow-sm text-[#4B3200] 
                  placeholder-[#4B3200]/70 focus:ring-2 focus:ring-[#4B3200] bg-[#f3f3f3]"
              />
            </div>
            <div className="mb-[6%]">
              <label className="block text-[clamp(0.8rem,1vw,1.2rem)] font-medium mb-[1%]">
                Contact number*
              </label>
              <input
                type="tel"
                placeholder="enter your contact number..."
                className="w-full px-[3%] py-[1.5%] rounded-full shadow-sm text-[#4B3200] 
                  placeholder-[#4B3200]/70 focus:ring-2 focus:ring-[#4B3200] bg-[#f3f3f3]"
              />
            </div>
            <div className="flex justify-start mt-[10%]">
              <button
                type="button"
                className="block mx-auto w-[50%] py-[2%] px-[4%] rounded-full 
                  bg-gradient-to-r from-[#FCBA00] via-[#AD4C01] to-[#9B4102] 
                  text-[clamp(0.8rem,1vw,1.2rem)] font-medium shadow-md hover:shadow-lg transition"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        {/* Center: Logo */}
        <div className="flex items-center justify-center">
          <img
            src={ieeeLogo}
            alt="IEEE Logo"
            className="w-[40%] max-w-[20vw] h-auto drop-shadow-xl"
          />
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col text-black">
          <h2 className="text-[clamp(0.9rem,1.2vw,1.4rem)] font-semibold mt-[5%] mb-[2%]">
            Get in Touch
          </h2>
          <p className="text-[clamp(0.8rem,1vw,1.2rem)] font-semibold">
            IEEECS@vit.ac.in
          </p>
          <p className="text-[clamp(0.8rem,1vw,1.2rem)] mb-[4%] font-semibold">
            +91 9380302937
          </p>
          <p className="text-[clamp(0.8rem,1vw,1.2rem)] leading-relaxed mt-[4%] max-w-[100%] font-semibold">
            We, here at IEECS, nurture the coders and leaders of tomorrow. We
            empower and support new ideas giving them a platform to shine. IEECS
            has been a home to great ideas capable of bringing a better future
            for all.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="w-full relative z-10 flex flex-col md:flex-row items-center 
        px-[5%] pb-[3%] text-black gap-[8%]"
      >
        {/* Left Links */}
        <div className="flex flex-wrap w-[60%] text-[clamp(0.7rem,0.9vw,1rem)] font-medium justify-center md:justify-start gap-[10%]">
          <a href="#" className="hover:underline">
            PRIVACY POLICY
          </a>
          <a href="#" className="hover:underline">
            DISCLAIMER
          </a>
          <a href="#" className="hover:underline">
            TERMS AND CONDITIONS
          </a>
          <span className="text-[clamp(0.7rem,0.9vw,1rem)] font-medium">
            SEE WHAT WE'RE UP TO
          </span>
        </div>

        {/* Right Socials */}
        <div className="flex items-center">
          <div className="flex gap-10 md:pl-16">
            <a
              href="https://www.facebook.com/ieeecsvit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={fb} alt="Facebook" className="w-10 h-10" />
            </a>
            <a
              href="https://www.instagram.com/ieeecs_vit/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={ins} alt="Instagram" className="w-10 h-10" />
            </a>
            <a
              href="https://www.linkedin.com/company/ieee-cs-vit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={lin} alt="LinkedIn" className="w-10 h-10" />
            </a>
            <a
              href="https://twitter.com/ieeecsvit"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={x} alt="Twitter" className="w-10 h-10" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;