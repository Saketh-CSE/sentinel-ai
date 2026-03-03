import { Severity } from "./types";

export interface DisasterData {
  id: string;
  type: string;
  location: string;
  severity: Severity;
  description: string;
  safetyInstructions: string[];
  lastUpdated: string;
  lat: number;
  lng: number;
}

export interface AuthorityData {
  id: string;
  name: string;
  role: "Doctor" | "Police" | "Fire" | "Rescue" | "Volunteer";
  availability: "Available" | "Busy";
  distance: string;
  contact: string;
}

export const mockDisasters: DisasterData[] = [
  {
    id: "1",
    type: "Flood",
    location: "Mumbai, Maharashtra",
    severity: "critical",
    description: "Severe flooding reported in low-lying areas due to heavy monsoon rains. Water levels rising rapidly.",
    safetyInstructions: ["Move to higher ground immediately", "Avoid walking through floodwaters", "Keep emergency kit ready", "Follow evacuation orders"],
    lastUpdated: "2 minutes ago",
    lat: 19.076,
    lng: 72.8777,
  },
  {
    id: "2",
    type: "Earthquake",
    location: "Delhi NCR",
    severity: "warning",
    description: "Moderate tremors felt across the region. Buildings inspected for structural damage.",
    safetyInstructions: ["Drop, cover, and hold on", "Stay away from windows", "Check for gas leaks", "Be prepared for aftershocks"],
    lastUpdated: "15 minutes ago",
    lat: 28.6139,
    lng: 77.209,
  },
  {
    id: "3",
    type: "Cyclone",
    location: "Chennai, Tamil Nadu",
    severity: "warning",
    description: "Cyclone approaching coast. Expected landfall in 12 hours with winds up to 120 km/h.",
    safetyInstructions: ["Secure loose objects outdoors", "Stock up on essentials", "Stay indoors during the storm", "Keep devices charged"],
    lastUpdated: "30 minutes ago",
    lat: 13.0827,
    lng: 80.2707,
  },
  {
    id: "4",
    type: "Wildfire",
    location: "Uttarakhand",
    severity: "critical",
    description: "Forest fire spreading rapidly across northern ridge. Multiple villages evacuated.",
    safetyInstructions: ["Evacuate if ordered", "Close all windows and doors", "Wear N95 masks outdoors", "Keep vehicle fueled for evacuation"],
    lastUpdated: "5 minutes ago",
    lat: 30.0668,
    lng: 79.0193,
  },
  {
    id: "5",
    type: "Landslide",
    location: "Shimla, Himachal Pradesh",
    severity: "normal",
    description: "Minor landslide reported on national highway. Road clearing operations underway.",
    safetyInstructions: ["Avoid the affected route", "Use alternate roads", "Report any cracks in nearby structures"],
    lastUpdated: "1 hour ago",
    lat: 31.1048,
    lng: 77.1734,
  },
];

export const mockAuthorities: AuthorityData[] = [
  { id: "1", name: "Dr. Priya Sharma", role: "Doctor", availability: "Available", distance: "1.2 km", contact: "+91-9876543210" },
  { id: "2", name: "Inspector Raj Kumar", role: "Police", availability: "Available", distance: "0.8 km", contact: "+91-9876543211" },
  { id: "3", name: "Capt. Anil Verma", role: "Fire", availability: "Busy", distance: "2.1 km", contact: "+91-9876543212" },
  { id: "4", name: "Sgt. Meera Patel", role: "Rescue", availability: "Available", distance: "1.5 km", contact: "+91-9876543213" },
  { id: "5", name: "Vikram Singh", role: "Volunteer", availability: "Available", distance: "0.5 km", contact: "+91-9876543214" },
];
