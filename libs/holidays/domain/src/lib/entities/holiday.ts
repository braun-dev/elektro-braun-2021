export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: string;
  global: boolean;
  counties: string[] | null;
  launchYear: number;
  type: string;
}
