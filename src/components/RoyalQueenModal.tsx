import React from 'react';
import {
  X,
  Sparkles,
  Film,
  Zap,
  Globe,
  Subtitles,
  ShieldCheck,
  Download,
  Tv,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import {
  SINHALASUB_PLATFORM_INFO,
  DIRECT_MONETIZATION_LINK,
  handleFakeButtonClick,
  WEBSITE_DOMAIN,
  WEBSITE_FULL_URL
} from '../data/constants';
import { AdsterraBanner } from './AdsterraBanner';

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
        className="bg-[#0b0c12] border border-red-500/30 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl shadow-red-950/40 space-y-6 relative overflow-hidden my-8"
      >
        {/* Red Cinema Top Bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600" />

        {/* Modal Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3.5">
            <div className="relative h-12 rounded-xl overflow-hidden border border-red-500/30 shadow-lg shadow-red-600/20 flex-shrink-0 bg-black/60 px-3 py-1 flex items-center justify-center">
              <img
                src="/icon-1.png"
                alt="sinhalasub.lk"
                className="h-9 w-auto object-contain filter drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight">
                  sinhalasub<span className="text-red-500">.lk</span>
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-600/20 text-red-400 border border-red-500/30 font-mono">
                  OFFICIAL
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 font-sinhala">
                {SINHALASUB_PLATFORM_INFO.title}
              </p>
            </div>
          </div>
          <button
            id="close-queen-modal-btn"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Official Domain Pill Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-red-950/40 via-black to-red-950/40 border border-red-500/30 flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-red-400 flex-shrink-0" />
            <div className="text-xs">
              <span className="text-gray-400">නිල වෙබ් ලිපිනය (Official Portal): </span>
              <strong className="text-white font-mono font-bold tracking-wide">
                {WEBSITE_DOMAIN}
              </strong>
            </div>
          </div>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3 h-3" />
            100% Verified
          </span>
        </div>

        {/* Platform Description */}
        <p className="text-xs sm:text-sm text-gray-300 leading-relaxed font-sinhala">
          {SINHALASUB_PLATFORM_INFO.description}
        </p>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {SINHALASUB_PLATFORM_INFO.features.map((feat) => (
            <div
              key={feat.id}
              className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-red-500/30 transition-all space-y-1"
            >
              <div className="flex items-center gap-2 font-bold text-white font-sinhala">
                <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
                <span>{feat.title}</span>
              </div>
              <p className="text-gray-400 text-[11px] leading-relaxed font-sinhala">
                {feat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Subtitles & Streaming Quick Guide */}
        <div className="space-y-2">
          <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5 font-sinhala">
            <Subtitles className="w-3.5 h-3.5" />
            <span>සිංහල උපසිරැසි සහ නැරඹුම් උපදෙස් (Quick Guide):</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sinhala">
            <div className="p-2.5 rounded-lg bg-black/40 text-gray-300 border border-white/5 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
              <span>වීඩියෝ ප්ලේයරයේ CC බටන් එකෙන් සිංහල සබ්ටයිටල් තෝරාගන්න.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 text-gray-300 border border-white/5 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
              <span>වීඩියෝව වාදනය නොවන්නේ නම් පහළ ඇති Server 1 - 14 මාරු කරන්න.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 text-gray-300 border border-white/5 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
              <span>Full HD 1080p ගුණාත්මකත්වයෙන් ඩවුන්ලෝඩ් කිරීමට HD බටන් එක ක්ලික් කරන්න.</span>
            </div>
            <div className="p-2.5 rounded-lg bg-black/40 text-gray-300 border border-white/5 flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
              <span>නවතම චිත්‍රපටි ඉල්ලීම් සඳහා අපගේ Telegram නාලිකාව හා එක්වන්න.</span>
            </div>
          </div>
        </div>

        {/* High CTR VIP Sponsor Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/30 to-black border border-red-500/30 text-center space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-red-400 font-sinhala flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>sinhalasub.lk Ultra VIP Cloud Partner</span>
            </span>
            <span className="text-[10px] text-gray-400 font-mono">Adsterra High-Speed</span>
          </div>
          <div className="flex justify-center">
            <AdsterraBanner format="300x250" label="VIP Cinema Node" />
          </div>
          <button
            onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
            className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/30"
          >
            <Zap className="w-3.5 h-3.5 text-amber-300" />
            <span>නොමිලේ 4K Ultra VIP සේවාදායකය සක්‍රිය කරන්න</span>
          </button>
        </div>

        {/* Close Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm transition-all"
          >
            වසන්න (Close)
          </button>
        </div>
      </div>
    </div>
  );
};
