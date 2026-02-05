import { useLanguage } from "@/lib/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, ArrowRight, Loader2 } from "lucide-react";
import { useState } from "react";

interface NewsItem {
  id: number;
  title: string;
  titleTa: string;
  summary: string;
  summaryTa: string;
  date: string;
  url?: string;
}

export default function News() {
  const { t, language } = useLanguage();
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const { data: newsItems, isLoading } = useQuery<NewsItem[]>({
    queryKey: ['/api/news'],
  });

  const toggleItem = (id: number) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  const getSourceUrl = (item: NewsItem) => {
    if (item.url) return item.url;
    const title = language === 'ta' ? item.titleTa : item.title;
    return `https://www.google.com/search?q=${encodeURIComponent(title)}`;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
      <div className="flex flex-col gap-4 border-b border-green-100 pb-6">
        <h1 className="text-4xl font-extrabold text-green-950 tracking-tight">{t.news.title}</h1>
        <p className="text-lg text-slate-600">
          {language === 'ta'
            ? "விவசாயம் சார்ந்த சமீபத்திய செய்திகள் மற்றும் அறிவிப்புகள்"
            : "Latest news, government schemes, and agricultural updates"}
        </p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 text-slate-400">
          <Loader2 className="h-10 w-10 animate-spin text-green-600 mb-4" />
          <p className="text-lg">Fetching latest agricultural updates...</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {newsItems?.map((item) => (
            <div key={item.id} className="relative">
              <Card className="flex flex-col hover:shadow-2xl transition-all duration-300 border-none shadow-md group overflow-hidden bg-white/80 backdrop-blur-sm ring-1 ring-slate-100 relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-green-500 to-green-300 opacity-80 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="pb-3 pt-6">
                <div className="flex justify-between items-start mb-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-200 border-transparent font-bold px-3 py-1">
                    {t.news.category || "General"}
                  </Badge>
                  <div className="flex items-center text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-100">
                    <CalendarDays className="h-3.5 w-3.5 mr-1.5 stroke-[2.5px]" />
                    {item.date}
                  </div>
                </div>
                <CardTitle className="leading-tight text-xl md:text-2xl font-bold text-slate-800 group-hover:text-green-800 transition-colors line-clamp-2">
                  {language === 'ta' ? item.titleTa : item.title}
                </CardTitle>
              </CardHeader>
              {expandedId === item.id && (
                <CardContent className="flex-1">
                  <p className="text-slate-600 leading-relaxed text-base">
                    {language === 'ta' ? item.summaryTa : item.summary}
                  </p>
                  <div className="mt-4">
                    <a
                      href={getSourceUrl(item)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold text-green-700 hover:text-green-900 underline underline-offset-4"
                    >
                      {t.news.sourceLabel}
                    </a>
                  </div>
                </CardContent>
              )}
              <CardFooter className="pt-4 border-t border-slate-100 mt-auto bg-slate-50/50">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="text-sm font-bold text-green-700 hover:text-green-900 flex items-center group/btn transition-colors uppercase tracking-wide"
                >
                  {expandedId === item.id ? t.news.readLess : t.news.readMore}
                  <ArrowRight className={`ml-2 h-4 w-4 transform transition-transform ${expandedId === item.id ? "rotate-90" : "group-hover/btn:translate-x-1"}`} />
                </button>
              </CardFooter>
            </Card>
            </div>
          ))}
        </div>
      )}

      {!isLoading && newsItems?.length === 0 && (
        <div className="text-center py-16 text-slate-400 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
          <p className="text-lg">{t.news.noResults}</p>
        </div>
      )}
    </div>
  );
}
