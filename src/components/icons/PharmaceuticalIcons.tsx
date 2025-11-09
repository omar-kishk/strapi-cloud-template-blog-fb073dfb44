'use client';

import React from 'react';
import { 
  // Medical & Healthcare Core Icons
  Heart, 
  Pill, 
  Shield, 
  Activity, 
  Stethoscope,
  Thermometer,
  Syringe,
  Microscope,
  FlaskConical,
  TestTube,
  Dna,
  Zap,
  
  // Pharmaceutical Specific
  PillBottle,
  
  // Body & Anatomy
  Brain,
  Eye,
  Ear,
  
  // Emergency & Care
  Ambulance,
  Cross,
  Plus,
  
  // Research & Science
  Atom,
  Beaker,
  Binary,
  BookOpen,
  
  // Quality & Compliance
  Award,
  CheckCircle,
  ShieldCheck,
  BadgeCheck,
  
  // Supply Chain & Distribution
  Truck,
  Package,
  Factory,
  Building2,
  Globe,
  
  // User & People
  Users,
  User,
  UserCheck,
  
  // Communication & Support
  Phone,
  Mail,
  MessageCircle,
  HeartHandshake,
  
  // Time & Progress
  Clock,
  Timer,
  TrendingUp,
  BarChart3,
  
  // Technology & Innovation
  Cpu,
  Database,
  Wifi,
  Monitor,
  
  // Documents & Reports
  FileText,
  ClipboardList,
  FileSpreadsheet,
  
  // Navigation & Actions
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Download,
  Wind,
  
  // Status & Alerts
  AlertCircle,
  Info,
  CheckCircle2,
  XCircle,
  
  // Specialized Medical (Available alternatives)
  Bandage,
  CircleDot, // Alternative for accessibility/mobility
  Target // Alternative for precision/therapy targeting
} from 'lucide-react';

// Pharmaceutical Icon Categories for BAB Pharma
export const PharmaceuticalIcons = {
  // Core Medical Icons
  medical: {
    heart: Heart,
    pill: Pill,
    pillBottle: PillBottle,
    capsule: Pill, // Using Pill as alternative for capsule
    tablets: PillBottle, // Using PillBottle as alternative for tablets
    medicine: PillBottle, // Using PillBottle as alternative for medicine
    syringe: Syringe,
    stethoscope: Stethoscope,
    thermometer: Thermometer,
    activity: Activity,
    bandage: Bandage,
    mobility: CircleDot, // Alternative for accessibility/mobility aids
    targeting: Target // For targeted therapy
  },
  
  // Research & Laboratory
  research: {
    microscope: Microscope,
    flask: FlaskConical,
    testTube: TestTube,
    dna: Dna,
    atom: Atom,
    beaker: Beaker,
    binary: Binary,
    bookOpen: BookOpen
  },
  
  // Body Systems & Specialties
  anatomy: {
    brain: Brain,
    eye: Eye,
    ear: Ear,
    zap: Zap // For neurology/electrical activity
  },
  
  // Emergency & Critical Care
  emergency: {
    ambulance: Ambulance,
    cross: Cross,
    plus: Plus,
    shield: Shield,
    alertCircle: AlertCircle
  },
  
  // Quality & Compliance
  quality: {
    award: Award,
    checkCircle: CheckCircle,
    shieldCheck: ShieldCheck,
    badgeCheck: BadgeCheck,
    checkCircle2: CheckCircle2
  },
  
  // Manufacturing & Supply Chain
  operations: {
    truck: Truck,
    package: Package,
    factory: Factory,
    building: Building2,
    globe: Globe
  },
  
  // People & Care
  people: {
    users: Users,
    user: User,
    userCheck: UserCheck,
    heartHandshake: HeartHandshake
  },
  
  // Communication & Support
  communication: {
    phone: Phone,
    mail: Mail,
    messageCircle: MessageCircle
  },
  
  // Analytics & Progress
  analytics: {
    clock: Clock,
    timer: Timer,
    trendingUp: TrendingUp,
    barChart: BarChart3
  },
  
  // Technology & Digital Health
  technology: {
    cpu: Cpu,
    database: Database,
    wifi: Wifi,
    monitor: Monitor
  },
  
  // Documentation & Reporting
  documentation: {
    fileText: FileText,
    clipboardList: ClipboardList,
    fileSpreadsheet: FileSpreadsheet
  },
  
  // Navigation & Actions
  navigation: {
    arrowRight: ArrowRight,
    chevronRight: ChevronRight,
    externalLink: ExternalLink,
    download: Download
  },
  
  // Status & Feedback
  status: {
    info: Info,
    xCircle: XCircle
  }
};

