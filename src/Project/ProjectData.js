import airport from "../assets/airport.png";
import coverBg from "../assets/cover-bg.png";
import coverImg1 from "../assets/cover1.png";
import coverImg2 from "../assets/cover2.png";
import coverImg3 from "../assets/cover3.png";
import iitk from "../assets/techkriti.jpg";
import cd from "../assets/cd.png";
import pravega from "../assets/pravega.png";
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
    text1: "The Kalaburagi Airport Project integrates technology to enhance airport operations and the travel experience."
  },
  {
    id: 2,
    title: "IIT Kanpur TechKriti",
    image: iitk,
    text1: "Participated in Techkriti and secured a top position, showcasing innovation and technical excellence."
  },
  {
    id: 3,
    title: "Chota Dhobi App",
    image: cd,
    text1: "With 80,000+ students having used the platform and 5000 daily users, it ensures efficient tracking, notifications,and record management. "
  },
  {
    id: 4,
    title: "Pravega Racing Web App",
    image: pravega,
    text1: "Pravega Racing’s web app: fast, responsive, reliable, and globally connected. Enhanced and stylish visuals."
  }
];