import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/Button';
import { Card, CardContent } from '@/Card';
import { motion } from 'framer-motion';
import { useUserStore } from '@/userStore';
import {
   Globe,
   ChevronRight, CheckCircle2, Sparkles, BookOpen, TrendingUp
} from 'lucide-react';

export const HomePage = () => {
   const { isAuthenticated } = useUserStore();
   const navigate = useNavigate();

   useEffect(() => {
      if (isAuthenticated) {
         navigate('/dashboard');
      }
   }, [isAuthenticated, navigate]);
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: { staggerChildren: 0.1, delayChildren: 0.2 }
      }
   };

   const itemVariants: any = {
      visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
   };

   return (
      <div className="min-h-screen bg-white dark:bg-slate-900 selection:bg-indigo-600 selection:text-white">
         {/* Navigation */}
         <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between transition-all">
            <div className="flex items-center gap-2 md:gap-3">
               <div className="h-7 w-7 md:h-8 md:w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                  M
               </div>
               <span className="text-lg md:text-xl font-bold text-slate-900 dark:text-white tracking-tight">MyMath AI</span>
            </div>

            <div className="hidden lg:flex items-center gap-10">
               <a href="#features" className="text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Imkoniyatlar</a>
               <a href="#about" className="text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Haqida</a>
               <a href="#community" className="text-[10px] font-bold text-slate-500 dark:text-slate-400 hover:text-indigo-600 transition-colors uppercase tracking-widest">Hamjamiyat</a>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
               <Button asChild variant="ghost" className="px-3 md:px-4 font-semibold text-sm text-slate-600 dark:text-slate-300">
                  <Link to="/login">Kirish</Link>
               </Button>
               <Button asChild className="rounded-lg h-9 md:h-10 px-4 md:px-6 text-sm font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                  <Link to="/register">Boshlash</Link>
               </Button>
            </div>
         </nav>

         <main>
            {/* Hero Section */}
            <section className="relative pt-32 md:pt-64 pb-20 md:pb-48 px-4 md:px-6 bg-slate-50 dark:bg-slate-800/50">
               <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
                  <motion.div
                     variants={containerVariants}
                     initial="hidden"
                     animate="visible"
                     className="space-y-6 md:space-y-8"
                  >
                     <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[10px] md:text-xs font-bold text-indigo-600 shadow-sm">
                        Yangi avlod matematika o'rganish tizimi
                     </motion.div>

                     <motion.h1 variants={itemVariants} className="text-[clamp(2rem,10vw,5rem)] font-bold text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.1] tracking-tight">
                        <span className="text-indigo-600">Matematika</span> olamini <br />
                        biz bilan zabt eting.
                     </motion.h1>

                     <motion.p variants={itemVariants} className="text-lg md:text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto px-4">
                        Matematikani o'rganishning aqlli usulini kashf eting. 1-dan 11-sinfgacha bo'lgan
                        o'quvchilar uchun eng yuqori natijalarga erishish uchun mo'ljallangan.
                     </motion.p>

                     <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 md:pt-8 w-full max-w-md mx-auto">
                        <Button size="lg" className="h-14 px-8 md:px-10 rounded-lg text-lg font-bold bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg group w-full sm:w-auto">
                           <Link to="/register" className="flex items-center justify-center gap-2">
                              Hozir boshlash <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                           </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="h-14 px-8 md:px-10 rounded-lg text-lg font-semibold border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:bg-slate-800 w-full sm:w-auto">
                           <Link to="/courses">Kurslarni ko'rish</Link>
                        </Button>
                     </motion.div>

                     <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8 md:pt-12">
                        <div className="flex -space-x-2">
                           {[1, 2, 3, 4].map(i => (
                              <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} className="h-8 w-8 md:h-10 md:w-10 rounded-full border-2 border-white bg-slate-100" />
                           ))}
                        </div>
                        <p className="text-xs md:text-sm font-bold text-slate-400">Bizning global hamjamiyatimiz bilan matematikani o'rganing</p>
                     </motion.div>
                  </motion.div>
               </div>
            </section>

            {/* Features Showcase */}
            <section id="features" className="py-40 bg-white dark:bg-slate-900">
               <div className="max-w-6xl mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                     <div className="space-y-10">
                        <div className="h-12 w-12 rounded-xl bg-indigo-50 flex items-center justify-center">
                           <Sparkles className="h-6 w-6 text-indigo-600" />
                        </div>
                        <h2 className="text-4xl font-bold text-slate-900 dark:text-white leading-tight">
                           Shaxsiy AI<br />
                           <span className="text-indigo-600">Matematika Repetitori.</span>
                        </h2>
                        <p className="text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                           Bizning intellektual platformamiz sizning darajangizga moslashadi, murakkab masalalarni yechishda,
                           teoremalarni o'zlashtirishda va mantiqni real vaqtda rivojlantirishda yordam beradi.
                        </p>
                        <div className="grid grid-cols-1 gap-5">
                           {[
                              "Moslashuvchan o'quv yo'nalishlari",
                              "Real vaqtda masalalar tahlili",
                              "Interaktiv muloqot mashqlari"
                           ].map(text => (
                              <div key={text} className="flex items-center gap-4">
                                 <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                                 <span className="text-lg font-bold text-slate-800 dark:text-white">{text}</span>
                              </div>
                           ))}
                        </div>
                     </div>

                     <div className="relative">
                        <div className="absolute -inset-10 bg-indigo-50 rounded-full blur-[100px] opacity-40" />
                        <Card className="border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl overflow-hidden relative bg-white dark:bg-slate-900">
                           <div className="h-10 bg-slate-50 dark:bg-slate-800 flex items-center gap-1.5 px-6 border-b border-slate-200 dark:border-slate-800">
                              <div className="h-2 w-2 rounded-full bg-slate-300" />
                              <div className="h-2 w-2 rounded-full bg-slate-300" />
                              <div className="h-2 w-2 rounded-full bg-slate-300" />
                           </div>
                           <CardContent className="p-10 space-y-8">
                              <div className="space-y-2">
                                 <div className="text-xs font-semibold text-slate-400">Namuna kirish</div>
                                 <div className="text-xl font-bold text-slate-800 dark:text-white leading-snug">"Men funksiyalar mavzusini yaxshiroq tushunmoqchiman."</div>
                              </div>

                              <div className="relative py-1">
                                 <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t border-slate-100" />
                                 <div className="relative mx-auto h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-md">
                                    <Sparkles className="h-5 w-5 text-white" />
                                 </div>
                              </div>

                              <div className="p-6 rounded-xl bg-indigo-50 dark:bg-slate-800 border border-indigo-100 dark:border-slate-700 space-y-3">
                                 <div className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">AI Fikr-mulohazasi</div>
                                 <div className="text-indigo-950 dark:text-indigo-100 font-semibold text-lg leading-tight">
                                    "Ajoyib maqsad! Keling, <span className="text-indigo-600 dark:text-indigo-400">Grafiklar tahlili</span> va <span className="text-indigo-600 dark:text-indigo-400">Hosilaning ma'nosi</span>ga e'tibor qaratamiz."
                                 </div>
                              </div>
                           </CardContent>
                        </Card>
                     </div>
                  </div>
               </div>
            </section>

            {/* Benefits Section */}
            <section className="py-40 bg-slate-50 dark:bg-slate-800/30">
               <div className="max-w-6xl mx-auto px-6">
                  <div className="text-center mb-24 space-y-4">
                     <h2 className="text-4xl font-bold text-slate-900 dark:text-white">Nega <span className="text-indigo-600">MyMath</span> ni tanlash kerak?</h2>
                     <p className="text-lg text-slate-600 dark:text-slate-300 font-medium">Yangi avlod muammo yechuvchilari uchun yaratilgan.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                     {[
                        { title: 'Interaktiv darslar', desc: 'Sizning jadvalingizga mos keladigan, boshlang\'ichdan yuqori darajagacha bo\'lgan kontent.', icon: BookOpen },
                        { title: 'Madaniy kontekst', desc: 'Faqat formulalarni emas, balki har qanday vaziyatda o\'zingizni mantiqiy ifoda etishni o\'rganing.', icon: Globe },
                        { title: 'Haqiqiy o\'sish', desc: 'Batafsil tahlillar va shaxsiy marralar bilan taraqqiyotingizni kuzatib boring.', icon: TrendingUp }
                     ].map((feature) => (
                        <Card key={feature.title} className="p-10 border-none shadow-sm rounded-xl bg-white dark:bg-slate-900 space-y-8 hover:shadow-xl transition-shadow duration-500">
                           <div className="h-14 w-14 rounded-2xl flex items-center justify-center bg-indigo-50 text-indigo-600">
                              <feature.icon className="h-7 w-7" />
                           </div>
                           <div className="space-y-4">
                              <h3 className="text-xl font-bold text-slate-900 dark:text-white">{feature.title}</h3>
                              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{feature.desc}</p>
                           </div>
                        </Card>
                     ))}
                  </div>
               </div>
            </section>

            {/* Call to Action */}
            <section className="py-64 px-6 text-center bg-white dark:bg-slate-900 relative overflow-hidden">
               <div className="max-w-4xl mx-auto space-y-12 relative z-10">
                  <h2 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
                     Matematikani o'rganishga <br />
                     <span className="text-indigo-600">tayyormisiz?</span>
                  </h2>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                     <Button size="lg" className="h-18 px-14 rounded-full text-xl font-bold bg-indigo-600 text-white shadow-2xl shadow-indigo-100 hover:bg-indigo-700 w-full sm:w-auto">
                        <Link to="/register">Hisob yaratish</Link>
                     </Button>
                  </div>
               </div>
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-50 rounded-full blur-[120px] opacity-30 -z-0" />
            </section>
         </main>

         <footer className="py-20 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0f172a]">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
               <div className="flex items-center gap-3">
                  <div className="h-6 w-8 rounded bg-indigo-600 flex items-center justify-center text-white font-black text-[10px]">MATH</div>
                  <span className="text-sm font-bold text-slate-800 dark:text-white tracking-tight">MyMath AI</span>
               </div>
               <div className="flex flex-col md:items-end gap-2">
                  <p className="text-xs font-bold text-slate-400">Matematikani o'rganish, mantiqan.</p>
                  <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2026 MyMath AI. Barcha huquqlar himoyalangan.</p>
               </div>
            </div>
         </footer>
      </div>
   );
};
