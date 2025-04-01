
const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-amber-600 p-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-amber-100 text-lg">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        {/* Content Section */}
        <div className="p-8">
          <div className="mb-8">
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Welcome to <span className="font-semibold text-amber-600">Gabby's Hotel</span>! These terms of service outline the rules and regulations for the use of our website and services.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              By accessing this website, we assume you accept these terms of service in full. Do not continue to use Gabby Hotel's website if you do not accept all of the terms stated on this page.
            </p>
          </div>

          {/* Terms Sections */}
          <div className="space-y-8">
            <Section 
              title="1. Terms" 
              content="By accessing this website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws."
            />
            
            <Section 
              title="2. Privacy Policy" 
              content="Our Privacy Policy governs the manner in which Gabby's Hotel collects, uses, maintains, and discloses information collected from users of this website. Please read our Privacy Policy carefully."
            />
            
            <Section 
              title="3. License" 
              content="We grant you a limited license to access and make personal use of this website and not to download (other than page caching) or modify it, or any portion of it, except with express written consent of Gabby's Hotel."
            />
            
            <Section 
              title="4. User Account" 
              content="If you are invited to create a user account, you must provide current, complete, and accurate information. You are responsible for maintaining the confidentiality of your account and password."
            />
            
            <Section 
              title="5. Intellectual Property Rights" 
              content="Unless otherwise stated, Gabby's Hotel and/or its licensors own the intellectual property rights for all material on this website. All intellectual property rights are reserved."
            />
            
            <Section 
              title="6. Limitation of Liability" 
              content="In no event shall Gabby's Hotel, nor its directors, employees, agents, subsidiaries, or affiliates, be liable for anything arising out of or in any way connected with your use of this website."
            />
            
            <Section 
              title="7. Governing Law" 
              content="These terms of service are governed by and construed in accordance with the laws of Nigeria, specifically the laws of Port Harcourt, Rivers State."
            />
            
            <Section 
              title="8. Changes to Terms" 
              content="Gabby's Hotel reserves the right to update or change these terms of service at any time without prior notice. By continuing to use this website, you agree to be bound by the revised terms."
            />
            
            <div className="bg-amber-50 p-6 rounded-lg border-l-4 border-amber-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-3">9. Contact Us</h2>
              <p className="text-gray-700 mb-4">
                If you have any questions about these terms of service, please contact us at:
              </p>
              <a 
                href="mailto:gabbyhotels@gmail.com" 
                className="inline-flex items-center text-amber-600 hover:text-amber-800 font-medium transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                gabbyhotels@gmail.com
              </a>
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

// Reusable Section Component
const Section = ({ title, content }: { title: string; content: string }) => (
  <div className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
    <h2 className="text-2xl font-bold text-gray-800 mb-3">{title}</h2>
    <p className="text-gray-700 leading-relaxed">{content}</p>
  </div>
);

export default Terms;