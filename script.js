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

  // ---- Journey horizontal scroll (sticky + translateX) ----
  const journeySection = document.getElementById('journey');
  const journeyContent = journeySection?.querySelector('.journey-content');
  const journeyPin = journeySection?.querySelector('.journey-pin');

  let jResizeTimer;
  let cachedVh = 0;

  function initJourneyScroll() {
    if (!journeySection || !journeyContent) return 0;

    cachedVh = window.visualViewport?.height ?? window.innerHeight;
    const maxScroll = Math.max(0, journeyContent.scrollWidth - cachedVh);
    
    // Scale scroll height on mobile to make it feel snappier and reduce scrolling distance
    const isMobile = window.innerWidth <= 768;
    const multiplier = isMobile ? 0.45 : 1.0;

    journeySection.style.height = (cachedVh + maxScroll * multiplier) + 'px';
    if (journeyPin) {
      journeyPin.style.height = cachedVh + 'px';
    }
    return maxScroll * multiplier;
  }

  function updateJourneyScroll() {
    if (!journeySection || !journeyContent) return;

    const sectionRect = journeySection.getBoundingClientRect();
    const sectionHeight = journeySection.offsetHeight;
    const viewportH = cachedVh || window.innerHeight;
    const scrollable = sectionHeight - viewportH;
    if (scrollable <= 0) return;

    const progress = Math.max(0, Math.min(1, -sectionRect.top / scrollable));
    const maxScroll = Math.max(0, journeyContent.scrollWidth - window.innerWidth);

    journeyContent.style.transform = 'translateX(' + (-progress * maxScroll) + 'px)';
  }

  let lastWidth = window.innerWidth;

  window.addEventListener('resize', function () {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;

    clearTimeout(jResizeTimer);
    jResizeTimer = setTimeout(function () {
      initJourneyScroll();
      updateJourneyScroll();
      if (typeof renderFinder === 'function') {
        renderFinder();
      }
    }, 100);
  });

  initJourneyScroll();
  document.addEventListener('scroll', updateJourneyScroll, { passive: true });
  updateJourneyScroll();
  window.addEventListener('load', function () {
    initJourneyScroll();
    updateJourneyScroll();
  });

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
    dilemaa: {
      name: "Dilemaa",
      type: "Web App",
      category: "web",
      tag: "tag-featured",
      dotColor: "var(--mac-yellow)",
      updatedText: "Updated 2 days ago",
      updatedDate: "2 days ago",
      icon: "public/media/dilemaa.png",
      description: "A Q&A social platform where people share real life dilemmas and get advice.",
      techStack: ["React Native", "Node.js", "Supabase", "Azure", "ML API"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://github.com",
      files: [
        { name: "src", type: "folder", items: 25, updatedDate: "2 days ago" },
        { name: "public", type: "folder", items: 12, updatedDate: "5 days ago" },
        { name: "components", type: "folder", items: 18, updatedDate: "2 days ago" },
        { name: "assets", type: "folder", items: 32, updatedDate: "3 days ago" },
        { name: ".gitignore", type: "file", kind: "Text Document", size: "1 KB", updatedDate: "1 week ago", iconClass: "file-text", preview: "node_modules/\n.env\ndist/\n.DS_Store\n*.log" },
        { name: "App.jsx", type: "file", kind: "JavaScript JSX", size: "3 KB", updatedDate: "2 days ago", iconClass: "file-react", preview: "import React from 'react';\nimport { View, Text } from 'react-native';\nimport DilemmaFeed from './src/DilemmaFeed';\n\nexport default function App() {\n  return (\n    <View style={{ flex: 1, backgroundColor: '#032130' }}>\n      <DilemmaFeed />\n    </View>\n  );\n}" },
        { name: "main.jsx", type: "file", kind: "JavaScript JSX", size: "1.2 KB", updatedDate: "3 days ago", iconClass: "file-react", preview: "import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\nimport './styles.css';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode>\n    <App />\n  </React.StrictMode>\n);" },
        { name: "styles.css", type: "file", kind: "CSS", size: "8 KB", updatedDate: "2 days ago", iconClass: "file-css", preview: "body {\n  margin: 0;\n  font-family: -apple-system, sans-serif;\n  background-color: #032130;\n  color: #ffffff;\n}\n\n.card {\n  border-radius: 12px;\n  padding: 16px;\n}" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "2 days ago", iconClass: "file-chrome", isWebLink: true, link: "https://dilemaa.app", preview: "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <title>Dilemaa - Social Q&A</title>\n</head>\n<body>\n  <div id=\"root\"></div>\n</body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "16 KB", updatedDate: "2 days ago", iconClass: "file-text", preview: "# Dilemaa\n\nA Q&A social platform where people share real life dilemmas and get advice from the community.\n\n## Overview\nDilemaa is a modern social platform built for authentic conversations. Users post real-life dilemmas anonymously and receive thoughtful advice through voting and comments.\n\n## Tech Stack\n- React Native (Mobile & Web)\n- Node.js + Express (Backend API)\n- Supabase (Database & Auth)\n- Azure (Cloud Infrastructure)\n- ML API (Content Moderation)\n\n## Features\n- Anonymous dilemma posting with category tags\n- Upvote/downvote system for community-driven advice\n- Real-time comment threads with reply nesting\n- Personalized dashboard tracking your dilemmas\n- ML-powered content moderation for safe conversations\n- Push notifications for replies and milestones\n- Dark mode UI with smooth animations\n\n## Architecture\nThe app follows a monorepo structure with shared TypeScript types between frontend and backend. The React Native app uses Expo for cross-platform deployment, while the backend runs on Azure Functions for serverless scalability.\n\n## Challenges Solved\n- Implemented real-time updates using WebSockets\n- Built a custom moderation ML pipeline using TensorFlow.js\n- Optimized database queries reducing load times by 60%\n- Designed anonymous identity system with optional verification\n\n## Future Roadmap\n- AI-powered dilemma suggestions\n- Community rewards and badges\n- Mobile push notification system\n- Multi-language support\n- Premium subscription tier\n\n## Status: Complete\nDeployed and actively used by the community." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "2 days ago", children: [
          { name: "feed.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "2 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/dilemaa-launch.jpg" },
          { name: "post-detail.png", type: "file", kind: "PNG Image", size: "0.9 MB", updatedDate: "2 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/dilemaa.png" },
          { name: "profile.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "2 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/dilemaa-launch.jpg" },
          { name: "onboarding.png", type: "file", kind: "PNG Image", size: "0.8 MB", updatedDate: "2 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/dilemaa.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "2 days ago", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/dilemaa", preview: "Dilemaa GitHub Repository\n\nDouble-click to open in browser." }
      ]
    },
    nostalgia: {
      name: "Nostalgia",
      type: "Web App",
      category: "web",
      tag: "tag-featured",
      dotColor: "var(--mac-yellow)",
      updatedText: "Updated 1 week ago",
      updatedDate: "1 week ago",
      icon: "public/media/nostalgia_app.png",
      description: "You talk like you would to a friend, and Nostalgia turns the conversation into structured journals you can revisit.",
      techStack: ["React Native", "Supabase", "AI Conversation Flows"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://github.com",
      files: [
        { name: "src", type: "folder", items: 15, updatedDate: "1 week ago" },
        { name: "components", type: "folder", items: 8, updatedDate: "1 week ago" },
        { name: "package.json", type: "file", kind: "JSON", size: "1.2 KB", updatedDate: "1 week ago", iconClass: "file-json", preview: "{\n  \"name\": \"nostalgia\",\n  \"dependencies\": {\n    \"@google/generative-ai\": \"^0.1.0\",\n    \"supabase-js\": \"^2.0.0\"\n  }\n}" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "1 week ago", iconClass: "file-chrome", isWebLink: true, link: "https://nostalgia-journal.app", preview: "<!DOCTYPE html>\n<html>\n<head><title>Nostalgia - AI Journal</title></head>\n<body>\n  <div id=\"root\"></div>\n</body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "14 KB", updatedDate: "1 week ago", iconClass: "file-text", preview: "# Nostalgia\n\nAn AI-powered conversational journal designed to reduce burnout. Talk naturally and let Nostalgia turn your conversations into structured journals you can revisit.\n\n## Overview\nNostalgia reimagines journaling by making it conversational. Instead of typing out entries, users speak naturally like they would to a friend, and AI structures the conversation into meaningful journal entries.\n\n## Tech Stack\n- React Native (Cross-platform mobile)\n- Supabase (Database & Authentication)\n- Google Generative AI (Conversation Processing)\n- Custom NLP Pipeline\n\n## Features\n- Natural conversation-based journaling\n- AI-powered sentiment analysis and mood tracking\n- Auto-generated weekly reflection summaries\n- Secure cloud sync across devices\n- Privacy-first design with end-to-end encryption\n- Beautiful, calming UI with nature-inspired themes\n- Search and filter past entries by mood, date, or topic\n\n## Architecture\nThe app uses a hybrid architecture where AI processing happens server-side via Google's Gemini API, while the client handles real-time conversation flow. Entries are encrypted client-side before being stored in Supabase.\n\n## Challenges Solved\n- Designed conversation flow that feels natural, not interrogative\n- Implemented client-side encryption for privacy\n- Built AI prompt engineering for accurate journal structuring\n- Optimized for low-latency conversation processing\n\n## Future Roadmap\n- Voice-based journaling with speech-to-text\n- AI companion mode with proactive check-ins\n- Shared journals for therapy/counseling\n- Integration with Apple Health for wellness insights\n\n## Status: Complete\nAvailable on iOS and Android." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "1 week ago", children: [
          { name: "chat-view.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/nostalgia_app.png" },
          { name: "journal-entry.png", type: "file", kind: "PNG Image", size: "0.9 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/nostalgia.png" },
          { name: "mood-tracker.png", type: "file", kind: "PNG Image", size: "1.0 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/nostalgia_app.png" },
          { name: "settings.png", type: "file", kind: "PNG Image", size: "0.7 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/nostalgia.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "1 week ago", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/nostalgia", preview: "Nostalgia GitHub Repository\n\nDouble-click to open in browser." }
      ]
    },
    sae: {
      name: "Sae",
      type: "Mobile App",
      category: "mobile",
      tag: "tag-featured",
      dotColor: "var(--mac-yellow)",
      updatedText: "Updated 3 days ago",
      updatedDate: "3 days ago",
      icon: "public/media/sae.png",
      description: "A Korean-learning app that feels like a game: S-curve paths, a magpie mascot, and focused Hangul drills.",
      techStack: ["Custom Lesson Engine", "JSON Scenes", "React Native"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://github.com",
      files: [
        { name: "assets", type: "folder", items: 40, updatedDate: "3 days ago" },
        { name: "lessons.json", type: "file", kind: "JSON", size: "12 KB", updatedDate: "3 days ago", iconClass: "file-json", preview: "{\n  \"lessons\": [\n    { \"id\": 1, \"title\": \"Hangul Vowels\", \"magpieIntro\": \"Hello! Let's study...\" }\n  ]\n}" },
        { name: "App.tsx", type: "file", kind: "TypeScript TSX", size: "4 KB", updatedDate: "3 days ago", iconClass: "file-typescript", preview: "import React from 'react';\nimport LessonNavigator from './src/LessonNavigator';\n\nexport default function App() {\n  return <LessonNavigator />;\n}" },
        { name: "package.json", type: "file", kind: "JSON", size: "1.5 KB", updatedDate: "3 days ago", iconClass: "file-json", preview: "{\n  \"name\": \"sae-hangul\"\n}" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "3 days ago", iconClass: "file-chrome", isWebLink: true, link: "https://sae-hangul.app", preview: "<!DOCTYPE html>\n<html>\n<head><title>Sae - Learn Hangul</title></head>\n<body>\n  <div id=\"root\"></div>\n</body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "15 KB", updatedDate: "3 days ago", iconClass: "file-text", preview: "# Sae\n\nA Korean-learning app that feels like a game — S-curve progress paths, a magpie mascot, and focused Hangul drills.\n\n## Overview\nSae (named after the Korean word for 'bird') makes learning Hangul fun and addictive. Progress through beautifully designed S-curve paths, unlock achievements with your magpie companion, and master Korean characters through spaced repetition.\n\n## Tech Stack\n- React Native (Mobile)\n- Custom Lesson Engine (JavaScript)\n- JSON Scene System\n- React Native Animations\n\n## Features\n- S-curve visual progress system for motivational learning\n- Magpie mascot that celebrates milestones\n- Bite-sized Hangul drills with instant feedback\n- Spaced repetition for long-term retention\n- Stroke order animations for every character\n- Pronunciation guide with audio examples\n- Achievement badges and learning streaks\n- Customizable daily goal reminders\n\n## Architecture\nThe lesson engine is built as a configurable JSON-driven system. Each lesson is defined as a scene with interactive elements, making it easy to add new content without code changes.\n\n## Challenges Solved\n- Built a flexible scene-based lesson engine from scratch\n- Designed intuitive stroke order animations\n- Implemented spaced repetition algorithm\n- Optimized for offline-first usage\n\n## Future Roadmap\n- Vocabulary and phrase lessons\n- Grammar guides and exercises\n- K-pop lyric breakdowns\n- Community challenges and leaderboards\n- Korean culture mini-lessons\n\n## Status: Complete\nAvailable on iOS and Android with 10+ lessons covering all Hangul characters." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "3 days ago", children: [
          { name: "lesson-view.png", type: "file", kind: "PNG Image", size: "1.3 MB", updatedDate: "3 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/sae.png" },
          { name: "progress-map.png", type: "file", kind: "PNG Image", size: "1.0 MB", updatedDate: "3 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/sae.png" },
          { name: "character-drill.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "3 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/sae.png" },
          { name: "achievements.png", type: "file", kind: "PNG Image", size: "0.9 MB", updatedDate: "3 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/sae.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "3 days ago", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/sae-hangul", preview: "Sae GitHub Repository\n\nDouble-click to open in browser." }
      ]
    },
    portfolio: {
      name: "Personal Portfolio",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated today",
      updatedDate: "Today",
      icon: "public/media/ben.png",
      description: "A pixel-perfect, premium personal portfolio website showcasing projects, skills, and life milestones.",
      techStack: ["HTML", "CSS", "JavaScript", "Scroll animations"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://github.com",
      files: [
        { name: "Doc icons", type: "folder", items: 8, updatedDate: "Today" },
        { name: "Journey photos", type: "folder", items: 10, updatedDate: "Yesterday" },
        { name: "styles.css", type: "file", kind: "CSS", size: "30 KB", updatedDate: "Today", iconClass: "file-css", preview: ":root {\n  --text-primary: #1d1d1f;\n  --background: #ffffff;\n}" },
        { name: "script.js", type: "file", kind: "JavaScript", size: "13.7 KB", updatedDate: "Today", iconClass: "file-js", preview: "(function() {\n  'use strict';\n  // Navigation physics, macOS Dock magnification...\n})();" },
        { name: "package.json", type: "file", kind: "JSON", size: "0.2 KB", updatedDate: "Today", iconClass: "file-json", preview: "{\n  \"name\": \"portfolio-website\",\n  \"scripts\": { \"dev\": \"npx serve\" }\n}" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "Today", iconClass: "file-chrome", isWebLink: true, link: "https://imsudheep.github.io", preview: "<!DOCTYPE html>\n<html>\n  <head><title>Sudheep Here</title></head>\n  <body>\n    <!-- Portfolio content -->\n  </body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "18 KB", updatedDate: "Today", iconClass: "file-text", preview: "# Personal Portfolio\n\nA pixel-perfect, premium personal portfolio website showcasing projects, skills, and life milestones.\n\n## Overview\nThis portfolio is designed as an interactive macOS-inspired experience, featuring a fully functional Finder replica for project browsing and a macOS Dock for skills display. Every detail is crafted to feel like using a real Mac.\n\n## Tech Stack\n- HTML5 (Semantic markup)\n- CSS3 (Custom properties, animations, responsive design)\n- JavaScript (Vanilla, no frameworks)\n- Scroll-based animations\n- Elza Font Family\n\n## Features\n- macOS Finder replica with full file browsing\n- macOS Dock with magnification physics\n- Interactive hero section with mouse-follow animation\n- Horizontal timeline with parallax scrolling\n- Responsive design (mobile to desktop)\n- iOS Files-style mobile adaptation\n- Smooth chapter-based navigation\n- Custom scrollbar styling\n\n## Architecture\nSingle-page application (SPA) architecture. All content is loaded from a single HTML file with CSS and JS enhancements. The Finder app is built entirely with vanilla JavaScript using a virtual data structure for file navigation.\n\n## Challenges Solved\n- Implemented a fully functional file browser from scratch\n- Built realistic macOS Dock physics with spring animations\n- Created responsive design that works across all devices\n- Optimized animations for 60fps performance\n\n## Future Roadmap\n- Add dark mode support\n- Implement project filtering in Finder\n- Add more interactive macOS elements\n- Performance optimizations\n\n## Status: Complete\nLive and actively maintained." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "Today", children: [
          { name: "hero-section.png", type: "file", kind: "PNG Image", size: "1.5 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/ben.png" },
          { name: "projects-finder.png", type: "file", kind: "PNG Image", size: "1.3 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/ben.png" },
          { name: "skills-dock.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/ben.png" },
          { name: "mobile-view.png", type: "file", kind: "PNG Image", size: "0.9 MB", updatedDate: "Today", iconClass: "file-img", isImage: true, imageSrc: "public/media/ben.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "Today", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/portfolio", preview: "Portfolio GitHub Repository\n\nDouble-click to open in browser." }
      ]
    },
    habit: {
      name: "Habit Tracker",
      type: "Web App",
      category: "web",
      tag: "tag-inprogress",
      dotColor: "var(--mac-blue)",
      updatedText: "Updated 4 days ago",
      updatedDate: "4 days ago",
      icon: "public/media/fitness.png",
      description: "A beautiful habit tracker with streak building, rich charts, and gamified reward systems.",
      techStack: ["React", "CSS Variables", "Chart.js", "LocalStorage"],
      status: "In Progress",
      statusColor: "var(--mac-blue)",
      link: "https://github.com",
      files: [
        { name: "src", type: "folder", items: 10, updatedDate: "4 days ago" },
        { name: "package.json", type: "file", kind: "JSON", size: "1.0 KB", updatedDate: "4 days ago", iconClass: "file-json", preview: "{\n  \"name\": \"habit-tracker\"\n}" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "4 days ago", iconClass: "file-chrome", isWebLink: true, link: "https://habit-tracker.app", preview: "<!DOCTYPE html>\n<html>\n<head><title>Habit Tracker</title></head>\n<body>\n  <div id=\"app\"></div>\n</body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "13 KB", updatedDate: "4 days ago", iconClass: "file-text", preview: "# Habit Tracker\n\nA beautiful habit tracker with streak building, rich charts, and gamified reward systems to keep you motivated every day.\n\n## Overview\nThis app transforms habit tracking from a chore into a rewarding experience. Build streaks, earn achievements, and watch your progress with beautiful visualizations.\n\n## Tech Stack\n- React 18\n- CSS Variables for theming\n- Chart.js for data visualization\n- LocalStorage for offline persistence\n\n## Features\n- Custom habit creation with flexible scheduling\n- Visual streak calendar with daily check-ins\n- Interactive charts showing progress over time\n- Gamified rewards system with achievements\n- Dark/light theme support\n- Weekly and monthly progress reports\n- Reminder notifications\n- Data export functionality\n\n## Architecture\nFully client-side React application using LocalStorage for persistence. No backend required, making it fast and privacy-focused. State management uses React Context.\n\n## Challenges Solved\n- Built a flexible habit scheduling system\n- Implemented streak calculation algorithm\n- Created responsive charts that work on mobile\n- Designed gamification that actually motivates\n\n## Future Roadmap\n- Cloud sync across devices\n- Social challenges with friends\n- API integrations with fitness apps\n- AI-powered habit suggestions\n\n## Status: In Progress\nCore features complete, cloud sync in development." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "4 days ago", children: [
          { name: "dashboard.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "4 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/fitness.png" },
          { name: "new-habit.png", type: "file", kind: "PNG Image", size: "0.9 MB", updatedDate: "4 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/fitness.png" },
          { name: "statistics.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "4 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/fitness.png" },
          { name: "achievements.png", type: "file", kind: "PNG Image", size: "0.8 MB", updatedDate: "4 days ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/fitness.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "4 days ago", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/habit-tracker", preview: "Habit Tracker GitHub Repository\n\nDouble-click to open in browser." }
      ]
    },
    skacas: {
      name: "SKACAS Redesign",
      type: "UI / UX",
      category: "uiux",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated 1 week ago",
      updatedDate: "1 week ago",
      icon: "public/media/business.png",
      description: "Redesigning the Sri Krishna Adithya College of Arts and Science website UI to be modern and user-friendly.",
      techStack: ["Figma", "UI Design", "Information Architecture"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://figma.com",
      files: [
        { name: "wireframes", type: "folder", items: 12, updatedDate: "1 week ago" },
        { name: "mockups", type: "folder", items: 8, updatedDate: "1 week ago" },
        { name: "presentation.pdf", type: "file", kind: "PDF Document", size: "14 MB", updatedDate: "1 week ago", iconClass: "file-pdf" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "1 week ago", iconClass: "file-chrome", isWebLink: true, link: "https://skacas-redesign.figma.com", preview: "<!DOCTYPE html>\n<html>\n<head><title>SKACAS Redesign</title></head>\n<body>\n  <p>SKACAS College Website Redesign - Figma Prototype</p>\n</body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "12 KB", updatedDate: "1 week ago", iconClass: "file-text", preview: "# SKACAS Redesign\n\nRedesigning the Sri Krishna Adithya College of Arts and Science website UI to be modern, accessible, and user-friendly.\n\n## Overview\nA complete UI/UX redesign project for SKACAS college website, focusing on improving navigation, visual appeal, and information architecture while maintaining institutional identity.\n\n## Tech Stack\n- Figma (Design & Prototyping)\n- UI Design Principles\n- Information Architecture\n- Accessibility Standards\n\n## Design System\n- Modern typography hierarchy\n- Accessible color palette (WCAG AA compliant)\n- Consistent component library\n- Responsive grid system\n- Micro-interactions and animations\n- Iconography system\n\n## Screens Designed\n- Homepage with hero and featured sections\n- About us with timeline\n- Academic programs catalog\n- Admissions portal\n- Student life gallery\n- Contact and location\n- Faculty directory\n- News and events\n\n## Challenges Solved\n- Simplified complex navigation into intuitive flows\n- Created a scalable design system\n- Ensured accessibility for diverse users\n- Balanced modern design with institutional branding\n\n## Future Roadmap\n- Interactive prototype with user testing\n- Design handoff documentation\n- Component development guidelines\n- Admin dashboard design\n\n## Status: Complete\nDesign system and all screens delivered." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "1 week ago", children: [
          { name: "homepage.png", type: "file", kind: "PNG Image", size: "1.4 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/business.png" },
          { name: "academics.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/business.png" },
          { name: "admissions.png", type: "file", kind: "PNG Image", size: "1.0 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/business.png" },
          { name: "student-life.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "1 week ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/business.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "1 week ago", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/skacas-redesign", preview: "SKACAS Redesign GitHub Repository\n\nDouble-click to open in browser." }
      ]
    },
    photo: {
      name: "Photo Studio",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated 2 weeks ago",
      updatedDate: "2 weeks ago",
      icon: "public/media/travel.png",
      description: "A portfolio platform for photographers to showcase, organize, and license their works.",
      techStack: ["Next.js", "Tailwind CSS", "Sanity CMS", "Cloudinary"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://github.com",
      files: [
        { name: "components", type: "folder", items: 14, updatedDate: "2 weeks ago" },
        { name: "pages", type: "folder", items: 6, updatedDate: "2 weeks ago" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "2 weeks ago", iconClass: "file-chrome", isWebLink: true, link: "https://photo-studio.app", preview: "<!DOCTYPE html>\n<html>\n<head><title>Photo Studio</title></head>\n<body>\n  <div id=\"app\"></div>\n</body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "11 KB", updatedDate: "2 weeks ago", iconClass: "file-text", preview: "# Photo Studio\n\nA portfolio platform for photographers to showcase, organize, and license their work professionally.\n\n## Overview\nPhoto Studio provides photographers with a beautiful, customizable portfolio website with integrated licensing, client galleries, and print store functionality.\n\n## Tech Stack\n- Next.js (React Framework)\n- Tailwind CSS (Styling)\n- Sanity CMS (Content Management)\n- Cloudinary (Image Optimization & CDN)\n- Stripe (Payment Processing)\n\n## Features\n- Customizable portfolio templates\n- High-resolution image galleries with lightbox\n- Client proofing galleries with password protection\n- Integrated print store with fulfillment\n- Image licensing and watermarking\n- SEO optimization for photographers\n- Blog with markdown support\n- Contact form with file upload\n\n## Architecture\nNext.js for server-side rendering and optimal SEO. Sanity CMS as headless backend for easy content management. Images are served through Cloudinary for automatic optimization and CDN delivery.\n\n## Challenges Solved\n- Implemented responsive image grids that work at any scale\n- Built client proofing system with feedback collection\n- Integrated Stripe for seamless print purchases\n- Optimized image loading with lazy loading and blur placeholders\n\n## Future Roadmap\n- AI-powered image organization and tagging\n- Social media integration for auto-posting\n- Mobile app companion\n- Client invoice and contract management\n\n## Status: Complete\nDeployed and used by professional photographers." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "2 weeks ago", children: [
          { name: "portfolio-view.png", type: "file", kind: "PNG Image", size: "1.3 MB", updatedDate: "2 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/travel.png" },
          { name: "gallery-view.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "2 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/travel.png" },
          { name: "client-proofing.png", type: "file", kind: "PNG Image", size: "1.0 MB", updatedDate: "2 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/travel.png" },
          { name: "print-store.png", type: "file", kind: "PNG Image", size: "0.9 MB", updatedDate: "2 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/travel.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "2 weeks ago", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/photo-studio", preview: "Photo Studio GitHub Repository\n\nDouble-click to open in browser." }
      ]
    },
    learning: {
      name: "Learning Hub",
      type: "Web App",
      category: "web",
      tag: "tag-complete",
      dotColor: "var(--mac-green)",
      updatedText: "Updated 3 weeks ago",
      updatedDate: "3 weeks ago",
      icon: "public/media/student.png",
      description: "An online platform where students can collaborate, share lecture notes, and study together.",
      techStack: ["React", "GraphQL", "Express", "MongoDB"],
      status: "Complete",
      statusColor: "var(--mac-green)",
      link: "https://github.com",
      files: [
        { name: "server", type: "folder", items: 20, updatedDate: "3 weeks ago" },
        { name: "client", type: "folder", items: 30, updatedDate: "3 weeks ago" },
        { name: "index.html", type: "file", kind: "HTML Document", size: "2 KB", updatedDate: "3 weeks ago", iconClass: "file-chrome", isWebLink: true, link: "https://learning-hub.app", preview: "<!DOCTYPE html>\n<html>\n<head><title>Learning Hub</title></head>\n<body>\n  <div id=\"root\"></div>\n</body>\n</html>" },
        { name: "README.md (about the project)", type: "file", kind: "Text Document", size: "13 KB", updatedDate: "3 weeks ago", iconClass: "file-text", preview: "# Learning Hub\n\nAn online platform where students can collaborate, share lecture notes, and study together in virtual study rooms.\n\n## Overview\nLearning Hub transforms solo studying into a collaborative experience. Students can create study groups, share resources, host virtual study sessions, and track their academic progress together.\n\n## Tech Stack\n- React 18 (Frontend)\n- GraphQL (API Layer)\n- Express.js (Server)\n- MongoDB (Database)\n- Socket.io (Real-time features)\n- Redis (Caching)\n\n## Features\n- Virtual study rooms with real-time collaboration\n- Shared notes and resource library\n- Interactive whiteboard for group study\n- Pomodoro timer with group synchronization\n- Progress tracking and study analytics\n- Discussion forums for each subject\n- File sharing with preview support\n- Calendar integration for study schedules\n\n## Architecture\nMicroservices architecture with GraphQL as the API gateway. The frontend communicates with backend services through a unified GraphQL endpoint. Real-time features use WebSocket connections through Socket.io.\n\n## Challenges Solved\n- Built real-time collaboration features with low latency\n- Designed scalable GraphQL schema for complex data relationships\n- Implemented efficient file storage and preview generation\n- Created engaging gamification system for study motivation\n\n## Future Roadmap\n- AI study assistant and quiz generator\n- Integration with university LMS systems\n- Mobile app for on-the-go studying\n- Peer tutoring marketplace\n\n## Status: Complete\nDeployed and used by students across multiple universities." },
        { name: "UI Screens", type: "folder", items: 4, updatedDate: "3 weeks ago", children: [
          { name: "dashboard.png", type: "file", kind: "PNG Image", size: "1.2 MB", updatedDate: "3 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/student.png" },
          { name: "study-room.png", type: "file", kind: "PNG Image", size: "1.0 MB", updatedDate: "3 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/student.png" },
          { name: "notes-view.png", type: "file", kind: "PNG Image", size: "1.1 MB", updatedDate: "3 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/student.png" },
          { name: "analytics.png", type: "file", kind: "PNG Image", size: "0.9 MB", updatedDate: "3 weeks ago", iconClass: "file-img", isImage: true, imageSrc: "public/media/student.png" }
        ] },
        { name: "GitHub", type: "file", kind: "Internet Shortcut", size: "1 KB", updatedDate: "3 weeks ago", iconClass: "file-github", isGitLink: true, link: "https://github.com/imsudheep/learning-hub", preview: "Learning Hub GitHub Repository\n\nDouble-click to open in browser." }
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
    const backId = `folderBack_${rand}`;
    const frontId = `folderFront_${rand}`;
    const highlightId = `folderHighlight_${rand}`;
    const shadowId = `folderShadow_${rand}`;
    
    return `<svg viewBox="0 0 48 38" class="folder-icon folder-blue-icon" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="${backId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#00a2f3" />
          <stop offset="100%" stop-color="#055fa3" />
        </linearGradient>
        <linearGradient id="${frontId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#55c2ff" />
          <stop offset="100%" stop-color="#0c7ed2" />
        </linearGradient>
        <linearGradient id="${highlightId}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#bfeaff" stop-opacity="0.8"/>
          <stop offset="100%" stop-color="#55c2ff" stop-opacity="0.2"/>
        </linearGradient>
        <filter id="${shadowId}" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#001830" flood-opacity="0.3"/>
        </filter>
      </defs>
      <!-- Back flap with tab -->
      <path d="M 3 8 
               C 3 6, 4.5 4.5, 6.5 4.5 
               L 17 4.5 
               C 19.5 4.5, 21.5 6, 23 8 
               L 24.5 10 
               L 42 10 
               C 44 10, 45 11.5, 45 13.5 
               L 45 32 
               C 45 34, 44 35, 42 35 
               L 6 35 
               C 4 35, 3 34, 3 32 
               Z" fill="url(#${backId})"/>
      <!-- Inside content (a subtle white/light paper sheet peaking out slightly) -->
      <path d="M 10 9 
               L 38 9 
               C 39.5 9, 40 9.5, 40 11 
               L 40 18 
               L 8 18 
               L 8 11 
               C 8 9.5, 8.5 9, 10 9 
               Z" fill="#ffffff" opacity="0.75" />
      <!-- Front flap -->
      <path d="M 3 13 
               C 3 11, 4.5 10.5, 6.5 10.5 
               L 41.5 10.5 
               C 43.5 10.5, 45 11, 45 13 
               L 45 32 
               C 45 34, 43.5 35, 41.5 35 
               L 6.5 35 
               C 4.5 35, 3 34, 3 32 
               Z" fill="url(#${frontId})" filter="url(#${shadowId})"/>
      <!-- Top lip highlight on front flap -->
      <path d="M 3.2 13.5 
               C 3.2 11.5, 4.7 11, 6.5 11 
               L 41.5 11 
               C 43.3 11, 44.8 11.5, 44.8 13.5 
               L 44.8 15 
               L 3.2 15 
               Z" fill="url(#${highlightId})"/>
      <!-- Embedded App Icon (iOS style / custom front placement) -->
      ${appIconUrl ? `
      <g transform="translate(18, 17)">
        <rect x="0" y="0" width="12" height="12" rx="2.5" fill="#ffffff" filter="url(#${shadowId})"/>
        <image href="${appIconUrl}" x="0.8" y="0.8" width="10.4" height="10.4" clip-path="url(#appIconClip_${rand})"/>
        <clipPath id="appIconClip_${rand}">
          <rect x="0.8" y="0.8" width="10.4" height="10.4" rx="1.8"/>
        </clipPath>
      </g>
      ` : ''}
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

    // Mobile-specific Root Home Screen: Render Browse locations list
    const mainExplorer = document.getElementById('finderMainContent');
    let browseMenu = mainExplorer.querySelector('.ios-browse-menu');
    
    if (isMobile && currentLocation === "root") {
      filesGrid.style.display = "none";
      filesListContainer.style.display = "none";
      
      if (!browseMenu) {
        browseMenu = document.createElement('div');
        browseMenu.className = "ios-browse-menu";
        mainExplorer.appendChild(browseMenu);
      }
      browseMenu.style.display = "flex";
      
      browseMenu.innerHTML = `
        <div class="ios-browse-section">
          <div class="ios-browse-section-header">Locations</div>
          <div class="ios-browse-list">
            <div class="ios-browse-item" data-loc="location-all">
              <div class="ios-browse-item-left">
                <span class="ios-browse-icon iphone">📱</span>
                <span class="ios-browse-label">On My iPhone</span>
              </div>
              <span class="ios-browse-chevron">›</span>
            </div>
            <div class="ios-browse-item" data-loc="location-web">
              <div class="ios-browse-item-left">
                <span class="ios-browse-icon web">💻</span>
                <span class="ios-browse-label">Web Apps</span>
              </div>
              <span class="ios-browse-chevron">›</span>
            </div>
            <div class="ios-browse-item" data-loc="location-mobile">
              <div class="ios-browse-item-left">
                <span class="ios-browse-icon mobile">📱</span>
                <span class="ios-browse-label">Mobile Apps</span>
              </div>
              <span class="ios-browse-chevron">›</span>
            </div>
            <div class="ios-browse-item" data-loc="location-uiux">
              <div class="ios-browse-item-left">
                <span class="ios-browse-icon uiux">🎨</span>
                <span class="ios-browse-label">UI / UX Design</span>
              </div>
              <span class="ios-browse-chevron">›</span>
            </div>
          </div>
        </div>
        
        <div class="ios-browse-section">
          <div class="ios-browse-section-header">Tags</div>
          <div class="ios-browse-list">
            <div class="ios-browse-item" data-loc="tag-featured">
              <div class="ios-browse-item-left">
                <span class="ios-tag-dot yellow"></span>
                <span class="ios-browse-label">Featured</span>
              </div>
              <span class="ios-browse-chevron">›</span>
            </div>
            <div class="ios-browse-item" data-loc="tag-inprogress">
              <div class="ios-browse-item-left">
                <span class="ios-tag-dot blue"></span>
                <span class="ios-browse-label">In Progress</span>
              </div>
              <span class="ios-browse-chevron">›</span>
            </div>
            <div class="ios-browse-item" data-loc="tag-complete">
              <div class="ios-browse-item-left">
                <span class="ios-tag-dot green"></span>
                <span class="ios-browse-label">Complete</span>
              </div>
              <span class="ios-browse-chevron">›</span>
            </div>
          </div>
        </div>
      `;
      
      browseMenu.querySelectorAll('.ios-browse-item').forEach(el => {
        el.addEventListener('click', function() {
          const targetLoc = this.getAttribute('data-loc');
          navigateTo(targetLoc);
        });
      });

      // Update mobile title and back button visibility
      const mobileTitle = document.getElementById('mobileTitle');
      const mobileBackBtn = document.getElementById('mobileBackBtn');
      if (mobileTitle) {
        mobileTitle.textContent = "Browse";
        if (mobileBackBtn) mobileBackBtn.style.display = "none";
      }

      statusItemCount.innerText = `4 Locations, 3 Tags`;
      return;
    } else {
      if (browseMenu) {
        browseMenu.style.display = "none";
      }
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
      } else if (currentLocation === "recents") {
        mobileTitle.textContent = "Recents";
        if (mobileBackBtn) mobileBackBtn.style.display = "none";
      } else if (currentLocation === "shared") {
        mobileTitle.textContent = "Shared";
        if (mobileBackBtn) mobileBackBtn.style.display = "none";
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
              ${hasTagDot ? `<span class="grid-item-tag" style="background-color: ${tagColor}"></span>` : ''}
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

    // Bottom bar tab clicks (iOS Files app style)
    const bottomBarItems = finderWindow.querySelectorAll('.bottom-bar-item');
    bottomBarItems.forEach(item => {
      item.addEventListener('click', function() {
        bottomBarItems.forEach(el => el.classList.remove('active'));
        this.classList.add('active');
        
        const tab = this.getAttribute('data-tab');
        selectedItem = null;
        cleanupColumnsPane();
        
        if (tab === "browse") {
          currentLocation = "root";
          renderFinder();
        } else if (tab === "recents") {
          currentLocation = "recents";
          renderFinder();
        } else if (tab === "shared") {
          currentLocation = "shared";
          renderFinder();
        }
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
    const track = document.querySelector('.mobile-dock-track');
    const dots = document.querySelectorAll('.pagination-dot');
    const hint = document.querySelector('.mobile-dock-hint');

    if (track && dots.length > 0) {
      // Sync swipe scroll with pagination dots and hint opacity
      track.addEventListener('scroll', function () {
        const width = track.clientWidth;
        if (width === 0) return;
        
        const pageIndex = Math.round(track.scrollLeft / width);
        dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === pageIndex);
        });

        // Calculate scroll progress for hint fade-out
        const maxScroll = track.scrollWidth - width;
        if (maxScroll > 0) {
          const progress = track.scrollLeft / maxScroll;
          if (hint) {
            hint.style.opacity = Math.max(0, 0.55 * (1 - progress));
            hint.style.pointerEvents = progress >= 0.9 ? 'none' : 'auto';
          }
        }
      }, { passive: true });

      // Handle clicking pagination dots
      dots.forEach((dot, index) => {
        dot.addEventListener('click', function () {
          const width = track.clientWidth;
          track.scrollTo({
            left: index * width,
            behavior: 'smooth'
          });
        });
      });
    }

    // Viewport entry animations (Framer Motion replica)
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
