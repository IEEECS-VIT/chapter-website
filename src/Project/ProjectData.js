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
    images: [coverImg1, coverImg2, coverImg3]
  },
  {
    id: 1,
    title: "Kalaburagi Airport Project",
    image: airport,
    text1: "The Kalaburagi Airport Project integrates technology to enhance airport operations and the travel experience.This tech-driven solution is setting new standards in airport efficiency and passenger convenience"
  },
  {
    id: 2,
    title: "IIT Kanpur TechKriti",
    image: iitk,
    text1: "An intuitive recruitment platform that simplifies hiring with seamless application tracking and candidate management. It also offers analytics to help HR teams make informed decisions quickly."
  },
  {
    id: 3,
    title: "Chota Dhobi App",
    image: cd,
    text1: "A convenient laundry service app connecting users with local providers for quick and reliable cleaning. Users can schedule pickups and deliveries easily through an intuitive interface."
  },
  {
    id: 4,
    title: "Pravega Racing Web App",
    image: pravega,
    text1: "A dynamic web application for Pravega Racing, providing live updates, stats, and interactive user engagement. It includes user dashboards and notifications to keep participants informed in real-time."
  }
];