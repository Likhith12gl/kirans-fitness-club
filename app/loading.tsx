export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background">
      <div className="relative animate-pulse flex flex-col items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/logo.png" 
          alt="Loading Kiran's Fitness Club..." 
          className="w-32 h-32 object-contain mb-8 origin-center animate-bounce"
        />
        <div className="w-48 h-1 bg-surface rounded-full overflow-hidden">
          <div className="w-full h-full bg-accent origin-left animate-[scale-x_1s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
}
