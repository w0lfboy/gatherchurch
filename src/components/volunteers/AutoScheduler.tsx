import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { mockTeams, mockRoles, mockVolunteers, mockBlackoutDates } from '@/data/mockVolunteersData';
import { PersonAvatar } from '@/components/people/PersonAvatar';
import { Sparkles, Check, AlertTriangle, RefreshCw, Calendar, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ScheduleSuggestion {
  roleId: string;
  roleName: string;
  suggestions: {
    volunteerId: string;
    volunteerName: string;
    score: number;
    reasons: string[];
    conflicts: string[];
  }[];
}

interface AutoSchedulerProps {
  serviceDate: string;
  serviceTime: string;
  teamId: string;
  onApply?: (assignments: { roleId: string; volunteerId: string }[]) => void;
}

export const AutoScheduler = ({ serviceDate, serviceTime, teamId, onApply }: AutoSchedulerProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestions, setSuggestions] = useState<ScheduleSuggestion[]>([]);
  const [selectedAssignments, setSelectedAssignments] = useState<Record<string, string>>({});

  const team = mockTeams.find(t => t.id === teamId);
  const roles = mockRoles.filter(r => r.teamId === teamId);

  const generateSchedule = () => {
    setIsGenerating(true);
    
    // Simulate scheduling algorithm
    setTimeout(() => {
      const newSuggestions: ScheduleSuggestion[] = roles.map(role => {
        // Find volunteers with this role
        const eligibleVolunteers = mockVolunteers.filter(v => 
          v.roles.includes(role.id) && v.status === 'active'
        );

        const scoredVolunteers = eligibleVolunteers.map(v => {
          let score = 50;
          const reasons: string[] = [];
          const conflicts: string[] = [];

          // Preference match
          const targetTime = serviceTime.includes('9') ? '9am' : '11am';
          if (v.preferredServiceTime === targetTime || v.preferredServiceTime === 'either') {
            score += 15;
            reasons.push('Preferred time');
          }

          // Availability check
          const hasBlackout = mockBlackoutDates.some(b => 
            b.volunteerId === v.id && 
            new Date(serviceDate) >= new Date(b.startDate) && 
            new Date(serviceDate) <= new Date(b.endDate)
          );
          if (hasBlackout) {
            score -= 100;
            conflicts.push('Blackout date');
          }

          // Monthly limit check
          if (v.servicesThisMonth < v.maxServicesPerMonth) {
            score += 20;
            reasons.push(`${v.maxServicesPerMonth - v.servicesThisMonth} slots available`);
          } else {
            score -= 30;
            conflicts.push('At monthly limit');
          }

          // Recency bonus (haven't served recently)
          if (v.lastServed) {
            const daysSinceServed = Math.floor((new Date().getTime() - new Date(v.lastServed).getTime()) / (1000 * 60 * 60 * 24));
            if (daysSinceServed > 14) {
              score += 10;
              reasons.push('Due to serve');
            }
          }

          // Family scheduling bonus
          if (v.familyMembers && v.familyMembers.length > 0) {
            reasons.push('Family can serve together');
          }

          return {
            volunteerId: v.id,
            volunteerName: v.personName,
            score: Math.max(0, Math.min(100, score)),
            reasons,
            conflicts,
          };
        });

        // Sort by score
        scoredVolunteers.sort((a, b) => b.score - a.score);

        return {
          roleId: role.id,
          roleName: role.name,
          suggestions: scoredVolunteers.slice(0, 3),
        };
      });

      setSuggestions(newSuggestions);
      
      // Auto-select top suggestions
      const autoSelected: Record<string, string> = {};
      newSuggestions.forEach(s => {
        const topSuggestion = s.suggestions.find(v => v.score >= 50);
        if (topSuggestion) {
          autoSelected[s.roleId] = topSuggestion.volunteerId;
        }
      });
      setSelectedAssignments(autoSelected);
      
      setIsGenerating(false);
    }, 1500);
  };

  const handleApply = () => {
    const assignments = Object.entries(selectedAssignments).map(([roleId, volunteerId]) => ({
      roleId,
      volunteerId,
    }));
    onApply?.(assignments);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Smart Scheduler
          </h3>
          <p className="text-sm text-muted-foreground">
            Auto-fill based on preferences, availability, and history
          </p>
        </div>
        <Button onClick={generateSchedule} disabled={isGenerating}>
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Schedule
            </>
          )}
        </Button>
      </div>

      {/* Service Info */}
      <div className="flex items-center gap-4 p-3 bg-secondary/30 rounded-lg">
        <Calendar className="w-5 h-5 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">{team?.name}</p>
          <p className="text-sm text-muted-foreground">
            {new Date(serviceDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {serviceTime}
          </p>
        </div>
      </div>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="space-y-4">
          {suggestions.map((suggestion) => (
            <div key={suggestion.roleId} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-foreground">{suggestion.roleName}</h4>
                {selectedAssignments[suggestion.roleId] && (
                  <Badge className="bg-sage-light text-sage-dark">
                    <Check className="w-3 h-3 mr-1" />
                    Assigned
                  </Badge>
                )}
              </div>
              
              <div className="space-y-2">
                {suggestion.suggestions.map((vol) => (
                  <button
                    key={vol.volunteerId}
                    onClick={() => setSelectedAssignments(prev => ({
                      ...prev,
                      [suggestion.roleId]: vol.volunteerId,
                    }))}
                    className={cn(
                      "w-full p-3 rounded-lg border-2 transition-all text-left",
                      selectedAssignments[suggestion.roleId] === vol.volunteerId
                        ? "border-primary bg-primary/5"
                        : "border-transparent bg-secondary/30 hover:bg-secondary/50"
                    )}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <PersonAvatar name={vol.volunteerName} size="sm" />
                        <span className="font-medium text-sm">{vol.volunteerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={vol.score} className="w-16 h-2" />
                        <span className="text-xs font-medium text-muted-foreground">{vol.score}%</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {vol.reasons.map((reason, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-sage-light/50 text-sage-dark border-sage/30">
                          {reason}
                        </Badge>
                      ))}
                      {vol.conflicts.map((conflict, i) => (
                        <Badge key={i} variant="outline" className="text-xs bg-coral-light/50 text-coral-dark border-coral/30">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {conflict}
                        </Badge>
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          <Button onClick={handleApply} className="w-full" size="lg">
            <Users className="w-4 h-4 mr-2" />
            Apply {Object.keys(selectedAssignments).length} Assignments
          </Button>
        </div>
      )}
    </div>
  );
};
