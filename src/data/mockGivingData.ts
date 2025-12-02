import { 
  Fund, Donation, RecurringGift, Donor, PledgeCampaign, 
  Pledge, GivingForecast, GivingSummary, GivingTier 
} from '@/types/giving';

export const mockFunds: Fund[] = [
  { id: 'f1', name: 'General Fund', description: 'Support weekly operations', color: 'sage', isDefault: true, currentAmount: 245000 },
  { id: 'f2', name: 'Missions', description: 'Global and local outreach', color: 'coral', isDefault: false, goalAmount: 50000, currentAmount: 32500 },
  { id: 'f3', name: 'Building Fund', description: 'Facility maintenance and improvements', color: 'gold', isDefault: false, goalAmount: 100000, currentAmount: 67800 },
  { id: 'f4', name: 'Youth Ministry', description: 'Student programs and events', color: 'primary', isDefault: false, goalAmount: 25000, currentAmount: 18200 },
  { id: 'f5', name: 'Benevolence', description: 'Help for those in need', color: 'sage', isDefault: false, currentAmount: 12400 },
];

export const mockDonations: Donation[] = [
  { id: 'd1', donorId: 'donor1', donorName: 'Sarah Mitchell', amount: 500, fee: 15.50, netAmount: 484.50, fundId: 'f1', fundName: 'General Fund', paymentMethod: 'credit_card', status: 'completed', isAnonymous: false, createdAt: '2024-12-01T09:30:00' },
  { id: 'd2', donorId: 'donor2', donorName: 'Marcus Thompson', amount: 250, fee: 7.75, netAmount: 242.25, fundId: 'f1', fundName: 'General Fund', paymentMethod: 'ach', status: 'completed', recurringGiftId: 'rg1', isAnonymous: false, createdAt: '2024-12-01T10:15:00' },
  { id: 'd3', donorId: 'donor3', donorName: 'Jennifer Lee', amount: 1000, fee: 29.90, netAmount: 970.10, fundId: 'f2', fundName: 'Missions', paymentMethod: 'credit_card', status: 'completed', isAnonymous: false, createdAt: '2024-11-30T14:00:00' },
  { id: 'd4', donorId: 'donor4', donorName: 'Anonymous', amount: 5000, fee: 45.00, netAmount: 4955.00, fundId: 'f3', fundName: 'Building Fund', paymentMethod: 'ach', status: 'completed', isAnonymous: true, createdAt: '2024-11-29T11:00:00' },
  { id: 'd5', donorId: 'donor1', donorName: 'Sarah Mitchell', amount: 100, fee: 3.20, netAmount: 96.80, fundId: 'f4', fundName: 'Youth Ministry', paymentMethod: 'apple_pay', status: 'completed', isAnonymous: false, roundUpAmount: 2.50, createdAt: '2024-11-28T16:45:00' },
  { id: 'd6', donorId: 'donor5', donorName: 'Robert Chen', amount: 150, fee: 4.85, netAmount: 145.15, fundId: 'f1', fundName: 'General Fund', paymentMethod: 'text_to_give', status: 'completed', isAnonymous: false, createdAt: '2024-11-27T19:00:00' },
  { id: 'd7', donorId: 'donor6', donorName: 'David Mitchell', amount: 300, fee: 9.30, netAmount: 290.70, fundId: 'f1', fundName: 'General Fund', paymentMethod: 'credit_card', status: 'pending', isAnonymous: false, createdAt: '2024-12-02T08:00:00' },
];

