import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthFacade } from '@elektro-braun/auth/domain';
import { FormBuilder, Validators } from '@angular/forms';
import { actions as AuthActions } from '@elektro-braun/auth/domain';

@Component({
  selector: 'elektro-braun-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  form = this.fb.group({
    email: [null, Validators.compose([Validators.required])],
    password: [null, Validators.compose([Validators.required])]
  })

  constructor(private fb: FormBuilder, private authFacade: AuthFacade) {}

  login(): void {
    if (!this.form.valid) {
      alert('Sie haben nicht alle notwendigen Einschränkungen beachtet!');
      return;
    }

    const { email, password } = this.form.value;
    this.authFacade.dispatch(AuthActions.authenticate({ email, password }));
  }
}
