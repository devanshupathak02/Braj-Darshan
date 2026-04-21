import { Temple, mathuraTemples } from "./data/temples";

export interface DayItinerary {
  day: number;
  date?: string;
  temples: TempleVisit[];
  totalDuration: number;
  notes: string[];
}

export interface TempleVisit {
  temple: Temple;
  suggestedArrival: string;
  suggestedDeparture: string;
  travelTimeToNext?: number;
}

export interface TripPlan {
  duration: number;
  city: string;
  itinerary: DayItinerary[];
  totalTemples: number;
  highlights: string[];
}

// Calculate distance between two coordinates (Haversine formula)
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Estimate travel time in minutes (assuming average speed of 20 km/h in city)
function estimateTravelTime(distance: number): number {
  return Math.ceil((distance / 20) * 60);
}

// Parse time string to minutes from midnight
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// Convert minutes to time string
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60) % 24;
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}`;
}

// Group temples by area for efficient routing
function groupTemplesByArea(temples: Temple[]): Map<string, Temple[]> {
  const groups = new Map<string, Temple[]>();
  
  // Simple grouping: Mathura center vs Vrindavan
  temples.forEach(temple => {
    const isVrindavan = temple.coordinates.lat > 27.55;
    const area = isVrindavan ? "vrindavan" : "mathura";
    
    if (!groups.has(area)) {
      groups.set(area, []);
    }
    groups.get(area)!.push(temple);
  });
  
  return groups;
}

// Optimize temple order within a day using nearest neighbor algorithm
function optimizeTempleOrder(temples: Temple[]): Temple[] {
  if (temples.length <= 1) return temples;
  
  const visited: Temple[] = [];
  const remaining = [...temples];
  
  // Start with highest priority temple
  remaining.sort((a, b) => b.priority - a.priority);
  visited.push(remaining.shift()!);
  
  while (remaining.length > 0) {
    const lastTemple = visited[visited.length - 1];
    let nearestIndex = 0;
    let minDistance = Infinity;
    
    remaining.forEach((temple, index) => {
      const distance = calculateDistance(
        lastTemple.coordinates.lat,
        lastTemple.coordinates.lng,
        temple.coordinates.lat,
        temple.coordinates.lng
      );
      // Weight distance by inverse of priority
      const weightedDistance = distance / (temple.priority * 0.5);
      if (weightedDistance < minDistance) {
        minDistance = weightedDistance;
        nearestIndex = index;
      }
    });
    
    visited.push(remaining.splice(nearestIndex, 1)[0]);
  }
  
  return visited;
}

// Create schedule for temples with timings
function createDaySchedule(temples: Temple[], startTime: number = 360): TempleVisit[] {
  const visits: TempleVisit[] = [];
  let currentTime = startTime; // Default start at 6:00 AM
  
  for (let i = 0; i < temples.length; i++) {
    const temple = temples[i];
    const openingMinutes = timeToMinutes(temple.openingTime);
    const closingMinutes = timeToMinutes(temple.closingTime);
    
    // Adjust arrival time if temple isn't open yet
    if (currentTime < openingMinutes) {
      currentTime = openingMinutes;
    }
    
    // Skip if we can't make it before closing
    if (currentTime + temple.visitDuration > closingMinutes && closingMinutes > openingMinutes) {
      continue;
    }
    
    const visit: TempleVisit = {
      temple,
      suggestedArrival: minutesToTime(currentTime),
      suggestedDeparture: minutesToTime(currentTime + temple.visitDuration),
    };
    
    // Calculate travel time to next temple
    if (i < temples.length - 1) {
      const nextTemple = temples[i + 1];
      const distance = calculateDistance(
        temple.coordinates.lat,
        temple.coordinates.lng,
        nextTemple.coordinates.lat,
        nextTemple.coordinates.lng
      );
      visit.travelTimeToNext = estimateTravelTime(distance);
      currentTime += temple.visitDuration + visit.travelTimeToNext;
    } else {
      currentTime += temple.visitDuration;
    }
    
    visits.push(visit);
  }
  
  return visits;
}

// Main function to generate trip plan
export function generateTripPlan(
  duration: number,
  selectedTempleIds?: string[]
): TripPlan {
  // Get temples to include
  let temples: Temple[];
  
  if (selectedTempleIds && selectedTempleIds.length > 0) {
    temples = mathuraTemples.filter(t => selectedTempleIds.includes(t.id));
  } else {
    // Select temples based on duration
    const sortedTemples = [...mathuraTemples].sort((a, b) => b.priority - a.priority);
    const maxTemples = Math.min(duration * 5, sortedTemples.length); // ~5 temples per day
    temples = sortedTemples.slice(0, maxTemples);
  }
  
  // Group temples by area
  const areaGroups = groupTemplesByArea(temples);
  
  // Create day-wise itinerary
  const itinerary: DayItinerary[] = [];
  const templesByDay: Temple[][] = Array.from({ length: duration }, () => []);
  
  // Distribute temples across days
  if (duration === 1) {
    // Single day: visit must-see temples only
    templesByDay[0] = temples.filter(t => t.priority >= 4).slice(0, 6);
  } else if (duration === 2) {
    // Day 1: Mathura temples
    // Day 2: Vrindavan temples
    const mathuraTemplesList = areaGroups.get("mathura") || [];
    const vrindavanTemples = areaGroups.get("vrindavan") || [];
    
    templesByDay[0] = mathuraTemplesList.slice(0, 5);
    templesByDay[1] = vrindavanTemples.slice(0, 6);
  } else {
    // 3+ days: distribute evenly with priority consideration
    const allTemples = [...temples].sort((a, b) => b.priority - a.priority);
    const templesPerDay = Math.ceil(allTemples.length / duration);
    
    for (let i = 0; i < allTemples.length; i++) {
      const dayIndex = Math.min(Math.floor(i / templesPerDay), duration - 1);
      templesByDay[dayIndex].push(allTemples[i]);
    }
  }
  
  // Optimize and create schedule for each day
  for (let day = 0; day < duration; day++) {
    const dayTemples = optimizeTempleOrder(templesByDay[day]);
    const visits = createDaySchedule(dayTemples);
    
    const totalDuration = visits.reduce(
      (sum, v) => sum + v.temple.visitDuration + (v.travelTimeToNext || 0),
      0
    );
    
    const notes: string[] = [];
    
    // Add contextual notes
    const hasEveningTemple = visits.some(v => 
      v.temple.bestTimeToVisit.toLowerCase().includes("evening")
    );
    if (hasEveningTemple) {
      notes.push("This day includes evening activities - plan accordingly");
    }
    
    const hasVrindavan = visits.some(v => v.temple.id.includes("vrindavan") || 
      v.temple.tags.includes("vrindavan"));
    if (hasVrindavan) {
      notes.push("Vrindavan temples are best visited in the morning");
    }
    
    itinerary.push({
      day: day + 1,
      temples: visits,
      totalDuration,
      notes,
    });
  }
  
  // Generate highlights
  const highlights: string[] = [];
  const mustVisit = temples.filter(t => t.priority === 5);
  if (mustVisit.length > 0) {
    highlights.push(`Includes ${mustVisit.length} must-visit temples`);
  }
  
  const hasLightShow = temples.some(t => t.tags.includes("light-show"));
  if (hasLightShow) {
    highlights.push("Evening light show at Prem Mandir");
  }
  
  const hasGhat = temples.some(t => t.tags.includes("ghat"));
  if (hasGhat) {
    highlights.push("Yamuna Aarti at Vishram Ghat");
  }
  
  return {
    duration,
    city: "Mathura",
    itinerary,
    totalTemples: itinerary.reduce((sum, day) => sum + day.temples.length, 0),
    highlights,
  };
}

// Get recommended temples for quick selection
export function getRecommendedTemples(duration: number): Temple[] {
  const sortedTemples = [...mathuraTemples].sort((a, b) => b.priority - a.priority);
  const count = Math.min(duration * 5, sortedTemples.length);
  return sortedTemples.slice(0, count);
}
