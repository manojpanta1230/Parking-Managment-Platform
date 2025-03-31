import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms of Service</h1>

      <p className="mb-6">
        By accessing or using ParkSmart, you agree to be bound by these Terms
        of Service. If you do not agree to these terms, please do not use our
        services.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Use of Service</h2>
      <p className="mb-4">
        You agree to use ParkSmart only for lawful purposes and in accordance
        with all applicable laws and regulations. Any misuse of our services may
        result in suspension or termination of access.
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. User Accounts</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account
        information. You agree to notify us immediately of any unauthorized use
        of your account.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Intellectual Property</h2>
      <p className="mb-4">
        All content, trademarks, and intellectual property on ParkSmart belong
        to us or our licensors. You may not copy, distribute, or modify any
        materials without our written consent.
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. Limitation of Liability</h2>
      <p className="mb-4">
        ParkSmart is provided “as is” without warranties of any kind. We are not
        liable for any direct, indirect, or incidental damages resulting from
        your use of our services.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Changes to Terms</h2>
      <p className="mb-4">
        We reserve the right to update these Terms of Service at any time.
        Continued use of ParkSmart after changes means you accept the updated
        terms.
      </p>

      <p className="mt-8 text-sm text-gray-600">
        If you have any questions about these terms, please contact us at{" "}
        <a href="mailto:support@parksmart.com" className="text-indigo-600 underline">
          support@parksmart.com
        </a>.
      </p>
    </div>
  );
};

export default TermsOfService;