// Therapeutic Area Icons Mapping
export const TherapeuticAreaIcons = {
  cardiovascular: {
    primary: Heart,
    secondary: Activity,
    tertiary: TrendingUp
  },
  neurology: {
    primary: Brain,
    secondary: Zap,
    tertiary: User
  },
  oncology: {
    primary: Dna,
    secondary: Microscope,
    tertiary: Target
  },
  endocrinology: {
    primary: Activity, // Using activity as a proxy for metabolic rate
    secondary: TestTube,
    tertiary: BarChart3
  },
  infectious: {
    primary: ShieldCheck,
    secondary: Syringe,
    tertiary: Pill
  },
  respiratory: {
    primary: Wind, // Assuming 'Wind' is available or replaced
    secondary: Thermometer,
    tertiary: Activity
  },
  painManagement: {
    primary: Bandage,
    secondary: CircleDot,
    tertiary: UserCheck
  },
  mentalHealth: {
    primary: Brain,
    secondary: MessageCircle,
    tertiary: Users
  }
};

// Product Category Icons
export const ProductCategoryIcons = {
  // Novel Generics
  novelGenerics: {
    primary: Pill,
    secondary: FlaskConical,
    tertiary: Award
  },
  
  // Medical Devices
  medicalDevices: {
    primary: Stethoscope,
    secondary: Monitor,
    tertiary: ShieldCheck
  },
  
  // Nutraceuticals
  nutraceuticals: {
    primary: Pill,
    secondary: Heart,
    tertiary: TrendingUp
  }
};

// Business Function Icons
export const BusinessFunctionIcons = {
  // Import & Distribution
  importDistribution: {
    primary: Truck,
    secondary: Globe,
    tertiary: Package
  },
  
  // Manufacturing
  manufacturing: {
    primary: Factory,
    secondary: Award,
    tertiary: ShieldCheck
  },
  
  // Research & Development
  researchDevelopment: {
    primary: Microscope,
    secondary: FlaskConical,
    tertiary: Dna
  },
  
  // Quality Assurance
  qualityAssurance: {
    primary: ShieldCheck,
    secondary: Award,
    tertiary: CheckCircle
  },
  
  // Customer Support
  customerSupport: {
    primary: HeartHandshake,
    secondary: Phone,
    tertiary: MessageCircle
  }
};

// Updated Props interface to be more flexible
interface PharmIconProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color?: 'primary' | 'secondary' | 'foreground' | 'background' | 'destructive' | 'muted-foreground';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const PharmIcon: React.FC<PharmIconProps> = ({ 
  icon: Icon, 
  color = 'primary', 
  size = 'md',
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  // Construct color class dynamically
  const colorClass = `text-${color}`;

  return (
    <Icon className={`${sizeClasses[size]} ${colorClass} ${className}`} />
  );
};

// Quick access to commonly used pharmaceutical icons
export const QuickIcons = {
  // Most used in pharmaceutical context
  pill: Pill,
  heart: Heart,
  microscope: Microscope,
  shield: Shield,
  truck: Truck,
  factory: Factory,
  users: Users,
  award: Award,
  globe: Globe,
  trendingUp: TrendingUp,
  brain: Brain,
  activity: Activity,
  
  // BAB Specific frequently used
  qualityCheck: ShieldCheck,
  research: FlaskConical,
  innovation: Atom,
  distribution: Package,
  support: HeartHandshake,
  compliance: BadgeCheck
};

export default PharmaceuticalIcons; 