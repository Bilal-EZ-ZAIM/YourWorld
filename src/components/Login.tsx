import { MessageCircle } from 'lucide-react';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <MessageCircle className="h-12 w-12 text-emerald-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to continue to ChatApp</p>
        </div>

        <button
          onClick={() => {/* Google login logic will be implemented */}}
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
        >
          <img 
            src="https://www.google.com/favicon.ico" 
            alt="Google" 
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <div className="mt-6 text-center text-sm text-gray-600">
          By continuing, you agree to our 
          <a href="#" className="text-emerald-600 hover:text-emerald-500 ml-1">
            Terms of Service
          </a>
          {' '}and{' '}
          <a href="#" className="text-emerald-600 hover:text-emerald-500">
            Privacy Policy
          </a>
        </div>
      </div>
    </div>
  );
}