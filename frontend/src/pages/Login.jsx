import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

// Assuming you fixed your background image import from the previous step
// If not, define it inline as shown in the previous solution's "Option 1"
import bgGif from '../assets/airport-bg.gif'; 

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.message) {
      setSuccess(location.state.message);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4"
      // Ensuring the background style is here so you can see the transparency effect
      style={{ 
        backgroundImage: `url(${bgGif})`, // Or use a URL string here if import fails
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-md w-full">
        
        {/* --- THIS IS THE UPDATED LINE --- */}
        {/* bg-white/50: Sets background to white with 50% opacity. Change 50 to fit your needs (e.g., /30 or /70).
            backdrop-blur-md: Blurs the image behind the card.
            border-white/30: Makes the border semi-transparent so it doesn't look too harsh.
        */}
        <div className="card bg-white/50 backdrop-blur-md shadow-xl border border-white/30">
          <div className="card-body p-8">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">✈️</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600 font-medium">Sign in to your BookwithBarood account</p>
            </div>

            {success && (
              <div className="alert alert-success mb-4 animate-fade-in bg-success/80 border-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{success}</span>
              </div>
            )}

            {error && (
              <div className="alert alert-error mb-4 animate-fade-in bg-error/80 border-none text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Email</span>
                </label>
                {/* Added bg-white/50 to inputs so they stand out from the transparent card */}
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  className="input input-bordered input-primary w-full focus:input-primary bg-white/70"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-gray-700">Password</span>
                </label>
                 {/* Added bg-white/50 to inputs so they stand out from the transparent card */}
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered input-primary w-full focus:input-primary bg-white/70"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </div>
            </form>

            <div className="divider text-gray-600 font-medium">OR</div>

            <div className="text-center">
              <p className="text-sm text-gray-700 font-medium">
                Don't have an account?{' '}
                <Link to="/register" className="link link-primary font-bold">
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}