
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Shield, Lock, Eye, Database, Globe } from "lucide-react";

interface QuizProps {
  onComplete: (data: any) => void;
}

const quizQuestions = [
  {
    id: 1,
    icon: Shield,
    question: "What is the primary purpose of GDPR (General Data Protection Regulation)?",
    options: [
      "To increase website loading speeds",
      "To protect personal data and privacy rights",
      "To standardize web design across Europe",
      "To reduce internet costs"
    ],
    correct: 1,
    explanation: "GDPR is designed to protect personal data and give individuals control over their privacy."
  },
  {
    id: 2,
    icon: Lock,
    question: "Which of these is considered personal data under privacy laws?",
    options: [
      "Your IP address",
      "Your device's screen resolution",
      "Anonymous analytics data",
      "Public website content"
    ],
    correct: 0,
    explanation: "IP addresses can be used to identify individuals and are considered personal data."
  },
  {
    id: 3,
    icon: Eye,
    question: "What are tracking cookies primarily used for?",
    options: [
      "Improving website security",
      "Storing user preferences",
      "Following users across different websites",
      "Making websites load faster"
    ],
    correct: 2,
    explanation: "Tracking cookies follow users across sites to build detailed profiles for advertising."
  },
  {
    id: 4,
    icon: Database,
    question: "How long can websites typically store your personal data?",
    options: [
      "Forever, once collected",
      "Only as long as necessary for the stated purpose",
      "Exactly one year",
      "Until you clear your browser cache"
    ],
    correct: 1,
    explanation: "Privacy laws require data to be deleted when no longer needed for its original purpose."
  },
  {
    id: 5,
    icon: Globe,
    question: "What right do you have regarding your personal data under most privacy laws?",
    options: [
      "The right to free internet access",
      "The right to access, correct, and delete your data",
      "The right to unlimited data storage",
      "The right to anonymous browsing"
    ],
    correct: 1,
    explanation: "Privacy laws grant individuals rights to access, rectify, and erase their personal data."
  }
];

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = [...answers, selectedAnswer];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const score = newAnswers.reduce((acc, answer, index) => {
        return acc + (answer === quizQuestions[index].correct ? 1 : 0);
      }, 0);

      onComplete({
        answers: newAnswers,
        score,
        totalQuestions: quizQuestions.length,
        percentage: Math.round((score / quizQuestions.length) * 100)
      });
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const Icon = question.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Progress Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-white">Data Privacy Quiz</h1>
            <span className="text-sm font-medium text-gray-400">
              Question {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2 bg-gray-700" />
        </div>

        {/* Question Card */}
        <Card className="shadow-xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-red-900/30 rounded-xl flex items-center justify-center border border-red-700/30">
                <Icon className="w-6 h-6 text-red-400" />
              </div>
              <CardTitle className="text-xl leading-relaxed text-white">{question.question}</CardTitle>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {/* Answer Options */}
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`w-full p-4 text-left rounded-xl border-2 transition-all hover:shadow-md ${
                    selectedAnswer === index
                      ? 'border-red-500 bg-red-900/20 shadow-md text-white'
                      : 'border-gray-600 hover:border-gray-500 bg-gray-700/30 text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswer === index
                        ? 'border-red-500 bg-red-500'
                        : 'border-gray-500'
                    }`}>
                      {selectedAnswer === index && (
                        <CheckCircle className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span className="font-medium">{option}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6 p-4 bg-green-900/20 border border-green-700/30 rounded-xl">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-green-300 mb-1">Explanation</h4>
                    <p className="text-green-200 text-sm leading-relaxed">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              {selectedAnswer !== null && !showExplanation && (
                <Button
                  variant="outline"
                  onClick={handleShowExplanation}
                  className="flex-1 border-gray-600 text-gray-300 bg-gray-700/50 hover:bg-gray-600/50 hover:text-white"
                >
                  Show Explanation
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white border border-red-500/50"
              >
                {currentQuestion === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Quiz;
