import airport from './airport.png';
import coverBg from './cover-bg.png';
import coverImg1 from './cover1.png';
import coverImg2 from './cover2.png';
import coverImg3 from './cover3.png';

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
    title: "The Airport Project",
    image: airport,
    text1: "A modern airport management system designed to streamline operations and enhance passenger experience. It integrates real-time flight tracking and automated scheduling for improved efficiency."
  },
  {
    id: 2,
    title: "Recruitment Portal",
    image: airport,
    text1: "An intuitive recruitment platform that simplifies hiring with seamless application tracking and candidate management. It also offers analytics to help HR teams make informed decisions quickly."
  },
  {
    id: 3,
    title: "HackBattle '24 Website",
    image: airport,
    text1: "Official website for HackBattle '24, showcasing event details, challenges, and participant registrations. The platform also features live updates and leaderboards during the competition."
  },
  {
    id: 4,
    title: "Chota Dhobi App",
    image: airport,
    text1: "A convenient laundry service app connecting users with local providers for quick and reliable cleaning. Users can schedule pickups and deliveries easily through an intuitive interface."
  },
  {
    id: 5,
    title: "Travarca Raging Web App",
    image: airport,
    text1: "A dynamic web application for Travarca Raging, providing live updates, stats, and interactive user engagement. It includes user dashboards and notifications to keep participants informed in real-time."
  }
];