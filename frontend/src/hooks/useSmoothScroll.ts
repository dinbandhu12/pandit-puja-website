import { useEffect } from 'react';
import { smoothScrollTo, scrollToTop, scrollToSection, initSmoothScroll } from '@/utils/smoothScroll';

/**
 * Custom hook for smooth scrolling functionality
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Initialize smooth scroll for anchor links
    initSmoothScroll();
  }, []);

  return {
    smoothScrollTo,
    scrollToTop,
    scrollToSection,
  };
};

/**
 * Hook for smooth scroll to top functionality
 */
export const useScrollToTop = () => {
  const handleScrollToTop = () => {
    scrollToTop();
  };

  return handleScrollToTop;
};

/**
 * Hook for smooth scroll to specific sections
 */
export const useScrollToSection = () => {
  const handleScrollToSection = (sectionId: string, offsetY: number = 0) => {
    scrollToSection(sectionId, offsetY);
  };

  return handleScrollToSection;
};

