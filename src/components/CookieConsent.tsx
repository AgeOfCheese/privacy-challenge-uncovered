
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface CookieConsentProps {
  onAccept: () => void;
  onReject: () => void;
}

const CookieConsent = ({ onAccept, onReject }: CookieConsentProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-red-800/30 shadow-2xl z-50 animate-slide-in-bottom backdrop-blur-sm">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 border border-red-700/30">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">Data Collection Notice</h3>
              <p className="text-sm text-gray-300 leading-relaxed">
                We use cookies to ensure that you get the best experience
              </p>
            </div>
          </div>
          
          <div className="flex gap-3 flex-shrink-0">
            <Button 
              variant="outline" 
              onClick={onReject}
              className="px-6 py-2 border-gray-600 text-gray-300 bg-gray-800/50 hover:bg-gray-700/50"
            >
              Reject Non-Essential
            </Button>
            <Button 
              onClick={onAccept}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white border border-red-500/50"
            >
              Accept Cookies
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
