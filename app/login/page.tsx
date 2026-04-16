import { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Member Login — Access Your Fitness Dashboard",
  description:
    "Login to your Kiran's Fitness Club member account to view your subscription status, billing cycle, and gym access details.",
  alternates: { canonical: "https://kiransfitnessclub.com/login" },
  robots: { index: false, follow: false }, // login page should not be indexed
};

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center section-padding pt-24 bg-background">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-white mb-2 uppercase">
          Member <span className="text-accent">Portal</span>
        </h1>
        <p className="text-text-secondary text-sm">Sign in to manage your fitness journey at Kiran&apos;s Fitness Club</p>
      </div>
      <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
