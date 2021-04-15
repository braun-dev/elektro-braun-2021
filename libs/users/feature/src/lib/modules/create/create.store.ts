import { Injectable } from '@angular/core';
import { RxState } from '@rx-angular/state';
import { actions as UserActions, JobPosition, Permission, UsersFacade } from '@elektro-braun/users/domain';
import { CreateUserPayload } from '../../../../../domain/src/lib/entities/create-user-payload';

export interface CreateUserState {
  email: string;
  name?: string;
  permissions: Permission[];
  position?: JobPosition;
}

export interface CreateUserFormValue {
  email: string;
  password: string;
  job: string;
  name: string;
  permissions: boolean[]
}

const MOCK_PERMISSIONS: Permission[] = [
  { name: 'Alle (Admin)', description: 'Zugriff auf alles' },
  { name: 'Mitarbeiter anzeigen', description: 'Wenn aktiv, dann darf der Benutzer die Seite Mitarbeiter besuchen' },
  { name: 'Mitarbeiter ändern', description: 'Wenn aktiv, dann darf der Benutzer Mitarbeiter löschen und bearbeiten' },
  { name: 'Mitarbeiter anlegen', description: 'Wenn aktiv, dann darf der Benutzer neue Mitarbeiter anlegen' },
  { name: 'Benutzer anzeigen', description: 'Wenn aktiv, dann darf der Benutzer die Seite Benutzer besuchen' },
  { name: 'Benutzer ändern', description: 'Wenn aktiv, dann darf der Benutzer die Seite Benutzer besuchen' },
  { name: 'Benutzer anlegen', description: 'Wenn aktiv, dann darf der Benutzer die Seite Benutzer besuchen' },
];

@Injectable()
export class CreateUserStore extends RxState<CreateUserState> {

  constructor(private userFacade: UsersFacade) {
    super();
    this.set({ email: '', name: '', permissions: MOCK_PERMISSIONS, position: null })
  }

  createUser(formValue: CreateUserFormValue): void {
    const { email, password, job, name, permissions } = formValue;
    const statePermissions = this.get('permissions');
    const user: CreateUserPayload = {
      email,
      password,
      name,
      position: { name: job ?? 'Unbekannt', description: '' },
      permissions: permissions.map((_, index) => statePermissions[index])
    }
    this.userFacade.dispatch(UserActions.create({ user }));
  }
}
