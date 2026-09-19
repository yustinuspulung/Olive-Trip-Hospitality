import React, { useState, useEffect, useRef } from 'react';
import { Building2, Car, Compass, ArrowRight, ShieldCheck } from 'lucide-react';

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
            videoId: 'BatVJ6dAU-c',
            playerVars: {
              autoplay: 1,
              mute: 1,
              controls: 0,
              loop: 1,
              playlist: 'BatVJ6dAU-c',
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
                    event.target.setPlaybackQualityRange('hd1080', 'hd1080');
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
          <div
            ref={playerContainerRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] sm:w-[220%] sm:h-[220%] lg:w-[160%] lg:h-[160%] min-w-full min-h-full object-cover pointer-events-none select-none scale-110"
          />
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
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Eyebrow, Title, Subtitle, Supporting text, CTAs */}
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-xs border border-white/15 text-[#E7B84B] text-xs font-bold tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-[#E7B84B] animate-pulse"></span>
              WELCOME TO
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight font-serif">
              Olive Trip &amp; Hospitality
            </h1>

            <div className="text-lg sm:text-xl font-semibold text-blue-100 border-l-3 border-[#E7B84B] pl-3 py-0.5">
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

          {/* Right Column: Hero KPI Card (15 Hotel Partners / 6 Pilihan Armada / 6+ Kategori Aksesibilitas) */}
          <div className="lg:col-span-4">
            <div 
              id="hero-kpi-card"
              className="bg-[#16324E]/95 border border-white/20 rounded-2xl p-6 sm:p-7 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              {/* Subtle gold glow corner */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#E7B84B]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/15">
                <div className="text-xs font-bold text-[#E7B84B] tracking-wider uppercase">
                  Executive KPI Overview
                </div>
                <div className="text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  Terverifikasi 2026
                </div>
              </div>

              <div className="space-y-4">
                {/* KPI 1 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#062846] flex items-center justify-center text-[#E7B84B] shadow-inner shrink-0 border border-white/10">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      15
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      Hotel Partners
                    </div>
                    <div className="text-[11px] text-slate-400">Ring-1 &amp; Koridor Bisnis Utama</div>
                  </div>
                </div>

                {/* KPI 2 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#062846] flex items-center justify-center text-[#1B6FAE] shadow-inner shrink-0 border border-white/10">
                    <Car className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      6
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      Pilihan Armada
                    </div>
                    <div className="text-[11px] text-slate-400">Sedan, SUV, Hiace s/d Big Bus</div>
                  </div>
                </div>

                {/* KPI 3 */}
                <div className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5">
                  <div className="w-12 h-12 rounded-xl bg-[#062846] flex items-center justify-center text-emerald-400 shadow-inner shrink-0 border border-white/10">
                    <Compass className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                      6+
                    </div>
                    <div className="text-xs sm:text-sm font-semibold text-slate-200">
                      Kategori Aksesibilitas
                    </div>
                    <div className="text-[11px] text-slate-400">MRT/LRT, RS, Mall, Kuliner, dll.</div>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-white/10 text-[11px] text-slate-300 text-center">
                Solusi Terpusat Kunjungan Eksekutif DKI Jakarta
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

