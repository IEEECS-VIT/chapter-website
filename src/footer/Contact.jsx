import React from "react";
import ieeeLogo from "/Users/anweshalaha/Desktop/IEEE-CS FOOTER/IEEE-CS-WEBSITE/src/assets/ieeelogo.png";
import centerImage from "/Users/anweshalaha/Desktop/IEEE-CS FOOTER/IEEE-CS-WEBSITE/src/assets/image.png";

const Contact = () => {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col justify-end items-center relative overflow-hidden font-mono">
      {/* Arch Background */}
      <div
        className="absolute bottom-0 left-0 w-full z-0"
        style={{
          height: "720px",
          backgroundImage: `url(${centerImage})`,
          backgroundRepeat: "repeat",
          backgroundSize: "cover",
          backgroundPosition: "top center",
          borderTopLeftRadius: "100% 30%",
          borderTopRightRadius: "100% 30%",
        }}
      ></div>

      {/* Main Content */}
      <div
        className="absolute z-10 max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-8 px-10"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -30%)",
          position: "absolute",
        }}
      >
        {/* Left: Contact Form */}
        <div>
          <h2 className="text-2xl mb-6 tracking-widest">Contact Us</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-base mb-1">Full name*</label>
              <input
                type="text"
                placeholder="enter your name..."
                className="w-full p-2 border-b border-black"
                style={{ backgroundColor: "rgba(255,255,255,.85)", outline: "none" }}
              />
            </div>
            <div>
              <label className="block text-base mb-1">Email address*</label>
              <input
                type="email"
                placeholder="enter your email address..."
                className="w-full p-2 border-b border-black"
                style={{ backgroundColor: "rgba(255,255,255,.85)", outline: "none" }}
              />
            </div>
            <div>
              <label className="block text-base mb-1">Contact number*</label>
              <input
                type="tel"
                placeholder="enter your contact number..."
                className="w-full p-2 border-b border-black"
                style={{ backgroundColor: "rgba(255,255,255,.85)", outline: "none" }}
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 px-6 py-2 text-lg text-black bg-transparent hover:underline"
              >
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex flex-col items-center justify-center">
          <img
            src={ieeeLogo}
            alt="IEEE Logo"
            className="w-[260px] h-auto md:w-[300px]"
            style={{ marginTop: "-20px" }}
          />
        </div>

        {/* Right: Contact Info */}
        <div>
          <h2 className="text-base mb-1 mt-8">Get in Touch</h2>
          <p className="text-base">IEEECS@vit.ac.in</p>
          <p className="text-base mb-3">+91 9380302937</p>
          <p
            className="text-base leading-tight mt-10 text-white"
            style={{ maxWidth: "340px", lineHeight: "1.35em" }}
          >
            We, here at IEEECS, nurture the coders and leaders of tomorrow.
            We empower and support new ideas giving them a platform to shine. IEEECS has been a home to great ideas capable of bringing a better future for all.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="w-full relative z-10 flex flex-col md:flex-row justify-between items-center px-12 pb-4 text-black text-xs gap-4 md:gap-0">
        <div className="flex gap-8">
          <a href="#">PRIVACY POLICY</a>
          <a href="#">DISCLAIMER</a>
          <a href="#">TERMS AND CONDITIONS</a>
        </div>
        <div className="flex gap-3 items-center">
          <span>SEE WHAT WE'RE UP TO</span>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/ieeecs_vit/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="w-full h-full object-cover"
            />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/ieeecsvit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="w-full h-full object-contain bg-white"
            />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/ieee-cs-vit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/174/174857.png"
              alt="LinkedIn"
              className="w-full h-full object-contain"
            />
          </a>

          {/* Twitter */}
          <a
            href="https://twitter.com/ieeecsvit"
            target="_blank"
            rel="noopener noreferrer"
            className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg"
              alt="Twitter"
              className="w-full h-full object-contain"
            />
          </a>

          
        </div>
      </div>
    </div>
  );
};

export default Contact;
