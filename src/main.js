// MODIFICATION : Import des 3 fichiers CSS dans l'ordre
import './variables.css';
import './reset.css';
import './style.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// (Le reste de ton fichier main.js reste exactement le même)
// ...
// ... Imports des SVGs existants ...
import champSvgRaw from './assets/SVG/champ.svg?raw';
import usineSvgRaw from './assets/SVG/usine.svg?raw';
import moderneSvgRaw from './assets/SVG/moderne.svg?raw';
import routeSvgRaw from './assets/SVG/route.svg?raw';
import voitureSvgRaw from './assets/SVG/voiture.svg?raw';
import veloSvgRaw from './assets/SVG/velo.svg?raw';
import marcSvgRaw from './assets/SVG/marc.svg?raw';

// Imports des SVGs (Computer)
import pcallumeSvgRaw from './assets/SVG/pcallume.svg?raw';
import pceteintSvgRaw from './assets/SVG/pceteint.svg?raw';
import pc2kgSvgRaw from './assets/SVG/pc2kg.svg?raw';
import poid588kgSvgRaw from './assets/SVG/588kg.svg?raw';

// Imports des SVGs IMPRESSION
import marcsurimprimanteSvgRaw from './assets/SVG/marcsurimprimante.svg?raw';
import poubelleSvgRaw from './assets/SVG/poubelle.svg?raw';
import feuilleSvgRaw from './assets/SVG/feuille.svg?raw';
import feuilleRougeSvgRaw from './assets/SVG/feuillerouge.svg?raw';
import bouletteSvgRaw from './assets/SVG/boulette.svg?raw';

// Imports SVG CONSOMMATION
import radiateurSvgRaw from './assets/SVG/radiateur.svg?raw';
import radiateurChaudSvgRaw from './assets/SVG/radiateurchaud.svg?raw';
import marcPullSvgRaw from './assets/SVG/marcpull.svg?raw';
import gouteSvgRaw from './assets/SVG/goute.svg?raw';
import bonhommeSvgRaw from './assets/SVG/bonhomme.svg?raw';

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

// =========================================
// 1. INJECTIONS SVG GÉNÉRALES
// =========================================
injectSvg('container-svg-champ', champSvgRaw);
injectSvg('container-svg-usine', usineSvgRaw);
injectSvg('container-svg-voiture', voitureSvgRaw);
injectSvg('container-svg-velo', veloSvgRaw);
injectSvg('container-svg-marc', marcSvgRaw);

// Injection de Marc dans le header
const marcHeaderContainer = injectSvg('header-marc', marcSvgRaw);

