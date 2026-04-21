"use client";

import { 
  Utensils, 
  Users, 
  Hotel, 
  ShoppingBag, 
  MapPinned, 
  Bell,
  ArrowRight 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FeaturePreview {
  icon: React.ReactNode;
  title: string;
  description: string;
  status: "coming-soon" | "planned" | "in-development";
}

const upcomingFeatures: FeaturePreview[] = [
  {
    icon: <Utensils className="h-6 w-6" />,
    title: "Restaurant Recommendations",
    description: "Discover authentic vegetarian restaurants and street food near temples. Get ratings, timings, and specialties.",
    status: "coming-soon",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Local Guide Booking",
    description: "Connect with verified local guides who can enhance your spiritual journey with deep knowledge and stories.",
    status: "planned",
  },
  {
    icon: <Hotel className="h-6 w-6" />,
    title: "Dharamshala & Hotel Finder",
    description: "Find affordable dharamshalas and hotels near temples with real-time availability and booking.",
    status: "planned",
  },
  {
    icon: <ShoppingBag className="h-6 w-6" />,
    title: "Prasad & Souvenirs",
    description: "Order authentic prasad and religious items from trusted shops near the temples.",
    status: "planned",
  },
  {
    icon: <MapPinned className="h-6 w-6" />,
    title: "More Pilgrimage Cities",
    description: "Expanding to Vrindavan, Dwarka, Puri, Varanasi, and other sacred cities across India.",
    status: "in-development",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Festival Alerts",
    description: "Get notified about upcoming festivals, special darshans, and events at your favorite temples.",
    status: "coming-soon",
  },
];

const statusColors = {
  "coming-soon": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
  "planned": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "in-development": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

const statusLabels = {
  "coming-soon": "Coming Soon",
  "planned": "Planned",
  "in-development": "In Development",
};

export function FutureFeatures() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4">Roadmap</Badge>
          <h2 className="text-3xl font-bold mb-4">
            What&apos;s Coming Next
          </h2>
          <p className="text-muted-foreground">
            We&apos;re building the ultimate pilgrimage companion. Here&apos;s a glimpse of 
            features we&apos;re working on to make your spiritual journey even better.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="relative overflow-hidden border-dashed hover:border-solid hover:shadow-md transition-all duration-200"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-muted/50 to-transparent" />
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    {feature.icon}
                  </div>
                  <Badge className={statusColors[feature.status]}>
                    {statusLabels[feature.status]}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Want to suggest a feature or stay updated on our progress?
          </p>
          <Button variant="outline" className="gap-2">
            Get Notified
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
