import { useMemo } from "react";
import { Person } from "@/types/people";
import { mockPeople, mockPipeline } from "@/data/mockPeopleData";
import { PersonAvatar } from "./PersonAvatar";
import { cn } from "@/lib/utils";
import { Plus, MoreHorizontal } from "lucide-react";

interface PipelineBoardProps {
  onSelectPerson: (person: Person) => void;
}

const stageColors: Record<string, string> = {
  gray: 'bg-muted border-border',
  gold: 'bg-secondary border-gold/20',
  coral: 'bg-coral-light border-coral/20',
  sage: 'bg-sage-light border-sage/20',
  primary: 'bg-primary/10 border-primary/20',
};

const stageHeaderColors: Record<string, string> = {
  gray: 'text-muted-foreground',
  gold: 'text-gold',
  coral: 'text-coral',
  sage: 'text-sage-dark',
  primary: 'text-primary',
};

export const PipelineBoard = ({ onSelectPerson }: PipelineBoardProps) => {
  const peopleByStage = useMemo(() => {
    const grouped: Record<string, Person[]> = {};
    mockPipeline.stages.forEach(stage => {
      grouped[stage.id] = mockPeople.filter(p => p.pipelineStageId === stage.id);
    });
    return grouped;
  }, []);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-display font-semibold text-foreground">
              {mockPipeline.name}
            </h2>
            <p className="text-sm text-muted-foreground">{mockPipeline.description}</p>
          </div>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-x-auto p-6">
        <div className="flex gap-4 h-full min-w-max">
          {mockPipeline.stages.map(stage => (
            <div 
              key={stage.id} 
              className="w-72 flex flex-col bg-card rounded-2xl border border-border"
            >
              {/* Stage header */}
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      stage.color === 'gray' ? 'bg-muted-foreground' :
                      stage.color === 'gold' ? 'bg-gold' :
                      stage.color === 'coral' ? 'bg-coral' :
                      stage.color === 'sage' ? 'bg-sage' : 'bg-primary'
                    )} />
                    <span className="font-medium text-foreground">{stage.name}</span>
                    <span className="text-xs text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                      {peopleByStage[stage.id]?.length || 0}
                    </span>
                  </div>
                  <button className="p-1 rounded hover:bg-secondary transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* Stage cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {peopleByStage[stage.id]?.map(person => (
                  <div
                    key={person.id}
                    onClick={() => onSelectPerson(person)}
                    className={cn(
                      "p-3 rounded-xl border cursor-pointer transition-all hover:shadow-card",
                      stageColors[stage.color]
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <PersonAvatar person={person} size="sm" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-foreground truncate">
                          {person.firstName} {person.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {person.email || 'No email'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add person to stage */}
                <button className="w-full p-3 rounded-xl border border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add person
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
