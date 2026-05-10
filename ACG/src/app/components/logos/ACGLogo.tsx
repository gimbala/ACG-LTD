// Main ACG Logo - Full Version with Text
export function ACGLogo({ variant = 'primary', size = 'default' }: { variant?: 'primary' | 'white' | 'dark', size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { container: 'h-8', icon: 'w-8 h-8', text: 'text-xs', subtext: 'text-[8px]' },
    default: { container: 'h-12', icon: 'w-12 h-12', text: 'text-sm', subtext: 'text-[10px]' },
    large: { container: 'h-20', icon: 'w-20 h-20', text: 'text-xl', subtext: 'text-sm' }
  };

  const colors = {
    primary: {
      gradient: 'from-[#6366F1] to-[#F97316]',
      text: 'text-[#1E1B4B]',
      subtext: 'text-[#F97316]',
      iconText: 'text-white'
    },
    white: {
      gradient: 'from-white to-white',
      text: 'text-white',
      subtext: 'text-white/80',
      iconText: 'text-[#1E1B4B]'
    },
    dark: {
      gradient: 'from-[#1E1B4B] to-[#1E1B4B]',
      text: 'text-[#1E1B4B]',
      subtext: 'text-[#F97316]',
      iconText: 'text-white'
    }
  };

  const s = sizes[size];
  const c = colors[variant];

  return (
    <div className={`flex items-center gap-3 ${s.container}`}>
      <div className="relative">
        <div className={`${s.icon} bg-gradient-to-br ${c.gradient} transform -skew-x-12 flex items-center justify-center`}>
          <span className={`${c.iconText} skew-x-12 font-bold ${s.text}`}>ACG</span>
        </div>
        <div className={`absolute -top-1 -right-1 w-3 h-3 bg-[#F97316] rounded-full ${variant === 'white' ? 'bg-white' : 'bg-[#F97316]'}`}></div>
      </div>
      <div>
        <div className={`${c.text} tracking-tight font-bold ${s.text}`}>ASCEND CAPITAL GROUP</div>
        <div className={`${c.subtext} tracking-widest uppercase ${s.subtext}`}>Elevate Your World</div>
      </div>
    </div>
  );
}

// Icon Only - Square Format
export function ACGIcon({ variant = 'primary', size = 'default' }: { variant?: 'primary' | 'white' | 'dark', size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { container: 'w-8 h-8', text: 'text-xs' },
    default: { container: 'w-12 h-12', text: 'text-sm' },
    large: { container: 'w-20 h-20', text: 'text-xl' }
  };

  const colors = {
    primary: {
      gradient: 'from-[#6366F1] to-[#F97316]',
      iconText: 'text-white',
      dot: 'bg-[#F97316]'
    },
    white: {
      gradient: 'from-white to-white',
      iconText: 'text-[#1E1B4B]',
      dot: 'bg-white'
    },
    dark: {
      gradient: 'from-[#1E1B4B] to-[#1E1B4B]',
      iconText: 'text-white',
      dot: 'bg-[#F97316]'
    }
  };

  const s = sizes[size];
  const c = colors[variant];

  return (
    <div className="relative inline-block">
      <div className={`${s.container} bg-gradient-to-br ${c.gradient} transform -skew-x-12 flex items-center justify-center shadow-lg`}>
        <span className={`${c.iconText} skew-x-12 font-bold ${s.text}`}>ACG</span>
      </div>
      <div className={`absolute -top-1 -right-1 w-3 h-3 ${c.dot} rounded-full animate-pulse`}></div>
    </div>
  );
}

