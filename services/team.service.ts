import { awardsMock, companyStatsMock, teamMock, timelineMock } from "@/data/team.mock";
import { simulateNetwork } from "@/lib/mockDelay";
import type { Award, CompanyStat, TeamMember, TimelineEvent } from "@/types";

export async function getTeamMembers(): Promise<TeamMember[]> {
  return simulateNetwork(teamMock);
}

export async function getAwards(): Promise<Award[]> {
  return simulateNetwork(awardsMock);
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  return simulateNetwork(timelineMock);
}

export async function getCompanyStats(): Promise<CompanyStat[]> {
  return simulateNetwork(companyStatsMock);
}
