"use client";

import { Card, CardContent } from "@/components/ui/card";
import "./loading-animation.css"; // External CSS for keyframes

const LoadingAnimation: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-3xl shadow-xl border border-border rounded-2xl bg-muted p-6">
        <CardContent className="flex items-center justify-center">
          <svg
            viewBox="0 0 600 100"
            className="w-full max-w-4xl h-auto"
            fill="none"
            stroke="hsl(var(--foreground))"
            strokeWidth="3"
          >
            <path d="M50 30 L50 80 L80 80" className="animated-path delay-0" />
            <path d="M110 55 Q110 80, 135 80 Q160 80, 160 55 Q160 30, 135 30 Q110 30, 110 55 Z" className="animated-path delay-1" />
            <path d="M190 80 Q170 80, 170 55 Q170 30, 190 30 Q210 30, 210 55 L210 80 L190 80 Z" className="animated-path delay-2" />
            <path d="M240 80 L240 30 L260 30 Q280 30, 280 55 Q280 80, 260 80 Z" className="animated-path delay-3" />
            <path d="M310 80 L310 30" className="animated-path delay-4" />
            <path d="M330 80 L330 30 L350 30 Q370 30, 370 55 L370 80" className="animated-path delay-5" />
            <path d="M400 55 Q400 30, 380 30 Q360 30, 360 55 Q360 80, 380 80 Q400 80, 400 55 Z M400 80 L400 90 L380 90" className="animated-path delay-6" />
            <path d="M430 80 L430 70" className="animated-path delay-7" />
            <path d="M450 80 L450 70" className="animated-path delay-8" />
            <path d="M470 80 L470 70" className="animated-path delay-9" />
          </svg>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoadingAnimation;