// Petite animation flottante pour Marc dans le header
if(marcHeaderContainer) {
    gsap.to(marcHeaderContainer, { y: -15, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
}

const pcAllumeContainer = injectSvg('container-svg-pcallume', pcallumeSvgRaw);
injectSvg('container-svg-pceteint', pceteintSvgRaw);
injectSvg('container-svg-pc2kg', pc2kgSvgRaw);
const poidContainer = injectSvg('container-svg-588kg', poid588kgSvgRaw);

// Injections Route
injectSvg('road-1', routeSvgRaw, true);
injectSvg('road-2', routeSvgRaw, true);

// =========================================
// 2. ANIMATION RESPIRATION (PC ALLUMÉ)
// =========================================
if (pcAllumeContainer) {
    const yellowParts = pcAllumeContainer.querySelectorAll('[fill="#ffbf02"]');
    if (yellowParts.length > 0) {
        gsap.to(yellowParts, {
            opacity: 0.4,
            duration: 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }
}


// =========================================
// 3. ANIMATION SCROLL HORIZONTAL
// =========================================
let sections = gsap.utils.toArray(".h-scroll__panel");

gsap.to(".h-scroll__container", {
  xPercent: -50, 
  ease: "none",
  scrollTrigger: {
    trigger: ".h-scroll", 
    pin: true, 
    scrub: 1, 
    snap: 1 / (sections.length - 1),
    end: "+=2000", 
  }
});


// =========================================
// 4. ANIMATIONS CLASSIQUES
// =========================================
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

document.querySelectorAll('.slide-from-left').forEach((el) => {
  gsap.fromTo(el, { x: -150, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 15%", toggleActions: "play reverse play reverse" } });
});
document.querySelectorAll('.slide-from-right').forEach((el) => {
  gsap.fromTo(el, { x: 150, opacity: 0 }, { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", end: "bottom 15%", toggleActions: "play reverse play reverse" } });
});
gsap.utils.toArray('.timeline__marker').forEach(marker => {
    gsap.from(marker, { scale: 0, rotation: -180, duration: 0.8, ease: "back.out(1.7)", scrollTrigger: { trigger: marker, start: "top 85%", end: "bottom 15%", toggleActions: "play reverse play reverse" } });
});

const containerUsine = document.getElementById('container-svg-usine');
if (containerUsine) {
    const fumeeCercles = containerUsine.querySelectorAll('circle');
    fumeeCercles.forEach((cercle) => {
        gsap.fromTo(cercle, { y: 0, x: 0, opacity: "random(0.1, 0.2)", scale: "random(0.2, 0.4)", transformOrigin: "50% 50%" }, { y: "random(-80, -120)", x: "random(-20, 20)", opacity: 0, scale: "random(1.2, 1.8)", duration: "random(2.5, 4.5)", delay: "random(0, 2)", repeat: -1, ease: "power1.out" });
    });
}

gsap.to(".transport__road", { x: "-50%", duration: 3, ease: "none", repeat: -1 });
gsap.fromTo("#container-svg-voiture", { y: 0 }, { y: 1.5, duration: 0.1, repeat: -1, yoyo: true, ease: "linear" });
gsap.fromTo("#container-svg-velo", { y: 0, rotation: 0 }, { y: -2, rotation: 1, duration: 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" });

gsap.utils.toArray('.slide-up').forEach(el => {
    gsap.from(el, { y: 50, opacity: 0, duration: 0.8, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play reverse play reverse" } });
});

const marcContainer = document.getElementById('container-svg-marc');
if (marcContainer) {
    gsap.to(marcContainer, { y: -5, duration: 2, repeat: -1, yoyo: true, ease: "sine.inOut" });
}


// =========================================
// 5. ANIMATION ORDINATEUR (POIDS)
// =========================================
if (poidContainer) {
    const sectionOrdinateur = document.querySelector('.computer');
    
    const tlPoids = gsap.timeline({
        scrollTrigger: {
            trigger: ".computer", 
            start: "top 40%", 
            toggleActions: "play none none reverse",
            markers: true 
        }
    });

    tlPoids.from("#container-svg-588kg", {
        y: -600,
        opacity: 0,
        duration: 0.8,
        ease: "expo.in"
    });

    tlPoids.add(() => {
        gsap.fromTo(sectionOrdinateur, 
            { x: -10, y: 5 }, 
            { x: 10, y: -5, duration: 0.1, repeat: 5, yoyo: true, clearProps: "x,y" }
        );
    });
    
    tlPoids.to("#container-svg-588kg", {
        y: -20, duration: 0.1, ease: "power1.out", yoyo: true, repeat: 1
    });
}

// =========================================
// 6. INJECTIONS SECTION IMPRESSION & ANIMATIONS
// =========================================
injectSvg('container-svg-poubelle', poubelleSvgRaw);
injectSvg('container-svg-feuille-seule', feuilleSvgRaw);
const bouletteContainer = injectSvg('container-svg-boulette', bouletteSvgRaw);
const marcPrinterContainer = injectSvg('container-svg-marc-printer-combined', marcsurimprimanteSvgRaw);


// FONCTION POUR LANCER LA BOULETTE (COURBE)
function throwPaperBall() {
    const boulette = document.getElementById('container-svg-boulette');
    if (!boulette) return;

    // Réinitialisation
    gsap.set(boulette, { x: 40, y: 0, opacity: 1, scale: 1, rotation: 0 });

    const tlThrow = gsap.timeline({
        onComplete: () => {
             gsap.set(boulette, { opacity: 0 }); 
        }
    });

    // 1. Déplacement horizontal
    tlThrow.to(boulette, {
        x: -320, 
        duration: 0.6,
        ease: "power1.in"
    }, 0);

    // 2. Trajectoire courbe
    tlThrow.to(boulette, {
        y: -110, 
        duration: 0.3,
        ease: "circ.out"
    }, 0);
    tlThrow.to(boulette, {
        y: 50,  
        duration: 0.3,
        ease: "circ.in"
    }, 0.3);

    // 3. Rotation
    tlThrow.to(boulette, {
        rotation: -720,
        duration: 0.6,
        ease: "none"
    }, 0);

    // 4. Disparition
    tlThrow.to(boulette, {
        opacity: 0,
        duration: 0.1
    }, 0.55);
}


// Animation : SEULEMENT MARC saute (#Calque_12)
if (marcPrinterContainer) {
    const marcBeaver = marcPrinterContainer.querySelector('#Calque_12');
    
    if (marcBeaver) {
        const tlJump = gsap.timeline({ repeat: -1 });

        // Saut vers le haut - RALENTI
        tlJump.to(marcBeaver, {
            y: -25,
            duration: 0.6, // Changé de 0.35 à 0.6
            ease: "power1.out"
        });

        // Retombée vers le bas - RALENTI
        tlJump.to(marcBeaver, {
            y: 0,
            duration: 0.6, // Changé de 0.35 à 0.6
            ease: "power1.in"
        });

        // Lancement de la boulette synchronisé
        tlJump.call(throwPaperBall);
    }
}


// Injection de la grille de papiers (1 rouge, 5 blanches)
injectSvg('container-svg-feuille-rouge', feuilleRougeSvgRaw);
for (let i = 1; i <= 5; i++) {
    injectSvg(`container-svg-feuille-${i}`, feuilleSvgRaw);
}


// =========================================
// 7. ANIMATION FEUILLES (SORTIE DE DERRIÈRE)
// =========================================
const paperGrid = document.querySelector('.paper-grid');
const redPaper = document.getElementById('container-svg-feuille-rouge');

const whitePapers = [];
for (let i = 1; i <= 5; i++) {
    const paper = document.getElementById(`container-svg-feuille-${i}`);
    if (paper) whitePapers.push(paper);
}

if (paperGrid && redPaper && whitePapers.length > 0) {
    
    const tlPapers = gsap.timeline({
        scrollTrigger: {
            trigger: ".printing__footer", 
            start: "top 85%",             
            toggleActions: "play none none reverse" 
        }
    });

    gsap.set(redPaper, { zIndex: 10, position: 'relative' });

    tlPapers.fromTo(whitePapers, 
        {
            opacity: 0,
            scale: 0.2,      
            x: -60,          
            y: -50,          
            rotation: -15,   
            zIndex: 1        
        },
        {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.6,
            ease: "back.out(1.5)", 
            stagger: 0.15,
            delay: 1 
        }
    );
}

// =========================================
// 8. INJECTIONS SECTION CONSOMMATION & ANIMATION EAU
// =========================================

// Radiateur Chaud + Marc Normal (Gauche)
injectSvg('container-svg-radiateur-chaud', radiateurChaudSvgRaw);
injectSvg('container-svg-marc-normal', marcSvgRaw);

// Radiateur Normal + Marc Pull (Droite)
injectSvg('container-svg-radiateur-normal', radiateurSvgRaw);
injectSvg('container-svg-marc-pull', marcPullSvgRaw);

// Bonhomme
injectSvg('container-svg-bonhomme', bonhommeSvgRaw);

// Injection et Animation de la grille de gouttes d'eau
const waterGridContainer = document.getElementById('water-grid-container');
if (waterGridContainer) {
    const numCols = 5;
    const numRows = 7;
    const totalDrops = numCols * numRows; // 35

    // 1. Génération des gouttes
    for (let i = 0; i < totalDrops; i++) {
        const dropSpan = document.createElement('span');
        dropSpan.classList.add('water-grid__drop');
        dropSpan.innerHTML = gouteSvgRaw;
        
        // Optimisation SVG
        const svgEl = dropSpan.querySelector('svg');
        if(svgEl) {
            svgEl.classList.add('illustration-svg');
            svgEl.style.overflow = 'visible';
        }
        
        waterGridContainer.appendChild(dropSpan);
    }

    // 2. Animation GSAP en escalier (Sens normal : Haut-Gauche vers Bas-Droite)
    const drops = waterGridContainer.querySelectorAll('.water-grid__drop');

    gsap.from(drops, {
        scrollTrigger: {
            trigger: ".water-usage",
            start: "top 80%",        
            toggleActions: "play none none reverse" 
        },
        opacity: 0,
        scale: 0, 
        y: 20,    
        duration: 0.5,
        ease: "back.out(1.7)", 
        stagger: {
            grid: [numRows, numCols], 
            from: 0,                  // CHANGEMENT ICI : 0 = Index de départ (Haut-Gauche)
            amount: 1.5               
        }
    });
}

// =========================================
// 9. ANIMATION FUMÉE RADIATEUR CHAUD
// =========================================

// On cible le conteneur visuel du premier radiateur (le chaud)
const hotRadiatorVisual = document.querySelector('.consumption__actions .action-card:first-child .action-card__visual');

if (hotRadiatorVisual) {
    // Création du conteneur de fumée
    const smokeWrapper = document.createElement('div');
    smokeWrapper.classList.add('smoke-wrapper');

    // On génère X particules de fumée
    const numParticles = 12;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('span');
        particle.classList.add('smoke-particle');
        smokeWrapper.appendChild(particle);
    }

    // On insère la fumée dans le visuel
    hotRadiatorVisual.appendChild(smokeWrapper);

    // Animation GSAP des particules
    const particles = smokeWrapper.querySelectorAll('.smoke-particle');

    particles.forEach(particle => {
        // Reset initial
        gsap.set(particle, { xPercent: -50, y: 0, scale: 0.5, opacity: 0 });

        // Création d'une timeline infinie pour chaque particule avec des valeurs aléatoires
        const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 2) });

        tl.to(particle, {
            duration: gsap.utils.random(2, 4),
            y: gsap.utils.random(-100, -150), // Monte entre 100px et 150px vers le haut
            x: gsap.utils.random(-30, 30),    // Dérive légère à gauche ou droite
            scale: gsap.utils.random(2, 3.5), // Grossit
            opacity: gsap.utils.random(0.4, 0.8), // Devient visible...
            ease: "power1.out"
        }, 0);

        // Disparition progressive à la fin du mouvement
        tl.to(particle, {
            duration: 1,
            opacity: 0,
            ease: "power1.in"
        }, ">-1"); // Commence 1 seconde avant la fin de l'anim précédente
    });
}