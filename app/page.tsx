'use client';

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { 
  animateButtonHover,
  animateButtonHoverOut,
  animateButtonClick,
  animateInputFocus,
  animateInputBlur
} from "./utils/animations";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";

type FormData = {
  phone: string;
  email: string;
  name: string;
  instagram: string;
};

export default function Home() {
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    phone: '',
    email: '',
    name: '',
    instagram: ''
  });

  const partyNameRef = useRef<HTMLHeadingElement>(null);
  const registrateButtonRef = useRef<HTMLButtonElement>(null);
  const stepRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const steps = [
    { id: 1, label: 'Phone Number', field: 'phone', type: 'tel', placeholder: 'Enter your phone number' },
    { id: 2, label: 'Email', field: 'email', type: 'email', placeholder: 'Enter your email' },
    { id: 3, label: 'Name', field: 'name', type: 'text', placeholder: 'Enter your name' },
    { id: 4, label: 'Instagram Handle (optional)', field: 'instagram', type: 'text', placeholder: 'Enter your Instagram handle (optional)' }
  ];

  const currentStepData = steps[currentStep - 1];
  const isLastStep = currentStep === steps.length;

  // Cleanup ScrollTrigger on unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Animate step transitions
  useEffect(() => {
    if (showForm && stepRef.current) {
      gsap.set(stepRef.current, { opacity: 0, y: 50 });
      gsap.fromTo(stepRef.current, {
        opacity: 0,
        y: 50,
      }, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
    // Auto-focus input on step change
    if (inputRef.current && showForm) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [currentStep, showForm]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [currentStepData.field]: e.target.value
    }));
  };

  const handleNext = () => {
    const fieldValue = formData[currentStepData.field as keyof FormData].trim();
    // Instagram handle is optional, all other fields are required
    const isValid = currentStepData.field === 'instagram' ? true : fieldValue.length > 0;
    
    if (isValid) {
      if (isLastStep) {
        // Submit form
        if (buttonRef.current) {
          animateButtonClick(buttonRef.current);
        }
        console.log('Form submitted:', formData);
        
        // Navigate to success page with form data as query parameters
        const timestamp = Date.now().toString();
        const params = new URLSearchParams({
          phone: formData.phone,
          email: formData.email,
          name: formData.name,
          instagram: formData.instagram || '',
          timestamp: timestamp
        });
        router.push(`/success?${params.toString()}`);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAccesoClick = () => {
    setShowForm(true);
    setCurrentStep(1);
    setFormData({
      phone: '',
      email: '',
      name: '',
      instagram: ''
    });
    
    // Slight scroll on desktop when form appears (not on mobile)
    if (window.innerWidth >= 768) {
      setTimeout(() => {
        window.scrollBy({
          top: 100,
          behavior: 'smooth'
        });
      }, 100);
    }
    // On mobile, prevent any scrolling and maintain viewport position
    else {
      // Prevent default scroll behavior
      window.scrollTo(0, window.scrollY);
    }
  };

  return (
    <div className="relative h-screen w-full bg-white overflow-hidden md:overflow-hidden">
      <Header animate={true} />
      <p className="text-black text-center text-4xl font-bold pt-1 pb-5 md:pt-10 md:pb-10" ref={partyNameRef}>
        ANTI
      </p>        
      <br>
      </br>
      <div className={`flex flex-col items-center gap-0 '}`}>
        <div className={`flex flex-col items-center gap-2 -mt-16  ${showForm ? 'md:gap-1' : ''}`}>
          <Image
            src="/image.png"
            alt="Party Time"
            width={250}
            height={250}
            className="rounded-2xl shadow-2xl border-4 border-white md:my-0" />
          <div className={`flex flex-col items-center gap-1 ${showForm ? 'md:hidden' : ''}`}>
            <p className="text-black">Location: Floor Two Studios  </p>
            <p className="text-black">DATE: 19 DEC 8:00 PM</p>
          </div>

          {/* ACCESO Button - Mobile - Hidden when form is shown */}
          {!showForm && (
            <Button
              ref={registrateButtonRef}
              variant="acceso"
              size="acceso"
              className="md:hidden mt-0"
              onMouseEnter={(e) => animateButtonHover(e.currentTarget)}
              onMouseLeave={(e) => animateButtonHoverOut(e.currentTarget)}
              onClick={() => {
                if (registrateButtonRef.current) {
                  animateButtonClick(registrateButtonRef.current);
                }
                handleAccesoClick();
              } }
            >
              ACCESO
            </Button>
          )}

          {/* ACCESO Button - Desktop - Hidden when form is shown */}
          {!showForm && (
            <Button
              variant="acceso"
              size="acceso"
              className="hidden md:block mt-0"
              onMouseEnter={(e) => animateButtonHover(e.currentTarget)}
              onMouseLeave={(e) => animateButtonHoverOut(e.currentTarget)}
              onClick={handleAccesoClick}
            >
              ACCESO
            </Button>
          )}

          {/* Form - Shown in place of button */}
          {showForm && (
            <div ref={stepRef} className="w-full max-w-md flex flex-col items-center gap-4 mt-0 md:gap-3">
              <div className="w-full">
                <label htmlFor={currentStepData.field} className="block text-sm font-medium text-gray-700 mb-1 md:mb-1.5">
                  {currentStepData.label}
                </label>
                <Input
                  ref={inputRef}
                  id={currentStepData.field}
                  type={currentStepData.type}
                  value={formData[currentStepData.field as keyof FormData]}
                  onChange={handleInputChange}
                  placeholder={currentStepData.placeholder}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-black text-lg text-black bg-white"
                  onFocus={(e) => animateInputFocus(e.target)}
                  onBlur={(e) => animateInputBlur(e.target)}
                  required={currentStepData.field !== 'instagram'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleNext();
                    }
                  } } />
              </div>

              <div className="flex gap-4 w-full">
                {currentStep > 1 && (
                  <Button
                    type="button"
                    variant="back"
                    onClick={handleBack}
                    className="flex-1"
                  >
                    Back
                  </Button>
                )}
                <Button
                  ref={buttonRef}
                  type="button"
                  variant="form"
                  size="form"
                  onClick={handleNext}
                  className={currentStep > 1 ? 'flex-1' : 'w-full'}
                  onMouseEnter={(e) => animateButtonHover(e.currentTarget)}
                  onMouseLeave={(e) => animateButtonHoverOut(e.currentTarget)}
                >
                  {isLastStep ? 'Submit' : 'Next'}
                </Button>
              </div>

              <Button
                type="button"
                variant="cancel"
                onClick={() => {
                  setShowForm(false);
                  setCurrentStep(1);
                } }
                className="text-sm"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
