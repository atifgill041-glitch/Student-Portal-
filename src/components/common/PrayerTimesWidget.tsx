import React, { useState } from 'react';
import { Clock, X, Volume2, VolumeX, Moon, Sun, Sparkles } from 'lucide-react';
import { DAILY_HADITH_LIST } from '../../data/initialData';

interface PrayerTimesWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrayerTimesWidget: React.FC<PrayerTimesWidgetProps> = ({
  isOpen,
  onClose
}) => {
  const [playingAudio, setPlayingAudio] = useState(false);
  const [hadithIdx, setHadithIdx] = useState(0);

  if (!isOpen) return null;

  const prayerTimes = [
    { name: 'Fajr (الفجر)', time: '04:15 AM', active: false },
    { name: 'Sunrise (الشروق)', time: '05:45 AM', active: false },
    { name: 'Dhuhr (الظهر)', time: '01:10 PM', active: false },
    { name: 'Asr (العصر)', time: '04:50 PM', active: true, next: true },
    { name: 'Maghrib (المغرب)', time: '07:25 PM', active: false },
    { name: 'Isha (العشاء)', time: '08:55 PM', active: false },
  ];

  const currentHadith = DAILY_HADITH_LIST[hadithIdx];

  const toggleAudio = () => {
    setPlayingAudio(!playingAudio);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 border border-emerald-200 dark:border-emerald-800/60 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-950 p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-emerald-200 hover:text-white p-1 rounded-full bg-emerald-800/60 hover:bg-emerald-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-2xl bg-amber-400 text-emerald-950 font-bold flex items-center justify-center shadow">
              🕌
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif">Islamic Prayer Schedule</h3>
              <p className="text-xs text-amber-300 font-medium">
                Safard 14, 1448 AH • Saturday, 01 August 2026
              </p>
            </div>
          </div>

          <div className="mt-3 bg-emerald-950/60 rounded-xl p-3 border border-emerald-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
              <span className="text-xs font-semibold text-emerald-100">Next Prayer: Asr in 01h 45m</span>
            </div>
            <button
              onClick={toggleAudio}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                playingAudio ? 'bg-amber-400 text-emerald-950' : 'bg-emerald-800 text-amber-300 hover:bg-emerald-700'
              }`}
            >
              {playingAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{playingAudio ? 'Reciting Adhan' : 'Play Adhan'}</span>
            </button>
          </div>
        </div>

        {/* Schedule Grid */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {prayerTimes.map((p, i) => (
              <div
                key={i}
                className={`p-3 rounded-2xl border text-center transition ${
                  p.next
                    ? 'bg-amber-500/10 border-amber-400 dark:bg-amber-900/20 text-amber-900 dark:text-amber-200 shadow-sm'
                    : 'bg-emerald-50/50 dark:bg-gray-800/50 border-emerald-100 dark:border-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <p className="text-xs font-bold font-serif mb-1">{p.name}</p>
                <p className="text-sm font-extrabold text-emerald-800 dark:text-emerald-400 font-mono">
                  {p.time}
                </p>
                {p.next && (
                  <span className="inline-block mt-1 bg-amber-400 text-emerald-950 text-[9px] font-extrabold px-2 py-0.5 rounded-full uppercase">
                    Upcoming
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Hadith / Ayah of the day card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-amber-50 dark:from-gray-800 dark:to-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40 relative">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                📖 Hadith of the Day
              </span>
              <button
                onClick={() => setHadithIdx((prev) => (prev + 1) % DAILY_HADITH_LIST.length)}
                className="text-xs text-emerald-700 hover:underline font-medium"
              >
                Next Hadith →
              </button>
            </div>
            <p className="text-right text-base font-serif font-bold text-emerald-950 dark:text-emerald-200 leading-relaxed mb-2">
              "{currentHadith.arabic}"
            </p>
            <p className="text-xs text-gray-700 dark:text-gray-300 italic mb-1">
              "{currentHadith.translation}"
            </p>
            <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono text-right">
              — {currentHadith.reference}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 dark:bg-gray-800/60 px-6 py-3 border-t border-gray-100 dark:border-gray-800 flex justify-between items-center text-xs text-gray-500">
          <span>Faizan-e-Ilm Prayer Calculation Engine</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-emerald-800 text-white rounded-xl text-xs font-bold hover:bg-emerald-900 transition shadow-sm"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
