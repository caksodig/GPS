import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            setError('');
            setLoading(true);

            const result = await login(username, password);

            if (result.success) {
                navigate('/');
            } else {
                setError(result.message || 'Invalid username or password');
            }
        } catch (err) {
            setError('An error occurred during login. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-[900px] md:py-[70px] md:px-[57px]">
            <h1 className="md:text-[32px] text-2xl text-center mb-6 font-semibold">
                Login to <span className="text-primary font-semibold">GPS.ID TMS</span> Account
            </h1>
            <p className="text-center md:text-[18px] text-[#202224] mb-8">Please enter your email and password to continue</p>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="username">
                        Email address:
                    </label>
                    <input
                        id="username"
                        type="text"
                        className="input-field"
                        placeholder="Enter your username or email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="mb-2">
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <a href="#" className="text-[18px] text-[#202224]/50 hover:text-primary">
                            Forget Password?
                        </a>
                    </div>
                    <input
                        id="password"
                        type="password"
                        className="input-field"
                        placeholder="••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                </div>

                <div className="flex items-center mb-6 mt-4">
                    <input
                        id="remember"
                        type="checkbox"
                        className="mr-2"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        disabled={loading}
                    />
                    <label htmlFor="remember" className="text-[#202224]/50">
                        Remember Password
                    </label>
                </div>

                <button
                    type="submit"
                    className={`bg-[#43A6EE] rounded-[8px] text-white w-full py-3 text-[20px] font-semibold    ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={loading}
                >
                    {loading ? 'Signing In...' : 'Sign In'}
                </button>

                <div className="text-center mt-6">
                    <p className="text-[#202224]/50 font-semibold">
                        Don't have an account?
                        <a href="#" className="text-primary font-medium ml-1">
                            Create Account
                        </a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;