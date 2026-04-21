"use client";

import { Clock, MapPin, Star, Info, Check } from "lucide-react";
import { Temple } from "@/lib/data/temples";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface TempleCardProps {
  temple: Temple;
  isSelected?: boolean;
  onSelect?: (temple: Temple) => void;
  showSelectButton?: boolean;
  variant?: "default" | "compact";
}

export function TempleCard({
  temple,
  isSelected = false,
  onSelect,
  showSelectButton = false,
  variant = "default",
}: TempleCardProps) {
  const priorityStars = Array.from({ length: 5 }, (_, i) => i < temple.priority);

  const isOpen = () => {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const [openHour, openMin] = temple.openingTime.split(":").map(Number);
    const [closeHour, closeMin] = temple.closingTime.split(":").map(Number);
    const openTime = openHour * 60 + openMin;
    const closeTime = closeHour * 60 + closeMin;
    return currentTime >= openTime && currentTime <= closeTime;
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  if (variant === "compact") {
    return (
      <Card
        className={cn(
          "transition-all duration-200 cursor-pointer hover:shadow-md",
          isSelected && "ring-2 ring-primary bg-primary/5"
        )}
        onClick={() => onSelect?.(temple)}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm truncate">{temple.name}</h3>
                {temple.priority === 5 && (
                  <Badge variant="secondary" className="text-xs shrink-0">
                    Must Visit
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {formatTime(temple.openingTime)} - {formatTime(temple.closingTime)}
                </span>
                <span>{temple.visitDuration} min</span>
              </div>
            </div>
            {showSelectButton && (
              <div
                className={cn(
                  "h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  isSelected
                    ? "bg-primary border-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={cn(
        "overflow-hidden transition-all duration-200 hover:shadow-lg",
        isSelected && "ring-2 ring-primary"
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg leading-tight">{temple.name}</h3>
            <div className="flex items-center gap-1">
              {priorityStars.map((filled, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    filled
                      ? "fill-amber-400 text-amber-400"
                      : "fill-muted text-muted"
                  )}
                />
              ))}
            </div>
          </div>
          <Badge
            variant={isOpen() ? "default" : "secondary"}
            className={cn(
              "shrink-0",
              isOpen() ? "bg-emerald-500 hover:bg-emerald-600" : ""
            )}
          >
            {isOpen() ? "Open Now" : "Closed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {temple.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>
              {formatTime(temple.openingTime)} - {formatTime(temple.closingTime)}
            </span>
            <span className="text-muted-foreground">
              ({temple.visitDuration} min visit)
            </span>
          </div>

          {temple.entryFee && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>Entry: {temple.entryFee}</span>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {temple.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <Info className="h-4 w-4 mr-1" />
                  Best Time
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-[200px] text-sm">{temple.bestTimeToVisit}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {showSelectButton && (
            <Button
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onSelect?.(temple)}
              className="h-8"
            >
              {isSelected ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  Selected
                </>
              ) : (
                "Add to Trip"
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
