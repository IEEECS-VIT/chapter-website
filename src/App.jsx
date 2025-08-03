import React, { useState } from "react";
import HeroSection from './homepage/HeroSection';
import OurStory from './homepage/OurStory';
import PreLoader from "./Preloader/Preloader";
import Board from "./board_section/board"
import EventsPage from "./eventsection/eventpage";
import Gallery from "./gallery/FilmstripGallery";
import Footer from "./footer/Contact";


const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleEnter = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <PreLoader onEnter={handleEnter} />;
  }

  return (
    <div className="w-screen min-h-screen overflow-x-hidden">
      <HeroSection />
      <Board />
      <EventsPage />
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center">
        <Gallery />
      </div>
      <Footer />
    </div>
  );
};

export default App;
