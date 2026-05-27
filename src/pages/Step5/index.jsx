import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { fetchInterestsThunk, toggleInterest } from '../../redux/slices/registrationSlice';
import { CLOUDFRONT_BASE } from '../../api';
import logo from '../../assets/logo.png';

const ChevronDown = ({ open }) => (
  <svg
    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E07070" strokeWidth="2"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path d="M6 9l6 6 6-6"/>
  </svg>
);

const Step5 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { interestsList, areasOfInterest, loading } = useSelector((s) => s.registration);
  const [openCategories, setOpenCategories] = useState({});

  useEffect(() => {
    if (!interestsList.length) dispatch(fetchInterestsThunk());
  }, []);

  const grouped = interestsList.reduce((acc, item) => {
    const type = item.interest_type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(item);
    return acc;
  }, {});

  const toggleCategory = (cat) =>
    setOpenCategories((prev) => ({ ...prev, [cat]: !prev[cat] }));

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: '#fff' }}>
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-br from-pink-100 to-white" />

      <header className="relative z-10 flex items-center justify-between px-6 py-4 md:px-10">
        <img src={logo} alt="Woliba" className="h-8 md:h-10 object-contain" />
        <div className="flex items-center gap-2 text-sm text-[#1D3857] font-medium">
          <span>Language</span>
          <span className="flex items-center gap-1">🇺🇸 En
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#1D3857" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </span>
        </div>
      </header>

      <main className="relative z-10 flex-1 px-4 md:px-10 py-6 max-w-4xl mx-auto w-full">
        <p className="text-[#1D3857] font-semibold text-center mb-6 text-base md:text-lg">
          Select all wellness interests that apply — at least one is required.
        </p>

        {loading && <p className="text-center text-gray-400">Loading interests...</p>}

        <div className="flex flex-col gap-1">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="border-b border-gray-100">
              <button
                className="w-full flex items-center justify-between py-4 text-left"
                onClick={() => toggleCategory(category)}
              >
                <span className="text-[#1D3857] font-medium text-sm">{category}</span>
                <ChevronDown open={!!openCategories[category]} />
              </button>

              {openCategories[category] && (
                <div className="flex flex-wrap gap-2 pb-4">
                  {items.map((item) => {
                    const selected = areasOfInterest.includes(item.id);
                    return (
                      <button
                        key={item.id}
                        onClick={() => dispatch(toggleInterest(item.id))}
                        className={`flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-all ${
                          selected
                            ? 'bg-[#E07070] border-[#E07070] text-white'
                            : 'bg-white border-gray-200 text-[#1D3857] hover:border-[#E07070]'
                        }`}
                      >
                        <img
                          src={`${CLOUDFRONT_BASE}/${item.interest_icon}`}
                          alt={item.name}
                          className={`w-5 h-5 object-contain ${selected ? 'brightness-0 invert' : ''}`}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-8 max-w-md mx-auto">
          <Button variant="back" onClick={() => navigate('/register/step4')} />
          <Button
            onClick={() => navigate('/register/step6')}
            disabled={areasOfInterest.length === 0}
          >
            Next
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

export default Step5;
