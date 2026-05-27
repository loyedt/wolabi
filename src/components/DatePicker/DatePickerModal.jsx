import { useState, useEffect } from 'react';
import Button from '../ui/Button';

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAYS = ['Mo','Tu','We','Th','Fr','Sa','Su'];

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getFirstDayOfMonth = (year, month) => {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1;
};

const DatePickerModal = ({ value, onChange, onClose }) => {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(value ? new Date(value).getMonth() : today.getMonth());
  const [viewYear, setViewYear] = useState(value ? new Date(value).getFullYear() : today.getFullYear());
  const [selected, setSelected] = useState(value || null);
  const [showYears, setShowYears] = useState(false);
  const [showMonths, setShowMonths] = useState(false);

  const years = Array.from({ length: 100 }, (_, i) => today.getFullYear() - i);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const handleDayClick = (day) => {
    if (!day) return;
    const month = String(viewMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    setSelected(`${viewYear}-${month}-${dayStr}`);
  };

  const isSelected = (day) => {
    if (!day || !selected) return false;
    const [y, m, d] = selected.split('-').map(Number);
    return y === viewYear && m === viewMonth + 1 && d === day;
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <h3 className="text-center font-semibold text-[#1D3857] mb-4">Select date</h3>

        <div className="flex gap-4 mb-4 relative">
          <button
            className="flex items-center gap-1 text-sm font-medium text-[#1D3857] hover:text-[#E07070]"
            onClick={() => { setShowMonths(!showMonths); setShowYears(false); }}
          >
            {MONTHS[viewMonth]}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
          <button
            className="flex items-center gap-1 text-sm font-medium text-[#1D3857] hover:text-[#E07070]"
            onClick={() => { setShowYears(!showYears); setShowMonths(false); }}
          >
            {viewYear}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>

          {showMonths && (
            <div className="absolute top-8 left-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto w-36">
              {MONTHS.map((m, i) => (
                <button key={m} onClick={() => { setViewMonth(i); setShowMonths(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#E07070]/10 ${viewMonth === i ? 'bg-[#E07070] text-white' : ''}`}>
                  {m}
                </button>
              ))}
            </div>
          )}

          {showYears && (
            <div className="absolute top-8 left-20 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto w-24">
              {years.map((y) => (
                <button key={y} onClick={() => { setViewYear(y); setShowYears(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-[#E07070]/10 ${viewYear === y ? 'bg-[#E07070] text-white' : ''}`}>
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map(d => (
            <div key={d} className="text-center text-xs font-medium text-gray-400 py-1">{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 mb-4">
          {cells.map((day, idx) => (
            <button
              key={idx}
              onClick={() => handleDayClick(day)}
              disabled={!day}
              className={`h-8 w-full rounded-full text-sm transition-colors
                ${!day ? '' : isSelected(day)
                  ? 'bg-[#E07070] text-white font-semibold'
                  : 'hover:bg-[#E07070]/10 text-[#1D3857]'}
              `}
            >
              {day}
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 border border-gray-200 rounded-full py-2 text-sm text-gray-500 hover:bg-gray-50">
            Cancel
          </button>
          <button
            onClick={() => { onChange(selected); onClose(); }}
            disabled={!selected}
            className="flex-1 bg-[#E07070] text-white rounded-full py-2 text-sm font-semibold hover:bg-[#C85E5E] disabled:opacity-50"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerModal;
