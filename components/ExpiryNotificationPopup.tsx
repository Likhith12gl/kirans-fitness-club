"use client";
import { useEffect, useState } from "react";
import { X, AlertTriangle, ShieldAlert } from "lucide-react";

interface ExpiryBannerProps {
  daysRemaining: number;
  memberName: string;
  whatsappUrl: string;
}

export default function ExpiryNotificationPopup({ daysRemaining, memberName, whatsappUrl }: ExpiryBannerProps) {
  const [visible, setVisible] = useState(false);
  const isExpired = daysRemaining <= 0;
  const isExpiring = daysRemaining > 0 && daysRemaining <= 7;

  useEffect(() => {
    // Only show if expired or expiring within 7 days
    if (!isExpired && !isExpiring) return;

    // Check session storage so it only shows once per session
    const key = `expiry-notif-dismissed-${new Date().toDateString()}`;
    if (!sessionStorage.getItem(key)) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isExpired, isExpiring]);

  const dismiss = () => {
    const key = `expiry-notif-dismissed-${new Date().toDateString()}`;
    sessionStorage.setItem(key, "1");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Subscription expiry notification"
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div
        className={`relative z-10 w-full max-w-md rounded-2xl border shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-300 ${
          isExpired
            ? "bg-[#1a0a0a] border-red-500/50 shadow-red-900/30"
            : "bg-[#1a1400] border-yellow-500/50 shadow-yellow-900/20"
        }`}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          aria-label="Dismiss notification"
          className="absolute top-4 right-4 text-text-secondary hover:text-white transition p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon + heading */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`p-3 rounded-full shrink-0 ${isExpired ? "bg-red-500/15" : "bg-yellow-500/15"}`}>
            {isExpired ? (
              <ShieldAlert className="w-8 h-8 text-red-500" />
            ) : (
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            )}
          </div>
          <div>
            <h2 className={`text-xl font-heading font-bold mb-1 ${isExpired ? "text-red-400" : "text-yellow-400"}`}>
              {isExpired ? "Subscription Expired" : "Subscription Ending Soon!"}
            </h2>
            <p className="text-text-secondary text-sm">
              {isExpired
                ? `Hi ${memberName}, your gym membership has expired. Renew now to continue your fitness journey.`
                : `Hi ${memberName}, your subscription expires in ${daysRemaining} day${daysRemaining === 1 ? "" : "s"}. Renew early to avoid a gap!`}
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="flex-1 text-center px-6 py-3 rounded-button font-bold bg-accent text-black hover:bg-accent/90 transition-transform hover:-translate-y-0.5"
          >
            {isExpired ? "Renew Now on WhatsApp" : "Renew Early"}
          </a>
          <button
            onClick={dismiss}
            className="flex-1 text-center px-6 py-3 rounded-button font-bold border border-white/20 text-white hover:bg-white/10 transition"
          >
            Remind Me Later
          </button>
        </div>
      </div>
    </div>
  );
}
