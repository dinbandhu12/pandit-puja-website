import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { ArrowUp } from 'lucide-react';
import { useScrollToTop } from '@/hooks/useSmoothScroll';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-white transition-all duration-300 hover:scale-110"
      size="icon"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};

export default ScrollToTopButton;

