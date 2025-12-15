import './style.css'
import gsap from "gsap";


gsap.to(
  ".box--to", // Sélecteur de l'élément à animer
  {
    x: "800%",
    rotation: 360,
    duration: 2,
    backgroundColor: "#8d3dae",
  }
);