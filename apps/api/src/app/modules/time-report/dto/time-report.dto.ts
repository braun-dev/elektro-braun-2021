export class TimeReportDto {
  date: Date | string;
  totalHours: number | string;
  regularHours: number | string;
  bonusTime?: number | string;
  lessTime?: number | string;
  sickLeave?: number | string;
  holiday?: number | string;
  description?: string;
}
