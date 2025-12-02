import { useState } from "react";
import { Person, Note, FollowUp } from "@/types/people";
import { mockTags, mockHouseholds, mockNotes, mockFollowUps, mockPipeline, getTagById, getPersonById } from "@/data/mockPeopleData";
import { PersonAvatar } from "./PersonAvatar";
import { PersonStatusBadge } from "./PersonStatusBadge";
import { TagBadge } from "./TagBadge";
import { Button } from "@/components/ui/button";
import { 
  Mail, Phone, MapPin, Calendar, Edit, MoreHorizontal,
  MessageSquare, CheckCircle, Plus, Clock, AlertCircle,
  Users, ShieldCheck, ChevronRight, Send, Heart
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, formatDistanceToNow } from "date-fns";

interface PersonDetailProps {
  person: Person;
  onClose?: () => void;
}

type Tab = 'overview' | 'notes' | 'followups' | 'history';

export const PersonDetail = ({ person, onClose }: PersonDetailProps) => {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  
  const household = person.householdId ? mockHouseholds.find(h => h.id === person.householdId) : null;
  const personNotes = mockNotes.filter(n => n.personId === person.id);
  const personFollowUps = mockFollowUps.filter(f => f.personId === person.id);
  const currentStage = mockPipeline.stages.find(s => s.id === person.pipelineStageId);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'overview', label: 'Overview' },
    { id: 'notes', label: 'Notes', count: personNotes.length },
    { id: 'followups', label: 'Follow-ups', count: personFollowUps.length },
    { id: 'history', label: 'History' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <PersonAvatar person={person} size="xl" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-display font-semibold text-foreground">
                {person.firstName} {person.lastName}
              </h2>
              <PersonStatusBadge status={person.status} />
            </div>
            
            {/* Contact info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
              {person.email && (
                <a href={`mailto:${person.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  {person.email}
                </a>
              )}
              {person.phone && (
                <a href={`tel:${person.phone}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <Phone className="w-4 h-4" />
                  {person.phone}
                </a>
              )}
              {person.address?.city && (
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4" />
                  {person.address.city}, {person.address.state}
                </span>
              )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              {person.tags.map(tagId => {
                const tag = getTagById(tagId);
                return tag ? (
                  <TagBadge key={tagId} name={tag.name} color={tag.color} />
                ) : null;
              })}
              <button className="px-2 py-1 rounded-full border border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors flex items-center gap-1">
                <Plus className="w-3 h-3" />
                Add tag
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button variant="soft" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-border px-6">
        <div className="flex gap-6">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-3 text-sm font-medium border-b-2 transition-colors",
                activeTab === tab.id
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
              {tab.count !== undefined && tab.count > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-secondary text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'overview' && (
          <OverviewTab person={person} household={household} currentStage={currentStage} />
        )}
        {activeTab === 'notes' && (
          <NotesTab notes={personNotes} />
        )}
        {activeTab === 'followups' && (
          <FollowUpsTab followUps={personFollowUps} />
        )}
        {activeTab === 'history' && (
          <HistoryTab person={person} />
        )}
      </div>
    </div>
  );
};

// Overview Tab
const OverviewTab = ({ person, household, currentStage }: { 
  person: Person; 
  household: any; 
  currentStage: any;
}) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Main info */}
      <div className="lg:col-span-2 space-y-6">
        {/* Pipeline Progress */}
        {currentStage && (
          <div className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Assimilation Progress</h3>
              <span className="text-xs text-muted-foreground">{mockPipeline.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {mockPipeline.stages.map((stage, index) => {
                const isCompleted = stage.order <= currentStage.order;
                const isCurrent = stage.id === currentStage.id;
                return (
                  <div key={stage.id} className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex-1 h-2 rounded-full transition-colors",
                          isCompleted ? "bg-primary" : "bg-secondary"
                        )}
                      />
                    </div>
                    <p className={cn(
                      "text-xs mt-1.5 truncate",
                      isCurrent ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {stage.name}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Personal Details */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Personal Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <DetailItem label="Birthday" value={person.birthDate ? format(new Date(person.birthDate), 'MMMM d, yyyy') : '—'} />
            <DetailItem label="Gender" value={person.gender ? person.gender.charAt(0).toUpperCase() + person.gender.slice(1) : '—'} />
            <DetailItem label="Member Since" value={person.memberSince ? format(new Date(person.memberSince), 'MMMM yyyy') : '—'} />
            <DetailItem label="First Visit" value={person.firstVisit ? format(new Date(person.firstVisit), 'MMMM d, yyyy') : '—'} />
          </div>
        </div>

        {/* Address */}
        {person.address && (
          <div className="p-5 rounded-2xl bg-card border border-border">
            <h3 className="font-display font-semibold text-foreground mb-4">Address</h3>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-foreground">{person.address.street}</p>
                <p className="text-muted-foreground">
                  {person.address.city}, {person.address.state} {person.address.zip}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {/* Household */}
        {household && (
          <div className="p-5 rounded-2xl bg-card border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold text-foreground">Household</h3>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{household.name}</p>
            <div className="space-y-3">
              {household.members.map((member: any) => {
                const memberPerson = getPersonById(member.personId);
                if (!memberPerson || memberPerson.id === person.id) return null;
                return (
                  <div key={member.personId} className="flex items-center gap-3">
                    <PersonAvatar person={memberPerson} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {memberPerson.firstName} {memberPerson.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground capitalize">{member.role}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Background Check */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Background Check</h3>
          <BackgroundCheckStatus status={person.backgroundCheckStatus} date={person.backgroundCheckDate} />
        </div>

        {/* Quick Actions */}
        <div className="p-5 rounded-2xl bg-card border border-border">
          <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start">
              <Send className="w-4 h-4 mr-3" />
              Send Email
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-3" />
              Send Text
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Plus className="w-4 h-4 mr-3" />
              Add Follow-up
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Heart className="w-4 h-4 mr-3" />
              Log Interaction
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground mb-1">{label}</p>
    <p className="text-sm text-foreground">{value}</p>
  </div>
);

const BackgroundCheckStatus = ({ status, date }: { status?: string; date?: string }) => {
  const config: Record<string, { icon: any; label: string; className: string }> = {
    approved: { icon: ShieldCheck, label: 'Approved', className: 'text-sage-dark bg-sage-light' },
    pending: { icon: Clock, label: 'Pending', className: 'text-gold bg-secondary' },
    expired: { icon: AlertCircle, label: 'Expired', className: 'text-coral bg-coral-light' },
    none: { icon: ShieldCheck, label: 'Not Started', className: 'text-muted-foreground bg-muted' },
  };
  
  const conf = config[status || 'none'];
  const Icon = conf.icon;
  
  return (
    <div className="flex items-center gap-3">
      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", conf.className)}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">{conf.label}</p>
        {date && (
          <p className="text-xs text-muted-foreground">
            {format(new Date(date), 'MMM d, yyyy')}
          </p>
        )}
      </div>
    </div>
  );
};

// Notes Tab
const NotesTab = ({ notes }: { notes: Note[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Notes</h3>
        <Button variant="soft" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Note
        </Button>
      </div>
      
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <MessageSquare className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">No notes yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map(note => (
            <div key={note.id} className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-foreground">{note.authorName}</span>
                  {note.isPrivate && (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-coral-light text-coral">Private</span>
                  )}
                  {note.category && (
                    <span className="px-1.5 py-0.5 rounded text-xs bg-secondary text-muted-foreground capitalize">
                      {note.category}
                    </span>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(note.createdAt), { addSuffix: true })}
                </span>
              </div>
              <p className="text-sm text-foreground leading-relaxed">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Follow-ups Tab
const FollowUpsTab = ({ followUps }: { followUps: FollowUp[] }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-foreground">Follow-ups</h3>
        <Button variant="soft" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Add Follow-up
        </Button>
      </div>
      
      {followUps.length === 0 ? (
        <div className="text-center py-12">
          <CheckCircle className="w-10 h-10 text-muted-foreground/50 mx-auto mb-3" />
          <p className="text-muted-foreground">No follow-ups</p>
        </div>
      ) : (
        <div className="space-y-3">
          {followUps.map(followUp => (
            <div 
              key={followUp.id} 
              className={cn(
                "p-4 rounded-xl border flex items-start gap-4",
                followUp.status === 'overdue' ? "bg-coral-light/30 border-coral/30" : "bg-card border-border"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                followUp.status === 'completed' ? "bg-sage-light text-sage-dark" :
                followUp.status === 'overdue' ? "bg-coral-light text-coral" :
                "bg-secondary text-muted-foreground"
              )}>
                {followUp.status === 'completed' ? (
                  <CheckCircle className="w-4 h-4" />
                ) : followUp.status === 'overdue' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground">{followUp.title}</p>
                {followUp.description && (
                  <p className="text-sm text-muted-foreground mt-1">{followUp.description}</p>
                )}
                <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                  <span>Assigned to {followUp.assignedToName}</span>
                  <span>•</span>
                  <span className={followUp.status === 'overdue' ? 'text-coral font-medium' : ''}>
                    Due {format(new Date(followUp.dueDate), 'MMM d')}
                  </span>
                </div>
              </div>
              {followUp.status !== 'completed' && (
                <Button variant="ghost" size="sm">
                  Mark Complete
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// History Tab
const HistoryTab = ({ person }: { person: Person }) => {
  const events = [
    { date: person.createdAt, type: 'created', label: 'Profile created' },
    person.firstVisit && { date: person.firstVisit, type: 'visit', label: 'First visit' },
    person.memberSince && { date: person.memberSince, type: 'member', label: 'Became a member' },
    person.backgroundCheckDate && { date: person.backgroundCheckDate, type: 'check', label: 'Background check completed' },
  ].filter(Boolean).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-4">
      <h3 className="font-display font-semibold text-foreground">Activity History</h3>
      <div className="relative pl-6 border-l-2 border-border space-y-6">
        {events.map((event: any, index) => (
          <div key={index} className="relative">
            <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-primary border-2 border-background" />
            <p className="text-sm font-medium text-foreground">{event.label}</p>
            <p className="text-xs text-muted-foreground">
              {format(new Date(event.date), 'MMMM d, yyyy')}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
