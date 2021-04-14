import { WorkingHoursDto } from './working-hours.dto';

export class CreateEmployeeDto {
  readonly name: string;
  readonly holidayCredit: number;
  readonly holidayCreditFirstYear: number;
  readonly workingHours: WorkingHoursDto;
  readonly age?: number | undefined;
  readonly phone?: string | undefined;
  readonly mail?: string | undefined;
  readonly joiningDate?: string | undefined;
  readonly availableHolidayCredit?: number | undefined;
}
