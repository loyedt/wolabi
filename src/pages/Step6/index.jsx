import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { fetchPillarsThunk, togglePillar } from '../../redux/slices/registrationSlice';
import logo from '../../assets/logo.png';

const Step6 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pillarsList, wellbeingPillars, loading } = useSelector((s) => s.registration);

  useEffect(() => {
    if (!pillarsList.length) dispatch(fetchPillarsThunk());
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative bg-white">
      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
        <img src={logo} alt="Woliba" className="h-8 md:h-10 object-contain" />
        <div className="flex items-center gap-2 text-sm text-[#1D3857] font-medium">
          <span>Language</span>
          <span className="flex items-center gap-1">🇺🇸 En
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#1D3857" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-4 md:px-10 py-6 max-w-5xl mx-auto w-full">
        <p className="text-[#1D3857] font-semibold text-center mb-8 text-base md:text-lg">
          Select any 3 well-being pillars goal you want to achieve
        </p>

        {loading && <p className="text-center text-gray-400">Loading pillars...</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillarsList.map((pillar) => {
            const selIdx = wellbeingPillars.indexOf(pillar.id);
            const selected = selIdx >= 0;
            const maxReached = wellbeingPillars.length >= 3 && !selected;

            return (
              <button
                key={pillar.id}
                onClick={() => !maxReached && dispatch(togglePillar(pillar.id))}
                disabled={maxReached}
                className={`flex items-start gap-3 p-4 rounded-xl border text-left transition-all ${
                  selected
                    ? 'border-[#E07070] bg-[#E07070]/5'
                    : maxReached
                    ? 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
                    : 'border-gray-200 hover:border-[#E07070] bg-white'
                }`}
              >
                <div className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 border-2 mt-0.5 ${
                  selected ? 'bg-[#E07070] border-[#E07070]' : 'border-gray-300'
                }`}>
                  {selected && (
                    <span className="text-white text-xs font-bold">{selIdx + 1}</span>
                  )}
                </div>
                <div>
                  <p className="text-[#1D3857] font-semibold text-sm">{pillar.pillar_title}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{pillar.description}</p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 mt-8 max-w-md mx-auto">
          <Button variant="back" onClick={() => navigate('/register/step5')} />
          <Button
            onClick={() => navigate('/register/step7')}
            disabled={wellbeingPillars.length !== 3}
          >
            Done
          </Button>
        </div>
      </main>

      <footer className="relative z-10 flex items-center justify-center gap-6 py-4 text-sm">
        <a href="#" className="text-[#E07070] hover:underline">Terms of Use</a>
        <a href="#" className="text-[#E07070] hover:underline">Contact Us</a>
      </footer>
    </div>
  );
};

export default Step6;
