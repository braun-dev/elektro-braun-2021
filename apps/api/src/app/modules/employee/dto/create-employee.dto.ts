import { WorkingHoursDto } from './working-hours.dto';

export class CreateEmployeeDto {
  readonly personalInfo: {
    readonly gender: 'm' | 'w',
    readonly firstname: string;
    readonly lastname: string;
    readonly country: string;
    readonly street?: string;
    readonly houseNumber?: string;
    readonly city?: string;
    readonly zipCode?: number;
    readonly mail: string | null;
    readonly mail2?: string | null;
    readonly phone?: string | null;
    readonly phone2?: string | null;
    readonly dateOfBirth?: string;
    readonly documents?: never[];
  };
  readonly companyInfo: {
    readonly holidayCredit: number;
    readonly holidayCreditFirstYear: number;
    readonly availableHolidayCredit: number;
    readonly joiningDate: string;
    readonly job: string;
  };
  readonly workingHours: WorkingHoursDto;
}
