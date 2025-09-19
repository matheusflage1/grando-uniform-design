import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

interface SecurityAlertProps {
  type: 'warning' | 'error' | 'success';
  message: string;
  className?: string;
}

export const SecurityAlert = ({ type, message, className }: SecurityAlertProps) => {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
        return <Shield className="h-4 w-4" />;
      case 'success':
        return <CheckCircle className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    return type === 'error' ? 'destructive' : 'default';
  };

  return (
    <Alert variant={getVariant()} className={className}>
      {getIcon()}
      <AlertDescription>
        {message}
      </AlertDescription>
    </Alert>
  );
};