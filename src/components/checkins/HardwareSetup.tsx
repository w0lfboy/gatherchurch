import { CheckInStation, SupportedDevice, SupportedPrinter } from '@/types/checkins';
import { Button } from '@/components/ui/button';
import { 
  Monitor, Printer, Wifi, WifiOff, Plus, Settings,
  CheckCircle, XCircle, Tablet, Laptop, Computer, AlertCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface HardwareSetupProps {
  stations: CheckInStation[];
  devices: SupportedDevice[];
  printers: SupportedPrinter[];
}

export const HardwareSetup = ({ stations, devices, printers }: HardwareSetupProps) => {
  const getDeviceIcon = (type: CheckInStation['deviceType']) => {
    switch (type) {
      case 'ipad':
      case 'android_tablet':
        return Tablet;
      case 'chromebook':
        return Laptop;
      default:
        return Computer;
    }
  };

  const getModeLabel = (mode: CheckInStation['mode']) => {
    switch (mode) {
      case 'self_service': return 'Self-Service';
      case 'leader_assisted': return 'Leader Assisted';
      case 'express': return 'Express';
    }
  };

  return (
    <div className="space-y-6">
      {/* Stations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Check-In Stations</h2>
          <Button variant="default" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Station
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {stations.map(station => {
            const DeviceIcon = getDeviceIcon(station.deviceType);
            return (
              <div key={station.id} className="p-5 rounded-xl bg-card border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center",
                      station.isOnline ? "bg-sage-light" : "bg-muted"
                    )}>
                      <DeviceIcon className={cn(
                        "w-5 h-5",
                        station.isOnline ? "text-sage-dark" : "text-muted-foreground"
                      )} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{station.name}</h3>
                      <p className="text-sm text-muted-foreground">{station.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {station.isOnline ? (
                      <span className="flex items-center gap-1 text-xs text-sage-dark">
                        <Wifi className="w-3 h-3" />
                        Online
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <WifiOff className="w-3 h-3" />
                        Offline
                      </span>
                    )}
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Settings className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Mode</p>
                    <p className="text-sm font-medium text-foreground">{getModeLabel(station.mode)}</p>
                  </div>
                  <div className="p-2 rounded-lg bg-secondary/50">
                    <p className="text-xs text-muted-foreground">Device</p>
                    <p className="text-sm font-medium text-foreground capitalize">{station.deviceType.replace('_', ' ')}</p>
                  </div>
                </div>

                {/* Printer Status */}
                {station.printer ? (
                  <div className={cn(
                    "p-3 rounded-lg border flex items-center justify-between",
                    station.printer.status === 'connected' 
                      ? "bg-sage-light/50 border-sage/30"
                      : "bg-coral-light/50 border-coral/30"
                  )}>
                    <div className="flex items-center gap-2">
                      <Printer className={cn(
                        "w-4 h-4",
                        station.printer.status === 'connected' ? "text-sage-dark" : "text-coral"
                      )} />
                      <span className="text-sm text-foreground">{station.printer.name}</span>
                    </div>
                    <span className={cn(
                      "text-xs font-medium capitalize",
                      station.printer.status === 'connected' ? "text-sage-dark" : "text-coral"
                    )}>
                      {station.printer.status}
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg bg-muted border border-border flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">No printer assigned</span>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      Add Printer
                    </Button>
                  </div>
                )}

                {/* Last Activity */}
                {station.lastActivity && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Last activity: {new Date(station.lastActivity).toLocaleTimeString()}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Supported Hardware */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Devices */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Monitor className="w-5 h-5 text-primary" />
            Supported Devices
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Check-in works on any modern device with a web browser.
          </p>
          <div className="space-y-3">
            {devices.map(device => (
              <div key={device.type} className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground">{device.name}</h3>
                  <CheckCircle className="w-4 h-4 text-sage" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{device.requirements}</p>
                <div className="flex flex-wrap gap-1">
                  {device.features.map(feature => (
                    <span key={feature} className="text-xs px-2 py-0.5 rounded-full bg-background text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Printers */}
        <div className="p-6 rounded-2xl bg-card border border-border">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Printer className="w-5 h-5 text-primary" />
            Supported Label Printers
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            Works with popular thermal label printers via USB, Bluetooth, or WiFi.
          </p>
          <div className="space-y-3">
            {printers.map(printer => (
              <div key={printer.type} className="p-4 rounded-lg bg-secondary/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground capitalize">{printer.type}</h3>
                  <CheckCircle className="w-4 h-4 text-sage" />
                </div>
                <p className="text-xs text-muted-foreground mb-1">
                  Models: {printer.models.join(', ')}
                </p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {printer.connectionTypes.map(conn => (
                    <span key={conn} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {conn}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
        <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-primary" />
          Setup Tips
        </h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
            For best results, use dedicated tablets at each check-in location
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
            Bluetooth printers work great for mobile check-in stations
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
            WiFi printers can be shared across multiple stations
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
            Consider a backup station in case of hardware issues
          </li>
        </ul>
      </div>
    </div>
  );
};
