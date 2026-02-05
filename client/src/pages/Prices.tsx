import { useLanguage } from "@/lib/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, TrendingUp, TrendingDown, Minus, Loader2, BadgeCheck } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface MarketPrice {
  id: number;
  name: string;
  nameTa: string;
  market: string;
  marketTa: string;
  price: number;
  trend: 'up' | 'down' | 'stable';
}

export default function Prices() {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const priceSteps = [
    {
      icon: Search,
      title: t.prices.step1Title,
      desc: t.prices.step1Desc
    },
    {
      icon: BadgeCheck,
      title: t.prices.step2Title,
      desc: t.prices.step2Desc
    },
    {
      icon: TrendingUp,
      title: t.prices.step3Title,
      desc: t.prices.step3Desc
    }
  ];
  const trendLegend = [
    {
      icon: TrendingUp,
      title: t.prices.trendUp,
      desc: t.prices.trendUpDesc,
      className: "bg-green-50 border-green-100 text-green-700"
    },
    {
      icon: TrendingDown,
      title: t.prices.trendDown,
      desc: t.prices.trendDownDesc,
      className: "bg-red-50 border-red-100 text-red-700"
    },
    {
      icon: Minus,
      title: t.prices.trendStable,
      desc: t.prices.trendStableDesc,
      className: "bg-yellow-50 border-yellow-100 text-yellow-700"
    }
  ];

  const { data: prices, isLoading } = useQuery<MarketPrice[]>({
    queryKey: ['/api/prices'],
  });

  const filteredPrices = prices?.filter((item) => {
    const term = searchTerm.toLowerCase();
    const name = language === 'ta' ? item.nameTa : item.name;
    const market = language === 'ta' ? item.marketTa : item.market;

    return (
      name.toLowerCase().includes(term) ||
      market.toLowerCase().includes(term)
    );
  }) || [];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 rounded-xl text-green-700 shadow-sm border border-green-200">
            <TrendingUp className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-green-950 tracking-tight">{t.prices.title}</h1>
            <p className="text-slate-600 text-lg">{t.prices.subtitle}</p>
          </div>
        </div>

        <div className="relative w-full shadow-sm rounded-2xl group focus-within:shadow-md transition-shadow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-slate-400 group-focus-within:text-green-600 transition-colors" />
          <Input
            placeholder={t.prices.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-14 h-16 text-lg rounded-2xl border-2 border-slate-200 focus-visible:ring-green-500 focus-visible:border-green-500 bg-white"
          />
        </div>

        <section className="bg-white/90 border border-green-100/80 rounded-[2rem] p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-green-950">
                {t.prices.helpTitle}
              </h2>
              <p className="text-lg text-slate-600 mt-2">
                {t.prices.helpDesc}
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-800 font-semibold">
              <BadgeCheck className="h-5 w-5" />
              <span>{t.prices.helpBadge}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {priceSteps.map((step, index) => (
              <div
                key={step.title}
                className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-11 w-11 rounded-2xl bg-white shadow flex items-center justify-center text-green-700">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-extrabold tracking-wide uppercase text-green-700">
                    {t.prices.stepLabel} {index + 1}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-green-950 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-base leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <div className="text-sm font-bold uppercase tracking-wide text-slate-500 mb-3">
              {t.prices.trendTitle}
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              {trendLegend.map((item) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-3 border rounded-2xl px-4 py-3 ${item.className}`}
                >
                  <item.icon className="h-5 w-5" />
                  <div>
                    <div className="text-sm font-bold">{item.title}</div>
                    <div className="text-xs text-slate-600">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Card className="shadow-xl border-green-100/50 bg-white/80 backdrop-blur-sm overflow-hidden rounded-3xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-green-50/80">
              <TableRow className="hover:bg-transparent border-green-100">
                <TableHead className="font-bold text-green-800 text-lg py-6 pl-6 md:pl-8 w-[30%]">{t.prices.colCrop}</TableHead>
                <TableHead className="font-bold text-green-800 text-lg py-6 hidden md:table-cell w-[30%]">{t.prices.colMarket}</TableHead>
                <TableHead className="text-right font-bold text-green-800 text-lg py-6 w-[20%]">{t.prices.colPrice}</TableHead>
                <TableHead className="text-center font-bold text-green-800 text-lg py-6 pr-6 md:pr-8 w-[20%]">{t.prices.colTrend}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-48 text-center">
                    <div className="flex flex-col items-center justify-center gap-3 h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                      <span className="text-slate-500 font-medium">{t.prices.loading}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : filteredPrices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-12 text-slate-400 text-lg">
                    {t.prices.noResults}
                  </TableCell>
                </TableRow>
              ) : (
                filteredPrices.map((item) => (
                  <TableRow key={item.id} className="hover:bg-green-50/40 border-green-50 transition-colors cursor-default">
                    <TableCell className="font-bold text-xl text-slate-800 py-5 pl-6 md:pl-8">
                      <div className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold shrink-0">
                          {language === 'ta' ? item.nameTa[0] : item.name[0]}
                        </span>
                        <div className="flex flex-col">
                          <span>{language === 'ta' ? item.nameTa : item.name}</span>
                          <span className="md:hidden text-sm font-normal text-muted-foreground">
                            {language === 'ta' ? item.marketTa : item.market}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 text-lg font-medium py-5 hidden md:table-cell">
                      {language === 'ta' ? item.marketTa : item.market}
                    </TableCell>
                    <TableCell className="text-right font-mono font-bold text-2xl text-green-700 py-5">
                      {t.prices.currencySymbol}{item.price}
                    </TableCell>
                    <TableCell className="py-5 pr-6 md:pr-8">
                      <div className="flex justify-center">
                        {item.trend === 'up' && (
                          <Badge variant="default" className="bg-green-100 hover:bg-green-200 text-green-700 border-green-200 h-8 px-3">
                            <TrendingUp className="h-4 w-4 mr-1" /> <span className="text-sm font-bold">{t.prices.trendUp}</span>
                          </Badge>
                        )}
                        {item.trend === 'down' && (
                          <Badge variant="destructive" className="bg-red-100 hover:bg-red-200 text-red-700 border-red-200 h-8 px-3">
                            <TrendingDown className="h-4 w-4 mr-1" /> <span className="text-sm font-bold">{t.prices.trendDown}</span>
                          </Badge>
                        )}
                        {item.trend === 'stable' && (
                          <Badge variant="secondary" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 border-yellow-200 h-8 px-3">
                            <Minus className="h-4 w-4 mr-1" /> <span className="text-sm font-bold">{t.prices.trendStable}</span>
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
