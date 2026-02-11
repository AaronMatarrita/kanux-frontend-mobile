import { httpClient } from "@/services/http";
import { TalentAnalyticsDashboard } from "@/types/analytics.types";

export interface TalentAnalyticsDashboardApiResponse {
  data: TalentAnalyticsDashboard;
}

class AnalyticsService {
  async getTalentDashboard(): Promise<TalentAnalyticsDashboard> {
    const res = await httpClient.get<TalentAnalyticsDashboardApiResponse>(
      "/analytics/talent/dashboard",
    );
    return res.data.data;
  }
}

export const analyticsService = new AnalyticsService();
