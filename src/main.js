import './variables.css';
import './reset.css';
import './style.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// =========================================
// SÉLECTION DES ÉLÉMENTS (Plus d'injections)
// =========================================

const champContainer = document.getElementById('container-svg-champ');
const containerUsine = document.getElementById('container-svg-usine');
const containerModerne = document.getElementById('container-svg-moderne');
const marcHeaderContainer = document.getElementById('header-marc');
const marcPrinterContainer = document.getElementById('container-svg-marc-printer-combined');
const pcAllumeContainer = document.getElementById('container-svg-pcallume');
const marcContainer = document.getElementById('container-svg-marc'); // Marc dans la carte info
const poidContainer = document.getElementById('container-svg-588kg');

// =========================================
// 2. ANIMATION HEADER - MARC FLOTTANT
// =========================================

// =========================================
// 3. ANIMATION CHAMP (NUAGES & PAYSANS)
// =========================================
if (champContainer) {
    const nuages = champContainer.querySelectorAll('[fill="#ffffff"], [fill="#FFFFFF"], [fill="#ededed"], [fill="#f2eade"]');
    if (nuages.length > 0) {
        gsap.to(nuages, {
            x: 40, 
            duration: 8, 
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    }

    // Petit délai pour s'assurer que le DOM est prêt (même si en inline c'est immédiat)
    setTimeout(() => {
        const elementsJaunes = champContainer.querySelectorAll('[fill="#ffbf02"]');
        
        elementsJaunes.forEach((el) => {
            const bbox = el.getBBox();

            if (bbox.width < 50) {
                gsap.to(el, {
                    y: -3,
                    rotation: 5,
                    transformOrigin: "center center",
                    duration: 0.6,
                    yoyo: true,
                    repeat: -1,
                    ease: "power1.inOut",
                    delay: Math.random()
                });
            } else {
                gsap.to(el, {
                    rotation: 360,
                    transformOrigin: "center center",
                    duration: 120,
                    repeat: -1,
                    ease: "none"
                });
            }
        });
    }, 100);
}


// =========================================
// 4. ANIMATION USINE FUMÉE
// =========================================
if (containerUsine) {
    const fumeeCercles = containerUsine.querySelectorAll('circle');
    fumeeCercles.forEach((cercle) => {
        gsap.fromTo(cercle, { y: 0, x: 0, opacity: "random(0.1, 0.2)", scale: "random(0.2, 0.4)", transformOrigin: "50% 50%" }, { y: "random(-80, -120)", x: "random(-20, 20)", opacity: 0, scale: "random(1.2, 1.8)", duration: "random(2.5, 4.5)", delay: "random(0, 2)", repeat: -1, ease: "power1.out" });
    });
}


// =========================================
// 5. ANIMATION BÂTIMENT MODERNE (FENÊTRES)
// =========================================

// On s'assure d'avoir la variable (si tu l'as déjà déclarée plus haut, garde ta déclaration)
const batimentModerne = document.querySelector('#container-svg-moderne');

if (batimentModerne) {
    // 1. On cible uniquement les fenêtres jaunes
    const fenetres = batimentModerne.querySelectorAll('[fill="#ffbf02"]');

    // 2. On lance l'animation pour chaque fenêtre
    fenetres.forEach(fenetre => {
        
        // On calcule les temps AVANT pour être sûr que chaque fenêtre est unique
        const delaiAleatoire = gsap.utils.random(0, 5); // Délai de départ (0 à 5 sec)
        const pauseAleatoire = gsap.utils.random(2, 5); // Pause entre clignotements

        gsap.to(fenetre, {
            fill: "#2A1A36",       // Devient violet (éteint)
            stroke: "#2A1A36",     // <--- AJOUT : Le contour devient AUSSI violet (pour l'effacer visuellement)
            duration: 0.2,         // Vitesse extinction (rapide)
            repeat: -1,            // Infini
            yoyo: true,            // Aller-retour
            
            // On applique les valeurs calculées
            delay: delaiAleatoire,      
            repeatDelay: pauseAleatoire 
        });
    });
}

// =========================================
// 6. ANIMATIONS SLIDES ET TIMELINE
// =========================================
document.querySelectorAll('.slide-from-left').forEach((el) => {
  gsap.fromTo(el, 
    { x: -150, opacity: 0 }, 
    { 
        x: 0, opacity: 1, duration: 1, ease: "power3.out", 
        scrollTrigger: { 
            trigger: el, 
            start: "top 85%", 
            toggleActions: "play none none reverse" 
        } 
    }
  );
});

document.querySelectorAll('.slide-from-right').forEach((el) => {
  gsap.fromTo(el, 
    { x: 150, opacity: 0 }, 
    { 
        x: 0, opacity: 1, duration: 1, ease: "power3.out", 
        scrollTrigger: { 
            trigger: el, 
            start: "top 85%", 
            toggleActions: "play none none reverse" 
        } 
    }
  );
});

gsap.utils.toArray('.timeline__marker').forEach(marker => {
    gsap.from(marker, { 
        scale: 0, rotation: -180, duration: 0.8, ease: "back.out(1.7)", 
        scrollTrigger: { 
            trigger: marker, 
            start: "top 85%", 
            toggleActions: "play none none reverse" 
        } 
    });
});

gsap.utils.toArray('.slide-up').forEach(el => {
    gsap.from(el, { 
        y: 50, opacity: 0, duration: 0.8, ease: "power2.out", 
        scrollTrigger: { 
            trigger: el, 
            start: "top 90%", 
            toggleActions: "play none none reverse" 
        } 
    });
});


// =========================================
// 7. ANIMATION SCROLL HORIZONTAL
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
// 8. ANIMATIONS TRANSPORT
// =========================================
gsap.to(".transport__road", { x: "-50%", duration: 3, ease: "none", repeat: -1 });
gsap.fromTo("#container-svg-voiture", { y: 0 }, { y: 1.5, duration: 0.1, repeat: -1, yoyo: true, ease: "linear" });
gsap.fromTo("#container-svg-velo", { y: 0, rotation: 0 }, { y: -2, rotation: 1, duration: 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" });






// =========================================
// 10. ANIMATION ORDINATEUR (POIDS)
// =========================================
if (poidContainer) {
    const sectionOrdinateur = document.querySelector('.computer');
    
    const tlPoids = gsap.timeline({
        scrollTrigger: {
            trigger: ".computer", 
            start: "top 40%", 
            toggleActions: "play none none reverse",
            markers: false
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
// 11. ANIMATION IMPRESSION (BOULETTE)
// =========================================
function throwPaperBall() {
    const boulette = document.getElementById('container-svg-boulette');
    if (!boulette) return;

    gsap.set(boulette, { x: 40, y: 0, opacity: 1, scale: 1, rotation: 0 });

    const tlThrow = gsap.timeline({
        onComplete: () => {
             gsap.set(boulette, { opacity: 0 }); 
        }
    });

    tlThrow.to(boulette, {
        x: -360, 
        duration: 0.6,
        ease: "power1.in"
    }, 0);

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

    tlThrow.to(boulette, {
        rotation: -720,
        duration: 0.6,
        ease: "none"
    }, 0);

    tlThrow.to(boulette, {
        opacity: 0,
        duration: 0.1
    }, 0.55);
}

if (marcPrinterContainer) {
    const marcBeaver = marcPrinterContainer.querySelector('#Calque_12');
    
    if (marcBeaver) {
        const tlJump = gsap.timeline({ repeat: -1 });

        tlJump.to(marcBeaver, {
            y: -25,
            duration: 0.6, 
            ease: "power1.out"
        });

        tlJump.to(marcBeaver, {
            y: 0,
            duration: 0.6, 
            ease: "power1.in"
        });

        tlJump.call(throwPaperBall);
    }
}


// =========================================
// 12. ANIMATION FEUILLES (SORTIE DE DERRIÈRE)
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
// 13. ANIMATION FUMÉE RADIATEUR CHAUD
// =========================================
const hotRadiatorVisual = document.querySelector('.consumption__actions .action-card:first-child .action-card__visual');

if (hotRadiatorVisual) {
    const smokeWrapper = document.createElement('div');
    smokeWrapper.classList.add('smoke-wrapper');

    const numParticles = 12;
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('span');
        particle.classList.add('smoke-particle');
        smokeWrapper.appendChild(particle);
    }

    hotRadiatorVisual.appendChild(smokeWrapper);

    const particles = smokeWrapper.querySelectorAll('.smoke-particle');

    particles.forEach(particle => {
        gsap.set(particle, { xPercent: -50, y: 0, scale: 0.5, opacity: 0 });

        const tl = gsap.timeline({ repeat: -1, delay: gsap.utils.random(0, 2) });

        tl.to(particle, {
            duration: gsap.utils.random(2, 4),
            y: gsap.utils.random(-100, -150), 
            x: gsap.utils.random(-30, 30),     
            scale: gsap.utils.random(2, 3.5), 
            opacity: gsap.utils.random(0.4, 0.8), 
            ease: "power1.out"
        }, 0);

        tl.to(particle, {
            duration: 1,
            opacity: 0,
            ease: "power1.in"
        }, ">-1"); 
    });
}


// =========================================
// 14. ANIMATION EAU (GRILLE DE GOUTTES)
// =========================================
const waterGridContainer = document.getElementById('water-grid-container');
const tplGoute = document.getElementById('tpl-goute'); // On récupère le template

if (waterGridContainer && tplGoute) {
    const numCols = 5;
    const numRows = 7;
    const totalDrops = numCols * numRows;

    
    for (let i = 0; i < totalDrops; i++) {
        const dropSpan = document.createElement('span');
        dropSpan.classList.add('water-grid__drop');
        
        // On clone le contenu du template (le SVG que tu auras collé)
        const clone = tplGoute.content.cloneNode(true);
        dropSpan.appendChild(clone);
        
        waterGridContainer.appendChild(dropSpan);
    }

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
            from: 0,                 
            amount: 1.5               
        }
    });
}


// =========================================
// 15. ANIMATION CHECKLIST
// =========================================
gsap.from(".checklist__check", {
  scale: 0,
  rotation: -360,
  duration: 0.5,
  stagger: 0.2,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".checklist",
    start: "top 80%",
    toggleActions: "play none none reverse"
  }
});


// =========================================
// 16. ANIMATION BARRE DE PROGRESSION
// =========================================
gsap.to(".progress-line__fill", {
    height: "100%",
    ease: "none",
    scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0
    }
});