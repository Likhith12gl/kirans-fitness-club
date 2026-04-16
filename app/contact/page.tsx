import { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Gym Location, Phone & Hours",
  description:
    "Contact Kiran's Fitness Club in Anjananagar, Bangalore. Visit us at #123 Magadi Main Road, call us, or send a message. Open Mon–Sat 5:30 AM–10:00 PM and Sunday 6:00 AM–12:00 PM.",
  alternates: { canonical: "https://kiransfitnessclub.com/contact" },
  openGraph: {
    title: "Contact Kiran's Fitness Club | Gym in Anjananagar, Bangalore",
    description:
      "Visit us at #123 Magadi Main Road, Anjananagar, Bangalore. Open Mon–Sat 5:30 AM–10 PM. Call or WhatsApp for membership enquiries.",
    url: "https://kiransfitnessclub.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Kiran's Fitness Club | Anjananagar, Bangalore",
    description: "Gym location, phone, and opening hours for Kiran's Fitness Club on Magadi Main Road.",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
