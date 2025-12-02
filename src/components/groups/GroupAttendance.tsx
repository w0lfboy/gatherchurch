import { useState } from 'react';
import { GroupSession, GroupMember, SessionAttendee } from '@/types/groups';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, XCircle, Clock, Plus, Calendar,
  Users, TrendingUp, MoreHorizontal
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GroupAttendanceProps {
  groupId: string;
  sessions: GroupSession[];
  members: GroupMember[];
}

export const GroupAttendance = ({ groupId, sessions, members }: GroupAttendanceProps) => {
  const [showQuickAttendance, setShowQuickAttendance] = useState(false);
  const [quickAttendance, setQuickAttendance] = useState<Record<string, 'present' | 'absent' | 'excused'>>({});

  // Initialize quick attendance with all members as present (one-tap default)
  const initializeQuickAttendance = () => {
    const initial: Record<string, 'present' | 'absent' | 'excused'> = {};
    members.forEach(m => {
      initial[m.id] = 'present';
    });
    setQuickAttendance(initial);
    setShowQuickAttendance(true);
  };

  const toggleAttendance = (memberId: string) => {
    setQuickAttendance(prev => {
      const current = prev[memberId];
      const next = current === 'present' ? 'absent' : current === 'absent' ? 'excused' : 'present';
      return { ...prev, [memberId]: next };
    });
  };

  const getStatusIcon = (status: SessionAttendee['status']) => {
    switch (status) {
      case 'present': return <CheckCircle className="w-4 h-4 text-sage-dark" />;
      case 'absent': return <XCircle className="w-4 h-4 text-coral" />;
      case 'excused': return <Clock className="w-4 h-4 text-gold" />;
    }
  };

  const getStatusColor = (status: SessionAttendee['status']) => {
    switch (status) {
      case 'present': return 'bg-sage-light text-sage-dark border-sage/30';
      case 'absent': return 'bg-coral-light text-coral border-coral/30';
      case 'excused': return 'bg-secondary text-gold border-gold/30';
    }
  };

  // Calculate stats
  const totalSessions = sessions.length;
  const avgAttendance = totalSessions > 0
    ? Math.round(sessions.reduce((sum, s) => sum + (s.totalPresent / (s.totalPresent + s.totalAbsent) * 100), 0) / totalSessions)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-sage-light border border-sage/20">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-sage-dark" />
            <span className="text-sm font-medium text-sage-dark">Total Sessions</span>
          </div>
          <p className="text-2xl font-display font-semibold text-foreground">{totalSessions}</p>
        </div>
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium text-primary">Avg Attendance</span>
          </div>
          <p className="text-2xl font-display font-semibold text-foreground">{avgAttendance}%</p>
        </div>
        <div className="p-4 rounded-xl bg-card border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm font-medium text-muted-foreground">Active Members</span>
          </div>
          <p className="text-2xl font-display font-semibold text-foreground">{members.length}</p>
        </div>
      </div>

      {/* Quick Attendance */}
      {!showQuickAttendance ? (
        <Button onClick={initializeQuickAttendance} className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Take Today's Attendance
        </Button>
      ) : (
        <div className="p-6 rounded-2xl bg-card border border-border">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Quick Attendance</h3>
              <p className="text-sm text-muted-foreground">
                Tap to toggle: Present → Absent → Excused
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowQuickAttendance(false)}>
                Cancel
              </Button>
              <Button variant="default" size="sm">
                Save
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {members.map(member => {
              const status = quickAttendance[member.id] || 'present';
              return (
                <button
                  key={member.id}
                  onClick={() => toggleAttendance(member.id)}
                  className={cn(
                    "p-3 rounded-xl border-2 transition-all text-left",
                    getStatusColor(status)
                  )}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {getStatusIcon(status)}
                    <span className="text-xs font-medium capitalize">{status}</span>
                  </div>
                  <p className="font-medium text-foreground truncate">{member.personName}</p>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-sage-dark" />
              <span>Present: {Object.values(quickAttendance).filter(s => s === 'present').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <XCircle className="w-4 h-4 text-coral" />
              <span>Absent: {Object.values(quickAttendance).filter(s => s === 'absent').length}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gold" />
              <span>Excused: {Object.values(quickAttendance).filter(s => s === 'excused').length}</span>
            </div>
          </div>
        </div>
      )}

      {/* Session History */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Session History</h3>
        
        {sessions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center rounded-xl bg-secondary/50">
            <Calendar className="w-12 h-12 text-muted-foreground/50 mb-3" />
            <p className="text-muted-foreground">No sessions recorded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {sessions.map(session => (
              <div key={session.id} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">
                      {new Date(session.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    {session.topic && (
                      <p className="text-sm text-muted-foreground mt-1">Topic: {session.topic}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">
                        {session.totalPresent}/{session.totalPresent + session.totalAbsent}
                      </p>
                      <p className="text-xs text-muted-foreground">present</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {session.notes && (
                  <p className="text-sm text-muted-foreground mb-3 p-3 rounded-lg bg-secondary/50">
                    {session.notes}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {session.attendees.map(attendee => (
                    <span
                      key={attendee.memberId}
                      className={cn(
                        "text-xs px-2 py-1 rounded-full flex items-center gap-1",
                        getStatusColor(attendee.status)
                      )}
                    >
                      {getStatusIcon(attendee.status)}
                      {attendee.memberName.split(' ')[0]}
                    </span>
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
