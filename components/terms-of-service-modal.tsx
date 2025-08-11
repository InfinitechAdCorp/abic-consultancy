"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface TermsOfServiceModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsOfServiceModal({ isOpen, onClose }: TermsOfServiceModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Removed flex flex-col and h-[90vh], added overflow-y-auto */}
        <DialogHeader className="p-6 pb-4 border-b border-gray-200">
          <DialogTitle className="text-3xl font-bold text-gray-900 text-center">Terms of Service</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Understanding your rights and responsibilities when using ABIC Consultancy services.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">
          {/* Removed ScrollArea wrapper */}
          <div className="space-y-6 text-gray-700 text-sm md:text-base">
            <p>
              Welcome to ABIC Consultancy! These Terms of Service ("Terms") govern your use of our website and services
              provided by ABIC Consultancy ("we", "us", or "our"). By accessing or using our website and services, you
              agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our
              services.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">1. Services Provided</h2>
            <p className="mt-2">
              ABIC Consultancy provides comprehensive business solutions, international visa services, tax consulting,
              and HR outsourcing. Our services are designed to assist foreign entrepreneurs and investors in
              establishing and growing their businesses in the Philippines. This includes, but is not limited to:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Business registration and compliance</li>
              <li>Permit acquisition</li>
              <li>International visa application and immigration support</li>
              <li>Tax planning and compliance management</li>
              <li>Human Resources solutions and payroll management</li>
              <li>Expert guidance and consultation</li>
            </ul>
            <h2 className="text-xl font-bold text-gray-800 pt-4">2. User Responsibilities</h2>
            <p className="mt-2">As a user of ABIC Consultancy's services, you agree to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Provide accurate, complete, and current information as required for our services.</li>
              <li>Comply with all applicable laws and regulations in the Philippines and your home country.</li>
              <li>
                Cooperate fully with our team by providing necessary documents and information in a timely manner.
              </li>
              <li>Not use our services for any unlawful or fraudulent purposes.</li>
            </ul>
            <h2 className="text-xl font-bold text-gray-800 pt-4">3. Intellectual Property</h2>
            <p className="mt-2">
              All content on this website, including text, graphics, logos, images, and software, is the property of
              ABIC Consultancy or its content suppliers and is protected by intellectual property laws. You may not
              reproduce, distribute, modify, or create derivative works from any content without our express written
              permission.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">4. Disclaimers</h2>
            <p className="mt-2">
              Our services are provided "as is" and "as available" without any warranties, express or implied. While we
              strive for a high success rate (98% as stated in our hero section) and provide expert support, we do not
              guarantee specific outcomes for visa applications, business registrations, or other services, as these are
              subject to government regulations and other external factors.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">5. Limitation of Liability</h2>
            <p className="mt-2">
              To the fullest extent permitted by law, ABIC Consultancy shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
              or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your
              access to or use of or inability to access or use the services; (b) any conduct or content of any third
              party on the services; or (c) unauthorized access, use, or alteration of your transmissions or content.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">6. Governing Law</h2>
            <p className="mt-2">
              These Terms shall be governed and construed in accordance with the laws of the Philippines, without regard
              to its conflict of law provisions.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">7. Changes to Terms</h2>
            <p className="mt-2">
              We reserve the right to modify or replace these Terms at any time. We will provide reasonable notice of
              any material changes. By continuing to access or use our services after those revisions become effective,
              you agree to be bound by the revised terms.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">8. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about these Terms, please contact us through our website or directly via email.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
