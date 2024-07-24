import Nico from "@/public/images/user/Nico.jpeg";
import Srushti from "@/public/images/user/Srushti.png";
import Shahnawaz from "@/public/images/user/Shahnawaz.jpeg";
import { Testimonial } from "@/types/testimonial";

export const testimonialData: Testimonial[] = [
  {
    id: 1,
    name: "Nicolas Quiroga",
    designation: "Full stack developer",
    image: Nico,
    content:
      "TimeOff has been a game-changer for our team. It streamlines the process of requesting and tracking time off, making it easy for both managers and team members. The user-friendly interface and intuitive features have made managing vacations a breeze.",
  },
  {
    id: 2,
    name: "Srushti Salke",
    designation: "Team lead @Nvidia",
    image: Srushti,
    content:
      "As a team leader, TimeOff has made my job so much easier. I can quickly see who is available and who is on vacation, allowing me to plan projects more effectively. The app's simplicity and efficiency have saved me valuable time and reduced administrative burden.",
  },
  {
    id: 3,
    name: "Shahnawaz",
    designation: "Designer @Apple",
    image: Shahnawaz,
    content:
      "Since implementing TimeOff, our team has experienced a significant improvement in communication and coordination. We can easily stay organized and ensure that everyone's time off requests are managed smoothly. It's a must-have tool for any company looking to streamline their time off management process.",
  },
 
];
