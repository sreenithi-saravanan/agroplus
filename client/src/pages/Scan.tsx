import { useLanguage } from "@/lib/LanguageContext";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, RefreshCw, CheckCircle2, AlertTriangle, Loader2, Volume2, ScanLine, BadgeCheck, HandHeart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { apiRequest } from "@/lib/queryClient";

interface ScanResult {
  crop: string;
  cropTa: string;
  disease: string;
  diseaseTa: string;
  severity: string;
  severityTa: string;
  remedy: string;
  remedyTa: string;
  confidence: number;
}

export default function Scan() {
  const { t, language } = useLanguage();
  const [isScanning, setIsScanning] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scanSteps = [
    {
      icon: Camera,
      title: t.scan.step1Title,
      desc: t.scan.step1Desc
    },
    {
      icon: ScanLine,
      title: t.scan.step2Title,
      desc: t.scan.step2Desc
    },
    {
      icon: BadgeCheck,
      title: t.scan.step3Title,
      desc: t.scan.step3Desc
    }
  ];

  const scanMutation = useMutation({
    mutationFn: async (imageBase64: string) => {
      const res = await apiRequest("POST", "/api/scan", { image: imageBase64 });
      return res.json();
    },
    onSuccess: (data) => {
      setResult(data);
      setHasResult(true);
      setIsScanning(false);
      setCameraActive(false);
    },
    onError: (error) => {
      console.error("Scan failed", error);
      setIsScanning(false);
      setCameraActive(true); // Don't close camera on error, let them try again
    }
  });

  const speakRemedy = () => {
    if (!result) return;
    const text = language === 'ta' ? result.remedyTa : result.remedy;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const startCamera = async () => {
    try {
      setCameraActive(true);
      setHasResult(false);
      setResult(null);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setCameraActive(true);
    }
  };

  const handleScan = () => {
    if (!videoRef.current) return;

    setIsScanning(true);

    // Capture Frame
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext("2d")?.drawImage(videoRef.current, 0, 0);
    const imageBase64 = canvas.toDataURL("image/jpeg");

    // Stop Stream immediately to freeze frame visual (optional, or keep it running)
    if (videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    // Send to AI
    scanMutation.mutate(imageBase64);
  };

  useEffect(() => {
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-950 tracking-tight">{t.scan.title}</h1>
        <p className="text-xl text-slate-600 max-w-xl mx-auto leading-relaxed">
          {t.scan.subtitle}
        </p>
      </div>

      <section className="bg-white/90 border border-green-100/80 rounded-[2rem] p-6 md:p-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-green-950">
              {t.scan.helpTitle}
            </h2>
            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mt-2">
              {t.scan.helpDesc}
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-800 font-semibold">
            <HandHeart className="h-5 w-5" />
            <span>{t.scan.helpBadge}</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {scanSteps.map((step, index) => (
            <div
              key={step.title}
              className="bg-gradient-to-br from-green-50 to-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-white shadow flex items-center justify-center text-green-700">
                  <step.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-extrabold tracking-wide uppercase text-green-700">
                  {t.scan.stepLabel} {index + 1}
                </span>
              </div>
              <h3 className="text-xl font-bold text-green-950 mb-2">{step.title}</h3>
              <p className="text-slate-600 text-lg leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] md:aspect-video min-h-[65vh] sm:min-h-0 bg-slate-100 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl flex items-center justify-center group ring-1 ring-slate-200">
        {!cameraActive && !hasResult && (
          <div className="text-center p-6 sm:p-8 flex flex-col items-center gap-6 sm:gap-8 max-w-md w-full z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 bg-white rounded-full flex items-center justify-center shadow-lg mb-2 group-hover:scale-105 transition-transform duration-500">
              <Camera className="h-12 w-12 sm:h-14 sm:w-14 text-green-600" />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800">
                {t.scan.cameraTitle}
              </h3>
              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xs mx-auto">
                {t.scan.cameraDesc}
              </p>
            </div>

            <Button
              size="lg"
              onClick={startCamera}
              className="w-full h-14 sm:h-16 text-lg sm:text-xl rounded-2xl bg-green-600 hover:bg-green-700 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 font-bold"
            >
              <ScanLine className="mr-3 h-6 w-6" />
              {t.scan.start}
            </Button>
          </div>
        )}

        {cameraActive && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute left-4 right-4 top-4 sm:left-6 sm:right-auto sm:max-w-sm pointer-events-none">
              <div className="bg-black/55 text-white rounded-2xl px-4 py-3 backdrop-blur-md shadow-lg pt-[env(safe-area-inset-top)]">
                <div className="text-[0.7rem] uppercase tracking-[0.2em] font-bold text-white/80">
                  {t.scan.tipTitle}
                </div>
                <div className="mt-2 space-y-1 text-sm sm:text-base leading-snug">
                  <p>• {t.scan.tip1}</p>
                  <p>• {t.scan.tip2}</p>
                  <p>• {t.scan.tip3}</p>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-end p-4 sm:p-6 md:p-10 pb-[calc(env(safe-area-inset-bottom)+1.5rem)] sm:pb-8 md:pb-10 bg-gradient-to-t from-black/60 via-transparent to-black/10">
              {isScanning ? (
                <div className="bg-white/95 backdrop-blur-md text-slate-800 px-5 py-4 sm:px-8 sm:py-6 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                  <div className="relative">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                    <div className="absolute inset-0 bg-green-400/20 blur-lg rounded-full animate-pulse" />
                  </div>
                  <span className="font-bold text-lg sm:text-xl">{t.scan.scanning}</span>
                </div>
              ) : (
                <Button
                  size="lg"
                  onClick={handleScan}
                  className="w-full sm:max-w-xs h-16 sm:h-20 text-lg sm:text-xl rounded-full bg-white text-green-700 hover:bg-white/90 shadow-2xl border-4 border-green-500/30 transition-all hover:scale-105"
                >
                  <div className="h-6 w-6 rounded-full bg-red-500 animate-pulse mr-3 shadow-[0_0_10px_rgba(239,68,68,0.6)]" />
                  {t.scan.captureBtn}
                </Button>
              )}
            </div>

            {/* Guide Lines */}
            <div className="absolute inset-0 pointer-events-none p-6 sm:p-10 md:p-12 opacity-50">
              <div className="border-[3px] border-dashed border-white/70 w-full h-full rounded-3xl" />
            </div>
          </>
        )}

        {hasResult && result && (
          <div className="absolute inset-0 bg-slate-50/95 backdrop-blur-md p-4 sm:p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-10 duration-500">
            <div className="h-full flex flex-col items-center justify-center max-w-lg mx-auto py-6 sm:py-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 shadow-md ring-4 ring-green-50">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-green-950">{t.scan.resultTitle}</h2>

              <Card className="w-full mb-8 border-green-100 shadow-xl overflow-hidden rounded-3xl bg-white">
                <CardHeader className="bg-green-50/80 pb-4 border-b border-green-100">
                  <CardTitle className="text-xl flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-green-900">
                    <span className="font-bold text-2xl">{language === 'ta' ? result.cropTa : result.crop}</span>
                    <span className="text-sm font-semibold text-green-700 bg-white px-3 py-1.5 rounded-lg border border-green-200 shadow-sm">
                      {result.confidence}% {t.scan.confidence}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6 space-y-6">
                  <div className="space-y-2 p-4 bg-red-50 rounded-2xl border border-red-100">
                    <label className="text-xs font-bold uppercase text-red-400 tracking-wider flex items-center gap-2">
                      <AlertTriangle className="h-3 w-3" /> {t.scan.disease}
                    </label>
                    <div className="text-2xl font-bold text-red-700">
                      {language === 'ta' ? result.diseaseTa : result.disease}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                      <label className="text-xs font-bold uppercase text-orange-400 tracking-wider">{t.scan.severity}</label>
                      <div className="text-xl font-bold text-orange-700">
                        {language === 'ta' ? result.severityTa : result.severity}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border border-dashed">
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-sm font-bold uppercase text-slate-400 tracking-wider block">{t.scan.remedy}</label>
                      <Button variant="outline" size="sm" onClick={speakRemedy} className="h-9 px-3 text-green-700 border-green-200 hover:bg-green-50 hover:text-green-800 rounded-lg font-medium">
                        <Volume2 className="h-4 w-4 mr-2" />
                        {t.scan.speak}
                      </Button>
                    </div>
                    <div className="bg-green-50 p-5 rounded-2xl border border-green-100">
                      <p className="text-lg leading-relaxed text-slate-700">
                        {language === 'ta' ? result.remedyTa : result.remedy}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button onClick={startCamera} size="lg" variant="outline" className="w-full h-14 text-lg border-2 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border-slate-200">
                <RefreshCw className="mr-2 h-5 w-5" />
                {t.scan.retake}
              </Button>
            </div>
          </div>
        )}
      </div>

      <Alert className="bg-yellow-50 border-yellow-200 rounded-2xl p-6 shadow-sm">
        <div className="flex gap-4 items-start">
          <div className="p-2 bg-yellow-100 rounded-full shrink-0 text-yellow-700 mt-1">
            <AlertTriangle className="h-5 w-5" />
          </div>
          <div className="space-y-1">
            <AlertTitle className="text-lg font-bold text-yellow-900 mb-2">{t.scan.disclaimerTitle}</AlertTitle>
            <AlertDescription className="text-yellow-800/80 text-base leading-relaxed">
              {t.scan.disclaimerDesc}
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </div>
  );
}
