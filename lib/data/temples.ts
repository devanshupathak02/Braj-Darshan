// Scalable data structure for temples - can be extended to other cities
export interface Temple {
  id: string;
  name: string;
  city: string;
  description: string;
  openingTime: string;
  closingTime: string;
  visitDuration: number; // in minutes
  priority: number; // 1-5, higher = more important
  coordinates: {
    lat: number;
    lng: number;
  };
  images: string[];
  tags: string[];
  bestTimeToVisit: string;
  dressCode?: string;
  entryFee?: string;
}

export interface City {
  id: string;
  name: string;
  state: string;
  description: string;
  image: string;
}

export const cities: City[] = [
  {
    id: "mathura",
    name: "Mathura",
    state: "Uttar Pradesh",
    description: "The birthplace of Lord Krishna, one of the seven sacred cities in Hinduism",
    image: "/mathura-city.jpg"
  }
];

export const mathuraTemples: Temple[] = [
  {
    id: "shri-krishna-janmabhoomi",
    name: "Shri Krishna Janmabhoomi",
    city: "mathura",
    description: "The most sacred temple marking the exact birthplace of Lord Krishna. The prison cell where Krishna was born is preserved here.",
    openingTime: "05:00",
    closingTime: "12:00",
    visitDuration: 90,
    priority: 5,
    coordinates: { lat: 27.5046, lng: 77.6838 },
    images: ["/temples/janmabhoomi.jpg"],
    tags: ["must-visit", "historic", "spiritual"],
    bestTimeToVisit: "Early morning for peaceful darshan",
    dressCode: "Modest clothing, no leather items",
    entryFee: "Free"
  },
  {
    id: "dwarkadhish-temple",
    name: "Dwarkadhish Temple",
    city: "mathura",
    description: "A magnificent temple dedicated to Lord Krishna as the King of Dwarka. Known for its intricate carvings and festive celebrations.",
    openingTime: "06:30",
    closingTime: "12:30",
    visitDuration: 60,
    priority: 5,
    coordinates: { lat: 27.5063, lng: 77.6821 },
    images: ["/temples/dwarkadhish.jpg"],
    tags: ["must-visit", "architecture", "festivals"],
    bestTimeToVisit: "During Holi and Janmashtami",
    entryFee: "Free"
  },
  {
    id: "banke-bihari-vrindavan",
    name: "Banke Bihari Temple",
    city: "mathura",
    description: "One of the most revered temples in Vrindavan, famous for the unique darshan style where curtains are drawn every few minutes.",
    openingTime: "07:45",
    closingTime: "12:00",
    visitDuration: 45,
    priority: 5,
    coordinates: { lat: 27.5827, lng: 77.6962 },
    images: ["/temples/banke-bihari.jpg"],
    tags: ["must-visit", "vrindavan", "unique-darshan"],
    bestTimeToVisit: "Morning hours",
    entryFee: "Free"
  },
  {
    id: "prem-mandir",
    name: "Prem Mandir",
    city: "mathura",
    description: "A stunning white marble temple depicting the divine pastimes of Radha-Krishna. Famous for its evening light show.",
    openingTime: "05:30",
    closingTime: "20:30",
    visitDuration: 90,
    priority: 5,
    coordinates: { lat: 27.5538, lng: 77.6674 },
    images: ["/temples/prem-mandir.jpg"],
    tags: ["must-visit", "architecture", "light-show", "evening"],
    bestTimeToVisit: "Evening for the light show (7:00-7:30 PM)",
    entryFee: "Free"
  },
  {
    id: "iskcon-vrindavan",
    name: "ISKCON Vrindavan",
    city: "mathura",
    description: "The Krishna-Balaram Mandir, a beautiful temple known for its serene atmosphere and prasadam.",
    openingTime: "04:30",
    closingTime: "13:00",
    visitDuration: 60,
    priority: 4,
    coordinates: { lat: 27.5833, lng: 77.6953 },
    images: ["/temples/iskcon.jpg"],
    tags: ["peaceful", "prasadam", "international"],
    bestTimeToVisit: "Morning aarti at 4:30 AM",
    entryFee: "Free"
  },
  {
    id: "radha-vallabh-temple",
    name: "Radha Vallabh Temple",
    city: "mathura",
    description: "One of the oldest temples in Vrindavan, dedicated to Radha-Krishna. Known for its ancient deity and spiritual ambiance.",
    openingTime: "06:00",
    closingTime: "12:00",
    visitDuration: 45,
    priority: 4,
    coordinates: { lat: 27.5792, lng: 77.6981 },
    images: ["/temples/radha-vallabh.jpg"],
    tags: ["ancient", "spiritual", "vrindavan"],
    bestTimeToVisit: "Morning",
    entryFee: "Free"
  },
  {
    id: "govind-dev-temple",
    name: "Govind Dev Temple",
    city: "mathura",
    description: "Built by Raja Man Singh in 1590, this red sandstone temple showcases beautiful Mughal architecture.",
    openingTime: "05:00",
    closingTime: "12:00",
    visitDuration: 45,
    priority: 4,
    coordinates: { lat: 27.5847, lng: 77.6929 },
    images: ["/temples/govind-dev.jpg"],
    tags: ["historic", "architecture", "vrindavan"],
    bestTimeToVisit: "Morning",
    entryFee: "Free"
  },
  {
    id: "nidhivan",
    name: "Nidhivan",
    city: "mathura",
    description: "A sacred grove where Lord Krishna is believed to perform Raas Leela every night. The trees here bend towards the ground.",
    openingTime: "06:00",
    closingTime: "18:00",
    visitDuration: 40,
    priority: 4,
    coordinates: { lat: 27.5803, lng: 77.6997 },
    images: ["/temples/nidhivan.jpg"],
    tags: ["mysterious", "sacred-grove", "vrindavan"],
    bestTimeToVisit: "Evening before sunset",
    entryFee: "₹10"
  },
  {
    id: "radha-raman-temple",
    name: "Radha Raman Temple",
    city: "mathura",
    description: "Home to a self-manifested deity of Krishna, one of the most important temples for Gaudiya Vaishnavas.",
    openingTime: "05:00",
    closingTime: "12:00",
    visitDuration: 40,
    priority: 4,
    coordinates: { lat: 27.5817, lng: 77.6975 },
    images: ["/temples/radha-raman.jpg"],
    tags: ["ancient", "self-manifested-deity", "vrindavan"],
    bestTimeToVisit: "Morning",
    entryFee: "Free"
  },
  {
    id: "keshav-dev-temple",
    name: "Keshav Dev Temple",
    city: "mathura",
    description: "Located within the Krishna Janmabhoomi complex, this temple has significant historical importance.",
    openingTime: "05:00",
    closingTime: "12:00",
    visitDuration: 30,
    priority: 3,
    coordinates: { lat: 27.5044, lng: 77.6840 },
    images: ["/temples/keshav-dev.jpg"],
    tags: ["historic", "janmabhoomi-complex"],
    bestTimeToVisit: "Morning with Janmabhoomi visit",
    entryFee: "Free"
  },
  {
    id: "rangji-temple",
    name: "Rangji Temple",
    city: "mathura",
    description: "A unique temple combining Dravidian, Rajput and Mughal architectural styles with a 50-foot tall gopuram.",
    openingTime: "06:00",
    closingTime: "12:00",
    visitDuration: 45,
    priority: 3,
    coordinates: { lat: 27.5789, lng: 77.6919 },
    images: ["/temples/rangji.jpg"],
    tags: ["architecture", "south-indian-style", "vrindavan"],
    bestTimeToVisit: "Morning",
    entryFee: "Free"
  },
  {
    id: "madan-mohan-temple",
    name: "Madan Mohan Temple",
    city: "mathura",
    description: "One of the oldest temples in Vrindavan, perched on a hill near the Yamuna. Offers panoramic views.",
    openingTime: "05:30",
    closingTime: "12:00",
    visitDuration: 40,
    priority: 3,
    coordinates: { lat: 27.5861, lng: 77.7019 },
    images: ["/temples/madan-mohan.jpg"],
    tags: ["ancient", "hilltop", "yamuna-view", "vrindavan"],
    bestTimeToVisit: "Early morning for sunrise",
    entryFee: "Free"
  },
  {
    id: "gita-mandir",
    name: "Gita Mandir",
    city: "mathura",
    description: "A temple with the entire Bhagavad Gita inscribed on its pillars. Beautiful architecture and peaceful gardens.",
    openingTime: "06:00",
    closingTime: "19:00",
    visitDuration: 45,
    priority: 3,
    coordinates: { lat: 27.4933, lng: 77.6719 },
    images: ["/temples/gita-mandir.jpg"],
    tags: ["gita", "architecture", "gardens"],
    bestTimeToVisit: "Anytime during day",
    entryFee: "Free"
  },
  {
    id: "vishram-ghat",
    name: "Vishram Ghat",
    city: "mathura",
    description: "The main ghat where Lord Krishna rested after killing Kansa. Evening aarti here is spectacular.",
    openingTime: "05:00",
    closingTime: "21:00",
    visitDuration: 60,
    priority: 4,
    coordinates: { lat: 27.5031, lng: 77.6856 },
    images: ["/temples/vishram-ghat.jpg"],
    tags: ["ghat", "evening-aarti", "yamuna"],
    bestTimeToVisit: "Evening for Yamuna Aarti (7:00 PM)",
    entryFee: "Free"
  },
  {
    id: "akshaya-patra-temple",
    name: "Akshaya Patra Temple",
    city: "mathura",
    description: "A modern temple complex with beautiful gardens and the largest mid-day meal kitchen serving schools.",
    openingTime: "08:00",
    closingTime: "18:00",
    visitDuration: 45,
    priority: 2,
    coordinates: { lat: 27.5695, lng: 77.6612 },
    images: ["/temples/akshaya-patra.jpg"],
    tags: ["modern", "charity", "gardens"],
    bestTimeToVisit: "Afternoon",
    entryFee: "Free"
  }
];

// Helper function to get temples by city
export function getTemplesByCity(cityId: string): Temple[] {
  return mathuraTemples.filter(temple => temple.city === cityId);
}

// Helper function to get temple by ID
export function getTempleById(id: string): Temple | undefined {
  return mathuraTemples.find(temple => temple.id === id);
}

// Get high priority temples
export function getMustVisitTemples(cityId: string): Temple[] {
  return getTemplesByCity(cityId).filter(temple => temple.priority >= 4);
}
