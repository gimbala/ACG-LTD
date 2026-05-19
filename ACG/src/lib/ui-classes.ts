/** Shared touch-friendly + focus-visible styles for CTAs and nav controls */
export const focusRing =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6366F1] focus-visible:ring-offset-2';

export const touchMin = 'min-h-[44px]';

export const btnPrimary = `${touchMin} inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#6366F1] to-[#F97316] px-6 py-3 text-white font-bold transition-all hover:shadow-lg active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60 ${focusRing}`;

export const btnSecondary = `${touchMin} inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm transition-colors hover:bg-white/20 active:scale-[0.98] ${focusRing}`;

export const btnNav = `${touchMin} rounded-lg px-4 py-2.5 transition-colors ${focusRing}`;

export const inputField = `w-full min-h-[44px] rounded-lg border border-gray-300 px-4 py-3 text-base text-[#1E1B4B] placeholder:text-gray-400 ${focusRing}`;
