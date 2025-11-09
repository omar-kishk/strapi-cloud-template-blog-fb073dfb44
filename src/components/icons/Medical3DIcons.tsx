'use client';

import React from 'react';

// 3D Medical Icons Component based on Figma Community Pack
// https://www.figma.com/design/mjyypkVHjLovVpwe7dz5wy/35--3D-MEDICAL-ICONS-FREE--Community-

interface Medical3DIconProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'accent' | 'custom';
  customColor?: string;
}

const getSizeClasses = (size: string) => {
  switch (size) {
    case 'sm': return 'w-8 h-8';
    case 'md': return 'w-12 h-12';
    case 'lg': return 'w-16 h-16';
    case 'xl': return 'w-24 h-24';
    default: return 'w-12 h-12';
  }
};

// 3D Heart Icon
export const Heart3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#ff6b6b');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="heart-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="50%" stopColor={primaryColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="heart-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <path 
        d="M50 85C50 85 20 65 20 40C20 30 28 22 38 22C44 22 50 26 50 26C50 26 56 22 62 22C72 22 80 30 80 40C80 65 50 85 50 85Z" 
        fill="url(#heart-gradient)" 
        filter="url(#heart-shadow)"
      />
      <ellipse cx="42" cy="35" rx="8" ry="6" fill="rgba(255,255,255,0.3)" />
      <ellipse cx="35" cy="32" rx="3" ry="2" fill="rgba(255,255,255,0.6)" />
    </svg>
  );
};

// 3D Brain Icon
export const Brain3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#4ecdc4');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="50%" stopColor={primaryColor} stopOpacity="0.7" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="brain-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <path 
        d="M25 35C25 25 35 15 50 15C65 15 75 25 75 35C75 40 73 44 70 47C72 50 75 55 75 60C75 70 65 80 50 80C35 80 25 70 25 60C25 55 28 50 30 47C27 44 25 40 25 35Z" 
        fill="url(#brain-gradient)" 
        filter="url(#brain-shadow)"
      />
      <path d="M35 30C35 28 37 26 40 26C43 26 45 28 45 30" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
      <path d="M55 30C55 28 57 26 60 26C63 26 65 28 65 30" stroke="rgba(255,255,255,0.4)" strokeWidth="2" fill="none"/>
      <path d="M30 50C35 48 40 52 45 50C50 48 55 52 60 50C65 48 70 50 70 52" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none"/>
      <ellipse cx="40" cy="25" rx="4" ry="3" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
};

// 3D Pill Icon
export const Pill3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#45b7d1');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="pill-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="pill-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#ff7675" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#ff7675" stopOpacity="0.6" />
        </linearGradient>
        <filter id="pill-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <rect x="25" y="35" width="50" height="30" rx="15" ry="15" fill="url(#pill-gradient-1)" filter="url(#pill-shadow)"/>
      <rect x="25" y="35" width="25" height="30" rx="15" ry="15" fill="url(#pill-gradient-2)"/>
      <ellipse cx="35" cy="42" rx="8" ry="6" fill="rgba(255,255,255,0.3)" />
      <ellipse cx="32" cy="40" rx="3" ry="2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
};

// 3D Syringe Icon
export const Syringe3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#96ceb4');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="syringe-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="syringe-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <rect x="20" y="40" width="45" height="20" rx="10" ry="10" fill="url(#syringe-gradient)" filter="url(#syringe-shadow)"/>
      <rect x="65" y="47" width="15" height="6" rx="3" ry="3" fill={primaryColor} opacity="0.8"/>
      <circle cx="75" cy="50" r="2" fill="#ff7675"/>
      <rect x="25" y="45" width="30" height="10" rx="5" ry="5" fill="rgba(255,255,255,0.3)"/>
      <rect x="30" y="47" width="20" height="6" rx="3" ry="3" fill={primaryColor} opacity="0.6"/>
      <ellipse cx="35" cy="45" rx="6" ry="4" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
};

// 3D Stethoscope Icon
export const Stethoscope3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#feca57');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="stethoscope-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="stethoscope-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <circle cx="25" cy="25" r="8" fill="url(#stethoscope-gradient)" filter="url(#stethoscope-shadow)"/>
      <circle cx="75" cy="25" r="8" fill="url(#stethoscope-gradient)" filter="url(#stethoscope-shadow)"/>
      <path d="M25 33 Q25 50 50 65 Q75 50 75 33" stroke={primaryColor} strokeWidth="4" fill="none" opacity="0.8"/>
      <circle cx="50" cy="75" r="12" fill="url(#stethoscope-gradient)" filter="url(#stethoscope-shadow)"/>
      <circle cx="50" cy="75" r="8" fill="rgba(255,255,255,0.3)"/>
      <ellipse cx="22" cy="22" rx="3" ry="2" fill="rgba(255,255,255,0.5)" />
      <ellipse cx="72" cy="22" rx="3" ry="2" fill="rgba(255,255,255,0.5)" />
    </svg>
  );
};

