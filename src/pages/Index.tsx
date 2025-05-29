
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Shield, Eye, Lock, BarChart3 } from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
              <Shield className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Data Privacy <span className="text-blue-600">Challenge Quiz</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover how websites collect your data while learning about digital privacy. 
              This interactive quiz demonstrates real data gathering techniques in action.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">See What's Collected</h3>
              <p className="text-gray-600">
                Learn exactly what data websites gather about you during your visit.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Lock className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Privacy Education</h3>
              <p className="text-gray-600">
                Test your knowledge about data privacy and protection techniques.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <BarChart3 className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Stats</h3>
              <p className="text-gray-600">
                View aggregated data from all quiz participants to see privacy trends.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-2xl p-12 shadow-xl border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to See What Websites Learn About You?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Take our interactive quiz and discover the hidden world of data collection. 
              You'll see exactly what information is gathered during your visit.
            </p>
            
            <Button 
              onClick={handleStartQuiz}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Start Privacy Quiz
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              No personal information required • Educational purposes only
            </p>
          </div>

          {/* Educational Note */}
          <div className="mt-12 p-6 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-blue-800 font-medium">
              🛡️ This is an educational demonstration. All data collection is transparent and used only for learning purposes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
