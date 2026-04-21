"use client";

import { useState, useEffect } from "react";
import {
  Calendar,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  RotateCcw,
  Download,
  Share2,
} from "lucide-react";
import { Temple, mathuraTemples } from "@/lib/data/temples";
import { generateTripPlan, TripPlan } from "@/lib/route-planner";
import { TempleCard } from "./temple-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TripPlannerProps {
  onPlanGenerated?: (plan: TripPlan) => void;
}

export function TripPlanner({ onPlanGenerated }: TripPlannerProps) {
  const [duration, setDuration] = useState<number>(2);
  const [selectedTemples, setSelectedTemples] = useState<string[]>([]);
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null);
  const [activeTab, setActiveTab] = useState("recommended");
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate plan when duration or selected temples change
  useEffect(() => {
    const generatePlan = async () => {
      setIsGenerating(true);
      // Simulate processing for better UX
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      const plan = generateTripPlan(
        duration,
        activeTab === "custom" && selectedTemples.length > 0
          ? selectedTemples
          : undefined
      );
      setTripPlan(plan);
      onPlanGenerated?.(plan);
      setIsGenerating(false);
    };

    generatePlan();
  }, [duration, selectedTemples, activeTab, onPlanGenerated]);

  const handleTempleSelect = (temple: Temple) => {
    setSelectedTemples((prev) =>
      prev.includes(temple.id)
        ? prev.filter((id) => id !== temple.id)
        : [...prev, temple.id]
    );
  };

  const resetSelection = () => {
    setSelectedTemples([]);
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  return (
    <div className="space-y-6">
      {/* Trip Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Plan Your Trip
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Trip Duration</label>
              <Select
                value={duration.toString()}
                onValueChange={(v) => setDuration(parseInt(v))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Day - Quick Visit</SelectItem>
                  <SelectItem value="2">2 Days - Weekend Trip</SelectItem>
                  <SelectItem value="3">3 Days - Complete Experience</SelectItem>
                  <SelectItem value="5">5 Days - Deep Exploration</SelectItem>
                  <SelectItem value="7">7 Days - Full Pilgrimage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 space-y-2">
              <label className="text-sm font-medium">Planning Mode</label>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="recommended">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Recommended
                  </TabsTrigger>
                  <TabsTrigger value="custom">
                    <MapPin className="h-4 w-4 mr-2" />
                    Custom
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Custom Selection */}
          {activeTab === "custom" && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Select temples you want to visit ({selectedTemples.length} selected)
                </p>
                {selectedTemples.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetSelection}
                    className="h-8"
                  >
                    <RotateCcw className="h-4 w-4 mr-1" />
                    Reset
                  </Button>
                )}
              </div>
              <ScrollArea className="h-[280px] pr-4">
                <div className="grid gap-2">
                  {mathuraTemples.map((temple) => (
                    <TempleCard
                      key={temple.id}
                      temple={temple}
                      variant="compact"
                      isSelected={selectedTemples.includes(temple.id)}
                      onSelect={handleTempleSelect}
                      showSelectButton
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Itinerary */}
      {tripPlan && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Your {tripPlan.duration}-Day Itinerary
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-1" />
                  Save
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-1" />
                  Share
                </Button>
              </div>
            </div>
            {tripPlan.highlights.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tripPlan.highlights.map((highlight, i) => (
                  <Badge key={i} variant="secondary">
                    {highlight}
                  </Badge>
                ))}
              </div>
            )}
          </CardHeader>
          <CardContent>
            <div
              className={cn(
                "space-y-6 transition-opacity duration-300",
                isGenerating && "opacity-50"
              )}
            >
              {tripPlan.itinerary.map((day) => (
                <div key={day.day} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      {day.day}
                    </div>
                    <div>
                      <h3 className="font-semibold">Day {day.day}</h3>
                      <p className="text-sm text-muted-foreground">
                        {day.temples.length} temples •{" "}
                        {Math.round(day.totalDuration / 60)} hours estimated
                      </p>
                    </div>
                  </div>

                  <div className="ml-5 border-l-2 border-muted pl-8 space-y-4">
                    {day.temples.map((visit, idx) => (
                      <div key={visit.temple.id} className="relative">
                        <div className="absolute -left-[41px] top-2 h-4 w-4 rounded-full bg-background border-2 border-primary" />
                        
                        <div className="rounded-lg border bg-card p-4 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-medium">{visit.temple.name}</h4>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                <Clock className="h-3.5 w-3.5" />
                                <span>
                                  {formatTime(visit.suggestedArrival)} -{" "}
                                  {formatTime(visit.suggestedDeparture)}
                                </span>
                              </div>
                            </div>
                            {visit.temple.priority >= 4 && (
                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                Must Visit
                              </Badge>
                            )}
                          </div>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {visit.temple.description}
                          </p>

                          {visit.temple.bestTimeToVisit && (
                            <p className="text-xs text-primary">
                              💡 {visit.temple.bestTimeToVisit}
                            </p>
                          )}
                        </div>

                        {visit.travelTimeToNext && idx < day.temples.length - 1 && (
                          <div className="flex items-center gap-2 my-2 ml-2 text-xs text-muted-foreground">
                            <ChevronRight className="h-3 w-3" />
                            <span>~{visit.travelTimeToNext} min travel to next temple</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {day.notes.length > 0 && (
                    <div className="ml-5 pl-8 space-y-1">
                      {day.notes.map((note, i) => (
                        <p key={i} className="text-sm text-muted-foreground italic">
                          📝 {note}
                        </p>
                      ))}
                    </div>
                  )}

                  {day.day < tripPlan.itinerary.length && (
                    <Separator className="ml-5" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
