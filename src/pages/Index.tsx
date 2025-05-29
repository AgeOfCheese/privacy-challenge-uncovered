
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, BarChart3, AlertTriangle } from "lucide-react";
import Quiz from "@/components/Quiz";
import CookieConsent from "@/components/CookieConsent";
import TermsOfService from "@/components/TermsOfService";
import Results from "@/components/Results";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<'landing' | 'consent' | 'quiz' | 'results'>('landing');
  const [cookieConsent, setCookieConsent] = useState<boolean | null>(null);
  const [tosAccepted, setTosAccepted] = useState<boolean | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showTosModal, setShowTosModal] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);

  useEffect(() => {
    // Show cookie banner after a brief delay for better UX
    const timer = setTimeout(() => setShowCookieBanner(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleStartQuiz = () => {
    if (cookieConsent === null) {
      setShowCookieBanner(true);
      return;
    }
    setShowTosModal(true);
  };

  const handleCookieConsent = (accepted: boolean) => {
    setCookieConsent(accepted);
    setShowCookieBanner(false);
    console.log('Cookie consent:', accepted);
  };

  const handleTosDecision = (accepted: boolean) => {
    setTosAccepted(accepted);
    setShowTosModal(false);
    if (accepted) {
      setCurrentStep('quiz');
    }
    console.log('ToS accepted:', accepted);
  };

  const handleQuizComplete = (data: any) => {
    setQuizData(data);
    setCurrentStep('results');
    console.log('Quiz completed:', data);
  };

  if (currentStep === 'quiz') {
    return <Quiz onComplete={handleQuizComplete} />;
  }

  if (currentStep === 'results') {
    return (
      <Results 
        quizData={quizData}
        cookieConsent={cookieConsent}
        tosAccepted={tosAccepted}
        onRestart={() => {
          setCurrentStep('landing');
          setCookieConsent(null);
          setTosAccepted(null);
          setQuizData(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Cookie Consent Banner */}
      {showCookieBanner && cookieConsent === null && (
        <CookieConsent 
          onAccept={() => handleCookieConsent(true)}
          onReject={() => handleCookieConsent(false)}
        />
      )}

      {/* Terms of Service Modal */}
      {showTosModal && (
        <TermsOfService 
          onAccept={() => handleTosDecision(true)}
          onReject={() => handleTosDecision(false)}
          onClose={() => setShowTosModal(false)}
        />
      )}

      {/* Main Landing Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Header */}
          <div className="mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-900/20 rounded-full mb-6 border border-red-800/30">
              <AlertTriangle className="w-10 h-10 text-red-400" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              You Are Being <span className="text-red-400">Watched</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Every click, every choice, every moment on this site is being tracked. 
              Take this quiz to see exactly what we're collecting about you.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all hover:bg-gray-800/70">
              <div className="w-12 h-12 bg-amber-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto border border-amber-700/30">
                <Eye className="w-6 h-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">We See Everything</h3>
              <p className="text-gray-400">
                Your browser, device, location, and choices are all being recorded.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all hover:bg-gray-800/70">
              <div className="w-12 h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto border border-purple-700/30">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Privacy is Dead</h3>
              <p className="text-gray-400">
                Learn how your digital footprint is collected and sold.
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-2xl p-8 shadow-xl border border-gray-700/50 hover:shadow-2xl transition-all hover:bg-gray-800/70">
              <div className="w-12 h-12 bg-red-900/30 rounded-lg flex items-center justify-center mb-4 mx-auto border border-red-700/30">
                <BarChart3 className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Your Data Profile</h3>
              <p className="text-gray-400">
                See how your information joins millions of others in our database.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gray-800/30 rounded-2xl p-12 shadow-2xl border border-gray-700/30 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to See What We Know About You?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Take our quiz. We'll show you exactly what data we've collected during your visit. 
              You might be surprised.
            </p>
            
            <Button 
              onClick={handleStartQuiz}
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-red-500/50"
            >
              Enter the Data Mine
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              Data collection in progress • Tracking enabled
            </p>
          </div>

          {/* Warning Note */}
          <div className="mt-12 p-6 bg-red-900/20 rounded-xl border border-red-800/30 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-red-400 font-medium">
              <AlertTriangle className="w-5 h-5" />
              <span>This is a demonstration. Your data is being collected for educational purposes.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
