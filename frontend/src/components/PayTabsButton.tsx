import { usePayTabsCheckout } from '../hooks/usePayTabsCheckout';

export const PayTabsButtonWithDetails = () => {
  const { initiateCheckout, isLoading, error } = usePayTabsCheckout();

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-2xl shadow-lg space-y-6 border border-gray-200">
      <h1 className="text-2xl font-bold text-center text-gray-800">PayTabs Payment Demo</h1>

      {/* Payment Button */}
      <div className="flex justify-center">
        <button
          onClick={initiateCheckout}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold text-sm hover:bg-blue-700
                   disabled:bg-gray-400 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Processing...' : 'Pay with PayTabs'}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-center text-red-500 text-sm">
          {error}
        </p>
      )}

      {/* Test Card Details */}
      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-lg font-medium mb-2 text-gray-700">💳 Test Card Details</h2>
        <ul className="text-sm text-gray-600 space-y-1">
          <li><strong>Card Number:</strong> 4000 0000 0000 0002</li>
          <li><strong>CVV:</strong> 123</li>
          <li><strong>Expiry:</strong> 12 / 25</li>
        </ul>
        <p className="text-xs text-gray-500 mt-3">Use these credentials to test the payment flow.</p>
      </div>
    </div>
  );
};