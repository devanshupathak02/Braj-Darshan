"use client";

import Link from "next/link";
import { MapPin, Heart, Github, Twitter, Mail } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  explore: [
    { label: "All Temples", href: "#temples" },
    { label: "Plan Trip", href: "#plan" },
    { label: "Mathura Guide", href: "#" },
    { label: "Vrindavan", href: "#" },
  ],
  resources: [
    { label: "Temple Timings", href: "#temples" },
    { label: "How to Reach", href: "#" },
    { label: "Best Time to Visit", href: "#" },
    { label: "FAQs", href: "#" },
  ],
  upcoming: [
    { label: "Restaurants", href: "#features" },
    { label: "Local Guides", href: "#features" },
    { label: "Hotels", href: "#features" },
    { label: "More Cities", href: "#features" },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-lg">Mathura</span>
                <span className="text-muted-foreground text-lg">Yatra</span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Your spiritual companion for exploring the sacred temples of Mathura and 
              beyond. Plan, discover, and experience divine journeys.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming */}
          <div>
            <h3 className="font-semibold mb-4">Coming Soon</h3>
            <ul className="space-y-2">
              {footerLinks.upcoming.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2024 MathuraYatra. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="h-4 w-4 text-red-500 fill-red-500" /> for devotees
          </p>
        </div>
      </div>
    </footer>
  );
}
