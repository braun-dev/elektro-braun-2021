import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RegisterFacade } from '@elektro-braun/auth/domain';

@Component({
  selector: 'elektro-braun-auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterComponent {
  constructor(private registerFacade: RegisterFacade) {}
}

