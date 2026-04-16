import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

// Brand icons as inline SVGs (removed from lucide-react v1.7+)
const InstagramIcon = ({ size = 20 }: { size?: number | string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><circle cx="12" cy="12" r="5" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.51" />
  </svg>
);

const YoutubeIcon = ({ size = 20 }: { size?: number | string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" />
  </svg>
);

const FacebookIcon = ({ size = 20 }: { size?: number | string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/events", label: "Events" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const socialLinks = [
  { href: "https://www.instagram.com/kiransfitnessclub?igsh=MXZmcmd1MGF6OGx6Zg%3D%3D&utm_source=qr", icon: InstagramIcon, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-surface-alt border-t border-border">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-heading font-semibold text-lg text-white mb-2">
              Kiran&apos;s Fitness Club
            </h3>
            <p className="text-text-secondary text-sm leading-relaxed">
              Transform your fitness journey. Anjananagar&apos;s most trusted
              fitness center with expert trainers and modern equipment.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-text-secondary text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0 text-accent" />
                <span>
                  9, 10, Shivakrupa Complex,
                  <br />
                  Bharath Nagar, Bedarahalli,
                  <br />
                  Bengaluru - 560091
                </span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Phone size={16} className="shrink-0 text-accent" />
                <span>+91 8179376067</span>
              </li>
              <li className="flex items-center gap-2 text-text-secondary text-sm">
                <Mail size={16} className="shrink-0 text-accent" />
                <span>29nkiran@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-white mb-4 uppercase tracking-wider">
              Follow Us
            </h4>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-secondary hover:text-accent transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-border">
        <div className="container-custom py-6">
          <p className="text-text-muted text-sm text-center">
            © {new Date().getFullYear()} Kiran&apos;s Fitness Club. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
