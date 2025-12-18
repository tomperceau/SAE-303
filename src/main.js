import './variables.css';
import './reset.css';
import './style.css';

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const champContainer = document.querySelector('.timeline__illustration--farm');
const containerUsine = document.querySelector('.timeline__illustration--factory');
const containerModerne = document.querySelector('.timeline__illustration--modern');
const marcPrinterContainer = document.querySelector('.printing__icon--marc-printer');
const poidContainer = document.querySelector('.weight-comp__icon--big');
const waterGridContainer = document.querySelector('.water-usage__grid');
const tplGoute = document.querySelector('#tpl-goute');


// arret des animations en mobile

let mm = gsap.matchMedia();

mm.add("(min-width: 769px)", () => {

    // animation champ

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

    // 4. animation usine fumée

    if (containerUsine) {
        const fumeeCercles = containerUsine.querySelectorAll('circle');
        fumeeCercles.forEach((cercle) => {
            gsap.fromTo(cercle, 
                { y: 0, x: 0, opacity: gsap.utils.random(0.1, 0.2), scale: gsap.utils.random(0.2, 0.4), transformOrigin: "50% 50%" }, 
                { y: gsap.utils.random(-80, -120), x: gsap.utils.random(-20, 20), opacity: 0, scale: gsap.utils.random(1.2, 1.8), duration: gsap.utils.random(2.5, 4.5), delay: gsap.utils.random(0, 2), repeat: -1, ease: "power1.out" }
            );
        });
    }


    // animation bâtiment moderne (fenêtres)

    if (containerModerne) {
        const fenetres = containerModerne.querySelectorAll('[fill="#ffbf02"]');
        
        fenetres.forEach(fenetre => {
            gsap.to(fenetre, {
                fill: "#6904d4",       
                stroke: "#6904d4",
                duration: 0.2,
                repeat: -1,
                yoyo: true,
                delay: gsap.utils.random(0, 5),      
                repeatDelay: gsap.utils.random(2, 10) 
            });
        });
    }

    // animation timeline

    document.querySelectorAll('.slide-from-left').forEach((el) => {
        gsap.fromTo(el, 
            { x: -150, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
        );
    });

    document.querySelectorAll('.slide-from-right').forEach((el) => {
        gsap.fromTo(el, 
            { x: 150, opacity: 0 }, 
            { x: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" } }
        );
    });

    gsap.utils.toArray('.timeline__marker').forEach(marker => {
        gsap.from(marker, { 
            scale: 0, rotation: -180, duration: 0.8, ease: "back.out(1.7)", 
            scrollTrigger: { trigger: marker, start: "top 85%", toggleActions: "play none none reverse" } 
        });
    });

    gsap.utils.toArray('.slide-up').forEach(el => {
        gsap.from(el, { 
            y: 50, opacity: 0, duration: 0.8, ease: "power2.out", 
            scrollTrigger: { trigger: el, start: "top 90%", toggleActions: "play none none reverse" } 
        });
    });


    // animation scroll horizontal

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


    // animation transport

    gsap.to(".transport__road", { x: "-50%", duration: 3, ease: "none", repeat: -1 });
    gsap.fromTo("#container-svg-voiture", { y: 0 }, { y: 1.5, duration: 0.1, repeat: -1, yoyo: true, ease: "linear" });
    gsap.fromTo("#container-svg-velo", { y: 0, rotation: 0 }, { y: -2, rotation: 1, duration: 0.25, repeat: -1, yoyo: true, ease: "sine.inOut" });

    // animation ordinateur (poids)

    if (poidContainer) {
        const sectionOrdinateur = document.querySelector('.computer');
        const tlPoids = gsap.timeline({
            scrollTrigger: { trigger: ".computer", start: "top 40%", toggleActions: "play none none reverse", markers: false }
        });

        tlPoids.from("#container-svg-588kg", { y: -600, opacity: 0, duration: 0.8, ease: "expo.in" });

        tlPoids.add(() => {
            gsap.fromTo(sectionOrdinateur, { x: -10, y: 5 }, { x: 10, y: -5, duration: 0.1, repeat: 5, yoyo: true, clearProps: "x,y" });
        });
        
        tlPoids.to("#container-svg-588kg", { y: -20, duration: 0.1, ease: "power1.out", yoyo: true, repeat: 1 });
    }

    // animation impression

    function throwPaperBall() {
        const boulette = document.getElementById('container-svg-boulette');
        if (!boulette) return;

        gsap.set(boulette, { x: 40, y: 0, opacity: 1, scale: 1, rotation: 0 });

        const tlThrow = gsap.timeline({
            onComplete: () => { gsap.set(boulette, { opacity: 0 }); }
        });

        tlThrow.to(boulette, { x: -360, duration: 0.6, ease: "power1.in" }, 0);
        tlThrow.to(boulette, { y: -110, duration: 0.3, ease: "circ.out" }, 0);
        tlThrow.to(boulette, { y: 50, duration: 0.3, ease: "circ.in" }, 0.3);
        tlThrow.to(boulette, { rotation: -720, duration: 0.6, ease: "none" }, 0);
        tlThrow.to(boulette, { opacity: 0, duration: 0.1 }, 0.55);
    }

    if (marcPrinterContainer) {
        const marcBeaver = marcPrinterContainer.querySelector('#Calque_12');
        if (marcBeaver) {
            const tlJump = gsap.timeline({ repeat: -1 });
            tlJump.to(marcBeaver, { y: -25, duration: 0.6, ease: "power1.out" });
            tlJump.to(marcBeaver, { y: 0, duration: 0.6, ease: "power1.in" });
            tlJump.call(throwPaperBall);
        }
    }

    // animation des feuilles
    const paperGrid = document.querySelector('.paper-grid');
    const redPaper = document.getElementById('container-svg-feuille-rouge');
    const whitePapers = [];
    for (let i = 1; i <= 5; i++) {
        const paper = document.getElementById(`container-svg-feuille-${i}`);
        if (paper) whitePapers.push(paper);
    }

    if (paperGrid && redPaper && whitePapers.length > 0) {
        const tlPapers = gsap.timeline({
            scrollTrigger: { trigger: ".printing__footer", start: "top 85%", toggleActions: "play none none reverse" }
        });

        gsap.set(redPaper, { zIndex: 10, position: 'relative' });

        tlPapers.fromTo(whitePapers, 
            { opacity: 0, scale: 0.2, x: -60, y: -50, rotation: -15, zIndex: 1 },
            { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0, duration: 0.6, ease: "back.out(1.5)", stagger: 0.15, delay: 0.5 }
        );
    }


    // 14. animation eau
    if (waterGridContainer && tplGoute) {
        waterGridContainer.innerHTML = ''; 
        
        const numCols = 5;
        const numRows = 7;
        const totalDrops = numCols * numRows;

        for (let i = 0; i < totalDrops; i++) {
            const dropSpan = document.createElement('span');
            dropSpan.classList.add('water-grid__drop');
            const clone = tplGoute.content.cloneNode(true);
            dropSpan.appendChild(clone);
            waterGridContainer.appendChild(dropSpan);
        }

        const drops = waterGridContainer.querySelectorAll('.water-grid__drop');
        gsap.from(drops, {
            scrollTrigger: { trigger: ".water-usage", start: "top 80%", toggleActions: "play none none reverse" },
            opacity: 0, scale: 0, y: 20, duration: 0.5, ease: "back.out(1.7)", stagger: { grid: [numRows, numCols], from: 0, amount: 1.5 }
        });
    }

    // animation checklist
    gsap.from(".checklist__check", {
        scale: 0, rotation: -360, duration: 0.5, stagger: 0.2, ease: "back.out(1.7)",
        scrollTrigger: { trigger: ".checklist", start: "top 80%", toggleActions: "play none none reverse" }
    });

    // animation barre de progression
    gsap.to(".progress-line__fill", {
        height: "100%", ease: "none",
        scrollTrigger: { trigger: "body", start: "top top", end: "bottom bottom", scrub: 0 }
    });

});