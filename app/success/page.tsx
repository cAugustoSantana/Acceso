'use client';

import { useMemo, Suspense, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "../components/ui/button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const ticketRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

  const phone = searchParams.get('phone') || '';
  const email = searchParams.get('email') || '';
  const name = searchParams.get('name') || '';
  const timestamp = searchParams.get('timestamp') || '';
  
  // Generate unique QR code data from form submission
  const qrData = useMemo(() => {
    return `${phone}-${email}-${name}-${timestamp}`;
  }, [phone, email, name, timestamp]);

  const downloadTicket = async () => {
    if (!qrCodeRef.current) return;

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const margin = 20;

      // Add title
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Acceso Confirmado!', pageWidth / 2, margin, { align: 'center' });

      let yPos = margin + 15;

      // Add registration details
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Registration Details', margin, yPos);
      yPos += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Name: ${name}`, margin, yPos);
      yPos += 6;
      pdf.text(`Email: ${email}`, margin, yPos);
      yPos += 6;
      pdf.text(`Phone: ${phone}`, margin, yPos);
      yPos += 10;

      // Add event details
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Event Details', margin, yPos);
      yPos += 8;

      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Location: Floor Two Studios', margin, yPos);
      yPos += 6;
      pdf.text('Date: 19 DEC 8:00 PM', margin, yPos);
      yPos += 15;

      // Create a temporary container for QR code with simple inline styles (no Tailwind classes)
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.left = '-9999px';
      tempContainer.style.top = '0';
      tempContainer.style.width = '250px';
      tempContainer.style.height = '250px';
      tempContainer.style.backgroundColor = '#ffffff';
      tempContainer.style.padding = '16px';
      tempContainer.style.border = '2px solid #e5e7eb';
      tempContainer.style.borderRadius = '8px';
      tempContainer.style.display = 'flex';
      tempContainer.style.alignItems = 'center';
      tempContainer.style.justifyContent = 'center';
      
      // Clone the QR code SVG element
      const qrSvg = qrCodeRef.current.querySelector('svg');
      if (qrSvg) {
        const qrClone = qrSvg.cloneNode(true) as SVGElement;
        tempContainer.appendChild(qrClone);
        document.body.appendChild(tempContainer);

        try {
          // Capture QR code as image
          const qrCanvas = await html2canvas(tempContainer, {
            backgroundColor: '#ffffff',
            scale: 2,
            useCORS: true,
            logging: false,
            width: 250,
            height: 250
          });
          const qrImgData = qrCanvas.toDataURL('image/png');
          
          // Calculate QR code size (max 60mm width)
          const qrWidth = 60;
          const qrHeight = (qrCanvas.height / qrCanvas.width) * qrWidth;
          const qrX = (pageWidth - qrWidth) / 2;
          
          pdf.addImage(qrImgData, 'PNG', qrX, yPos, qrWidth, qrHeight);
          yPos += qrHeight + 10;
        } finally {
          // Clean up temporary container
          document.body.removeChild(tempContainer);
        }
      }

      // Add QR code instruction
      pdf.setFontSize(9);
      pdf.setFont('helvetica', 'italic');
      pdf.text('Present this QR code at the event for entry', pageWidth / 2, yPos, { align: 'center' });

      // Save PDF
      pdf.save(`ticket-${name}-${timestamp}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    }
  };

  return (
    <div className="relative min-h-screen md:h-full w-full bg-white md:overflow-hidden">
      <Header />
      <p className="text-black text-center text-4xl font-bold pt-5 pb-5 md:pt-5 md:pb-5">ANTI</p>
      <div className="flex items-center justify-center min-h-screen md:h-screen px-4 -mt-[0.40rem] md:mt-0 md:overflow-hidden md:py-4">
        <div className="w-full max-w-md">
          <div ref={ticketRef} className="flex flex-col items-center gap-0 md:gap-2">
            {/* Success Icon */}
            <div className="w-8 h-8 md:w-10 md:h-10 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            {/* Confirmation Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center">
              Acceso Confirmado!
            </h1>

            {/* QR Code Section */}
            <div className="w-full bg-gray-50 rounded-lg p-4 md:p-6">
              <h3 className="text-md font-semibold text-gray-800 mb-2 md:mb-3 text-center">
                Your Entry QR Code
              </h3>
              <div className="flex justify-center">
                {qrData && (
                  <div ref={qrCodeRef} className="bg-white p-3 md:p-4 rounded-lg border-2 border-gray-200" style={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb' }}>
                    <QRCodeSVG
                      value={qrData}
                      size={180}
                      level="H"
                      includeMargin={true}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2 md:mt-3">
                Present this QR code at the event for entry
              </p>
            </div>

            {/* Event Details */}
            <div className="w-full bg-gray-50 rounded-lg p-4 md:p-6 space-y-3 md:space-y-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 md:mb-4 text-center">Event Details</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="text-gray-800 font-medium">Floor Two Studios</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="text-gray-800 font-medium">19 DEC 8:00 PM</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="w-full space-y-3">
              <Button
                onClick={downloadTicket}
                variant="form"
                className="w-full"
              >
                Download Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={
      <div className="relative min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