export const mockRecurringGifts: RecurringGift[] = [
  { id: 'rg1', donorId: 'donor2', donorName: 'Marcus Thompson', amount: 250, fundId: 'f1', fundName: 'General Fund', frequency: 'monthly', paymentMethod: 'ach', nextProcessingDate: '2025-01-01', status: 'active', startDate: '2023-06-01', totalGiven: 4500, giftCount: 18 },
  { id: 'rg2', donorId: 'donor1', donorName: 'Sarah Mitchell', amount: 500, fundId: 'f1', fundName: 'General Fund', frequency: 'monthly', paymentMethod: 'credit_card', nextProcessingDate: '2025-01-15', status: 'active', startDate: '2022-01-15', totalGiven: 17500, giftCount: 35 },
  { id: 'rg3', donorId: 'donor3', donorName: 'Jennifer Lee', amount: 100, fundId: 'f2', fundName: 'Missions', frequency: 'monthly', paymentMethod: 'ach', nextProcessingDate: '2025-01-01', status: 'active', startDate: '2024-03-01', totalGiven: 900, giftCount: 9 },
  { id: 'rg4', donorId: 'donor5', donorName: 'Robert Chen', amount: 75, fundId: 'f1', fundName: 'General Fund', frequency: 'weekly', paymentMethod: 'credit_card', nextProcessingDate: '2024-12-08', status: 'active', startDate: '2024-09-01', totalGiven: 1050, giftCount: 14 },
  { id: 'rg5', donorId: 'donor4', donorName: 'Anonymous Donor', amount: 1000, fundId: 'f3', fundName: 'Building Fund', frequency: 'monthly', paymentMethod: 'ach', nextProcessingDate: '2025-01-01', status: 'paused', startDate: '2024-01-01', totalGiven: 11000, giftCount: 11 },
];

export const mockDonors: Donor[] = [
  {
    id: 'donor1',
    personId: '1',
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'sarah.mitchell@email.com',
    phone: '(555) 123-4567',
    totalGiven: 24500,
    totalGifts: 52,
    averageGift: 471.15,
    largestGift: 2000,
    firstGiftDate: '2019-06-15',
    lastGiftDate: '2024-12-01',
    recurringGifts: [mockRecurringGifts[1]],
    pledges: [],
    preferredPaymentMethod: 'credit_card',
    givingTier: 'faithful',
    yearToDateGiving: 7200,
    lastYearGiving: 6500,
  },
  {
    id: 'donor2',
    personId: '4',
    firstName: 'Marcus',
    lastName: 'Thompson',
    email: 'marcus.t@email.com',
    phone: '(555) 234-5678',
    totalGiven: 8500,
    totalGifts: 24,
    averageGift: 354.17,
    largestGift: 1000,
    firstGiftDate: '2020-03-01',
    lastGiftDate: '2024-12-01',
    recurringGifts: [mockRecurringGifts[0]],
    pledges: [],
    preferredPaymentMethod: 'ach',
    givingTier: 'regular',
    yearToDateGiving: 3500,
    lastYearGiving: 3000,
  },
  {
    id: 'donor3',
    personId: '5',
    firstName: 'Jennifer',
    lastName: 'Lee',
    email: 'jennifer.lee@email.com',
    phone: '(555) 345-6789',
    totalGiven: 45000,
    totalGifts: 89,
    averageGift: 505.62,
    largestGift: 5000,
    firstGiftDate: '2015-04-10',
    lastGiftDate: '2024-11-30',
    recurringGifts: [mockRecurringGifts[2]],
    pledges: [],
    preferredPaymentMethod: 'credit_card',
    givingTier: 'major',
    yearToDateGiving: 12500,
    lastYearGiving: 10200,
  },
  {
    id: 'donor5',
    personId: '8',
    firstName: 'Robert',
    lastName: 'Chen',
    email: 'robert.chen@email.com',
    phone: '(555) 678-9012',
    totalGiven: 3200,
    totalGifts: 28,
    averageGift: 114.29,
    largestGift: 500,
    firstGiftDate: '2023-01-15',
    lastGiftDate: '2024-11-27',
    recurringGifts: [mockRecurringGifts[3]],
    pledges: [],
    preferredPaymentMethod: 'text_to_give',
    givingTier: 'regular',
    yearToDateGiving: 2100,
    lastYearGiving: 1100,
  },
];

export const mockPledgeCampaigns: PledgeCampaign[] = [
  {
    id: 'pc1',
    name: '2025 Building Expansion',
    description: 'Fund our new community center addition',
    goalAmount: 500000,
    raisedAmount: 187500,
    pledgedAmount: 425000,
    startDate: '2024-09-01',
    endDate: '2025-12-31',
    status: 'active',
    pledgeCount: 85,
    donorCount: 72,
    fundId: 'f3',
  },
  {
    id: 'pc2',
    name: 'Mission Trip 2025',
    description: 'Support our summer mission trip to Guatemala',
    goalAmount: 35000,
    raisedAmount: 12000,
    pledgedAmount: 28000,
    startDate: '2024-11-01',
    endDate: '2025-06-01',
    status: 'active',
    pledgeCount: 42,
    donorCount: 38,
    fundId: 'f2',
  },
];

