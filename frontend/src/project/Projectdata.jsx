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
export const projectData = [//update this to change projects
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
        In collaboration with the{" "}
        <span className="bg-yellow-400 px-1 rounded">
          Airports Authority of India
        </span>
        , focused on modernizing and streamlining operations and services via MIS 
        and Multimodal Transport System.”
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
        Securing a top spot at{" "}
        <span className="bg-yellow-400 px-1 rounded">
          IIT Kanpur’s Techkriti
        </span>{" "}
        festival highlighted our members’ creativity, technical skills, and
        culture of excellence.
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
        Our laundry management platform serves{" "}
        <span className="bg-yellow-400 px-1 rounded">80,000+ users</span> with
        real-time tracking, notifications, and record management, making the
        process stress-free.
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
        We helped build a fast, responsive, and visually enhanced app for{" "}
        <span className="bg-yellow-400 px-1 rounded">Pravega Racing</span>,
        ensuring seamless global connectivity for the team.
      </>
    ),
  },
];
