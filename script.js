document.addEventListener("DOMContentLoaded", function () {
  const carouselSlider = document.querySelector(".carousel-slider");
  const carouselItems = document.querySelectorAll(".carousel-item");
  const overlay = document.getElementById("cardOverlay");
  const zoomedCard = document.getElementById("zoomedCard");
  const closeBtn = document.getElementById("closeBtn");

  // Project data with stats
  const projectData = [
    {
      title: "Mountain Escape",
      description:
        "A stunning web application with modern design and seamless user experience. Features include real-time updates, interactive elements, and beautiful animations that bring the mountain landscape to life.",
    },
    {
      title: "Urban Architecture",
      description:
        "E-commerce platform with advanced features and beautiful UI. Built with scalability and performance in mind, this project showcases modern architectural patterns and sleek design.",
    },
    {
      title: "Natural Beauty",
      description:
        "Mobile-first responsive design with cutting-edge animations and smooth transitions throughout. Every interaction is carefully crafted for an exceptional user experience.",
    },
    {
      title: "Creative Vision",
      description:
        "Creative portfolio showcasing innovative design solutions for modern businesses. Features bold typography, dynamic layouts, and immersive storytelling.",
    },
    {
      title: "Modern Design",
      description:
        "SaaS platform with intuitive dashboard and comprehensive analytics tools. Real-time data visualization and seamless workflow management for teams.",
    },
    {
      title: "Tech Innovation",
      description:
        "Brand identity and web presence for luxury lifestyle brand with elegant aesthetics. Sophisticated design meets cutting-edge technology.",
    },
    {
      title: "Nature Series",
      description:
        "Interactive storytelling experience with immersive visuals and engaging content. A journey through nature captured in digital form.",
    },
    {
      title: "Coastal Views",
      description:
        "Community platform connecting creators worldwide with powerful collaboration tools. Features real-time communication and project management.",
    },
    {
      title: "City Lights",
      description:
        "Educational platform with gamified learning experience and progress tracking. Makes learning engaging and fun for students of all ages.",
    },
    {
      title: "Automotive Dreams",
      description:
        "Corporate website with sleek modern aesthetics and professional presentation. Showcases luxury automotive brand with style and sophistication.",
    },
  ];

  const btn = document.getElementById("menuBtn");
  const menu = document.getElementById("mobileMenu");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  let selectedItem = null;
  let cardStartPosition = null;

  // Create sparkles effect
  function createSparkles(x, y) {
    const sparklesContainer = document.createElement("div");
    sparklesContainer.className = "sparkles";
    overlay.appendChild(sparklesContainer);

    for (let i = 0; i < 30; i++) {
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      const angle = (Math.PI * 2 * i) / 30;
      const distance = 50 + Math.random() * 150;
      sparkle.style.left = x + "px";
      sparkle.style.top = y + "px";
      sparkle.style.setProperty("--tx", Math.cos(angle) * distance + "px");
      sparkle.style.setProperty("--ty", Math.sin(angle) * distance + "px");
      sparkle.style.animationDelay = i * 0.02 + "s";
      sparklesContainer.appendChild(sparkle);
    }

    setTimeout(() => {
      sparklesContainer.remove();
    }, 1500);
  }

  // Add click event to each carousel item
  carouselItems.forEach((item, index) => {
    item.addEventListener("click", function (e) {
      if (!overlay.classList.contains("active")) {
        openCardModal(item, index);
      }
    });
  });

  function openCardModal(item, index) {
    selectedItem = item;
    const data = projectData[index];

    // Get exact position of clicked card
    const rect = item.getBoundingClientRect();
    cardStartPosition = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
    };

    // Pause carousel
    carouselSlider.classList.add("paused", "card-selected");
    item.classList.add("selected-card");

    // Get image src
    const imgSrc = item.querySelector("img").src;

    // Set modal content
    document.getElementById("zoomedImage").src = imgSrc;
    document.getElementById("zoomedTitle").textContent = data.title;
    document.getElementById("zoomedDescription").textContent = data.description;

    // Set initial position (card's exact position in carousel)
    zoomedCard.style.left = cardStartPosition.left + "px";
    zoomedCard.style.top = cardStartPosition.top + "px";
    zoomedCard.style.width = cardStartPosition.width + "px";
    zoomedCard.style.height = cardStartPosition.height + "px";
    zoomedCard.style.transform = "rotateY(0deg) rotateZ(0deg) scale(1)";
    zoomedCard.style.transition = "none";

    // Remove any existing classes
    zoomedCard.classList.remove("expanding", "expanded", "returning");

    // Activate modal
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";

    // Start animation sequence with flip
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Stage 1: Lift and flip start (0.4s)
        zoomedCard.classList.add("expanding");
        zoomedCard.style.transition =
          "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
        zoomedCard.style.transform =
          "rotateY(90deg) rotateZ(-5deg) scale(1.1) translateY(-30px)";

        setTimeout(() => {
          // Stage 2: Complete flip and move to center (0.8s)
          zoomedCard.style.transition =
            "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
          zoomedCard.classList.add("expanded");

          // Create sparkles at center
          setTimeout(() => {
            createSparkles(window.innerWidth / 2, window.innerHeight / 2);
          }, 400);
        }, 400);
      });
    });
  }

  function closeCardModal() {
    if (!selectedItem || !cardStartPosition) return;

    // Remove expanded state and start return animation
    zoomedCard.classList.remove("expanded");
    zoomedCard.classList.add("returning");

    // Stage 1: Lift slightly and start flip (0.3s)
    setTimeout(() => {
      zoomedCard.style.transition =
        "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)";
      zoomedCard.style.transform =
        "translate(-50%, -50%) rotateY(90deg) rotateZ(5deg) scale(0.9)";

      // Stage 2: Return to carousel position with flip (0.8s)
      setTimeout(() => {
        zoomedCard.style.transition =
          "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";
        zoomedCard.style.left = cardStartPosition.left + "px";
        zoomedCard.style.top = cardStartPosition.top + "px";
        zoomedCard.style.width = cardStartPosition.width + "px";
        zoomedCard.style.height = cardStartPosition.height + "px";
        zoomedCard.style.transform = "rotateY(0deg) rotateZ(0deg) scale(1)";

        // Fade out overlay
        setTimeout(() => {
          overlay.classList.remove("active");
        }, 400);
      }, 400);
    }, 100);

    // Clean up after full animation
    setTimeout(() => {
      overlay.classList.remove("closing");
      carouselSlider.classList.remove("paused", "card-selected");
      selectedItem.classList.remove("selected-card");
      zoomedCard.classList.remove("expanding", "expanded", "returning");
      selectedItem = null;
      cardStartPosition = null;
      document.body.style.overflow = "";
    }, 1500);
  }

  // Close events
  closeBtn.addEventListener("click", closeCardModal);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      closeCardModal();
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && overlay.classList.contains("active")) {
      closeCardModal();
    }
  });

  function toggleFaq(element) {
    const faqItem = element.closest(".faq-item");
    const isActive = faqItem.classList.contains("active");

    // Close all FAQ items
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active", "border-orange-600");
    });

    // If the clicked item wasn't active, open it
    if (!isActive) {
      faqItem.classList.add("active", "border-orange-600");
    }
  }

  // Add event listeners to all FAQ questions
  document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", function () {
      toggleFaq(this);
    });
  });
});

