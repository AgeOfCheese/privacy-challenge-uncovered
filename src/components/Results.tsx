import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Eye, 
  Cookie as CookieIcon, // Renamed to avoid conflict with document.cookie
  FileText, 
  Monitor, 
  Globe, 
  Users, 
  BarChart3,
  RefreshCw,
  Download,
  DatabaseZap // Added for Firebase interaction
} from "lucide-react";
import { db } from "@/firebase"; // Import Firestore instance
import { doc, getDoc, setDoc, increment, runTransaction } from "firebase/firestore";

interface ResultsProps {
  quizData: any;
  cookieConsent: boolean | null;
  tosAccepted: boolean | null;
  onRestart: () => void;
}

interface SiteStats {
  totalUsers: number;
  cookieAcceptanceCount: number; // Store count for calculating percentage
  tosAcceptanceCount: number; // Store count for calculating percentage
  totalQuizScore: number; // Sum of all quiz scores
  totalQuizzesTaken: number; // Count of quizzes taken
}

const Results = ({ quizData, cookieConsent, tosAccepted, onRestart }: ResultsProps) => {
  const [browserInfo, setBrowserInfo] = useState<any>({});
  const [siteStats, setSiteStats] = useState<SiteStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  useEffect(() => {
    const info = {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      colorDepth: screen.colorDepth,
      language: navigator.language,
      platform: navigator.platform,
      cookiesEnabled: navigator.cookieEnabled,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timestamp: new Date().toISOString()
    };
    setBrowserInfo(info);
    console.log('Browser data collected:', info);

    // Fetch and update site statistics from Firebase
    const statsDocRef = doc(db, "quizStats", "global");

    const updateAndFetchStats = async () => {
      setIsLoadingStats(true);
      try {
        await runTransaction(db, async (transaction) => {
          const statsDoc = await transaction.get(statsDocRef);
          let newStats: SiteStats;

          if (!statsDoc.exists()) {
            newStats = {
              totalUsers: 1,
              cookieAcceptanceCount: cookieConsent ? 1 : 0,
              tosAcceptanceCount: tosAccepted ? 1 : 0,
              totalQuizScore: quizData.score,
              totalQuizzesTaken: 1,
            };
          } else {
            const currentStats = statsDoc.data() as SiteStats;
            newStats = {
              totalUsers: currentStats.totalUsers + 1,
              cookieAcceptanceCount: currentStats.cookieAcceptanceCount + (cookieConsent ? 1 : 0),
              tosAcceptanceCount: currentStats.tosAcceptanceCount + (tosAccepted ? 1 : 0),
              totalQuizScore: currentStats.totalQuizScore + quizData.score,
              totalQuizzesTaken: currentStats.totalQuizzesTaken + 1,
            };
          }
          transaction.set(statsDocRef, newStats);
          setSiteStats(newStats); // Update local state immediately after transaction
        });
      } catch (error) {
        console.error("Error updating site statistics: ", error);
        // Fallback to fetching if transaction fails or to ensure UI updates
        const docSnap = await getDoc(statsDocRef);
        if (docSnap.exists()) {
          setSiteStats(docSnap.data() as SiteStats);
        } else {
          // Initialize if doc doesn't exist after failed transaction (should ideally not happen)
           setSiteStats({
            totalUsers: 1,
            cookieAcceptanceCount: cookieConsent ? 1 : 0,
            tosAcceptanceCount: tosAccepted ? 1 : 0,
            totalQuizScore: quizData.score,
            totalQuizzesTaken: 1,
           });
        }
      } finally {
        setIsLoadingStats(false);
      }
    };

    updateAndFetchStats();

  }, [quizData, cookieConsent, tosAccepted]);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-400 bg-green-900/30 border-green-700/50";
    if (percentage >= 60) return "text-yellow-400 bg-yellow-900/30 border-yellow-700/50";
    return "text-red-400 bg-red-900/30 border-red-700/50";
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 80) return "🏆";
    if (percentage >= 60) return "👍";
    return "📚";
  };
  
  const calculatePercentage = (count: number | undefined, total: number | undefined) => {
    if (total === 0 || count === undefined || total === undefined) return 0;
    return Math.round((count / total) * 100);
  };

  const cookieAcceptancePercentage = siteStats ? calculatePercentage(siteStats.cookieAcceptanceCount, siteStats.totalUsers) : 0;
  const tosAcceptancePercentage = siteStats ? calculatePercentage(siteStats.tosAcceptanceCount, siteStats.totalUsers) : 0;
  const avgQuizScorePercentage = siteStats && siteStats.totalQuizzesTaken > 0 
    ? Math.round((siteStats.totalQuizScore / (siteStats.totalQuizzesTaken * quizData.totalQuestions)) * 100) 
    : 0;


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8 text-gray-300">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/20 rounded-full mb-6 border border-red-800/30">
            <Trophy className="w-10 h-10 text-red-400" />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Quiz Complete!</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Here's what this demo learned about you and our collective stats.
          </p>
        </div>

        <div className="grid gap-8">
          {/* Quiz Score */}
          <Card className="shadow-xl border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Your Quiz Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className={`text-6xl font-bold p-6 rounded-2xl border-2 ${getScoreColor(quizData.percentage)}`}>
                  {quizData.score}/{quizData.totalQuestions}
                </div>
                <div className="text-center sm:text-left">
                  <div className="text-4xl mb-2">{getScoreIcon(quizData.percentage)}</div>
                  <div className="text-3xl font-bold text-white mb-1">
                    {quizData.percentage}% Correct
                  </div>
                  <p className="text-gray-400">
                    {quizData.percentage >= 80 ? "Excellent privacy knowledge!" :
                     quizData.percentage >= 60 ? "Good understanding of privacy basics!" :
                     "Room for improvement in privacy awareness."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection Reveal */}
          <Card className="shadow-xl border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-white">
                <Eye className="w-6 h-6 text-purple-400" />
                What This Demo Learned About You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-white mb-3">Your Consent Choices</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <CookieIcon className="w-5 h-5 text-orange-400" />
                    <span className="font-medium text-gray-300">Cookie Consent:</span>
                    <Badge variant={cookieConsent ? "default" : "destructive"} className={cookieConsent ? "bg-green-500/20 text-green-300 border-green-500/50" : "bg-red-500/20 text-red-300 border-red-500/50"}>
                      {cookieConsent ? "Accepted" : "Rejected"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                    <FileText className="w-5 h-5 text-blue-400" />
                    <span className="font-medium text-gray-300">Terms of Service:</span>
                    <Badge variant={tosAccepted ? "default" : "destructive"} className={tosAccepted ? "bg-green-500/20 text-green-300 border-green-500/50" : "bg-red-500/20 text-red-300 border-red-500/50"}>
                      {tosAccepted ? "Accepted" : "Rejected"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator className="bg-gray-700" />

              <div>
                <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Monitor className="w-5 h-5 text-sky-400" />
                  Browser & Device Information Collected
                </h3>
                <div className="grid gap-3 text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                            <div className="flex justify-between"><span className="font-medium text-gray-400">Screen:</span><span className="text-gray-300">{browserInfo.screenResolution}</span></div>
                            <div className="flex justify-between"><span className="font-medium text-gray-400">Language:</span><span className="text-gray-300">{browserInfo.language}</span></div>
                            <div className="flex justify-between"><span className="font-medium text-gray-400">Platform:</span><span className="text-gray-300">{browserInfo.platform}</span></div>
                        </div>
                        <div className="space-y-2 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                            <div className="flex justify-between"><span className="font-medium text-gray-400">Color Depth:</span><span className="text-gray-300">{browserInfo.colorDepth}-bit</span></div>
                            <div className="flex justify-between"><span className="font-medium text-gray-400">Timezone:</span><span className="text-gray-300">{browserInfo.timezone}</span></div>
                            <div className="flex justify-between"><span className="font-medium text-gray-400">Cookies:</span><span className="text-gray-300">{browserInfo.cookiesEnabled ? "Enabled" : "Disabled"}</span></div>
                        </div>
                    </div>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-red-400 hover:text-red-300 font-medium">
                      View Full User Agent String
                    </summary>
                    <p className="mt-2 p-3 bg-gray-900/50 border border-gray-700 rounded text-xs break-all font-mono text-gray-400">
                      {browserInfo.userAgent}
                    </p>
                  </details>
                </div>
              </div>

              <Separator className="bg-gray-700" />
              
              <div>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
                  <DatabaseZap className="w-5 h-5 text-teal-400" />
                  Live Site-wide Statistics (from Firebase)
                </h3>
                {isLoadingStats ? (
                  <p className="text-gray-400">Loading statistics...</p>
                ) : siteStats ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-3xl font-bold text-sky-400">{siteStats.totalUsers.toLocaleString()}</div>
                      <div className="text-sm text-gray-400 mt-1">Total Participants</div>
                    </div>
                    <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-3xl font-bold text-green-400">{cookieAcceptancePercentage}%</div>
                      <div className="text-sm text-gray-400 mt-1">Cookie Consent</div>
                    </div>
                    <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-3xl font-bold text-purple-400">{tosAcceptancePercentage}%</div>
                      <div className="text-sm text-gray-400 mt-1">ToS Acceptance</div>
                    </div>
                    <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                      <div className="text-3xl font-bold text-yellow-400">{avgQuizScorePercentage}%</div>
                      <div className="text-sm text-gray-400 mt-1">Avg. Quiz Score</div>
                    </div>
                  </div>
                ) : (
                  <p className="text-red-400">Could not load site statistics.</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Educational Message */}
          <Card className="shadow-xl border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-red-900/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-red-800/30">
                  <Globe className="w-8 h-8 text-red-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3">What You've Experienced</h3>
                  <p className="text-gray-400 leading-relaxed mb-4">
                    This demonstration collected readily available information about your browser and device, along with your explicit choices.
                    Many websites collect this and much more, often without such direct transparency. The goal here is to raise awareness.
                  </p>
                  <div className="space-y-2 text-sm text-gray-300">
                    <div>• <span className="font-semibold text-red-400">Be Aware:</span> Understand that your online actions generate data.</div>
                    <div>• <span className="font-semibold text-red-400">Read Policies:</span> Take a moment with privacy policies and cookie notices.</div>
                    <div>• <span className="font-semibold text-red-400">Use Tools:</span> Consider browser extensions and settings that enhance privacy.</div>
                    <div>• <span className="font-semibold text-red-400">Your Rights:</span> Familiarize yourself with data protection rights like GDPR or CCPA.</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              onClick={onRestart}
              variant="outline" 
              size="lg"
              className="px-8 py-3 text-lg rounded-xl border-gray-600 text-gray-300 bg-gray-700/50 hover:bg-gray-600/70 hover:text-white hover:border-gray-500 transition-all"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              Take Quiz Again
            </Button>
            <Button 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg rounded-xl border border-red-500/50 shadow-lg hover:shadow-xl transition-all"
              onClick={() => window.print()}
            >
              <Download className="w-5 h-5 mr-2" />
              Save These Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;