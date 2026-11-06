import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Send,
  CheckCircle2,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

export const SupportView: React.FC = () => {
  const { currentCountry, addNotification } = useVisbuy();

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Payment Verification');
  const [ticketMessage, setTicketMessage] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);

  // WhatsApp simulation chat
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'visbuy',
      text: 'Hello Oluwaseun! Welcome to VISBUY WhatsApp Care. How can we assist with your order, Osusu group, or Save to Buy plan today?',
      time: '10:00 AM',
    },
  ]);
  const [replyText, setReplyText] = useState('');

  const faqs = [
    {
      q: 'How does Osusu Group Purchasing work on VISBUY?',
      a: 'Osusu is our digitized African rotating savings model. You select a product, join a verified circle of 4 to 6 buyers, and contribute fixed installments each cycle. During each cycle, one member is allocated and receives their brand-new product delivered to their home. Escrow holds ensure all items are 100% fulfilled.',
    },
    {
      q: 'What happens if an Osusu member defaults or misses a contribution?',
      a: 'VISBUY gives a 3-day grace period with SMS and WhatsApp alerts. If unpaid after the grace period, our automated replacement protocol substitutes the defaulting member with a pre-vetted buyer from our verified waitlist. The group’s progress is never stalled.',
    },
    {
      q: 'How does Save to Buy protect me against inflation and currency devaluation?',
      a: 'When you start a Save to Buy plan with an initial 30% deposit, the item is physically reserved in the VISBUY warehouse and its price is locked in local currency. Even if currency exchange rates shift or retail prices rise, you only pay the original locked balance.',
    },
    {
      q: 'How and when can I withdraw my VISBUY Rewards?',
      a: 'You automatically earn 2.5% cashback on completed purchases. Once you accumulate ₦1,000 (or equivalent in your African currency), you can redeem it directly as an instant checkout discount or request a cash withdrawal to your bank account or mobile money wallet.',
    },
    {
      q: 'Which payment methods are supported in my country?',
      a: `In ${currentCountry.name}, VISBUY natively supports ${currentCountry.supportedGateways.join(', ')}. All transactions are processed through licensed payment switches (Paystack, Flutterwave, and direct telco mobile money) with 256-bit encryption.`,
    },
  ];

  const handleTicketSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ticketId = `TKT-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedTicket(ticketId);
    addNotification(
      'Support Ticket Created',
      `Ticket #${ticketId} submitted. A Visibyl support representative will respond within 2 hours.`,
      'security'
    );
    setTicketSubject('');
    setTicketMessage('');
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const userMsg = { sender: 'user', text: replyText, time: 'Just now' };
    setChatMessages((prev) => [...prev, userMsg]);
    setReplyText('');

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'visbuy',
          text: 'Thank you for reaching out! A dedicated Visibyl Technologies support agent has reviewed your account. Your order status and escrow ledgers are in good standing.',
          time: 'Just now',
        },
      ]);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 md:py-10 space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0030B8] to-[#0047FF] p-6 sm:p-10 rounded-3xl text-white shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-blue-100">
          <HelpCircle className="w-3.5 h-3.5 text-blue-200" />
          <span>Visibyl Customer Success Desk</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold font-display">
          We’re Here to Help You Shop & Save Smart.
        </h1>
        <p className="text-sm text-blue-100 max-w-xl">
          24/7 dedicated support across all 54 African countries via WhatsApp, live complaint ticketing, email, and localized telephone helplines.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: FAQ Accordion & Complaint Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* FAQs */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-slate-900 font-display">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {faqs.map((faq, idx) => {
                const isOpen = expandedFaq === idx;
                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedFaq(isOpen ? null : idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                    >
                      <span className="text-sm font-bold text-slate-900 font-display">{faq.q}</span>
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#0047FF] shrink-0" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submit Complaint Ticket */}
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 space-y-5">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-display">Submit a Formal Complaint or Request</h3>
              <p className="text-xs text-slate-500">Every ticket is assigned a formal ID and tracked until complete resolution.</p>
            </div>

            {submittedTicket ? (
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-2">
                <div className="font-bold flex items-center gap-1.5 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ticket Logged Successfully!</span>
                </div>
                <p>
                  Your ticket reference is <strong className="font-mono">{submittedTicket}</strong>. An email notification has been dispatched.
                </p>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="text-[#0047FF] font-semibold underline mt-2 block cursor-pointer"
                >
                  Submit Another Ticket
                </button>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Issue Category</label>
                    <select
                      value={ticketCategory}
                      onChange={(e) => setTicketCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium"
                    >
                      <option value="Payment Verification">Payment Verification / Webhook</option>
                      <option value="Osusu Group Dispute">Osusu Group Dispute / Replacement</option>
                      <option value="Save to Buy Delivery">Save to Buy Delivery Dispatch</option>
                      <option value="BNPL Repayment">BNPL Repayment Support</option>
                      <option value="Rewards & Withdrawal">Rewards Wallet Withdrawal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={ticketSubject}
                      onChange={(e) => setTicketSubject(e.target.value)}
                      placeholder="Brief summary of issue"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Detailed Explanation</label>
                  <textarea
                    rows={4}
                    value={ticketMessage}
                    onChange={(e) => setTicketMessage(e.target.value)}
                    placeholder="Provide order numbers, Osusu group titles, or transaction references..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 bg-[#0047FF] hover:bg-[#0036cc] text-white font-semibold rounded-xl transition-all shadow-md cursor-pointer"
                >
                  Submit Formal Ticket
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: WhatsApp Live Chat Simulation & Regional Contacts */}
        <div className="lg:col-span-5 space-y-6">
          {/* WhatsApp Chat Simulator */}
          <div className="bg-[#0b141a] text-white rounded-2xl overflow-hidden shadow-xl border border-slate-800 flex flex-col h-[480px]">
            {/* WhatsApp Header */}
            <div className="bg-[#202c33] p-4 flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/aistudio/file_000000003fcc81f48a1417e03ba4b722_39cea0f0.png"
                  alt="VISBUY"
                  className="w-9 h-9 rounded-full bg-white p-0.5 object-cover"
                />
                <div>
                  <div className="font-bold text-sm text-white flex items-center gap-1.5">
                    <span>VISBUY Verified Support</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  </div>
                  <div className="text-[11px] text-emerald-400">Official WhatsApp Business Account</div>
                </div>
              </div>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#0b141a]">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`max-w-[85%] p-3 rounded-2xl text-xs space-y-1 ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-[#005c4b] text-white rounded-tr-xs'
                      : 'mr-auto bg-[#202c33] text-slate-100 rounded-tl-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] text-slate-400 block text-right">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendChat} className="p-3 bg-[#202c33] flex items-center gap-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type a message via WhatsApp API..."
                className="flex-1 px-3.5 py-2 bg-[#2a3942] text-white rounded-xl text-xs focus:outline-hidden"
              />
              <button
                type="submit"
                className="p-2 bg-[#00a884] hover:bg-[#008f72] text-white rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Regional Hubs Info */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-display">Regional Fulfillment Hubs</h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Lagos HQ (West Africa):</span>
                <span>+234 1 800 VISBUY</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Nairobi Hub (East Africa):</span>
                <span>+254 20 700 VISBUY</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="font-semibold text-slate-800">Johannesburg Hub (Southern Africa):</span>
                <span>+27 11 900 VISBUY</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Cairo Hub (North Africa):</span>
                <span>+20 2 3300 VISBUY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
