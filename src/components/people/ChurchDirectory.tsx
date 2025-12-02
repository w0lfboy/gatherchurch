import { useState, useMemo } from "react";
import { Person } from "@/types/people";
import { mockPeople } from "@/data/mockPeopleData";
import { PersonAvatar } from "./PersonAvatar";
import { Button } from "@/components/ui/button";
import { 
  Search, Mail, Phone, MapPin, Eye, EyeOff, 
  Book, ChevronDown, Filter
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ChurchDirectoryProps {
  onSelectPerson: (person: Person) => void;
}

export const ChurchDirectory = ({ onSelectPerson }: ChurchDirectoryProps) => {
  const [search, setSearch] = useState('');
  const [letterFilter, setLetterFilter] = useState<string | null>(null);

  // Only show people who have opted in to the directory
  const directoryPeople = useMemo(() => {
    return mockPeople.filter(person => {
      // Only show members/volunteers/leaders who opted in
      if (!person.directoryVisibility?.showInDirectory) return false;
      if (!['member', 'volunteer', 'leader'].includes(person.status)) return false;
      
      // Search filter
      if (search) {
        const searchLower = search.toLowerCase();
        const fullName = `${person.firstName} ${person.lastName}`.toLowerCase();
        if (!fullName.includes(searchLower)) return false;
      }
      
      // Letter filter
      if (letterFilter) {
        if (!person.lastName.toUpperCase().startsWith(letterFilter)) return false;
      }
      
      return true;
    }).sort((a, b) => a.lastName.localeCompare(b.lastName));
  }, [search, letterFilter]);

  // Group by last name initial
  const groupedPeople = useMemo(() => {
    const groups: Record<string, Person[]> = {};
    directoryPeople.forEach(person => {
      const initial = person.lastName[0].toUpperCase();
      if (!groups[initial]) groups[initial] = [];
      groups[initial].push(person);
    });
    return groups;
  }, [directoryPeople]);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
              <Book className="w-6 h-6 text-primary" />
              Church Directory
            </h1>
            <p className="text-sm text-muted-foreground">
              {directoryPeople.length} {directoryPeople.length === 1 ? 'member' : 'members'} sharing their contact info
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg bg-sage-light text-sage-dark text-xs font-medium flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              Only showing opt-in members
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search directory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        {/* Alphabet filter */}
        <div className="mt-4 flex flex-wrap gap-1">
          <button
            onClick={() => setLetterFilter(null)}
            className={cn(
              "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
              letterFilter === null
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            )}
          >
            All
          </button>
          {alphabet.map(letter => {
            const hasMembers = Object.keys(groupedPeople).includes(letter);
            return (
              <button
                key={letter}
                onClick={() => hasMembers && setLetterFilter(letter)}
                disabled={!hasMembers}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                  letterFilter === letter
                    ? "bg-primary text-primary-foreground"
                    : hasMembers
                      ? "bg-secondary text-muted-foreground hover:text-foreground"
                      : "bg-secondary/50 text-muted-foreground/30 cursor-not-allowed"
                )}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* Directory listing */}
      <div className="flex-1 overflow-auto p-6">
        {Object.keys(groupedPeople).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <EyeOff className="w-12 h-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No directory entries found</p>
            <p className="text-sm text-muted-foreground/70">
              Members can opt in to share their contact info in Settings
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedPeople).sort(([a], [b]) => a.localeCompare(b)).map(([letter, people]) => (
              <div key={letter}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-display font-semibold text-primary">{letter}</span>
                  </div>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {people.map(person => (
                    <DirectoryCard 
                      key={person.id} 
                      person={person} 
                      onClick={() => onSelectPerson(person)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

interface DirectoryCardProps {
  person: Person;
  onClick: () => void;
}

const DirectoryCard = ({ person, onClick }: DirectoryCardProps) => {
  const visibility = person.directoryVisibility;
  
  return (
    <div 
      onClick={onClick}
      className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer"
    >
      <div className="flex items-start gap-3">
        <PersonAvatar person={person} size="lg" />
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground">
            {person.firstName} {person.lastName}
          </h3>
          
          <div className="mt-2 space-y-1.5">
            {visibility?.showEmail && person.email && (
              <a 
                href={`mailto:${person.email}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="truncate">{person.email}</span>
              </a>
            )}
            
            {visibility?.showPhone && person.phone && (
              <a 
                href={`tel:${person.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{person.phone}</span>
              </a>
            )}
            
            {visibility?.showAddress && person.address && (
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
                <span>
                  {person.address.city}{person.address.state && `, ${person.address.state}`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};