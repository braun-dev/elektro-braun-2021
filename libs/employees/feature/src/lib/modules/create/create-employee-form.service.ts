import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateEmployeePayload, WeeklyWorkingHours } from '@elektro-braun/employees/domain';

// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export interface CreateEmployeeFormValue {
  personalInfo: {
    name: string;
    age: number;
    mail: string | null;
    phone: string | null;
    documents: never[];
  };
  companyInfo: {
    holidayCredit: number;
    holidayCreditFirstYear: number;
    availableHolidayCredit: number;
    joiningDate: string;
  };
  workingHours: WeeklyWorkingHours;
}

@Injectable({ providedIn: 'root' })
export class CreateEmployeeFormService {

  readonly form = this.createForm();

  constructor(private fb: FormBuilder) {}

  /** @returns Form-Model, das die persönlichen Daten eines Mitarbeiters abbildet */
  get personalInfoGroup(): FormGroup {
    return this.form.controls['personalInfo'] as FormGroup;
  }

  /** @returns Ob das Form-Model (persönliche Daten) bereits fokussiert und verändert wurde */
  get touchedPersonalInfoControls(): boolean {
    const { touched, dirty } = this.personalInfoGroup;
    return touched && dirty;
  }

  /** @returns Form-Model, das die firmenrelevanten Daten eines Mitarbeiters abbildet */
  get companyInfoGroup(): FormGroup {
    return this.form.controls['companyInfo'] as FormGroup;
  }

  /** @returns Ob das Form-Model (persönliche Daten) bereits fokussiert und verändert wurde */
  get touchedCompanyInfoControls(): boolean {
    const { touched, dirty } = this.companyInfoGroup;
    return touched && dirty;
  }

  /** @returns Form-Model, das die firmenrelevanten Daten eines Mitarbeiters abbildet */
  get workingHoursGroup(): FormGroup {
    return this.form.controls['workingHours'] as FormGroup;
  }

  /** @returns Ob das Form-Model (persönliche Daten) bereits fokussiert und verändert wurde */
  get touchedWorkingHoursControls(): boolean {
    const { touched, dirty } = this.workingHoursGroup;
    return touched && dirty;
  }

  /** @returns Form-Model, das die firmenrelevanten Daten eines Mitarbeiters abbildet */
  get formValue(): CreateEmployeePayload {
    const { personalInfo, companyInfo, workingHours }: CreateEmployeeFormValue = this.form.value;
    return {
      ...personalInfo,
      ...companyInfo,
      workingHours
    }
  }

  /**
   * Erstellt ein neues Form-Model zum anlegen eines Mitarbeiters
   * Standartwerte und Validierung sind bereits gesetzt
   * @returns Form-Model zum Anlegen eines Mitarbeiters
   */
  private createForm(): FormGroup {
    return this.fb.group({
      personalInfo: this.createPersonalInfoFormGroup(),
      companyInfo: this.createCompanyInfoFormGroup(),
      workingHours: this.createWorkingHoursFormGroup(),
    })
  }

  /**
   * Erstellt ein neues Form-Model (Sub-Model), das
   * die Standartarbeitszeiten pro Woche für einen Mitarbeiter abbildet
   * Standartwerte und Validierung sind bereits gesetzt
   * @returns Form-Model zum Erfassen der Standartarbeitszeiten eines Mitarbeiters
   */
  private createWorkingHoursFormGroup(): FormGroup {
    return this.fb.group({
      monday: [0, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      tuesday: [0, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      wednesday: [0, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      thursday: [0, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      friday: [0, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      saturday: [0, Validators.compose([Validators.min(0), Validators.max(24)])],
      sunday: [0, Validators.compose([Validators.min(0), Validators.max(24)])],
    })
  }

  /**
   * Erstellt ein neues Form-Model (Sub-Model), das
   * die persönlichen Daten eines Mitarbeiters abbildet
   * Standartwerte und Validierung sind bereits gesetzt
   * @returns Form-Model zum Erfassen von mitarbeiterbezogenen Daten
   */
  private createPersonalInfoFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: [null, Validators.compose([Validators.min(0), Validators.max(99)])],
      mail: [null, Validators.compose([Validators.pattern(EMAIL_REGEX)])],
      phone: [null],
      documents: this.fb.array([])
    })
  }

  /**
   * Erstellt ein neues Form-Model (Sub-Model), das
   * die firmenrelevanten Daten eines Mitarbeiters abbildet
   * Standartwerte und Validierung sind bereits gesetzt
   * @returns Form-Model zum Erfassen von Firmeninformationen
   */
  private createCompanyInfoFormGroup(): FormGroup {
    return this.fb.group({
      holidayCredit: [null, Validators.required],
      holidayCreditFirstYear: [null, Validators.required],
      availableHolidayCredit: [null],
      joiningDate: [null],
    })
  }
}
