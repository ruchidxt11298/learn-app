import { useQuery } from "@tanstack/react-query";
import { getAwards, getCompanyStats, getTeamMembers, getTimeline } from "@/services/team.service";

export function useTeamMembers() {
  return useQuery({ queryKey: ["team"], queryFn: getTeamMembers, staleTime: Infinity });
}

export function useAwards() {
  return useQuery({ queryKey: ["awards"], queryFn: getAwards, staleTime: Infinity });
}

export function useTimeline() {
  return useQuery({ queryKey: ["timeline"], queryFn: getTimeline, staleTime: Infinity });
}

export function useCompanyStats() {
  return useQuery({ queryKey: ["company-stats"], queryFn: getCompanyStats, staleTime: Infinity });
}
