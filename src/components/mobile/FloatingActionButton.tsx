import { useState } from "react";
import { Plus, X, Calendar, UserCheck, MessageSquare, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useHaptics } from "@/hooks/useHaptics";
import { cn } from "@/lib/utils";

interface FABAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

interface FloatingActionButtonProps {
  mode: 'member' | 'leader';
}

export const FloatingActionButton = ({ mode }: FloatingActionButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const haptics = useHaptics();

  const memberActions: FABAction[] = [
    { id: 'give', label: 'Give', icon: <Heart className="w-5 h-5" />, href: '/app/give', color: 'bg-coral' },
    { id: 'events', label: 'Events', icon: <Calendar className="w-5 h-5" />, href: '/app/events', color: 'bg-sage' },
  ];

  const leaderActions: FABAction[] = [
    { id: 'checkin', label: 'Start Check-In', icon: <UserCheck className="w-5 h-5" />, href: '/app/my-sunday', color: 'bg-sage' },
    { id: 'event', label: 'Add Event', icon: <Calendar className="w-5 h-5" />, href: '/app/events', color: 'bg-coral' },
    { id: 'message', label: 'Send Message', icon: <MessageSquare className="w-5 h-5" />, href: '/app/messages', color: 'bg-gold' },
  ];

  const actions = mode === 'leader' ? leaderActions : memberActions;

  const handleToggle = () => {
    haptics.medium();
    setIsOpen(!isOpen);
  };

  const handleAction = (action: FABAction) => {
    haptics.light();
    setIsOpen(false);
    navigate(action.href);
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={() => {
            haptics.light();
            setIsOpen(false);
          }}
        />
      )}

      {/* Action buttons */}
      <div className={cn(
        "flex flex-col-reverse items-end gap-3 mb-3 transition-all duration-300",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}>
        {actions.map((action, index) => (
          <div
            key={action.id}
            className="flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <span className="px-3 py-1.5 bg-card rounded-lg shadow-md text-sm font-medium text-foreground whitespace-nowrap">
              {action.label}
            </span>
            <button
              onClick={() => handleAction(action)}
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg",
                "transform transition-transform hover:scale-105 active:scale-95",
                action.color
              )}
            >
              {action.icon}
            </button>
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <button
        onClick={handleToggle}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl",
          "transform transition-all duration-300 hover:scale-105 active:scale-95",
          isOpen ? "bg-charcoal rotate-45" : "bg-sage"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </div>
  );
};
