import React, { useState, useEffect, useRef } from 'react';
import { Building2, Car, Compass, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

interface HeroProps {
  onExploreHotels: () => void;
  onExploreTransport: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreHotels, onExploreTransport }) => {
  const [isPlayerPlaying, setIsPlayerPlaying] = useState(false);
  const [hasPlayerError, setHasPlayerError] = useState(false);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;

    const originUrl = typeof window !== 'undefined' ? window.location.origin : '';

    const initPlayer = () => {
      if (window.YT && window.YT.Player && playerContainerRef.current && isMounted) {
        try {
          playerRef.current = new window.YT.Player(playerContainerRef.current, {
            videoId: 'b3SXx1ARl9k',
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              loop: 1,
              playlist: 'b3SXx1ARl9k',
              playsinline: 1,
              enablejsapi: 1,
              origin: originUrl,
              showinfo: 0,
              rel: 0,
              iv_load_policy: 3,
              modestbranding: 1,
              disablekb: 1,
              fs: 0,
              vq: 'hd1080',
            },
            events: {
              onReady: (event: any) => {
                if (!isMounted) return;
                try {
                  event.target.mute();
                  if (typeof event.target.setPlaybackQuality === 'function') {
                    event.target.setPlaybackQuality('hd1080');
                  }
                  if (typeof event.target.setPlaybackQualityRange === 'function') {
                    event.target.setPlaybackQualityRange('hd1080', 'highres');
                  }
                  event.target.playVideo();
                } catch (e) {
                  console.warn('YouTube playVideo failed onReady:', e);
                }
              },
              onStateChange: (event: any) => {
                if (!isMounted) return;

                // STRICT STATE REVEAL: Only reveal iframe when player confirms PLAYING.
                if (event.data === window.YT.PlayerState.PLAYING) {
                  if (typeof event.target.setPlaybackQuality === 'function') {
                    try {
                      event.target.setPlaybackQuality('hd1080');
                    } catch (e) {
                      // ignore quality adjustment error
                    }
                  }
                  setIsPlayerPlaying(true);
                } else if (
                  event.data === window.YT.PlayerState.ENDED ||
                  event.data === window.YT.PlayerState.PAUSED
                ) {
                  try {
                    event.target.playVideo();
                  } catch (e) {
                    // Ignore transient play errors
                  }
                }
              },
              onError: () => {
                if (!isMounted) return;
                setHasPlayerError(true);
                setIsPlayerPlaying(false);
              },
              onAutoplayBlocked: () => {
                if (!isMounted) return;
                setIsPlayerPlaying(false);
              },
            },
          });
        } catch (err) {
          if (isMounted) {
            setHasPlayerError(true);
            setIsPlayerPlaying(false);
          }
        }
      }
    };

    if (!window.YT || !window.YT.Player) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      tag.onerror = () => {
        if (isMounted) {
          setHasPlayerError(true);
          setIsPlayerPlaying(false);
        }
      };
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

      const existingCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (existingCallback) existingCallback();
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // Cleanup ignore
        }
      }
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#062846] text-white">
      {/* 1. Strategic Fallback / Poster Layer: Photographic Jakarta Skyline */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-luminosity scale-105 transition-opacity duration-1000 ease-in-out z-0 pointer-events-none select-none ${
          isPlayerPlaying && !hasPlayerError ? 'opacity-0' : 'opacity-40'
        }`}
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555899434-94d1368aa7af?auto=format&fit=crop&w=2000&q=85')`,
        }}
        aria-hidden="true"
      />

      {/* 2. Primary Video Layer: Official YouTube IFrame Player (BatVJ6dAU-c) */}
      {!hasPlayerError && (
        <div
          className={`absolute inset-0 overflow-hidden pointer-events-none z-0 select-none bg-[#062846] transition-all duration-1000 ease-in-out ${
            isPlayerPlaying ? 'opacity-85 visible' : 'opacity-0 invisible'
          }`}
          style={{
            opacity: isPlayerPlaying ? 0.85 : 0,
            visibility: isPlayerPlaying ? 'visible' : 'hidden',
          }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600%] h-[600%] min-w-[300vh] min-h-[300vw] sm:w-[260%] sm:h-[260%] lg:w-[180%] lg:h-[180%] pointer-events-none select-none scale-105">
            <div
              ref={playerContainerRef}
              className="w-full h-full pointer-events-none select-none"
            />
          </div>
        </div>
      )}

      {/* 3. Corporate Semi-Transparent Navy Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#062846]/90 via-[#062846]/75 to-[#16324E]/80 backdrop-blur-[0.5px] z-10 pointer-events-none" />

      {/* 4. Subtle Pattern Grid Accent */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none z-10"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* 5. Hero Interactive Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Title, Subtitle, Supporting text, CTAs */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-5 break-words max-w-full">
            <div className="inline-flex items-center gap-3">
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-r from-transparent to-[#E7B84B]/80" />
              <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#062846]/80 backdrop-blur-md border border-[#E7B84B]/40 shadow-[0_2px_14px_rgba(231,184,75,0.18)]">
                <span className="text-[11px] sm:text-xs font-bold text-[#E7B84B] tracking-[0.25em] uppercase font-serif">
                  WELCOME TO
                </span>
              </div>
              <span className="w-6 sm:w-10 h-[1px] bg-gradient-to-l from-transparent to-[#E7B84B]/80" />
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif break-words">
              Olive Trip &amp; Hospitality
            </h1>

            <div className="text-base sm:text-xl font-semibold text-blue-100 border-l-3 border-[#E7B84B] pl-3 py-0.5 break-words">
              Accommodation &amp; Mobility Solutions for Jakarta Executive Visits
            </div>

            <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed font-normal">
              Kami siap mendukung kunjungan kerja delegasi pemerintahan dan korporasi dengan pilihan hotel terbaik dan transportasi yang aman, nyaman, dan representatif.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onExploreHotels}
                id="hero-explore-hotels-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-[#1B6FAE] hover:bg-[#155a8e] active:bg-[#104771] text-[#FFFFFF] font-bold text-sm shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                Jelajahi Hotel
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreTransport}
                id="hero-explore-transport-cta"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 active:bg-white/30 text-[#FFFFFF] font-semibold text-sm border border-white/25 backdrop-blur-xs transition-all cursor-pointer"
              >
                Lihat Armada
              </button>
            </div>

            {/* Small reassurance tagline */}
            <div className="pt-3 flex items-center gap-2 text-xs text-slate-300">
              <ShieldCheck className="w-4 h-4 text-[#E7B84B]" />
              <span>Dukungan Standar Biaya Masukan (SBU) &amp; Bebas Friksi Administrasi Koordinasi</span>
            </div>
          </div>

          {/* Right Column: Hero Executive Overview Card with Exact Google AI Studio Style Animated Glowing Border */}
          <div className="lg:col-span-4">
            <div className="relative p-[1.5px] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.6)] group/card">
              {/* 1. Outer Ambient Glow Halo (Exact Google AI Studio 4-color aura glow) */}
              <div className="gemini-ambient-halo pointer-events-none" />

              {/* 2. Rotating Border Light Beam */}
              <div className="gemini-border-glow pointer-events-none" />

              {/* 3. Main Inner Card Container */}
              <div 
                id="hero-kpi-card"
                className="relative rounded-[15px] bg-gradient-to-b from-[#0A2540]/95 via-[#061A2E]/98 to-[#082038]/95 backdrop-blur-xl p-6 sm:p-7 z-10 overflow-hidden"
              >
                {/* Header Section */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E7B84B]/20">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E7B84B] shadow-[0_0_8px_#E7B84B]" />
                    <span className="text-xs font-bold text-[#E7B84B] tracking-[0.2em] uppercase font-serif">
                      Executive Overview
                    </span>
                  </div>
                  <div className="px-2.5 py-0.5 rounded-full bg-[#E7B84B]/10 border border-[#E7B84B]/25 text-[10px] font-semibold text-[#E7B84B] tracking-wider uppercase">
                    Verified
                  </div>
                </div>

                {/* 3 Luxury KPI Cards */}
                <div className="space-y-3.5">
                  {/* Item 1 */}
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-[#E7B84B]/40 hover:bg-gradient-to-r hover:from-[#E7B84B]/10 hover:to-white/[0.04] transition-all duration-300 shadow-xs group/item">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#062846] to-[#0E3B64] border border-[#E7B84B]/35 shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center text-[#E7B84B] group-hover/item:scale-105 group-hover/item:border-[#E7B84B]/60 transition-transform duration-300 shrink-0">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200 tracking-tight font-serif">
                        15
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#FFFFFF] group-hover/item:text-[#E7B84B] transition-colors">
                        Hotel Partners
                      </div>
                      <div className="text-[11px] text-slate-300/80 mt-0.5">Ring-1 &amp; Koridor Bisnis Utama</div>
                    </div>
                  </div>

                  {/* Item 2 */}
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-[#1B6FAE]/50 hover:bg-gradient-to-r hover:from-[#1B6FAE]/10 hover:to-white/[0.04] transition-all duration-300 shadow-xs group/item">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#062846] to-[#0E3B64] border border-[#1B6FAE]/40 shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center text-sky-400 group-hover/item:scale-105 group-hover/item:border-sky-400/60 transition-transform duration-300 shrink-0">
                      <Car className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-sky-200 tracking-tight font-serif">
                        6
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#FFFFFF] group-hover/item:text-sky-300 transition-colors">
                        Pilihan Armada
                      </div>
                      <div className="text-[11px] text-slate-300/80 mt-0.5">Sedan, SUV, Hiace s/d Big Bus</div>
                    </div>
                  </div>

                  {/* Item 3 */}
                  <div className="flex items-center gap-4 p-3.5 rounded-xl bg-gradient-to-r from-white/[0.06] to-white/[0.02] border border-white/10 hover:border-emerald-400/40 hover:bg-gradient-to-r hover:from-emerald-500/10 hover:to-white/[0.04] transition-all duration-300 shadow-xs group/item">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#062846] to-[#0E3B64] border border-emerald-400/35 shadow-[0_4px_12px_rgba(0,0,0,0.3)] flex items-center justify-center text-emerald-400 group-hover/item:scale-105 group-hover/item:border-emerald-400/60 transition-transform duration-300 shrink-0">
                      <Compass className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200 tracking-tight font-serif">
                        6+
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-[#FFFFFF] group-hover/item:text-[#1DB954] transition-colors">
                        Kategori Aksesibilitas
                      </div>
                      <div className="text-[11px] text-slate-300/80 mt-0.5">MRT/LRT, RS, Mall, Kuliner, dll.</div>
                    </div>
                  </div>
                </div>

                {/* Luxury Footer Tagline */}
                <div className="mt-5 pt-4 border-t border-[#E7B84B]/20 flex items-center justify-center gap-2 text-[11px] font-medium text-slate-300 tracking-wide">
                  <span className="text-[#E7B84B] text-[10px]">✦</span>
                  <span>Solusi Terpadu Kunjungan Eksekutif DKI Jakarta</span>
                  <span className="text-[#E7B84B] text-[10px]">✦</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

