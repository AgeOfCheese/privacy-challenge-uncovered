
import { Button } from "@/components/ui/button";
import { Cookie } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
}

const CookieConsent = ({ onAccept, onReject }: CookieConsentProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 animate-slide-in-bottom">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <Cookie className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Cookie Consent Demo</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This site uses cookies for educational demonstration purposes. Your choice will be tracked 
                and displayed in the quiz results to show how websites monitor user preferences.
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              onClick={onReject}
              className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Reject
            </Button>
            <Button 
              onClick={onAccept}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
