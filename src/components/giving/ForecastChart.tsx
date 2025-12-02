import { GivingForecast } from '@/types/giving';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ForecastChartProps {
  forecasts: GivingForecast[];
}

export const ForecastChart = ({ forecasts }: ForecastChartProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const maxValue = Math.max(...forecasts.map(f => Math.max(f.projectedTotal, f.actualTotal || 0)));
  
  const totalProjected = forecasts.reduce((sum, f) => sum + f.projectedTotal, 0);
  const totalRecurring = forecasts.reduce((sum, f) => sum + f.projectedRecurring, 0);
  const totalOneTime = forecasts.reduce((sum, f) => sum + f.projectedOneTime, 0);

  // Calculate year-end projection based on current trends
  const monthsWithActual = forecasts.filter(f => f.actualTotal !== undefined);
  const avgVariance = monthsWithActual.length > 0 
    ? monthsWithActual.reduce((sum, f) => sum + ((f.actualTotal || 0) - f.projectedTotal), 0) / monthsWithActual.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-card border border-border">
          <p className="text-sm text-muted-foreground mb-1">6-Month Projection</p>
          <p className="text-2xl font-display font-semibold text-foreground">{formatCurrency(totalProjected)}</p>
          <p className="text-xs text-muted-foreground mt-1">Total expected giving</p>
        </div>
        <div className="p-5 rounded-2xl bg-sage-light border border-sage/10">
          <p className="text-sm text-muted-foreground mb-1">Recurring Base</p>
          <p className="text-2xl font-display font-semibold text-foreground">{formatCurrency(totalRecurring)}</p>
          <p className="text-xs text-sage-dark mt-1 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            {Math.round((totalRecurring / totalProjected) * 100)}% of total
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-coral-light border border-coral/10">
          <p className="text-sm text-muted-foreground mb-1">One-Time Expected</p>
          <p className="text-2xl font-display font-semibold text-foreground">{formatCurrency(totalOneTime)}</p>
          <p className="text-xs text-coral mt-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            Variable, based on trends
          </p>
        </div>
        <div className="p-5 rounded-2xl bg-secondary border border-gold/10">
          <p className="text-sm text-muted-foreground mb-1">Avg Monthly</p>
          <p className="text-2xl font-display font-semibold text-foreground">{formatCurrency(totalProjected / 6)}</p>
          <p className={cn(
            "text-xs mt-1 flex items-center gap-1",
            avgVariance >= 0 ? "text-sage-dark" : "text-coral"
          )}>
            {avgVariance >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {avgVariance >= 0 ? '+' : ''}{formatCurrency(avgVariance)} avg variance
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="p-6 rounded-2xl bg-card border border-border">
        <h2 className="text-lg font-display font-semibold text-foreground mb-6">Monthly Forecast</h2>
        
        {/* Bar Chart */}
        <div className="space-y-4">
          {forecasts.map((forecast, index) => {
            const projectedWidth = (forecast.projectedTotal / maxValue) * 100;
            const actualWidth = forecast.actualTotal ? (forecast.actualTotal / maxValue) * 100 : 0;
            const recurringWidth = (forecast.projectedRecurring / maxValue) * 100;
            const variance = forecast.actualTotal ? forecast.actualTotal - forecast.projectedTotal : 0;
            
            return (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground w-24">{forecast.month}</span>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-muted-foreground">
                      Projected: {formatCurrency(forecast.projectedTotal)}
                    </span>
                    {forecast.actualTotal !== undefined && (
                      <span className={cn(
                        "font-medium",
                        variance >= 0 ? "text-sage-dark" : "text-coral"
                      )}>
                        Actual: {formatCurrency(forecast.actualTotal)}
                        <span className="ml-1 text-xs">
                          ({variance >= 0 ? '+' : ''}{formatCurrency(variance)})
                        </span>
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="relative h-8">
                  {/* Background */}
                  <div className="absolute inset-0 bg-secondary rounded-lg" />
                  
                  {/* Projected (full bar) */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-primary/20 rounded-lg transition-all"
                    style={{ width: `${projectedWidth}%` }}
                  />
                  
                  {/* Recurring portion */}
                  <div 
                    className="absolute inset-y-0 left-0 bg-primary/40 rounded-l-lg transition-all"
                    style={{ width: `${recurringWidth}%` }}
                  />
                  
                  {/* Actual (if exists) */}
                  {forecast.actualTotal !== undefined && (
                    <div 
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-lg transition-all border-2",
                        variance >= 0 ? "border-sage bg-sage/20" : "border-coral bg-coral/20"
                      )}
                      style={{ width: `${actualWidth}%` }}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-6 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/40" />
            <span className="text-sm text-muted-foreground">Recurring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary/20" />
            <span className="text-sm text-muted-foreground">One-time (projected)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-sage bg-sage/20" />
            <span className="text-sm text-muted-foreground">Actual (on/above target)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded border-2 border-coral bg-coral/20" />
            <span className="text-sm text-muted-foreground">Actual (below target)</span>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-sage-light/50 border border-sage/20">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-sage-dark" />
            Growth Opportunities
          </h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sage-dark mt-0.5" />
              <span>12 donors increased giving year-over-year</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sage-dark mt-0.5" />
              <span>8 occasional donors eligible for recurring invitation</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-sage-dark mt-0.5" />
              <span>April typically sees 15% giving increase (Easter)</span>
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-coral-light/50 border border-coral/20">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-coral" />
            Attention Areas
          </h3>
          <ul className="space-y-2 text-sm text-foreground">
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-coral mt-0.5" />
              <span>3 recurring gifts paused in last 30 days</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-coral mt-0.5" />
              <span>Summer months historically 20% lower</span>
            </li>
            <li className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-coral mt-0.5" />
              <span>5 major donors haven't given in 60+ days</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