export const mockPledges: Pledge[] = [
  { id: 'p1', donorId: 'donor1', donorName: 'Sarah Mitchell', campaignId: 'pc1', campaignName: '2025 Building Expansion', pledgedAmount: 5000, fulfilledAmount: 2500, frequency: 'monthly', startDate: '2024-09-15', endDate: '2025-09-15', status: 'active' },
  { id: 'p2', donorId: 'donor3', donorName: 'Jennifer Lee', campaignId: 'pc1', campaignName: '2025 Building Expansion', pledgedAmount: 25000, fulfilledAmount: 10000, frequency: 'quarterly', startDate: '2024-09-01', endDate: '2025-12-31', status: 'active' },
  { id: 'p3', donorId: 'donor2', donorName: 'Marcus Thompson', campaignId: 'pc2', campaignName: 'Mission Trip 2025', pledgedAmount: 1200, fulfilledAmount: 400, frequency: 'monthly', startDate: '2024-11-01', endDate: '2025-05-01', status: 'active' },
];

export const mockForecasts: GivingForecast[] = [
  { month: 'Dec 2024', projectedRecurring: 28500, projectedOneTime: 45000, projectedTotal: 73500, actualTotal: 68200 },
  { month: 'Jan 2025', projectedRecurring: 28500, projectedOneTime: 22000, projectedTotal: 50500 },
  { month: 'Feb 2025', projectedRecurring: 29000, projectedOneTime: 20000, projectedTotal: 49000 },
  { month: 'Mar 2025', projectedRecurring: 29000, projectedOneTime: 25000, projectedTotal: 54000 },
  { month: 'Apr 2025', projectedRecurring: 29500, projectedOneTime: 35000, projectedTotal: 64500 },
  { month: 'May 2025', projectedRecurring: 29500, projectedOneTime: 22000, projectedTotal: 51500 },
  { month: 'Jun 2025', projectedRecurring: 30000, projectedOneTime: 28000, projectedTotal: 58000 },
];

export const mockGivingSummary: GivingSummary = {
  totalGiving: 375900,
  recurringGiving: 285000,
  oneTimeGiving: 90900,
  averageGift: 385.50,
  donorCount: 156,
  newDonorCount: 23,
  recurringDonorCount: 68,
  totalFees: 9875.25,
  netGiving: 366024.75,
};

export const suggestedTiers: GivingTier[] = [
  { amount: 25, label: 'Supporter', description: 'Provides supplies for one Sunday school class' },
  { amount: 50, label: 'Partner', description: 'Covers one youth group meal' },
  { amount: 100, label: 'Champion', description: 'Sponsors one community outreach event' },
  { amount: 250, label: 'Steward', description: 'Funds a month of worship supplies' },
  { amount: 500, label: 'Pillar', description: 'Supports a month of utilities' },
];

// Fee calculation rates
export const feeRates = {
  credit_card: { percentage: 2.9, fixed: 0.30 },
  ach: { percentage: 0.8, fixed: 0 },
  apple_pay: { percentage: 2.9, fixed: 0.30 },
  google_pay: { percentage: 2.9, fixed: 0.30 },
  text_to_give: { percentage: 3.0, fixed: 0.30 },
  cash: { percentage: 0, fixed: 0 },
  check: { percentage: 0, fixed: 0 },
};

export const calculateFees = (amount: number, method: keyof typeof feeRates) => {
  const rate = feeRates[method];
  const processingFee = (amount * rate.percentage / 100) + rate.fixed;
  const platformFee = amount * 0.01; // 1% platform fee
  const totalFee = processingFee + platformFee;
  return {
    amount,
    paymentMethod: method,
    processingFee: Math.round(processingFee * 100) / 100,
    platformFee: Math.round(platformFee * 100) / 100,
    totalFee: Math.round(totalFee * 100) / 100,
    netAmount: Math.round((amount - totalFee) * 100) / 100,
    feePercentage: Math.round((totalFee / amount) * 10000) / 100,
  };
};

export const getDonorById = (id: string) => mockDonors.find(d => d.id === id);
export const getFundById = (id: string) => mockFunds.find(f => f.id === id);
