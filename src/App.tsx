/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { VisbuyProvider, useVisbuy } from './context/VisbuyContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CountryModal } from './components/CountryModal';
import { PaymentModal } from './components/PaymentModal';
import { MarketplaceView } from './components/MarketplaceView';
import { CategoriesView } from './components/CategoriesView';
import { ProductDetailView } from './components/ProductDetailView';
import { OsusuHubView } from './components/OsusuHubView';
import { SaveToBuyView } from './components/SaveToBuyView';
import { RentSavingsView } from './components/RentSavingsView';
import { CartView } from './components/CartView';
import { CheckoutView } from './components/CheckoutView';
import { OrderSuccessView } from './components/OrderSuccessView';
import { CustomerDashboardView } from './components/CustomerDashboardView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { SupportView } from './components/SupportView';

const MainContent: React.FC = () => {
  const { activeView } = useVisbuy();

  return (
    <main className="min-h-screen flex flex-col justify-between pb-20 md:pb-0">
      <div className="flex-1">
        {activeView === 'marketplace' && <MarketplaceView />}
        {activeView === 'categories' && <CategoriesView />}
        {activeView === 'product-detail' && <ProductDetailView />}
        {activeView === 'osusu-hub' && <OsusuHubView />}
        {activeView === 'save-to-buy' && <SaveToBuyView />}
        {activeView === 'rent-savings' && <RentSavingsView />}
        {activeView === 'cart' && <CartView />}
        {activeView === 'checkout' && <CheckoutView />}
        {activeView === 'order-success' && <OrderSuccessView />}
        {activeView === 'customer-dashboard' && <CustomerDashboardView />}
        {activeView === 'admin-dashboard' && <AdminDashboardView />}
        {activeView === 'support' && <SupportView />}
      </div>
      {activeView !== 'categories' && <Footer />}
    </main>
  );
};

export default function App() {
  return (
    <VisbuyProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans flex flex-col">
        <Navbar />
        <MainContent />
        <CountryModal />
        <PaymentModal />
      </div>
    </VisbuyProvider>
  );
}
