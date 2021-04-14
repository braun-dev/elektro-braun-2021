import { WorkingHours } from './working-hours';

export interface Employee {
  readonly id: string;
  name: string;
  age: number;
  holidaysPerYear: number;
  workingHours: WorkingHours;
  phone?: string;
  mail?: string;
  lastRecordedDate?: string;
  holidaysFirstYear?: number;
  joiningDate?: string | undefined;
}
