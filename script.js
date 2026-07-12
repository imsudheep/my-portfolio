// ============ BEN KIM PORTFOLIO — SECTION SCROLL ============

(function () {
  'use strict';

  const sections = document.querySelectorAll('.section');
  const dots = document.querySelectorAll('.dot');
  const nav = document.getElementById('fixedNav');
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navOverlay = document.getElementById('navOverlay');
  const navOverlayClose = document.getElementById('navOverlayClose');
  const navLinks = document.querySelectorAll('.nav-overlay-link');

  let currentIndex = 0;

  // ---- Initialize ----
  function init() {
    updateDots(0);
    initMobileDock();
    initAboutScrollAnimation();
  }

  // ---- Navigate to section (smooth scroll) ----
  function goToSection(index) {
    if (index < 0 || index >= sections.length) return;
    sections[index].scrollIntoView({ behavior: 'smooth' });
  }

  // ---- Update dot navigation ----
  function updateDots(index) {
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === index);
    });
  }

  // ---- Nav hide/show on scroll direction ----
  let lastScrollY = window.scrollY;
  const scrollThreshold = 10; // Avoid navbar flickering on minor scroll shifts or mouse jitter

  document.addEventListener('scroll', function () {
    const currentScrollY = window.scrollY;
    
    if (Math.abs(currentScrollY - lastScrollY) > scrollThreshold) {
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        nav.classList.add('hidden');
      } else {
        nav.classList.remove('hidden');
      }
      lastScrollY = currentScrollY;
    }
  }, { passive: true });

  // ---- Dot click navigation ----
  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const index = parseInt(this.getAttribute('data-index'));
      goToSection(index);
    });
  });

  // ---- Hamburger menu ----
  hamburgerBtn.addEventListener('click', function () {
    this.classList.toggle('active');
    navOverlay.classList.toggle('open');
  });

  // ---- Nav overlay close button ----
  navOverlayClose.addEventListener('click', function () {
    hamburgerBtn.classList.remove('active');
    navOverlay.classList.remove('open');
  });

  // Close overlay on backdrop click
  navOverlay.addEventListener('click', function (e) {
    if (e.target === this) {
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('open');
    }
  });

  // ---- Nav overlay links ----
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const index = parseInt(this.getAttribute('data-index'));
      goToSection(index);
      hamburgerBtn.classList.remove('active');
      navOverlay.classList.remove('open');
    });
  });

