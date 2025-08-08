import React from 'react';

export default function CTASection() {
  const steps = [
    {
      number: "01",
      title: "INITIAL CONSULTATION",
      description: "We listen to your goals and assess your need with clarity. This step ensures we fully understand your situation before recommending any solution.",
    },
    {
      number: "02",
      title: "PROPOSAL CONFIRMATION",
      description: "Transparent, tailored solutions no hidden surprises. You'll receive a clear proposal that matches your exact requirements and budget.",
    },
    {
      number: "03",
      title: "DOCUMENT PREPARATION",
      description: "We guide you every step to avoid errors and delays. Our expert support ensures your paperwork is complete, accurate, and stress-free.",
    },
    {
      number: "04",
      title: "IMPLEMENTATION",
      description: "We do the heavy lifting so you don't have to. Whether it's processing submission, or coordination, we execute with precision.",
    },
    {
      number: "05",
      title: "COMPLETION",
      description: "Your goal is achieved efficiently and successfully. We deliver results, not just promises. Sit back and enjoy the outcome.",
    },
  ];

  return (
    <section className="py-16 bg-light-green">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          5 STEPS TO START YOUR BUSINESS
        </h2>
        <div className="flex flex-col items-center md:flex-row md:justify-center md:space-x-8">
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div className="flex flex-col items-center text-center max-w-[200px] mb-8 md:mb-0">
                <p className="text-sm font-semibold text-gray-700 mb-2">STEP</p>
                <div className="w-24 h-24 md:w-28 md:h-28 bg-[#E0FFE0] rounded-full flex items-center justify-center mb-6"> {/* Changed bg-[#2563EB] to bg-[#E0FFE0] */}
                  <span className="text-gray-900 text-4xl md:text-5xl font-bold">{step.number}</span> {/* Changed text-white to text-gray-900 for contrast */}
                </div>
                <h3 className="text-base md:text-lg font-bold text-gray-900 uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="flex items-center justify-center md:block md:w-16 lg:w-24">
                  <div className="w-0.5 h-12 bg-gray-300 md:w-full md:h-0.5 md:my-0 my-8"></div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
