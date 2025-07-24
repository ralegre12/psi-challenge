import { Controller, Get } from "@nestjs/common";
import { AnalyticsService } from "../../../application/services/analytics.service";

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly svc: AnalyticsService) {}

  @Get()
  async analytics() {
    const { topTopic, topDay, topMode } = await this.svc.execute();
    return { topTopic, topDay, topMode };
  }
}
