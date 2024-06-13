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
        gsap.set(element, { opacity: 0 }); // Set initial opacity to 0
    });

    // Split text into spans
    new SplitType("[a-stagger-up]", {
        types: "words, chars",
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
            yPercent: 100,
            duration: 0.5,
            ease: "expo.out",
            stagger: 0.05, // Stagger each element by 50 ms
        });
        createScrollTrigger(element, tl);
    });

}, 1500); // Adjust the delay as needed for your preloader animation
});