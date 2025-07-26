import React from 'react';
import HeroSection from './homepage/HeroSection';
import OurStory from './homepage/OurStory';

const App = () => {
  return (
<>
<div className="relative z-0">
  <HeroSection />
</div>

<div className="relative z-10">
  <OurStory />
</div>
</>

  );
};

export default App;
