"use client";

import React from "react";

type Props = {
  phone: string; // e.g., "51987654321"
  message?: string; // optional prefilled message
  tooltip?: string; // accessibility label
  className?: string; // allow style overrides
};

function buildWhatsAppUrl(phone: string, message?: string) {
  const sanitized = phone.replace(/\D/g, "");
  const base = `https://wa.me/${sanitized}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export const FloatingWhatsAppButton: React.FC<Props> = ({
  phone,
  message,
  tooltip = "Chatear por WhatsApp",
  className = "",
}) => {
  const href = buildWhatsAppUrl(phone, message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      aria-label={tooltip}
      title={tooltip}
  className={`fixed right-4 bottom-4 z-[1000] inline-flex items-center justify-center h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 bg-green-500 text-white md:bottom-6 md:right-6 ${className}`}
    >
      {/* WhatsApp Icon */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.52 3.48A11.86 11.86 0 0 0 12.04 0C5.51 0 .24 5.27.24 11.76c0 2.07.54 4.09 1.58 5.88L0 24l6.5-1.71a11.7 11.7 0 0 0 5.54 1.41h.01c6.53 0 11.8-5.27 11.8-11.76 0-3.15-1.23-6.11-3.33-8.36zM12.05 22.1h-.01a9.8 9.8 0 0 1-4.99-1.37l-.36-.21-3.86 1.02 1.03-3.76-.23-.38a9.92 9.92 0 0 1-1.5-5.22C2.13 6.34 6.6 1.9 12.04 1.9c2.63 0 5.09 1.02 6.95 2.88a9.82 9.82 0 0 1 2.89 6.98c0 5.44-4.46 9.98-9.83 9.98zm5.4-7.35c-.29-.15-1.74-.86-2.01-.96-.27-.1-.46-.15-.66.15-.19.29-.76.96-.93 1.15-.17.2-.34.22-.64.08-.29-.15-1.24-.45-2.36-1.43-.87-.75-1.46-1.67-1.64-1.95-.17-.29-.02-.45.13-.6.13-.12.29-.32.44-.48.15-.16.2-.27.3-.46.1-.2.05-.36-.02-.52-.07-.15-.66-1.58-.9-2.17-.24-.58-.48-.5-.66-.5l-.57-.01c-.19 0-.5.07-.76.36-.26.29-1 1-1 2.45s1.03 2.84 1.18 3.04c.15.2 2.03 3.1 4.92 4.35.69.3 1.23.48 1.65.62.69.22 1.32.19 1.82.11.56-.08 1.74-.71 1.99-1.4.24-.69.24-1.28.17-1.4-.07-.12-.26-.19-.55-.34z" />
      </svg>
    </a>
  );
};

export default FloatingWhatsAppButton;
