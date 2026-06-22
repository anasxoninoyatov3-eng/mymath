import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen, Trophy, Star, ArrowRight, Zap, Shield, Crown,
  Clock, Target, Sparkles, ChevronRight, Play
} from 'lucide-react';
import { cn } from '@/utils';
import { useNavigate } from 'react-router-dom';

interface CurriculumItem {
  level: string;
  name: string;
  description: string;
  gradient: string;
  bgLight: string;
  textAccent: string;
  borderAccent: string;
  icon: React.ElementType;
  duration: string;
  difficulty: number;
  topics: string[];
}

const curriculum: CurriculumItem[] = [
  {
    level: '1-4 sinf',
    name: 'Boshlang\'ich matematika',
    description: 'Sonlar, amallar va asosiy geometriya dunyosiga birinchi qadamlar.',
    gradient: 'from-sky-400 via-blue-500 to-blue-600',
    bgLight: 'bg-sky-50',
    textAccent: 'text-sky-600',
    borderAccent: 'border-sky-200',
    icon: Star,
    duration: 'Har kuni',
    difficulty: 1,
    topics: [
      'Natural sonlar va ular ustida amallar',
      'Ko\'paytirish jadvali sirlari',
      'Oddiy geometrik shakllar',
      'Vaqt va o\'lchov birliklari',
      'Mantiqiy masalalar',
    ],
  },
  {
    level: '5-6 sinf',
    name: 'O\'rta maktab asosi',
    description: 'Kasrlar, foizlar va algebraik ifodalar bilan tanishish.',
    gradient: 'from-emerald-400 via-green-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textAccent: 'text-emerald-600',
    borderAccent: 'border-emerald-200',
    icon: Trophy,
    duration: 'Har kuni',
    difficulty: 2,
    topics: [
      'Oddiy va o\'nli kasrlar',
      'Proportsiya va foizlar',
      'Musbat va manfiy sonlar',
      'Birinchi darajali tenglamalar',
      'Kombinatorika elementlari',
    ],
  },
  {
    level: '7-9 sinf',
    name: 'Algebra va Geometriya',
    description: 'Funksiyalar, teoremalar va fazoviy tasavvurni rivojlantirish.',
    gradient: 'from-amber-400 via-orange-500 to-rose-500',
    bgLight: 'bg-amber-50',
    textAccent: 'text-amber-600',
    borderAccent: 'border-amber-200',
    icon: Zap,
    duration: 'Har kuni',
    difficulty: 3,
    topics: [
      'Pifagor teoremasi va tatbiqlari',
      'Kvadrat tenglamalar',
      'Sinuclar va kosinuslar (Trigonometriya)',
      'Aylana va ko\'pburchaklar',
      'Funksiyalar va grafiklar',
    ],
  },
  {
    level: '10-11 sinf',
    name: 'Oliy matematikaga tayyorgarlik',
    description: 'Hosilalar, integrallar va murakkab trigonometrik funksiyalar.',
    gradient: 'from-rose-400 via-pink-500 to-fuchsia-600',
    bgLight: 'bg-rose-50',
    textAccent: 'text-rose-600',
    borderAccent: 'border-rose-200',
    icon: BookOpen,
    duration: 'Har kuni',
    difficulty: 4,
    topics: [
      'Hosila va uning tatbiqlari',
      'Integrallash asoslari',
      'Murakkab trigonometrik tenglamalar',
      'Stereometriya (Fazoviy geometriya)',
      'Ehtimollar nazariyasi',
    ],
  },
  {
    level: 'DTM/Olimpiada',
    name: 'Professional daraja',
    description: 'Kirish imtihonlari va olimpiada masalalarini yechish strategiyalari.',
    gradient: 'from-violet-500 via-purple-600 to-indigo-700',
    bgLight: 'bg-violet-50',
    textAccent: 'text-violet-600',
    borderAccent: 'border-violet-200',
    icon: Shield,
    duration: 'Har kuni',
    difficulty: 5,
    topics: [
      'Murakkab parametrli tenglamalar',
      'Logarifmik va ko\'rsatkichli ifodalar',
      'Planimetriya sirlari',
      'Sektor va segment yuzalari',
      'Matematik induksiya usuli',
    ],
  },
];

