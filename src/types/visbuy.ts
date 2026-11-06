import { Product } from '../data/products';
import { AfricanCountry } from '../data/africanCountries';

export type PaymentMode = 'payNow' | 'bnpl' | 'saveToBuy' | 'osusu';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPaymentMode: PaymentMode;
  bnplDurationMonths?: number;
  saveToBuyDepositPercent?: number;
  osusuGroupId?: string;
}

export interface OsusuMember {
  userId: string;
  name: string;
  avatar: string;
  countryCode: string;
  allocationPosition: number;
  paymentStatus: 'PAID' | 'PENDING' | 'OVERDUE';
  deliveryStatus: 'DELIVERED' | 'DISPATCHED' | 'AWAITING_CYCLE';
  joinedAt: string;
}

export interface OsusuGroup {
  id: string;
  title: string;
  productId: string;
  productName: string;
  productImage: string;
  totalPriceUSD: number;
  maxMembers: number;
  contributionPerCycleUSD: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  commencementDate: string;
  status: 'RECRUITING' | 'ACTIVE' | 'COMPLETED';
  currentCycle: number;
  totalCycles: number;
  members: OsusuMember[];
  disputeOpen: boolean;
  countryCode: string;
}

export interface SaveToBuyPlan {
  id: string;
  userId: string;
  productId: string;
  productName: string;
  productImage: string;
  totalAmountUSD: number;
  minDepositPercent: number;
  initialDepositUSD: number;
  totalDepositedUSD: number;
  frequency: 'weekly' | 'monthly';
  nextDepositDue: string;
  status: 'SAVING' | 'COMPLETED' | 'DELIVERED';
  deposits: {
    id: string;
    date: string;
    amountUSD: number;
    paymentRef: string;
  }[];
}

export interface BNPLPlan {
  id: string;
  orderId: string;
  productName: string;
  totalAmountUSD: number;
  downPaymentUSD: number;
  remainingAmountUSD: number;
  installmentsCount: number;
  monthlyInstallmentUSD: number;
  status: 'ACTIVE' | 'SETTLED' | 'DEFAULTED';
  installments: {
    id: string;
    number: number;
    dueDate: string;
    amountUSD: number;
    status: 'PAID' | 'UPCOMING' | 'OVERDUE';
    paidAt?: string;
  }[];
}

export interface RentSavingsTarget {
  id: string;
  userId: string;
  title: string;
  city: string;
  countryCode: string;
  targetAmountUSD: number;
  savedAmountUSD: number;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  targetDate: string;
  createdAt: string;
  status: 'ACTIVE' | 'GOAL_MET' | 'DISBURSED';
  autoSaveEnabled: boolean;
  history: {
    id: string;
    date: string;
    amountUSD: number;
    method: string;
    txRef: string;
  }[];
}

export interface RewardsWallet {
  userId: string;
  pointsBalance: number; // e.g. 1 point = $0.02
  equivalentUSD: number;
  lifetimeEarnedUSD: number;
  transactions: {
    id: string;
    type: 'EARNED' | 'REDEEMED' | 'WITHDRAWAL';
    amountUSD: number;
    date: string;
    description: string;
    status: 'COMPLETED' | 'PENDING';
  }[];
}

export interface VisbuyNotification {
  id: string;
  title: string;
  message: string;
  type: 'order' | 'osusu' | 'savings' | 'rewards' | 'security';
  timestamp: string;
  read: boolean;
  link?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    countryCode: string;
    stateOrRegion: string;
    city: string;
    streetAddress: string;
    nearestLandmark?: string;
  };
  items: CartItem[];
  subtotalUSD: number;
  shippingCostUSD: number;
  taxUSD: number;
  rewardsDiscountUSD: number;
  totalUSD: number;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PARTIALLY_PAID' | 'SAVINGS_ESCROW' | 'OSUSU_COMMITTED';
  deliveryMethod: 'DOORSTEP_EXPRESS' | 'HUB_PICKUP';
  deliveryStatus: 'ORDER_CONFIRMED' | 'PROCESSING' | 'DISPATCHED' | 'IN_TRANSIT' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
  trackingNumber: string;
  estimatedDeliveryDate: string;
  timeline: {
    title: string;
    location: string;
    time: string;
    isDone: boolean;
  }[];
}
