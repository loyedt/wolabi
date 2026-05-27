import logo from '../../assets/logo.png';
import bgImage from '../../assets/background.png';

const AuthLayout = ({ children, lightBg = false }) => {
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={lightBg ? { backgroundColor: '#F8F8F8' } : {}}
    >
      {!lightBg && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}

      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
        <img src={logo} alt="Woliba" className="h-8 md:h-10 object-contain" />
        <div className="flex items-center gap-2 text-sm text-[#1D3857] font-medium">
          <span>Language</span>
          <span className="flex items-center gap-1">
            <span>🇺🇸</span>
            <span>En</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="#1D3857" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
          {children}
        </div>
      </main>

      <footer className="relative z-10 flex items-center justify-center gap-6 py-4 text-sm">
        <a href="#" className="text-[#E07070] hover:underline">Terms of Use</a>
        <a href="#" className="text-[#E07070] hover:underline">Contact Us</a>
      </footer>
    </div>
  );
};

export default AuthLayout;
