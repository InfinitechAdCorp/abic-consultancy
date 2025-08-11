"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import Link from "next/link" // Keep Link if used in content

interface PrivacyPolicyModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrivacyPolicyModal({ isOpen, onClose }: PrivacyPolicyModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        {/* Removed flex flex-col and h-[90vh], added overflow-y-auto */}
        <DialogHeader className="p-6 pb-4 border-b border-gray-200">
          <DialogTitle className="text-3xl font-bold text-gray-900 text-center">Privacy Policy</DialogTitle>
          <DialogDescription className="text-center text-gray-600">
            Your privacy is important to us. Learn how we protect your data.
          </DialogDescription>
        </DialogHeader>
        <div className="px-6 py-4">
          {/* Removed ScrollArea wrapper */}
          <div className="space-y-6 text-gray-700 text-sm md:text-base">
            <p>
              At ABIC Consultancy, we are committed to protecting your privacy. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you visit our website{" "}
              <Link href="/" className="text-blue-600 hover:underline">
                https://abic-consultancy402.vercel.app/
              </Link>{" "}
              and use our services. Please read this Privacy Policy carefully. If you do not agree with the terms of
              this Privacy Policy, please do not access the site or use our services.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">1. Information We Collect</h2>
            <p className="mt-2">We may collect personal information that you voluntarily provide to us when you:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>Personal Identifiable Information:</strong> Name, email address, phone number, postal address,
                nationality, passport details, business registration details, financial information (for tax/HR
                services), and other relevant details required for visa applications, business setup, tax consulting,
                and HR outsourcing.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about how you access and use our website, such as your IP
                address, browser type, operating system, pages viewed, and the time and date of your visit.
              </li>
            </ul>
            <h2 className="text-xl font-bold text-gray-800 pt-4">2. How We Use Your Information</h2>
            <p className="mt-2">We use the information we collect for various purposes, including to:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>Provide, operate, and maintain our services (business solutions, visa, tax, HR outsourcing).</li>
              <li>Process your applications and requests.</li>
              <li>
                Communicate with you, including sending updates, service-related announcements, and promotional
                materials.
              </li>
              <li>Improve our website and services.</li>
              <li>Monitor and analyze usage and trends to improve your experience.</li>
              <li>Detect, prevent, and address technical issues.</li>
              <li>Comply with legal obligations and enforce our Terms of Service.</li>
            </ul>
            <h2 className="text-xl font-bold text-gray-800 pt-4">3. How We Share Your Information</h2>
            <p className="mt-2">We may share your information in the following situations:</p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>
                <strong>With Service Providers:</strong> We may share your information with third-party vendors, service
                providers, contractors, or agents who perform services for us or on our behalf, such as payment
                processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </li>
              <li>
                <strong>For Legal Compliance:</strong> We may disclose your information where we are legally required to
                do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order,
                or legal process (including in response to court orders or subpoenas).
              </li>
              <li>
                <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or
                during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a
                portion of our business to another company.
              </li>
              <li>
                <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with
                your consent.
              </li>
            </ul>
            <h2 className="text-xl font-bold text-gray-800 pt-4">4. Data Security</h2>
            <p className="mt-2">
              We implement a variety of security measures designed to maintain the safety of your personal information.
              However, no electronic transmission over the Internet or information storage technology can be guaranteed
              to be 100% secure, so we cannot promise that unauthorized third parties will never be able to defeat our
              security measures or use your personal information for improper purposes.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">5. Your Rights</h2>
            <p className="mt-2">
              Depending on your jurisdiction, you may have the following rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside space-y-1 pl-4">
              <li>The right to access your personal data.</li>
              <li>The right to request correction of inaccurate data.</li>
              <li>The right to request deletion of your data.</li>
              <li>The right to object to the processing of your data.</li>
              <li>The right to data portability.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us using the contact details provided below.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">6. Data Retention</h2>
            <p className="mt-2">
              We will retain your personal information only for as long as is necessary for the purposes set out in this
              Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting,
              or other legal requirements).
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">7. Cookies and Tracking Technologies</h2>
            <p className="mt-2">
              We may use cookies and similar tracking technologies to track the activity on our website and hold certain
              information. Cookies are files with a small amount of data which may include an anonymous unique
              identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
              sent. However, if you do not accept cookies, you may not be able to use some portions of our services.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">8. Links to Other Websites</h2>
            <p className="mt-2">
              Our website may contain links to other websites that are not operated by us. If you click on a third-party
              link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy
              of every site you visit. We have no control over and assume no responsibility for the content, privacy
              policies, or practices of any third-party sites or services.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">9. Children's Privacy</h2>
            <p className="mt-2">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personally
              identifiable information from anyone under the age of 18. If you are a parent or guardian and you are
              aware that your child has provided us with personal data, please contact us. If we become aware that we
              have collected personal data from children without verification of parental consent, we take steps to
              remove that information from our servers.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">10. Changes to This Privacy Policy</h2>
            <p className="mt-2">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              Changes to this Privacy Policy are effective when they are posted on this page.
            </p>
            <h2 className="text-xl font-bold text-gray-800 pt-4">11. Contact Us</h2>
            <p className="mt-2">
              If you have any questions about this Privacy Policy, please contact us through our website or directly via
              email.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
