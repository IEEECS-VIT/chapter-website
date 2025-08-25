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
        className="absolute top-5 pl-4 md:pl-0 md:top-10 left-0 md:left-10 w-[30vw] md:w-[15vw] object-contain"
      />

      <div className="relative w-full h-full flex items-center justify-center z-10">
        <div className="relative w-full h-full flex items-center justify-center z-10">
          <div className="absolute flex flex-col items-center top-[20%] md:top-[25%]">
            <h1
              className="text-5xl md:text-6xl font-extrabold mt-14 md:mt-0"
              style={{ fontFamily: "serif" }}
            >
              OUR
            </h1>
            <h1
              className="text-5xl md:text-6xl font-extrabold "
              style={{ fontFamily: "serif" }}
            >
              PROJECTS
            </h1>
          </div>

        </div>
        <img
          src={data.images[1]}
          alt="cover-img2"
          className="w-full scale-110 md:scale-100 md:w-[35vw] absolute object-contain"
          style={{ top: "42%" }}
        />
      </div>

      <img
        src={data.images[2]}
        alt="cover-img3"
        className="absolute bottom-0 md:bottom-10 -right-1 md:right-10 w-[35vw] md:w-[15vw] object-contain"
      />
    </div>
  );
};

export default CoverPage;