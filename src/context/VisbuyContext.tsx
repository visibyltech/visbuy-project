import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_54_AFRICAN_COUNTRIES, AfricanCountry, AFRICAN_COUNTRIES_BY_CODE, formatCurrency, convertAmount } from '../data/africanCountries';
import { PRODUCTS, Product } from '../data/products';
import {
  CartItem,
  PaymentMode,
  OsusuMember,
  OsusuGroup,
  SaveToBuyPlan,
  BNPLPlan,
  RentSavingsTarget,
  RewardsWallet,
  Order,
  VisbuyNotification,
} from '../types/visbuy';

interface VisbuyContextType {
  // Country & Localization
  currentCountry: AfricanCountry;
  setCountryByCode: (code: string) => void;
  formatPrice: (amountUSD: number) => string;
  toLocalAmount: (amountUSD: number) => number;

  // Active View Navigation
  activeView:
    | 'marketplace'
    | 'categories'
    | 'product-detail'
    | 'osusu-hub'
    | 'save-to-buy'
    | 'rent-savings'
    | 'cart'
    | 'checkout'
    | 'order-success'
    | 'customer-dashboard'
    | 'admin-dashboard'
    | 'support';
  setActiveView: (view: any) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;

  // Search & Catalog Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating';
  setSortBy: (sort: 'featured' | 'price-asc' | 'price-desc' | 'rating') => void;

  // Cart & Wishlist
  cart: CartItem[];
  addToCart: (product: Product, mode: PaymentMode, details?: { bnplMonths?: number; saveDeposit?: number; osusuGroupId?: string }) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotalUSD: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;

  // Osusu Groups
  osusuGroups: OsusuGroup[];
  joinOsusuGroup: (groupId: string, position: number) => boolean;
  createOsusuGroup: (data: Partial<OsusuGroup>) => OsusuGroup;
  makeOsusuContribution: (groupId: string, memberUserId: string) => void;
  selectedOsusuGroup: OsusuGroup | null;
  setSelectedOsusuGroup: (group: OsusuGroup | null) => void;

  // Save to Buy
  saveToBuyPlans: SaveToBuyPlan[];
  createSaveToBuyPlan: (product: Product, initialDepositUSD: number, frequency: 'weekly' | 'monthly') => void;
  makeSaveDeposit: (planId: string, amountUSD: number) => void;

  // BNPL
  bnplPlans: BNPLPlan[];
  payBnplInstallment: (planId: string, installmentId: string) => void;
  createBnplPlan: (product: Product, totalAmountUSD: number, downPaymentUSD: number, installmentsCount: number) => void;

  // Rent Savings
  rentSavingsTargets: RentSavingsTarget[];
  createRentSavingsTarget: (target: Partial<RentSavingsTarget>) => void;
  depositRentSavings: (targetId: string, amountUSD: number) => void;

  // Rewards Wallet
  rewardsWallet: RewardsWallet;
  redeemRewardsDiscount: (amountUSD: number) => boolean;
  requestRewardsWithdrawal: (amountUSD: number, bankOrMoMoDetails: string) => { success: boolean; message: string };

  // Orders
  orders: Order[];
  placeOrder: (orderData: Partial<Order>) => Order;
  lastPlacedOrder: Order | null;
  updateOrderStatus: (orderId: string, status: Order['deliveryStatus']) => void;

  // Notifications
  notifications: VisbuyNotification[];
  markNotificationAsRead: (id: string) => void;
  addNotification: (title: string, message: string, type: VisbuyNotification['type']) => void;

  // Payment Simulator Modal
  paymentModal: {
    isOpen: boolean;
    title: string;
    amountUSD: number;
    paymentModeLabel: string;
    onSuccess: () => void;
  };
  openPaymentModal: (title: string, amountUSD: number, label: string, onSuccess: () => void) => void;
  closePaymentModal: () => void;

  // Mobile navigation drawer & country picker
  isCountryModalOpen: boolean;
  setIsCountryModalOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const VisbuyContext = createContext<VisbuyContextType | undefined>(undefined);

export const VisbuyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current user's country
  const [currentCountry, setCurrentCountry] = useState<AfricanCountry>(() => {
    return AFRICAN_COUNTRIES_BY_CODE.get('NG') || ALL_54_AFRICAN_COUNTRIES[0];
  });

  const [activeView, setActiveViewState] = useState<VisbuyContextType['activeView']>('marketplace');