// Hero animation on page load with GSAP
window.addEventListener("load", () => {
  // Create a timeline for sequenced animations
  const tl = gsap.timeline({
    defaults: { ease: "power2.inOut" },
  });

  // Slide in images SLOWLY and SMOOTHLY from both sides
  tl.fromTo(
    ".epic-adam-wrapper",
    { x: "-120%", opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 2.5, // Slower duration
      ease: "power4.out", // Smoother easing
    }
  )
    .fromTo(
      ".epic-god-wrapper",
      { x: "120%", opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 2.5, // Slower duration
        ease: "power4.out", // Smoother easing
      },
      "<" // Start at the same time
    )

    // Wait for images to settle, then animate navbar
    .fromTo(
      "#navbar",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "+=0.5" // Wait 0.5s after images finish
    )

    // Stagger hero content children (h2, h1, h3, p)
    .fromTo(
      ".hero-content > *",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15, // 0.15s delay between each element
        ease: "power3.out",
      },
      "-=0.5" // Start slightly before navbar finishes
    )

    // Stagger services strip items
    .fromTo(
      ".services-strip > *",
      { y: 30, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        stagger: 0.1, // 0.1s delay between each service card
        ease: "back.out(1.2)",
      },
      "-=0.4"
    );
});

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");

  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// About section - "Behind the Designs" animation
