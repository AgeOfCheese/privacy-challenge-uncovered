
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Trophy, 
  Eye, 
  Cookie, 
  FileText, 
  Monitor, 
  Globe, 
  Users, 
  BarChart3,
  RefreshCw,
  Download
} from "lucide-react";

interface ResultsProps {
  quizData: any;
  cookieConsent: boolean | null;
  tosAccepted: boolean | null;
  onRestart: () => void;
}

const Results = ({ quizData, cookieConsent, tosAccepted, onRestart }: ResultsProps) => {
  const [browserInfo, setBrowserInfo] = useState<any>({});
  const [siteStats, setSiteStats] = useState({
    totalUsers: 1247,
    cookieAcceptance: 73,
    tosAcceptance: 89,
    avgQuizScore: 76
  });

  useEffect(() => {
    // Collect browser information
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
  }, []);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600 bg-green-50 border-green-200";
    if (percentage >= 60) return "text-yellow-600 bg-yellow-50 border-yellow-200";
    return "text-red-600 bg-red-50 border-red-200";
  };

  const getScoreIcon = (percentage: number) => {
    if (percentage >= 80) return "🏆";
    if (percentage >= 60) return "👍";
    return "📚";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Trophy className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Quiz Complete!</h1>
          <p className="text-lg text-gray-600">
            Here's what this demo learned about you during your visit
          </p>
        </div>

        <div className="grid gap-6">
          {/* Quiz Score */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-600" />
                Your Quiz Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4">
                <div className={`text-6xl font-bold p-6 rounded-2xl border-2 ${getScoreColor(quizData.percentage)}`}>
                  {quizData.score}/{quizData.totalQuestions}
                </div>
                <div>
                  <div className="text-3xl mb-2">{getScoreIcon(quizData.percentage)}</div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {quizData.percentage}% Correct
                  </div>
                  <p className="text-gray-600">
                    {quizData.percentage >= 80 ? "Excellent privacy knowledge!" :
                     quizData.percentage >= 60 ? "Good understanding of privacy basics!" :
                     "Room for improvement in privacy awareness."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Collection Reveal */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Eye className="w-6 h-6 text-purple-600" />
                What This Demo Learned About You
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Choices */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Your Consent Choices</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Cookie className="w-5 h-5 text-orange-600" />
                    <span className="font-medium">Cookie Consent:</span>
                    <Badge variant={cookieConsent ? "default" : "destructive"}>
                      {cookieConsent ? "Accepted" : "Rejected"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">Terms of Service:</span>
                    <Badge variant={tosAccepted ? "default" : "destructive"}>
                      {tosAccepted ? "Accepted" : "Rejected"}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Browser Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Browser & Device Information Collected
                </h3>
                <div className="grid gap-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Screen Resolution:</span>
                        <span className="text-gray-600">{browserInfo.screenResolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Language:</span>
                        <span className="text-gray-600">{browserInfo.language}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Platform:</span>
                        <span className="text-gray-600">{browserInfo.platform}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Color Depth:</span>
                        <span className="text-gray-600">{browserInfo.colorDepth}-bit</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Timezone:</span>
                        <span className="text-gray-600">{browserInfo.timezone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">Cookies Enabled:</span>
                        <span className="text-gray-600">{browserInfo.cookiesEnabled ? "Yes" : "No"}</span>
                      </div>
                    </div>
                  </div>
                  <details className="mt-3">
                    <summary className="cursor-pointer text-blue-600 hover:text-blue-700 font-medium">
                      View Full User Agent String
                    </summary>
                    <p className="mt-2 p-3 bg-gray-50 rounded text-xs break-all font-mono">
                      {browserInfo.userAgent}
                    </p>
                  </details>
                </div>
              </div>

              <Separator />

              {/* Site-wide Statistics */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Site-wide Statistics
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{siteStats.totalUsers.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Total Visitors</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{siteStats.cookieAcceptance}%</div>
                    <div className="text-sm text-gray-600">Accept Cookies</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">{siteStats.tosAcceptance}%</div>
                    <div className="text-sm text-gray-600">Accept Terms</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600">{siteStats.avgQuizScore}%</div>
                    <div className="text-sm text-gray-600">Avg. Quiz Score</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Educational Message */}
          <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">What You've Learned</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This demonstration collected information about your device, browser, and choices - 
                    similar to what many websites do. The key difference is transparency: we showed you 
                    exactly what was collected and how it's used.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Always read privacy policies and cookie notices</div>
                    <div>• Be aware of what data you're sharing</div>
                    <div>• Use privacy tools and settings to protect yourself</div>
                    <div>• Understand your rights regarding personal data</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onRestart}
              variant="outline" 
              size="lg"
              className="px-8"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Take Quiz Again
            </Button>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8"
              onClick={() => window.print()}
            >
              <Download className="w-4 h-4 mr-2" />
              Save Results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
