import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Check for reduced motion preference
const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Hero section animations
export const animateHero = (titleRef: HTMLElement | null, cardRef: HTMLElement | null, imageRef: HTMLElement | null) => {
  if (prefersReducedMotion()) return;

  const tl = gsap.timeline();

  // Title animation
  if (titleRef) {
    tl.from(titleRef, {
      opacity: 0,
      scale: 0.8,
      duration: 0.8,
      ease: 'power2.out',
    });
  }

  // Card and image stagger animation
  if (cardRef && imageRef) {
    tl.from(cardRef, {
      x: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.4')
    .from(imageRef, {
      x: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, '-=0.6');
  }

  return tl;
};

// Form animations
export const animateForm = (formRef: HTMLElement | null, inputs: (HTMLElement | null)[]) => {
  if (prefersReducedMotion()) return;

  const tl = gsap.timeline({ delay: 0.3 });

  // Form container
  if (formRef) {
    tl.from(formRef, {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    });
  }

  // Input fields stagger
  inputs.forEach((input, index) => {
    if (input) {
      tl.from(input, {
        x: -30,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.out',
      }, index * 0.1);
    }
  });

  return tl;
};

// Input focus animation
export const animateInputFocus = (input: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.to(input, {
    scale: 1.02,
    duration: 0.2,
    ease: 'power2.out',
  });
};

export const animateInputBlur = (input: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.to(input, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out',
  });
};

// Button animations
export const animateButtonHover = (button: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.to(button, {
    scale: 1.05,
    duration: 0.2,
    ease: 'power2.out',
  });
};

export const animateButtonHoverOut = (button: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.to(button, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out',
  });
};

export const animateButtonClick = (button: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.to(button, {
    scale: 0.95,
    duration: 0.1,
    ease: 'power2.out',
    yoyo: true,
    repeat: 1,
  });
};

// Link hover animation
export const animateLinkHover = (link: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.to(link, {
    scale: 1.05,
    duration: 0.2,
    ease: 'power2.out',
  });
};

export const animateLinkHoverOut = (link: HTMLElement) => {
  if (prefersReducedMotion()) return;

  gsap.to(link, {
    scale: 1,
    duration: 0.2,
    ease: 'power2.out',
  });
};

// Form submission animations
export const animateFormSuccess = (formRef: HTMLElement | null, successRef: HTMLElement | null) => {
  if (prefersReducedMotion()) return;

  const tl = gsap.timeline();

  if (formRef) {
    tl.to(formRef, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      ease: 'power2.in',
    });
  }

  if (successRef) {
    tl.from(successRef, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.2');
  }

  return tl;
};

export const animateFormError = (formRef: HTMLElement | null) => {
  if (prefersReducedMotion()) return;

  if (formRef) {
    gsap.to(formRef, {
      x: -10,
      duration: 0.1,
      ease: 'power2.out',
      yoyo: true,
      repeat: 5,
    });
  }
};

// Footer animation
export const animateFooter = (footerRef: HTMLElement | null) => {
  if (prefersReducedMotion()) return;

  if (footerRef) {
    gsap.from(footerRef, {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: footerRef,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }
};

