import React from 'react';
import {
  Crown,
  Heart,
  Film,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Shield,
  HelpCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { DIRECT_MONETIZATION_LINK, handleFakeButtonClick, UI_TRANSLATIONS } from '../data/constants';

interface FooterProps {
  onOpenQueenModal: () => void;
  onOpenDownloadModal: () => void;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQueenModal,
  onOpenDownloadModal,
  onSelectTab
}) => {
  return (
    <footer id="main-footer" className="bg-[#0a0a1a] border-t border-white/10 text-[#a0a0b0] text-sm">
      {/* Top Banner Accent */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand and Historical Tribute */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="කුසුමාසන දේවි"
                className="w-10 h-10 object-contain filter drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg text-[#3b82f6] font-sinhala">
                  කුසුමාසන දේවි
                </span>
                <span className="text-[11px] text-[#a0a0b0] font-sans tracking-wider">
                  KUSUMASANA DEVI CINEMA
                </span>
              </div>
            </div>
            <p className="text-xs text-[#a0a0b0] leading-relaxed font-sinhala">
              උඩරට රාජධානියේ දෝන කැතරිනා රැජිණගේ අභිමානය පෙරදැරි කරගත්, නොමිලේ සිංහල උපසිරැසි සහ 1080p HD චිත්‍රපටි ප්‍රවාහ ජාලය.
            </p>
            <button
              id="footer-queen-history-btn"
              onClick={onOpenQueenModal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#16213e] hover:bg-[#1f2d52] border border-white/10 text-amber-300 text-xs font-semibold transition-all font-sinhala"
            >
              <Crown className="w-3.5 h-3.5 text-amber-400" />
              <span>ඓතිහාසික විස්තර කියවන්න</span>
            </button>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sinhala">
              ප්‍රධාන මෙනුව (Navigation)
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors"
                >
                  {UI_TRANSLATIONS.home} (Home)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('movies')}
                  className="hover:text-white transition-colors"
                >
                  {UI_TRANSLATIONS.movies} (Movies)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('tv')}
                  className="hover:text-white transition-colors"
                >
                  {UI_TRANSLATIONS.tvShows} (TV Shows)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('mylist')}
                  className="hover:text-white transition-colors"
                >
                  {UI_TRANSLATIONS.myList} (My Watchlist)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenDownloadModal}
                  className="text-[#3b82f6] hover:text-blue-400 font-semibold transition-colors"
                >
                  {UI_TRANSLATIONS.downloadHD} (Fast Mirror)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Disclaimer */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sinhala">
              නීතිමය සහ සේවා වගන්තිය
            </h4>
            <ul className="space-y-2 text-xs text-[#a0a0b0] leading-relaxed">
              <li className="flex items-start gap-1.5 font-sinhala">
                <Shield className="w-3.5 h-3.5 text-[#3b82f6] flex-shrink-0 mt-0.5" />
                <span>අපගේ සර්වර් වල කිසිදු වීඩියෝ ගොනුවක් සත්කාරකත්වය නොකරයි.</span>
              </li>
              <li className="flex items-start gap-1.5 font-sinhala">
                <Film className="w-3.5 h-3.5 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>සියලුම දත්ත සහ පෝස්ටර් TMDB විවෘත API මගින් ලබා ගනී.</span>
              </li>
              <li>
                <button
                  onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                  className="text-[#a0a0b0] hover:text-white underline transition-colors"
                >
                  DMCA Compliance & Takedown
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Telegram */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-sinhala">
              සමාජ මාධ්‍ය (Community)
            </h4>
            <p className="text-xs text-[#a0a0b0] font-sinhala">
              නවතම චිත්‍රපටි සහ සිංහල සබ්ටයිටල් ලබාගැනීමට අපගේ ටෙලිග්‍රෑම් නාලිකාවට එක්වන්න.
            </p>
            <div className="flex items-center gap-2.5">
              <button
                onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                className="p-2 rounded-md bg-[#16213e] hover:bg-[#1f2d52] text-[#3b82f6] border border-white/10 transition-all"
                title="Telegram Channel"
              >
                <Send className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                className="p-2 rounded-md bg-[#16213e] hover:bg-[#1f2d52] text-[#3b82f6] border border-white/10 transition-all"
                title="Facebook Group"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                className="p-2 rounded-md bg-[#16213e] hover:bg-[#1f2d52] text-[#3b82f6] border border-white/10 transition-all"
                title="Twitter X"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK)}
                className="p-2 rounded-md bg-[#16213e] hover:bg-[#1f2d52] text-[#3b82f6] border border-white/10 transition-all"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#a0a0b0]">
          <p className="font-sinhala text-center sm:text-left">
            © 2026 Vidbanda / කුසුමාසන දේවි සිනමා. සියලුම හිමිකම් ඇවිරිණි.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Powered by TMDB Public Index</span>
            <span>•</span>
            <span className="text-amber-400 flex items-center gap-1 font-sinhala">
              <Crown className="w-3 h-3 text-amber-400" />
              <span>සිරි සඟබෝ රාජ වංශය</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
