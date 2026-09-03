import React, { useState } from 'react';
import {
  Download,
  Zap,
  Subtitles,
  Film,
  Volume2,
  FastForward,
  Crown,
  FileArchive,
  Sliders,
  HardDrive,
  ShieldAlert,
  FileText,
  Wrench,
  Maximize2,
  X,
  RotateCcw,
  Unlock,
  Smartphone,
  Headphones,
  SkipForward,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { FAKE_BUTTONS_20, DIRECT_MONETIZATION_LINK, handleFakeButtonClick } from '../data/constants';

interface FakeButtonsBarProps {
  onOpenDownloadModal: () => void;
}

export const FakeButtonsBar: React.FC<FakeButtonsBarProps> = ({ onOpenDownloadModal }) => {
  const [expanded, setExpanded] = useState(false);

  // Icon mapping
  const renderIcon = (name: string) => {
    switch (name) {
      case 'Download': return <Download className="w-3.5 h-3.5" />;
      case 'Zap': return <Zap className="w-3.5 h-3.5" />;
      case 'Subtitles': return <Subtitles className="w-3.5 h-3.5" />;
      case 'Film': return <Film className="w-3.5 h-3.5" />;
      case 'Volume2': return <Volume2 className="w-3.5 h-3.5" />;
      case 'FastForward': return <FastForward className="w-3.5 h-3.5" />;
      case 'Crown': return <Crown className="w-3.5 h-3.5" />;
      case 'FileArchive': return <FileArchive className="w-3.5 h-3.5" />;
      case 'Sliders': return <Sliders className="w-3.5 h-3.5" />;
      case 'HardDrive': return <HardDrive className="w-3.5 h-3.5" />;
      case 'ShieldAlert': return <ShieldAlert className="w-3.5 h-3.5" />;
      case 'FileText': return <FileText className="w-3.5 h-3.5" />;
      case 'Wrench': return <Wrench className="w-3.5 h-3.5" />;
      case 'Maximize2': return <Maximize2 className="w-3.5 h-3.5" />;
      case 'X': return <X className="w-3.5 h-3.5" />;
      case 'RotateCcw': return <RotateCcw className="w-3.5 h-3.5" />;
      case 'Unlock': return <Unlock className="w-3.5 h-3.5" />;
      case 'Smartphone': return <Smartphone className="w-3.5 h-3.5" />;
      case 'Headphones': return <Headphones className="w-3.5 h-3.5" />;
      case 'SkipForward': return <SkipForward className="w-3.5 h-3.5" />;
      default: return <Sparkles className="w-3.5 h-3.5" />;
    }
  };

  const displayedButtons = expanded ? FAKE_BUTTONS_20 : FAKE_BUTTONS_20.slice(0, 8);

  return (
    <div id="high-ctr-buttons-hub" className="bg-[#16213e]/80 border border-blue-900/40 rounded-2xl p-4 sm:p-5 my-8 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
            <Sparkles className="w-4 h-4" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-white font-sinhala">
              අධිවේගී ඉක්මන් මෙවලම් (High-Speed Direct Actions)
            </h3>
            <p className="text-[11px] text-gray-400">
              HD Downloads, Subtitles, Fast Servers & VIP Mirrors
            </p>
          </div>
        </div>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          <span>{expanded ? 'අඩු කරන්න' : 'සියලුම බොත්තම් 20 (View 20 Ideas)'}</span>
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Grid of the 20 High-CTR fake buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {displayedButtons.map((btn) => (
          <button
            key={btn.id}
            id={`btn-idea-${btn.id}`}
            onClick={(e) => {
              if (btn.id === 'download-1080p') {
                onOpenDownloadModal();
              } else {
                handleFakeButtonClick(e, DIRECT_MONETIZATION_LINK);
              }
            }}
            className={`p-2.5 rounded-xl border text-left flex items-start gap-2.5 transition-all transform hover:-translate-y-0.5 hover:shadow-lg ${
              btn.colorClass || 'bg-[#0a0a1a] hover:bg-[#0f3460] text-gray-200 border-gray-800'
            }`}
          >
            <div className="p-1.5 rounded-lg bg-black/30 flex-shrink-0 mt-0.5">
              {renderIcon(btn.iconName)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-bold truncate block">{btn.sinhalaTitle}</span>
              </div>
              <span className="text-[10px] text-white/80 line-clamp-1">{btn.title}</span>
              {btn.badge && (
                <span className="inline-block text-[9px] px-1.5 py-0.2 rounded mt-1 bg-black/40 font-semibold">
                  {btn.badge}
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