// 3D Microscope Icon
export const Microscope3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#a29bfe');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="microscope-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="microscope-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <rect x="20" y="70" width="60" height="8" rx="4" ry="4" fill="url(#microscope-gradient)" filter="url(#microscope-shadow)"/>
      <rect x="45" y="30" width="10" height="40" rx="2" ry="2" fill="url(#microscope-gradient)"/>
      <circle cx="50" cy="25" r="8" fill="url(#microscope-gradient)"/>
      <rect x="35" y="15" width="30" height="6" rx="3" ry="3" fill={primaryColor} opacity="0.7"/>
      <circle cx="65" cy="45" r="6" fill="url(#microscope-gradient)"/>
      <rect x="30" y="60" width="40" height="10" rx="5" ry="5" fill="rgba(255,255,255,0.3)"/>
      <ellipse cx="47" cy="20" rx="4" ry="3" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
};

// 3D DNA Icon
export const DNA3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#00b894');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="dna-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="dna-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <path d="M30 10 Q50 25 70 10 Q50 40 30 25 Q50 55 70 40 Q50 70 30 55 Q50 85 70 70" 
            stroke={primaryColor} strokeWidth="4" fill="none" opacity="0.8" filter="url(#dna-shadow)"/>
      <path d="M70 10 Q50 25 30 10 Q50 40 70 25 Q50 55 30 40 Q50 70 70 55 Q50 85 30 70" 
            stroke="#ff7675" strokeWidth="4" fill="none" opacity="0.8"/>
      <line x1="35" y1="20" x2="65" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <line x1="35" y1="35" x2="65" y2="35" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <line x1="35" y1="50" x2="65" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
      <line x1="35" y1="65" x2="65" y2="65" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
    </svg>
  );
};

// 3D Shield Icon (Medical Protection)
export const Shield3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#00cec9');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="shield-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="shield-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <path d="M50 15 L25 25 L25 55 Q25 75 50 85 Q75 75 75 55 L75 25 Z" 
            fill="url(#shield-gradient)" filter="url(#shield-shadow)"/>
      <path d="M45 35 L50 40 L60 30" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <ellipse cx="45" cy="30" rx="8" ry="6" fill="rgba(255,255,255,0.3)" />
    </svg>
  );
};

// 3D Medical Cross Icon
export const MedicalCross3D: React.FC<Medical3DIconProps> = ({ 
  className = '', 
  size = 'md', 
  color = 'primary',
  customColor 
}) => {
  const sizeClass = getSizeClasses(size);
  const primaryColor = customColor || (color === 'primary' ? '#40296e' : color === 'secondary' ? '#62c6c2' : '#e17055');
  
  return (
    <svg className={`${sizeClass} ${className}`} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id="cross-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
          <stop offset="100%" stopColor={primaryColor} stopOpacity="0.5" />
        </linearGradient>
        <filter id="cross-shadow">
          <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor={primaryColor} floodOpacity="0.3"/>
        </filter>
      </defs>
      <rect x="40" y="20" width="20" height="60" rx="5" ry="5" fill="url(#cross-gradient)" filter="url(#cross-shadow)"/>
      <rect x="20" y="40" width="60" height="20" rx="5" ry="5" fill="url(#cross-gradient)" filter="url(#cross-shadow)"/>
      <ellipse cx="45" cy="35" rx="6" ry="4" fill="rgba(255,255,255,0.4)" />
      <ellipse cx="35" cy="45" rx="4" ry="6" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
};

// Collection of all 3D Medical Icons
export const Medical3DIcons = {
  Heart3D,
  Brain3D,
  Pill3D,
  Syringe3D,
  Stethoscope3D,
  Microscope3D,
  DNA3D,
  Shield3D,
  MedicalCross3D,
};

// Therapeutic Area 3D Icons Mapping
export const TherapeuticArea3DIcons = {
  cardiovascular: {
    primary: Heart3D,
    secondary: Stethoscope3D,
    tertiary: Shield3D
  },
  neurology: {
    primary: Brain3D,
    secondary: DNA3D,
    tertiary: Microscope3D
  },
  oncology: {
    primary: DNA3D,
    secondary: Microscope3D,
    tertiary: Shield3D
  },
  endocrinology: {
    primary: Syringe3D,
    secondary: Pill3D,
    tertiary: Heart3D
  },
  infectious: {
    primary: Shield3D,
    secondary: Syringe3D,
    tertiary: Pill3D
  },
  respiratory: {
    primary: Stethoscope3D,
    secondary: Heart3D,
    tertiary: MedicalCross3D
  },
  painManagement: {
    primary: Pill3D,
    secondary: Syringe3D,
    tertiary: MedicalCross3D
  },
  mentalHealth: {
    primary: Brain3D,
    secondary: Heart3D,
    tertiary: Shield3D
  }
};

export default Medical3DIcons; 