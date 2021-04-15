export interface TimeReport {
  readonly id: string;
  employeeId: string;
  date: string;
  totalHours: number;
  regularHours: number;
  bonusTime?: number;
  lessTime?: number;
  sickLeave?: number;
  holiday?: number;
  description?: string;
}
