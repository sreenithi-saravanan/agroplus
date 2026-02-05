import { useLanguage } from "@/lib/LanguageContext";
import { Button, buttonVariants } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, ScanLine, TrendingUp, Newspaper, Sprout, Camera, BadgeCheck, HandHeart } from "lucide-react";
import heroBg from "@/assets/hero-bg.png";
import { cn } from "@/lib/utils";

export default function Home() {
  const { t } = useLanguage();
  const steps = [
    {
      icon: Camera,
      title: t.home.step1Title,
      desc: t.home.step1Desc
    },
    {
      icon: BadgeCheck,
      title: t.home.step2Title,
      desc: t.home.step2Desc
    },
    {
      icon: HandHeart,
      title: t.home.step3Title,
      desc: t.home.step3Desc
    }
  ];
  const quickActions = [
    {
      href: "/scan",
      icon: ScanLine,
      title: t.home.quickScanTitle,
      desc: t.home.quickScanDesc,
      accent: "bg-green-600/10 text-green-700"
    },
    {
      href: "/prices",
      icon: TrendingUp,
      title: t.home.quickPricesTitle,
      desc: t.home.quickPricesDesc,
      accent: "bg-blue-600/10 text-blue-700"
    },
    {
      href: "/news",
      icon: Newspaper,
      title: t.home.quickNewsTitle,
      desc: t.home.quickNewsDesc,
      accent: "bg-orange-600/10 text-orange-700"
    }
  ];

  return (
    <div className="flex flex-col gap-8 md:gap-16 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-[2rem] shadow-2xl bg-primary text-primary-foreground transform transition-all hover:scale-[1.01] duration-500">
        <div className="absolute inset-0 z-0">
          <img
            src={heroBg}
            alt="Agriculture Field"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-green-900/95 to-green-800/60" />
        </div>

        <div className="relative z-10 p-8 md:p-20 flex flex-col items-start max-w-4xl pt-16 md:pt-24">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/20 backdrop-blur-sm border border-green-400/30 text-green-100 font-medium mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Sprout className="h-5 w-5" />
            <span>Smart Farming Companion</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight drop-shadow-sm text-balance">
            {t.hero.title}
          </h1>

          <p className="text-xl md:text-3xl mb-10 text-green-100 font-medium max-w-2xl leading-relaxed text-balance opacity-90">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
            <Link
              href="/scan"
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full sm:w-auto text-xl h-16 px-10 bg-secondary text-secondary-foreground hover:bg-yellow-400 border-2 border-transparent hover:border-yellow-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer rounded-2xl font-bold flex items-center justify-center gap-3"
              )}
            >
              <ScanLine className="h-7 w-7" />
              {t.hero.cta}
            </Link>
            <Link
              href="/prices"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "w-full sm:w-auto text-xl h-16 px-10 border-2 border-white/60 text-white hover:bg-white hover:text-green-900 backdrop-blur-sm transition-all cursor-pointer rounded-2xl font-bold flex items-center justify-center gap-3"
              )}
            >
              <TrendingUp className="h-7 w-7" />
              {t.hero.secondaryCta}
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="bg-white/90 border border-green-100/80 rounded-[2rem] p-6 md:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-950">
              {t.home.quickTitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mt-2">
              {t.home.quickDesc}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-800 font-semibold">
            <Sprout className="h-5 w-5" />
            <span>{t.home.quickBadge}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <div className="group cursor-pointer bg-white border-2 border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-green-300 transition-all h-full flex flex-col">
                <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${action.accent} shadow-sm mb-4`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-green-950 mb-2">{action.title}</h3>
                <p className="text-slate-600 text-lg leading-relaxed mb-4 flex-grow">{action.desc}</p>
                <span className="text-sm font-bold uppercase tracking-wide text-green-700">
                  {t.home.quickTap}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-white/90 border border-green-100/80 rounded-[2rem] p-6 md:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-950">
              {t.home.stepsTitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mt-2">
              {t.home.stepsDesc}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-800 font-semibold">
            <Sprout className="h-5 w-5" />
            <span>{t.home.stepsBadge}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-white shadow flex items-center justify-center text-green-700">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-extrabold tracking-wide uppercase text-green-700">
                  {t.home.stepLabel} {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid md:grid-cols-3 gap-8 px-2 md:px-0">
        <Link href="/prices">
          <div className="group cursor-pointer bg-white hover:bg-green-50/50 border-2 border-green-100 hover:border-green-300 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-colors" />

            <div className="h-16 w-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              <TrendingUp className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-green-950 group-hover:text-blue-800 transition-colors">
              {t.home.pricesTitle}
            </h3>

            <p className="text-slate-600 text-lg leading-relaxed mb-6 flex-grow">
              {t.home.pricesDesc}
            </p>

            <div className="flex items-center text-blue-700 font-bold text-lg group-hover:translate-x-2 transition-transform mt-auto">
              {t.home.pricesLink} <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </div>
        </Link>

        <Link href="/scan">
          <div className="group cursor-pointer bg-white hover:bg-green-50/50 border-2 border-green-100 hover:border-green-300 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-green-500/5 rounded-full blur-3xl group-hover:bg-green-500/10 transition-colors" />

            <div className="h-16 w-16 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              <ScanLine className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-green-950 group-hover:text-green-800 transition-colors">
              {t.home.scanTitle}
            </h3>

            <p className="text-slate-600 text-lg leading-relaxed mb-6 flex-grow">
              {t.home.scanDesc}
            </p>

            <div className="flex items-center text-green-700 font-bold text-lg group-hover:translate-x-2 transition-transform mt-auto">
              {t.home.scanLink} <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </div>
        </Link>

        <Link href="/news">
          <div className="group cursor-pointer bg-white hover:bg-green-50/50 border-2 border-green-100 hover:border-green-300 p-8 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors" />

            <div className="h-16 w-16 bg-orange-100 text-orange-700 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm">
              <Newspaper className="h-8 w-8" />
            </div>

            <h3 className="text-2xl font-bold mb-3 text-green-950 group-hover:text-orange-800 transition-colors">
              {t.home.newsTitle}
            </h3>

            <p className="text-slate-600 text-lg leading-relaxed mb-6 flex-grow">
              {t.home.newsDesc}
            </p>

            <div className="flex items-center text-orange-700 font-bold text-lg group-hover:translate-x-2 transition-transform mt-auto">
              {t.home.newsLink} <ArrowRight className="ml-2 h-5 w-5" />
            </div>
          </div>
        </Link>
      </section>
    </div>
  );
}
