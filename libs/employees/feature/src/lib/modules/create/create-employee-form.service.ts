import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEmployeePayload, WeeklyWorkingHours } from '@elektro-braun/employees/domain';

// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export interface CreateEmployeeFormValue {
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

@Injectable()
export class CreateEmployeeFormService {

  private _form = this.createForm();

  constructor(private fb: FormBuilder) {}

  /** @returns Form-Model, das die persönlichen Daten eines Mitarbeiters abbildet */
  get personalInfoGroup(): FormGroup {
    return this._form.controls['personalInfo'] as FormGroup;
  }

  /** @returns Ob das Form-Model (persönliche Daten) bereits fokussiert und verändert wurde */
  get touchedPersonalInfoControls(): boolean {
    const { touched, dirty } = this.personalInfoGroup;
    return touched && dirty;
  }

  /** @returns Form-Model, das die firmenrelevanten Daten eines Mitarbeiters abbildet */
  get companyInfoGroup(): FormGroup {
    return this._form.controls['companyInfo'] as FormGroup;
  }

  /** @returns Ob das Form-Model (persönliche Daten) bereits fokussiert und verändert wurde */
  get touchedCompanyInfoControls(): boolean {
    const { touched, dirty } = this.companyInfoGroup;
    return touched && dirty;
  }

  /** @returns Form-Model, das die firmenrelevanten Daten eines Mitarbeiters abbildet */
  get workingHoursGroup(): FormGroup {
    return this._form.controls['workingHours'] as FormGroup;
  }

  /** @returns Ob das Form-Model (persönliche Daten) bereits fokussiert und verändert wurde */
  get touchedWorkingHoursControls(): boolean {
    const { touched, dirty } = this.workingHoursGroup;
    return touched && dirty;
  }

  /** @returns Form-Wert der gesamten Form (inkl. Sub-Models) */
  get formValue(): CreateEmployeePayload {
    const { personalInfo, companyInfo, workingHours }: CreateEmployeeFormValue = this._form.value;
    return {
      personalInfo,
      companyInfo,
      workingHours
    }
  }

  /**
   * Erstellt ein neues Form-Model zum anlegen eines Mitarbeiters
   * Standartwerte und Validierung sind bereits gesetzt
   * @returns Form-Model zum Anlegen eines Mitarbeiters
   */
  createForm(): FormGroup {
    this._form = this.fb.group({
      personalInfo: this.createPersonalInfoFormGroup(),
      companyInfo: this.createCompanyInfoFormGroup(),
      workingHours: this.createWorkingHoursFormGroup(),
    });
    return this._form;
  }

  /**
   * Erstellt ein neues Form-Model (Sub-Model), das
   * die Standartarbeitszeiten pro Woche für einen Mitarbeiter abbildet
   * Standartwerte und Validierung sind bereits gesetzt
   * @returns Form-Model zum Erfassen der Standartarbeitszeiten eines Mitarbeiters
   */
  private createWorkingHoursFormGroup(): FormGroup {
    return this.fb.group({
      monday: [8, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      tuesday: [8, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      wednesday: [8, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      thursday: [8, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      friday: [6.5, Validators.compose([Validators.min(0), Validators.max(24), Validators.required])],
      saturday: [0, Validators.compose([Validators.min(0), Validators.max(24)])],
      sunday: [0],
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
      gender: ['m', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      mail: [null, Validators.compose([Validators.pattern(EMAIL_REGEX)])],
      mail2: [null],
      phone: [null],
      phone2: [null],
      dateOfBirth: [null],
      street: [null],
      houseNumber: [null],
      zipCode: [null, Validators.compose([Validators.minLength(4), Validators.maxLength(5)])],
      city: [null, Validators.required],
      country: [null, Validators.required],
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
      holidayCreditFirstYear: [null],
      availableHolidayCredit: [null],
      joiningDate: [null],
      job: [null, Validators.required]
    })
  }
}
