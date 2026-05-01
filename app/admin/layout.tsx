import Link from "next/link";
import { LayoutDashboard, Users, AlertTriangle, FileText, ArrowLeft, ImageIcon } from "lucide-react";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Members", icon: Users },
  { href: "/admin/expiring", label: "Alerts", icon: AlertTriangle },
  { href: "/admin/posts", label: "Content", icon: FileText },
  { href: "/admin/gallery", label: "Gallery", icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="pt-20 pb-20 bg-background min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        {/* Top admin bar */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/50">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest">Admin Panel</h2>
              <p className="text-xs text-text-muted">Kiran&apos;s Fitness Club</p>
            </div>
          </div>
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-text-secondary hover:text-white transition group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to Site
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar navigation */}
          <aside className="lg:w-56 shrink-0">
            <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-white hover:bg-surface transition-all whitespace-nowrap group"
                  >
                    <Icon className="w-[18px] h-[18px] text-text-muted group-hover:text-accent transition-colors" />
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          {/* Main content area */}
          <div className="flex-1 min-w-0">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
