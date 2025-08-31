import airport from "./assets/airport.png";
import coverBg from "./assets/cover-bg.png";
import coverImg1 from "./assets/cover1.png";
import coverImg2 from "./assets/cover2.png";
import coverImg3 from "./assets/cover3.png";
import iitk from "./assets/techkriti.jpg";
import cd from "./assets/cd.png";
import pravega from "./assets/pravega.png";


export const projectData = [
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
    textBlocks: [
      { type: "normal", content: "The Kalaburagi Airport Project integrates technology to enhance " },
      { type: "highlight", content: "airport" },
      { type: "normal", content: " operations and the " },
      { type: "normal", content: "travel experience" },
      { type: "normal", content: ". This tech-driven solution is setting new standards in " },
      { type: "normal", content: "airport efficiency" },
      { type: "normal", content: " and passenger convenience." },
    ],
  },
  {
    id: 2,
    title: "IIT Kanpur TechKriti",
    image: iitk,
    textBlocks: [
      { type: "normal", content: "An intuitive recruitment platform that simplifies hiring with seamless " },
      { type: "normal", content: "application tracking" },
      { type: "normal", content: " and candidate " },
      { type: "highlight", content: "management" },
      { type: "normal", content: ". It also offers " },
      { type: "normal", content: "analytics" },
      { type: "normal", content: " to help HR teams make informed decisions quickly." },
    ],
  },
  {
    id: 3,
    title: "Chota Dhobi App",
    image: cd,
    textBlocks: [
      { type: "normal", content: "A convenient laundry service app connecting users with local providers for quick and reliable " },
      { type: "normal", content: "cleaning" },
      { type: "normal", content: ". Users can schedule pickups and " },
      { type: "highlight", content: "deliveries" },
      { type: "normal", content: " easily through an intuitive interface." },
    ],
  },
  {
    id: 4,
    title: "Pravega Racing Web App",
    image: pravega,
    textBlocks: [
      { type: "normal", content: "A dynamic web application for Pravega Racing, providing " },
      { type: "normal", content: "live updates" },
      { type: "normal", content: ", " },
      { type: "normal", content: "stats" },
      { type: "normal", content: ", and interactive user engagement. It includes user " },
      { type: "highlight", content: "dashboards" },
      { type: "normal", content: " and " },
      { type: "normal", content: "notifications" },
      { type: "normal", content: " to keep participants informed in real-time." },
    ],
  },
];