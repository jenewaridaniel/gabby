import React from "react";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-amber-600 p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-blue-100 text-lg">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              At{" "}
              <span className="font-semibold text-amber-600">
                Gabby's Hotel
              </span>
              , we are committed to protecting your privacy. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website or use our services.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Please read this privacy policy carefully. By accessing or using
              our services, you agree to the collection and use of information
              in accordance with this policy.
            </p>
          </div>

          {/* Policy Sections */}
          <div className="space-y-8">
            <PolicySection
              title="1. Information We Collect"
              content={
                <>
                  <p className="mb-4">
                    We may collect personal information that you voluntarily
                    provide to us when you:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>Make a reservation or booking</li>
                    <li>Register for an account on our website</li>
                    <li>Subscribe to our newsletter or promotional emails</li>
                    <li>Contact us with inquiries or feedback</li>
                    <li>Participate in surveys or promotions</li>
                  </ul>
                  <p>
                    The types of personal information we collect may include:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Name, contact information (email, phone, address)</li>
                    <li>Payment and billing information</li>
                    <li>Stay preferences and special requests</li>
                    <li>Identification documents (for check-in purposes)</li>
                    <li>Demographic information</li>
                  </ul>
                </>
              }
            />

            <PolicySection
              title="2. How We Use Your Information"
              content={
                <>
                  <p>
                    We use the information we collect for various purposes,
                    including:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>To process and manage your reservations and stays</li>
                    <li>To provide and maintain our services</li>
                    <li>To notify you about changes to our services</li>
                    <li>
                      To allow you to participate in interactive features of our
                      service
                    </li>
                    <li>To provide customer support</li>
                    <li>
                      To gather analysis or valuable information to improve our
                      services
                    </li>
                    <li>To monitor the usage of our services</li>
                    <li>To detect, prevent and address technical issues</li>
                    <li>
                      To provide you with news, special offers, and general
                      information about other goods, services, and events which
                      we offer
                    </li>
                  </ul>
                </>
              }
            />

            <PolicySection
              title="3. Data Security"
              content={
                <>
                  <p className="mb-4">
                    We implement appropriate technical and organizational
                    measures to protect the security of your personal
                    information, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      Secure servers and networks protected by firewalls and
                      encryption
                    </li>
                    <li>
                      Restricted access to personal information on a
                      need-to-know basis
                    </li>
                    <li>Regular security assessments and updates</li>
                  </ul>
                  <p>
                    While we strive to protect your personal information, no
                    method of transmission over the Internet or electronic
                    storage is 100% secure. We cannot guarantee absolute
                    security of your data.
                  </p>
                </>
              }
            />

            <PolicySection
              title="4. Cookies and Tracking Technologies"
              content={
                <>
                  <p className="mb-4">
                    We use cookies and similar tracking technologies to track
                    activity on our website and hold certain information.
                    Cookies are files with small amounts of data which may
                    include an anonymous unique identifier.
                  </p>
                  <p className="mb-4">
                    You can instruct your browser to refuse all cookies or to
                    indicate when a cookie is being sent. However, if you do not
                    accept cookies, you may not be able to use some portions of
                    our website.
                  </p>
                  <p>We use cookies for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Remembering your preferences and settings</li>
                    <li>Analyzing site traffic and usage patterns</li>
                    <li>Delivering targeted advertisements</li>
                    <li>Enabling certain website functionalities</li>
                  </ul>
                </>
              }
            />

            <PolicySection
              title="5. Third-Party Services"
              content={
                <>
                  <p className="mb-4">
                    We may employ third-party companies and individuals to
                    facilitate our services ("Service Providers"), provide
                    services on our behalf, perform service-related services, or
                    assist us in analyzing how our services are used.
                  </p>
                  <p className="mb-4">
                    These third parties have access to your personal information
                    only to perform these tasks on our behalf and are obligated
                    not to disclose or use it for any other purpose.
                  </p>
                  <p>Third-party services we use include:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment processors</li>
                    <li>Analytics providers</li>
                    <li>Marketing and advertising partners</li>
                    <li>Booking and reservation systems</li>
                  </ul>
                </>
              }
            />

            <PolicySection
              title="6. International Data Transfers"
              content="Your information, including personal data, may be transferred to — and maintained on — computers located outside of your state, province, country, or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. We will take all steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy."
            />

            <PolicySection
              title="7. Children's Privacy"
              content="Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children under 18. If we become aware that a child under 18 has provided us with personal information, we will take steps to delete such information."
            />

            <PolicySection
              title="8. Your Data Protection Rights"
              content={
                <>
                  <p className="mb-4">
                    Depending on your location, you may have certain rights
                    regarding your personal information, including:
                  </p>
                  <ul className="list-disc pl-6 mb-4 space-y-2">
                    <li>
                      The right to access, update, or delete your information
                    </li>
                    <li>
                      The right to rectification if your information is
                      inaccurate
                    </li>
                    <li>The right to object to our processing of your data</li>
                    <li>The right to request restriction of processing</li>
                    <li>The right to data portability</li>
                    <li>The right to withdraw consent</li>
                  </ul>
                  <p>
                    To exercise any of these rights, please contact us using the
                    information below.
                  </p>
                </>
              }
            />

            <PolicySection
              title="9. Changes to This Privacy Policy"
              content="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. You are advised to review this Privacy Policy periodically for any changes."
            />

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                10. Contact Us
              </h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy, please
                contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href="mailto:privacy@gabbyhotel.com"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    privacy@gabbyhotel.com
                  </a>
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+1234567890"
                    className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                  >
                    +1 (234) 567-890
                  </a>
                </div>
                <div className="flex items-start">
                  <svg
                    className="w-5 h-5 mr-2 text-blue-600 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span className="text-gray-700">
                    123 Hospitality Lane
                    <br />
                    Port Harcourt, Rivers State
                    <br />
                    Nigeria
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Gabby's Hotel. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

// Reusable Policy Section Component
const PolicySection = ({
  title,
  content,
}: {
  title: string;
  content: React.ReactNode;
}) => (
  <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
    <div className="text-gray-700 leading-relaxed">{content}</div>
  </div>
);

export default Privacy;
