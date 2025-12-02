import { useState } from 'react';
import { 
  mockGivingSummary, mockDonations, mockRecurringGifts, 
  mockForecasts, mockFunds, mockPledgeCampaigns, mockDonors 
} from '@/data/mockGivingData';
import { DonorCard } from './DonorCard';
import { RecurringGiftCard } from './RecurringGiftCard';
import { ForecastChart } from './ForecastChart';
import { FeeCalculator } from './FeeCalculator';
import { PledgeCampaignCard } from './PledgeCampaignCard';
import { Button } from '@/components/ui/button';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, 
  RefreshCw, CreditCard, PieChart, Calendar,
  Download, Plus, Filter, Search, ArrowUpRight,
  Banknote, Clock, CheckCircle, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

type TabType = 'overview' | 'donations' | 'recurring' | 'donors' | 'campaigns' | 'forecast';

export const GivingDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs: { id: TabType; label: string; icon: any }[] = [
    { id: 'overview', label: 'Overview', icon: PieChart },
    { id: 'donations', label: 'Transactions', icon: CreditCard },
    { id: 'recurring', label: 'Recurring', icon: RefreshCw },
    { id: 'donors', label: 'Donors', icon: Users },
    { id: 'campaigns', label: 'Campaigns', icon: Calendar },
    { id: 'forecast', label: 'Forecast', icon: TrendingUp },
  ];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-sage-dark bg-sage-light';
      case 'pending': return 'text-gold bg-secondary';
      case 'failed': return 'text-coral bg-coral-light';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPaymentMethodLabel = (method: string) => {
    const labels: Record<string, string> = {
      credit_card: 'Card',
      ach: 'ACH',
      apple_pay: 'Apple Pay',
      google_pay: 'Google Pay',
      text_to_give: 'Text',
      cash: 'Cash',
      check: 'Check',
    };
    return labels[method] || method;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-display font-semibold text-foreground flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-primary" />
              Giving
            </h1>
            <p className="text-sm text-muted-foreground">
              Manage donations, track giving, and forecast finances
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Record Gift
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 bg-secondary rounded-xl p-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid md:grid-cols-4 gap-4">
              <StatCard
                title="This Month"
                value={formatCurrency(68200)}
                subtitle="Total giving"
                icon={DollarSign}
                trend="+12.5%"
                trendUp
                color="sage"
              />
              <StatCard
                title="Recurring"
                value={formatCurrency(28500)}
                subtitle="Monthly committed"
                icon={RefreshCw}
                trend="+3.2%"
                trendUp
                color="coral"
              />
              <StatCard
                title="Active Donors"
                value="156"
                subtitle="This month"
                icon={Users}
                trend="+8"
                trendUp
                color="gold"
              />
              <StatCard
                title="Avg Gift"
                value={formatCurrency(385.50)}
                subtitle="Per transaction"
                icon={TrendingUp}
                trend="-2.1%"
                trendUp={false}
                color="primary"
              />
            </div>

            {/* Fund Progress */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="text-lg font-display font-semibold text-foreground mb-4">Fund Progress</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockFunds.filter(f => f.goalAmount).map(fund => (
                  <div key={fund.id} className="p-4 rounded-xl bg-secondary/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground">{fund.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((fund.currentAmount / (fund.goalAmount || 1)) * 100)}%
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden mb-2">
                      <div 
                        className={cn(
                          "h-full rounded-full transition-all",
                          fund.color === 'sage' ? 'bg-sage' :
                          fund.color === 'coral' ? 'bg-coral' :
                          fund.color === 'gold' ? 'bg-gold' : 'bg-primary'
                        )}
                        style={{ width: `${Math.min((fund.currentAmount / (fund.goalAmount || 1)) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{formatCurrency(fund.currentAmount)}</span>
                      <span className="text-muted-foreground">of {formatCurrency(fund.goalAmount || 0)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity & Fee Calculator */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Recent Donations */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-display font-semibold text-foreground">Recent Donations</h2>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab('donations')}>
                    View all
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-3">
                  {mockDonations.slice(0, 5).map(donation => (
                    <div key={donation.id} className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {donation.isAnonymous ? '?' : donation.donorName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">
                          {donation.isAnonymous ? 'Anonymous' : donation.donorName}
                        </p>
                        <p className="text-sm text-muted-foreground">{donation.fundName}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-foreground">{formatCurrency(donation.amount)}</p>
                        <span className={cn(
                          "text-xs px-2 py-0.5 rounded-full",
                          getStatusColor(donation.status)
                        )}>
                          {donation.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee Calculator */}
              <FeeCalculator />
            </div>
          </div>
        )}

        {activeTab === 'donations' && (
          <div className="space-y-4">
            {/* Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search donations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-0 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Donations Table */}
            <div className="rounded-xl border border-border overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Donor</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Fund</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Method</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left p-4 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {mockDonations.map(donation => (
                    <tr key={donation.id} className="hover:bg-secondary/30 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">
                              {donation.isAnonymous ? '?' : donation.donorName.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <span className="font-medium text-foreground">
                            {donation.isAnonymous ? 'Anonymous' : donation.donorName}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div>
                          <p className="font-semibold text-foreground">{formatCurrency(donation.amount)}</p>
                          <p className="text-xs text-muted-foreground">Fee: {formatCurrency(donation.fee)}</p>
                        </div>
                      </td>
                      <td className="p-4 text-foreground">{donation.fundName}</td>
                      <td className="p-4 text-foreground">{getPaymentMethodLabel(donation.paymentMethod)}</td>
                      <td className="p-4">
                        <span className={cn(
                          "text-xs px-2 py-1 rounded-full capitalize",
                          getStatusColor(donation.status)
                        )}>
                          {donation.status}
                        </span>
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'recurring' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-sage-light border border-sage/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-sage-dark" />
                  <span className="text-sm font-medium text-sage-dark">Active</span>
                </div>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {mockRecurringGifts.filter(g => g.status === 'active').length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-secondary border border-gold/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-gold" />
                  <span className="text-sm font-medium text-gold">Paused</span>
                </div>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {mockRecurringGifts.filter(g => g.status === 'paused').length}
                </p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center gap-2 mb-2">
                  <Banknote className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Monthly Total</span>
                </div>
                <p className="text-2xl font-display font-semibold text-foreground">
                  {formatCurrency(mockRecurringGifts.filter(g => g.status === 'active' && g.frequency === 'monthly').reduce((sum, g) => sum + g.amount, 0))}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {mockRecurringGifts.map(gift => (
                <RecurringGiftCard key={gift.id} gift={gift} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'donors' && (
          <div className="space-y-4">
            {/* Donor Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Total Donors</p>
                <p className="text-2xl font-display font-semibold text-foreground">156</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">New This Month</p>
                <p className="text-2xl font-display font-semibold text-foreground">23</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Recurring Donors</p>
                <p className="text-2xl font-display font-semibold text-foreground">68</p>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border">
                <p className="text-sm text-muted-foreground mb-1">Retention Rate</p>
                <p className="text-2xl font-display font-semibold text-foreground">87%</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {mockDonors.map(donor => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'campaigns' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-display font-semibold text-foreground">Active Campaigns</h2>
                <p className="text-sm text-muted-foreground">Track pledge progress and campaign performance</p>
              </div>
              <Button variant="default" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {mockPledgeCampaigns.map(campaign => (
                <PledgeCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'forecast' && (
          <ForecastChart forecasts={mockForecasts} />
        )}
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  trend: string;
  trendUp: boolean;
  color: 'sage' | 'coral' | 'gold' | 'primary';
}

const StatCard = ({ title, value, subtitle, icon: Icon, trend, trendUp, color }: StatCardProps) => {
  const colorMap = {
    sage: 'bg-sage-light border-sage/10',
    coral: 'bg-coral-light border-coral/10',
    gold: 'bg-secondary border-gold/10',
    primary: 'bg-primary/10 border-primary/10',
  };

  return (
    <div className={cn("p-5 rounded-2xl border", colorMap[color])}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-muted-foreground">{title}</p>
        <Icon className="w-5 h-5 text-muted-foreground" />
      </div>
      <p className="text-2xl font-display font-semibold text-foreground mb-1">{value}</p>
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{subtitle}</p>
        <span className={cn(
          "text-xs font-medium flex items-center gap-0.5",
          trendUp ? "text-sage-dark" : "text-coral"
        )}>
          {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
          {trend}
        </span>
      </div>
    </div>
  );
};