// ---- Journey horizontal scroll (native sticky + scroll-driven transform) ----
  const journeySection = document.getElementById('journey');          // the scroll track
  const journeyPinEl = journeySection?.querySelector('.journey-pin');   // sticky viewport
  const journeyContent = journeySection?.querySelector('.journey-content'); // wide strip

  if (journeySection && journeyPinEl && journeyContent) {
    let maxScroll = 0;
    let lastWidth = window.innerWidth;

    function setupJourney() {
      maxScroll = Math.max(0, journeyContent.scrollWidth - window.innerWidth);
      const multiplier = window.innerWidth <= 768 ? 0.45 : 1.0;
      // Explicit track height = one viewport (the sticky pin) + horizontal travel
      journeySection.style.height = (window.innerHeight + maxScroll * multiplier) + 'px';
      updateJourney();
    }

    function updateJourney() {
      const rect = journeySection.getBoundingClientRect();
      const scrollable = journeySection.offsetHeight - window.innerHeight;
      let progress = scrollable > 0 ? (-rect.top) / scrollable : 0;
      progress = Math.min(1, Math.max(0, progress));
      journeyContent.style.transform = 'translate3d(' + (-maxScroll * progress) + 'px,0,0)';
    }

    window.addEventListener('scroll', updateJourney, { passive: true });

    // Only recalc on real WIDTH change — ignore the iOS address-bar vertical shuffle
    window.addEventListener('resize', function () {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      setupJourney();
    });

    window.addEventListener('load', setupJourney);
    window.addEventListener('pageshow', setupJourney);
    journeyContent.querySelectorAll('img').forEach(function (img) {
      if (!img.complete) img.addEventListener('load', setupJourney, { once: true });
    });

    setupJourney();
  }

  // ---- Dot nav: use journey-pin for position tracking ----
  const journeyPin = journeySection?.querySelector('.journey-pin');

  function onScroll() {
    let closestIndex = 0;
    let closestDist = Infinity;
    sections.forEach(function (s, i) {
      var target = s;
      if (i === 1 && journeyPin) target = journeyPin;
      var rect = target.getBoundingClientRect();
      var dist = Math.abs(rect.top);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = i;
      }
    });
    if (closestIndex !== currentIndex) {
      currentIndex = closestIndex;
      updateDots(currentIndex);
      var videos = sections[currentIndex].querySelectorAll('video');
      videos.forEach(function (v) {
        v.play()['catch'](function () {});
      });
    }
  }

  document.addEventListener('scroll', onScroll, { passive: true });

  // ============ MAC OS FINDER APP CONTROLLER ============
  const PROJECTS_DATA = {
    harshavardhan: {
      name: "Harshavardhan Portfolio",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated today",
      updatedDate: "Today",
      icon: "public/media/business.png",
      description: "Precision-driven portfolio site for a short-form video editor highlighting editing insights.",
      techStack: ["HTML", "CSS", "JavaScript"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://www.h4rshavardhan.me/",
      files: [
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "Today", iconClass: "file-chrome", isWebLink: true, link: "https://www.h4rshavardhan.me/" },
        { name: "about.md", type: "file", kind: "Markdown", size: "4 KB", updatedDate: "Today", iconClass: "file-text", preview: "# Harshavardhan Portfolio\n\n## Project Overview\nA precision-driven video editing portfolio for a short-form video editor designed to help founders build personal brands.\n\n## Why I Built It\nTo create an interactive, Notion-styled showcase of cinematic and structured video editing work, enabling prospective clients to easily preview raw vs. edited footage.\n\n## Features\n- Interactive macOS Finder style folder navigation for projects\n- Live video comparison player for Raw vs. Edited footage\n- Editing Insights popup explaining the narrative decisions behind each cut\n- Notion-style clean design aesthetic\n- Accordion sections detail emotional arc engineering and color grading\n\n## Tech Stack\nHTML, CSS, JavaScript, SVG Animations\n\n## Challenges\n- Building a nested macOS folder simulation inside a Notion layout\n- Syncing multiple video tracks to compare raw vs edited timelines\n\n## What I Learned\nLearned how to design high-retention interactive pages, integrate responsive video popups, and optimize clean typography for storytelling." },
        { name: "preview.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/business.png" }
      ]
    },
    ananya: {
      name: "Ananya Portfolio",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated today",
      updatedDate: "Today",
      icon: "public/media/travel.png",
      description: "Elegant, editorial video editing portfolio website showcasing storytelling and high-retention clips.",
      techStack: ["HTML", "CSS", "JavaScript"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://imsudheep.github.io/ananya-s-portfolio/",
      files: [
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "Today", iconClass: "file-chrome", isWebLink: true, link: "https://imsudheep.github.io/ananya-s-portfolio/" },
        { name: "about.md", type: "file", kind: "Markdown", size: "4 KB", updatedDate: "Today", iconClass: "file-text", preview: "# Ananya Portfolio\n\n## Project Overview\nAn elegant, luxury-aesthetic portfolio website for a professional video editor specializing in YouTube storytelling, brand narratives, and short-form content.\n\n## Why I Built It\nTo showcase high-retention editing techniques with a focus on editorial style, typography, and visual pacing that helps creators grow their channels.\n\n## Features\n- Premium minimalist aesthetic with serif typography\n- Floating chat and Call-To-Action buttons\n- Responsive visual grids for video previews and client testimonials\n- Interactive hamburger menu with smooth slide transitions\n\n## Tech Stack\nHTML, CSS, JavaScript, FontAwesome\n\n## Challenges\n- Creating a responsive layout that matches high-end editorial magazines\n- Ensuring fast loading times for video-heavy design showcases\n\n## What I Learned\nMastered fluid layouts, typography hierarchies, and premium aesthetic design patterns." },
        { name: "preview.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/travel.png" }
      ]
    },
    wattif: {
      name: "1WattIf",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated today",
      updatedDate: "Today",
      icon: "public/media/student.png",
      description: "A high-end minimalist brand and newsletter platform dedicated to intellectual curiosity and reflection.",
      techStack: ["HTML", "CSS", "JavaScript"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://www.1wattif.in/",
      files: [
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "Today", iconClass: "file-chrome", isWebLink: true, link: "https://www.1wattif.in/" },
        { name: "about.md", type: "file", kind: "Markdown", size: "4 KB", updatedDate: "Today", iconClass: "file-text", preview: "# 1WattIf\n\n## Project Overview\nA modern, thought-provoking brand platform and weekly newsletter ecosystem dedicated to slowing down and asking deeper, better questions in an AI-dominated world.\n\n## Why I Built It\nTo build a minimalist, distraction-free space that inspires intellectual curiosity and challenges daily assumptions through structured reflections, books, and journals.\n\n## Features\n- High-end minimalist design with a grid layout and clean typography\n- Integrated newsletter subscription flow\n- Thought cards categorizing the value of books, journals, and deep thinking\n- Carbon-fibre background textures and smooth CSS animations\n\n## Tech Stack\nHTML, CSS, JavaScript, SVG Graphics\n\n## Challenges\n- Balancing whitespace and high contrast for a distraction-free reading experience\n- Designing a highly interactive newsletter subscription card with custom input validation\n\n## What I Learned\nDeepened understanding of content-first web layouts, brand consistency, and minimal CSS-only responsive designs." },
        { name: "preview.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/student.png" }
      ]
    },
    rebrew: {
      name: "Rebrew",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated today",
      updatedDate: "Today",
      icon: "public/media/hotel.png",
      description: "Ultra-premium interactive scrollytelling web experience for a luxury slow-crafted grape beverage.",
      techStack: ["Canvas API", "HTML", "CSS", "JavaScript"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://imsudheep.github.io/rebrew/",
      files: [
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "Today", iconClass: "file-chrome", isWebLink: true, link: "https://imsudheep.github.io/rebrew/" },
        { name: "about.md", type: "file", kind: "Markdown", size: "4 KB", updatedDate: "Today", iconClass: "file-text", preview: "# Rebrew\n\n## Project Overview\nAn ultra-premium, interactive scrollytelling web experience for REBREW, a slow-crafted luxury grape beverage.\n\n## Why I Built It\nTo push the boundaries of storytelling by building an immersive, hardware-accelerated scroll-driven product journey.\n\n## Features\n- Immersive Apple-style canvas scrollytelling showing grape harvesting to bottling\n- Custom premium preloader with a percent indicator and contextual taglines\n- Floating glassmorphism navigation menu\n- High-end performance optimization for 60fps animations\n\n## Tech Stack\nCanvas API, HTML, CSS, JavaScript, Scroll Animations\n\n## Challenges\n- Developing a synchronized frame-by-frame canvas rendering engine bound to scroll position\n- Preloading massive high-resolution image sequences efficiently\n\n## What I Learned\nLearned advanced Canvas API manipulation, scroll-bound physics, and asset preloading techniques." },
        { name: "preview.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/hotel.png" }
      ]
    },
    vivahacine: {
      name: "Vivaha Cine",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated today",
      updatedDate: "Today",
      icon: "public/media/life.png",
      description: "Sophisticated editorial wedding film photography and cinematic storytelling portfolio.",
      techStack: ["HTML", "CSS", "JavaScript"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://imsudheep.github.io/vivahacine/",
      files: [
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "Today", iconClass: "file-chrome", isWebLink: true, link: "https://imsudheep.github.io/vivahacine/" },
        { name: "about.md", type: "file", kind: "Markdown", size: "4 KB", updatedDate: "Today", iconClass: "file-text", preview: "# Vivaha Cine\n\n## Project Overview\nA luxury, editorial wedding film photography and cinematography portfolio designed for 'the new romantics.'\n\n## Why I Built It\nTo capture and present wedding stories through a quiet, intentional, and deeply cinematic ethos.\n\n## Features\n- Editorial layout with sophisticated typography (Playfair Display)\n- Interactive portfolio viewer categorizing Weddings, Events, Portraits, and Editorials\n- Minimalist photo distribution with hover-to-reveal image cards\n- Clean accordion-style details for project details and pricing packages\n\n## Tech Stack\nHTML, CSS, JavaScript, Unsplash API\n\n## Challenges\n- Designing a smooth, fluid image gallery transitions without external libraries\n- Building a responsive grid that preserves the high-end editorial aspect ratios of photos\n\n## What I Learned\nGained experience in high-end design aesthetics, image aspect-ratio management, and micro-interactions." },
        { name: "preview.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/life.png" }
      ]
    },
    gotfitnss: {
      name: "GOT FITNEZZ",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated today",
      updatedDate: "Today",
      icon: "public/media/fitness.png",
      description: "High-energy premium gym landing page in Palladam featuring CrossFit coaching and modern facilities.",
      techStack: ["Tailwind CSS", "HTML", "JavaScript"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://imsudheep.github.io/got-fitnss/",
      files: [
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "Today", iconClass: "file-chrome", isWebLink: true, link: "https://imsudheep.github.io/got-fitnss/" },
        { name: "about.md", type: "file", kind: "Markdown", size: "4 KB", updatedDate: "Today", iconClass: "file-text", preview: "# GOT FITNEZZ\n\n## Project Overview\nA high-energy, premium fitness center landing page for 'Gears Of Thor' (GOT FITNEZZ) gym in Palladam.\n\n## Why I Built It\nTo create a motivational digital presence featuring expert coaching, CrossFit programs, and state-of-the-art facilities with a high-conversion sign-up flow.\n\n## Features\n- Neon green and dark mode color scheme representing high-energy workout environments\n- Sticky glassmorphic navigation bar with scroll state changes\n- Custom Tailwind CSS styling with neon drop shadows\n- Integrated WhatsApp chat integration for quick trial scheduling\n\n## Tech Stack\nTailwind CSS, HTML, JavaScript\n\n## Challenges\n- Implementing high-impact responsive visual components using Tailwind CSS\n- Optimizing performance for high-resolution background hero images\n\n## What I Learned\nLearned Tailwind configuration, modern card layout designs, and conversion rate optimization (CRO) tactics." },
        { name: "preview.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/fitness.png" }
      ]
    }
  };

  // State Management
  let currentLocation = "root";
  const historyStack = ["root"];
  let historyPointer = 0;
  let selectedItem = null;
  let currentSidebarFilter = "all";
  let searchQuery = "";
  let viewMode = "grid";
  let sortBy = "name";

  // Elements
  const finderWindow = document.getElementById('finderWindow');
  const filesGrid = document.getElementById('finderFilesGrid');
  const filesListContainer = document.getElementById('finderFilesList');
  const listBody = document.getElementById('finderListBody');
  const previewPane = document.getElementById('finderPreviewPane');
  const searchInput = document.getElementById('finderSearchInput');
  const backBtn = document.getElementById('finderBackBtn');
  const forwardBtn = document.getElementById('finderForwardBtn');
  const titlePath = document.getElementById('finderTitlePath');
  const statusPath = document.getElementById('finderStatusPath');
  const statusItemCount = document.getElementById('finderStatusItemCount');
  const zoomSlider = document.getElementById('finderZoomSlider');

  const closeBtn = document.getElementById('finderCloseBtn');
  const minimizeBtn = document.getElementById('finderMinimizeBtn');
  const maximizeBtn = document.getElementById('finderMaximizeBtn');

  // Icons SVGs
  // Icons SVGs
  const getFolderSvg = (appIconUrl = '') => {
    const rand = Math.floor(Math.random() * 1000000);
    
    return `<svg viewBox="0 0 100 80" class="folder-icon folder-blue-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <image href="public/media/mac-folder.png" x="0" y="0" width="100" height="80" />
    </svg>`;
  };

  const getFileSvg = (iconClass, name = '') => {
    let ext = "";
    if (name) {
      ext = name.split('.').pop().split(' ').shift().toUpperCase();
      if (ext.includes('(')) ext = ext.split('(')[0].trim();
    }
    if (!ext) {
      if (iconClass === "file-react") ext = "JSX";
      else if (iconClass === "file-js") ext = "JS";
      else if (iconClass === "file-typescript") ext = "TS";
      else if (iconClass === "file-css") ext = "CSS";
      else if (iconClass === "file-html" || iconClass === "file-chrome") ext = "HTML";
      else if (iconClass === "file-json") ext = "JSON";
      else if (iconClass === "file-pdf") ext = "PDF";
      else if (iconClass === "file-img") ext = "PNG";
      else if (iconClass === "file-github") ext = "GIT";
      else ext = "FILE";
    }

    const rand = Math.floor(Math.random() * 1000000);
    const bgId = `fileBg_${rand}`;
    const foldId = `fileFold_${rand}`;
    const fileShadowId = `fileShadow_${rand}`;
    const logoGradId1 = `logoGrad1_${rand}`;
    const logoGradId2 = `logoGrad2_${rand}`;
    const logoGradId3 = `logoGrad3_${rand}`;

    let docColorStart = "#ffffff";
    let docColorEnd = "#f5f5f7";
    let foldColorStart = "#ffffff";
    let foldColorEnd = "#e5e5ea";
    let strokeColor = "#d1d1d6";
    
    let contentHtml = "";
    
    if (iconClass === "file-chrome") {
      contentHtml = `
        <g transform="translate(18, 30) scale(0.5)">
          <circle cx="24" cy="24" r="12" fill="#ffffff" />
          <path d="M24,12H44.7812a23.9939,23.9939,0,0,0-41.5639.0029L13.6079,30l.0093-.0024A11.9852,11.9852,0,0,1,24,12Z" fill="url(#${logoGradId1})" />
          <circle cx="24" cy="24" r="9.5" fill="#1a73e8" />
          <path d="M34.3913,30.0029,24.0007,48A23.994,23.994,0,0,0,44.78,12.0031H23.9989l-.0025.0093A11.985,11.985,0,0,1,34.3913,30.0029Z" fill="url(#${logoGradId2})" />
          <path d="M13.6086,30.0031,3.218,12.006A23.994,23.994,0,0,0,24.0025,48L34.3931,30.0029l-.0067-.0068a11.9852,11.9852,0,0,0-10.3839,18Z" fill="url(#${logoGradId3})" />
          <circle cx="24" cy="24" r="7.5" fill="#ffffff" />
          <circle cx="24" cy="24" r="5.5" fill="#1a73e8" />
        </g>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#4285F4" />
        <text x="30" y="66" fill="#ffffff" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">HTML</text>
      `;
    } else if (iconClass === "file-react") {
      contentHtml = `
        <g transform="translate(18, 26) scale(0.5)">
          <ellipse cx="24" cy="24" rx="20" ry="7.5" fill="none" stroke="#00d8ff" stroke-width="2.5" transform="rotate(30 24 24)" />
          <ellipse cx="24" cy="24" rx="20" ry="7.5" fill="none" stroke="#00d8ff" stroke-width="2.5" transform="rotate(90 24 24)" />
          <ellipse cx="24" cy="24" rx="20" ry="7.5" fill="none" stroke="#00d8ff" stroke-width="2.5" transform="rotate(150 24 24)" />
          <circle cx="24" cy="24" r="3.5" fill="#00d8ff" />
        </g>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#00d8ff" />
        <text x="30" y="66" fill="#000000" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">${ext}</text>
      `;
    } else if (iconClass === "file-js") {
      contentHtml = `
        <g transform="translate(20, 28) scale(0.85)">
          <rect x="0" y="0" width="24" height="24" rx="3.5" fill="#f7df1e" />
          <text x="21" y="21" fill="#000000" font-size="11.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="900" text-anchor="end">JS</text>
        </g>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#f7df1e" />
        <text x="30" y="66" fill="#000000" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">${ext}</text>
      `;
    } else if (iconClass === "file-typescript") {
      contentHtml = `
        <g transform="translate(20, 28) scale(0.85)">
          <rect x="0" y="0" width="24" height="24" rx="3.5" fill="#3178c6" />
          <text x="21" y="21" fill="#ffffff" font-size="11.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="end">TS</text>
        </g>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#3178c6" />
        <text x="30" y="66" fill="#ffffff" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">${ext}</text>
      `;
    } else if (iconClass === "file-css") {
      contentHtml = `
        <g transform="translate(22, 28) scale(0.8)">
          <path d="M3 2 L17 2 L15.5 17 L10 19 L4.5 17 Z" fill="#29b6f6"/>
          <path d="M10 2 L17 2 L15.5 17 L10 19 Z" fill="#0288d1"/>
          <path d="M6 5 L14 5 L13.5 10 L6.5 10 L7 13 L10 14 L13 13 L13.2 11 L15 11 L14.7 15 L10 16.5 L5.3 15 L4.7 9 L11.5 9 L11.7 7 L6.2 7 Z" fill="#ffffff"/>
        </g>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#29b6f6" />
        <text x="30" y="66" fill="#ffffff" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">${ext}</text>
      `;
    } else if (iconClass === "file-json") {
      contentHtml = `
        <text x="30" y="44" fill="#ab47bc" font-size="18" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">{ }</text>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#ab47bc" />
        <text x="30" y="66" fill="#ffffff" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">${ext}</text>
      `;
    } else if (iconClass === "file-pdf") {
      contentHtml = `
        <g transform="translate(20, 28) scale(0.85)">
          <rect x="2" y="2" width="20" height="20" rx="3" fill="#e53935" />
          <text x="12" y="15" fill="#ffffff" font-size="8" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">PDF</text>
        </g>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#e53935" />
        <text x="30" y="66" fill="#ffffff" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">PDF</text>
      `;
    } else if (iconClass === "file-github") {
      contentHtml = `
        <g transform="translate(18, 25) scale(0.5)">
          <path d="M24 4C12.95 4 4 12.95 4 24c0 8.84 5.73 16.33 13.68 18.98.83.15 1.13-.36 1.13-.8 0-.39-.01-1.43-.02-2.8-5.56 1.21-6.74-2.68-6.74-2.68-.91-2.31-2.22-2.92-2.22-2.92-1.82-1.25.14-1.22.14-1.22 2.01.14 3.07 2.06 3.07 2.06 1.79 3.06 4.69 2.18 5.83 1.67.18-1.3.7-2.18 1.28-2.68-4.44-.5-9.11-2.22-9.11-9.88 0-2.18.78-3.97 2.06-5.37-.21-.5-.89-2.54.2-5.3 0 0 1.68-.54 5.5 2.05A19.06 19.06 0 0 1 24 13.3c1.7.01 3.4.23 5 .67 3.82-2.59 5.5-2.05 5.5-2.05 1.09 2.76.41 4.8.2 5.3 1.28 1.4 2.06 3.19 2.06 5.37 0 7.68-4.68 9.37-9.14 9.87.72.62 1.37 1.85 1.37 3.73 0 2.7-.02 4.87-.02 5.54 0 .45.3.96 1.14.8C38.28 40.32 44 32.84 44 24c0-11.05-8.95-20-20-20z" fill="#333333" />
        </g>
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#333333" />
        <text x="30" y="66" fill="#ffffff" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">GIT</text>
      `;
    } else {
      contentHtml = `
        <rect x="18" y="28" width="24" height="2" rx="1" fill="#aeaeae" opacity="0.5" />
        <rect x="18" y="34" width="24" height="2" rx="1" fill="#aeaeae" opacity="0.5" />
        <rect x="18" y="40" width="18" height="2" rx="1" fill="#aeaeae" opacity="0.5" />
        <rect x="18" y="46" width="14" height="2" rx="1" fill="#aeaeae" opacity="0.5" />
        <rect x="14" y="60" width="32" height="8" rx="2" fill="#78909c" />
        <text x="30" y="66" fill="#ffffff" font-size="5.5" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-weight="bold" text-anchor="middle">${ext}</text>
      `;
    }

    return `<svg viewBox="0 0 60 80" class="file-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${bgId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${docColorStart}" />
          <stop offset="100%" stop-color="${docColorEnd}" />
        </linearGradient>
        <linearGradient id="${foldId}" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${foldColorStart}" />
          <stop offset="100%" stop-color="${foldColorEnd}" />
        </linearGradient>
        <linearGradient id="${logoGradId1}" x1="3.2" y1="15" x2="44.8" y2="15" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#d93025" />
          <stop offset="100%" stop-color="#ea4335" />
        </linearGradient>
        <linearGradient id="${logoGradId2}" x1="20.7" y1="47.7" x2="41.5" y2="11.7" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#fcc934" />
          <stop offset="100%" stop-color="#fbbc04" />
        </linearGradient>
        <linearGradient id="${logoGradId3}" x1="26.6" y1="46.5" x2="5.8" y2="10.5" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stop-color="#1e8e3e" />
          <stop offset="100%" stop-color="#34a853" />
        </linearGradient>
        <filter id="${fileShadowId}" x="-20%" y="-15%" width="140%" height="135%">
          <feDropShadow dx="0" dy="2.5" stdDeviation="2.5" flood-color="#000000" flood-opacity="0.15" />
        </filter>
      </defs>
      <!-- File page path -->
      <path d="M 14 4 
               L 44 4 
               L 56 16 
               L 56 73 
               C 56 75, 54 76.5, 52 76.5 
               L 14 76.5 
               C 12 76.5, 10 75, 10 73 
               L 10 7 
               C 10 5, 12 4, 14 4 
               Z" 
            fill="url(#${bgId})" 
            stroke="${strokeColor}" 
            stroke-width="0.8" 
            filter="url(#${fileShadowId})" />
      <!-- Dog-ear fold shadow -->
      <path d="M 44 4 L 44 16 L 56 16 Z" fill="#d1d1d6" opacity="0.6" />
      <!-- Dog-ear folded corner flap -->
      <path d="M 44 4 L 56 16 L 44 16 Z" fill="url(#${foldId})" stroke="${strokeColor}" stroke-width="0.5" />
      
      <!-- Inside Brand Content -->
      ${contentHtml}
    </svg>`;
  };

  const svgFolder = getFolderSvg();
  const svgFile = (iconClass, name = '') => getFileSvg(iconClass, name);

  function updateNavArrows() {
    if (historyPointer > 0) {
      backBtn.classList.remove('disabled');
    } else {
      backBtn.classList.add('disabled');
    }

    if (historyPointer < historyStack.length - 1) {
      forwardBtn.classList.remove('disabled');
    } else {
      forwardBtn.classList.add('disabled');
    }
  }

  function navigateTo(loc) {
    if (historyPointer < historyStack.length - 1) {
      historyStack.splice(historyPointer + 1);
    }
    historyStack.push(loc);
    historyPointer = historyStack.length - 1;
    currentLocation = loc;
    selectedItem = null;
    updateNavArrows();
    renderFinder();
  }

  function navigateBack() {
    if (historyPointer > 0) {
      historyPointer--;
      currentLocation = historyStack[historyPointer];
      selectedItem = null;
      updateNavArrows();
      renderFinder();
    }
  }

  function navigateForward() {
    if (historyPointer < historyStack.length - 1) {
      historyPointer++;
      currentLocation = historyStack[historyPointer];
      selectedItem = null;
      updateNavArrows();
      renderFinder();
    }
  }

  function renderBreadcrumbs() {
    if (!titlePath) return;
    let html = `
      <svg viewBox="0 0 24 24" width="16" height="16" class="folder-blue-icon" fill="currentColor">
        <path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/>
      </svg>
      <span class="breadcrumb-item" data-breadcrumb="root">Projects</span>
    `;

    let statusHtml = `<span>Projects</span>`;

    if (currentLocation !== "root") {
      if (currentLocation.startsWith("location-")) {
        const cat = currentLocation.replace("location-", "");
        let label = "All Projects";
        if (cat === "web") label = "Web Apps";
        else if (cat === "mobile") label = "Mobile Apps";
        else if (cat === "uiux") label = "UI / UX Design";
        html += `
          <span class="breadcrumb-arrow">›</span>
          <span class="breadcrumb-item" data-breadcrumb="${currentLocation}">${label}</span>
        `;
        statusHtml += ` <span class="breadcrumb-arrow">›</span> <span>${label}</span>`;
      } else if (currentLocation.startsWith("tag-")) {
        const tag = currentLocation.replace("tag-", "");
        let label = "Featured";
        if (tag === "inprogress") label = "In Progress";
        else if (tag === "complete") label = "Complete";
        html += `
          <span class="breadcrumb-arrow">›</span>
          <span class="breadcrumb-item" data-breadcrumb="${currentLocation}">${label}</span>
        `;
        statusHtml += ` <span class="breadcrumb-arrow">›</span> <span>${label}</span>`;
      } else if (currentLocation === "recents") {
        html += `
          <span class="breadcrumb-arrow">›</span>
          <span class="breadcrumb-item" data-breadcrumb="recents">Recents</span>
        `;
        statusHtml += ` <span class="breadcrumb-arrow">›</span> <span>Recents</span>`;
      } else if (currentLocation === "shared") {
        html += `
          <span class="breadcrumb-arrow">›</span>
          <span class="breadcrumb-item" data-breadcrumb="shared">Shared</span>
        `;
        statusHtml += ` <span class="breadcrumb-arrow">›</span> <span>Shared</span>`;
      } else {
        const parts = currentLocation.split('/');
        const projKey = parts[0];
        const project = PROJECTS_DATA[projKey];

        if (project) {
          html += `
            <span class="breadcrumb-arrow">›</span>
            <span class="breadcrumb-item" data-breadcrumb="${projKey}">${project.name}</span>
          `;
          statusHtml += ` <span class="breadcrumb-arrow">›</span> <span>${project.name}</span>`;

          if (parts.length > 1) {
            for (let i = 1; i < parts.length; i++) {
              const sub = parts[i];
              const partialPath = parts.slice(0, i + 1).join('/');
              html += `
                <span class="breadcrumb-arrow">›</span>
                <span class="breadcrumb-item" data-breadcrumb="${partialPath}">${sub}</span>
              `;
              statusHtml += ` <span class="breadcrumb-arrow">›</span> <span>${sub}</span>`;
            }
          }
        }
      }
    }

    titlePath.innerHTML = html;
    statusPath.innerHTML = statusHtml;

    titlePath.querySelectorAll('.breadcrumb-item').forEach(el => {
      el.addEventListener('click', function(e) {
        e.stopPropagation();
        const target = this.getAttribute('data-breadcrumb');
        navigateTo(target);
      });
    });
  }

  function getCurrentContent() {
    if (currentLocation === "root") {
      return Object.keys(PROJECTS_DATA).map(key => ({
        key: key,
        name: PROJECTS_DATA[key].name,
        type: "folder",
        project: PROJECTS_DATA[key]
      }));
    } else if (currentLocation === "recents") {
      let allFiles = [];
      Object.keys(PROJECTS_DATA).forEach(projKey => {
        const project = PROJECTS_DATA[projKey];
        project.files.forEach(file => {
          if (file.type === "file") {
            allFiles.push({
              ...file,
              key: projKey
            });
          }
        });
      });
      return allFiles;
    } else if (currentLocation === "shared") {
      return Object.keys(PROJECTS_DATA)
        .map(key => ({
          key: key,
          name: PROJECTS_DATA[key].name,
          type: "folder",
          project: PROJECTS_DATA[key]
        }))
        .filter(item => item.project.tag === "tag-featured");
    } else if (currentLocation.startsWith("location-")) {
      const category = currentLocation.replace("location-", "");
      return Object.keys(PROJECTS_DATA)
        .map(key => ({
          key: key,
          name: PROJECTS_DATA[key].name,
          type: "folder",
          project: PROJECTS_DATA[key]
        }))
        .filter(item => category === "all" || item.project.category === category);
    } else if (currentLocation.startsWith("tag-")) {
      return Object.keys(PROJECTS_DATA)
        .map(key => ({
          key: key,
          name: PROJECTS_DATA[key].name,
          type: "folder",
          project: PROJECTS_DATA[key]
        }))
        .filter(item => item.project.tag === currentLocation);
    } else {
      const parts = currentLocation.split('/');
      const projKey = parts[0];
      const project = PROJECTS_DATA[projKey];
      if (!project) return [];

      if (parts.length === 1) {
        return project.files;
      } else {
        const subfolderName = parts[parts.length - 1];
        // Find the folder item in the project's files
        var folderItem = null;
        for (var i = 0; i < project.files.length; i++) {
          if (project.files[i].type === "folder" && project.files[i].name === subfolderName) {
            folderItem = project.files[i];
            break;
          }
        }
        if (folderItem && folderItem.children) {
          return folderItem.children;
        }
        return [
          { name: "index.js", type: "file", kind: "JavaScript Document", size: "2 KB", updatedDate: "2 days ago", iconClass: "file-js", preview: "console.log('Inside " + subfolderName + " folder');" },
          { name: "utils.js", type: "file", kind: "JavaScript Document", size: "4 KB", updatedDate: "5 days ago", iconClass: "file-js", preview: "export function formatData() {\n  return true;\n}" },
          { name: "config.json", type: "file", kind: "JSON", size: "0.5 KB", updatedDate: "1 week ago", iconClass: "file-json", preview: "{\n  \"env\": \"production\"\n}" }
        ];
      }
    }
  }

  function getFilteredContent() {
    let content = getCurrentContent();

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      content = content.filter(item => {
        return item.name.toLowerCase().includes(query) || 
               (item.kind && item.kind.toLowerCase().includes(query)) ||
               (item.project && item.project.name.toLowerCase().includes(query)) ||
               (item.project && item.project.description.toLowerCase().includes(query));
      });
    }

    if (currentLocation === "root" && searchQuery.trim() === "") {
      if (currentSidebarFilter === "web") {
        content = content.filter(item => item.project.category === "web");
      } else if (currentSidebarFilter === "mobile") {
        content = content.filter(item => item.project.category === "mobile");
      } else if (currentSidebarFilter === "uiux") {
        content = content.filter(item => item.project.category === "uiux");
      } else if (currentSidebarFilter === "tools") {
        content = content.filter(item => item.project.category === "tools");
      } else if (currentSidebarFilter === "experiments") {
        content = content.filter(item => item.project.category === "experiments");
      } else if (currentSidebarFilter === "tag-featured") {
        content = content.filter(item => item.project.tag === "tag-featured");
      } else if (currentSidebarFilter === "tag-inprogress") {
        content = content.filter(item => item.project.tag === "tag-inprogress");
      } else if (currentSidebarFilter === "tag-complete") {
        content = content.filter(item => item.project.tag === "tag-complete");
      } else if (currentSidebarFilter === "github") {
        content = content.filter(item => item.project.link.includes("github.com"));
      }
    }

    content.sort((a, b) => {
      let valA = a.name.toLowerCase();
      let valB = b.name.toLowerCase();
      
      if (sortBy === "date") {
        valA = a.updatedDate || (a.project && a.project.updatedDate) || "";
        valB = b.updatedDate || (b.project && b.project.updatedDate) || "";
      }

      if (valA < valB) return -1;
      if (valA > valB) return 1;
      return 0;
    });

    return content;
  }

  function renderPreview(item) {
    if (!previewPane) return;
    
    // Only show preview when inside an opened project folder
    if (currentLocation !== "root") {
      const parts = currentLocation.split('/');
      const projKey = parts[0];
      const project = PROJECTS_DATA[projKey];
      if (project) {
        showProjectPreview(project);
        return;
      }
    }

    // At root level, never show the preview pane
    previewPane.style.display = "none";
    previewPane.innerHTML = "";

    function showProjectPreview(project) {
      previewPane.style.display = "flex";
      let techBadgesHtml = "";
      project.techStack.forEach(tech => {
        techBadgesHtml += `<span class="preview-tech-badge">${tech}</span>`;
      });

      const isComplete = project.status.toLowerCase() === "complete";
      const statusClass = isComplete ? "complete" : "in-progress";

      previewPane.innerHTML = `
        <div class="preview-logo-wrapper">
          <img src="${project.icon}" alt="${project.name} App Icon" class="preview-logo">
        </div>
        <div class="preview-title-row">
          <span class="preview-dot" style="background-color: ${isComplete ? 'var(--mac-green)' : 'var(--mac-blue)'}"></span>
          <h3 class="preview-title">${project.name}</h3>
        </div>
        <span class="preview-kind">${project.type}</span>
        
        <p class="preview-desc">${project.description}</p>
        
        <div class="preview-section">
          <span class="preview-section-title">Tech Stack</span>
          <div class="preview-tech-list">
            ${techBadgesHtml}
          </div>
        </div>
        
        <div class="preview-section">
          <span class="preview-section-title">Status</span>
          <span class="preview-status-badge ${statusClass}">${project.status}</span>
        </div>
        
        <div class="preview-section">
          <span class="preview-section-title">Last Updated</span>
          <span class="preview-value-text">${project.updatedDate}</span>
        </div>
        
        <a href="${project.link}" target="_blank" class="preview-open-link">
          <span>Open in New Window</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="7" y1="17" x2="17" y2="7"></line>
            <polyline points="7 7 17 7 17 17"></polyline>
          </svg>
        </a>
      `;
    }
  }

  function renderFinder() {
    if (!filesGrid) return;
    renderBreadcrumbs();

    // Reset mobile search visibility on re-render
    const searchContainer = document.querySelector('.finder-search');
    if (searchContainer) {
      searchContainer.style.display = "";
    }

    const isMobile = window.innerWidth <= 600;

    // Hide iOS browse menu if it exists (we show folders directly on mobile)
    const mainExplorer = document.getElementById('finderMainContent');
    let browseMenu = mainExplorer.querySelector('.ios-browse-menu');
    if (browseMenu) {
      browseMenu.style.display = "none";
    }

    // Update mobile title and back button visibility (iOS Files style)
    const mobileTitle = document.getElementById('mobileTitle');
    const mobileBackBtn = document.getElementById('mobileBackBtn');
    if (mobileTitle) {
      if (currentLocation === "root") {
        mobileTitle.textContent = "Projects";
        if (mobileBackBtn) mobileBackBtn.style.display = "none";
      } else if (currentLocation.startsWith("location-")) {
        const cat = currentLocation.replace("location-", "");
        let label = "All Projects";
        if (cat === "web") label = "Web Apps";
        else if (cat === "mobile") label = "Mobile Apps";
        else if (cat === "uiux") label = "UI / UX Design";
        mobileTitle.textContent = label;
        if (mobileBackBtn) mobileBackBtn.style.display = "";
      } else if (currentLocation.startsWith("tag-")) {
        const tag = currentLocation.replace("tag-", "");
        let label = "Featured";
        if (tag === "inprogress") label = "In Progress";
        else if (tag === "complete") label = "Complete";
        mobileTitle.textContent = label;
        if (mobileBackBtn) mobileBackBtn.style.display = "";
      } else {
        const parts = currentLocation.split('/');
        const subName = parts[parts.length - 1];
        const project = PROJECTS_DATA[subName];
        mobileTitle.textContent = project ? project.name : subName;
        if (mobileBackBtn) mobileBackBtn.style.display = "";
      }
    }

    const content = getFilteredContent();

    statusItemCount.innerText = `${content.length} item${content.length === 1 ? '' : 's'}`;

    filesGrid.style.display = "none";
    filesListContainer.style.display = "none";

    if (viewMode === "grid") {
      filesGrid.style.display = "grid";
      filesGrid.innerHTML = "";

      content.forEach(item => {
        const isFolder = item.type === "folder";
        
        // --- macOS Icons ---
        let macIconHtml = "";
        let hasTagDot = false;
        let tagColor = "";

        if (currentLocation === "root" || currentLocation.startsWith("location-") || currentLocation.startsWith("tag-") || currentLocation === "shared") {
          const appIcon = (item.project && item.project.icon) ? item.project.icon : '';
          macIconHtml = getFolderSvg(appIcon);
          if (item.project && item.project.tag) {
            hasTagDot = true;
            if (item.project.tag === "tag-featured") tagColor = "var(--mac-yellow)";
            else if (item.project.tag === "tag-inprogress") tagColor = "var(--mac-blue)";
            else if (item.project.tag === "tag-complete") tagColor = "var(--mac-green)";
          }
        } else {
          macIconHtml = isFolder ? getFolderSvg() : (item.isImage ? `
            <div class="mac-file--img">
              <img src="${item.imageSrc}" class="mac-file-img-preview" alt="" />
            </div>
          ` : getFileSvg(item.iconClass, item.name));
        }

        // --- iOS Icons ---
        let iosIconHtml = "";
        if (isFolder) {
          const appIcon = (item.project && item.project.icon) ? item.project.icon : '';
          iosIconHtml = getFolderSvg(appIcon);
        } else {
          if (item.isImage) {
            iosIconHtml = `
              <div class="ios-file ios-file--img">
                <img src="${item.imageSrc}" class="ios-file-img-preview" alt="" />
              </div>
            `;
          } else {
            iosIconHtml = getFileSvg(item.iconClass, item.name);
          }
        }

        const isSelected = selectedItem && selectedItem.name === item.name;

        const gridItem = document.createElement('div');
        gridItem.className = `grid-item ${isSelected ? 'selected' : ''}`;
        gridItem.setAttribute('tabindex', '0');

          gridItem.innerHTML = `
          <div class="grid-item-icon-wrapper">
            <div class="mac-icon-container">
              ${macIconHtml}
            </div>
            <div class="ios-icon-container">
              ${iosIconHtml}
            </div>
          </div>
          <div class="grid-item-details">
            <span class="grid-item-name">${item.name}</span>
            <span class="grid-item-desc">${isFolder ? (item.items ? `${item.items} items` : 'Folder') : (item.size || 'File')}</span>
          </div>
        `;

        gridItem.addEventListener('click', function(e) {
          e.stopPropagation();
          
          const isMobileView = window.innerWidth <= 600;
          const isSel = selectedItem && selectedItem.name === item.name;
          
          selectedItem = item;
          filesGrid.querySelectorAll('.grid-item').forEach(el => el.classList.remove('selected'));
          gridItem.classList.add('selected');
          
          if (isMobileView) {
            if (isFolder) {
              const dest = (currentLocation === "root" || currentLocation.startsWith("location-") || currentLocation.startsWith("tag-") || currentLocation === "shared") ? item.key : `${currentLocation}/${item.name}`;
              navigateTo(dest);
            } else {
              if (isSel) {
                if (item.isWebLink || item.isGitLink) {
                  window.open(item.link, '_blank');
                } else {
                  openQuickLookModal(item);
                }
              }
            }
          }
        });

        gridItem.addEventListener('dblclick', function(e) {
          e.stopPropagation();
          const isMobileView = window.innerWidth <= 600;
          if (isMobileView) return; // handled by click listener
          
          if (isFolder) {
            const dest = (currentLocation === "root" || currentLocation.startsWith("location-") || currentLocation.startsWith("tag-") || currentLocation === "shared") ? item.key : `${currentLocation}/${item.name}`;
            navigateTo(dest);
          } else if (item.isWebLink || item.isGitLink) {
            window.open(item.link, '_blank');
          } else {
            openQuickLookModal(item);
          }
        });

        filesGrid.appendChild(gridItem);
      });

    } else if (viewMode === "list") {
      filesListContainer.style.display = "block";
      listBody.innerHTML = "";

      content.forEach(item => {
        const isFolder = item.type === "folder";
        let iconHtml = "";
        let kindText = "Folder";
        let sizeText = "";

        if (currentLocation === "root") {
          const appIcon = (item.project && item.project.icon) ? item.project.icon : '';
          iconHtml = getFolderSvg(appIcon);
          kindText = item.project.type;
          sizeText = "--";
        } else {
          iconHtml = isFolder ? getFolderSvg() : (item.isImage ? `
            <div class="mac-file--img list-view-img">
              <img src="${item.imageSrc}" class="mac-file-img-preview" alt="" />
            </div>
          ` : getFileSvg(item.iconClass, item.name));
          kindText = isFolder ? "Folder" : (item.kind || "File");
          sizeText = isFolder ? "--" : (item.size || "");
        }

        const isSelected = selectedItem && selectedItem.name === item.name;
        const tr = document.createElement('tr');
        if (isSelected) tr.className = "selected";

        tr.innerHTML = `
          <td>
            <div class="list-item-name-cell">
              ${iconHtml}
              <span>${item.name}</span>
            </div>
          </td>
          <td>${item.updatedDate || (item.project && item.project.updatedDate) || "Today"}</td>
          <td>${sizeText}</td>
          <td>${kindText}</td>
        `;

        tr.addEventListener('click', function(e) {
          e.stopPropagation();
          selectedItem = item;
          listBody.querySelectorAll('tr').forEach(el => el.classList.remove('selected'));
          tr.classList.add('selected');
        });

        tr.addEventListener('dblclick', function(e) {
          e.stopPropagation();
          if (isFolder) {
            const dest = currentLocation === "root" ? item.key : `${currentLocation}/${item.name}`;
            navigateTo(dest);
          } else if (item.isWebLink || item.isGitLink) {
            window.open(item.link, '_blank');
          } else {
            openQuickLookModal(item);
          }
        });

        listBody.appendChild(tr);
      });

    } else if (viewMode === "columns") {
      const colContainer = document.createElement('div');
      colContainer.className = "columns-container";
      filesGrid.parentElement.appendChild(colContainer);

      const parts = currentLocation.split('/');
      const projKey = parts[0];
      const project = PROJECTS_DATA[projKey];

      const colPane1 = document.createElement('div');
      colPane1.className = "column-pane";
      colContainer.appendChild(colPane1);

      const items = project.files;
      items.forEach(item => {
        const isFolder = item.type === "folder";
        const icon = isFolder ? getFolderSvg() : (item.isImage ? `
          <div class="mac-file--img column-view-img">
            <img src="${item.imageSrc}" class="mac-file-img-preview" alt="" />
          </div>
        ` : getFileSvg(item.iconClass, item.name));
        const isSelected = selectedItem && selectedItem.name === item.name;

        const colItem = document.createElement('div');
        colItem.className = `column-item ${isSelected ? 'selected' : ''}`;
        colItem.innerHTML = `
          <div class="column-item-left">
            ${icon}
            <span>${item.name}</span>
          </div>
          ${isFolder ? '<span class="column-item-arrow">›</span>' : ''}
        `;

        colItem.addEventListener('click', function(e) {
          e.stopPropagation();
          selectedItem = item;
          
          colPane1.querySelectorAll('.column-item').forEach(el => el.classList.remove('selected'));
          colItem.classList.add('selected');

          const existingCol2 = colContainer.querySelector('.column-pane:nth-child(2)');
          if (existingCol2) colContainer.removeChild(existingCol2);

          if (isFolder) {
            const colPane2 = document.createElement('div');
            colPane2.className = "column-pane";
            colContainer.appendChild(colPane2);

            const subfolderName = item.name;
            const subItems = [
              { name: "index.js", type: "file", kind: "JavaScript Document", size: "2 KB", updatedDate: "2 days ago", iconClass: "file-js", preview: "console.log('Inside " + subfolderName + " folder');" },
              { name: "utils.js", type: "file", kind: "JavaScript Document", size: "4 KB", updatedDate: "5 days ago", iconClass: "file-js", preview: "export function formatData() {\n  return true;\n}" },
              { name: "config.json", type: "file", kind: "JSON", size: "0.5 KB", updatedDate: "1 week ago", iconClass: "file-json", preview: "{\n  \"env\": \"production\"\n}" }
            ];

            subItems.forEach(subItem => {
              const subIcon = getFileSvg(subItem.iconClass, subItem.name);
              const subColItem = document.createElement('div');
              subColItem.className = "column-item";
              subColItem.innerHTML = `
                <div class="column-item-left">
                  ${subIcon}
                  <span>${subItem.name}</span>
                </div>
              `;
              subColItem.addEventListener('click', function(subE) {
                subE.stopPropagation();
                colPane2.querySelectorAll('.column-item').forEach(el => el.classList.remove('selected'));
                subColItem.classList.add('selected');
                renderPreview(subItem);
              });
              subColItem.addEventListener('dblclick', function(subE) {
                subE.stopPropagation();
                openQuickLookModal(subItem);
              });
              colPane2.appendChild(subColItem);
            });
          } else {
            renderPreview(item);
          }
        });

        colPane1.appendChild(colItem);
      });

      const cleanColumns = () => {
        const colC = finderWindow.querySelector('.columns-container');
        if (colC) colC.parentElement.removeChild(colC);
      };
      
      filesGrid.dataset.columnsCleanup = "true";
      window.addEventListener('locationchanged', cleanColumns, { once: true });
    }

    if (selectedItem) {
      renderPreview(selectedItem);
    } else {
      renderPreview(null);
    }
  }

  function openQuickLookModal(item) {
    const overlay = document.createElement('div');
    overlay.className = "mac-modal-overlay";
    
    let modalBodyHtml = "";
    if (item.isImage) {
      modalBodyHtml = `<img src="${item.imageSrc}" class="mac-modal-img" alt="${item.name}">`;
    } else if (item.kind === "Markdown" && item.preview) {
      modalBodyHtml = `<div class="mac-modal-markdown">${renderMarkdown(item.preview)}</div>`;
    } else if (item.preview) {
      modalBodyHtml = `<pre class="mac-modal-code">${escapeHtml(item.preview)}</pre>`;
    } else {
      modalBodyHtml = `<div style="text-align: center; padding: 40px 0;"><span style="font-size: 48px;">📄</span><h4 style="margin-top:16px;">${item.name}</h4><p style="color:var(--mac-text-muted); font-size:12px;">No preview available for this file type (${item.size || "Unknown Size"})</p></div>`;
    }

    overlay.innerHTML = `
      <div class="mac-modal">
        <div class="mac-modal-header">
          <span class="mac-modal-title">${item.name} — Quick Look</span>
          <button class="mac-modal-close" aria-label="Close modal">×</button>
        </div>
        <div class="mac-modal-body">
          ${modalBodyHtml}
        </div>
      </div>
    `;

    overlay.querySelector('.mac-modal-close').addEventListener('click', () => {
      document.body.removeChild(overlay);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) document.body.removeChild(overlay);
    });

    document.body.appendChild(overlay);
  }

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function renderMarkdown(text) {
    if (!text) return "";
    const lines = text.split('\n');
    let html = "";
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];
      const trimmed = line.trim();

      // Handle bullet lists
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        if (!inList) {
          html += '<ul class="md-list">';
          inList = true;
        }
        const itemText = trimmed.substring(2);
        html += `<li>${parseInlineMarkdown(itemText)}</li>`;
      } else {
        if (inList) {
          html += '</ul>';
          inList = false;
        }
        
        // Handle headers
        if (trimmed.startsWith('# ')) {
          html += `<h1 class="md-h1">${parseInlineMarkdown(trimmed.substring(2))}</h1>`;
        } else if (trimmed.startsWith('## ')) {
          html += `<h2 class="md-h2">${parseInlineMarkdown(trimmed.substring(3))}</h2>`;
        } else if (trimmed.startsWith('### ')) {
          html += `<h3 class="md-h3">${parseInlineMarkdown(trimmed.substring(4))}</h3>`;
        } else if (trimmed === '') {
          // Empty line
        } else {
          // Normal paragraph
          html += `<p class="md-p">${parseInlineMarkdown(trimmed)}</p>`;
        }
      }
    }

    if (inList) {
      html += '</ul>';
    }

    return html;
  }

  function parseInlineMarkdown(text) {
    const escaped = escapeHtml(text);
    return escaped
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code class="md-code">$1</code>');
  }

  function openSortActionSheet() {
    const backdrop = document.createElement('div');
    backdrop.className = "ios-action-sheet-backdrop";
    
    backdrop.innerHTML = `
      <div class="ios-action-sheet">
        <div class="ios-action-sheet-group">
          <div class="ios-action-sheet-title">Sort Items By</div>
          <button class="ios-action-sheet-btn" id="sortByNameBtn">
            <span>Name</span>
            ${sortBy === 'name' ? '<span class="ios-check">✓</span>' : ''}
          </button>
          <button class="ios-action-sheet-btn" id="sortByDateBtn">
            <span>Date Modified</span>
            ${sortBy === 'date' ? '<span class="ios-check">✓</span>' : ''}
          </button>
        </div>
        <div class="ios-action-sheet-group">
          <button class="ios-action-sheet-btn cancel" id="cancelActionSheetBtn">Cancel</button>
        </div>
      </div>
    `;
    
    document.body.appendChild(backdrop);
    
    setTimeout(() => backdrop.classList.add('show'), 10);
    
    const closeSheet = () => {
      backdrop.classList.remove('show');
      setTimeout(() => document.body.removeChild(backdrop), 300);
    };
    
    backdrop.querySelector('#sortByNameBtn').addEventListener('click', () => {
      sortBy = "name";
      renderFinder();
      closeSheet();
    });
    
    backdrop.querySelector('#sortByDateBtn').addEventListener('click', () => {
      sortBy = "date";
      renderFinder();
      closeSheet();
    });
    
    backdrop.querySelector('#cancelActionSheetBtn').addEventListener('click', closeSheet);
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) closeSheet();
    });
  }

  if (finderWindow) {
    zoomSlider.addEventListener('input', function() {
      const val = this.value;
      finderWindow.style.setProperty('--mac-icon-size', `${val}px`);
    });

    function cleanupColumnsPane() {
      const colContainer = finderWindow.querySelector('.columns-container');
      if (colContainer) colContainer.parentElement.removeChild(colContainer);
      window.dispatchEvent(new Event('locationchanged'));
    }

    searchInput.addEventListener('input', function() {
      searchQuery = this.value;
      renderFinder();
    });

    backBtn.addEventListener('click', navigateBack);
    forwardBtn.addEventListener('click', navigateForward);

    // Mobile back button (iOS Files style)
    const mobileBackBtn = document.getElementById('mobileBackBtn');
    if (mobileBackBtn) {
      mobileBackBtn.addEventListener('click', navigateBack);
    }

    // Mobile options button (Sort Action Sheet)
    const mobileSearchBtn = document.getElementById('mobileSearchBtn');
    if (mobileSearchBtn) {
      mobileSearchBtn.addEventListener('click', function() {
        openSortActionSheet();
      });
    }

    // Bottom bar category clicks (iOS Files app style)
    const bottomBarItems = finderWindow.querySelectorAll('.bottom-bar-item');
    bottomBarItems.forEach(item => {
      item.addEventListener('click', function() {
        bottomBarItems.forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        
        const cat = this.getAttribute('data-cat');
        selectedItem = null;
        currentSidebarFilter = "all";
        cleanupColumnsPane();
        
        if (cat === "all") {
          currentLocation = "root";
        } else if (cat === "web" || cat === "mobile" || cat === "uiux") {
          currentLocation = "location-" + cat;
        }
        renderFinder();
      });
    });

    const sidebarItems = finderWindow.querySelectorAll('.sidebar-item');
    sidebarItems.forEach(item => {
      item.addEventListener('click', function() {
        sidebarItems.forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        
        currentSidebarFilter = this.getAttribute('data-sidebar');
        currentLocation = "root";
        selectedItem = null;
        cleanupColumnsPane();
        renderFinder();
      });
    });

    const actionSortName = document.getElementById('actionSortName');
    const actionSortDate = document.getElementById('actionSortDate');
    const actionGetInfo = document.getElementById('actionGetInfo');

    if (actionSortName) {
      actionSortName.addEventListener('click', (e) => {
        e.preventDefault();
        sortBy = "name";
        renderFinder();
      });
    }

    if (actionSortDate) {
      actionSortDate.addEventListener('click', (e) => {
        e.preventDefault();
        sortBy = "date";
        renderFinder();
      });
    }

    if (actionGetInfo) {
      actionGetInfo.addEventListener('click', (e) => {
        e.preventDefault();
        if (selectedItem) {
          openQuickLookModal(selectedItem);
        } else {
          alert("Please select a file or folder first.");
        }
      });
    }

    const shareCopyLink = document.getElementById('shareCopyLink');
    const shareTwitter = document.getElementById('shareTwitter');
    const shareEmail = document.getElementById('shareEmail');

    if (shareCopyLink) {
      shareCopyLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      });
    }

    if (shareTwitter) {
      shareTwitter.addEventListener('click', (e) => {
        e.preventDefault();
        window.open("https://twitter.com/intent/tweet?text=Checkout my interactive portfolio!", "_blank");
      });
    }

    if (shareEmail) {
      shareEmail.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = "mailto:?subject=Interactive Portfolio&body=Checkout this awesome macOS Finder app in a portfolio: " + window.location.href;
      });
    }

    closeBtn.addEventListener('click', () => {
      finderWindow.classList.add('closed');
      
      let reopenBtn = document.getElementById('reopenFinderBtn');
      if (!reopenBtn) {
        reopenBtn = document.createElement('button');
        reopenBtn.id = "reopenFinderBtn";
        reopenBtn.className = "reopen-finder-trigger";
        reopenBtn.innerHTML = `
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          <span>Re-open Projects Explorer</span>
        `;
        finderWindow.parentElement.appendChild(reopenBtn);
        
        reopenBtn.addEventListener('click', () => {
          finderWindow.classList.remove('closed');
          reopenBtn.style.display = "none";
        });
      }
      reopenBtn.style.display = "inline-flex";
    });

    minimizeBtn.addEventListener('click', () => {
      finderWindow.classList.toggle('minimized');
      if (finderWindow.classList.contains('minimized')) {
        const restore = (e) => {
          if (!finderWindow.contains(e.target) && finderWindow.classList.contains('minimized')) {
            finderWindow.classList.remove('minimized');
            document.removeEventListener('click', restore);
          }
        };
        setTimeout(() => document.addEventListener('click', restore), 100);
      }
    });

    maximizeBtn.addEventListener('click', () => {
      finderWindow.classList.toggle('maximized-state');
    });

    finderWindow.addEventListener('click', (e) => {
      if (!e.target.closest('.grid-item') && !e.target.closest('tr') && !e.target.closest('.column-item') && !e.target.closest('.finder-preview') && !e.target.closest('.finder-titlebar') && !e.target.closest('.finder-sidebar') && !e.target.closest('.new-project-item')) {
        selectedItem = null;
        renderFinder();
      }
    });

    renderFinder();
  }

  // ---- Hero cursor interaction ----
  const heroSection = document.getElementById('hero');
  const trackCircle = document.querySelector('[data-circle="track"]');
  const fleeCircle = document.querySelector('[data-circle="flee"]');
  const heroImageW = document.querySelector('.hero-image-wrapper');

  if (heroSection && trackCircle && fleeCircle && heroImageW) {
    heroSection.addEventListener('mousemove', function (e) {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const dx = (x - cx) / cx;
      const dy = (y - cy) / cy;

      trackCircle.style.transform = 'translate(calc(-50% + ' + (dx * 30) + 'px), calc(-50% + ' + (dy * 30) + 'px))';
      fleeCircle.style.transform = 'translate(calc(-50% - ' + (dx * 40) + 'px), calc(-50% - ' + (dy * 40) + 'px))';
      heroImageW.style.transform = 'translate(' + (dx * 8) + 'px, ' + (dy * 8) + 'px)';
    });

    heroSection.addEventListener('mouseleave', function () {
      trackCircle.style.transform = '';
      fleeCircle.style.transform = '';
      heroImageW.style.transform = '';
    });
  }

  // ---- macOS Dock Magnification and Launch Interaction ----
  const dock = document.querySelector('.macos-dock');
  const dockItems = document.querySelectorAll('.dock-item');

  if (dock && dockItems.length > 0) {
    const baseWidth = 56;
    const distanceLimit = baseWidth * 6; // 336
    
    const distanceInput = [
      -distanceLimit,
      -distanceLimit / 1.25,
      -distanceLimit / 2,
      0,
      distanceLimit / 2,
      distanceLimit / 1.25,
      distanceLimit
    ];
    
    const widthOutput = [
      baseWidth,
      baseWidth * 1.1,
      baseWidth * 1.414,
      baseWidth * 2,
      baseWidth * 1.414,
      baseWidth * 1.1,
      baseWidth
    ];

    function interpolate(x, input, output) {
      if (x <= input[0]) return output[0];
      if (x >= input[input.length - 1]) return output[output.length - 1];
      for (let i = 0; i < input.length - 1; i++) {
        if (x >= input[i] && x <= input[i+1]) {
          const x0 = input[i];
          const x1 = input[i+1];
          const y0 = output[i];
          const y1 = output[i+1];
          return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
        }
      }
      return output[0];
    }

    const items = Array.from(dockItems).map(item => ({
      element: item,
      currentWidth: baseWidth,
      targetWidth: baseWidth,
      velocity: 0
    }));

    let mouseX = null;
    const stiffness = 0.12;
    const damping = 0.47;

    dock.addEventListener('mousemove', function (e) {
      mouseX = e.clientX;
    });

    dock.addEventListener('mouseleave', function () {
      mouseX = null;
    });

    function updateDockPhysics() {
      items.forEach(item => {
        if (mouseX !== null) {
          const rect = item.element.getBoundingClientRect();
          const imgCenterX = rect.left + rect.width / 2;
          const distance = mouseX - imgCenterX;
          item.targetWidth = interpolate(distance, distanceInput, widthOutput);
        } else {
          item.targetWidth = baseWidth;
        }

        // Spring equations
        const force = -stiffness * (item.currentWidth - item.targetWidth) - damping * item.velocity;
        item.velocity += force;
        item.currentWidth += item.velocity;

        // Apply dynamic size
        item.element.style.setProperty('--size', `${item.currentWidth}px`);
      });

      requestAnimationFrame(updateDockPhysics);
    }

    // Start loop
    requestAnimationFrame(updateDockPhysics);

    dockItems.forEach(function (item) {
      item.addEventListener('click', function () {
        if (item.classList.contains('launching')) return;
        
        item.classList.add('launching');
        
        setTimeout(function () {
          item.classList.remove('launching');
          const indicator = item.querySelector('.dock-indicator');
          if (indicator) {
            indicator.classList.add('active');
          }
        }, 900);
      });
    });

    // Resume download handler
    var dockResume = document.getElementById('dockResume');
    if (dockResume) {
      dockResume.addEventListener('click', function (e) {
        e.stopPropagation();
        var a = document.createElement('a');
        a.href = 'Sudheep_VS_Resume.pdf.pdf';
        a.download = 'Sudheep_Resume.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      });
    }
  }

  // ---- Mobile Dock Control Logic ----
  function initMobileDock() {
    const skillsSection = document.getElementById('content');
    const statsContainer = document.querySelector('.documenting-stats');

    if (skillsSection && 'IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            if (statsContainer) {
              statsContainer.classList.add('visible');
            }
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
      });

      observer.observe(skillsSection);
    } else if (skillsSection) {
      // Fallback
      skillsSection.classList.add('visible');
      if (statsContainer) {
        statsContainer.classList.add('visible');
      }
    }
  }

  // ---- About scroll typing animation ----
  function initAboutScrollAnimation() {
    console.log('initAboutScrollAnimation: Initializing...');
    const element = document.querySelector('.about-main-text');
    
    if (!element) {
      console.error('initAboutScrollAnimation: .about-main-text element not found.');
      return;
    }

    const originalText = element.textContent;
    
    // Set up accessibility labels so screen readers read the full text properly
    element.setAttribute('aria-label', originalText.trim().replace(/\s+/g, ' '));
    
    // Clear element content and create container
    element.innerHTML = '';
    const revealContainer = document.createElement('span');
    revealContainer.setAttribute('aria-hidden', 'true');
    revealContainer.className = 'about-text-reveal';
    element.appendChild(revealContainer);

    // Split text by double newlines to preserve paragraphs/breaks
    const paragraphs = originalText.trim().split(/\n\s*\n/);
    const chars = [];

    paragraphs.forEach((pText, pIndex) => {
      const normalizedPText = pText.trim().replace(/\s+/g, ' ');
      const words = normalizedPText.split(' ');

      words.forEach((wordText, wordIndex) => {
        // Create a span for the word to prevent line breaks inside the word
        const wordSpan = document.createElement('span');
        wordSpan.style.whiteSpace = 'nowrap';
        
        // Split the word into characters
        const wordChars = wordText.split('');
        wordChars.forEach(char => {
          const charSpan = document.createElement('span');
          charSpan.textContent = char;
          charSpan.className = 'about-scroll-char';
          wordSpan.appendChild(charSpan);
          chars.push(charSpan);
        });

        revealContainer.appendChild(wordSpan);

        // Append space after the word (except after the very last word of the paragraph)
        if (wordIndex < words.length - 1) {
          const spaceSpan = document.createElement('span');
          spaceSpan.textContent = ' ';
          spaceSpan.className = 'about-scroll-char';
          revealContainer.appendChild(spaceSpan);
          chars.push(spaceSpan);
        }
      });

      // Insert line breaks between paragraphs
      if (pIndex < paragraphs.length - 1) {
        const br1 = document.createElement('br');
        const br2 = document.createElement('br');
        revealContainer.appendChild(br1);
        revealContainer.appendChild(br2);
      }
    });

    console.log('initAboutScrollAnimation: Created character spans count:', chars.length);

    // Update active characters on scroll
    function updateReveal() {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      // We want the reveal to start when the top of the text container is at 80% of the viewport height.
      // We want the reveal to end when the bottom of the text container is at 30% of the viewport height.
      const startScroll = viewportHeight * 0.8;
      const endScroll = viewportHeight * 0.3;

      const startTop = startScroll;
      const endTop = endScroll - rect.height;

      const totalDist = startTop - endTop;
      const currentDist = startTop - rect.top;

      let progress = currentDist / totalDist;
      progress = Math.max(0, Math.min(1, progress));

      // Guard against invalid viewport height or NaN division
      if (isNaN(progress) || totalDist <= 0) {
        progress = 1;
      }

      // Calculate how many characters should be active (black)
      const totalChars = chars.length;
      const activeCount = Math.floor(progress * totalChars);

      for (let i = 0; i < totalChars; i++) {
        if (i < activeCount) {
          chars[i].classList.add('active');
        } else {
          chars[i].classList.remove('active');
        }
      }
    }

    // Register scroll and resize event listeners on both window and document to ensure compatibility
    window.addEventListener('scroll', updateReveal, { passive: true });
    document.addEventListener('scroll', updateReveal, { passive: true });
    window.addEventListener('resize', updateReveal, { passive: true });
    
    // Also run on page fully loaded to ensure styles and layouts are resolved
    window.addEventListener('load', updateReveal, { passive: true });
    
    updateReveal(); // Trigger initially
    console.log('initAboutScrollAnimation: Initial setup complete. Event listeners attached.');
  }

  // ---- Init ----
  init();

})();
