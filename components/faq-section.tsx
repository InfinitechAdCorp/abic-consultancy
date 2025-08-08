'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { motion, type Transition } from "framer-motion" // Import type Transition

export default function FaqSection() {
  const faqs = [
    {
      question: "Can a foreigner own a business in the Philippines?",
      answer: "Yes, but with restrictions depending on the business type and ownership percentage. 100% foreign ownership is allowed in certain industries."
    },
    {
      question: "What are the types of legal business entities in the Philippines?",
      answer: "Sole Proprietorship (only for Filipinos) Partnership (foreign ownership allowed with conditions) Domestic Corporation (most common for foreigners) One Person Corporation (OPC) – only for Filipino citizens Branch or Representative Office – for foreign parent companies"
    },
    {
      question: "What is the minimum capital requirement for a foreign-owned company?",
      answer: "US$200,000 (approx. ₱11 million) – for most businesses with more than 40% foreign ownership US$100,000 – if your company uses advanced technology or employs at least 50 direct Filipino workers ₱5 million – for retail businesses with 100% foreign ownership Lower capital possible for export-oriented or PEZA-registered companies"
    },
    {
      question: "What government agencies are involved in business registration?",
      answer: "SEC (Securities and Exchange Commission) – for corporations and partnerships DTI (Department of Trade and Industry) – for sole proprietorships (Filipino only) BIR (Bureau of Internal Revenue) – for tax registration SSS, PhilHealth, Pag-IBIG – for employee registration LGU (City Hall) – for business permits"
    },
    {
      question: "What are the steps to register a corporation as a foreigner?",
      answer: "Reserve a company name at SEC Prepare and submit documents (Articles of Incorporation, By-laws, etc.) Deposit capital into a Philippine bank Register with SEC Register with BIR and get your TIN Secure barangay clearance and mayor’s permit Register with SSS, PhilHealth, and Pag-IBIG"
    },
    {
      question: "Can a foreigner be a director or officer of a company?",
      answer: "Yes. A foreigner can be a director, Corporate Secretary must be held by Filipino citizens."
    },
    {
      question: "Do I need a visa to open and run a business in the Philippines?",
      answer: "Yes. You can’t operate a business legally on a tourist visa. Options include: 9(g) Pre-arranged employment visa Special Investor’s Resident Visa (SIRV) Special Resident Retiree’s Visa (SRRV) Special Visa for Employment Generation (SVEG)"
    },
    {
      question: "Can a foreigner buy land in the Philippines for the business?",
      answer: "No, foreigners cannot own land."
    },
    {
      question: "What incentives are available to foreign investors?",
      answer: "If your business qualifies under BOI, PEZA, or CEZA, you may get: Tax holidays Duty-free importation of capital equipment Simplified customs procedures Permanent resident status for investors"
    },
    {
      question: "What are the main types of business taxes in the Philippines?",
      answer: "Corporate Income Tax Value-Added Tax (VAT) or Percentage Tax Withholding Taxes (on salaries, rentals, suppliers, etc.) Excise Tax (for certain products) Local Business Tax (LBT) – collected by city/municipality Annual Registration Fee (₱500 per company)"
    },
    {
      question: "What is the corporate income tax rate in the Philippines?",
      answer: "25% for most domestic and resident foreign corporations 20% for corporations with net taxable income ≤ ₱5 million and total assets ≤ ₱100 million (excluding land) Non-resident foreign corporations: taxed at 25% on income from Philippine sources"
    },
    {
      question: "What is VAT and who needs to register for it?",
      answer: "VAT (Value-Added Tax) is a 12% tax on sales of goods, services, or lease. You must register for VAT if: Your annual gross sales/receipts exceed ₱3 million You are voluntarily registering (even below threshold)"
    },
    {
      question: "What is the difference between VAT and Percentage Tax?",
      answer: "VAT = 12% of sales (for bigger businesses, required above ₱3M revenue) Percentage Tax = 3% (optional for small businesses below ₱3M if not VAT-registered)"
    },
    {
      question: "What taxes are required for employees and payroll?",
      answer: "Withholding Tax on Compensation – based on graduated tax table Employer contributions to: SSS (Social Security System) PhilHealth Pag-IBIG Fund"
    },
    {
      question: "What is the withholding tax system in the Philippines?",
      answer: "Businesses are required to withhold part of the payment to suppliers, employees, and contractors, then remit it to the BIR."
    },
    {
      question: "How do I register my business for tax purposes?",
      answer: "Go to the BIR RDO (Revenue District Office) with jurisdiction over your office Submit forms and documents (SEC, DTI, Mayor’s Permit, lease, etc.) Get: TIN (Taxpayer Identification Number) Certificate of Registration (COR / BIR Form 2303) Books of Account (manual or computerized) Authority to Print official receipts/invoices"
    },
    {
      question: "When is the deadline for annual income tax return filing?",
      answer: "Every April 15 of the following year (e.g., 2024 ITR due on April 15, 2025) Corporations file BIR Form 1702"
    },
    {
      question: "Are there tax incentives available to foreign investors?",
      answer: "Yes. Through BOI, PEZA, or other investment promotion agencies, you may qualify for: Income tax holiday (ITH) 5% GIE (Gross Income Tax) in lieu of all local/national taxes Duty-free importation of equipment VAT zero-rating on local purchases"
    },
    {
      question: "What are the penalties for late or incorrect tax filing?",
      answer: "25% surcharge on unpaid tax 12% annual interest on unpaid tax Compromise penalties depending on violation BIR may also audit or investigate non-compliant businesses."
    },
    {
      question: "What is the corporate income tax rate in the Philippines?",
      answer: "As of 2023 (CREATE Law), the corporate income tax rate is: 25% for most domestic and resident foreign corporations 20% for domestic corporations with net taxable income ≤ ₱5 million and total assets ≤ ₱100 million"
    },
    {
      question: "Do I need a visa to enter the Philippines?",
      answer: "It depends on your nationality. Many countries (e.g., USA, UK, EU, ASEAN) can enter visa-free for up to 30 days. For longer stays, you need to apply for a visa in advance"
    },
    {
      question: "Can I extend my tourist visa in the Philippines?",
      answer: "Yes. You can extend your stay up to 36 months (non-visa required nationals) or 24 months (visa-required) by going to the Bureau of Immigration (BI). First extension: 29 days (total 59 days) After that, you can apply for further extensions every 1-2 months"
    },
    {
      question: "What visa do I need to work in the Philippines?",
      answer: "You need a 9(g) Pre-arranged Employment Visa Must be sponsored by a Philippine-registered company Requires an Alien Employment Permit (AEP) from DOLE before applying for the visa"
    },
    {
      question: "What is a Special Investor’s Resident Visa (SIRV)?",
      answer: "A long-term visa that allows a foreigner to live and invest in the Philippines Requires a minimum investment of US$75,000 Must be placed in approved businesses or government-listed industries Holders can stay indefinitely as long as the investment is act"
    },
    {
      question: "What is the Special Resident Retiree’s Visa (SRRV)?",
      answer: "A visa for retirees who want to live in the Philippines long-term. There are different SRRV types, but generally: Age 35–49: deposit $50,000 Age 50+: deposit $10,000 to $20,000, depending on income/pension SRRV allows multiple-entry, indefinite stay, and tax & customs perks."
    },
    {
      question: "Can I convert my tourist visa into a work or investor visa?",
      answer: "Yes, conversion is possible while in the Philippines — you don’t need to leave. You must submit all necessary documents to the Bureau of Immigration, including a new visa application, sponsor requirements, and certifications."
    },
    {
      question: "What is the 9(a) Temporary Visitor Visa?",
      answer: "A short-term visa for tourism, business meetings, or family visits. May be valid for 59 days or more Can be extended at the BI Cannot be used for employment or regular business operation"
    },
    {
      question: "How long can I stay in the Philippines with a work visa?",
      answer: "The 9(g) visa is usually valid for 1 to 3 years, renewable based on your employment contract and AEP status."
    },
    {
      question: "What documents are required to apply for a 9(g) Work Visa?",
      answer: "Company endorsement letter Employment contract Alien Employment Permit (AEP) Valid passport and previous visas Medical clearance NBI or police clearance"
    },
    {
      question: "Can my dependents (spouse/children) stay with me?",
      answer: "Yes. They can apply for a 13(a) dependent visa or be included under your visa as dependents, depending on the visa type."
    }
  ];

  const column1Faqs = faqs.slice(0, Math.ceil(faqs.length / 2));
  const column2Faqs = faqs.slice(Math.ceil(faqs.length / 2));

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.42, 0, 0.58, 1] } as Transition }, // Explicitly cast to Transition
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-100 via-green-100 to-blue-100 relative overflow-hidden">
      {/* Subtle background gradient circles */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-green-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-200/50 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about visas, business, and residency in the Philippines.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-4">
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {column1Faqs.map((faq, index) => (
                  <motion.div
                    key={`col1-${index}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <AccordionItem value={`item-${index}`} className="border-b py-2">
                      <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-2 hover:bg-gray-50 rounded-md px-2 transition-colors duration-200">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-sm leading-relaxed pt-2 pb-4 px-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
            <div className="space-y-4">
              <Accordion type="single" collapsible className="w-full">
                {column2Faqs.map((faq, index) => (
                  <motion.div
                    key={`col2-${index}`}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={itemVariants}
                    transition={{ duration: 0.5, delay: (column1Faqs.length + index) * 0.05 }}
                  >
                    <AccordionItem value={`item-${index}`} className="border-b py-2">
                      <AccordionTrigger className="text-left text-base font-medium hover:no-underline py-2 hover:bg-gray-50 rounded-md px-2 transition-colors duration-200">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 text-sm leading-relaxed pt-2 pb-4 px-2">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(40px, -60px) scale(1.2); /* Increased movement and scale */
          }
          66% {
            transform: translate(-30px, 30px) scale(0.8); /* Increased movement and scale */
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </section>
  )
}
