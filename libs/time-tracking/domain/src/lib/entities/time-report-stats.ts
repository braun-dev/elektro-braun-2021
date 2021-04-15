import { TimeSpanQuery } from '@elektro-braun/time-tracking/domain';

export interface TimeReportStats {
  range: TimeSpanQuery;
  total: number;
  regular: number;
  overtime: number;
  lessTime: number;
  holiday: number;
  sickLeave: number;
  balance: number;
}
