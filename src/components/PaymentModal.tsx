import React, { useState } from 'react';
import { useVisbuy } from '../context/VisbuyContext';
import { X, ShieldCheck, CreditCard, Building2, Smartphone, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { paymentModal, closePaymentModal, currentCountry, formatPrice, toLocalAmount } = useVisbuy();
  const [method, setMethod] = useState<'card' | 'transfer' | 'momo'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cardNumber, setCardNumber] = useState('4084 0841 8291 0021');
  const [cardExpiry, setCardExpiry] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('883');
  const [mobileNumber, setMobileNumber] = useState('0803 123 4567');

  if (!paymentModal.isOpen) return null;

  const localAmount = toLocalAmount(paymentModal.amountUSD);
  const formattedAmount = formatPrice(paymentModal.amountUSD);

  const handleSimulatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        paymentModal.onSuccess();
        setIsSuccess(false);
        closePaymentModal();
      }, 1500);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Top brand header */}
        <div className="bg-[#0047FF] text-white px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/assets/aistudio/file_000000003fcc81f48a1417e03ba4b722_39cea0f0.png"
              alt="VISBUY"
              className="w-9 h-9 rounded-full bg-white p-0.5 object-cover"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-white font-display">VISBUY Secure Checkout</span>
                <span className="text-[10px] bg-white/20 text-white px-1.5 py-0.5 rounded font-mono">
                  {currentCountry.supportedGateways[0]}
                </span>
              </div>
              <p className="text-xs text-blue-100">{paymentModal.paymentModeLabel}</p>
            </div>
          </div>
          <button
            onClick={closePaymentModal}
            className="p-1.5 text-blue-100 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount bar */}
        <div className="bg-blue-50 px-6 py-3.5 border-b border-blue-100 flex items-center justify-between">
          <div>
            <div className="text-xs text-slate-500">Payable in {currentCountry.name} ({currentCountry.currencyCode})</div>
            <div className="text-xl font-extrabold text-[#0047FF] font-mono tabular-nums">{formattedAmount}</div>
          </div>
          <div className="text-right text-xs text-slate-400">
            Base: ${paymentModal.amountUSD.toFixed(2)} USD
          </div>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 font-display">Transaction Verified!</h3>
              <p className="text-sm text-slate-600 mt-1">
                Your payment of {formattedAmount} has been verified and settled via {currentCountry.supportedGateways[0]}.
              </p>
            </div>
            <p className="text-xs text-slate-400 font-mono">Reference: VIS-{Date.now().toString().slice(-8)}</p>
          </div>
        ) : (
          <div className="p-6 space-y-5">
            {/* Payment Method Selector */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setMethod('card')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  method === 'card'
                    ? 'bg-white text-[#0047FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('transfer')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  method === 'transfer'
                    ? 'bg-white text-[#0047FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
              <button
                type="button"
                onClick={() => setMethod('momo')}
                className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                  method === 'momo'
                    ? 'bg-white text-[#0047FF] shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Money</span>
              </button>
            </div>

            {/* Method Details */}
            {method === 'card' && (
              <div className="space-y-3.5">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Expires</label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">CVV</label>
                    <input
                      type="text"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                    />
                  </div>
                </div>
              </div>
            )}

            {method === 'transfer' && (
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <div className="text-xs text-slate-600">
                  Transfer exactly <strong className="text-[#0047FF] font-mono">{formattedAmount}</strong> to the generated dynamic virtual account below:
                </div>
                <div className="bg-white p-3 rounded-lg border border-slate-200 space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Bank:</span>
                    <span className="font-semibold text-slate-800">VISBUY / Providus Escrow</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Account Number:</span>
                    <span className="font-mono font-bold text-slate-900 tracking-wider">9948201948</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Account Name:</span>
                    <span className="font-medium text-slate-800">VISBUY Tech - {currentCountry.name}</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  Virtual account expires in 30 minutes. Auto-monitored by webhook listener.
                </p>
              </div>
            )}

            {method === 'momo' && (
              <div className="space-y-3">
                <div className="text-xs text-slate-600">
                  Supported via M-Pesa, MTN MoMo, Airtel Money & Orange Money in {currentCountry.name}.
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Mobile Money Number ({currentCountry.phonePrefix})
                  </label>
                  <div className="flex gap-2">
                    <span className="px-3 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs font-mono text-slate-600 flex items-center">
                      {currentCountry.phonePrefix}
                    </span>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      className="flex-1 px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl font-mono focus:ring-2 focus:ring-[#0047FF]/20 focus:border-[#0047FF] outline-hidden"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-slate-400">
                  A USSD prompt will be sent to your phone to enter your 4-digit PIN.
                </p>
              </div>
            )}

            {/* Action button */}
            <button
              onClick={handleSimulatePayment}
              disabled={isProcessing}
              className="w-full py-3.5 px-4 bg-[#0047FF] hover:bg-[#0036cc] active:scale-[0.99] text-white font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Verifying via {currentCountry.supportedGateways[0]}...</span>
                </>
              ) : (
                <>
                  <span>
                    {method === 'transfer' ? 'I Have Completed the Transfer' : `Authorize ${formattedAmount}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit Bank-Grade Encryption · PCI-DSS Level 1 Certified</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
