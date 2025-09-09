import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import LocalModelViewer from "./LocalModelView";
import axios from "axios";

const Contact = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("https://ieee-cs-website-vwmd.vercel.app/api/contact.js", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      setStatus("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("Something went wrong.");
    }
  } catch (err) {
    console.error(err);
    setStatus("error:Something went wrong.");
  }
};

  return (
    <div className="min-h-screen w-full flex flex-col font-serif bg-[#EF9E00] text-[#4B3200]">
      <header className="relative w-full h-[25vh] md:h-[30vh]">
        <svg
          className="absolute top-0 left-0 w-full h-full"
          viewBox="0 0 440 157"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 -15H440V157C339.769 91.4234 131.028 79.2404 0 157V-15Z"
            fill="black"
          />
        </svg>
        
      </header>

      <div className="flex flex-col-reverse lg:flex-row items-start justify-center w-full px-5 sm:px-8 md:px-10 lg:px-20 gap-8 lg:gap-10 relative">
        <div className="w-full lg:w-3/5 px-0 sm:px-4 md:px-10 lg:px-[6vw]">
          <h2 className="text-[5vw] sm:text-[4vw] md:text-3xl font-semibold mb-3 md:mb-8 text-center lg:text-left">
            Contact Us
          </h2>

          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label className="mb-2 text-[4vw] sm:text-sm md:text-base font-semibold">
                Full name
              </label>
              <input
                type="text"
                placeholder="Enter your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-xl md:rounded-full bg-[#ECE0D0] outline-none border-none text-[4vw] sm:text-sm md:text-base"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-[4vw] sm:text-sm md:text-base font-semibold">
                Email address*
              </label>
              <input
                type="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                 pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                 title="Please enter a valid email address"

                className="w-full px-4 py-2 rounded-xl md:rounded-full bg-[#ECE0D0] outline-none border-none text-[4vw] sm:text-sm md:text-base"
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-2 text-[4vw] sm:text-sm md:text-base font-semibold">
                Message
              </label>
              <input
                type="text"
                placeholder="Enter your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-2 h-[12vw] sm:h-12 md:h-14 rounded-xl md:rounded-full bg-[#ECE0D0] outline-none border-none text-[4vw] sm:text-sm md:text-base"
                required
              />
            </div>

            <div className="flex justify-center mt-4 md:mt-6">
              <button
                type="submit"
                className="px-[8vw] sm:px-10 py-2 md:px-10 md:py-3 
              rounded-full bg-black text-white font-semibold 
              hover:scale-110 hover:shadow-lg 
              transition-transform duration-300 ease-in-out 
              text-[4vw] sm:text-sm md:text-base
              "
              >
                Submit
              </button>
            </div>
             {status && <p className="bg-yellow-400 text-black border border-white rounded-lg px-4 py-2 text-center font-semibold shadow-sm">
  {status}
</p>
}
          </form>
        </div>

        <div className="w-full lg:w-4/5 flex justify-center items-center -mt-[8vh] -mb-[2vh] lg:mt-0 lg:mb-0">
          <LocalModelViewer /> 
        </div>

        <button
          className="hidden lg:flex items-center justify-center absolute top-1/2 right-0 
          transform -translate-y-1/2 bg-black text-white px-5 py-5 rounded-l-2xl font-semibold 
          shadow-lg hover:bg-gray-900 hover:scale-110 hover:shadow-2xl hover:text-[#EF9E00]
          transition-all duration-300 ease-out"

          style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          Scroll to Top
        </button>
      </div>

      <footer className="flex flex-col lg:flex-row items-center justify-between gap-6 px-5 lg:px-[1.5vw] py-6 mt-auto">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center lg:items-start">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <lottie-player
              src="/sd.json"
              background="transparent"
              speed="1"
              loop
              autoplay
              className="block h-[7vh] rotate-180 lg:hidden"
            />
          </button>
          <div className="flex flex-col lg:flex-row mb:gap-4 lg:gap-[2vw] items-center lg:items- text-[5vw] sm:text-sm md:text-base">
            <p>utkarshkashyap4549@gmail.com</p>
            <p>+91 9380302937</p>
          </div>
        </div>

        <div className="flex gap-10 mb-2 pr-6">
          <a
            href="https://www.instagram.com/ieeecs_vit/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-1 h-1 md:w-2 md:h-2 lg:w-4 lg:h-4 scale-75 md:scale-100"
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
            className="w-1 h-1 md:w-2 md:h-2 lg:w-4 lg:h-4 scale-75 md:scale-100"
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
            className="w-1 h-1 md:w-2 md:h-2 lg:w-4 lg:h-4 scale-75 md:scale-100"
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
            className="w-1 h-1 md:w-2 md:h-2 lg:w-4 lg:h-4 scale-75 md:scale-100"
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
            className="w-1 h-1 md:w-2 md:h-2 lg:w-4 lg:h-4 scale-75 md:scale-100"
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
            className="w-1 h-1 md:w-2 md:h-2 lg:w-4 lg:h-4 scale-75 md:scale-100"
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
};

export default Contact;
