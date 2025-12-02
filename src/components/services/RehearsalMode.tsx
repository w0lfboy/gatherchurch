import { useState, useEffect, useRef } from 'react';
import { Service, ServiceItem } from '@/types/services';
import { mockSongs, availableKeys, formatDuration } from '@/data/mockServicesData';
import { cn } from '@/lib/utils';
import { 
  Play, Pause, SkipForward, SkipBack, Music, 
  ChevronUp, ChevronDown, Minus, Plus, X,
  FileText, Volume2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RehearsalModeProps {
  service: Service;
  onClose: () => void;
}

export const RehearsalMode = ({ service, onClose }: RehearsalModeProps) => {
  const songItems = service.items.filter(item => item.type === 'song');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(72);
  const [selectedKey, setSelectedKey] = useState('E');
  const [showMetronome, setShowMetronome] = useState(false);
  const [beat, setBeat] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentSong = songItems[currentIndex];
  const songData = mockSongs.find(s => s.id === currentSong?.songId);

  useEffect(() => {
    if (songData) {
      setTempo(songData.defaultTempo);
      setSelectedKey(currentSong.selectedKey || songData.defaultKey);
    }
  }, [currentIndex, songData, currentSong]);

  useEffect(() => {
    if (showMetronome && isPlaying) {
      const interval = (60 / tempo) * 1000;
      intervalRef.current = setInterval(() => {
        setBeat(b => (b + 1) % 4);
      }, interval);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [showMetronome, isPlaying, tempo]);

  const goNext = () => {
    if (currentIndex < songItems.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const transposeKey = (direction: 'up' | 'down') => {
    const currentKeyIndex = availableKeys.indexOf(selectedKey);
    if (direction === 'up') {
      setSelectedKey(availableKeys[(currentKeyIndex + 1) % availableKeys.length]);
    } else {
      setSelectedKey(availableKeys[(currentKeyIndex - 1 + availableKeys.length) % availableKeys.length]);
    }
  };

  if (!currentSong || !songData) {
    return (
      <div className="fixed inset-0 bg-charcoal z-50 flex items-center justify-center">
        <div className="text-center text-white">
          <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl">No songs in this service</p>
          <Button variant="outline" className="mt-4" onClick={onClose}>
            Close Rehearsal Mode
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-charcoal z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="text-white/60 text-sm">
            Song {currentIndex + 1} of {songItems.length}
          </span>
          <div className="flex items-center gap-2">
            {songItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  idx === currentIndex ? "bg-sage" : "bg-white/20 hover:bg-white/40"
                )}
              />
            ))}
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Song info */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-display font-bold text-white mb-2">
              {songData.title}
            </h1>
            <p className="text-xl text-white/60">{songData.artist}</p>
          </div>

          {/* Key and tempo */}
          <div className="flex items-center gap-8 mb-12">
            {/* Key selector */}
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-sm mb-2">Key</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => transposeKey('down')}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronDown className="w-5 h-5 text-white" />
                </button>
                <span className="text-4xl font-display font-bold text-sage w-16 text-center">
                  {selectedKey}
                </span>
                <button 
                  onClick={() => transposeKey('up')}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <ChevronUp className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>

            {/* Tempo */}
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-sm mb-2">Tempo</span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setTempo(t => Math.max(40, t - 2))}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Minus className="w-5 h-5 text-white" />
                </button>
                <span className="text-4xl font-display font-bold text-coral w-20 text-center">
                  {tempo}
                </span>
                <button 
                  onClick={() => setTempo(t => Math.min(200, t + 2))}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <Plus className="w-5 h-5 text-white" />
                </button>
              </div>
              <span className="text-white/40 text-xs mt-1">BPM</span>
            </div>

            {/* Duration */}
            <div className="flex flex-col items-center">
              <span className="text-white/40 text-sm mb-2">Duration</span>
              <span className="text-4xl font-display font-bold text-gold">
                {formatDuration(songData.duration)}
              </span>
            </div>
          </div>

          {/* Metronome */}
          {showMetronome && (
            <div className="flex items-center gap-3 mb-8">
              {[0, 1, 2, 3].map((b) => (
                <div
                  key={b}
                  className={cn(
                    "w-4 h-4 rounded-full transition-all",
                    beat === b 
                      ? b === 0 ? "bg-coral scale-150" : "bg-sage scale-125"
                      : "bg-white/20"
                  )}
                />
              ))}
            </div>
          )}

          {/* Playback controls */}
          <div className="flex items-center gap-4">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30"
            >
              <SkipBack className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-4 rounded-2xl bg-sage hover:bg-sage/90 transition-colors"
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" />
              ) : (
                <Play className="w-8 h-8 text-white" />
              )}
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === songItems.length - 1}
              className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-30"
            >
              <SkipForward className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Quick actions */}
          <div className="flex items-center gap-3 mt-8">
            <button
              onClick={() => setShowMetronome(!showMetronome)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-colors",
                showMetronome 
                  ? "bg-sage/20 text-sage" 
                  : "bg-white/10 text-white/60 hover:text-white"
              )}
            >
              <Volume2 className="w-4 h-4" />
              Metronome
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 text-white/60 hover:text-white text-sm transition-colors">
              <FileText className="w-4 h-4" />
              Chord Chart
            </button>
          </div>
        </div>

        {/* Song list sidebar */}
        <div className="w-80 bg-white/5 border-l border-white/10 p-4 overflow-auto">
          <h3 className="text-white/40 text-sm font-medium mb-4">Set List</h3>
          <div className="space-y-2">
            {songItems.map((item, idx) => {
              const song = mockSongs.find(s => s.id === item.songId);
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={cn(
                    "w-full p-3 rounded-xl text-left transition-colors",
                    idx === currentIndex
                      ? "bg-sage/20 border border-sage/30"
                      : "bg-white/5 hover:bg-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                      idx === currentIndex ? "bg-sage text-white" : "bg-white/10 text-white/40"
                    )}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className={cn(
                        "font-medium truncate",
                        idx === currentIndex ? "text-white" : "text-white/60"
                      )}>
                        {song?.title || item.title}
                      </p>
                      <p className="text-xs text-white/40">
                        {item.selectedKey || song?.defaultKey} • {song?.defaultTempo || 72} BPM
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
