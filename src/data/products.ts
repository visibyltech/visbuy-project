export interface ProductReview {
  id: string;
  author: string;
  country: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  category:
    | 'Phones & Tablets'
    | 'Computers & Laptops'
    | 'Electronics & Audio'
    | 'Home Appliances'
    | 'Furniture'
    | 'Fashion & Shoes'
    | 'Beauty & Care'
    | 'Groceries'
    | 'Baby Products'
    | 'Sports & Fitness';
  basePriceUSD: number; // Base currency in USD, auto-converts across 54 currencies
  originalPriceUSD?: number;
  discountPercent?: number;
  rating: number;
  ratingCount: number;
  stockCount: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  paymentOptions: {
    payNow: boolean;
    bnpl: boolean; // Buy Now, Pay Later eligible
    saveToBuy: boolean; // Save to Buy eligible
    osusu: boolean; // Osusu Group Purchasing eligible
  };
  saveToBuyMinDepositPercent: number; // e.g. 30%
  osusuDetails?: {
    recommendedGroupSizes: number[]; // e.g. [4, 6]
    frequency: 'weekly' | 'monthly';
  };
  isFeatured?: boolean;
  isPopular?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'prod-iphone-16-pro',
    name: 'Apple iPhone 16 Pro Max 256GB - Desert Titanium',
    brand: 'Apple',
    category: 'Phones & Tablets',
    basePriceUSD: 1199,
    originalPriceUSD: 1299,
    discountPercent: 8,
    rating: 4.9,
    ratingCount: 312,
    stockCount: 18,
    images: [
      '/src/assets/images/product_tech_bundle_1793992277152.jpg',
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Engineered in Grade 5 titanium with an expansive 6.9-inch Super Retina XDR display. Powered by the A18 Pro chip with Apple Intelligence, 48MP Fusion camera with 5x telephoto optical zoom, and ultra-durable ceramic shield.',
    specifications: {
      Display: '6.9-inch Super Retina XDR OLED 120Hz',
      Chipset: 'Apple A18 Pro (3nm architecture)',
      Storage: '256GB NVMe',
      Camera: '48MP Main + 48MP Ultra Wide + 12MP 5x Telephoto',
      Battery: 'Up to 33 hours video playback, MagSafe 25W',
      Network: '5G Dual SIM / eSIM African Carrier Ready',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4, 6],
      frequency: 'monthly',
    },
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 'prod-samsung-s25-ultra',
    name: 'Samsung Galaxy S25 Ultra 512GB 5G Titanium Grey',
    brand: 'Samsung',
    category: 'Phones & Tablets',
    basePriceUSD: 1299,
    originalPriceUSD: 1399,
    discountPercent: 7,
    rating: 4.8,
    ratingCount: 194,
    stockCount: 12,
    images: [
      '/src/assets/images/product_tech_bundle_1793992277152.jpg',
      'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'The ultimate flagship experience. Featuring Snapdragon 8 Elite Galaxy Edition, integrated S-Pen, 200MP Quad Telephoto imaging sensor, and Galaxy AI live translate optimized for African languages.',
    specifications: {
      Display: '6.8-inch Dynamic AMOLED 2X 1-120Hz QHD+',
      Processor: 'Snapdragon 8 Elite for Galaxy',
      RAM: '12GB LPDDR5X',
      Storage: '512GB UFS 4.0',
      Camera: '200MP Main + 50MP 5x + 50MP Ultra-wide',
      Stylus: 'Integrated Bluetooth S-Pen',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4, 6],
      frequency: 'monthly',
    },
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 'prod-macbook-pro-m4',
    name: 'Apple MacBook Pro 14" M4 Chip 16GB / 512GB Space Black',
    brand: 'Apple',
    category: 'Computers & Laptops',
    basePriceUSD: 1599,
    originalPriceUSD: 1749,
    discountPercent: 9,
    rating: 4.95,
    ratingCount: 142,
    stockCount: 8,
    images: [
      '/src/assets/images/product_tech_bundle_1793992277152.jpg',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Supercharged by the M4 chip. Delivers phenomenal performance for demanding African software developers, creative designers, and video producers with up to 24 hours of industry-leading battery longevity.',
    specifications: {
      Processor: 'Apple M4 (10-core CPU, 10-core GPU)',
      Memory: '16GB Unified High-Bandwidth Memory',
      Storage: '512GB Fast SSD',
      Display: 'Liquid Retina XDR 14.2" with ProMotion',
      Ports: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3',
      Battery: '72.4Wh lithium-polymer, 70W USB-C Adapter',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4, 6],
      frequency: 'monthly',
    },
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 'prod-lg-inverter-refrigerator',
    name: 'LG 335L Smart Inverter Linear Refrigerator - Platinum Silver',
    brand: 'LG',
    category: 'Home Appliances',
    basePriceUSD: 740,
    originalPriceUSD: 840,
    discountPercent: 12,
    rating: 4.7,
    ratingCount: 88,
    stockCount: 15,
    images: [
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Designed specifically for tropical climates with Smart Inverter Compressor and DoorCooling+ technology. Maintains freshness even during intermittent power outages with extended cooling retention.',
    specifications: {
      Capacity: '335 Liters Net Storage',
      Cooling: 'LinearCooling + DoorCooling+',
      Compressor: 'Smart Inverter (10-Year Warranty)',
      Voltage: 'Wide Voltage Operability (135V - 290V surge protection)',
      SmartFeatures: 'LG ThinQ App Remote Diagnostic Support',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4, 6],
      frequency: 'monthly',
    },
    isFeatured: false,
    isPopular: true,
  },
  {
    id: 'prod-hisense-65-qled',
    name: 'Hisense 65" 4K Smart QLED TV with Dolby Vision & Atmos',
    brand: 'Hisense',
    category: 'Electronics & Audio',
    basePriceUSD: 590,
    originalPriceUSD: 680,
    discountPercent: 13,
    rating: 4.6,
    ratingCount: 165,
    stockCount: 22,
    images: [
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Quantum Dot Color technology creates over a billion vibrant shades with precision brightness. Features VIDAA OS with preloaded Netflix, YouTube, Showmax, and DSTV Stream for seamless African entertainment.',
    specifications: {
      ScreenSize: '65 Inches 4K Ultra HD (3840 x 2160)',
      DisplayType: 'Quantum Dot Color QLED',
      HDR: 'Dolby Vision IQ, HDR10+, HLG',
      Audio: '20W Dolby Atmos Sound System',
      OS: 'VIDAA U7 Smart with Voice Remote',
      Connectivity: '3x HDMI 2.1, 2x USB, Dual Band WiFi, Bluetooth 5.1',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4, 6],
      frequency: 'monthly',
    },
    isFeatured: false,
    isPopular: true,
  },
  {
    id: 'prod-sony-wh1000xm5',
    name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
    brand: 'Sony',
    category: 'Electronics & Audio',
    basePriceUSD: 349,
    originalPriceUSD: 399,
    discountPercent: 12,
    rating: 4.9,
    ratingCount: 248,
    stockCount: 30,
    images: [
      '/src/assets/images/product_tech_bundle_1793992277152.jpg',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Industry-leading active noise cancellation with two processors and eight microphones. Ultra-comfortable lightweight design with soft fit leather, 30-hour battery life, and crystal-clear hands-free calls.',
    specifications: {
      NoiseCanceling: 'HD Noise Canceling Processor QN1 & V1',
      BatteryLife: '30 hours (ANC on), 3 min quick charge for 3 hours',
      Microphones: '4 beamforming microphones with AI noise reduction',
      Weight: '250 grams',
      Codecs: 'LDAC, AAC, SBC, High-Resolution Audio Wireless',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4],
      frequency: 'monthly',
    },
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 'prod-nordic-office-chair',
    name: 'Ergonomic Executive High-Back Mesh Chair with Lumbar Support',
    brand: 'Visibyl Comfort',
    category: 'Furniture',
    basePriceUSD: 240,
    originalPriceUSD: 290,
    discountPercent: 17,
    rating: 4.8,
    ratingCount: 93,
    stockCount: 25,
    images: [
      'https://images.unsplash.com/photo-1580481077195-c3a821a506cb?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Engineered for 12+ hours of posture health. Breathable Korean mesh backrest, 3D adjustable armrests, adaptive lumbar support, and heavy-duty steel base with whisper-smooth rollerblade casters.',
    specifications: {
      Material: 'Breathable High-Density Polymer Mesh',
      Recline: '90° to 135° Synchro-tilt lock',
      Capacity: 'Supports up to 160kg (350 lbs)',
      Base: 'Class 4 Heavy-Duty BIFMA Certified Gas Lift',
      Warranty: '3 Years Full Structural Warranty',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4],
      frequency: 'monthly',
    },
    isFeatured: false,
    isPopular: false,
  },
  {
    id: 'prod-african-luxury-agbada',
    name: 'Hand-Embroidered Royal Aso-Oke 3-Piece Agbada Ensemble',
    brand: 'Visibyl Couture',
    category: 'Fashion & Shoes',
    basePriceUSD: 280,
    originalPriceUSD: 350,
    discountPercent: 20,
    rating: 4.95,
    ratingCount: 76,
    stockCount: 14,
    images: [
      'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Impeccably hand-loomed and embroidered by master Nigerian weavers using premium metallic silk-thread accents. Includes the grand flowing Agbada robe, tailored buba shirt, and sokoto trousers.',
    specifications: {
      Fabric: 'Premium Hand-Woven Aso-Oke & Silk Brocade Blend',
      Embroidery: 'Royal Geometric Threadwork across chest and neckline',
      Pieces: '3 Pieces: Grand Agbada, Inner Buba Shirt, Sokoto Pant',
      Occasion: 'Weddings, VIP Galas, State Banquets & Royal Gatherings',
      Origin: 'Artisanal Craftsmanship, Lagos & Ibadan Guild',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4],
      frequency: 'monthly',
    },
    isFeatured: true,
    isPopular: false,
  },
  {
    id: 'prod-shea-baobab-luxury-skincare',
    name: 'Organic Shea Butter & Baobab Luxury Skin & Glow Set',
    brand: 'Kalahari Gold',
    category: 'Beauty & Care',
    basePriceUSD: 65,
    originalPriceUSD: 85,
    discountPercent: 23,
    rating: 4.85,
    ratingCount: 182,
    stockCount: 45,
    images: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Pure cold-pressed unrefined Grade A Northern Ghanaian shea butter infused with cold-pressed Malagasy baobab seed oil and Kalahari melon seed extract. Deeply hydrates and restores skin radiance.',
    specifications: {
      Contents: 'Body Butter (250ml), Face Elixir (50ml), Nourishing Scrub (200ml)',
      Certification: '100% Organic, Cruelty-Free, Fair-Trade Community Certified',
      Origin: 'Sourced from Women’s Cooperatives in Tamale & Madagascar',
    },
    paymentOptions: {
      payNow: true,
      bnpl: false, // Low-ticket item
      saveToBuy: true,
      osusu: false,
    },
    saveToBuyMinDepositPercent: 30,
    isFeatured: false,
    isPopular: true,
  },
  {
    id: 'prod-starlink-standard-kit',
    name: 'Starlink Standard High-Speed Low-Latency Internet Satellite Kit',
    brand: 'Starlink',
    category: 'Electronics & Audio',
    basePriceUSD: 450,
    originalPriceUSD: 500,
    discountPercent: 10,
    rating: 4.9,
    ratingCount: 118,
    stockCount: 10,
    images: [
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'High-speed, low-latency broadband internet designed for homes and businesses across urban and remote regions in Africa. With weather-resistant motorized antenna, Wi-Fi router, and heavy-duty cabling.',
    specifications: {
      Speeds: 'Up to 220 Mbps download, 25 Mbps upload, <35ms latency',
      InBox: 'Starlink Dish, Base Mount, Wi-Fi 6 Router, 15m Cable, AC Cable',
      WeatherResistance: 'IP67 rated, snow-melt, high-wind certified',
      Setup: 'Self-install via iOS & Android Starlink mobile app in 5 minutes',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4, 6],
      frequency: 'monthly',
    },
    isFeatured: true,
    isPopular: true,
  },
  {
    id: 'prod-maxi-standing-cooker',
    name: 'Maxi 4-Burner Gas & Electric Standing Cooker with Rotisserie Oven',
    brand: 'Maxi',
    category: 'Home Appliances',
    basePriceUSD: 310,
    originalPriceUSD: 360,
    discountPercent: 14,
    rating: 4.75,
    ratingCount: 64,
    stockCount: 16,
    images: [
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Heavy-duty stainless steel build with 3 high-output gas burners, 1 electric hotplate, glass top lid, auto-ignition, and spacious convection oven with rotisserie turnspit.',
    specifications: {
      Configuration: '3 Gas Burners + 1 Rapid Electric Hotplate',
      OvenCapacity: '65 Liters with Double Glass Insulated Door',
      Safety: 'Flame Failure Device on all gas burners',
      Finish: 'Rust-Proof Inox Stainless Steel',
    },
    paymentOptions: {
      payNow: true,
      bnpl: true,
      saveToBuy: true,
      osusu: true,
    },
    saveToBuyMinDepositPercent: 30,
    osusuDetails: {
      recommendedGroupSizes: [4],
      frequency: 'monthly',
    },
    isFeatured: false,
    isPopular: false,
  },
  {
    id: 'prod-pampers-baby-pack',
    name: 'Pampers Premium Protection Diapers Mega Box (Size 3, 204 Count)',
    brand: 'Pampers',
    category: 'Baby Products',
    basePriceUSD: 48,
    originalPriceUSD: 56,
    discountPercent: 14,
    rating: 4.9,
    ratingCount: 310,
    stockCount: 80,
    images: [
      'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800&auto=format&fit=crop&q=80',
    ],
    description:
      'Clinically tested hypoallergenic diapers with Heart Quilts layer for ultimate comfort and up to 12 hours of leakage protection. Breathable channels keep baby skin dry and healthy.',
    specifications: {
      Size: 'Size 3 (6-10 kg / 13-22 lbs)',
      Quantity: '204 Diapers (Mega Value Pack)',
      Features: 'Wetness Indicator, DermaComfort Layer, Extra Soft Wings',
    },
    paymentOptions: {
      payNow: true,
      bnpl: false,
      saveToBuy: true,
      osusu: false,
    },
    saveToBuyMinDepositPercent: 30,
    isFeatured: false,
    isPopular: true,
  },
];

