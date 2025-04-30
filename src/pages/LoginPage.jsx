import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import Kiriatas from '../assets/kiriatas.svg';
import Kananatas from '../assets/kananAtas.svg';
import Kananbawah from '../assets/kananBawah.svg';
const LoginPage = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 bg-[#43A6EE] overflow-hidden">
            {/* Dekorasi gambar sudut kiri atas */}
            {/* <img
                src={Kiriatas}
                alt="Decoration"
                className="absolute -top-80 -left-16 w-[895px] h-[895px] z-0 opacity-80"
            />
            <img
                src={Kananatas}
                alt="Decoration"
                className="absolute -top-[650px] rotate-12 -right-16 w-[1042px] h-[1042px] z-0 opacity-80"
            /> */}

            {/* Dekorasi gambar sudut kanan bawah */}
            {/* <img
                src={Kananbawah}
                alt="Decoration"
                className="absolute -bottom-64 -right-48 rotate-12 w-[1150px] h-[1150px] z-0 opacity-80"
            /> */}

            {/* Kontainer Form */}
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-[632px] z-10">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
