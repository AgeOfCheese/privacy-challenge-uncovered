
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle } from "lucide-react";

interface TermsOfServiceProps {
  onAccept: () => void;
  onReject: () => void;
  onClose: () => void;
}

const TermsOfService = ({ onAccept, onReject, onClose }: TermsOfServiceProps) => {
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] bg-gray-900 border border-gray-700">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-red-900/30 rounded-lg flex items-center justify-center border border-red-700/30">
              <AlertTriangle className="w-4 h-4 text-red-400" />
            </div>
            <DialogTitle className="text-xl font-semibold text-white">Data Harvesting Agreement</DialogTitle>
          </div>
          <DialogDescription className="text-gray-300">
            By proceeding, you consent to comprehensive data collection and analysis
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="h-96 w-full border rounded-lg p-4 bg-gray-800/50 border-gray-700">
          <div className="space-y-4 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-white mb-2">Data Extraction Terms</h3>
              <p className="text-gray-300">
                By accepting these terms, you authorize our systems to monitor, record, 
                and analyze your digital behavior for demonstration purposes.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-1">What We're Taking</h4>
              <p className="text-gray-300">
                We will capture and store the following data points:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-400">
                <li>Every answer and response you provide</li>
                <li>Your device fingerprint and browser signature</li>
                <li>Your consent patterns and decision-making behavior</li>
                <li>Precise timestamps of all interactions</li>
                <li>Screen resolution, OS, and hardware details</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-1">How Your Data is Used</h4>
              <p className="text-gray-300">
                Your information becomes part of our demonstration database to show others 
                how digital tracking works in the real world.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-1">Data Aggregation</h4>
              <p className="text-gray-300">
                Your data will be:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-400">
                <li>Combined with thousands of other user profiles</li>
                <li>Analyzed for behavioral patterns and trends</li>
                <li>Used to demonstrate mass surveillance techniques</li>
                <li>Displayed as part of our educational exhibit</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-white mb-1">Your Limited Rights</h4>
              <p className="text-gray-300">
                Once you proceed:
              </p>
              <ul className="list-disc ml-5 mt-2 space-y-1 text-gray-400">
                <li>Your data joins our permanent demonstration archive</li>
                <li>You can view what we've collected about you</li>
                <li>Educational use overrides individual privacy preferences</li>
              </ul>
            </div>
            
            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-500">
                Data collection initiated: {new Date().toLocaleString()}
              </p>
            </div>
          </div>
        </ScrollArea>
        
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button 
            variant="outline" 
            onClick={onReject}
            className="flex-1 sm:flex-none px-8 border-gray-600 text-gray-300 bg-gray-800/50 hover:bg-gray-700/50"
          >
            Refuse & Exit
          </Button>
          <Button 
            onClick={onAccept}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-8 border border-red-500/50"
          >
            Accept Data Mining
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TermsOfService;
