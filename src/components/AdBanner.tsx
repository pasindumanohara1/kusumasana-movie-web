import React from 'react';
import { Sparkles, Download, Zap, Film, ExternalLink } from 'lucide-react';
import { DIRECT_MONETIZATION_LINK, handleFakeButtonClick } from '../data/constants';

interface AdBannerProps {
  type?: 'banner' | 'native' | 'compact';
  slotName?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type = 'banner', slotName = 'Premium Mirror' }) => {
  if (type === 'compact') {
    return (
      <div
        id={`ad-compact-${slotName.replace(/\s+/g, '-').toLowerCase()}`}
        onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
        className="w-full my-4 p-3 rounded-xl bg-gradient-to-r from-blue-950/80 via-[#16213e] to-indigo-950/80 border border-blue-500/30 cursor-pointer hover:border-blue-400 transition-all flex items-center justify-between gap-3 shadow-md group"
      >
        <div className="flex items-center gap-2.5">
          <span className="p-1.5 rounded-lg bg-blue-600/30 text-blue-400">
            <Zap className="w-4 h-4" />
          </span>
          <div>
            <div className="text-xs font-bold text-white group-hover:text-blue-300">
              Direct High-Speed 4K Cloud Streaming Node
            </div>
            <div className="text-[10px] text-gray-400">
              No registration • 60 FPS • Full Sinhala Subtitles
            </div>
          </div>
        </div>
        <span className="px-3 py-1 rounded-lg bg-emerald-600 group-hover:bg-emerald-500 text-white text-xs font-bold shadow flex-shrink-0 flex items-center gap-1">
          <Download className="w-3 h-3" />
          <span>Stream HD</span>
        </span>
      </div>
    );
  }

  if (type === 'native') {
    return (
      <div
        id={`ad-native-${slotName.replace(/\s+/g, '-').toLowerCase()}`}
        onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
        className="w-full my-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#16213e] via-[#0f3460]/70 to-[#16213e] border border-blue-500/30 cursor-pointer hover:border-amber-400/50 shadow-xl transition-all group overflow-hidden relative"
      >
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-600 flex items-center justify-center text-gray-950 shadow-lg flex-shrink-0">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  SPONSORED MIRROR
                </span>
                <span className="text-xs text-emerald-400 font-bold">100% Free VIP Access</span>
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-white group-hover:text-amber-300 transition-colors mt-1 font-sinhala">
                අධිවේගී Sinhala Subtitles සහිත 1080p චිත්‍රපටි එකතුව
              </h3>
              <p className="text-xs text-gray-300">
                බාධාවකින් තොරව සියලුම ටීවී ෂෝ සහ චිත්‍රපටි දැන්ම නරඹන්න (Fast VIP Server 1)
              </p>
            </div>
          </div>

          <button className="px-6 py-2.5 rounded-xl bg-blue-600 group-hover:bg-blue-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-blue-600/40 flex items-center gap-2 flex-shrink-0 transition-all group-hover:scale-105">
            <Download className="w-4 h-4" />
            <span>දැන් බලන්න (Watch Free)</span>
          </button>
        </div>
      </div>
    );
  }

  // Standard responsive banner
  return (
    <div
      id={`ad-banner-${slotName.replace(/\s+/g, '-').toLowerCase()}`}
      onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
      className="w-full my-6 p-4 rounded-2xl bg-[#16213e] border border-blue-900/40 cursor-pointer hover:border-blue-500/40 transition-all shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 group"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-emerald-600/20 text-emerald-400 flex-shrink-0">
          <Film className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-white group-hover:text-blue-300">
              Download 1080p BluRay & 4K Sinhala Films
            </h4>
            <span className="text-[10px] bg-red-600 text-white font-bold px-1.5 rounded">HOT</span>
          </div>
          <p className="text-xs text-gray-400">
            Google Drive & Torrent Mirrors With SRT Sinhala Subtitles Available
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-shrink-0">
        <span className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 group-hover:from-emerald-500 group-hover:to-teal-400 text-white font-bold text-xs shadow flex items-center gap-1.5 transition-all">
          <Download className="w-3.5 h-3.5" />
          <span>HD ඩවුන්ලෝඩ්</span>
        </span>
      </div>
    </div>
  );
};
