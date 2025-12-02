import { useState } from 'react';
import { Equipment, EquipmentRequest } from '@/types/events';
import { mockEquipment } from '@/data/mockEventsData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Package, 
  Search, 
  Plus, 
  Minus,
  MapPin,
  AlertCircle,
  Check
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const categoryColors: Record<string, string> = {
  'Seating': 'bg-blue-500/10 text-blue-600',
  'Tables': 'bg-purple-500/10 text-purple-600',
  'Audio/Visual': 'bg-green-500/10 text-green-600',
  'Stage': 'bg-orange-500/10 text-orange-600',
  'Music': 'bg-pink-500/10 text-pink-600',
  'Presentation': 'bg-cyan-500/10 text-cyan-600'
};

export function EquipmentManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cart, setCart] = useState<{ equipmentId: string; quantity: number }[]>([]);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestNotes, setRequestNotes] = useState('');

  const categories = ['all', ...new Set(mockEquipment.map(e => e.category))];

  const filteredEquipment = mockEquipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (equipmentId: string) => {
    const equipment = mockEquipment.find(e => e.id === equipmentId);
    if (!equipment) return;

    const existingItem = cart.find(c => c.equipmentId === equipmentId);
    const currentQty = existingItem?.quantity || 0;
    
    if (currentQty >= equipment.availableQuantity) {
      toast.error('Maximum available quantity reached');
      return;
    }

    if (existingItem) {
      setCart(cart.map(c => 
        c.equipmentId === equipmentId 
          ? { ...c, quantity: c.quantity + 1 }
          : c
      ));
    } else {
      setCart([...cart, { equipmentId, quantity: 1 }]);
    }
  };

  const removeFromCart = (equipmentId: string) => {
    const existingItem = cart.find(c => c.equipmentId === equipmentId);
    if (!existingItem) return;

    if (existingItem.quantity === 1) {
      setCart(cart.filter(c => c.equipmentId !== equipmentId));
    } else {
      setCart(cart.map(c => 
        c.equipmentId === equipmentId 
          ? { ...c, quantity: c.quantity - 1 }
          : c
      ));
    }
  };

  const getCartQuantity = (equipmentId: string) => {
    return cart.find(c => c.equipmentId === equipmentId)?.quantity || 0;
  };

  const submitRequest = () => {
    if (cart.length === 0) {
      toast.error('Please add items to your request');
      return;
    }
    
    toast.success('Equipment request submitted successfully');
    setCart([]);
    setRequestNotes('');
    setRequestOpen(false);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
            <DialogTrigger asChild>
              <Button className="relative">
                <Package className="h-4 w-4 mr-2" />
                Request ({totalItems})
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Equipment Request</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                {cart.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No items in your request. Add equipment from the inventory.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {cart.map(item => {
                      const equipment = mockEquipment.find(e => e.id === item.equipmentId);
                      if (!equipment) return null;
                      return (
                        <div key={item.equipmentId} className="flex items-center justify-between p-3 rounded-lg border">
                          <div>
                            <div className="font-medium">{equipment.name}</div>
                            <div className="text-sm text-muted-foreground">{equipment.category}</div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeFromCart(item.equipmentId)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-medium">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => addToCart(item.equipmentId)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label>Notes (optional)</Label>
                  <Textarea
                    placeholder="Any special requirements or setup instructions..."
                    value={requestNotes}
                    onChange={(e) => setRequestNotes(e.target.value)}
                  />
                </div>
                
                <Button onClick={submitRequest} className="w-full" disabled={cart.length === 0}>
                  Submit Request
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEquipment.map(item => {
          const cartQty = getCartQuantity(item.id);
          const isLowStock = item.availableQuantity <= 3;
          
          return (
            <Card key={item.id} className="relative overflow-hidden">
              {cartQty > 0 && (
                <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
                  {cartQty}
                </div>
              )}
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <Badge className={cn('mb-2', categoryColors[item.category] || 'bg-muted')}>
                      {item.category}
                    </Badge>
                    <h4 className="font-medium">{item.name}</h4>
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm mb-4">
                  <div className={cn(
                    "flex items-center gap-1",
                    isLowStock ? "text-yellow-600" : "text-muted-foreground"
                  )}>
                    {isLowStock && <AlertCircle className="h-4 w-4" />}
                    <span>{item.availableQuantity} of {item.quantity} available</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{item.location}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => removeFromCart(item.id)}
                    disabled={cartQty === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => addToCart(item.id)}
                    disabled={item.availableQuantity === 0 || cartQty >= item.availableQuantity}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add to Request
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-9 w-9"
                    onClick={() => addToCart(item.id)}
                    disabled={item.availableQuantity === 0 || cartQty >= item.availableQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredEquipment.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>No equipment found matching your search.</p>
        </div>
      )}
    </div>
  );
}