  // Record in-app screens in browser history so Android/browser Back stays inside VISBUY.
  const setActiveView = (view: VisbuyContextType['activeView']) => {
    if (view === activeView) return;
    window.history.pushState(
      { ...(window.history.state || {}), visbuyView: view },
      '',
      window.location.href
    );
    setActiveViewState(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  useEffect(() => {
    window.history.replaceState(
      { ...(window.history.state || {}), visbuyView: 'marketplace' },
      '',
      window.location.href
    );
    const handleBrowserBack = (event: PopStateEvent) => {
      const previousView = event.state?.visbuyView as VisbuyContextType['activeView'] | undefined;
      setActiveViewState(previousView || 'marketplace');
      setIsMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'auto' });
    };
    window.addEventListener('popstate', handleBrowserBack);
    return () => window.removeEventListener('popstate', handleBrowserBack);
  }, []);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(PRODUCTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>(['prod-iphone-16-pro']);

  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initial Osusu Groups
  const [osusuGroups, setOsusuGroups] = useState<OsusuGroup[]>([
    {
      id: 'osusu-tech-101',
      title: 'iPhone 16 Pro Max Elite Circle (Lagos & Nairobi)',
      productId: 'prod-iphone-16-pro',
      productName: 'Apple iPhone 16 Pro Max 256GB - Desert Titanium',
      productImage: '/src/assets/images/product_tech_bundle_1793992277152.jpg',
      totalPriceUSD: 1199,
      maxMembers: 4,
      contributionPerCycleUSD: 300,
      frequency: 'monthly',
      commencementDate: 'Nov 15, 2026',
      status: 'ACTIVE',
      currentCycle: 2,
      totalCycles: 4,
      countryCode: 'NG',
      disputeOpen: false,
      members: [
        {
          userId: 'usr-1',
          name: 'Chinedu Eze',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
          countryCode: 'NG',
          allocationPosition: 1,
          paymentStatus: orderData.paymentStatus || 'PAID',
          deliveryStatus: 'DELIVERED',
          joinedAt: 'Oct 01, 2026',
        },
        {
          userId: 'current-user',
          name: 'You (Verified Buyer)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          countryCode: 'NG',
          allocationPosition: 2,
          paymentStatus: 'PAID',
          deliveryStatus: 'DISPATCHED',
          joinedAt: 'Oct 05, 2026',
        },
        {
          userId: 'usr-3',
          name: 'Wanjiku Kimani',
          avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
          countryCode: 'KE',
          allocationPosition: 3,
          paymentStatus: 'PENDING',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Oct 08, 2026',
        },
        {
          userId: 'usr-4',
          name: 'Amina Bello',
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
          countryCode: 'NG',
          allocationPosition: 4,
          paymentStatus: 'PENDING',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Oct 12, 2026',
        },
      ],
    },
    {
      id: 'osusu-fridge-202',
      title: 'LG Smart Inverter Family Group (Accra)',
      productId: 'prod-lg-inverter-refrigerator',
      productName: 'LG 335L Smart Inverter Linear Refrigerator',
      productImage: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80',
      totalPriceUSD: 740,
      maxMembers: 4,
      contributionPerCycleUSD: 185,
      frequency: 'monthly',
      commencementDate: 'Dec 01, 2026',
      status: 'RECRUITING',
      currentCycle: 1,
      totalCycles: 4,
      countryCode: 'GH',
      disputeOpen: false,
      members: [
        {
          userId: 'usr-gh-1',
          name: 'Kwame Osei',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
          countryCode: 'GH',
          allocationPosition: 1,
          paymentStatus: 'PAID',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Nov 02, 2026',
        },
        {
          userId: 'usr-gh-2',
          name: 'Akua Boateng',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
          countryCode: 'GH',
          allocationPosition: 2,
          paymentStatus: 'PAID',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Nov 04, 2026',
        },
      ],
    },
    {
      id: 'osusu-laptop-303',
      title: 'MacBook Pro M4 Dev Guild (Nairobi & Kigali)',
      productId: 'prod-macbook-pro-m4',
      productName: 'Apple MacBook Pro 14" M4 Chip 16GB / 512GB',
      productImage: '/src/assets/images/product_tech_bundle_1793992277152.jpg',
      totalPriceUSD: 1599,
      maxMembers: 6,
      contributionPerCycleUSD: 266.5,
      frequency: 'monthly',
      commencementDate: 'Nov 20, 2026',
      status: 'RECRUITING',
      currentCycle: 1,
      totalCycles: 6,
      countryCode: 'KE',
      disputeOpen: false,
      members: [
        {
          userId: 'usr-ke-1',
          name: 'David Omondi',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
          countryCode: 'KE',
          allocationPosition: 1,
          paymentStatus: 'PAID',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Nov 01, 2026',
        },
        {
          userId: 'usr-rw-1',
          name: 'Claire Uwase',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
          countryCode: 'RW',
          allocationPosition: 2,
          paymentStatus: 'PAID',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Nov 03, 2026',
        },
        {
          userId: 'usr-ke-2',
          name: 'Kelvin Mutua',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
          countryCode: 'KE',
          allocationPosition: 3,
          paymentStatus: 'PAID',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Nov 05, 2026',
        },
      ],
    },
  ]);

  const [selectedOsusuGroup, setSelectedOsusuGroup] = useState<OsusuGroup | null>(null);

  // Save to Buy Plans
  const [saveToBuyPlans, setSaveToBuyPlans] = useState<SaveToBuyPlan[]>([
    {
      id: 'save-plan-1',
      userId: 'current-user',
      productId: 'prod-hisense-65-qled',
      productName: 'Hisense 65" 4K Smart QLED TV with Dolby Vision',
      productImage: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
      totalAmountUSD: 590,
      minDepositPercent: 30,
      initialDepositUSD: 177,
      totalDepositedUSD: 413,
      frequency: 'monthly',
      nextDepositDue: 'Nov 28, 2026',
      status: 'SAVING',
      deposits: [
        { id: 'dep-1', date: 'Sep 28, 2026', amountUSD: 177, paymentRef: 'DEP-884920' },
        { id: 'dep-2', date: 'Oct 28, 2026', amountUSD: 236, paymentRef: 'DEP-991204' },
      ],
    },
  ]);

  // BNPL Plans
  const [bnplPlans, setBnplPlans] = useState<BNPLPlan[]>([
    {
      id: 'bnpl-plan-1',
      orderId: 'ORD-984210',
      productName: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
      totalAmountUSD: 349,
      downPaymentUSD: 87.25,
      remainingAmountUSD: 261.75,
      installmentsCount: 3,
      monthlyInstallmentUSD: 87.25,
      status: 'ACTIVE',
      installments: [
        { id: 'inst-1', number: 1, dueDate: 'Oct 15, 2026', amountUSD: 87.25, status: 'PAID', paidAt: 'Oct 15, 2026' },
        { id: 'inst-2', number: 2, dueDate: 'Nov 15, 2026', amountUSD: 87.25, status: 'UPCOMING' },
        { id: 'inst-3', number: 3, dueDate: 'Dec 15, 2026', amountUSD: 87.25, status: 'UPCOMING' },
      ],
    },
  ]);

  // Rent Savings Targets
  const [rentSavingsTargets, setRentSavingsTargets] = useState<RentSavingsTarget[]>([
    {
      id: 'rent-tgt-1',
      userId: 'current-user',
      title: '2-Bedroom Apartment Rent (Lekki Phase 1)',
      city: 'Lagos',
      countryCode: 'NG',
      targetAmountUSD: 3500,
      savedAmountUSD: 2450,
      frequency: 'monthly',
      targetDate: 'Feb 28, 2027',
      createdAt: 'May 01, 2026',
      status: 'ACTIVE',
      autoSaveEnabled: true,
      history: [
        { id: 'rst-1', date: 'May 01, 2026', amountUSD: 500, method: 'Direct Bank Transfer', txRef: 'RNT-TX-101' },
        { id: 'rst-2', date: 'Jun 01, 2026', amountUSD: 500, method: 'Paystack Card Debit', txRef: 'RNT-TX-102' },
        { id: 'rst-3', date: 'Jul 01, 2026', amountUSD: 500, method: 'Paystack Card Debit', txRef: 'RNT-TX-103' },
        { id: 'rst-4', date: 'Aug 01, 2026', amountUSD: 450, method: 'Paystack Card Debit', txRef: 'RNT-TX-104' },
        { id: 'rst-5', date: 'Sep 01, 2026', amountUSD: 500, method: 'Paystack Card Debit', txRef: 'RNT-TX-105' },
      ],
    },
  ]);

  // Rewards Wallet
  const [rewardsWallet, setRewardsWallet] = useState<RewardsWallet>({
    userId: 'current-user',
    pointsBalance: 1250, // ~$25.00
    equivalentUSD: 25.0,
    lifetimeEarnedUSD: 68.5,
    transactions: [
      {
        id: 'rwd-1',
        type: 'EARNED',
        amountUSD: 8.72,
        date: 'Oct 15, 2026',
        description: '2.5% Cashback on Sony Headphones Purchase',
        status: 'COMPLETED',
      },
      {
        id: 'rwd-2',
        type: 'EARNED',
        amountUSD: 16.28,
        date: 'Sep 28, 2026',
        description: 'Osusu Early Contributor Bonus',
        status: 'COMPLETED',
      },
    ],
  });

  // Orders
  const [orders, setOrders] = useState<Order[]>([
    {
      id: 'ord-1001',
      orderNumber: 'VB-98240-NG',
      date: 'Nov 02, 2026',
      customer: {
        name: 'Oluwaseun Adebayo',
        email: 'seun.adebayo@example.com',
        phone: '+234 803 123 4567',
        countryCode: 'NG',
        stateOrRegion: 'Lagos State',
        city: 'Ikeja',
        streetAddress: '14 Allen Avenue',
        nearestLandmark: 'Beside Mega Plaza',
      },
      items: [
        {
          product: PRODUCTS[5], // Sony headphones
          quantity: 1,
          selectedPaymentMode: 'bnpl',
          bnplDurationMonths: 3,
        },
      ],
      subtotalUSD: 349,
      shippingCostUSD: 3.5,
      taxUSD: 26.18,
      rewardsDiscountUSD: 0,
      totalUSD: 378.68,
      paymentMethod: 'Paystack BNPL Installment',
      paymentStatus: 'PAID',
      deliveryMethod: 'DOORSTEP_EXPRESS',
      deliveryStatus: 'IN_TRANSIT',
      trackingNumber: 'VBLOG-NG-88492019',
      estimatedDeliveryDate: 'Nov 08, 2026',
      timeline: [
        { title: 'Order Verified & Secured', location: 'VISBUY Hub Lagos', time: 'Nov 02, 10:14 AM', isDone: true },
        { title: 'Warehouse Dispatched', location: 'Oregun Logistics Center', time: 'Nov 03, 02:40 PM', isDone: true },
        { title: 'In Transit to Regional Station', location: 'Ikeja Main Sort Facility', time: 'Nov 05, 08:30 AM', isDone: true },
        { title: 'Out for Delivery', location: 'Courier Van 12 (Driver: Tunde)', time: 'Expected Today', isDone: false },
        { title: 'Delivered', location: 'Customer Address', time: 'Pending', isDone: false },
      ],
    },
  ]);

  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // In-App Notifications
  const [notifications, setNotifications] = useState<VisbuyNotification[]>([
    {
      id: 'notif-1',
      title: 'Osusu Cycle 2 Payment Confirmed',
      message: 'Your monthly contribution of ₦456,000 ($300) for iPhone 16 Pro Max was received and verified.',
      type: 'osusu',
      timestamp: '2 hours ago',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Order VB-98240-NG is In Transit',
      message: 'Your Sony WH-1000XM5 headphones have departed the Ikeja central logistics hub.',
      type: 'order',
      timestamp: '5 hours ago',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Rent Savings Milestone Reached! 🎉',
      message: 'You have achieved 70% of your Lekki apartment rent target! Keep up the great savings streak.',
      type: 'savings',
      timestamp: 'Yesterday',
      read: true,
    },
  ]);

  // Payment Modal State
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    title: string;
    amountUSD: number;
    paymentModeLabel: string;
    onSuccess: () => void;
  }>({
    isOpen: false,
    title: '',
    amountUSD: 0,
    paymentModeLabel: '',
    onSuccess: () => {},
  });

