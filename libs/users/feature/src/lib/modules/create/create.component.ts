import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CreateUserFormValue, CreateUserStore } from './create.store';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Permission } from '@elektro-braun/users/domain';

// eslint-disable-next-line max-len
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

@Component({
  selector: 'eb-users-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CreateUserStore]
})
export class CreateComponent implements OnInit {

  permissions$ = this.componentStore.select('permissions');

  readonly form = this.fb.group({
    email: [null, Validators.compose([Validators.required, Validators.pattern(EMAIL_REGEX)])],
    password: [null, Validators.compose([Validators.required, Validators.minLength(6)])],
    name: [null],
    permissions: new FormArray([]),
    job: [null]
  })

  get permissionsFormArray(): FormArray {
    return this.form.controls?.permissions as FormArray;
  }

  constructor(private componentStore: CreateUserStore, private fb: FormBuilder) { }

  ngOnInit(): void {
    // create the checkbox controls
    this.componentStore.hold(this.permissions$, permissions => this.addCheckboxControls(permissions));
    this.form.valueChanges.subscribe(o => console.log(o));
  }

  createUser(): void {
    const formValue = this.form.value as CreateUserFormValue;
    this.componentStore.createUser(formValue);
  }

  private addCheckboxControls(permissions: Permission[]): void {
    if (!this.permissionsFormArray) { return; }
    permissions.forEach(() => this.permissionsFormArray.push(new FormControl(false)))
  }
}
