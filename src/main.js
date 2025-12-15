import './style.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import champSvgRaw from './assets/SVG/champ.svg?raw';
import usineSvgRaw from './assets/SVG/usine.svg?raw';
import moderneSvgRaw from './assets/SVG/moderne.svg?raw';
import routeSvgRaw from './assets/SVG/route.svg?raw';
import voitureSvgRaw from './assets/SVG/voiture.svg?raw';
import veloSvgRaw from './assets/SVG/velo.svg?raw';
import marcSvgRaw from './assets/SVG/marc.svg?raw';

gsap.registerPlugin(ScrollTrigger);

function injectSvg(id, rawContent, etirer = false) {
  const container = document.getElementById(id);
  if (container) {
    container.innerHTML = rawContent;
    const svgEl = container.querySelector('svg');
    if (svgEl) {
      svgEl.classList.add('illustration-svg');
      svgEl.style.overflow = 'visible';
      if (etirer) {
         svgEl.setAttribute('preserveAspectRatio', 'none'); 
      }
    }
    return container;
  }
  return null;
}

injectSvg('container-svg-champ', champSvgRaw);
injectSvg('container-svg-usine', usineSvgRaw);
injectSvg('container-svg-voiture', voitureSvgRaw);
injectSvg('container-svg-velo', veloSvgRaw);
injectSvg('container-svg-marc', marcSvgRaw);

// MODERNE (Logique fenêtres inchangée)
const containerModerne = document.getElementById('container-svg-moderne');
if (containerModerne) {
  containerModerne.innerHTML = moderneSvgRaw;
  const svgEl = containerModerne.querySelector('svg');
  if(svgEl) svgEl.classList.add('illustration-svg');
  
  setTimeout(() => {
      const elementsPotentiels = containerModerne.querySelectorAll('[fill="#ffbf02"], [fill="#6904d4"]');
      const fenetresDuBas = [];
      elementsPotentiels.forEach((el) => {
        const bbox = el.getBBox();
        if (bbox.y > 150 && bbox.width < 40 && bbox.height < 40) {
            fenetresDuBas.push(el);
        }
      });
      fenetresDuBas.forEach(el => { gsap.set(el, { fill: '#ffbf02' }); el.isOff = false; });
      let nbFenetresEteintes = 0;
      const MAX_ETEINTES = 3; 
      function cycleClignotement() {
          if (nbFenetresEteintes < MAX_ETEINTES) {
              const fenetresDisponibles = fenetresDuBas.filter(el => !el.isOff);
              if (fenetresDisponibles.length > 0) {
                  const indexHasard = Math.floor(Math.random() * fenetresDisponibles.length);
                  eteindreFenetre(fenetresDisponibles[indexHasard]);
              }
          }
          gsap.delayedCall(gsap.utils.random(0.1, 0.4), cycleClignotement);
      }
      function eteindreFenetre(el) {
          el.isOff = true; nbFenetresEteintes++;
          gsap.to(el, { fill: '#6904d4', duration: 0.1, onComplete: () => { gsap.delayedCall(gsap.utils.random(0.5, 2.5), () => rallumerFenetre(el)); }});
      }
      function rallumerFenetre(el) {
          gsap.to(el, { fill: '#ffbf02', duration: 0.1, onComplete: () => { el.isOff = false; nbFenetresEteintes--; }});
      }
      cycleClignotement();
  }, 100); 
}

// Injections Route
injectSvg('road-1', routeSvgRaw, true);
injectSvg('road-2', routeSvgRaw, true);


// --- 1. ANIMATION SCROLL HORIZONTAL ---
let sections = gsap.utils.toArray(".panel");

gsap.to(".horizontal-container", {
  xPercent: -50, 
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-scroll-wrapper",
    pin: true, 
    scrub: 1, 
    snap: 1 / (sections.length - 1),
    end: "+=2000", 
  }
});


// --- 2. ANIMATIONS CLASSIQUES ---
document.querySelectorAll('.slide-from-left').forEach((el) => {
  gsap.fromTo(el, { x: -150, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 15%", toggleActions: "play reverse play reverse" } });
});
document.querySelectorAll('.slide-from-right').forEach((el) => {
  gsap.fromTo(el, { x: 150, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 15%", toggleActions: "play reverse play reverse" } });
});
gsap.utils.toArray('.timeline-marker').forEach(marker => {
    gsap.from(marker, { scale: 0, rotation: -180, duration: 0.8, ease: "back.out(1.7)", scrollTrigger: { trigger: marker, start: "top 85%", end: "bottom 15%", toggleActions: "play reverse play reverse" } });
});

gsap.to("#nuage", { x: 50, duration: 15, repeat: -1, yoyo: true, ease: "sine.inOut" });

const containerUsine = document.getElementById('container-svg-usine');
if (containerUsine) {
    const fumeeCercles = containerUsine.querySelectorAll('circle');
    fumeeCercles.forEach((cercle) => {
        gsap.fromTo(cercle, { y: 0, x: 0, opacity: "random(0.1, 0.2)", scale: "random(0.2, 0.4)", transformOrigin: "50% 50%" }, { y: "random(-80, -120)", x: "random(-20, 20)", opacity: 0, scale: "random(1.2, 1.8)", duration: "random(2.5, 4.5)", delay: "random(0, 2)", repeat: -1, ease: "power1.out" });
    });
}

// Transport
gsap.to(".road-scroller", { x: "-50%", duration: 3, ease: "none", repeat: -1 });
gsap.fromTo("#container-svg-voiture", { y: 0 }, { y: 1.5, duration: 0.1, repeat: -1, yoyo: true, ease: "linear" });
gsap.fromTo("#container-svg-velo", { y: 0, rotation: 0 }, { y: -2, rotation: 1, duration: 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" });

gsap.utils.toArray('.slide-up').forEach(el => {
    gsap.from(el, { y: 50, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play reverse play reverse" } });
});

const marcContainer = document.getElementById('container-svg-marc');
if (marcContainer) {
    gsap.to(marcContainer, { y: -5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
}