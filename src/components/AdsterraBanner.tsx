import React, { useEffect, useRef } from 'react';

export type AdsterraFormat = '728x90' | '300x250' | '468x60' | '160x600' | '160x300' | '320x50';

export interface AdsterraConfig {
  key: string;
  width: number;
  height: number;
}

export const ADSTERRA_CONFIGS: Record<AdsterraFormat, AdsterraConfig> = {
  '728x90': {
    key: '689067d26026dfb407ed305bc1fe8d20',
    width: 728,
    height: 90
  },
  '300x250': {
    key: '2fc5cdce4b9c6b8913384160ab8a0265',
    width: 300,
    height: 250
  },
  '468x60': {
    key: '37b8538e9ec7e5f2099d1339f5768e42',
    width: 468,
    height: 60
  },
  '160x600': {
    key: 'bca46da89c48d1dda5a5903aeb1e8300',
    width: 160,
    height: 600
  },
  '160x300': {
    key: '584140379b93e7158e755adaa641bee2',
    width: 160,
    height: 300
  },
  '320x50': {
    key: 'f2baccfc55fd12b2e0e52e277f0d2507',
    width: 320,
    height: 50
  }
};

interface AdsterraBannerProps {
  format: AdsterraFormat;
  className?: string;
  label?: string;
  showLabel?: boolean;
}

/**
 * Cleanly renders an Adsterra iframe banner inside an isolated sandbox
 * to prevent React DOM conflicts and document.write overwrites.
 */
export const AdsterraBanner: React.FC<AdsterraBannerProps> = ({
  format,
  className = '',
  label = 'අනුග්‍රාහක දැන්වීම (Sponsored)',
  showLabel = true
}) => {
  const config = ADSTERRA_CONFIGS[format];
  if (!config) return null;

  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 100%;
      height: 100%;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key': '${config.key}',
      'format': 'iframe',
      'height': ${config.height},
      'width': ${config.width},
      'params': {}
    };
  </script>
  <script type="text/javascript" src="https://www.highrevenueformat.com/${config.key}/invoke.js"></script>
</body>
</html>`;

  return (
    <div
      className={`flex flex-col items-center justify-center p-2 rounded-2xl bg-[#0c1322]/80 border border-blue-900/30 shadow-lg ${className}`}
    >
      {showLabel && (
        <div className="w-full flex items-center justify-between pb-1.5 px-2 text-[10px] text-gray-400 font-mono">
          <span className="uppercase tracking-wider">{label}</span>
          <span className="text-gray-500 font-sans text-[9px] bg-blue-950/60 px-1.5 py-0.5 rounded border border-blue-800/40">
            {format}
          </span>
        </div>
      )}
      <div
        style={{ width: `${config.width}px`, height: `${config.height}px`, maxWidth: '100%' }}
        className="overflow-hidden flex items-center justify-center bg-black/30 rounded-xl"
      >
        <iframe
          srcDoc={htmlContent}
          width={config.width}
          height={config.height}
          title={`ad-${format}`}
          scrolling="no"
          style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }}
        />
      </div>
    </div>
  );
};

/**
 * Dual responsive banner:
 * Shows 728x90 on tablet & desktop (md+),
 * Shows 320x50 on mobile screens (<md)
 * This guarantees pristine layout across all device widths!
 */
export const AdsterraResponsiveLeaderboard: React.FC<{ className?: string; label?: string }> = ({
  className = '',
  label = 'අනුග්‍රාහක දැන්වීම (Sponsored Ad)'
}) => {
  return (
    <div className={`w-full flex flex-col items-center justify-center my-4 ${className}`}>
      {/* Desktop & Tablet: 728x90 */}
      <div className="hidden md:block w-full max-w-[760px] mx-auto">
        <AdsterraBanner format="728x90" label={label} />
      </div>
      {/* Mobile: 320x50 */}
      <div className="block md:hidden w-full max-w-[340px] mx-auto">
        <AdsterraBanner format="320x50" label={label} />
      </div>
    </div>
  );
};

/**
 * Adsterra Native Banner
 * Script: pl31171024.profitableratecpmnetwork.com/e1d0bcea5895dc833091cf593361d349/invoke.js
 * Container: container-e1d0bcea5895dc833091cf593361d349
 */
export const AdsterraNativeBanner: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avoid double-injecting if already present
    if (!containerRef.current) return;
    const containerId = 'container-e1d0bcea5895dc833091cf593361d349';

    // Clear previous scripts if re-mounted
    const existingContainer = document.getElementById(containerId);
    if (!existingContainer && containerRef.current) {
      const div = document.createElement('div');
      div.id = containerId;
      containerRef.current.appendChild(div);

      const script = document.createElement('script');
      script.async = true;
      script.dataset.cfasync = 'false';
      script.src = 'https://pl31171024.profitableratecpmnetwork.com/e1d0bcea5895dc833091cf593361d349/invoke.js';
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className={`w-full my-6 p-4 rounded-2xl bg-gradient-to-r from-[#0c1424] via-[#111e38] to-[#0c1424] border border-blue-500/20 shadow-xl overflow-hidden ${className}`}>
      <div className="flex items-center justify-between pb-3 border-b border-gray-800/80 mb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-bold text-gray-200 font-sinhala">
            අනුග්‍රාහක නිර්දේශ (Sponsored Recommendations)
          </span>
        </div>
        <span className="text-[10px] text-gray-500 uppercase font-mono">Native Ad</span>
      </div>
      <div ref={containerRef} className="min-h-[100px] w-full flex justify-center items-center overflow-hidden">
        {/* Adsterra script injects native banner here */}
      </div>
    </div>
  );
};

