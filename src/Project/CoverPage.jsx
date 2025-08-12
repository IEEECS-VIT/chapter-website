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
      <img src={data.images[0]} alt="cover-img1" className="absolute top-10 left-10 w-[15vw] object-contain"/>

      <div className="relative w-full h-full flex items-center justify-center z-10">

        <h1 className="text-6xl font-extrabold absolute" style={{ fontFamily: "serif", top: "20%" }}>
          OUR
        </h1>
        <h1 className="text-6xl font-extrabold absolute" style={{ fontFamily: "serif", top: "30%" }}>
          PROJECTS
        </h1>
        <img src={data.images[1]} alt="cover-img2" className="w-[35vw] absolute object-contain" style={{ top: "40%" }}/>
      </div>

      <img src={data.images[2]} alt="cover-img3" className="absolute bottom-10 right-10 w-[15vw] object-contain"
      />
    </div>
  );
};

export default CoverPage;
