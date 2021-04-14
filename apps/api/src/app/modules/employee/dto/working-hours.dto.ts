export class WorkingHoursDto {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday?: number | undefined;
  sunday?: number | undefined;
}
