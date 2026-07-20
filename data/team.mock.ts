import type { TeamMember, Award, TimelineEvent, CompanyStat } from "@/types";
import { avatar } from "./_helpers";

export const teamMock: TeamMember[] = [
  {
    id: "team-1",
    name: "Roshan Pawar",
    role: "Founder",
    photo: avatar("roshan", "Roshan Pawar"),
    bio: "Leads Roshi Journeys' Char Dham Yatra operations and pan-India tour planning from our base on the Uttarakhand border.",
    social: {},
  },
  {
    id: "team-2",
    name: "Aashi Luniya",
    role: "Co-Founder & Operations",
    photo: avatar("aashi", "Aashi Luniya"),
    bio: "Coordinates bookings, itineraries and on-ground support for travelers across every Roshi Journeys tour.",
    social: {},
  },
];

export const awardsMock: Award[] = [];

export const timelineMock: TimelineEvent[] = [
  { id: "tl-1", year: "Today", title: "Char Dham & All-India Tours", description: "Roshi Journeys plans and operates the Char Dham Yatra alongside tours across Himachal, Kashmir, Rajasthan, Madhya Pradesh, Assam, Odisha and Rameshwaram." },
];

export const companyStatsMock: CompanyStat[] = [
  { id: "stat-1", label: "Destinations Covered", value: 8 },
  { id: "stat-2", label: "Tour Packages", value: 8 },
];
