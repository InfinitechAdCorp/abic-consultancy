import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-grow">
        {/* Header Section - Reduced vertical padding */}
        <section className="bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 py-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Terms of Service</h1>
          <p className="mt-3 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            Understanding your rights and responsibilities when using ABIC Consultancy services.
          </p>
        </section>

        {/* Main Content Area - Wider container, reduced vertical margins */}
        <section className="container mx-auto px-4 py-8 md:py-10 lg:py-12 max-w-4xl bg-white shadow-lg rounded-lg my-6">
          <p className="mb-5 text-gray-700 leading-relaxed">
            Welcome to ABIC Consultancy! These Terms of Service ("Terms") govern your use of our website and services
            provided by ABIC Consultancy ("we", "us", or "our"). By accessing or using our website and services, you
            agree to be bound by these Terms. If you do not agree with any part of these Terms, you must not use our
            services.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-6 pb-1 border-b border-gray-200">
            1. Services Provided
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            ABIC Consultancy provides comprehensive business solutions, international visa services, tax consulting, and
            HR outsourcing. Our services are designed to assist foreign entrepreneurs and investors in establishing and
            growing their businesses in the Philippines. This includes, but is not limited to:
          </p>
          <ul className="list-disc list-inside space-y-1 pl-6 mt-3 text-gray-700">
            <li>Business registration and compliance</li>
            <li>Permit acquisition</li>
            <li>International visa application and immigration support</li>
            <li>Tax planning and compliance management</li>
            <li>Human Resources solutions and payroll management</li>
            <li>Expert guidance and consultation</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            2. User Responsibilities
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">As a user of ABIC Consultancy's services, you agree to:</p>
          <ul className="list-disc list-inside space-y-1 pl-6 mt-3 text-gray-700">
            <li>Provide accurate, complete, and current information as required for our services.</li>
            <li>Comply with all applicable laws and regulations in the Philippines and your home country.</li>
            <li>Cooperate fully with our team by providing necessary documents and information in a timely manner.</li>
            <li>Not use our services for any unlawful or fraudulent purposes.</li>
          </ul>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            3. Intellectual Property
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            All content on this website, including text, graphics, logos, images, and software, is the property of ABIC
            Consultancy or its content suppliers and is protected by intellectual property laws. You may not reproduce,
            distribute, modify, or create derivative works from any content without our express written permission.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            4. Disclaimers
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            Our services are provided "as is" and "as available" without any warranties, express or implied. While we
            strive for a high success rate (98% as stated in our hero section) and provide expert support, we do not
            guarantee specific outcomes for visa applications, business registrations, or other services, as these are
            subject to government regulations and other external factors.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            5. Limitation of Liability
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            To the fullest extent permitted by law, ABIC Consultancy shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly
            or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your
            access to or use of or inability to access or use the services; (b) any conduct or content of any third
            party on the services; or (c) unauthorized access, use, or alteration of your transmissions or content.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            6. Governing Law
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            These Terms shall be governed and construed in accordance with the laws of the Philippines, without regard
            to its conflict of law provisions.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            7. Changes to Terms
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            We reserve the right to modify or replace these Terms at any time. We will provide reasonable notice of any
            material changes. By continuing to access or use our services after those revisions become effective, you
            agree to be bound by the revised terms.
          </p>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 pt-7 pb-1 border-b border-gray-200">
            8. Contact Us
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed">
            If you have any questions about these Terms, please contact us through our website or directly via email.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  )
}
