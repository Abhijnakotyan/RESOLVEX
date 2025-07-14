import React, { useState } from 'react';

function AdminLogin() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (email && password) {
        setStep(2);
        setMessage('OTP sent to your email');
      } else {
        setMessage('Please fill in all fields');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate OTP verification
    setTimeout(() => {
      if (otp.length === 6) {
        setMessage('Login successful!');
        // In real app: navigate('/admin/dashboard');
      } else {
        setMessage('Please enter a valid 6-digit OTP');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-3 py-6 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8 transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">
            {step === 1 ? 'Admin Login' : 'Verify OTP'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600">
            {step === 1 ? 'Enter your credentials to continue' : 'Check your email for the verification code'}
          </p>
        </div>

        {/* Message Alert */}
        {message && (
          <div
            className={`text-center text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-3 rounded-lg font-medium transition-all duration-200 ${
              message.includes('failed') || message.includes('Please')
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}
          >
            {message}
          </div>
        )}

        {/* Step 1: Login Form */}
        {step === 1 ? (
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                Admin Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 bg-gray-50 focus:bg-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 bg-gray-50 focus:bg-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={isLoading}
              className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-200 text-sm sm:text-base ${
                isLoading
                  ? 'bg-purple-400 cursor-not-allowed transform scale-95'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 hover:shadow-xl transform hover:scale-105 active:scale-95'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        ) : (
          /* Step 2: OTP Verification Form */
          <div className="space-y-4 sm:space-y-5">
            <div>
              <label htmlFor="otp" className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1 sm:mb-2">
                One-Time Password
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                pattern="\d{6}"
                title="Enter a valid 6-digit code"
                className="w-full px-3 py-2 sm:px-4 sm:py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base transition-all duration-200 bg-gray-50 focus:bg-white text-center font-mono tracking-widest"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isLoading}
              className={`w-full py-2.5 sm:py-3 rounded-lg font-semibold text-white shadow-lg transition-all duration-200 text-sm sm:text-base ${
                isLoading
                  ? 'bg-green-400 cursor-not-allowed transform scale-95'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 hover:shadow-xl transform hover:scale-105 active:scale-95'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Verifying...
                </span>
              ) : (
                'Verify OTP'
              )}
            </button>

            <div className="text-center text-xs sm:text-sm text-gray-500 pt-2">
              Didn't receive the code?{' '}
              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setMessage('');
                  setOtp('');
                }}
                className="text-purple-600 hover:text-purple-800 font-semibold underline hover:no-underline transition-all duration-200"
              >
                Resend OTP
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center pt-2 sm:pt-4">
          <p className="text-xs text-gray-400">
            Secure admin portal • Protected by two-factor authentication
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;