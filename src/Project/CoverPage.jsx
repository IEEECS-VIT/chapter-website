const CoverPage = ({ data }) => {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center text-black"
      style={{
        backgroundImage: `url(${data.bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <img
        src={data.images[0]}
        alt="cover-img1"
        className="absolute top-5 pl-4 xl:pl-0 xl:top-10 left-0 xl:left-10 w-[30vw] md:w-[28vw] xl:w-[15vw] object-contain"
      />

      <div className="relative w-full h-full flex items-center justify-center z-10">
        <div className="relative w-full h-full flex items-center justify-center z-10">
          <div className="absolute flex flex-col items-center top-[20%] xl:top-[25%]">
            <h1
              className="text-5xl xl:text-6xl md:text-7xl font-extrabold mt-14 xl:mt-0 text-[#4B3200]"
              style={{ fontFamily: "serif" }}
            >
              OUR
            </h1>
            <h1
              className="text-5xl xl:text-6xl md:text-7xl font-extrabold text-[#4B3200]"
              style={{ fontFamily: "serif" }}
            >
              PROJECTS
            </h1>
          </div>
        </div>
        <img
          src={data.images[1]}
          alt="cover-img2"
          className="w-full md:w-[75vw] scale-110 xl:scale-100 md:scale-90 xl:w-[35vw] absolute object-contain top-[62%] md:top-[62%] xl:top-[68%] -translate-y-1/2"
        />
      </div>

      <img
        src={data.images[2]}
        alt="cover-img3"
        className="absolute bottom-0 xl:bottom-10 -right-1 xl:right-10 w-[35vw] xl:w-[15vw] md:w-[30vw] object-contain"
      />
    </div>
  );
};

export default CoverPage;