  const setCountryByCode = (code: string) => {
    const found = AFRICAN_COUNTRIES_BY_CODE.get(code.toUpperCase());
    if (found) {
      setCurrentCountry(found);
      addNotification(
        'Country & Currency Updated',
        `Marketplace localized to ${found.name} (${found.currencyCode} - ${found.currencySymbol}). Prices auto-converted at live interbank rates.`,
        'security'
      );
    }
  };

  const formatPrice = (amountUSD: number) => {
    return formatCurrency(amountUSD, currentCountry);
  };

  const toLocalAmount = (amountUSD: number) => {
    return convertAmount(amountUSD, currentCountry);
  };

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
    setActiveView('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (
    product: Product,
    mode: PaymentMode,
    details?: { bnplMonths?: number; saveDeposit?: number; osusuGroupId?: string }
  ) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.selectedPaymentMode === mode);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedPaymentMode === mode
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedPaymentMode: mode,
          bnplDurationMonths: details?.bnplMonths || (mode === 'bnpl' ? 3 : undefined),
          saveToBuyDepositPercent: details?.saveDeposit || (mode === 'saveToBuy' ? 30 : undefined),
          osusuGroupId: details?.osusuGroupId,
        },
      ];
    });

    addNotification(
      'Item Added to Cart',
      `${product.name} added with ${
        mode === 'payNow'
          ? 'Pay Now'
          : mode === 'bnpl'
          ? 'Buy Now, Pay Later'
          : mode === 'saveToBuy'
          ? 'Save to Buy (30% deposit)'
          : 'Osusu Group Purchasing'
      }.`,
      'order'
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCart([]);

  const cartTotalUSD = cart.reduce((sum, item) => sum + item.product.basePriceUSD * item.quantity, 0);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Osusu Actions
  const joinOsusuGroup = (groupId: string, position: number): boolean => {
    let success = false;
    setOsusuGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          // Check if position taken
          const isTaken = g.members.some((m) => m.allocationPosition === position);
          if (isTaken || g.members.length >= g.maxMembers) {
            return g;
          }
          success = true;
          const newMember: OsusuMember = {
            userId: 'current-user',
            name: 'You (Verified Buyer)',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            countryCode: currentCountry.code,
            allocationPosition: position,
            paymentStatus: 'PAID',
            deliveryStatus: 'AWAITING_CYCLE',
            joinedAt: 'Today',
          };
          const updatedMembers = [...g.members, newMember];
          const isFull = updatedMembers.length >= g.maxMembers;
          return {
            ...g,
            members: updatedMembers,
            status: isFull ? 'ACTIVE' : 'RECRUITING',
          };
        }
        return g;
      })
    );

    if (success) {
      addNotification(
        'Joined Osusu Group! 🤝',
        `You secured Allocation Position #${position}. Payment reminders & group updates will be sent via SMS & WhatsApp.`,
        'osusu'
      );
    }
    return success;
  };

  const createOsusuGroup = (data: Partial<OsusuGroup>): OsusuGroup => {
    const product = PRODUCTS.find((p) => p.id === data.productId) || PRODUCTS[0];
    const maxMembers = data.maxMembers || 4;
    const contribution = Number((product.basePriceUSD / maxMembers).toFixed(2));
    const newGroup: OsusuGroup = {
      id: `osusu-${Date.now()}`,
      title: data.title || `${product.brand} ${product.name.slice(0, 25)} Circle`,
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      totalPriceUSD: product.basePriceUSD,
      maxMembers,
      contributionPerCycleUSD: contribution,
      frequency: data.frequency || 'monthly',
      commencementDate: 'Dec 01, 2026',
      status: 'RECRUITING',
      currentCycle: 1,
      totalCycles: maxMembers,
      countryCode: currentCountry.code,
      disputeOpen: false,
      members: [
        {
          userId: 'current-user',
          name: 'You (Group Creator)',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
          countryCode: currentCountry.code,
          allocationPosition: 1,
          paymentStatus: 'PAID',
          deliveryStatus: 'AWAITING_CYCLE',
          joinedAt: 'Today',
        },
      ],
    };
    setOsusuGroups((prev) => [newGroup, ...prev]);
    addNotification(
      'Osusu Group Created! 🌟',
      `Your Osusu Circle for ${product.name} is now live and accepting participants across Africa.`,
      'osusu'
    );
    return newGroup;
  };

  const makeOsusuContribution = (groupId: string, memberUserId: string) => {
    setOsusuGroups((prev) =>
      prev.map((g) => {
        if (g.id === groupId) {
          const updatedMembers = g.members.map((m) =>
            m.userId === memberUserId ? { ...m, paymentStatus: 'PAID' as const } : m
          );
          return {
            ...g,
            members: updatedMembers,
          };
        }
        return g;
      })
    );
    addNotification('Osusu Contribution Paid', 'Your cycle contribution was verified and recorded in the group ledger.', 'osusu');
  };

  // Save to Buy Actions
  const createSaveToBuyPlan = (product: Product, initialDepositUSD: number, frequency: 'weekly' | 'monthly') => {
    const newPlan: SaveToBuyPlan = {
      id: `save-${Date.now()}`,
      userId: 'current-user',
      productId: product.id,
      productName: product.name,
      productImage: product.images[0],
      totalAmountUSD: product.basePriceUSD,
      minDepositPercent: 30,
      initialDepositUSD,
      totalDepositedUSD: initialDepositUSD,
      frequency,
      nextDepositDue: frequency === 'weekly' ? 'In 7 days' : 'In 30 days',
      status: initialDepositUSD >= product.basePriceUSD ? 'COMPLETED' : 'SAVING',
      deposits: [
        {
          id: `dep-${Date.now()}`,
          date: 'Today',
          amountUSD: initialDepositUSD,
          paymentRef: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
        },
      ],
    };

    setSaveToBuyPlans((prev) => [newPlan, ...prev]);
    addNotification(
      'Save to Buy Plan Started',
      `Initial deposit of ${formatPrice(initialDepositUSD)} received. Price is locked and product reserved in VISBUY warehouse.`,
      'savings'
    );
  };

  const makeSaveDeposit = (planId: string, amountUSD: number) => {
    setSaveToBuyPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const newTotal = plan.totalDepositedUSD + amountUSD;
          const isComplete = newTotal >= plan.totalAmountUSD;
          const newStatus = isComplete ? 'COMPLETED' : 'SAVING';
          return {
            ...plan,
            totalDepositedUSD: newTotal,
            status: newStatus,
            deposits: [
              ...plan.deposits,
              {
                id: `dep-${Date.now()}`,
                date: 'Today',
                amountUSD,
                paymentRef: `DEP-${Math.floor(100000 + Math.random() * 900000)}`,
              },
            ],
          };
        }
        return plan;
      })
    );

    addNotification(
      'Deposit Verified',
      `Deposit of ${formatPrice(amountUSD)} recorded. View your Save to Buy vault to monitor remaining progress.`,
      'savings'
    );
  };

  // BNPL Actions
  const createBnplPlan = (product: Product, totalAmountUSD: number, downPaymentUSD: number, installmentsCount: number) => {
    const remainingAmountUSD = Math.max(0, totalAmountUSD - downPaymentUSD);
    const monthlyInstallmentUSD = remainingAmountUSD / installmentsCount;
    const installments = Array.from({ length: installmentsCount }, (_, index) => {
      const due = new Date();
      due.setMonth(due.getMonth() + index + 1);
      return {
        id: `inst-${Date.now()}-${index}`,
        number: index + 1,
        dueDate: due.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        amountUSD: monthlyInstallmentUSD,
        status: 'UPCOMING' as const,
      };
    });
    const plan: BNPLPlan = {
      id: `bnpl-${Date.now()}-${product.id}`,
      orderId: `VB-BNPL-${Date.now()}`,
      productName: product.name,
      totalAmountUSD,
      downPaymentUSD,
      remainingAmountUSD,
      installmentsCount,
      monthlyInstallmentUSD,
      status: 'ACTIVE',
      installments,
    };
    setBnplPlans((prev) => [plan, ...prev]);
    addNotification('BNPL plan activated', `${product.name}: ${installmentsCount} monthly instalments have been scheduled.`, 'order');
  };

  const payBnplInstallment = (planId: string, installmentId: string) => {
    setBnplPlans((prev) =>
      prev.map((plan) => {
        if (plan.id === planId) {
          const updatedInst = plan.installments.map((i) =>
            i.id === installmentId ? { ...i, status: 'PAID' as const, paidAt: 'Today' } : i
          );
          const allPaid = updatedInst.every((i) => i.status === 'PAID');
          return {
            ...plan,
            status: allPaid ? 'SETTLED' : 'ACTIVE',
            installments: updatedInst,
          };
        }
        return plan;
      })
    );
    addNotification('BNPL Installment Paid', 'Your installment has cleared successfully. Credit standing maintained.', 'order');
  };

  // Rent Savings Actions
  const createRentSavingsTarget = (target: Partial<RentSavingsTarget>) => {
    const newTarget: RentSavingsTarget = {
      id: `rent-${Date.now()}`,
      userId: 'current-user',
      title: target.title || 'Apartment Rent Target',
      city: target.city || currentCountry.majorCities[0] || 'Capital City',
      countryCode: target.countryCode || currentCountry.code,
      targetAmountUSD: target.targetAmountUSD || 2000,
      savedAmountUSD: target.savedAmountUSD || 100,
      frequency: target.frequency || 'monthly',
      targetDate: target.targetDate || 'Nov 30, 2027',
      createdAt: 'Today',
      status: 'ACTIVE',
      autoSaveEnabled: target.autoSaveEnabled ?? true,
      history: [
        {
          id: `rst-${Date.now()}`,
          date: 'Today',
          amountUSD: target.savedAmountUSD || 100,
          method: 'Initial Target Setup',
          txRef: `RNT-${Math.floor(100000 + Math.random() * 900000)}`,
        },
      ],
    };
    setRentSavingsTargets((prev) => [newTarget, ...prev]);
    addNotification(
      'Rent Savings Target Activated',
      `Target "${newTarget.title}" created. Automatic reminders set for your scheduled contributions.`,
      'savings'
    );
  };

  const depositRentSavings = (targetId: string, amountUSD: number) => {
    setRentSavingsTargets((prev) =>
      prev.map((t) => {
        if (t.id === targetId) {
          const newSaved = t.savedAmountUSD + amountUSD;
          return {
            ...t,
            savedAmountUSD: newSaved,
            status: newSaved >= t.targetAmountUSD ? 'GOAL_MET' : 'ACTIVE',
            history: [
              {
                id: `rst-${Date.now()}`,
                date: 'Today',
                amountUSD,
                method: `${currentCountry.supportedGateways[0]} Deposit`,
                txRef: `RNT-${Math.floor(100000 + Math.random() * 900000)}`,
              },
              ...t.history,
            ],
          };
        }
        return t;
      })
    );
    addNotification('Rent Savings Deposited', `${formatPrice(amountUSD)} added to your rent vault.`, 'savings');
  };

  // Rewards Actions
  const redeemRewardsDiscount = (amountUSD: number): boolean => {
    if (rewardsWallet.equivalentUSD < amountUSD) return false;
    setRewardsWallet((prev) => ({
      ...prev,
      pointsBalance: Math.max(0, prev.pointsBalance - amountUSD * 50),
      equivalentUSD: Math.max(0, prev.equivalentUSD - amountUSD),
      transactions: [
        {
          id: `rwd-${Date.now()}`,
          type: 'REDEEMED',
          amountUSD,
          date: 'Today',
          description: 'Applied discount at checkout',
          status: 'COMPLETED',
        },
        ...prev.transactions,
      ],
    }));
    return true;
  };

  const requestRewardsWithdrawal = (amountUSD: number, details: string) => {
    // Min withdrawal ~ $1.00 (₦1,500 / ₦1,000 threshold)
    if (amountUSD < 1) {
      return { success: false, message: 'Minimum withdrawal amount is ₦1,000 (or equivalent in your currency).' };
    }
    if (rewardsWallet.equivalentUSD < amountUSD) {
      return { success: false, message: 'Insufficient rewards balance.' };
    }
    setRewardsWallet((prev) => ({
      ...prev,
      pointsBalance: Math.max(0, prev.pointsBalance - amountUSD * 50),
      equivalentUSD: Math.max(0, prev.equivalentUSD - amountUSD),
      transactions: [
        {
          id: `rwd-${Date.now()}`,
          type: 'WITHDRAWAL',
          amountUSD,
          date: 'Today',
          description: `Withdrawal payout to ${details}`,
          status: 'PENDING',
        },
        ...prev.transactions,
      ],
    }));
    addNotification(
      'Reward Payout Initiated',
      `Withdrawal of ${formatPrice(amountUSD)} submitted for regulatory clearance and local disbursement.`,
      'rewards'
    );
    return { success: true, message: 'Withdrawal request submitted! Payout will arrive in 1-2 business days.' };
  };

  // Orders Actions
  const placeOrder = (orderData: Partial<Order>): Order => {
    const orderNumber = `VB-${Math.floor(100000 + Math.random() * 900000)}-${currentCountry.code}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: 'Today',
      customer: orderData.customer || {
        name: 'Oluwaseun Adebayo',
        email: 'customer@visbuy.africa',
        phone: '+234 800 000 0000',
        countryCode: currentCountry.code,
        stateOrRegion: currentCountry.majorCities[0],
        city: currentCountry.majorCities[0],
        streetAddress: '12 Commercial Avenue',
      },
      items: orderData.items || [...cart],
      subtotalUSD: orderData.subtotalUSD || cartTotalUSD,
      shippingCostUSD: orderData.shippingCostUSD || currentCountry.baseShippingUSD,
      taxUSD: orderData.taxUSD || 0,
      rewardsDiscountUSD: orderData.rewardsDiscountUSD || 0,
      totalUSD: orderData.totalUSD || cartTotalUSD + currentCountry.baseShippingUSD,
      paymentMethod: orderData.paymentMethod || 'Paystack Direct Card',
      paymentStatus: 'PAID',
      deliveryMethod: orderData.deliveryMethod || 'DOORSTEP_EXPRESS',
      deliveryStatus: 'ORDER_CONFIRMED',
      trackingNumber: `VBLOG-${currentCountry.code}-${Math.floor(10000000 + Math.random() * 90000000)}`,
      estimatedDeliveryDate: currentCountry.standardDeliveryDays,
      timeline: [
        { title: 'Order Verified & Secured', location: `VISBUY Hub ${currentCountry.majorCities[0]}`, time: 'Just now', isDone: true },
        { title: 'Warehouse Processing', location: 'Fulfillment Center', time: 'In progress', isDone: false },
        { title: 'Dispatched to Carrier', location: 'Transit Node', time: 'Pending', isDone: false },
        { title: 'Delivered', location: 'Customer Address', time: 'Pending', isDone: false },
      ],
    };

    // Calculate rewards earned (2.5% cashback on completed checkout)
    const rewardsEarnedUSD = Number(((newOrder.subtotalUSD * 2.5) / 100).toFixed(2));
    if (rewardsEarnedUSD > 0) {
      setRewardsWallet((prev) => ({
        ...prev,
        pointsBalance: prev.pointsBalance + Math.round(rewardsEarnedUSD * 50),
        equivalentUSD: Number((prev.equivalentUSD + rewardsEarnedUSD).toFixed(2)),
        lifetimeEarnedUSD: Number((prev.lifetimeEarnedUSD + rewardsEarnedUSD).toFixed(2)),
        transactions: [
          {
            id: `rwd-${Date.now()}`,
            type: 'EARNED',
            amountUSD: rewardsEarnedUSD,
            date: 'Today',
            description: `2.5% Cash Reward on Order ${orderNumber}`,
            status: 'COMPLETED',
          },
          ...prev.transactions,
        ],
      }));
    }

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart();

    addNotification(
      'Order Confirmed! 📦',
      `Order #${orderNumber} placed successfully. Tracking number ${newOrder.trackingNumber} issued. You earned ${formatPrice(rewardsEarnedUSD)} in VISBUY Rewards!`,
      'order'
    );

    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['deliveryStatus']) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.id === orderId) {
          const updatedTimeline = o.timeline.map((stage) => {
            if (stage.title.toLowerCase().includes(status.toLowerCase().slice(0, 4))) {
              return { ...stage, isDone: true };
            }
            return stage;
          });
          return {
            ...o,
            deliveryStatus: status,
            timeline: updatedTimeline,
          };
        }
        return o;
      })
    );
  };

  // Notification Actions
  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const addNotification = (title: string, message: string, type: VisbuyNotification['type']) => {
    const newNotif: VisbuyNotification = {
      id: `notif-${Date.now()}`,
      title,
      message,
      type,
      timestamp: 'Just now',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  // Payment Modal Helper
  const openPaymentModal = (title: string, amountUSD: number, label: string, onSuccess: () => void) => {
    setPaymentModal({
      isOpen: true,
      title,
      amountUSD,
      paymentModeLabel: label,
      onSuccess,
    });
  };

  const closePaymentModal = () => {
    setPaymentModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <VisbuyContext.Provider
      value={{
        currentCountry,
        setCountryByCode,
        formatPrice,
        toLocalAmount,
        activeView,
        setActiveView,
        selectedProduct,
        openProductDetail,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        sortBy,
        setSortBy,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotalUSD,
        wishlist,
        toggleWishlist,
        osusuGroups,
        joinOsusuGroup,
        createOsusuGroup,
        makeOsusuContribution,
        selectedOsusuGroup,
        setSelectedOsusuGroup,
        saveToBuyPlans,
        createSaveToBuyPlan,
        makeSaveDeposit,
        bnplPlans,
        payBnplInstallment,
        rentSavingsTargets,
        createRentSavingsTarget,
        depositRentSavings,
        rewardsWallet,
        redeemRewardsDiscount,
        requestRewardsWithdrawal,
        orders,
        placeOrder,
        lastPlacedOrder,
        updateOrderStatus,
        notifications,
        markNotificationAsRead,
        addNotification,
        paymentModal,
        openPaymentModal,
        closePaymentModal,
        isCountryModalOpen,
        setIsCountryModalOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
      }}
    >
      {children}
    </VisbuyContext.Provider>
  );
};

export const useVisbuy = () => {
  const context = useContext(VisbuyContext);
  if (!context) {
    throw new Error('useVisbuy must be used within a VisbuyProvider');
  }
  return context;
};
