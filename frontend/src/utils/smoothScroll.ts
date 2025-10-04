import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

/**
 * Smooth scroll to a specific element or position
 * @param target - CSS selector, element, or position (number)
 * @param options - GSAP scrollTo options
 */
export const smoothScrollTo = (
  target: string | Element | number,
  options: {
    duration?: number;
    ease?: string;
    offsetY?: number;
  } = {}
) => {
  const { duration = 1.2, ease = "power2.inOut", offsetY = 0 } = options;

  gsap.to(window, {
    duration,
    scrollTo: {
      y: target,
      offsetY,
    },
    ease,
  });
};

/**
 * Smooth scroll to top of the page
 */
export const scrollToTop = (duration: number = 1.2) => {
  smoothScrollTo(0, { duration });
};

/**
 * Smooth scroll to a specific section by ID
 */
export const scrollToSection = (sectionId: string, offsetY: number = 0) => {
  smoothScrollTo(`#${sectionId}`, { offsetY });
};

/**
 * Initialize smooth scrolling for anchor links
 */
export const initSmoothScroll = () => {
  // Handle all anchor links with smooth scroll
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest('a[href^="#"]') as HTMLAnchorElement;
    
    if (link) {
      e.preventDefault();
      const href = link.getAttribute('href');
      if (href && href !== '#') {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          smoothScrollTo(targetElement, {
            duration: 1.2,
            ease: "power2.inOut",
            offsetY: -80, // Account for fixed header
          });
        }
      }
    }
  });
};

/**
 * Smooth scroll with custom easing for hero sections
 */
export const smoothScrollToHero = (target: string | Element) => {
  gsap.to(window, {
    duration: 1.5,
    scrollTo: {
      y: target,
      offsetY: 0,
    },
    ease: "power3.out",
  });
};

/**
 * Smooth scroll for navigation menu items
 */
export const smoothScrollToNav = (target: string | Element) => {
  gsap.to(window, {
    duration: 1,
    scrollTo: {
      y: target,
      offsetY: -100, // Account for navigation height
    },
    ease: "power2.inOut",
  });
};

