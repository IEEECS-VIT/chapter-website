import React, { useState } from "react";
import PreLoader from "./Preloader/Preloader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleEnter = () => {
    setIsLoading(false);
  };

  return (
    <>
      
    </>
  );
};

export default App;
