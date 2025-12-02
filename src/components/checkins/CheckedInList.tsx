import { useState } from 'react';
import { CheckedInPerson } from '@/types/checkins';
import { Button } from '@/components/ui/button';
import { 
  Search, Filter, CheckCircle, LogOut, AlertTriangle,
  Phone, MessageSquare, Printer, QrCode, Clock, Baby, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CheckedInListProps {
  checkedIn: CheckedInPerson[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CheckedInList = ({ checkedIn, searchQuery, onSearchChange }: CheckedInListProps) => {
  const [typeFilter, setTypeFilter] = useState<'all' | 'child' | 'volunteer'>('all');
  const [selectedPerson, setSelectedPerson] = useState<CheckedInPerson | null>(null);

  const filteredPeople = checkedIn.filter(person => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
      const matchesName = fullName.includes(searchLower);
      const matchesCode = person.pickupCode.toLowerCase().includes(searchLower);
      if (!matchesName && !matchesCode) return false;
    }

    // Type filter
    if (typeFilter !== 'all' && person.type !== typeFilter) return false;

    return true;
  });

  const children = checkedIn.filter(p => p.type === 'child');
  const volunteers = checkedIn.filter(p => p.type === 'volunteer');

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or pickup code..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="flex items-center bg-secondary rounded-lg p-1">
          <button
            onClick={() => setTypeFilter('all')}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
              typeFilter === 'all'
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            All ({checkedIn.length})
          </button>
          <button
            onClick={() => setTypeFilter('child')}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
              typeFilter === 'child'
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Baby className="w-4 h-4" />
            Children ({children.length})
          </button>
          <button
            onClick={() => setTypeFilter('volunteer')}
            className={cn(
              "px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1",
              typeFilter === 'volunteer'
                ? "bg-background shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Users className="w-4 h-4" />
            Volunteers ({volunteers.length})
          </button>
        </div>
      </div>

      {/* List */}
      <div className="grid lg:grid-cols-2 gap-4">
        {filteredPeople.length === 0 ? (
          <div className="col-span-2 flex flex-col items-center justify-center h-48 text-center">
            <CheckCircle className="w-12 h-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No one found</p>
          </div>
        ) : (
          filteredPeople.map(person => (
            <PersonCard 
              key={person.id} 
              person={person}
              isSelected={selectedPerson?.id === person.id}
              onClick={() => setSelectedPerson(selectedPerson?.id === person.id ? null : person)}
            />
          ))
        )}
      </div>

      {/* Detail Panel */}
      {selectedPerson && (
        <PersonDetailPanel 
          person={selectedPerson} 
          onClose={() => setSelectedPerson(null)}
        />
      )}
    </div>
  );
};

interface PersonCardProps {
  person: CheckedInPerson;
  isSelected: boolean;
  onClick: () => void;
}

const PersonCard = ({ person, isSelected, onClick }: PersonCardProps) => {
  const hasAlerts = person.medicalAlerts.length > 0 || person.allergies.length > 0;

  return (
    <div 
      onClick={onClick}
      className={cn(
        "p-4 rounded-xl border transition-all cursor-pointer",
        isSelected 
          ? "bg-primary/5 border-primary"
          : hasAlerts 
            ? "bg-coral-light/30 border-coral/30 hover:border-coral"
            : "bg-card border-border hover:border-primary/30"
      )}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0",
          person.type === 'child' ? "bg-sage-light" : "bg-primary/10"
        )}>
          <span className="font-semibold text-sage-dark">
            {person.firstName[0]}{person.lastName[0]}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground">
              {person.firstName} {person.lastName}
            </h3>
            {hasAlerts && (
              <AlertTriangle className="w-4 h-4 text-coral" />
            )}
          </div>
          <p className="text-sm text-muted-foreground">{person.roomName}</p>
          
          {/* Pickup Code */}
          {person.type === 'child' && person.pickupCode && (
            <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-secondary">
              <QrCode className="w-4 h-4 text-muted-foreground" />
              <span className="font-mono font-semibold text-foreground">{person.pickupCode}</span>
            </div>
          )}
        </div>

        <div className="text-right">
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {new Date(person.checkedInAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
          <span className={cn(
            "text-xs px-2 py-0.5 rounded-full mt-1 inline-block",
            person.type === 'child' ? "bg-sage-light text-sage-dark" : "bg-primary/10 text-primary"
          )}>
            {person.type}
          </span>
        </div>
      </div>

      {/* Alerts Preview */}
      {hasAlerts && (
        <div className="mt-3 pt-3 border-t border-coral/20 flex flex-wrap gap-2">
          {person.allergies.map(allergy => (
            <span key={allergy} className="text-xs px-2 py-0.5 rounded-full bg-coral/20 text-coral font-medium">
              ⚠️ {allergy}
            </span>
          ))}
          {person.medicalAlerts.map(alert => (
            <span key={alert.id} className="text-xs px-2 py-0.5 rounded-full bg-gold/20 text-gold font-medium">
              {alert.type}: {alert.description}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

interface PersonDetailPanelProps {
  person: CheckedInPerson;
  onClose: () => void;
}

const PersonDetailPanel = ({ person, onClose }: PersonDetailPanelProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-card border-t border-border shadow-2xl p-6 animate-slide-up z-50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {person.firstName} {person.lastName}
            </h2>
            <p className="text-muted-foreground">{person.roomName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Printer className="w-4 h-4 mr-2" />
              Reprint Label
            </Button>
            <Button variant="outline" size="sm" className="text-coral border-coral hover:bg-coral/10">
              <LogOut className="w-4 h-4 mr-2" />
              Check Out
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Guardians */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Authorized Pickup</h3>
            <div className="space-y-2">
              {person.guardians.map(guardian => (
                <div key={guardian.id} className="p-3 rounded-lg bg-secondary/50">
                  <p className="font-medium text-foreground">{guardian.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{guardian.relationship}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <a href={`tel:${guardian.phone}`} className="text-xs text-primary flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {guardian.phone}
                    </a>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      Text
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pickup Code */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Pickup Code</h3>
            <div className="p-4 rounded-lg bg-secondary text-center">
              <QrCode className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-2xl font-mono font-bold text-foreground">{person.pickupCode}</p>
              <p className="text-xs text-muted-foreground mt-1">Required for checkout</p>
            </div>
          </div>

          {/* Medical Info */}
          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-2">Medical Information</h3>
            {person.medicalAlerts.length === 0 && person.allergies.length === 0 && !person.specialNotes ? (
              <p className="text-sm text-muted-foreground">No medical information on file</p>
            ) : (
              <div className="space-y-2">
                {person.allergies.map(allergy => (
                  <div key={allergy} className="p-3 rounded-lg bg-coral-light border border-coral/30">
                    <p className="text-xs font-medium text-coral">ALLERGY</p>
                    <p className="font-medium text-foreground">{allergy}</p>
                  </div>
                ))}
                {person.medicalAlerts.map(alert => (
                  <div key={alert.id} className="p-3 rounded-lg bg-gold/10 border border-gold/30">
                    <p className="text-xs font-medium text-gold uppercase">{alert.type}</p>
                    <p className="font-medium text-foreground">{alert.description}</p>
                    {alert.instructions && (
                      <p className="text-sm text-muted-foreground mt-1">{alert.instructions}</p>
                    )}
                  </div>
                ))}
                {person.specialNotes && (
                  <div className="p-3 rounded-lg bg-secondary">
                    <p className="text-xs font-medium text-muted-foreground">NOTES</p>
                    <p className="text-sm text-foreground">{person.specialNotes}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
