"use client";

import { useQuery } from "@tanstack/react-query";

import {
  dashboardOverviewInitialData,
  fetchDashboardOverview,
} from "@/services/dashboard-overview-service";

export function useDashboardOverviewQuery() {
  return useQuery({
    queryKey: ["dashboard-overview"],
    queryFn: fetchDashboardOverview,
    initialData: dashboardOverviewInitialData,
  });
}