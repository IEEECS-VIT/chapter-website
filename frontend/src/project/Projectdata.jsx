import airport from "/assets/projects/airport.webp";
import coverBg from "/assets/projects/cover-bg.webp";
import coverImg1 from "/assets/projects/cover1.webp";
import coverImg2 from "/assets/projects/cover2.webp";
import coverImg3 from "/assets/projects/cover3.webp";
import iitk from "/assets/projects/techkriti.webp";
import cd from "/assets/projects/cd.webp";
import air from "/assets/projects/airport3.webp";
import pravega from "/assets/projects/pravega.webp";
import tc from "/assets/projects/tc.webp";
import cdc from "/assets/projects/cdc.webp";
import prv from "/assets/projects/prv.webp";
export const projectData = [ //update this to change projects
  {
    id: 0,
    isCover: true,
    title: "Cover Page",
    bgImage: coverBg,
    images: [coverImg1, coverImg2, coverImg3],
  },
  {
    id: 1,
    title: "Kalaburagi Airport Project",
    image: airport,
    viewImage: air, 
    text1: (
      <>
        The{" "}
        <span className="bg-yellow-400 px-1 rounded">
          Kalaburagi Airport Project
        </span>{" "}
        in alliance with the{" "}
        <span className="bg-yellow-400 px-1 rounded">
          Airports Authority of India
        </span>
        , uses technology to streamline operations and enhance experience.
      </>
    ),
  },
  {
    id: 2,
    title: "IIT Kanpur TechKriti",
    image: iitk,
    viewImage: tc, 
    text1: (
      <>
        Participated in{" "}
        <span className="bg-yellow-400 px-1 rounded">Techkriti</span> and
        secured a top position, showcasing innovation and technical excellence.
      </>
    ),
  },
  {
    id: 3,
    title: "Chota Dhobi App",
    image: cd,
    viewImage: cdc,
    text1: (
      <>
        With{" "}
        <span className="bg-yellow-400 px-1 rounded">80,000+ students</span>{" "}
        having used the platform and{" "}
        <span className="bg-yellow-400 px-1 rounded">5000 daily users</span>, it
        ensures efficient tracking, notifications, and record management.
      </>
    ),
  },
  {
    id: 4,
    title: "Pravega Racing Web App",
    image: pravega,
    viewImage: prv,
    text1: (
      <>
        <span className="bg-yellow-400 px-1 rounded">
          Pravega Racing’s web app
        </span>
        : fast, responsive, reliable, and globally connected. Enhanced and
        stylish visuals.
      </>
    ),
  },
];
