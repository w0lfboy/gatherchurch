// Core data types for the Giving module

export type PaymentMethod = 'credit_card' | 'ach' | 'apple_pay' | 'google_pay' | 'text_to_give' | 'cash' | 'check';
export type GiftFrequency = 'one_time' | 'weekly' | 'bi_weekly' | 'monthly' | 'quarterly' | 'annually';
export type GiftStatus = 'completed' | 'pending' | 'failed' | 'refunded';

export interface Fund {
  id: string;
  name: string;
  description?: string;
  color: string;
  isDefault: boolean;
  goalAmount?: number;
  currentAmount: number;
}

export interface Donation {
  id: string;
  donorId: string;
  donorName: string;
  amount: number;
  fee: number;
  netAmount: number;
  fundId: string;
  fundName: string;
  paymentMethod: PaymentMethod;
  status: GiftStatus;
  recurringGiftId?: string;
  note?: string;
  isAnonymous: boolean;
  roundUpAmount?: number;
  createdAt: string;
}

export interface RecurringGift {
  id: string;
  donorId: string;
  donorName: string;
  amount: number;
  fundId: string;
  fundName: string;
  frequency: GiftFrequency;
  paymentMethod: PaymentMethod;
  nextProcessingDate: string;
  status: 'active' | 'paused' | 'cancelled';
  startDate: string;
  totalGiven: number;
  giftCount: number;
}

export interface Donor {
  id: string;
  personId: string;
  firstName: string;
  lastName: string;
  email?: string;
  phone?: string;
  avatar?: string;
  totalGiven: number;
  totalGifts: number;
  averageGift: number;
  largestGift: number;
  firstGiftDate?: string;
  lastGiftDate?: string;
  recurringGifts: RecurringGift[];
  pledges: Pledge[];
  preferredPaymentMethod?: PaymentMethod;
  givingTier: 'new' | 'occasional' | 'regular' | 'faithful' | 'major';
  yearToDateGiving: number;
  lastYearGiving: number;
}

export interface PledgeCampaign {
  id: string;
  name: string;
  description?: string;
  goalAmount: number;
  raisedAmount: number;
  pledgedAmount: number;
  startDate: string;
  endDate: string;
  status: 'draft' | 'active' | 'completed' | 'cancelled';
  pledgeCount: number;
  donorCount: number;
  fundId: string;
}

export interface Pledge {
  id: string;
  donorId: string;
  donorName: string;
  campaignId: string;
  campaignName: string;
  pledgedAmount: number;
  fulfilledAmount: number;
  frequency: GiftFrequency;
  startDate: string;
  endDate: string;
  status: 'active' | 'fulfilled' | 'behind' | 'cancelled';
}

export interface DonorStatement {
  id: string;
  donorId: string;
  donorName: string;
  year: number;
  totalAmount: number;
  donations: Donation[];
  generatedAt: string;
  sentAt?: string;
}

export interface GivingForecast {
  month: string;
  projectedRecurring: number;
  projectedOneTime: number;
  projectedTotal: number;
  actualTotal?: number;
}

export interface GivingSummary {
  totalGiving: number;
  recurringGiving: number;
  oneTimeGiving: number;
  averageGift: number;
  donorCount: number;
  newDonorCount: number;
  recurringDonorCount: number;
  totalFees: number;
  netGiving: number;
}

export interface FeeCalculation {
  amount: number;
  paymentMethod: PaymentMethod;
  processingFee: number;
  platformFee: number;
  totalFee: number;
  netAmount: number;
  feePercentage: number;
}

// Suggested giving tiers for quick give
export interface GivingTier {
  amount: number;
  label: string;
  description?: string;
}