/**
 * Mobile Sticky Bottom Anchor Ad (320x50)
 * Sits unobtrusively at the bottom on mobile devices (<md)
 * Includes a clean minimize / close button for user comfort
 */
export const MobileStickyAdBanner: React.FC = () => {
  const [isDismissed, setIsDismissed] = React.useState(false);

  if (isDismissed) return null;

  return (
    <aside
      aria-label="Sponsored Mobile Advertisement"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-t border-blue-500/30 flex flex-col items-center justify-center py-1.5 px-2 shadow-2xl shadow-black"
    >
      <div className="w-full max-w-[340px] flex items-center justify-between px-2 pb-1 text-[9px] text-gray-400 font-mono">
        <span className="flex items-center gap-1 text-amber-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          අනුග්‍රාහක අන්තර්ගතය (SPONSORED)
        </span>
        <button
          onClick={() => setIsDismissed(true)}
          className="text-gray-400 hover:text-white px-1 py-0.5 rounded bg-white/5 text-[9px] border border-white/10"
          title="දැන්වීම සඟවන්න (Dismiss)"
        >
          ✕ සඟවන්න
        </button>
      </div>
      <div className="flex items-center justify-center">
        <AdsterraBanner format="320x50" showLabel={false} className="p-0 border-0 bg-transparent shadow-none" />
      </div>
    </aside>
  );
};

/**
 * Desktop Widescreen Gutters (160x600 Skyscrapers)
 * Utilizes dead margins on screens wider than 1536px (2xl)
 * Never overlaps or interferes with centered video player or content
 */
export const DesktopSkyscraperGutters: React.FC = () => {
  return (
    <>
      {/* Left Gutter */}
      <aside
        aria-label="Sponsored Skyscraper Left"
        className="hidden 2xl:flex flex-col items-center fixed top-24 left-2 3xl:left-6 z-20 pointer-events-auto"
      >
        <div className="p-1 rounded-2xl bg-[#090e1a]/90 backdrop-blur-sm border border-blue-900/40 shadow-2xl">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-mono text-center pb-1">
            Sponsored
          </div>
          <AdsterraBanner format="160x600" showLabel={false} className="p-0 border-0 bg-transparent shadow-none" />
        </div>
      </aside>

      {/* Right Gutter */}
      <aside
        aria-label="Sponsored Skyscraper Right"
        className="hidden 2xl:flex flex-col items-center fixed top-24 right-2 3xl:right-6 z-20 pointer-events-auto"
      >
        <div className="p-1 rounded-2xl bg-[#090e1a]/90 backdrop-blur-sm border border-blue-900/40 shadow-2xl">
          <div className="text-[9px] text-gray-400 uppercase tracking-wider font-mono text-center pb-1">
            Sponsored
          </div>
          <AdsterraBanner format="160x600" showLabel={false} className="p-0 border-0 bg-transparent shadow-none" />
        </div>
      </aside>
    </>
  );
};

/**
 * Native-style Sponsored Movie Card
 * Seamlessly fits into MediaCard 2:3 poster grids
 */
export const SponsoredMovieCard: React.FC<{
  title?: string;
  badge?: string;
  rating?: string;
  onClick?: (e: React.MouseEvent) => void;
}> = ({
  title = 'VIP 4K Ultra Cinema Pass',
  badge = 'Sponsored 4K',
  rating = '9.9',
  onClick
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative flex flex-col bg-[#16213e] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-blue-600/30 border border-blue-500/40"
    >
      <div className="relative aspect-[2/3] w-full bg-slate-900 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&auto=format&fit=crop&q=80"
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#16213e] via-transparent to-black/60 opacity-85 group-hover:opacity-95 transition-opacity" />

        <div className="absolute top-2 left-2 flex flex-col gap-1 items-start">
          <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-gradient-to-r from-amber-500 to-red-500 text-black shadow-md uppercase">
            {badge}
          </span>
          <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-blue-900/80 text-blue-200 border border-blue-400/40">
            දැන්වීම
          </span>
        </div>

        <div className="absolute top-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-sm text-amber-400 text-xs font-bold border border-amber-400/30">
          <span>★</span>
          <span>{rating}</span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
            <span className="text-xl">▶</span>
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col justify-between flex-grow">
        <h4 className="text-sm font-bold text-white group-hover:text-blue-400 line-clamp-1 font-sinhala">
          {title}
        </h4>
        <div className="flex items-center justify-between mt-2 text-[11px] text-gray-400">
          <span className="text-emerald-400 font-semibold">අධිවේගී Mirror</span>
          <span className="text-gray-400 font-mono text-[10px]">Partner</span>
        </div>
      </div>
    </div>
  );
};

