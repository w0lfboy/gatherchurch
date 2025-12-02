import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Play,
  Search,
  Clock,
  Download,
  Share2,
  BookOpen
} from 'lucide-react';
import { mockSermons } from '@/data/mockMobileData';
import { format, parseISO } from 'date-fns';

export function SermonArchive() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeries, setSelectedSeries] = useState<string | null>(null);

  const series = [...new Set(mockSermons.map(s => s.seriesName).filter(Boolean))];
  
  const filteredSermons = mockSermons.filter(sermon => {
    const matchesSearch = sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sermon.speaker.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSeries = !selectedSeries || sermon.seriesName === selectedSeries;
    return matchesSearch && matchesSeries;
  });

  return (
    <div className="space-y-6 pb-4">
      {/* Header */}
      <div className="px-4">
        <h1 className="text-2xl font-display font-semibold text-foreground">
          Sermons
        </h1>
        <p className="text-muted-foreground text-sm mt-1">
          Watch, listen, and grow
        </p>
      </div>

      {/* Search */}
      <div className="px-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search sermons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      {/* Series Filter */}
      <div className="px-4">
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <Button
            size="sm"
            variant={selectedSeries === null ? 'default' : 'outline'}
            onClick={() => setSelectedSeries(null)}
            className="flex-shrink-0"
          >
            All
          </Button>
          {series.map(s => (
            <Button
              key={s}
              size="sm"
              variant={selectedSeries === s ? 'default' : 'outline'}
              onClick={() => setSelectedSeries(s || null)}
              className="flex-shrink-0"
            >
              {s}
            </Button>
          ))}
        </div>
      </div>

      {/* Sermon List */}
      <div className="px-4 space-y-4">
        {filteredSermons.map(sermon => (
          <Card key={sermon.id} className="overflow-hidden">
            <div className="relative aspect-video bg-muted">
              {sermon.thumbnail && (
                <img 
                  src={sermon.thumbnail} 
                  alt={sermon.title}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Button 
                size="lg" 
                className="absolute bottom-4 left-4 rounded-full w-12 h-12"
              >
                <Play className="w-5 h-5 ml-0.5" />
              </Button>
              <Badge className="absolute top-4 right-4 bg-black/70">
                <Clock className="w-3 h-3 mr-1" />
                {sermon.duration}
              </Badge>
            </div>
            <CardContent className="p-4">
              {sermon.seriesName && (
                <div className="text-xs text-primary font-medium mb-1">
                  {sermon.seriesName}
                </div>
              )}
              <h3 className="font-semibold text-foreground text-lg">{sermon.title}</h3>
              <p className="text-sm text-muted-foreground mt-1">
                {sermon.speaker} • {format(parseISO(sermon.date), 'MMM d, yyyy')}
              </p>
              {sermon.description && (
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                  {sermon.description}
                </p>
              )}
              <div className="flex gap-2 mt-4">
                <Button size="sm" className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  Watch
                </Button>
                <Button size="sm" variant="outline">
                  <BookOpen className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Download className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="outline">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
