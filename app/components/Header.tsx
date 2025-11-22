'use client';

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { 
  animateButtonHover,
  animateButtonHoverOut,
  animateButtonClick
} from "../utils/animations";
import { Button } from "./ui/button";

interface HeaderProps {
  buttonText?: string;
  onButtonClick?: () => void;
  animate?: boolean;
}

export default function Header({ 
  buttonText = "Coming Soon", 
  onButtonClick,
  animate = false 
}: HeaderProps) {
  const headerRef = useRef<HTMLElement>(null);
  const headerTitleRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize animations on mount if animate is true
  useEffect(() => {
    if (animate) {
      const tl = gsap.timeline();
      
      // Animate header title and button on mobile
      if (headerTitleRef.current) {
        gsap.set(headerTitleRef.current, { opacity: 0, x: -20 });
        tl.fromTo(headerTitleRef.current, {
          opacity: 0,
          x: -20,
        }, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0);
      }
      if (buttonRef.current) {
        gsap.set(buttonRef.current, { opacity: 0, x: 20 });
        tl.fromTo(buttonRef.current, {
          opacity: 0,
          x: 20,
        }, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
        }, 0);
      }
    }
  }, [animate]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (buttonRef.current) {
      animateButtonClick(buttonRef.current);
    }
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <header ref={headerRef} className="sticky top-0 left-0 right-0 z-50 bg-white shadow-lg">
      <div className="flex items-center justify-between py-[0.40rem] px-4">
        <div className="flex flex-row items-center gap-2">
          <h1 
            ref={headerTitleRef}
            className="text-1xl font-bold text-black drop-shadow-2xl"
          >
            ACCESO       
          </h1>
          <p className="text-xs text-black/90">hecho facil</p>
        </div>
        <Button
          ref={buttonRef}
          variant="header"
          className="text-sm"
          onMouseEnter={(e) => animateButtonHover(e.currentTarget)}
          onMouseLeave={(e) => animateButtonHoverOut(e.currentTarget)}
          onClick={handleButtonClick}
        >
          {buttonText}
        </Button>
      </div>
    </header>
  );
}

