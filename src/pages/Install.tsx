import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Smartphone, 
  Download, 
  Share, 
  PlusSquare,
  ChevronRight,
  CheckCircle,
  Wifi,
  Bell,
  Zap
} from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function Install() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Detect iOS
    const ua = window.navigator.userAgent;
    const iOS = /iPad|iPhone|iPod/.test(ua);
    setIsIOS(iOS);

    // Listen for install prompt
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary to-primary/80 text-primary-foreground py-16 px-6">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 rounded-2xl bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl font-bold">G</span>
          </div>
          <h1 className="text-3xl font-display font-bold mb-3">
            Get the Gather App
          </h1>
          <p className="text-primary-foreground/80">
            Your church community, always in your pocket
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8 space-y-8">
        {isInstalled ? (
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-green-800 mb-2">
                App Installed!
              </h2>
              <p className="text-green-700 mb-4">
                Gather is installed on your device. You can find it on your home screen.
              </p>
              <Link to="/app">
                <Button className="w-full">
                  Open App
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Features */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center mx-auto mb-2">
                  <Wifi className="w-6 h-6 text-sage-dark" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Works Offline</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-coral-light flex items-center justify-center mx-auto mb-2">
                  <Bell className="w-6 h-6 text-coral" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Notifications</span>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-2">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-muted-foreground">Fast & Light</span>
              </div>
            </div>

            {/* Install Instructions */}
            {deferredPrompt ? (
              <Button 
                size="lg" 
                className="w-full h-14 text-lg"
                onClick={handleInstall}
              >
                <Download className="w-5 h-5 mr-2" />
                Install App
              </Button>
            ) : isIOS ? (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Install on iPhone/iPad
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                        1
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Tap the Share button</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Share className="w-4 h-4" /> at the bottom of Safari
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                        2
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Tap "Add to Home Screen"</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <PlusSquare className="w-4 h-4" /> Scroll down to find it
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                        3
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Tap "Add"</p>
                        <p className="text-sm text-muted-foreground">
                          The app will appear on your home screen
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Install on Android
                  </h3>
                  <ol className="space-y-4">
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                        1
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Open browser menu</p>
                        <p className="text-sm text-muted-foreground">
                          Tap the three dots (⋮) in Chrome
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                        2
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Tap "Install app" or "Add to Home screen"</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                        3
                      </span>
                      <div>
                        <p className="font-medium text-foreground">Confirm installation</p>
                        <p className="text-sm text-muted-foreground">
                          The app will be added to your home screen
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            )}

            {/* Continue in browser */}
            <div className="text-center">
              <Link to="/app">
                <Button variant="ghost" className="text-muted-foreground">
                  Continue in browser
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>
          </>
        )}

        {/* App Preview */}
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground text-center">What you'll get</h3>
          <div className="grid gap-3">
            {[
              { icon: '📖', title: 'Sermons', desc: 'Watch and listen anytime' },
              { icon: '💝', title: 'Easy Giving', desc: 'Give securely in seconds' },
              { icon: '👥', title: 'Groups', desc: 'Stay connected with your community' },
              { icon: '📅', title: 'Events', desc: 'Never miss what\'s happening' },
              { icon: '🙏', title: 'Prayer', desc: 'Submit and share prayer requests' },
            ].map(item => (
              <Card key={item.title}>
                <CardContent className="p-4 flex items-center gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="font-medium text-foreground">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
