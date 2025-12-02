import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  ChevronRight,
  Clock,
  Users,
  CheckCircle,
  AlertCircle,
  MessageCircle,
  ClipboardCheck
} from 'lucide-react';
import { mockMySundays, mockConnectCards, connectCardTypes } from '@/data/mockMobileData';
import { format, parseISO, isToday, isTomorrow, isThisWeek } from 'date-fns';

export function LeaderHome() {
  const nextShift = mockMySundays[0];
  const newConnectCards = mockConnectCards.filter(c => c.status === 'new');
  const upcomingShifts = mockMySundays.slice(0, 3);

  return (
    <div className="space-y-6 pb-4">
      {/* Welcome Section */}
      <div className="px-4">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          Welcome back, Sarah
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          You're serving this Sunday
        </p>
      </div>

      {/* Quick Stats */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-sage-light border-sage/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sage/20">
                  <ClipboardCheck className="w-5 h-5 text-sage-dark" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-sage-dark">{upcomingShifts.length}</div>
                  <div className="text-xs text-sage-dark/70">Upcoming Shifts</div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className={newConnectCards.length > 0 ? 'bg-coral-light border-coral/20' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${newConnectCards.length > 0 ? 'bg-coral/20' : 'bg-secondary'}`}>
                  <MessageCircle className={`w-5 h-5 ${newConnectCards.length > 0 ? 'text-coral' : 'text-muted-foreground'}`} />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${newConnectCards.length > 0 ? 'text-coral' : 'text-foreground'}`}>
                    {newConnectCards.length}
                  </div>
                  <div className={`text-xs ${newConnectCards.length > 0 ? 'text-coral/70' : 'text-muted-foreground'}`}>
                    New Cards
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Next Shift Card */}
      {nextShift && (
        <div className="px-4">
          <h2 className="font-semibold text-foreground mb-3">Your Next Shift</h2>
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <Badge variant="secondary" className="mb-2 bg-primary/20 text-primary border-0">
                    {isToday(parseISO(nextShift.date)) ? 'Today' : 
                     isTomorrow(parseISO(nextShift.date)) ? 'Tomorrow' :
                     format(parseISO(nextShift.date), 'EEEE')}
                  </Badge>
                  <h3 className="font-semibold text-foreground text-lg">{nextShift.teamName}</h3>
                  <p className="text-sm text-muted-foreground">{nextShift.position}</p>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-foreground">{nextShift.serviceTime}</div>
                  <div className="text-xs text-muted-foreground flex items-center justify-end gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    Check-in {nextShift.checkInTime}
                  </div>
                </div>
              </div>
              {nextShift.notes && (
                <div className="p-3 bg-background/50 rounded-lg mt-3">
                  <p className="text-sm text-muted-foreground">{nextShift.notes}</p>
                </div>
              )}
              <Button className="w-full mt-4" size="sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                I'll Be There
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* My Sundays */}
      <div className="px-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-semibold text-foreground">My Sundays</h2>
          <Link to="/app/sundays" className="text-sm text-primary font-medium flex items-center">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="space-y-3">
          {upcomingShifts.slice(1).map(shift => (
            <Card key={shift.id}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-secondary flex-shrink-0">
                  <span className="text-[10px] font-medium text-muted-foreground uppercase">
                    {format(parseISO(shift.date), 'MMM')}
                  </span>
                  <span className="text-lg font-bold text-foreground leading-none">
                    {format(parseISO(shift.date), 'd')}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground truncate">{shift.teamName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {shift.position} • {shift.serviceTime}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Connect Cards */}
      {newConnectCards.length > 0 && (
        <div className="px-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-foreground">New Connect Cards</h2>
            <Link to="/app/connect-cards" className="text-sm text-primary font-medium flex items-center">
              See all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {newConnectCards.slice(0, 3).map(card => (
              <Card key={card.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${connectCardTypes[card.type].color}`} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-foreground">{card.name}</span>
                        <Badge variant="secondary" className="text-[10px]">
                          {connectCardTypes[card.type].label}
                        </Badge>
                      </div>
                      {card.message && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {card.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
