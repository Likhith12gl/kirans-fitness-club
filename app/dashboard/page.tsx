/* eslint-disable @typescript-eslint/no-explicit-any */
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { Calendar, Clock, AlertTriangle, ShieldAlert } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user.email) {
    redirect("/login");
  }

  await dbConnect();
  const userRecord = await User.findOne({ email: session.user.email }).lean() as any;

  if (!userRecord) {
    redirect("/login");
  }

  const remaining = Math.ceil((new Date(userRecord.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const isExpired = remaining <= 0;
  const isWarning = remaining > 0 && remaining <= 7;

  // WhatsApp Logic Builder
  const phone = "919019688582";
  const whatsappText = encodeURIComponent(`Hi, I am ${userRecord.name}. I would like to renew my ${userRecord.plan} subscription at Kiran's Fitness Club.`);
  const whatsappUrl = `https://wa.me/${phone}?text=${whatsappText}`;

  return (
    <main className="pt-32 pb-20 bg-background min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-0">
        
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold text-white uppercase tracking-tight mb-2">
              Welcome back, <span className="text-accent">{userRecord.name.split(' ')[0]}</span>
            </h1>
            <p className="text-text-secondary">View your active subscription and gym access details below.</p>
          </div>
          
          <div className="mt-6 md:mt-0">
            {session.user.role === "admin" && (
              <Link href="/admin" className="btn-primary mr-4 inline-block">
                Admin Panel
              </Link>
            )}
          </div>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          
          <div className={`card p-8 border-t-4 transition-colors ${
              isExpired ? "border-t-red-500 border border-red-500/20 bg-red-500/5" :
              isWarning ? "border-t-yellow-500 border border-yellow-500/20 bg-yellow-500/5" :
              "border-t-accent border border-border"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              {isExpired ? <ShieldAlert className="w-8 h-8 text-red-500"/> :
               isWarning ? <AlertTriangle className="w-8 h-8 text-yellow-500" /> :
               <Clock className="w-8 h-8 text-accent" />}
              <h2 className="text-2xl font-bold text-white">Status</h2>
            </div>
            
            {isExpired ? (
              <div>
                <p className="text-4xl font-heading font-bold text-red-500 mb-2">Expired</p>
                <p className="text-text-secondary">Your subscription ended on {new Date(userRecord.endDate).toLocaleDateString()}. To continue accessing the gym, please renew below.</p>
              </div>
            ) : (
              <div>
                <p className={`text-5xl font-heading font-bold mb-2 ${isWarning ? 'text-yellow-500' : 'text-white'}`}>
                  {remaining} <span className="text-xl text-text-secondary font-normal uppercase tracking-widest">Days Left</span>
                </p>
                <p className="text-text-secondary">Keep up the great work! You&apos;re currently on the <strong className="text-white">{userRecord.plan}</strong> plan.</p>
              </div>
            )}
            
            <div className="mt-8 pt-6 border-t border-border/50">
               <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={`w-full text-center block px-6 py-4 rounded-button font-bold text-black transition-transform hover:-translate-y-1 ${isExpired || isWarning ? 'bg-accent' : 'bg-white/10 text-white hover:bg-white/20'}`}>
                 {isExpired ? "Renew Subscription Now" : isWarning ? "Renew Early" : "Change Plan on WhatsApp"}
               </a>
            </div>
          </div>


          <div className="card p-8 border border-border flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="w-8 h-8 text-text-secondary" />
              <h2 className="text-2xl font-bold text-white">Billing Cycle</h2>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-text-muted text-sm font-bold uppercase tracking-wider mb-1">Start Date</p>
                <p className="text-xl font-bold text-white">
                  {new Date(userRecord.startDate).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>
              
              <div>
                <p className="text-text-muted text-sm font-bold uppercase tracking-wider mb-1">End Date</p>
                <p className="text-xl font-bold text-white">
                  {new Date(userRecord.endDate).toLocaleDateString('en-GB', {
                    day: '2-digit', month: 'short', year: 'numeric'
                  })}
                </p>
              </div>

              <div>
                <p className="text-text-muted text-sm font-bold uppercase tracking-wider mb-1">Current Plan Tier</p>
                <p className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded text-accent font-bold">
                  {userRecord.plan || "None"}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </main>
  );
}