const DifficultyDots = ({ count, total = 6, accent }: { count: number; total?: number; accent: string }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: total }).map((_, i) => (
      <span
        key={i}
        className={cn('h-1.5 w-1.5 rounded-full transition-all', i < count ? accent : 'bg-slate-200')}
      />
    ))}
  </div>
);

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 260, damping: 22 } },
};

export const CoursesPage = () => {
  const [activeLevel, setActiveLevel] = useState<string>('7-9 sinf');
  const navigate = useNavigate();

  const active = curriculum.find((c) => c.level === activeLevel)!;

  const handleStartLesson = (level: string, topic: string) => {
    navigate(`/ai-tutor?level=${level}&topic=${encodeURIComponent(topic)}&auto=1`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-800/60">
      {/* ── Hero Header ─────────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-100">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -left-12 h-48 w-48 rounded-full bg-violet-100/50 blur-2xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-8"
          >
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-1.5 text-xs font-bold text-indigo-600 uppercase tracking-widest">
                <Sparkles className="h-3.5 w-3.5" />
                Dastur
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-none tracking-tight">
                Sizning <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">Kurslaringiz</span>
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base font-medium max-w-xl leading-relaxed">
                Maktab darsligidan olimpiada darajasigacha. O'zingizga mos sinfni tanlang va AI bilan bilimingizni oshiring.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 shrink-0">
              {[
                { label: 'Bosqichlar', value: '5', icon: Target },
                { label: 'Mavzular', value: '25+', icon: BookOpen },
                { label: 'AI-Powered', value: '100%', icon: Sparkles },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 rounded-xl px-5 py-3">
                  <div className="h-9 w-9 rounded-lg bg-indigo-50 flex items-center justify-center">
                    <Icon className="h-4 w-4 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 dark:text-white leading-none">{value}</div>
                    <div className="text-[10px] font-semibold text-slate-400 mt-0.5 uppercase tracking-wide">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Level Pills ─────────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-none">
            {curriculum.map((item) => {
              const Icon = item.icon;
              const isActive = item.level === activeLevel;
              return (
                <button
                  key={item.level}
                  onClick={() => setActiveLevel(item.level)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0',
                    isActive
                      ? `bg-gradient-to-r ${item.gradient} text-white shadow-md`
                      : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-100'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.level}</span>
                  <span className={cn('font-normal hidden sm:inline', isActive ? 'text-white/80' : 'text-slate-400')}>
                    {item.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

              {/* ── Left: Level Card ── */}
              <div className="lg:col-span-4 space-y-6">

                {/* Hero level badge */}
                <div className={cn('relative overflow-hidden rounded-2xl p-8 text-white bg-gradient-to-br', active.gradient)}>
                  {/* Decorative circle */}
                  <div className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/10" />
                  <div className="pointer-events-none absolute -top-6 -left-6 h-24 w-24 rounded-full bg-white/10" />

                  <div className="relative space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">Daraja</div>
                        <div className="text-4xl font-black leading-none">{active.level}</div>
                      </div>
                      <div className="h-14 w-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <active.icon className="h-7 w-7 text-white" />
                      </div>
                    </div>

                    <div>
                      <h2 className="text-2xl font-black">{active.name}</h2>
                      <p className="text-white/75 text-sm font-medium leading-relaxed mt-1.5">{active.description}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/20">
                      <div className="flex items-center gap-1.5 text-white/80 text-xs font-semibold">
                        <Clock className="h-3.5 w-3.5" />
                        {active.duration}
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-white/60 text-[10px] font-semibold uppercase tracking-wider">Murakkablik</span>
                        <DifficultyDots count={active.difficulty} accent="bg-white dark:bg-slate-900" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Other levels mini-list */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 shadow-sm p-4 space-y-1">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 pb-2">Barcha darajalar</div>
                  {curriculum.map((item) => {
                    const Icon = item.icon;
                    const isActive = item.level === activeLevel;
                    return (
                      <button
                        key={item.level}
                        onClick={() => setActiveLevel(item.level)}
                        className={cn(
                          'w-full flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 text-left',
                          isActive ? `${item.bgLight} ${item.borderAccent} border` : 'hover:bg-slate-50 dark:bg-slate-800 border border-transparent'
                        )}
                      >
                        <div className={cn(
                          'h-9 w-9 rounded-lg flex items-center justify-center shrink-0',
                          isActive ? `bg-gradient-to-br ${item.gradient}` : 'bg-slate-100'
                        )}>
                          <Icon className={cn('h-4 w-4', isActive ? 'text-white' : 'text-slate-400')} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={cn('font-bold text-sm', isActive ? item.textAccent : 'text-slate-700')}>
                            {item.level} — {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">
                            {item.topics.length} dars · {item.duration}
                          </div>
                        </div>
                        {isActive && <ChevronRight className={cn('h-4 w-4 shrink-0', item.textAccent)} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Right: Topics ── */}
              <div className="lg:col-span-8">
                <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                  {/* Header */}
                  <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn('h-9 w-9 rounded-lg flex items-center justify-center bg-gradient-to-br', active.gradient)}>
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white text-base">Mavjud darslar</h3>
                        <p className="text-[11px] text-slate-400 font-semibold">{active.level} · {active.name}</p>
                      </div>
                    </div>
                    <span className={cn(
                      'text-[11px] font-black px-3 py-1.5 rounded-full',
                      active.bgLight, active.textAccent
                    )}>
                      {active.topics.length} Mavzu
                    </span>
                  </div>

                  {/* Topics list */}
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                    className="divide-y divide-slate-50"
                  >
                    {active.topics.map((topic, index) => (
                      <motion.div
                        key={topic}
                        variants={cardVariants}
                        onClick={() => handleStartLesson(active.level, topic)}
                        className="group flex items-center gap-6 px-8 py-5 cursor-pointer hover:bg-slate-50 dark:bg-slate-800 transition-all duration-200"
                      >
                        {/* Number badge */}
                        <div className={cn(
                          'shrink-0 h-10 w-10 rounded-xl flex items-center justify-center text-xs font-black transition-all duration-300',
                          `group-hover:bg-gradient-to-br group-hover:${active.gradient} group-hover:text-white`,
                          'bg-slate-100 text-slate-400'
                        )}>
                          {(index + 1).toString().padStart(2, '0')}
                        </div>

                        {/* Topic info */}
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-slate-800 text-base truncate group-hover:text-slate-900 dark:text-white transition-colors">
                            {topic}
                          </div>
                          <div className="text-[11px] text-slate-400 font-semibold mt-0.5 flex items-center gap-2">
                            <Clock className="h-3 w-3" />
                            ~15 daqiqa · AI-tomonidan
                          </div>
                        </div>

                        {/* Start button */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStartLesson(active.level, topic);
                          }}
                          className={cn(
                            'shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300',
                            'opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0',
                            `bg-gradient-to-r ${active.gradient} text-white shadow-md`
                          )}
                        >
                          <Play className="h-3.5 w-3.5 fill-white" />
                          Boshlash
                        </button>

                        {/* Arrow (always visible) */}
                        <ArrowRight className={cn(
                          'shrink-0 h-5 w-5 transition-all duration-300',
                          'text-slate-200 group-hover:opacity-0 group-hover:translate-x-2',
                          active.textAccent
                        )} />
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Footer CTA */}
                  <div className="px-8 py-6 border-t border-slate-50 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                      Xohlagan mavzudan boshlang — AI repetitor sizning tempingizga moslashadi.
                    </p>
                    <button
                      onClick={() => handleStartLesson(active.level, active.topics[0])}
                      className={cn(
                        'flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105',
                        active.gradient
                      )}
                    >
                      <Zap className="h-4 w-4" />
                      Birinchi darsni boshlash
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