// Horizontal Logo - Compact
export function ACGLogoHorizontal({ variant = 'primary', size = 'default' }: { variant?: 'primary' | 'white' | 'dark', size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { icon: 'w-6 h-6', text: 'text-xs', gap: 'gap-2' },
    default: { icon: 'w-10 h-10', text: 'text-base', gap: 'gap-3' },
    large: { icon: 'w-14 h-14', text: 'text-xl', gap: 'gap-4' }
  };

  const colors = {
    primary: {
      gradient: 'from-[#6366F1] to-[#F97316]',
      text: 'text-[#1E1B4B]',
      iconText: 'text-white'
    },
    white: {
      gradient: 'from-white to-white',
      text: 'text-white',
      iconText: 'text-[#1E1B4B]'
    },
    dark: {
      gradient: 'from-[#1E1B4B] to-[#1E1B4B]',
      text: 'text-[#1E1B4B]',
      iconText: 'text-white'
    }
  };

  const s = sizes[size];
  const c = colors[variant];

  return (
    <div className={`flex items-center ${s.gap}`}>
      <div className="relative">
        <div className={`${s.icon} bg-gradient-to-br ${c.gradient} transform -skew-x-12 flex items-center justify-center`}>
          <span className={`${c.iconText} skew-x-12 font-bold text-xs`}>ACG</span>
        </div>
      </div>
      <div className={`${c.text} tracking-tight font-bold ${s.text}`}>
        ASCEND CAPITAL GROUP
      </div>
    </div>
  );
}

// Stacked Logo - Vertical
export function ACGLogoStacked({ variant = 'primary', size = 'default' }: { variant?: 'primary' | 'white' | 'dark', size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { icon: 'w-12 h-12', title: 'text-sm', subtitle: 'text-[8px]' },
    default: { icon: 'w-16 h-16', title: 'text-lg', subtitle: 'text-xs' },
    large: { icon: 'w-24 h-24', title: 'text-2xl', subtitle: 'text-sm' }
  };

  const colors = {
    primary: {
      gradient: 'from-[#6366F1] to-[#F97316]',
      text: 'text-[#1E1B4B]',
      subtext: 'text-[#F97316]',
      iconText: 'text-white'
    },
    white: {
      gradient: 'from-white to-white',
      text: 'text-white',
      subtext: 'text-white/80',
      iconText: 'text-[#1E1B4B]'
    },
    dark: {
      gradient: 'from-[#1E1B4B] to-[#1E1B4B]',
      text: 'text-[#1E1B4B]',
      subtext: 'text-[#F97316]',
      iconText: 'text-white'
    }
  };

  const s = sizes[size];
  const c = colors[variant];

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative">
        <div className={`${s.icon} bg-gradient-to-br ${c.gradient} transform -skew-x-12 flex items-center justify-center shadow-lg`}>
          <span className={`${c.iconText} skew-x-12 font-bold text-lg`}>ACG</span>
        </div>
        <div className={`absolute -top-1 -right-1 w-3 h-3 bg-[#F97316] rounded-full ${variant === 'white' ? 'bg-white' : 'bg-[#F97316]'}`}></div>
      </div>
      <div className="text-center">
        <div className={`${c.text} tracking-tight font-bold ${s.title}`}>ASCEND CAPITAL GROUP</div>
        <div className={`${c.subtext} tracking-widest uppercase ${s.subtitle} mt-1`}>Elevate Your World</div>
      </div>
    </div>
  );
}

// Minimal Mark - Just the geometric shape
export function ACGMark({ variant = 'primary', size = 'default' }: { variant?: 'primary' | 'white' | 'dark', size?: 'small' | 'default' | 'large' }) {
  const sizes = {
    small: { container: 'w-6 h-6' },
    default: { container: 'w-10 h-10' },
    large: { container: 'w-16 h-16' }
  };

  const colors = {
    primary: 'from-[#6366F1] to-[#F97316]',
    white: 'from-white to-white',
    dark: 'from-[#1E1B4B] to-[#1E1B4B]'
  };

  const s = sizes[size];
  const c = colors[variant];

  return (
    <div className={`${s.container} bg-gradient-to-br ${c} transform -skew-x-12 shadow-lg`}></div>
  );
}
