import React, { useState } from 'react';
import {
  Download,
  X,
  HardDrive,
  FileArchive,
  FileText,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Lock,
  Sparkles
} from 'lucide-react';
import { DIRECT_MONETIZATION_LINK, handleFakeButtonClick } from '../data/constants';

interface DownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  mediaTitle?: string;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({
  isOpen,
  onClose,
  mediaTitle = 'කුසුමාසන දේවි Cinema Feature'
}) => {
  const [selectedQuality, setSelectedQuality] = useState('1080p');

  if (!isOpen) return null;

  const downloadOptions = [
    {
      id: 'opt-4k',
      quality: '4K Ultra HD (2160p)',
      size: '4.2 GB',
      format: 'MKV • H.265 • Dolby 5.1',
      badge: 'Best Quality',
      color: 'border-amber-500/50 bg-amber-500/10'
    },
    {
      id: 'opt-1080p',
      quality: '1080p Full HD',
      size: '1.8 GB',
      format: 'MP4 • H.264 • AAC Stereo',
      badge: 'Recommended',
      color: 'border-blue-500/50 bg-blue-500/10'
    },
    {
      id: 'opt-720p',
      quality: '720p Standard HD',
      size: '950 MB',
      format: 'MP4 • Fast Mobile Download',
      badge: 'Data Saver',
      color: 'border-gray-700 bg-gray-800/40'
    }
  ];

  return (
    <div
      id="download-modal-backdrop"
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#16213e] border border-blue-500/30 rounded-3xl max-w-xl w-full p-6 shadow-2xl shadow-blue-900/40 space-y-6 relative overflow-hidden"
      >
        {/* Glow Header Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-blue-500 to-amber-500" />

        {/* Modal Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400">
              <Download className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-sinhala">
                HD වීඩියෝ ඩවුන්ලෝඩ් (Download HD)
              </h3>
              <p className="text-xs text-gray-300 font-medium truncate max-w-xs sm:max-w-md">
                {mediaTitle}
              </p>
            </div>
          </div>
          <button
            id="close-download-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quality Options */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-blue-400 uppercase tracking-wider block">
            ගුණාත්මකභාවය තෝරන්න (Select Quality):
          </label>
          <div className="grid grid-cols-1 gap-2.5">
            {downloadOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelectedQuality(opt.quality)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedQuality === opt.quality
                    ? 'border-blue-500 bg-blue-600/20 ring-1 ring-blue-500'
                    : `${opt.color} hover:border-gray-500`
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      selectedQuality === opt.quality
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-500'
                    }`}
                  >
                    {selectedQuality === opt.quality && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{opt.quality}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-900/80 text-gray-300 font-semibold border border-gray-700">
                        {opt.badge}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400">{opt.format}</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/30">
                  {opt.size}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Primary Direct Download CTA Button */}
        <button
          id="modal-primary-download-btn"
          onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-blue-600 hover:from-emerald-500 hover:to-blue-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-900/40 transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5 fill-current" />
          <span>{selectedQuality} අධිවේගී ඩවුන්ලෝඩ් ආරම්භ කරන්න</span>
        </button>

        {/* Secondary Alternative High-CTR Mirrors */}
        <div className="pt-2 border-t border-gray-800 space-y-2">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block">
            වෙනත් බාගත කිරීමේ ක්‍රම (Alternative Mirrors):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="p-2.5 rounded-xl bg-[#0a0a1a] hover:bg-gray-800 border border-gray-700 text-xs font-semibold text-blue-300 transition-all flex items-center justify-center gap-2"
            >
              <HardDrive className="w-4 h-4 text-blue-400" />
              <span>Google Drive Direct</span>
            </button>

            <button
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="p-2.5 rounded-xl bg-[#0a0a1a] hover:bg-gray-800 border border-gray-700 text-xs font-semibold text-teal-300 transition-all flex items-center justify-center gap-2"
            >
              <FileArchive className="w-4 h-4 text-teal-400" />
              <span>Torrent (.torrent)</span>
            </button>

            <button
              onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
              className="p-2.5 rounded-xl bg-[#0a0a1a] hover:bg-gray-800 border border-gray-700 text-xs font-semibold text-amber-300 transition-all flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4 text-amber-400" />
              <span>Sinhala Sub (.SRT)</span>
            </button>
          </div>
        </div>

        {/* Security / Safe note */}
        <div className="flex items-center justify-center gap-2 text-[11px] text-gray-400 pt-1">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>වයිරස් රහිත සහ ආරක්ෂිත අධිවේගී බාගත කිරීම් තහවුරු කර ඇත.</span>
        </div>
      </div>
    </div>
  );
};
