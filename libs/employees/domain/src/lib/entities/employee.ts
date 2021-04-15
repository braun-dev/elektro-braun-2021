import { WorkingHours } from '@elektro-braun/shared/util-data';

export interface Employee {
  readonly id: string;
  gender: 'm' | 'w',
  name: string;
  firstname: string;
  lastname: string;
  job: string;
  holidaysPerYear: number;
  country: string;
  workingHours: WorkingHours;
  age?: number;
  phone?: string;
  mail?: string;
  department?: string;
  employmentDate?: string;
  lastRecordedDate?: {
    date: string;
  };
  holidaysFirstYear?: number;
  street?: string;
  houseNumber?: string;
  city?: string;
  zipCode?: string;
  mail2?: string | null;
  phone2?: string | null;
  dateOfBirth?: string;
  documents?: never[];
}
