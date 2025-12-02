import { useState } from "react";
import { Person } from "@/types/people";
import { PeopleList } from "@/components/people/PeopleList";
import { PersonDetail } from "@/components/people/PersonDetail";
import { PipelineBoard } from "@/components/people/PipelineBoard";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, Users, Calendar, Music, Heart, 
  MessageSquare, CheckCircle, Settings, Bell, Search,
  List, Kanban, X
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { name: "Services", icon: Calendar, href: "/services" },
  { name: "People", icon: Users, href: "/people", active: true },
  { name: "Groups", icon: Users, href: "/groups" },
  { name: "Giving", icon: Heart, href: "/giving" },
  { name: "Check-Ins", icon: CheckCircle, href: "/checkins" },
  { name: "Messages", icon: MessageSquare, href: "/messages" },
];

type ViewMode = 'list' | 'pipeline';

const People = () => {
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display font-bold text-lg">G</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground">Gather</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                item.active
                  ? "bg-sage-light text-sage-dark"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Bottom section */}
        <div className="p-4 border-t border-border space-y-1">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-all duration-200">
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-4">
            {/* View toggle */}
            <div className="flex items-center bg-secondary rounded-xl p-1">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  viewMode === 'list'
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <List className="w-4 h-4" />
                List
              </button>
              <button
                onClick={() => setViewMode('pipeline')}
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                  viewMode === 'pipeline'
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Kanban className="w-4 h-4" />
                Pipeline
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-coral" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sage-light to-coral-light flex items-center justify-center">
              <span className="text-sm font-semibold text-sage-dark">JD</span>
            </div>
          </div>
        </header>

        {/* Content area */}
        <div className="flex-1 flex min-h-0">
          {/* Main panel */}
          <div className={cn(
            "flex-1 min-w-0 transition-all duration-300",
            selectedPerson ? "w-1/2" : "w-full"
          )}>
            {viewMode === 'list' ? (
              <PeopleList 
                onSelectPerson={setSelectedPerson}
                selectedPersonId={selectedPerson?.id}
              />
            ) : (
              <PipelineBoard onSelectPerson={setSelectedPerson} />
            )}
          </div>

          {/* Detail panel */}
          {selectedPerson && (
            <div className="w-1/2 border-l border-border animate-fade-in">
              <div className="relative h-full">
                <button
                  onClick={() => setSelectedPerson(null)}
                  className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
                <PersonDetail person={selectedPerson} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default People;
