import { useSelector } from 'react-redux';
import logo from '../../assets/logo.png';

const Step8 = () => {
  const { firstName, userData } = useSelector((s) => s.registration);
  const name = userData?.user?.fname || firstName || 'there';

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F8F8] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 rounded-full bg-green-200/40 blur-3xl" />
        <div className="absolute top-20 right-1/4 w-48 h-48 rounded-full bg-pink-200/50 blur-3xl" />
        <div className="absolute bottom-20 right-1/3 w-56 h-56 rounded-full bg-purple-200/40 blur-3xl" />
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
        <img src={logo} alt="Woliba" className="h-8 md:h-10 object-contain" />
        <div className="flex items-center gap-2 text-sm text-[#1D3857] font-medium">
          <span>Language</span>
          <span className="flex items-center gap-1">🇺🇸 En</span>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 gap-6 text-center">
        <div className="relative w-40 h-40">
          <div className="absolute inset-0 rounded-full bg-[#E07070]/20" />
          <svg viewBox="0 0 120 120" className="w-full h-full" fill="none">
            <circle cx="60" cy="30" r="12" stroke="#1D3857" strokeWidth="3"/>
            <path d="M38 55 Q60 40 82 55 L88 85 L72 85 L70 100 L50 100 L48 85 L32 85 Z" stroke="#1D3857" strokeWidth="3" fill="none"/>
            <path d="M32 65 Q22 60 18 68" stroke="#1D3857" strokeWidth="2.5" strokeLinecap="round"/>
            <path d="M88 65 Q98 60 102 68" stroke="#1D3857" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
          <div className="absolute -top-2 -right-2 w-6 h-6 rotate-45 bg-purple-400/60 rounded-sm" />
          <div className="absolute top-4 -left-3 w-4 h-4 rotate-45 bg-purple-300/60 rounded-sm" />
        </div>

        <div className="flex flex-col gap-3 max-w-md">
          <h1 className="text-3xl font-bold text-[#1D3857]">Welcome {name}!</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            Welcome to Woliba! You'll find wellness challenges, fitness and recipe videos,
            and daily tips to support your health goals. Download our iOS or Android app
            and start your wellbeing journey today.
          </p>
        </div>

        <button
          onClick={() => window.location.href = '/'}
          className="bg-[#E07070] text-white font-semibold px-10 py-3 rounded-full hover:bg-[#C85E5E] transition-colors"
        >
          Let's get Started
        </button>
      </main>
    </div>
  );
};

export default Step8;
