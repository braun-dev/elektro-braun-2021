import { WeeklyWorkingHours } from './weekly-working-hours';

export interface CreateEmployeePayload {
  personalInfo: {
    gender: 'm' | 'w',
    firstname: string;
    lastname: string;
    country: string;
    street?: string;
    houseNumber?: string;
    city?: string;
    zipCode?: string;
    mail: string | null;
    mail2?: string | null;
    phone?: string | null;
    phone2?: string | null;
    dateOfBirth?: string;
    documents?: never[];
  };
  companyInfo: {
    holidayCredit: number;
    holidayCreditFirstYear: number;
    availableHolidayCredit: number;
    joiningDate: string;
    job: string;
  };
  workingHours: WeeklyWorkingHours;
}
