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
