// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Navbar scroll effect with GSAP
gsap.to("#navbar", {
  scrollTrigger: {
    start: "top top",
    end: "+=50",
    onEnter: () => {
      gsap.to("#navbar", {
        background: "rgba(10, 10, 10, 0.8)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        duration: 0.3,
      });
    },
    onLeaveBack: () => {
      gsap.to("#navbar", {
        background: "transparent",
        backdropFilter: "none",
        border: "none",
        duration: 0.3,
      });
    },
  },
});

// Hero Section Animations
gsap.from("#home .absolute.left-0 h2", {
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.5,
});

gsap.from("#home .absolute.left-0 h1", {
  opacity: 0,
  y: 50,
  duration: 1,
  delay: 0.7,
});

gsap.from("#home .absolute.right-0 h3", {
  opacity: 0,
  x: 50,
  duration: 1,
  delay: 1,
});

gsap.from("#home .absolute.right-0 p", {
  opacity: 0,
  x: 50,
  duration: 1,
  delay: 1.2,
});

// Services strip - no animation, full opacity immediately
// Animation removed as requested

// Parallax effect for hero silhouette
gsap.to(".hero-silhouette", {
  scrollTrigger: {
    trigger: "#home",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
  y: 200,
  scale: 1.2,
  opacity: 0.5,
});

// About section animations
gsap.from("#about h4:first-of-type", {
  scrollTrigger: {
    trigger: "#about",
    start: "top center+=100",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
});

gsap.from("#about h2:first-of-type", {
  scrollTrigger: {
    trigger: "#about",
    start: "top center+=100",
  },
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.2,
});

gsap.from("#about .grid.grid-cols-2 > div", {
  scrollTrigger: {
    trigger: "#about .grid.grid-cols-2",
    start: "top center+=100",
  },
  opacity: 0,
  y: 50,
  duration: 1,
  stagger: 0.3,
});

// Projects section animations
gsap.from("#projects h4:first-of-type", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top center+=100",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
});

gsap.from("#projects h2:first-of-type", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top center+=100",
  },
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.2,
});

// Project cards with parallax
gsap.utils.toArray("#projects .grid.grid-cols-3 > div").forEach((card, i) => {
  gsap.from(card, {
    scrollTrigger: {
      trigger: card,
      start: "top bottom-=50",
    },
    opacity: 0,
    y: 80,
    duration: 1,
    delay: i * 0.1,
  });

  // Parallax effect on scroll
  gsap.to(card, {
    scrollTrigger: {
      trigger: card,
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
    y: -30,
  });
});

// Services section animations
const servicesSection = document.querySelector(".py-32.px-16.bg-black");

gsap.from(".py-32.px-16.bg-black h4:first-of-type", {
  scrollTrigger: {
    trigger: servicesSection,
    start: "top center+=100",
  },
  opacity: 0,
  x: -30,
  duration: 0.8,
});

gsap.from(".py-32.px-16.bg-black h2:first-of-type", {
  scrollTrigger: {
    trigger: servicesSection,
    start: "top center+=100",
  },
  opacity: 0,
  y: 30,
  duration: 1,
  delay: 0.2,
});

gsap.utils
  .toArray(".py-32.px-16.bg-black .grid.grid-cols-3 > div")
  .forEach((card, i) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: "top bottom-=50",
      },
      opacity: 0,
      y: 60,
      rotation: 2,
      duration: 1,
      delay: i * 0.2,
    });
  });

// Contact section animation
gsap.from("#contact .contact-gradient", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top center+=100",
  },
  opacity: 0,
  scale: 0.95,
  duration: 1.2,
  ease: "power2.out",
});

// FAQ section animations
const faqSection = document.querySelectorAll(".py-32.px-16.bg-black")[1];

gsap.from(
  faqSection.querySelector(
    ".grid.grid-cols-\\[1fr_1\\.2fr\\] > div:first-child"
  ),
  {
    scrollTrigger: {
      trigger: faqSection,
      start: "top center+=100",
    },
    opacity: 0,
    x: -50,
    duration: 1,
  }
);

gsap.from(".faq-item", {
  scrollTrigger: {
    trigger: faqSection,
    start: "top center+=100",
  },
  opacity: 0,
  x: 50,
  duration: 0.8,
  stagger: 0.1,
});

// Footer animations
gsap.from("footer .grid.grid-cols-\\[2fr_1fr_1fr_1fr\\] > div", {
  scrollTrigger: {
    trigger: "footer",
    start: "top bottom-=100",
  },
  opacity: 0,
  y: 30,
  duration: 0.8,
  stagger: 0.15,
});

// FAQ toggle functionality
function toggleFaq(element) {
  const faqItem = element.parentElement;
  const isActive = faqItem.classList.contains("active");

  // Close all FAQ items with animation
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.classList.remove("active");
  });

  // Open clicked item if it wasn't active
  if (!isActive) {
    faqItem.classList.add("active");

    // Animate the opening
    gsap.from(faqItem.querySelector(".faq-answer"), {
      opacity: 0,
      y: -10,
      duration: 0.3,
    });
  }
}

// Smooth scroll for anchor links with GSAP
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: {
          y: target,
          offsetY: 100,
        },
        ease: "power2.inOut",
      });
    }
  });
});

// Add subtle parallax to hero content
gsap.to("#home .absolute.left-0", {
  scrollTrigger: {
    trigger: "#home",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
  y: -100,
});

gsap.to("#home .absolute.right-0", {
  scrollTrigger: {
    trigger: "#home",
    start: "top top",
    end: "bottom top",
    scrub: 1,
  },
  y: -150,
});

// Hover animations for project cards
document
  .querySelectorAll("#projects .grid.grid-cols-3 > div")
  .forEach((card) => {
    const cardImage = card.querySelector('div[class*="project-gradient"]');

    card.addEventListener("mouseenter", function () {
      gsap.to(cardImage, {
        scale: 1.1,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(cardImage, {
        scale: 1,
        duration: 0.5,
        ease: "power2.out",
      });
    });
  });

// Service cards hover effect (already handled by CSS hover:-translate-y-2)
// Additional smooth animation on hover
document
  .querySelectorAll(".py-32.px-16.bg-black .grid.grid-cols-3 > div")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      gsap.to(this, {
        boxShadow: "0 25px 50px -12px rgba(255, 107, 53, 0.25)",
        duration: 0.3,
        ease: "power2.out",
      });
    });

    card.addEventListener("mouseleave", function () {
      gsap.to(this, {
        boxShadow: "0 0 0 0 rgba(255, 107, 53, 0)",
        duration: 0.3,
        ease: "power2.out",
      });
    });
  });