export class TimeReportDto {
  date: Date | string;
  totalHours: number;
  regularHours: number;
  bonusTime?: number;
  lessTime?: number;
  sickLeave?: number;
  holiday?: number;
  description?: string;
}
