
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface TermsOfServiceProps {
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

const TermsOfService = ({ onAccept, onReject, onClose }: TermsOfServiceProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 text-blue-600" />
            </div>
            <DialogTitle className="text-xl font-semibold">Terms of Service Agreement</DialogTitle>
          </div>
          <DialogDescription>
            Please review and accept our terms to proceed with the Data Privacy Quiz
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-96 w-full border rounded-lg p-4 bg-gray-50">
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Educational Demonstration Terms</h3>
              <p className="text-gray-700">
                This is a sample Terms of Service for educational purposes. By accepting these terms, 
                you agree to participate in our data privacy demonstration quiz.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Data Collection Notice</h4>
              <p className="text-gray-700">
                During this quiz, we will collect and display the following information for educational purposes:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
                <li>Your responses to quiz questions</li>
                <li>Your browser information (User Agent, screen resolution)</li>
                <li>Your consent choices (cookies and terms acceptance)</li>
                <li>Timestamp of your visit</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Purpose</h4>
              <p className="text-gray-700">
                This data collection is solely for educational demonstration to show users what 
                information websites typically gather. No personal identification is collected.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Data Usage</h4>
              <p className="text-gray-700">
                Collected data will be:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
                <li>Displayed anonymously in aggregate statistics</li>
                <li>Shown to you in your personalized results</li>
                <li>Used only for educational demonstration purposes</li>
                <li>Not shared with third parties</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-1">Your Rights</h4>
              <p className="text-gray-700">
                You have the right to:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-600">
                <li>Reject these terms and exit the quiz</li>
                <li>See all data collected about you</li>
                <li>Understand how your data is being used</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-500">
                Last updated: {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onReject}
            className="flex-1 sm:flex-none px-8"
          >
            Reject Terms
          </Button>
          <Button 
            onClick={onAccept}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-8"
          >
            Accept Terms & Start Quiz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfService;
