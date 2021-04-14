export interface TimeReport {
  id: string;
  date: string;
  totalHours: number;
  regularHours: number;
  bonusTime?: number;
  lessTime?: number;
  sickLeave?: number;
  holiday?: number;
  description?: string;
}