const aboutTL1 = gsap.timeline({
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%",
    toggleActions: "play none none none",
  },
});

aboutTL1
  .from("#about h4:first-of-type", {
    x: -30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })
  .from(
    "#about h2:first-of-type",
    {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.3"
  )
  .from(
    "#about .grid > div:first-child p",
    {
      x: -40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    },
    "-=0.4"
  )
  .from(
    "#about .grid > div:last-child p",
    {
      x: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
    },
    "<"
  );

// "Who I Am" section animation (separate trigger)
const aboutTL2 = gsap.timeline({
  scrollTrigger: {
    trigger: "#about h4:nth-of-type(2)", // Target the second h4 "Who I Am"
    start: "top 85%",
    toggleActions: "play none none none",
  },
});

aboutTL2
  .from("#about h4:nth-of-type(2)", {
    x: -30,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  })
  .from(
    "#about h2:nth-of-type(2)",
    {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.3"
  )
  .from(
    "#about > p",
    {
      // The paragraph after the second h2
      y: 40,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
    },
    "-=0.4"
  );

// ============================================
// PROJECTS SECTION
// ============================================
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#projects",
      start: "top 80%",
    },
  })
  .from("#projects .absolute.top-0 h4", {
    y: -20,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
  })
  .from(
    "#projects .absolute.top-0 h2",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.4"
  )
  .from(
    "#projects .absolute.top-0 p",
    {
      y: 20,
      opacity: 0,
      duration: 0.6,
    },
    "-=0.5"
  )
  .from(
    "#projects .absolute.bottom-12 > div",
    {
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
    },
    "-=0.5"
  );

// ============================================
// SERVICES SECTION
// ============================================
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#services",
      start: "top 80%",
    },
  })
  .from("#services h4", {
    x: -30,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
  })
  .from(
    "#services h2",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    },
    "-=0.4"
  )
  .from(
    "#services > div > p",
    {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.5"
  )
  .from(
    "#services .grid > div",
    {
      y: 0,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2, // Increased stagger
      ease: "power3.out",
    },
    "-=0.3"
  );

// ============================================
// CONTACT SECTION
// ============================================
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#contact",
      start: "top 80%",
    },
  })
  .from("#contact h4", {
    x: -30,
    opacity: 0,
    duration: 0.6,
  })
  .from(
    "#contact h1",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
    },
    "-=0.4"
  )
  .from(
    "#contact p",
    {
      y: 20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    },
    "-=0.5"
  )
  .from(
    "#contact .flex.gap-6 a",
    {
      scale: 0,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "back.out(1.7)",
    },
    "-=0.3"
  )
  .from(
    "#contact form",
    {
      x: 50,
      opacity: 0,
      duration: 0.8,
    },
    "-=0.8"
  );

// ============================================
// FAQ SECTION
// ============================================
gsap
  .timeline({
    scrollTrigger: {
      trigger: "#faq",
      start: "top 80%",
    },
  })
  .from("#faq .sticky h4", {
    x: -30,
    opacity: 0,
    duration: 0.6,
  })
  .from(
    "#faq .sticky h2",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
    },
    "-=0.4"
  )
  .from(
    "#faq .sticky p",
    {
      y: 20,
      opacity: 0,
      duration: 0.6,
    },
    "-=0.5"
  )
  .from(
    "#faq .sticky a",
    {
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      ease: "back.out(1.2)",
    },
    "-=0.4"
  )
  .from(
    ".faq-item",
    {
      x: 50,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
    },
    "-=0.6"
  );

// ============================================
// FOOTER SECTION
// ============================================
gsap
  .timeline({
    scrollTrigger: {
      trigger: "footer",
      start: "top 90%",
    },
  })
  .from("footer .grid > div", {
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.15,
    ease: "power3.out",
  })
  .from(
    "footer .border-t",
    {
      opacity: 0,
      duration: 0.6,
    },
    "-=0.3"
  );
