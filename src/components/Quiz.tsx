import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Shield, Lock, Eye, WifiOff, KeyRound } from "lucide-react"; // Added WifiOff and KeyRound

interface QuizProps {
  onComplete: (data: any) => void;
}

const quizQuestions = [
  {
    id: 1,
    icon: KeyRound, // Changed icon
    question: "Do you use different passwords for different online accounts?",
    options: [
      "Yes, for all or most of them",
      "Sometimes, for important ones",
      "No, I use the same password for many accounts",
      "I'm not sure"
    ],
    correct: 0, // "Yes, for all or most of them" is encouraged
    explanation: "Using unique passwords for each account is crucial. If one account is compromised, others remain secure."
  },
  {
    id: 2,
    icon: Lock,
    question: "How often do you change your important passwords (e.g., email, banking)?",
    options: [
      "Regularly, every few months",
      "Only when a site forces me to",
      "Rarely or never",
      "I use a password manager that helps me update them"
    ],
    correct: 0, // Or 3, depending on interpretation. Regular changes or password manager use are good.
    explanation: "Regularly updating passwords or using a password manager to create and store strong, unique passwords helps protect your accounts."
  },
  {
    id: 3,
    icon: WifiOff, // Changed icon
    question: "What is a VPN (Virtual Private Network) primarily used for?",
    options: [
      "To make your internet connection faster",
      "To get free Wi-Fi everywhere",
      "To encrypt your internet traffic and hide your IP address",
      "To block all advertisements"
    ],
    correct: 2,
    explanation: "A VPN encrypts your internet connection, enhancing privacy and security by masking your IP address and protecting your data from being easily intercepted."
  },
  {
    id: 4,
    icon: Shield,
    question: "When using public Wi-Fi (e.g., at a cafe or airport), what's a good practice?",
    options: [
      "It's always safe, no special precautions needed",
      "Only access sensitive information if the Wi-Fi has a password",
      "Avoid accessing sensitive accounts or use a VPN",
      "Download as much as possible because it's free"
    ],
    correct: 2,
    explanation: "Public Wi-Fi networks can be insecure. It's best to avoid logging into sensitive accounts or to use a VPN for an encrypted connection."
  },
  {
    id: 5,
    icon: Eye,
    question: "What does 'two-factor authentication' (2FA) mean?",
    options: [
      "You need two different devices to log in",
      "Your password must be twice as long",
      "You need a second piece of information (like a code from your phone) in addition to your password",
      "You can only log in two times per day"
    ],
    correct: 2,
    explanation: "Two-factor authentication adds an extra layer of security by requiring a second form of verification beyond just your password."
  }
];

const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  // const [showExplanation, setShowExplanation] = useState(false); // Removed showExplanation state

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
      // setShowExplanation(false); // Removed
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

  // const handleShowExplanation = () => { // Removed handleShowExplanation function
  // setShowExplanation(true);
  // };

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

            {/* Explanation section completely removed */}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6">
              {/* "Show Explanation" Button completely removed */}
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