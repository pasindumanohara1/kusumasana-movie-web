import React from 'react';
import { Crown, X, Sparkles, BookOpen, Shield, HeartHandshake, History, Award } from 'lucide-react';
import { QUEEN_KUSUMASANA_DEVI_HISTORY } from '../data/constants';

interface RoyalQueenModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RoyalQueenModal: React.FC<RoyalQueenModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="queen-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#121829] border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl shadow-amber-950/50 space-y-6 relative overflow-hidden my-8"
      >
        {/* Royal Gold Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-amber-500/20">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-amber-500/40 shadow-lg shadow-amber-500/30 flex-shrink-0 bg-[#0c2340] p-1">
              <img
                src="/logo.png"
                alt={QUEEN_KUSUMASANA_DEVI_HISTORY.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-amber-300 font-sinhala">
                  {QUEEN_KUSUMASANA_DEVI_HISTORY.name}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-amber-200/80 font-medium">
                {QUEEN_KUSUMASANA_DEVI_HISTORY.title} • {QUEEN_KUSUMASANA_DEVI_HISTORY.dynasty}
              </p>
            </div>
          </div>
          <button
            id="close-queen-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tribute Quote Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 via-blue-950/30 to-amber-950/40 border border-amber-500/30 text-amber-100/90 text-sm leading-relaxed italic">
          "{QUEEN_KUSUMASANA_DEVI_HISTORY.tribute}"
        </div>

        {/* Historical Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm">
          <div className="p-3 rounded-xl bg-[#16213e]/80 border border-gray-800">
            <span className="text-amber-400 font-semibold block text-xs">රාජ්‍ය සමය (Reign):</span>
            <span className="text-gray-200 font-medium">{QUEEN_KUSUMASANA_DEVI_HISTORY.reign}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#16213e]/80 border border-gray-800">
            <span className="text-amber-400 font-semibold block text-xs">රාජවංශය (Dynasty):</span>
            <span className="text-gray-200 font-medium">{QUEEN_KUSUMASANA_DEVI_HISTORY.dynasty}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#16213e]/80 border border-gray-800">
            <span className="text-amber-400 font-semibold block text-xs">පියා (Father):</span>
            <span className="text-gray-200 font-medium">{QUEEN_KUSUMASANA_DEVI_HISTORY.father}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#16213e]/80 border border-gray-800">
            <span className="text-amber-400 font-semibold block text-xs">මව (Mother):</span>
            <span className="text-gray-200 font-medium">{QUEEN_KUSUMASANA_DEVI_HISTORY.mother}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#16213e]/80 border border-gray-800 sm:col-span-2">
            <span className="text-amber-400 font-semibold block text-xs">වල්ලභයා (Royal Spouses):</span>
            <span className="text-gray-200 font-medium">{QUEEN_KUSUMASANA_DEVI_HISTORY.spouse}</span>
          </div>

          <div className="p-3 rounded-xl bg-[#16213e]/80 border border-gray-800 sm:col-span-2">
            <span className="text-amber-400 font-semibold block text-xs">භූමදානය (Burial):</span>
            <span className="text-gray-200 font-medium">{QUEEN_KUSUMASANA_DEVI_HISTORY.burial}</span>
          </div>
        </div>

        {/* Children Lineage */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            <span>රාජකීය දරුවන් (Royal Children):</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {QUEEN_KUSUMASANA_DEVI_HISTORY.children.map((child, i) => (
              <div
                key={i}
                className="px-3 py-1.5 rounded-lg bg-[#0a0a1a] text-xs text-gray-300 border border-gray-800 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{child}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Historical Narrative */}
        <div className="p-4 rounded-2xl bg-[#0a0a1a] border border-gray-800 text-xs text-gray-300 leading-relaxed space-y-2">
          <div className="font-bold text-amber-300 flex items-center gap-1.5">
            <History className="w-4 h-4" />
            <span>ඓතිහාසික පසුබිම (Historical Background):</span>
          </div>
          <p>{QUEEN_KUSUMASANA_DEVI_HISTORY.historySummary}</p>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-gray-950 font-bold text-xs sm:text-sm transition-all shadow-md shadow-amber-600/30"
          >
            වසන්න (Close Tribute)
          </button>
        </div>
      </div>
    </div>
  );
};
