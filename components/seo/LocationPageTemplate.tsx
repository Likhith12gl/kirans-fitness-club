import SchemaOrg from "@/components/seo/SchemaOrg";
import Link from "next/link";
import { CheckCircle2, MapPin } from "lucide-react";

interface LocationPageProps {
  title: string;
  subtitle: string;
  paragraphs: string[];
  features: string[];
  showMap?: boolean;
}

export default function LocationPageTemplate({ title, subtitle, paragraphs, features, showMap }: LocationPageProps) {
  return (
    <main className="pt-24 pb-20 bg-background min-h-screen">
      <SchemaOrg />
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">
            {title}
          </h1>
          <p className="text-text-secondary text-lg">{subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-6 text-text-secondary text-lg leading-relaxed">
            {paragraphs.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
            
            <div className="mt-10 pt-10 border-t border-border">
              <h2 className="text-2xl font-bold text-white mb-6">Why Train With Us?</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-1" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12">
              <Link href="/services" className="btn-primary inline-block">
                View Membership Plans
              </Link>
            </div>
          </div>

          <div className="space-y-8">
            <div className="card p-6 border border-border">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <MapPin className="text-accent w-5 h-5" /> Visit Our Gym
              </h3>
              <p className="text-text-secondary mb-4">#123, Magadi Main Road, Anjananagar<br/>Bangalore, 560091</p>
              <div className="text-accent font-bold mb-6">+91 98765 43210</div>
              
              {showMap && (
                <div className="w-full h-48 rounded-button overflow-hidden mb-4">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m2!1s0x3bae3db65e2333b1%3A0xe54e60156d95394!2sAnjana%20Nagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={false} 
                    loading="lazy" 
                  ></iframe>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
