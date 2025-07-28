import React, { useState } from "react";
import HeroSection from './homepage/HeroSection';
import OurStory from './homepage/OurStory';
import PreLoader from "./Preloader/Preloader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleEnter = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading ? (
        <PreLoader onEnter={handleEnter} />
      ) : (
        <div className="w-screen min-h-screen overflow-x-hidden">
          <HeroSection />
        </div>
      )}
    </>
  );
};

export default App;
