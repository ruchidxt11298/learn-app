import type { ImageAsset } from "./common";

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: ImageAsset;
  bio?: string;
  social?: { linkedin?: string; twitter?: string; instagram?: string };
}

export interface Award {
  id: string;
  title: string;
  year: string;
  issuer: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
}

export interface CompanyStat {
  id: string;
  label: string;
  value: number;
  suffix?: string;
}
