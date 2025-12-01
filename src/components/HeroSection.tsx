'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Local components
import { AuroraBackground } from '@/components/ui/aurora-background';
import { FlipWordsSimple } from '@/components/ui/flip-words-simple';
import  OpenInMapsButton from "@/components/OpenInMapsButton";

// ------------------------------------
// Types
// ------------------------------------
const FLIP_DURATION = 2000;
type StatTranslation = {
  number: string[];
  label: string[];
};

type Translation = {
  headline: string[];
  subtitle: string[];
  madeSimple: string[];
  stats: StatTranslation[];
  cta: string[];
};

// ------------------------------------
// Component
// ------------------------------------

export default function HeroSection() {
  // Languages shown in the large animated title
  const languages = ['English', 'हिंदी', 'অসমীয়া', 'বাংলা'];

  // Text variants per language
  const translations: Record<string, Translation> = {
    English: {
      headline: ['DPR ASSESSMENT IN', 'PROJECT ANALYSIS IN', 'DETAILED REPORT IN'],
      subtitle: [
        'AI-powered project evaluation supporting all Northeast Indian languages and communities',
        "Smart project insights across India's Northeast states",
        'Empowering regional innovation with AI-driven assessments',
      ],
      madeSimple: ['MADE SIMPLE', 'SIMPLIFIED FOR YOU', 'FASTER. SMARTER. EASIER.'],
      stats: [
        {
          number: ['120+', '150+', '200+'],
          label: ['Projects Evaluated', 'Projects Reviewed', 'Assessments Completed'],
        },
        {
          number: ['8', '9', '7'],
          label: ['States Covered', 'Regions Reached', 'Zones Supported'],
        },
        {
          number: ['5+', '10+', '15+'],
          label: ['Schemes Supported', 'Government Schemes', 'Development Initiatives'],
        },
      ],
      cta: ['Start Assessment', 'Begin Now', "Let\'s Go"],
    },

    हिंदी: {
      headline: ['डीपीआर मूल्यांकन', 'परियोजना विश्लेषण', 'विस्तृत रिपोर्ट'],
      subtitle: [
        'पूर्वोत्तर भारत की सभी भाषाओं और समुदायों के लिए एआई-संचालित परियोजना मूल्यांकन',
        'पूर्वोत्तर राज्यों में स्मार्ट परियोजना अंतर्दृष्टि',
        'एआई-आधारित आकलनों के साथ क्षेत्रीय नवाचार को सशक्त बनाना',
      ],
      madeSimple: ['आसान बनाया गया', 'आपके लिए सरल', 'तेज़. स्मार्ट. आसान.'],
      stats: [
        {
          number: ['१२०+', '१५०+', '२००+'],
          label: ['परियोजनाओं का मूल्यांकन', 'परियोजनाओं की समीक्षा', 'पूर्ण आकलन'],
        },
        {
          number: ['८', '९', '७'],
          label: ['राज्य कवर', 'क्षेत्र पहुँचे', 'क्षेत्र समर्थित'],
        },
        {
          number: ['५+', '१०+', '१५+'],
          label: ['योजनाएं समर्थित', 'सरकारी योजनाएं', 'विकास पहल'],
        },
      ],
      cta: ['मूल्यांकन शुरू करें', 'अभी प्रारंभ करें', 'चलिए शुरू करें'],
    },

    অসমীয়া: {
      headline: ['ডিপিআৰ মূল্যায়ন', 'প্ৰকল্প বিশ্লেষণ', 'বিস্তারিত প্ৰতিবেদন'],
      subtitle: [
        'উত্তৰ পূৰ্ব ভাৰতৰ সকলো ভাষা আৰু সমাজৰ বাবে AI-ভিত্তিক প্ৰকল্প মূল্যায়ন',
        'উত্তৰ পূৰ্ব ৰাজ্যসমূহত বুদ্ধিমান প্ৰকল্প অন্তৰ্দৃষ্টি',
        'AI-চালিত মূল্যায়নৰ জৰিয়তে আঞ্চলিক উদ্ভাৱন শক্তিশালীকৰণ',
      ],
      madeSimple: ['সহজ কৰা হৈছে', 'আপোনাৰ বাবে সহজ', 'দ্ৰুত. বুদ্ধিমান. সহজ.'],
      stats: [
        {
          number: ['১২০+', '১৫০+', '২০০+'],
          label: ['প্ৰকল্প মূল্যায়ন', 'প্ৰকল্প পৰ্যালোচনা', 'সম্পন্ন মূল্যায়ন'],
        },
        {
          number: ['৮', '৯', '৭'],
          label: ['আবৃত ৰাজ্য', 'পৌঁছা অঞ্চল', 'সমৰ্থিত জোন'],
        },
        {
          number: ['৫+', '১০+', '১৫+'],
          label: ['সমৰ্থিত আঁচনি', 'সরকাৰী আঁচনি', 'বিকাশ উদ্যোগ'],
        },
      ],
      cta: ['মূল্যায়ন আৰম্ভ কৰক', 'এতিয়া আৰম্ভ কৰক', 'চলো যাওঁ'],
    },

    বাংলা: {
      headline: ['ডিপিআর মূল্যায়ন', 'প্রকল্প বিশ্লেষণ', 'বিস্তারিত প্রতিবেদন'],
      subtitle: [
        'উত্তর-পূর্ব ভারতের সব ভাষা ও সম্প্রদায়ের জন্য এআই-চালিত প্রকল্প মূল্যায়ন',
        'উত্তর-পূর্ব রাজ্যগুলিতে স্মার্ট প্রকল্প অন্তর্দৃষ্টি',
        'এআই-চালিত মূল্যায়নের মাধ্যমে আঞ্চলিক উদ্ভাবনকে শক্তিশালী করা',
      ],
      madeSimple: ['সহজ করে তোলা', 'আপনার জন্য সহজ', 'দ্রুত. স্মার্ট. সহজ.'],
      stats: [
        {
          number: ['১২০+', '১৫০+', '২০০+'],
          label: ['মূল্যায়িত প্রকল্প', 'সমীক্ষিত প্রকল্প', 'সম্পূর্ণ মূল্যায়ন'],
        },
        {
          number: ['৮', '৯', '৭'],
          label: ['রাজ্য কভার', 'অঞ্চল পৌঁছেছে', 'সমর্থিত অঞ্চল'],
        },
        {
          number: ['৫+', '১০+', '১৫+'],
          label: ['সহায়ক প্রকল্প', 'সরকারি প্রকল্প', 'উন্নয়ন উদ্যোগ'],
        },
      ],
      cta: ['মূল্যায়ন শুরু করুন', 'এখনই শুরু করুন', 'চলুন যাই'],
    },
  };

  // Index of currently active language in the "languages" array
  const [activeLangIndex, setActiveLangIndex] = useState(0);
  const currentLang = languages[activeLangIndex];

  // Selected translation set for current language
  const t = translations[currentLang];

  // Cycle through languages every 2.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLangIndex((prev) => (prev + 1) % languages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [languages.length]);

  // Safety check (should never hit, but avoids runtime errors)
  if (!t?.headline) {
    return null;
  }

  return (
    <AuroraBackground id="home" className="relative h-screen w-full overflow-hidden">
    {/* Subtle static map overlay above slideshow for extra texture */}
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
    <img
    src="/images/northeast-map.svg"
    alt="Northeast India Map"
    className="w-full h-full object-cover"
    />
    </div>

    {/* Main hero content wrapper */}
    <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8, ease: 'easeInOut' }}
    className="relative z-10 flex flex-col items-center justify-center h-full w-full px-6 pt-16"
    >
    {/* Centered container for the glass card */}
    <div className="flex w-full justify-center text-center">
    {/* Width-constrained container */}
    <div className="w-full max-w-4xl">
    {/* Glass card wrapping ALL hero content */}
    <div
    className="
    rounded-3xl
    bg-black/70
    backdrop-blur-md
    border border-white/10
    shadow-[0_18px_45px_rgba(0,0,0,0.75)]
    px-6 py-6
    sm:px-10 sm:py-8
    space-y-6
    "
    >
    {/* Main title / headline block */}
    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight space-y-2">
    {/* Top line: rotating phrase (DPR, Project Analysis, etc.) */}
    <FlipWordsSimple
    words={t.headline, languages}
    duration={FLIP_DURATION}
    className="text-white"
    />

    {/* Big language name in gradient (English / Hindi / etc.) */}
    <div className="flex justify-center items-center min-h-[4.5rem] lg:min-h-[5.5rem] py-2">
    <FlipWordsSimple
    words={languages}
    duration={FLIP_DURATION}
    className="
    bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
    bg-clip-text text-transparent
    font-bold
    text-5xl sm:text-6xl lg:text-7xl
    "
    />
    </div>

    {/* "Made simple" rotating tagline */}
    <FlipWordsSimple
    words={t.madeSimple}
    duration={FLIP_DURATION}
    className="text-white text-lg sm:text-xl tracking-[0.15em] uppercase"
    />
    </h1>

    {/* Subtitle (now fully constrained inside the card) */}
    <p
    className="
    mx-auto
    max-w-full
    text-base sm:text-lg md:text-xl
    text-gray-200
    leading-relaxed
    "
    >
    <FlipWordsSimple
    words={t.subtitle}
    duration={FLIP_DURATION}
    className="text-gray-200"
    />
    </p>

    {/* Stats row (projects, states, schemes, etc.) */}
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-6 text-white text-center">
    {t.stats.map((item, index) => (
      <div
      key={index}
      className="drop-shadow-[0_2px_6px_rgba(0,0,0,0.7)]"
      >
      <h2 className="text-3xl sm:text-4xl font-bold">
      <FlipWordsSimple words={item.number} duration={FLIP_DURATION} />
      </h2>
      <p className="text-xs sm:text-sm opacity-80">
      <FlipWordsSimple words={item.label} duration={FLIP_DURATION} />
      </p>
      </div>
    ))}
    </div>

    {/* Primary CTA button */}
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3, duration: 0.8 }}
    className="mt-8"
    >
    <Link
    href="/login"
    className="
    inline-flex items-center justify-center
    px-8 py-3
    rounded-lg
    bg-white text-gray-900 font-semibold
    shadow-lg hover:shadow-xl
    transition-all duration-300
    hover:bg-gray-100 hover:scale-105
    "
    >
    <FlipWordsSimple
    words={t.cta}
    duration={FLIP_DURATION}
    className="text-gray-900 font-semibold"
    />
    <ArrowRightIcon className="ml-2 h-5 w-5" />
    </Link>
    </motion.div>
    </div>
    </div>
    </div>
    </motion.div>
    </AuroraBackground>
  );
}
