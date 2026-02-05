import { useLanguage } from "@/lib/LanguageContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Brain, UserCheck, Smartphone, ShieldCheck, ChevronRight, CheckCircle } from "lucide-react";

export default function Roadmap() {
  const { t } = useLanguage();

  const steps = [
    {
      icon: <Database className="h-8 w-8 text-blue-600" />,
      title: t.report.backend,
      desc: t.report.backendDesc,
      outcome: "Moves AgroPulse+ from frontend-only → full-stack system.",
      color: "bg-blue-50/50 border-blue-100 hover:border-blue-300"
    },
    {
      icon: <Brain className="h-8 w-8 text-purple-600" />,
      title: t.report.aiModel,
      desc: t.report.aiModelDesc,
      outcome: "Transforms “AI simulation” → real AI-powered diagnosis.",
      color: "bg-purple-50/50 border-purple-100 hover:border-purple-300"
    },
    {
      icon: <UserCheck className="h-8 w-8 text-green-600" />,
      title: t.report.farmerIntel,
      desc: t.report.farmerIntelDesc,
      outcome: "AgroPulse+ becomes a decision-support system.",
      color: "bg-green-50/50 border-green-100 hover:border-green-300"
    },
    {
      icon: <Smartphone className="h-8 w-8 text-orange-600" />,
      title: t.report.ruralReady,
      desc: t.report.ruralReadyDesc,
      outcome: "Usable in low-connectivity rural environments.",
      color: "bg-orange-50/50 border-orange-100 hover:border-orange-300"
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-12">
      <div className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-950 tracking-tight">{t.report.title}</h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          {t.report.nextSteps}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {steps.map((step, idx) => (
          <Card key={idx} className={`border-2 ${step.color} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group bg-white/80 backdrop-blur-sm`}>
            <CardHeader className="flex flex-row items-center gap-5 space-y-0 pb-4">
              <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <CardTitle className="text-2xl font-bold text-slate-800">{step.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-slate-600 leading-relaxed text-lg">{step.desc}</p>
              <div className="flex items-start text-sm font-bold text-slate-700 bg-white/60 p-4 rounded-xl border border-slate-200/50">
                <CheckCircle className="h-5 w-5 mr-3 text-green-600 shrink-0 mt-0.5" />
                <span>{step.outcome}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative mt-12">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl opacity-5 blur-2xl transform scale-95" />
        <Card className="bg-white border-2 border-green-100 shadow-xl overflow-hidden relative z-10">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
            <ShieldCheck className="h-64 w-64" />
          </div>
          <CardHeader className="pb-4 pt-8 px-8">
            <CardTitle className="flex items-center gap-4 text-3xl font-bold text-green-900">
              <div className="p-3 bg-green-100 rounded-xl text-green-700">
                <ShieldCheck className="h-10 w-10" />
              </div>
              {t.report.ethics}
            </CardTitle>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <p className="text-slate-600 leading-relaxed max-w-5xl text-lg">
              {t.report.ethicsDesc}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
