import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        {/* Header Section - Reduced vertical padding */}
        <section className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 py-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Privacy Policy</h1>
          <p className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Your privacy is important to us. Learn how we protect your data.
          </p>
        </section>

        {/* Main Content Area - Wider container, reduced vertical margins */}
        <section className="container mx-auto px-4 py-8 md:py-10 lg:py-12 max-w-4xl bg-white shadow-lg rounded-lg my-6">
          <p className="mb-5 text-gray-700 leading-relaxed">
            At ABIC Consultancy, we are committed to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our website{" "}
            <Link href="/" className="text-blue-600 hover:underline">
              [Your Website URL]
            </Link>{" "}
            and use our services. Please read this Privacy Policy carefully. If you do not agree with the terms of this
            Privacy Policy, please do not access the site or use our services.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-6 pb-1 border-b border-gray-200">
            1. Information We Collect
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-6 mt-3 text-gray-700">
            <li>
              <strong>Personal Identifiable Information:</strong> Name, email address, phone number, postal address,
              nationality, passport details, business registration details, financial information (for tax/HR services),
              and other relevant details required for visa applications, business setup, tax consulting, and HR
              outsourcing.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you access and use our website, such as your IP
              address, browser type, operating system, pages viewed, and the time and date of your visit.
            </li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            2. How We Use Your Information
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We use the information we collect for various purposes, including to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-6 mt-3 text-gray-700">
            <li>Provide, operate, and maintain our services (business solutions, visa, tax, HR outsourcing).</li>
            <li>Process your applications and requests.</li>
            <li>
              Communicate with you, including sending updates, service-related announcements, and promotional materials.
            </li>
            <li>Improve our website and services.</li>
            <li>Monitor and analyze usage and trends to improve your experience.</li>
            <li>Detect, prevent, and address technical issues.</li>
            <li>Comply with legal obligations and enforce our Terms of Service.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            3. How We Share Your Information
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may share your information in the following situations:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-6 mt-3 text-gray-700">
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
              during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion
              of our business to another company.
            </li>
            <li>
              <strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with
              your consent.
            </li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            4. Data Security
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We implement a variety of security measures designed to maintain the safety of your personal information.
            However, no electronic transmission over the Internet or information storage technology can be guaranteed to
            be 100% secure, so we cannot promise that unauthorized third parties will never be able to defeat our
            security measures or use your personal information for improper purposes.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            5. Your Rights
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Depending on your jurisdiction, you may have the following rights regarding your personal information:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-6 mt-3 text-gray-700">
            <li>The right to access your personal data.</li>
            <li>The right to request correction of inaccurate data.</li>
            <li>The right to request deletion of your data.</li>
            <li>The right to object to the processing of your data.</li>
            <li>The right to data portability.</li>
          </ul>
          <p className="mt-3 text-gray-700 leading-relaxed">
            To exercise any of these rights, please contact us using the contact details provided below.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            6. Data Retention
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We will retain your personal information only for as long as is necessary for the purposes set out in this
            Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting,
            or other legal requirements).
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            7. Cookies and Tracking Technologies
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may use cookies and similar tracking technologies to track the activity on our website and hold certain
            information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if
            you do not accept cookies, you may not be able to use some portions of our services.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            8. Links to Other Websites
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Our website may contain links to other websites that are not operated by us. If you click on a third-party
            link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy
            of every site you visit. We have no control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            9. Children's Privacy
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personally
            identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware
            that your child has provided us with personal data, please contact us. If we become aware that we have
            collected personal data from children without verification of parental consent, we take steps to remove that
            information from our servers.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            10. Changes to This Privacy Policy
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
            Changes to this Privacy Policy are effective when they are posted on this page.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            11. Contact Us
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            If you have any questions about this Privacy Policy, please contact us through our website or directly via
            email.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
