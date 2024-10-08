//window.onbeforeunload = function () {
//window.scrollTo(0, 0);
//}

window.addEventListener("DOMContentLoaded", (event) => {
// Delay execution for preloader animation
setTimeout(() => {
    // Ensure GSAP and plugins are loaded
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof SplitType === "undefined") {
        console.error("GSAP, ScrollTrigger, or SplitType is not loaded.");
        return;
    }

    // Register ScrollTrigger plugin with GSAP
    gsap.registerPlugin(ScrollTrigger);

    // Stagger Up Animation
    document.querySelectorAll("h1, h2").forEach((element) => {
        element.setAttribute("a-stagger-up", "");
    });

    // Split text into spans
    new SplitType("[a-stagger-up]", {
        tagName: "span",
    });

    function createScrollTrigger(triggerElement, timeline) {
        let hasPlayed = false;

        ScrollTrigger.create({
            trigger: triggerElement,
            start: "top 80%", // Start the animation when the top of the element is at the bottom
            onEnter: () => {
                if (!hasPlayed) {
                    timeline.play();
                    hasPlayed = true;
                }
            },
            onEnterBack: () => {
                if (!hasPlayed) {
                    timeline.play();
                    hasPlayed = true;
                }
            },
            once: true // Ensures the animation runs only once
        });
    }
    
    document.querySelectorAll("[a-stagger-up]").forEach((element) => {
        let tl = gsap.timeline({ paused: true });
        tl.from(element.querySelectorAll(".word"), {
            opacity: 0,
            duration: 0.4,
            yPercent: 110,
            ease: 'power1.Out',
            stagger: { each: 0.1 }, // Stagger each element by 100 ms
        });
        createScrollTrigger(element, tl);
    });

    // Avoid flash of unstyled content
    gsap.set("[a-stagger-up]", { opacity: 1 });

    
}, 1400); // 1000ms delay for preloader animation
}); 