export const PRODUCT_CATEGORIES = [
  'All Categories',
  'Phones & Tablets',
  'Computers & Laptops',
  'Electronics & Audio',
  'Home Appliances',
  'Furniture',
  'Fashion & Shoes',
  'Beauty & Care',
  'Baby Products',
] as const;

export const SAMPLE_REVIEWS: ProductReview[] = [
  {
    id: 'rev-1',
    author: 'Babajide Adeleke',
    country: 'Nigeria',
    rating: 5,
    date: '3 days ago',
    comment:
      'Bought via Osusu with 3 of my tech colleagues in Ikeja. I took rotation #1 and the phone arrived in 2 days brand new with valid warranty. Absolutely seamless experience!',
    verifiedPurchase: true,
  },
  {
    id: 'rev-2',
    author: 'Khadija Mwangi',
    country: 'Kenya',
    rating: 5,
    date: '1 week ago',
    comment:
      'Save to Buy option helped me lock the price against inflation while I paid my 30% down payment and 2 subsequent deposits. VISBUY delivered right to my door in Westlands.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-3',
    author: 'Kofi Mensah',
    country: 'Ghana',
    rating: 5,
    date: '2 weeks ago',
    comment:
      'BNPL approval took less than 2 minutes via MTN Mobile Money. Paystack gateway works flawlessly. Customer service on WhatsApp was attentive and respectful.',
    verifiedPurchase: true,
  },
];
