"use client";

import { useRef } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroSection } from "@/components/hero-section";
import { TempleGrid } from "@/components/temple-grid";
import { TripPlanner } from "@/components/trip-planner";
import { FutureFeatures } from "@/components/future-features";

export default function Home() {
  const templesRef = useRef<HTMLDivElement>(null);
  const planRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection(templesRef)}
          onPlanTripClick={() => scrollToSection(planRef)}
        />

        {/* Trip Planner Section */}
        <section
          id="plan"
          ref={planRef}
          className="py-16 container mx-auto px-4"
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                Plan Your Pilgrimage
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Tell us how many days you have, and we&apos;ll create an optimized route 
                covering the most important temples. Customize it to match your preferences.
              </p>
            </div>
            <TripPlanner />
          </div>
        </section>

        {/* Temples Section */}
        <section
          id="temples"
          ref={templesRef}
          className="py-16 bg-muted/30"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">
                Explore All Temples
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Discover the sacred temples of Mathura and Vrindavan. View opening times, 
                learn about their history, and plan your visits accordingly.
              </p>
            </div>
            <TempleGrid />
          </div>
        </section>

        {/* Future Features Section */}
        <section id="features">
          <FutureFeatures />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
